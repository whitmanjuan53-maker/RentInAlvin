const path = require('path');
const fs = require('fs');

// Use /tmp on Vercel (read-only filesystem except /tmp)
const DEFAULT_DB_PATH = process.env.VERCEL ? '/tmp/leads.db' : './data/leads.db';
const DB_PATH = process.env.DB_PATH || DEFAULT_DB_PATH;
const dbDir = path.dirname(DB_PATH);

let db = null;
let dbAvailable = false;

try {
  const Database = require('better-sqlite3');

  // Ensure data directory exists
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  db = new Database(DB_PATH);
  dbAvailable = true;

  // Enable WAL mode for better concurrency
  db.pragma('journal_mode = WAL');

  // Create leads table if not exists (v1)
  db.exec(`
    CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lead_type TEXT NOT NULL,
      property TEXT,
      name TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      message TEXT,
      preferred_date TEXT,
      preferred_time TEXT,
      submission_page TEXT,
      status TEXT DEFAULT 'New',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      raw_data TEXT
    )
  `);

  // Migration: add reply_to column if missing
  try {
    db.prepare('SELECT reply_to FROM leads LIMIT 1').get();
  } catch (e) {
    db.exec(`ALTER TABLE leads ADD COLUMN reply_to TEXT`);
    console.log('[DB] Migrated: added reply_to column');
  }

  // Migration: add assigned_to column if missing
  try {
    db.prepare('SELECT assigned_to FROM leads LIMIT 1').get();
  } catch (e) {
    db.exec(`ALTER TABLE leads ADD COLUMN assigned_to TEXT`);
    console.log('[DB] Migrated: added assigned_to column');
  }

  // Migration: add honeypot column if missing
  try {
    db.prepare('SELECT honeypot FROM leads LIMIT 1').get();
  } catch (e) {
    db.exec(`ALTER TABLE leads ADD COLUMN honeypot TEXT`);
    console.log('[DB] Migrated: added honeypot column');
  }

  // Migration: add consent column if missing
  try {
    db.prepare('SELECT consent FROM leads LIMIT 1').get();
  } catch (e) {
    db.exec(`ALTER TABLE leads ADD COLUMN consent INTEGER DEFAULT 0`);
    console.log('[DB] Migrated: added consent column');
  }

  // Create index for common queries
  db.exec(`CREATE INDEX IF NOT EXISTS idx_leads_type ON leads(lead_type)`);
  db.exec(`CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status)`);
  db.exec(`CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at)`);
  db.exec(`CREATE INDEX IF NOT EXISTS idx_leads_email ON leads(email)`);

  console.log('[DB] SQLite connected at', DB_PATH);
} catch (err) {
  console.error('[DB] Failed to initialize SQLite:', err.message);
  console.error('[DB] Leads will be logged but not persisted.');
}

/**
 * Save a lead to the database
 * @param {Object} lead
 * @returns {Object} saved lead with id
 */
function saveLead(lead) {
  if (!dbAvailable) {
    console.log('[DB] saveLead (no DB):', lead.name, lead.lead_type);
    return { id: Date.now(), ...lead };
  }

  const stmt = db.prepare(`
    INSERT INTO leads (
      lead_type, property, name, phone, email, message,
      preferred_date, preferred_time, submission_page, status,
      reply_to, assigned_to, honeypot, consent, raw_data
    )
    VALUES (
      @lead_type, @property, @name, @phone, @email, @message,
      @preferred_date, @preferred_time, @submission_page, @status,
      @reply_to, @assigned_to, @honeypot, @consent, @raw_data
    )
  `);

  const result = stmt.run({
    lead_type: lead.lead_type || 'General',
    property: lead.property || null,
    name: lead.name || '',
    phone: lead.phone || null,
    email: lead.email || null,
    message: lead.message || null,
    preferred_date: lead.preferred_date || null,
    preferred_time: lead.preferred_time || null,
    submission_page: lead.submission_page || null,
    status: lead.status || 'New',
    reply_to: lead.reply_to || lead.email || null,
    assigned_to: lead.assigned_to || null,
    honeypot: lead.honeypot || null,
    consent: lead.consent ? 1 : 0,
    raw_data: lead.raw_data ? JSON.stringify(lead.raw_data) : null
  });

  return { id: result.lastInsertRowid, ...lead };
}

/**
 * Get all leads (for future admin dashboard)
 * @param {Object} filters
 * @returns {Array}
 */
function getLeads(filters = {}) {
  if (!dbAvailable) return [];

  let sql = 'SELECT * FROM leads WHERE 1=1';
  const params = {};

  if (filters.status) {
    sql += ' AND status = @status';
    params.status = filters.status;
  }
  if (filters.lead_type) {
    sql += ' AND lead_type = @lead_type';
    params.lead_type = filters.lead_type;
  }
  if (filters.assigned_to) {
    sql += ' AND assigned_to = @assigned_to';
    params.assigned_to = filters.assigned_to;
  }
  if (filters.search) {
    sql += ' AND (name LIKE @search OR email LIKE @search OR phone LIKE @search OR property LIKE @search)';
    params.search = `%${filters.search}%`;
  }

  sql += ' ORDER BY created_at DESC';

  if (filters.limit) {
    sql += ' LIMIT @limit';
    params.limit = filters.limit;
  }

  const stmt = db.prepare(sql);
  return stmt.all(params);
}

/**
 * Update lead status
 * @param {number} id
 * @param {string} status
 * @param {string} assignedTo optional
 * @returns {boolean}
 */
function updateLeadStatus(id, status, assignedTo) {
  if (!dbAvailable) return false;

  const stmt = db.prepare(`
    UPDATE leads SET status = @status, updated_at = CURRENT_TIMESTAMP
    ${assignedTo ? ', assigned_to = @assigned_to' : ''}
    WHERE id = @id
  `);
  const result = stmt.run({ id, status, assigned_to: assignedTo || undefined });
  return result.changes > 0;
}

/**
 * Get lead by ID
 * @param {number} id
 * @returns {Object|null}
 */
function getLeadById(id) {
  if (!dbAvailable) return null;

  const stmt = db.prepare('SELECT * FROM leads WHERE id = ?');
  return stmt.get(id) || null;
}

/**
 * Get lead statistics
 * @returns {Object}
 */
function getLeadStats() {
  if (!dbAvailable) {
    return { total: 0, byType: [], byStatus: [], today: 0, thisWeek: 0, unassigned: 0 };
  }

  const total = db.prepare('SELECT COUNT(*) as count FROM leads').get().count;
  const byType = db.prepare('SELECT lead_type, COUNT(*) as count FROM leads GROUP BY lead_type').all();
  const byStatus = db.prepare('SELECT status, COUNT(*) as count FROM leads GROUP BY status').all();
  const today = db.prepare("SELECT COUNT(*) as count FROM leads WHERE date(created_at) = date('now')").get().count;
  const thisWeek = db.prepare("SELECT COUNT(*) as count FROM leads WHERE created_at >= date('now', '-7 days')").get().count;
  const unassigned = db.prepare("SELECT COUNT(*) as count FROM leads WHERE assigned_to IS NULL AND status = 'New'").get().count;

  return { total, byType, byStatus, today, thisWeek, unassigned };
}

module.exports = {
  db,
  saveLead,
  getLeads,
  updateLeadStatus,
  getLeadById,
  getLeadStats
};

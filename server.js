require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { saveLead, getLeads, getLeadStats, getLeadById, updateLeadStatus } = require('./db');
const { sendLeadEmail, verifyConnection } = require('./email');

const app = express();
const PORT = parseInt(process.env.PORT || '3000', 10);
const NODE_ENV = process.env.NODE_ENV || 'development';
const SITE_URL = process.env.SITE_URL || `http://localhost:${PORT}`;
const HONEYPOT_FIELD = process.env.HONEYPOT_FIELD || 'website';
const RATE_LIMIT_PER_HOUR = parseInt(process.env.RATE_LIMIT_PER_HOUR || '10', 10);

// Security middleware
// @ts-ignore
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'", "https://unpkg.com", "https://fonts.googleapis.com", "https://assets.calendly.com"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https:", "blob:"],
      connectSrc: ["'self'", "https://unpkg.com"],
      frameSrc: ["'self'", "https://calendly.com", "https://calendar.google.com"],
      objectSrc: ["'none'"]
    }
  },
  crossOriginEmbedderPolicy: false
}));

app.use(cors({
  origin: NODE_ENV === 'development' ? true : SITE_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// Rate limiting
// @ts-ignore
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { error: 'Too many requests, please try again later.' }
});
app.use(limiter);

// Stricter rate limit for form submissions
// @ts-ignore
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: RATE_LIMIT_PER_HOUR,
  message: { error: 'Too many submissions. Please try again later.' }
});

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Request logging
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.path} - ${req.ip}`);
  next();
});

// ============================================================
// Validation helpers
// ============================================================

function isValidEmail(email) {
  if (!email || typeof email !== 'string') return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false;
  // Allow digits, spaces, dashes, parentheses, plus, dots, extension x
  const cleaned = phone.replace(/[\s\-().+]/g, '');
  return /^\+?\d{7,15}$/.test(cleaned);
}

function checkHoneypot(body) {
  const field = HONEYPOT_FIELD;
  if (body[field] && String(body[field]).trim()) {
    return { isSpam: true, reason: 'Honeypot triggered' };
  }
  return { isSpam: false };
}

// ============================================================
// Public config endpoint (for frontend calendar integration)
// ============================================================

app.get('/api/config', (req, res) => {
  res.json({
    bookingProvider: process.env.BOOKING_PROVIDER || 'custom',
    calendlyUrl: process.env.CALENDLY_URL || '',
    googleCalendarUrl: process.env.GOOGLE_CALENDAR_URL || '',
    siteUrl: SITE_URL
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    env: NODE_ENV,
    timestamp: new Date().toISOString(),
    emailConfigured: !!(process.env.SMTP_HOST || process.env.RESEND_API_KEY || process.env.SENDGRID_API_KEY)
  });
});

// Lead stats (for future admin dashboard)
app.get('/api/leads/stats', (req, res) => {
  try {
    const stats = getLeadStats();
    res.json(stats);
  } catch (err) {
    console.error('[API] Stats error:', err);
    res.status(500).json({ error: 'Failed to retrieve stats' });
  }
});

// Get leads (for future dashboard)
app.get('/api/leads', (req, res) => {
  try {
    const filters = {
      status: req.query.status,
      lead_type: req.query.type,
      assigned_to: req.query.assigned_to,
      search: req.query.search,
      limit: req.query.limit ? parseInt(req.query.limit, 10) : undefined
    };
    const leads = getLeads(filters);
    res.json(leads);
  } catch (err) {
    console.error('[API] Get leads error:', err);
    res.status(500).json({ error: 'Failed to retrieve leads' });
  }
});

// Get single lead
app.get('/api/leads/:id', (req, res) => {
  try {
    const lead = getLeadById(parseInt(req.params.id, 10));
    if (!lead) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json(lead);
  } catch (err) {
    console.error('[API] Get lead error:', err);
    res.status(500).json({ error: 'Failed to retrieve lead' });
  }
});

// Update lead status
app.put('/api/leads/:id/status', (req, res) => {
  try {
    const { status, assigned_to } = req.body;
    const validStatuses = ['New', 'Contacted', 'Tour Scheduled', 'Applied', 'Closed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Invalid status' });
    }
    const updated = updateLeadStatus(parseInt(req.params.id, 10), status, assigned_to);
    if (!updated) {
      return res.status(404).json({ error: 'Lead not found' });
    }
    res.json({ success: true });
  } catch (err) {
    console.error('[API] Update status error:', err);
    res.status(500).json({ error: 'Failed to update status' });
  }
});

// ============================================================
// Lead submission helper
// ============================================================

async function handleLeadSubmission(req, res, leadType, extractData) {
  try {
    // 1. Honeypot check
    const honeypot = checkHoneypot(req.body);
    if (honeypot.isSpam) {
      // Silently accept but don't process — bots think it worked
      console.log('[Spam] Honeypot triggered from IP:', req.ip);
      return res.json({ success: true, message: 'Thank you.' });
    }

    const data = extractData(req.body);

    // 2. Basic validation
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
      return res.status(400).json({ error: 'Please provide your full name.' });
    }
    if (!data.phone && !data.email) {
      return res.status(400).json({ error: 'Please provide a phone number or email address.' });
    }
    if (data.email && !isValidEmail(data.email)) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }
    if (data.phone && !isValidPhone(data.phone)) {
      return res.status(400).json({ error: 'Please provide a valid phone number.' });
    }

    // 3. Save to database
    const lead = saveLead({
      lead_type: leadType,
      property: data.property || null,
      name: data.name.trim(),
      phone: data.phone || null,
      email: data.email || null,
      message: data.message || null,
      preferred_date: data.preferred_date || null,
      preferred_time: data.preferred_time || null,
      submission_page: data.submission_page || req.headers.referer || null,
      status: 'New',
      reply_to: data.email || null,
      assigned_to: null,
      honeypot: req.body[HONEYPOT_FIELD] || null,
      consent: data.consent || false,
      raw_data: data.raw_data || null
    });

    // 4. Send email
    const emailResult = await sendLeadEmail(lead);

    console.log(`[Lead] Saved ${leadType} from ${data.name} (ID: ${lead.id})`);

    res.json({
      success: true,
      message: 'Thank you! Your submission has been received and our team will follow up shortly.',
      leadId: lead.id,
      emailSent: emailResult.sent
    });
  } catch (err) {
    console.error(`[API] ${leadType} submission error:`, err);
    res.status(500).json({ error: 'Something went wrong. Please try again or call us directly at (832) 210-3968.' });
  }
}

// ============================================================
// Form endpoints
// ============================================================

// Tour booking endpoint
app.post('/api/submit/tour', formLimiter, (req, res) => {
  handleLeadSubmission(req, res, 'Tour Booking', (body) => ({
    property: body.property,
    name: body.name,
    phone: body.phone,
    email: body.email,
    preferred_date: body.date,
    preferred_time: body.time,
    message: body.notes,
    submission_page: body.page,
    raw_data: {
      moveBy: body.moveBy,
      tourDate: body.date,
      tourTime: body.time
    }
  }));
});

// Application endpoint
app.post('/api/submit/application', formLimiter, (req, res) => {
  handleLeadSubmission(req, res, 'Application', (body) => ({
    property: body.property,
    name: `${body.firstName || ''} ${body.lastName || ''}`.trim(),
    phone: body.phone,
    email: body.email,
    message: body.notes,
    submission_page: body.page,
    consent: body.consent,
    raw_data: {
      firstName: body.firstName,
      lastName: body.lastName,
      dob: body.dob,
      currentAddress: body.currentAddress,
      coApplicants: body.coApplicants,
      pets: body.pets,
      petDesc: body.petDesc,
      vehicles: body.vehicles,
      employer: body.employer,
      jobTitle: body.jobTitle,
      income: body.income,
      employedSince: body.employedSince,
      prevLandlord: body.prevLandlord,
      prevLandlordPhone: body.prevLandlordPhone,
      reasonLeaving: body.reasonLeaving,
      unitType: body.unitType,
      moveIn: body.moveIn,
      budget: body.budget
    }
  }));
});

// Sell property endpoint
app.post('/api/submit/sell', formLimiter, (req, res) => {
  handleLeadSubmission(req, res, 'Sell Property', (body) => ({
    name: body.name,
    phone: body.phone,
    email: body.email,
    message: body.notes,
    submission_page: body.page,
    raw_data: {
      address: body.address,
      type: body.type,
      beds: body.beds,
      baths: body.baths,
      sqft: body.sqft,
      timeline: body.timeline
    }
  }));
});

// Contact form endpoint
app.post('/api/submit/contact', formLimiter, (req, res) => {
  handleLeadSubmission(req, res, 'Contact', (body) => ({
    name: body.name,
    phone: body.phone,
    email: body.email,
    message: body.message,
    submission_page: body.page
  }));
});

// Property inquiry endpoint
app.post('/api/submit/inquiry', formLimiter, (req, res) => {
  handleLeadSubmission(req, res, 'Property Inquiry', (body) => ({
    property: body.property,
    name: body.name,
    phone: body.phone,
    email: body.email,
    message: body.message,
    submission_page: body.page
  }));
});

// ============================================================
// Static files
// ============================================================

app.use(express.static(path.join(__dirname), {
  setHeaders: (res, filepath) => {
    if (filepath.endsWith('.jsx')) {
      res.setHeader('Content-Type', 'text/javascript');
    }
  }
}));

// Fallback to index.html for SPA routes
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'Yellowstone Management.html'));
});

// Error handler
app.use((err, req, res, _next) => {
  console.error('[Server] Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ============================================================
// Start server
// ============================================================

async function start() {
  console.log('======================================');
  console.log('  RentInAlvin Website Server');
  console.log('  Managed by Yellowstone Asset Management');
  console.log('======================================');
  console.log('');
  console.log(`Environment: ${NODE_ENV}`);
  console.log(`Database: ${process.env.DB_PATH || './data/leads.db'}`);
  console.log(`Booking Provider: ${process.env.BOOKING_PROVIDER || 'custom'}`);
  console.log(`Email Provider: ${process.env.EMAIL_PROVIDER || 'smtp'}`);

  await verifyConnection();

  app.listen(PORT, () => {
    console.log('');
    console.log(`Server running at ${SITE_URL}`);
    console.log(`Health check: ${SITE_URL}/api/health`);
    console.log(`Config: ${SITE_URL}/api/config`);
    console.log('');
    console.log('Press Ctrl+C to stop');
  });
}

// Export for Vercel serverless
module.exports = app;

// Start locally when not on Vercel
if (!process.env.VERCEL) {
  start();
}

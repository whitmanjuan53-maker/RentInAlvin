const nodemailer = require('nodemailer');

// Parse comma-separated env vars into arrays
function parseRecipients(envVar) {
  return (envVar || '')
    .split(',')
    .map(e => e.trim())
    .filter(Boolean);
}

const LEAD_RECIPIENTS = parseRecipients(process.env.GENERAL_LEAD_RECIPIENTS || process.env.LEAD_RECIPIENTS);
const BOOKING_RECIPIENTS = parseRecipients(process.env.TOUR_BOOKING_RECIPIENTS);

const SENDER_EMAIL = process.env.EMAIL_FROM || process.env.SENDER_EMAIL || 'website@rentinalvin.com';
const SENDER_NAME = process.env.EMAIL_FROM_NAME || process.env.SENDER_NAME || 'RentInAlvin Website';
const EMAIL_REPLY_TO = process.env.EMAIL_REPLY_TO || 'office@yellowstone-am.com';
const EMAIL_PROVIDER = process.env.EMAIL_PROVIDER || 'smtp';

// Create transporter based on provider
function createTransporter() {
  if (EMAIL_PROVIDER === 'resend' && process.env.RESEND_API_KEY) {
    return nodemailer.createTransport({
      host: 'smtp.resend.com',
      port: 587,
      secure: false,
      auth: {
        user: 'resend',
        pass: process.env.RESEND_API_KEY
      }
    });
  }

  if (EMAIL_PROVIDER === 'sendgrid' && process.env.SENDGRID_API_KEY) {
    return nodemailer.createTransport({
      host: 'smtp.sendgrid.net',
      port: 587,
      secure: false,
      auth: {
        user: 'apikey',
        pass: process.env.SENDGRID_API_KEY
      }
    });
  }

  // Default: SMTP
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    }
  });
}

const transporter = createTransporter();

/**
 * Verify email connection on startup
 */
async function verifyConnection() {
  try {
    await transporter.verify();
    console.log(`[Email] ${EMAIL_PROVIDER.toUpperCase()} connection verified successfully`);
    return true;
  } catch (err) {
    console.error(`[Email] ${EMAIL_PROVIDER.toUpperCase()} connection failed:`, err.message);
    console.error('[Email] Emails will be logged to console but not sent. Check your .env configuration.');
    return false;
  }
}

/**
 * Format a lead into a clean email body
 */
function formatLeadEmail(lead) {
  const lines = [
    `New RentInAlvin Lead`,
    ``,
    `Lead Type: ${lead.lead_type || 'General'}`,
    lead.property ? `Property: ${lead.property}` : null,
    `Name: ${lead.name || 'N/A'}`,
    lead.phone ? `Phone: ${lead.phone}` : null,
    lead.email ? `Email: ${lead.email}` : null,
    lead.preferred_date ? `Preferred Date: ${lead.preferred_date}` : null,
    lead.preferred_time ? `Preferred Time: ${lead.preferred_time}` : null,
    lead.moveIn ? `Move-in Date: ${lead.moveIn}` : null,
    lead.message ? `Message: ${lead.message}` : null,
    lead.submission_page ? `Submitted From: ${lead.submission_page}` : null,
    `Submitted At: ${new Date().toLocaleString('en-US', { timeZone: 'America/Chicago' })}`,
    ``,
    `---`,
    `This lead was submitted from the RentInAlvin website.`,
    `Database ID: ${lead.id || 'pending'}`,
    `Status: ${lead.status || 'New'}`
  ];

  return lines.filter(Boolean).join('\n');
}

/**
 * Build email subject line
 */
function buildSubject(lead) {
  const base = 'New RentInAlvin';
  const typeMap = {
    'Tour Booking': 'Tour Booking',
    'Property Inquiry': 'Property Lead',
    'Contact': 'Contact Message',
    'Application': 'Application Interest',
    'Sell Property': 'Property Offer Lead',
    'General': 'Lead'
  };
  const typeLabel = typeMap[lead.lead_type] || 'Lead';
  const propertyPart = lead.property ? ` — ${lead.property}` : '';
  return `${base} ${typeLabel}${propertyPart}`;
}

/**
 * Send lead notification email
 */
async function sendLeadEmail(lead) {
  const subject = buildSubject(lead);
  const body = formatLeadEmail(lead);
  const to = lead.lead_type === 'Tour Booking' ? BOOKING_RECIPIENTS : LEAD_RECIPIENTS;

  if (!to.length) {
    console.warn('[Email] No recipients configured for', lead.lead_type);
    return { sent: false, reason: 'no_recipients' };
  }

  // Reply-to: customer's email if available, else fallback
  const replyTo = lead.reply_to || lead.email || EMAIL_REPLY_TO;

  const mailOptions = {
    from: `"${SENDER_NAME}" <${SENDER_EMAIL}>`,
    to: to.join(', '),
    subject,
    text: body,
    replyTo: replyTo
  };

  // If email is not configured, log and return
  const isConfigured = EMAIL_PROVIDER === 'smtp'
    ? !!(process.env.SMTP_HOST && process.env.SMTP_USER)
    : EMAIL_PROVIDER === 'resend'
    ? !!process.env.RESEND_API_KEY
    : EMAIL_PROVIDER === 'sendgrid'
    ? !!process.env.SENDGRID_API_KEY
    : false;

  if (!isConfigured) {
    console.log('[Email] Email provider not configured. Would send:');
    console.log('  Provider:', EMAIL_PROVIDER);
    console.log('  To:', mailOptions.to);
    console.log('  Reply-To:', mailOptions.replyTo);
    console.log('  Subject:', mailOptions.subject);
    console.log('  Body preview:', body.slice(0, 200) + '...');
    return { sent: false, reason: 'email_not_configured', logged: true };
  }

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('[Email] Sent:', info.messageId);
    return { sent: true, messageId: info.messageId };
  } catch (err) {
    console.error('[Email] Failed to send:', err.message);
    return { sent: false, reason: err.message };
  }
}

module.exports = {
  verifyConnection,
  sendLeadEmail,
  formatLeadEmail,
  buildSubject,
  LEAD_RECIPIENTS,
  BOOKING_RECIPIENTS
};

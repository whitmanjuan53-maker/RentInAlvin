/* ============================================================
   RentInAlvin API Client
   Lightweight fetch wrapper for form submissions
   Includes honeypot spam protection and validation helpers
============================================================ */

(function() {
  'use strict';

  const API_BASE = window.location.origin;

  // Validation helpers
  function isValidEmail(email) {
    if (!email) return false;
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  }

  function isValidPhone(phone) {
    if (!phone) return false;
    const cleaned = phone.replace(/[\s\-().+]/g, '');
    return /^\+?\d{7,15}$/.test(cleaned);
  }

  async function apiPost(endpoint, data) {
    const url = `${API_BASE}${endpoint}`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const result = await response.json().catch(() => ({
        error: 'Invalid server response'
      }));

      if (!response.ok) {
        throw new Error(result.error || `Server error: ${response.status}`);
      }

      return { success: true, data: result };
    } catch (err) {
      console.error('[API] Request failed:', err.message);
      return { success: false, error: err.message };
    }
  }

  async function getConfig() {
    try {
      const res = await fetch(`${API_BASE}/api/config`);
      return await res.json();
    } catch (e) {
      return { bookingProvider: 'custom' };
    }
  }

  // Honeypot value — always empty for legitimate users
  function getHoneypot() {
    return { website: '' };
  }

  window.RentInAlvinAPI = {
    isValidEmail,
    isValidPhone,
    getConfig,

    submitTour: (data) => apiPost('/api/submit/tour', {
      ...getHoneypot(),
      ...data
    }),

    submitApplication: (data) => apiPost('/api/submit/application', {
      ...getHoneypot(),
      ...data
    }),

    submitSellProperty: (data) => apiPost('/api/submit/sell', {
      ...getHoneypot(),
      ...data
    }),

    submitContact: (data) => apiPost('/api/submit/contact', {
      ...getHoneypot(),
      ...data
    }),

    submitInquiry: (data) => apiPost('/api/submit/inquiry', {
      ...getHoneypot(),
      ...data
    })
  };
})();

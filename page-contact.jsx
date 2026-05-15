/* global React, ReactDOM */
const { useState, useEffect } = React;

const {
  TWEAK_DEFAULTS, PALETTES,
  Nav, Footer, SectionHead, Contact
} = window.Shared;

function ContactFormInline({ p, displayFont }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || (!form.email && !form.phone)) {
      setStatus("error");
      setErrorMsg("Please provide your name and at least one way to reach you.");
      return;
    }
    setStatus("sending");
    const payload = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      message: form.message,
      page: window.location.href
    };
    let result;
    const api = window.RentInAlvinAPI;
    if (api && api.submitContact) {
      result = await api.submitContact(payload);
    } else {
      try {
        const res = await fetch("/api/submit/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const body = await res.json().catch(() => ({}));
        result = { success: res.ok && body.success, error: body.error };
      } catch (err) {
        result = { success: false, error: "Network error. Please try again." };
      }
    }
    if (result.success) {
      setStatus("success");
      setForm({ name: "", email: "", phone: "", message: "" });
    } else {
      setStatus("error");
      setErrorMsg(result.error || "Something went wrong. Please call us directly.");
    }
  };

  const inputStyle = {
    padding: "12px 14px",
    border: `1px solid ${p.line}`,
    borderRadius: 10,
    background: p.paper,
    fontFamily: "inherit",
    fontSize: 16,
    color: p.ink,
    width: "100%",
    outline: "none"
  };

  if (status === "success") {
    return (
      <div style={{ textAlign: "center", padding: "40px 24px", background: p.paper, border: `1px solid ${p.line}`, borderRadius: 8 }}>
        <div style={{
          width: 56, height: 56, borderRadius: "50%",
          background: p.primary, color: p.paper,
          display: "grid", placeItems: "center",
          fontSize: 28, margin: "0 auto 20px"
        }}>✓</div>
        <h3 style={{
          fontFamily: `'${displayFont}', serif`,
          fontSize: 26, fontWeight: 400, margin: "0 0 12px", color: p.ink
        }}>Message sent!</h3>
        <p style={{ color: p.inkSoft, maxWidth: "40ch", margin: "0 auto", lineHeight: 1.55 }}>
          Thanks for reaching out. Our team will get back to you within one business day.
        </p>
        <button onClick={() => setStatus("idle")} style={{
          marginTop: 20, padding: "10px 20px",
          background: p.ink, color: p.paper, border: "none",
          fontSize: 14, fontWeight: 600, cursor: "pointer",
          fontFamily: "inherit", borderRadius: 10
        }}>Send another</button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="ys-form-grid">
        <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: p.inkSoft, fontWeight: 600 }}>Name *</span>
          <input required style={inputStyle} value={form.name} onChange={e => update("name", e.target.value)} placeholder="Your name" />
        </label>
        <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
          <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: p.inkSoft, fontWeight: 600 }}>Email</span>
          <input type="email" style={inputStyle} value={form.email} onChange={e => update("email", e.target.value)} placeholder="you@email.com" />
        </label>
      </div>
      <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: p.inkSoft, fontWeight: 600 }}>Phone</span>
        <input type="tel" style={inputStyle} value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="(832) 210-3968" />
      </label>
      <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        <span style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: p.inkSoft, fontWeight: 600 }}>Message *</span>
        <textarea required rows={4} style={{ ...inputStyle, resize: "vertical" }} value={form.message} onChange={e => update("message", e.target.value)} placeholder="How can we help?" />
      </label>
      {status === "error" && (
        <div style={{
          padding: "12px 14px",
          background: "#fef2f2",
          border: "1px solid #fecaca",
          borderRadius: 10,
          color: "#991b1b",
          fontSize: 14,
          lineHeight: 1.5
        }}>
          {errorMsg}
        </div>
      )}
      <button type="submit" disabled={status === "sending"} style={{
        padding: "12px 22px",
        background: status === "sending" ? p.line : p.primary,
        color: p.paper,
        border: "none", borderRadius: 10,
        fontSize: 14, fontWeight: 600, fontFamily: "inherit",
        cursor: status === "sending" ? "default" : "pointer",
        transition: "transform 180ms ease, background 180ms ease",
        alignSelf: "flex-start"
      }}
      onMouseOver={(e) => { if (status !== "sending") { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.background = p.primarySoft; } }}
      onMouseOut={(e) => { if (status !== "sending") { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = p.primary; } }}>
        {status === "sending" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}

function ContactPage() {
  const [tweaks, setTweak] = (window.useTweaks || (() => [TWEAK_DEFAULTS, () => {}]))(TWEAK_DEFAULTS);
  const p = PALETTES[tweaks.palette] || PALETTES.forest;
  const displayFont = tweaks.displayFont;

  useEffect(() => {
    document.body.style.background = p.bg;
    document.body.style.color = p.ink;
  }, [p]);

  return (
    <div style={{ background: p.bg, color: p.ink, minHeight: "100vh" }}>
      <Nav p={p} currentPage="contact" />

      <section style={{ padding: "120px var(--pad-x) 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHead
            p={p}
            displayFont={displayFont}
            eyebrow="Contact"
            title="We're here to help."
            lead="Call, email, or stop by the office. We respond to every inquiry." />
        </div>
      </section>

      <Contact p={p} displayFont={displayFont} simplified={false} />

      <section style={{ padding: "80px var(--pad-x)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="ys-contact-grid">
            <div>
              <h3 style={{
                fontFamily: `'${displayFont}', serif`,
                fontSize: "clamp(22px, 2.2vw, 28px)",
                fontWeight: 400, letterSpacing: "-0.01em",
                margin: "0 0 16px", color: p.ink
              }}>Send a message</h3>
              <ContactFormInline p={p} displayFont={displayFont} />
            </div>
            <div>
              <h3 style={{
                fontFamily: `'${displayFont}', serif`,
                fontSize: "clamp(22px, 2.2vw, 28px)",
                fontWeight: 400, letterSpacing: "-0.01em",
                margin: "0 0 16px", color: p.ink
              }}>Quick links</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <a href="book-tour.html" style={{ fontSize: 15, color: p.ink, textDecoration: "none", padding: "10px 0", borderBottom: `1px solid ${p.line}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Book a tour</span>
                  <span style={{ color: p.accent, fontWeight: 600 }}>→</span>
                </a>
                <a href="apply.html" style={{ fontSize: 15, color: p.ink, textDecoration: "none", padding: "10px 0", borderBottom: `1px solid ${p.line}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Apply online</span>
                  <span style={{ color: p.accent, fontWeight: 600 }}>→</span>
                </a>
                <a href="properties.html" style={{ fontSize: 15, color: p.ink, textDecoration: "none", padding: "10px 0", borderBottom: `1px solid ${p.line}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>View properties</span>
                  <span style={{ color: p.accent, fontWeight: 600 }}>→</span>
                </a>
                <a href="location.html" style={{ fontSize: 15, color: p.ink, textDecoration: "none", padding: "10px 0", borderBottom: `1px solid ${p.line}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Find our office</span>
                  <span style={{ color: p.accent, fontWeight: 600 }}>→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer p={p} displayFont={displayFont} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ContactPage />);

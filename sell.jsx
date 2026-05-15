/* global React */
const { useState: useStateP } = React;

/* ============================================================
   Sell-your-property section — "For Property Owners"
   Connects to real backend via RentInAlvinAPI
============================================================ */

function SellProperty({ p, displayFont }) {
  const [form, setForm] = useStateP({
    name: "", phone: "", email: "",
    addr: "", type: "Single-family",
    beds: "", baths: "", sqft: "",
    timeline: "Just exploring", notes: ""
  });
  const [sent, setSent] = useStateP(false);
  const [status, setStatus] = useStateP("idle"); // idle | sending | error
  const [errorMsg, setErrorMsg] = useStateP("");
  const [fieldErrors, setFieldErrors] = useStateP({});

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  function validate() {
    const errors = {};
    if (!form.name || form.name.trim().length < 2) errors.name = "Please enter your name.";
    if (!form.phone) errors.phone = "Phone is required.";
    else if (!window.RentInAlvinAPI.isValidPhone(form.phone)) errors.phone = "Please enter a valid phone number.";
    if (!form.email) errors.email = "Email is required.";
    else if (!window.RentInAlvinAPI.isValidEmail(form.email)) errors.email = "Please enter a valid email address.";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setStatus("sending");

    const result = await window.RentInAlvinAPI.submitSellProperty({
      name: form.name,
      phone: form.phone,
      email: form.email,
      address: form.addr,
      type: form.type,
      beds: form.beds,
      baths: form.baths,
      sqft: form.sqft,
      timeline: form.timeline,
      notes: form.notes,
      page: window.location.href
    });

    if (result.success) {
      setSent(true);
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(result.error || "Failed to submit. Please call us at (832) 210-3968.");
    }
  };

  const fieldStyle = (error) => ({
    width: "100%", padding: "13px 16px",
    background: p.bg, border: `1px solid ${error ? '#EF4444' : p.line}`,
    color: p.ink, fontSize: 16,
    fontFamily: "inherit",
    borderRadius: 10, outline: "none",
    transition: "border-color 200ms ease, box-shadow 200ms ease"
  });
  const labelStyle = {
    fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
    color: p.inkSoft, fontWeight: 600, marginBottom: 6, display: "block"
  };

  const creamBg = "#F7F4EE";

  const benefitIcon = (icon) => (
    <div style={{
      width: 40, height: 40, borderRadius: "50%",
      background: p.accent, color: "#fff",
      display: "grid", placeItems: "center",
      fontSize: 16, fontWeight: 700,
      fontFamily: "'Source Sans 3', sans-serif",
      flexShrink: 0
    }}>{icon}</div>
  );

  return (
    <section id="sell" style={{
      padding: "var(--pad-x-lg) var(--pad-x)",
      borderTop: `1px solid ${p.line}`,
      background: creamBg,
      color: p.ink
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Section header */}
        <div style={{ marginBottom: 48 }}>
          <div style={{
            fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase",
            color: p.accent, fontWeight: 700, marginBottom: 16,
            display: "flex", alignItems: "center", gap: 10
          }}>
            <span style={{ width: 32, height: 2, background: p.accent, borderRadius: 1 }}></span>
            For property owners
          </div>
          <h2 style={{
            fontFamily: `'${displayFont}', serif`,
            fontSize: "clamp(32px, 4.5vw, 56px)",
            lineHeight: 1.05, letterSpacing: "-0.02em",
            margin: 0, fontWeight: 400,
            color: p.primary, maxWidth: "18ch"
          }}>
            Work with a local team.
          </h2>
          <div style={{ width: 48, height: 3, background: p.accent, marginTop: 20, borderRadius: 2 }} />
        </div>

        <div className="ys-sell-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "start"
        }}>
          {/* Left, pitch */}
          <div>
            <p style={{
              fontSize: 17, lineHeight: 1.65,
              color: p.inkSoft,
              maxWidth: "46ch", margin: 0
            }}>
              Yellowstone Asset Management is actively buying homes, duplexes, and small multifamily properties in Alvin and the surrounding area. If you're thinking about selling, we'd love to take a look.
            </p>

            {/* Benefit cards */}
            <div style={{
              marginTop: 32,
              display: "flex", flexDirection: "column", gap: 16
            }}>
              {[
                { icon: "1", title: "No commissions", body: "Sell directly to us. No 6% broker fee, no hidden costs." },
                { icon: "2", title: "Honest offer", body: "One fair, transparent offer based on local market value." },
                { icon: "3", title: "Close on your terms", body: "30 days, 90 days, or whenever works for your timeline." }
              ].map((b) => (
                <div key={b.icon} style={{
                  display: "flex", alignItems: "flex-start", gap: 16,
                  padding: 18,
                  background: p.paper,
                  borderRadius: 12,
                  border: `1px solid ${p.line}`,
                  boxShadow: "0 2px 8px rgba(27, 42, 74, 0.04)"
                }}>
                  {benefitIcon(b.icon)}
                  <div>
                    <div style={{
                      fontFamily: `'${displayFont}', serif`,
                      fontSize: 18, color: p.ink, fontWeight: 400,
                      lineHeight: 1.2, letterSpacing: "-0.01em"
                    }}>{b.title}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.55, color: p.inkSoft, marginTop: 4 }}>
                      {b.body}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div style={{ marginTop: 28, display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="tel:8322103968" style={{
                padding: "14px 26px", background: p.primary, color: p.paper,
                textDecoration: "none", fontSize: 15, fontWeight: 700,
                borderRadius: 10, letterSpacing: "0.01em",
                display: "inline-flex", alignItems: "center", gap: 10,
                transition: "all 200ms ease",
                boxShadow: "0 4px 16px rgba(27, 42, 74, 0.18)",
                cursor: "pointer"
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = p.primarySoft; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(27, 42, 74, 0.24)"; }}
              onMouseOut={(e) => { e.currentTarget.style.background = p.primary; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(27, 42, 74, 0.18)"; }}>
                Contact Management
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              </a>
              <a href="#sell" style={{
                padding: "14px 26px", background: p.paper, color: p.ink,
                textDecoration: "none", fontSize: 15, fontWeight: 600,
                borderRadius: 10, border: `1px solid ${p.line}`,
                display: "inline-flex", alignItems: "center", gap: 10,
                transition: "all 200ms ease"
              }}
              onMouseOver={(e) => { e.currentTarget.style.background = p.ink; e.currentTarget.style.color = p.paper; e.currentTarget.style.borderColor = p.ink; }}
              onMouseOut={(e) => { e.currentTarget.style.background = p.paper; e.currentTarget.style.color = p.ink; e.currentTarget.style.borderColor = p.line; }}>
                Send a message
              </a>
            </div>

            {/* Callout */}
            <div style={{
              marginTop: 28, padding: 18,
              background: p.paper,
              border: `1px solid ${p.line}`,
              borderRadius: 12,
              display: "flex", gap: 14, alignItems: "center",
              boxShadow: "0 2px 8px rgba(27, 42, 74, 0.04)"
            }}>
              {benefitIcon("★")}
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: p.ink }}>
                  Prefer to talk first?
                </div>
                <div style={{ fontSize: 13, color: p.inkSoft, marginTop: 2 }}>
                  Call <a href="tel:8322103968" style={{ color: p.primary, textDecoration: "none", fontWeight: 700 }}>(832) 210-3968</a> — no obligation.
                </div>
              </div>
            </div>
          </div>

          {/* Right, form */}
          <div style={{
            background: p.paper, color: p.ink,
            padding: 32,
            borderRadius: 14,
            boxShadow: "0 4px 24px rgba(27, 42, 74, 0.06)",
            border: `1px solid ${p.line}`
          }}>
            {sent ? (
              <div style={{ padding: "32px 0", textAlign: "center" }}>
                <div style={{
                  width: 56, height: 56, borderRadius: "50%",
                  background: p.primary, color: p.paper,
                  display: "grid", placeItems: "center",
                  fontSize: 28, margin: "0 auto 20px"
                }}>✓</div>
                <h3 style={{
                  fontFamily: `'${displayFont}', serif`,
                  fontSize: 26, fontWeight: 400, margin: "0 0 12px", color: p.ink
                }}>We'll be in touch.</h3>
                <p style={{ color: p.inkSoft, maxWidth: "36ch", margin: "0 auto", lineHeight: 1.55 }}>
                  Your property information has been submitted. We typically respond within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div style={{
                  fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase",
                  color: p.accent, fontWeight: 700, marginBottom: 6
                }}>Property information</div>
                <h3 style={{
                  fontFamily: `'${displayFont}', serif`,
                  fontSize: 26, fontWeight: 400, letterSpacing: "-0.01em",
                  margin: "0 0 8px", color: p.ink, lineHeight: 1.1
                }}>Tell us about your property.</h3>
                <p style={{ fontSize: 14, color: p.inkSoft, margin: "0 0 20px" }}>
                  Fill out the form below and we'll reach out within one business day.
                </p>

                {/* Error message */}
                {status === "error" && (
                  <div style={{
                    marginBottom: 16, padding: 12,
                    background: "#FEF2F2", border: "1px solid #FECACA",
                    borderRadius: 10, color: "#991B1B", fontSize: 14
                  }}>
                    {errorMsg}
                  </div>
                )}

                {/* Contact row */}
                <div className="ys-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div>
                    <label style={labelStyle}>Your name *</label>
                    <input required style={fieldStyle(fieldErrors.name)} value={form.name} onChange={e => update("name", e.target.value)} />
                    {fieldErrors.name && <span style={{ fontSize: 12, color: "#991B1B" }}>{fieldErrors.name}</span>}
                  </div>
                  <div>
                    <label style={labelStyle}>Phone *</label>
                    <input required type="tel" style={fieldStyle(fieldErrors.phone)} value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="(___) ___-____" />
                    {fieldErrors.phone && <span style={{ fontSize: 12, color: "#991B1B" }}>{fieldErrors.phone}</span>}
                  </div>
                </div>
                <div style={{ marginTop: 12 }}>
                  <label style={labelStyle}>Email *</label>
                  <input required type="email" style={fieldStyle(fieldErrors.email)} value={form.email} onChange={e => update("email", e.target.value)} />
                  {fieldErrors.email && <span style={{ fontSize: 12, color: "#991B1B" }}>{fieldErrors.email}</span>}
                </div>

                {/* Property */}
                <div style={{
                  marginTop: 20, paddingTop: 16,
                  borderTop: `1px solid ${p.line}`
                }}>
                  <label style={labelStyle}>Property address</label>
                  <input required style={fieldStyle()} value={form.addr} onChange={e => update("addr", e.target.value)} placeholder="Street, city, ZIP" />
                </div>
                <div className="ys-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
                  <div>
                    <label style={labelStyle}>Property type</label>
                    <select style={fieldStyle()} value={form.type} onChange={e => update("type", e.target.value)}>
                      <option>Single-family</option>
                      <option>Duplex</option>
                      <option>Triplex / Fourplex</option>
                      <option>Small multifamily (5+)</option>
                      <option>Townhome / Condo</option>
                      <option>Land / Lot</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Timeline</label>
                    <select style={fieldStyle()} value={form.timeline} onChange={e => update("timeline", e.target.value)}>
                      <option>Just exploring</option>
                      <option>Within 30 days</option>
                      <option>1–3 months</option>
                      <option>3–6 months</option>
                      <option>6+ months</option>
                    </select>
                  </div>
                </div>
                <div className="ys-form-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginTop: 12 }}>
                  <div>
                    <label style={labelStyle}>Beds</label>
                    <input style={fieldStyle()} value={form.beds} onChange={e => update("beds", e.target.value)} placeholder="3" />
                  </div>
                  <div>
                    <label style={labelStyle}>Baths</label>
                    <input style={fieldStyle()} value={form.baths} onChange={e => update("baths", e.target.value)} placeholder="2" />
                  </div>
                  <div>
                    <label style={labelStyle}>Sq ft</label>
                    <input style={fieldStyle()} value={form.sqft} onChange={e => update("sqft", e.target.value)} placeholder="1,500" />
                  </div>
                </div>
                <div style={{ marginTop: 12 }}>
                  <label style={labelStyle}>Anything else? <span style={{ textTransform: "none", letterSpacing: 0, color: p.inkSoft, fontWeight: 400 }}>(Optional)</span></label>
                  <textarea rows={3} style={{ ...fieldStyle(), resize: "vertical", minHeight: 80 }} value={form.notes} onChange={e => update("notes", e.target.value)} placeholder="Condition, occupancy, why you're selling…" />
                </div>

                {/* Honeypot */}
                <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", opacity: 0, pointerEvents: "none", height: 0, width: 0 }} value="" readOnly />

                <button type="submit" disabled={status === "sending"} style={{
                  marginTop: 20, width: "100%",
                  padding: "15px 24px",
                  background: status === "sending" ? p.line : p.primary,
                  color: p.paper,
                  border: "none", fontSize: 15, fontWeight: 700,
                  cursor: status === "sending" ? "wait" : "pointer",
                  fontFamily: "inherit",
                  letterSpacing: "0.01em", borderRadius: 10,
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 10,
                  transition: "all 200ms ease",
                  boxShadow: status === "sending" ? "none" : "0 4px 16px rgba(27, 42, 74, 0.18)"
                }}
                onMouseOver={(e) => { if (status !== "sending") { e.currentTarget.style.background = p.primarySoft; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(27, 42, 74, 0.24)"; } }}
                onMouseOut={(e) => { if (status !== "sending") { e.currentTarget.style.background = p.primary; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(27, 42, 74, 0.18)"; } }}>
                  {status === "sending" ? "Sending..." : "Send my property info"}
                  {status !== "sending" && <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
                </button>
                <p style={{ fontSize: 12, color: p.inkSoft, marginTop: 12, lineHeight: 1.5, textAlign: "center" }}>
                  We'll review and reach out within one business day. No spam, no listing pressure.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

window.SellProperty = SellProperty;

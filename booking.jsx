/* global React */
const { useState: useStateB, useEffect: useEffectB, useMemo: useMemoB } = React;

/* ============================================================
   Tour booking modal — 3-step flow
   Connects to real backend via Yellowstone Asset Management API
============================================================ */

const BOOKING_PROPERTIES = [
  { id: "kings-haven",    name: "Kings Haven",        addr: "410 S 2nd St",     bed: "2BR · 1BA",   price: "$925" },
  { id: "kings-manor",    name: "Kings Manor",        addr: "328 S 2nd St",     bed: "3BR · 2.5BA", price: "$1,595" },
  { id: "kings-haven-100",name: "Kings Haven (100)",  addr: "100 S 2nd St",     bed: "1BR · 1BA",   price: "$850" },
  { id: "french-quarter", name: "French Quarter",     addr: "2550 S Bypass 35", bed: "2BR · 1BA",   price: "$950" },
  { id: "white-house",    name: "White House",        addr: "1606 W Sealy",     bed: "2BR · 1BA",   price: "$925" },
  { id: "any",            name: "I'm not sure yet",   addr: "We'll show you a few options", bed: "Mixed", price: "—" }
];

const TIME_SLOTS = [
  "9:00 AM", "10:00 AM", "11:00 AM",
  "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
];

function nextDays(count = 14) {
  const out = [];
  const today = new Date();
  let d = new Date(today);
  d.setDate(d.getDate() + 1);
  while (out.length < count) {
    if (d.getDay() !== 0) {
      out.push(new Date(d));
    }
    d.setDate(d.getDate() + 1);
  }
  return out;
}

const DAY_LABELS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];
const MONTH_LABELS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function formatDate(d) {
  return `${DAY_LABELS[d.getDay()]}, ${MONTH_LABELS[d.getMonth()]} ${d.getDate()}`;
}
function isoDate(d) {
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
}

function TourBooking({ open, onClose, p, displayFont, initialPropertyId, inline }) {
  const [step, setStep] = useStateB(1);
  const [propId, setPropId] = useStateB(initialPropertyId || "");
  const [date, setDate] = useStateB(null);
  const [time, setTime] = useStateB("");
  const [name, setName] = useStateB("");
  const [phone, setPhone] = useStateB("");
  const [email, setEmail] = useStateB("");
  const [moveBy, setMoveBy] = useStateB("");
  const [notes, setNotes] = useStateB("");
  const [submitted, setSubmitted] = useStateB(false);
  const [status, setStatus] = useStateB("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useStateB("");
  const [fieldErrors, setFieldErrors] = useStateB({});
  const days = useMemoB(() => nextDays(14), []);

  useEffectB(() => {
    if (open || inline) {
      setStep(1);
      setSubmitted(false);
      setStatus("idle");
      setErrorMsg("");
      setFieldErrors({});
      if (initialPropertyId) setPropId(initialPropertyId);
    }
  }, [open, initialPropertyId, inline]);

  useEffectB(() => {
    if (open && !inline) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [open, inline]);

  useEffectB(() => {
    if (!open || inline) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose, inline]);

  if (!open && !inline) return null;

  const selectedProp = BOOKING_PROPERTIES.find(b => b.id === propId);

  const canNext1 = !!propId;
  const canNext2 = !!date && !!time;
  const canSubmit = !!name && (!!phone || !!email);

  function validateStep3() {
    const errors = {};
    if (!name || name.trim().length < 2) {
      errors.name = "Please enter your full name.";
    }
    if (email && !window.RentInAlvinAPI.isValidEmail(email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (phone && !window.RentInAlvinAPI.isValidPhone(phone)) {
      errors.phone = "Please enter a valid phone number.";
    }
    if (!phone && !email) {
      errors.contact = "Please provide a phone number or email address.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit() {
    if (!canSubmit) return;
    if (!validateStep3()) return;

    setStatus("sending");

    const result = await window.RentInAlvinAPI.submitTour({
      property: selectedProp ? selectedProp.name : "",
      name,
      phone,
      email,
      date: date ? isoDate(date) : "",
      time,
      moveBy,
      notes,
      page: window.location.href
    });

    if (result.success) {
      setSubmitted(true);
      setStatus("success");
    } else {
      setStatus("error");
      setErrorMsg(result.error || "Failed to submit. Please call us at (832) 210-3968.");
    }
  }

  const modalWrapper = (content) => (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "fixed", inset: 0, zIndex: 10000,
        background: "rgba(27, 42, 74, 0.55)",
        backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 20,
        animation: "ys-fade-in 200ms ease"
      }}>
      <style>{`
        @keyframes ys-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes ys-slide-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
      {content}
    </div>
  );

  const cardContent = (
    <div style={{
      background: p.paper,
      width: "100%", maxWidth: 680, maxHeight: inline ? "none" : "92vh",
      display: "flex", flexDirection: "column",
      animation: inline ? undefined : "ys-slide-up 260ms cubic-bezier(0.2, 0.8, 0.2, 1)",
      boxShadow: inline ? undefined : "0 24px 64px rgba(27, 42, 74, 0.25)",
      overflow: "hidden",
      borderRadius: inline ? 0 : 16
    }}>
        {/* Header */}
        <div style={{
          padding: "20px 24px",
          borderBottom: `1px solid ${p.line}`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          background: p.paper,
          flexShrink: 0
        }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: p.accent, fontWeight: 600 }}>
              {submitted ? "Request sent" : `Step ${step} of 3`}
            </div>
            <div style={{
              fontFamily: `'${displayFont}', serif`,
              fontSize: 24, color: p.ink, marginTop: 4, fontWeight: 400
            }}>
              {submitted ? "Tour request submitted" :
               step === 1 ? "Pick a property" :
               step === 2 ? "Pick a date & time" :
                            "How do we reach you?"}
            </div>
          </div>
          {!inline && (
            <button onClick={onClose} aria-label="Close" style={{
              background: "transparent", border: "none", cursor: "pointer",
              color: p.ink, padding: 12, fontSize: 18, lineHeight: 1,
              borderRadius: 10,
              transition: "background 200ms ease",
              flexShrink: 0
            }}
            onMouseOver={(e) => e.currentTarget.style.background = p.bg}
            onMouseOut={(e) => e.currentTarget.style.background = "transparent"}
            >✕</button>
          )}
        </div>

        {/* Progress bar */}
        {!submitted && (
          <div style={{ height: 3, background: p.line, position: "relative", flexShrink: 0 }}>
            <div style={{
              position: "absolute", inset: 0, right: "auto",
              width: `${(step / 3) * 100}%`,
              background: p.primary,
              transition: "width 280ms ease"
            }}></div>
          </div>
        )}

        {/* Body */}
        <div style={{
          flex: 1, overflowY: "auto", padding: 24,
          background: p.paper
        }}>
          {/* ===== SUCCESS ===== */}
          {submitted && (
            <div style={{ textAlign: "center", padding: "16px 0 32px" }}>
              <div style={{
                width: 56, height: 56, borderRadius: "50%",
                background: p.primary, color: p.paper,
                display: "grid", placeItems: "center",
                fontSize: 28, margin: "0 auto 20px"
              }}>✓</div>
              <h3 style={{
                fontFamily: `'${displayFont}', serif`,
                fontSize: 26, fontWeight: 400, margin: "0 0 12px", color: p.ink
              }}>We'll be in touch within 24 hours.</h3>
              <p style={{ color: p.inkSoft, maxWidth: "40ch", margin: "0 auto", lineHeight: 1.55 }}>
                Your tour request has been sent to our leasing team. We respond same-day on weekdays before 4pm.
              </p>
              <div style={{
                marginTop: 24, padding: 16, background: p.bg, border: `1px solid ${p.line}`,
                borderRadius: 10,
                textAlign: "left", fontSize: 14, color: p.inkSoft
              }}>
                <strong style={{ color: p.ink }}>{selectedProp.name}</strong> · {selectedProp.addr}<br/>
                <strong style={{ color: p.ink }}>{date && formatDate(date)}</strong> at <strong style={{ color: p.ink }}>{time}</strong>
              </div>
              <button onClick={() => {
                if (inline) {
                  setStep(1); setSubmitted(false); setStatus("idle"); setPropId(""); setDate(null); setTime(""); setName(""); setPhone(""); setEmail(""); setMoveBy(""); setNotes("");
                } else {
                  onClose();
                }
              }} style={{
                marginTop: 20, padding: "12px 24px",
                background: p.ink, color: p.paper, border: "none",
                fontSize: 14, fontWeight: 600, cursor: "pointer",
                fontFamily: "inherit",
                borderRadius: 10,
                transition: "transform 200ms ease"
              }}
              onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-1px)"}
              onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>{inline ? "Send another request" : "Close"}</button>
            </div>
          )}

          {/* ===== ERROR ===== */}
          {status === "error" && !submitted && (
            <div style={{
              marginBottom: 16, padding: 12,
              background: "#FEF2F2", border: "1px solid #FECACA",
              borderRadius: 6, color: "#991B1B", fontSize: 14
            }}>
              {errorMsg}
            </div>
          )}

          {/* ===== STEP 1: PROPERTY ===== */}
          {!submitted && step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {BOOKING_PROPERTIES.map(b => (
                <button key={b.id} onClick={() => setPropId(b.id)} style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr auto",
                  gap: 14, alignItems: "center",
                  padding: "14px 16px",
                  background: propId === b.id ? p.bg : "transparent",
                  border: `1px solid ${propId === b.id ? p.primary : p.line}`,
                  cursor: "pointer", textAlign: "left",
                  fontFamily: "inherit",
                  borderRadius: 10,
                  transition: "all 200ms ease"
                }}>
                  <div style={{
                    width: 18, height: 18, borderRadius: "50%",
                    border: `2px solid ${propId === b.id ? p.primary : p.line}`,
                    background: propId === b.id ? p.primary : "transparent",
                    flex: "none",
                    boxShadow: propId === b.id ? `inset 0 0 0 3px ${p.paper}` : "none",
                    transition: "all 160ms ease"
                  }}></div>
                  <div>
                    <div style={{
                      fontFamily: `'${displayFont}', serif`,
                      fontSize: 18, color: p.ink, lineHeight: 1.2
                    }}>{b.name}</div>
                    <div style={{ fontSize: 12, color: p.inkSoft, marginTop: 2 }}>
                      {b.addr} · {b.bed}
                    </div>
                  </div>
                  <div style={{
                    fontFamily: "'Lora', serif",
                    fontSize: 16, color: p.primary, fontStyle: "italic"
                  }}>{b.price}</div>
                </button>
              ))}
            </div>
          )}

          {/* ===== STEP 2: DATE/TIME ===== */}
          {!submitted && step === 2 && (
            <div>
              <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: p.inkSoft, marginBottom: 10, fontWeight: 600 }}>
                Choose a date
              </div>
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(96px, 1fr))",
                gap: 8, marginBottom: 24
              }}>
                {days.map((d) => {
                  const sel = date && isoDate(d) === isoDate(date);
                  return (
                    <button key={isoDate(d)} onClick={() => setDate(d)} style={{
                      padding: "10px 6px",
                      background: sel ? p.primary : "transparent",
                      color: sel ? p.paper : p.ink,
                      border: `1px solid ${sel ? p.primary : p.line}`,
                      cursor: "pointer", fontFamily: "inherit",
                      display: "flex", flexDirection: "column", gap: 2,
                      alignItems: "center",
                      borderRadius: 6,
                      transition: "all 140ms ease"
                    }}>
                      <span style={{ fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.7 }}>
                        {DAY_LABELS[d.getDay()]}
                      </span>
                      <span style={{ fontFamily: `'${displayFont}', serif`, fontSize: 20, lineHeight: 1 }}>
                        {d.getDate()}
                      </span>
                      <span style={{ fontSize: 10, opacity: 0.7 }}>
                        {MONTH_LABELS[d.getMonth()]}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: p.inkSoft, marginBottom: 10, fontWeight: 600 }}>
                Choose a time
              </div>
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                gap: 8
              }}>
                {TIME_SLOTS.map(t => (
                  <button key={t} onClick={() => setTime(t)} style={{
                    padding: "10px 8px",
                    background: time === t ? p.primary : "transparent",
                    color: time === t ? p.paper : p.ink,
                    border: `1px solid ${time === t ? p.primary : p.line}`,
                    cursor: "pointer", fontFamily: "inherit",
                    fontSize: 14,
                    borderRadius: 10,
                    transition: "all 180ms ease"
                  }}>{t}</button>
                ))}
              </div>
            </div>
          )}

          {/* ===== STEP 3: CONTACT ===== */}
          {!submitted && step === 3 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <Field
                label="Your name *"
                value={name}
                onChange={setName}
                placeholder="Maria Garcia"
                p={p}
                error={fieldErrors.name}
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="ys-form-grid">
                <Field
                  label="Phone"
                  value={phone}
                  onChange={setPhone}
                  placeholder="(832) 210-3968"
                  type="tel"
                  p={p}
                  error={fieldErrors.phone}
                />
                <Field
                  label="Email"
                  value={email}
                  onChange={setEmail}
                  placeholder="you@email.com"
                  type="email"
                  p={p}
                  error={fieldErrors.email}
                />
              </div>
              {(fieldErrors.contact || fieldErrors.phone || fieldErrors.email) && (
                <div style={{ fontSize: 12, color: "#991B1B", marginTop: -4 }}>
                  {fieldErrors.contact || fieldErrors.phone || fieldErrors.email}
                </div>
              )}
              <div style={{ fontSize: 12, color: p.inkSoft, marginTop: -6 }}>Phone or email — at least one so we can confirm.</div>
              <Field label="Looking to move by" value={moveBy} onChange={setMoveBy} placeholder="June 1, ASAP, flexible…" p={p} />
              <Field label="Anything else we should know?" value={notes} onChange={setNotes} placeholder="Pets, parking needs, must-haves…" textarea p={p} />

              {/* Honeypot — hidden from real users */}
              <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", opacity: 0, pointerEvents: "none", height: 0, width: 0 }} value="" readOnly />

              <div style={{
                marginTop: 6, padding: 14, background: p.bg, border: `1px solid ${p.line}`,
                borderRadius: 10,
                fontSize: 13, color: p.inkSoft, lineHeight: 1.55
              }}>
                <strong style={{ color: p.ink }}>{selectedProp.name}</strong> · {date && formatDate(date)} at {time}
              </div>
            </div>
          )}
        </div>

        {/* Footer / nav */}
        {!submitted && (
          <div style={{
            padding: "14px 24px",
            borderTop: `1px solid ${p.line}`,
            display: "flex", justifyContent: "space-between", alignItems: "center",
            background: p.paper, gap: 12,
            flexShrink: 0
          }}>
            <button onClick={() => step > 1 ? setStep(step - 1) : inline ? (setStep(1), setSubmitted(false), setStatus("idle"), setPropId(""), setDate(null), setTime(""), setName(""), setPhone(""), setEmail(""), setMoveBy(""), setNotes("")) : onClose()} style={{
              background: "transparent", border: "none", cursor: "pointer",
              fontSize: 14, color: p.inkSoft, fontFamily: "inherit",
              padding: "12px 16px",
              transition: "color 200ms ease"
            }}
            onMouseOver={(e) => e.currentTarget.style.color = p.ink}
            onMouseOut={(e) => e.currentTarget.style.color = p.inkSoft}
            >{step === 1 ? (inline ? "Reset" : "Cancel") : "← Back"}</button>
            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                disabled={step === 1 ? !canNext1 : !canNext2}
                style={{
                  padding: "12px 24px",
                  background: (step === 1 ? canNext1 : canNext2) ? p.ink : p.line,
                  color: p.paper, border: "none", cursor: (step === 1 ? canNext1 : canNext2) ? "pointer" : "not-allowed",
                  fontSize: 14, fontWeight: 700, fontFamily: "inherit",
                  opacity: (step === 1 ? canNext1 : canNext2) ? 1 : 0.5,
                  borderRadius: 10,
                  transition: "all 200ms ease"
                }}>Continue →</button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={!canSubmit || status === "sending"}
                style={{
                  padding: "12px 24px",
                  background: canSubmit && status !== "sending" ? p.primary : p.line,
                  color: p.paper, border: "none",
                  cursor: canSubmit && status !== "sending" ? "pointer" : "not-allowed",
                  fontSize: 14, fontWeight: 700, fontFamily: "inherit",
                  opacity: canSubmit && status !== "sending" ? 1 : 0.5,
                  borderRadius: 10,
                  transition: "all 200ms ease"
                }}>
                {status === "sending" ? "Sending..." : "Request tour →"}
              </button>
            )}
          </div>
        )}
      </div>
  );

  return inline ? cardContent : modalWrapper(cardContent);
}

function Field({ label, value, onChange, placeholder, type = "text", textarea, p, error }) {
  return (
    <label style={{ display: "flex", flexDirection: "column", gap: 5 }}>
      <span style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: p.inkSoft, fontWeight: 600 }}>
        {label}
      </span>
      {textarea ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          rows={3}
          style={{
            padding: "13px 16px",
            border: `1px solid ${error ? '#EF4444' : p.line}`,
            background: p.bg,
            fontFamily: "inherit", fontSize: 16, color: p.ink,
            resize: "vertical",
            borderRadius: 10,
            outline: "none",
            transition: "border-color 200ms ease, box-shadow 200ms ease"
          }}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            padding: "13px 16px",
            border: `1px solid ${error ? '#EF4444' : p.line}`,
            background: p.bg,
            fontFamily: "inherit", fontSize: 16, color: p.ink,
            borderRadius: 10,
            outline: "none",
            transition: "border-color 200ms ease, box-shadow 200ms ease"
          }}
        />
      )}
      {error && <span style={{ fontSize: 12, color: "#991B1B" }}>{error}</span>}
    </label>
  );
}

function useTourBooking() {
  const [open, setOpen] = useStateB(false);
  const [propId, setPropId] = useStateB("");
  const openFor = (id) => { setPropId(id || ""); setOpen(true); };
  return { open, propId, openFor, close: () => setOpen(false) };
}

Object.assign(window, { TourBooking, useTourBooking });

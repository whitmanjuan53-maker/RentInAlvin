/* global React */
const { useState: useStateA } = React;

/* ============================================================
   Online Application, multi-step form
   Connects to real backend via Yellowstone Asset Management API
============================================================ */

const PROPERTY_OPTIONS = [
  "Kings Haven Apartments, 410 S 2nd St",
  "Kings Manor Townhomes, 328 S 2nd St",
  "Kings Haven Apartments, 100 S 2nd St",
  "French Quarter Residency, 2550 S Bypass 35",
"The White House Apartments, 1606 W Sealy St",
  "No preference, recommend one for me"
];

const UNIT_TYPES = [
  "1 Bed · 1 Bath",
  "2 Bed · 1 Bath",
  "2 Bed · 2 Bath",
  "3 Bed · 2 Bath",
  "3 Bed · 2.5 Bath"
];

const REQUIREMENTS = [
  { icon: "ID", label: "Government ID", detail: "Driver's license, state ID, or passport for each adult applicant." },
  { icon: "$", label: "Proof of income", detail: "Last two pay stubs or bank statements. We look for 3× the monthly rent." },
  { icon: "✦", label: "Application fee", detail: "$40 per adult applicant, payable online or at the office." }
];

const STEPS = [
  { id: "applicant", label: "About you" },
  { id: "household", label: "Household" },
  { id: "income", label: "Employment & income" },
  { id: "history", label: "Rental history" },
  { id: "preferences", label: "Unit preferences" },
  { id: "review", label: "Review & submit" }
];

function Field({ label, children, required, span, p }) {
  return (
    <label style={{
      display: "flex", flexDirection: "column", gap: 6,
      gridColumn: span ? `span ${span}` : "auto"
    }}>
      <span style={{
        fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
        color: p.inkSoft, fontWeight: 600
      }}>
        {label}{required && <span style={{ color: p.accent, marginLeft: 4 }}>*</span>}
      </span>
      {children}
    </label>
  );
}

function txt(p, error) {
  return {
    padding: "13px 16px",
    fontSize: 16,
    background: p.bg,
    border: `1px solid ${error ? '#EF4444' : p.line}`,
    borderRadius: 10,
    color: p.ink,
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 200ms ease, box-shadow 200ms ease",
    width: "100%"
  };
}

function Apply({ p, displayFont }) {
  const [step, setStep] = useStateA(0);
  const [submitted, setSubmitted] = useStateA(false);
  const [status, setStatus] = useStateA("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useStateA("");
  const [fieldErrors, setFieldErrors] = useStateA({});
  const [data, setData] = useStateA({
    firstName: "", lastName: "", email: "", phone: "", dob: "",
    currentAddress: "",
    coApplicants: "0", pets: "no", petDesc: "", vehicles: "1",
    employer: "", jobTitle: "", income: "", employedSince: "",
    prevLandlord: "", prevLandlordPhone: "", reasonLeaving: "",
    property: "", unitType: "", moveIn: "", budget: "", notes: "",
    consent: false
  });
  const update = (k, v) => setData(d => ({ ...d, [k]: v }));

  const canAdvance = () => {
    if (step === 0) return data.firstName && data.lastName && data.email && data.phone;
    if (step === 4) return data.property && data.unitType && data.moveIn;
    if (step === 5) return data.consent;
    return true;
  };

  function validateCurrentStep() {
    const errors = {};
    if (step === 0) {
      if (!data.firstName || data.firstName.trim().length < 2) errors.firstName = "First name is required.";
      if (!data.lastName || data.lastName.trim().length < 2) errors.lastName = "Last name is required.";
      if (!data.email) errors.email = "Email is required.";
      else if (!window.RentInAlvinAPI.isValidEmail(data.email)) errors.email = "Please enter a valid email.";
      if (!data.phone) errors.phone = "Phone is required.";
      else if (!window.RentInAlvinAPI.isValidPhone(data.phone)) errors.phone = "Please enter a valid phone number.";
    }
    if (step === 4) {
      if (!data.property) errors.property = "Please select a property.";
      if (!data.unitType) errors.unitType = "Please select a unit type.";
      if (!data.moveIn) errors.moveIn = "Please select a move-in date.";
    }
    if (step === 5) {
      if (!data.consent) errors.consent = "You must agree to the terms to submit.";
    }
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleSubmit() {
    if (!canAdvance()) return;
    if (!validateCurrentStep()) return;
    setStatus("sending");

    const result = await window.RentInAlvinAPI.submitApplication({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      dob: data.dob,
      currentAddress: data.currentAddress,
      coApplicants: data.coApplicants,
      pets: data.pets,
      petDesc: data.petDesc,
      vehicles: data.vehicles,
      employer: data.employer,
      jobTitle: data.jobTitle,
      income: data.income,
      employedSince: data.employedSince,
      prevLandlord: data.prevLandlord,
      prevLandlordPhone: data.prevLandlordPhone,
      reasonLeaving: data.reasonLeaving,
      property: data.property,
      unitType: data.unitType,
      moveIn: data.moveIn,
      budget: data.budget,
      notes: data.notes,
      consent: data.consent,
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

  if (submitted) {
    return (
      <section id="apply" style={{
        padding: "var(--pad-x-lg) var(--pad-x)",
        background: p.primary, color: p.paper,
        borderTop: `1px solid ${p.line}`
      }}>
        <div style={{ maxWidth: 640, margin: "0 auto", textAlign: "center" }}>
          <div style={{
            width: 56, height: 56, borderRadius: "50%",
            background: p.accent, color: p.paper,
            display: "grid", placeItems: "center", margin: "0 auto",
            fontSize: 24
          }}>✓</div>
          <h2 style={{
            fontFamily: `'${displayFont}', serif`,
            fontSize: "clamp(36px, 5vw, 56px)", lineHeight: 1.05,
            margin: "28px 0 0", fontWeight: 400, letterSpacing: "-0.02em"
          }}>
            Application received.
          </h2>
          <p style={{
            fontSize: 17, lineHeight: 1.6,
            color: `color-mix(in oklab, ${p.paper} 80%, transparent)`,
            marginTop: 16
          }}>
            Thanks, {data.firstName || "there"}. A confirmation will hit <strong>{data.email || "your inbox"}</strong> within an hour, and the leasing office will follow up by phone within one business day.
          </p>
          <div style={{
            marginTop: 32, display: "inline-flex", gap: 12, flexWrap: "wrap", justifyContent: "center"
          }}>
            <a href="tel:8322103968" style={{
              padding: "14px 24px", background: p.paper, color: p.primary,
              textDecoration: "none", fontWeight: 700, fontSize: 14, borderRadius: 10
            }}>Call (832) 210-3968</a>
            <a href="mailto:office@yellowstone-am.com" style={{
              padding: "14px 24px", background: "transparent", color: p.paper,
              textDecoration: "none", fontWeight: 700, fontSize: 14,
              border: `1px solid color-mix(in oklab, ${p.paper} 40%, transparent)`, borderRadius: 10
            }}>office@yellowstone-am.com</a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="apply" style={{
      padding: "var(--pad-x-lg) var(--pad-x)",
      background: p.bg,
      borderTop: `1px solid ${p.line}`
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="ys-section-head" style={{
          display: "grid", gridTemplateColumns: "1fr 2fr", gap: 48,
          alignItems: "start", marginBottom: 48
        }}>
          <div style={{
            fontSize: 12, letterSpacing: "0.14em", textTransform: "uppercase",
            color: p.accent, fontWeight: 600, paddingTop: 10
          }}>Apply online · 5 minutes</div>
          <div>
            <h2 style={{
              fontFamily: `'${displayFont}', serif`,
              fontSize: "clamp(32px, 4vw, 52px)",
              lineHeight: 1.05, letterSpacing: "-0.02em",
              margin: 0, color: p.ink, fontWeight: 400, maxWidth: "16ch"
            }}>Start your application from anywhere.</h2>
            <p style={{
              fontSize: 17, lineHeight: 1.6, color: p.inkSoft,
              maxWidth: "50ch", marginTop: 20
            }}>Most applications are decided within 48 hours. Have an ID and a recent pay stub handy.</p>
          </div>
        </div>

        {/* Error message */}
        {status === "error" && (
          <div style={{
            marginBottom: 24, padding: 16,
            background: "#FEF2F2", border: "1px solid #FECACA",
            borderRadius: 10, color: "#991B1B", fontSize: 14
          }}>
            {errorMsg}
          </div>
        )}

        {/* Requirements row */}
        <div className="ys-req-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
          marginBottom: 48
        }}>
          {REQUIREMENTS.map((r, i) => (
            <div key={i} style={{
              background: p.paper, padding: 20,
              borderRadius: 12,
              border: `1px solid ${p.line}`,
              boxShadow: "0 2px 8px rgba(27, 42, 74, 0.04)",
              transition: "transform 200ms ease, box-shadow 200ms ease",
              display: "flex", flexDirection: "column", gap: 8
            }}>
              <div style={{
                width: 32, height: 32,
                background: p.bg, color: p.primary,
                display: "grid", placeItems: "center",
                borderRadius: 8, fontSize: 13, fontWeight: 700,
                fontFamily: "'Source Sans 3', sans-serif"
              }}>{r.icon}</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: p.ink }}>{r.label}</div>
              <div style={{ fontSize: 13, lineHeight: 1.5, color: p.inkSoft }}>{r.detail}</div>
            </div>
          ))}
        </div>

        {/* Form */}
        <div className="ys-apply-grid" style={{
          display: "grid", gridTemplateColumns: "220px 1fr", gap: 40
        }}>
          {/* Stepper */}
          <div className="ys-apply-stepper">
            {STEPS.map((s, i) => {
              const done = i < step;
              const active = i === step;
              return (
                <button key={s.id}
                  onClick={() => i < step && setStep(i)}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "12px 0",
                    background: "transparent", border: "none",
                    borderBottom: `1px solid ${p.line}`,
                    cursor: i <= step ? "pointer" : "default",
                    fontFamily: "inherit", textAlign: "left",
                    width: "100%",
                    opacity: active ? 1 : (done ? 0.85 : 0.45)
                  }}>
                  <span style={{
                    width: 24, height: 24, borderRadius: "50%",
                    background: active ? p.ink : (done ? p.accent : "transparent"),
                    color: active || done ? p.paper : p.inkSoft,
                    border: active || done ? "none" : `1px solid ${p.line}`,
                    display: "grid", placeItems: "center",
                    fontSize: 11, fontWeight: 600, flexShrink: 0,
                    fontFamily: "'Source Sans 3', sans-serif"
                  }}>{done ? "✓" : i + 1}</span>
                  <span style={{
                    fontSize: 13, fontWeight: active ? 600 : 500,
                    color: p.ink
                  }}>{s.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form panel */}
          <div style={{
            background: p.paper,
            border: `1px solid ${p.line}`,
            borderRadius: 14,
            padding: "32px 36px",
            boxShadow: "0 4px 24px rgba(27, 42, 74, 0.06)",
            minHeight: 440,
            display: "flex", flexDirection: "column"
          }}>
            <div style={{
              fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
              color: p.accent, fontWeight: 600
            }}>Step {step + 1} of {STEPS.length}</div>
            <h3 style={{
              fontFamily: `'${displayFont}', serif`,
              fontSize: "clamp(28px, 3vw, 32px)", fontWeight: 400, letterSpacing: "-0.01em",
              lineHeight: 1.1, margin: "8px 0 28px"
            }}>{STEPS[step].label}</h3>

            <div style={{ flex: 1 }}>
              {step === 0 && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="ys-form-grid">
                  <Field label="First name" required p={p}>
                    <input style={txt(p, fieldErrors.firstName)} value={data.firstName} onChange={e => update("firstName", e.target.value)} />
                    {fieldErrors.firstName && <span style={{ fontSize: 12, color: "#991B1B" }}>{fieldErrors.firstName}</span>}
                  </Field>
                  <Field label="Last name" required p={p}>
                    <input style={txt(p, fieldErrors.lastName)} value={data.lastName} onChange={e => update("lastName", e.target.value)} />
                    {fieldErrors.lastName && <span style={{ fontSize: 12, color: "#991B1B" }}>{fieldErrors.lastName}</span>}
                  </Field>
                  <Field label="Email" required p={p}>
                    <input type="email" style={txt(p, fieldErrors.email)} value={data.email} onChange={e => update("email", e.target.value)} />
                    {fieldErrors.email && <span style={{ fontSize: 12, color: "#991B1B" }}>{fieldErrors.email}</span>}
                  </Field>
                  <Field label="Phone" required p={p}>
                    <input type="tel" style={txt(p, fieldErrors.phone)} value={data.phone} onChange={e => update("phone", e.target.value)} placeholder="(___) ___-____" />
                    {fieldErrors.phone && <span style={{ fontSize: 12, color: "#991B1B" }}>{fieldErrors.phone}</span>}
                  </Field>
                  <Field label="Date of birth" p={p}>
                    <input type="date" style={txt(p)} value={data.dob} onChange={e => update("dob", e.target.value)} />
                  </Field>
                  <Field label="Current address" span={2} p={p}>
                    <input style={txt(p)} value={data.currentAddress} onChange={e => update("currentAddress", e.target.value)} placeholder="Street, city, state, zip" />
                  </Field>
                </div>
              )}

              {step === 1 && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="ys-form-grid">
                  <Field label="Co-applicants (18+)" p={p}>
                    <select style={txt(p)} value={data.coApplicants} onChange={e => update("coApplicants", e.target.value)}>
                      {["0","1","2","3","4+"].map(n => <option key={n}>{n}</option>)}
                    </select>
                  </Field>
                  <Field label="Vehicles" p={p}>
                    <select style={txt(p)} value={data.vehicles} onChange={e => update("vehicles", e.target.value)}>
                      {["0","1","2","3+"].map(n => <option key={n}>{n}</option>)}
                    </select>
                  </Field>
                  <Field label="Pets" span={2} p={p}>
                    <div style={{ display: "flex", gap: 8 }}>
                      {["no", "cat", "dog", "both"].map(v => (
                        <button key={v} type="button" onClick={() => update("pets", v)} style={{
                          padding: "10px 16px", flex: 1,
                          background: data.pets === v ? p.ink : "transparent",
                          color: data.pets === v ? p.paper : p.ink,
                          border: `1px solid ${data.pets === v ? p.ink : p.line}`,
                          borderRadius: 10, fontSize: 13, fontWeight: 500,
                          cursor: "pointer", fontFamily: "inherit",
                          textTransform: "capitalize",
                          transition: "all 160ms ease"
                        }}>{v === "no" ? "No pets" : v}</button>
                      ))}
                    </div>
                  </Field>
                  {data.pets !== "no" && (
                    <Field label="Pet details (breed, weight, age)" span={2} p={p}>
                      <input style={txt(p)} value={data.petDesc} onChange={e => update("petDesc", e.target.value)} placeholder="e.g. Labrador, 65 lbs, 4 years" />
                    </Field>
                  )}
                </div>
              )}

              {step === 2 && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="ys-form-grid">
                  <Field label="Employer" required p={p} span={2}>
                    <input style={txt(p)} value={data.employer} onChange={e => update("employer", e.target.value)} />
                  </Field>
                  <Field label="Job title" p={p}>
                    <input style={txt(p)} value={data.jobTitle} onChange={e => update("jobTitle", e.target.value)} />
                  </Field>
                  <Field label="Employed since" p={p}>
                    <input type="month" style={txt(p)} value={data.employedSince} onChange={e => update("employedSince", e.target.value)} />
                  </Field>
                  <Field label="Gross monthly income" required span={2} p={p}>
                    <div style={{ position: "relative" }}>
                      <span style={{
                        position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)",
                        color: p.inkSoft, fontSize: 15
                      }}>$</span>
                      <input style={{ ...txt(p), paddingLeft: 28 }} value={data.income} onChange={e => update("income", e.target.value)} placeholder="3,500" />
                    </div>
                  </Field>
                </div>
              )}

              {step === 3 && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="ys-form-grid">
                  <Field label="Previous landlord (name)" p={p}>
                    <input style={txt(p)} value={data.prevLandlord} onChange={e => update("prevLandlord", e.target.value)} />
                  </Field>
                  <Field label="Landlord phone" p={p}>
                    <input type="tel" style={txt(p)} value={data.prevLandlordPhone} onChange={e => update("prevLandlordPhone", e.target.value)} />
                  </Field>
                  <Field label="Reason for leaving" span={2} p={p}>
                    <textarea rows={3} style={{ ...txt(p), resize: "vertical", fontFamily: "inherit" }} value={data.reasonLeaving} onChange={e => update("reasonLeaving", e.target.value)} />
                  </Field>
                  <div style={{
                    gridColumn: "1 / -1",
                    fontSize: 13, color: p.inkSoft, lineHeight: 1.5,
                    padding: 14, background: p.bg, border: `1px solid ${p.line}`, borderRadius: 10
                  }}>
                    First-time renter? Leave these blank, we'll discuss your situation when we follow up.
                  </div>
                </div>
              )}

              {step === 4 && (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="ys-form-grid">
                  <Field label="Preferred property" required span={2} p={p}>
                    <select style={txt(p, fieldErrors.property)} value={data.property} onChange={e => update("property", e.target.value)}>
                      <option value="">Choose a property…</option>
                      {PROPERTY_OPTIONS.map(o => <option key={o}>{o}</option>)}
                    </select>
                    {fieldErrors.property && <span style={{ fontSize: 12, color: "#991B1B" }}>{fieldErrors.property}</span>}
                  </Field>
                  <Field label="Unit type" required p={p}>
                    <select style={txt(p, fieldErrors.unitType)} value={data.unitType} onChange={e => update("unitType", e.target.value)}>
                      <option value="">Select…</option>
                      {UNIT_TYPES.map(o => <option key={o}>{o}</option>)}
                    </select>
                    {fieldErrors.unitType && <span style={{ fontSize: 12, color: "#991B1B" }}>{fieldErrors.unitType}</span>}
                  </Field>
                  <Field label="Earliest move-in" required p={p}>
                    <input type="date" style={txt(p, fieldErrors.moveIn)} value={data.moveIn} onChange={e => update("moveIn", e.target.value)} />
                    {fieldErrors.moveIn && <span style={{ fontSize: 12, color: "#991B1B" }}>{fieldErrors.moveIn}</span>}
                  </Field>
                  <Field label="Monthly budget" p={p}>
                    <div style={{ position: "relative" }}>
                      <span style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: p.inkSoft, fontSize: 15 }}>$</span>
                      <input style={{ ...txt(p), paddingLeft: 28 }} value={data.budget} onChange={e => update("budget", e.target.value)} placeholder="1,200" />
                    </div>
                  </Field>
                  <Field label="Anything else we should know?" span={2} p={p}>
                    <textarea rows={3} style={{ ...txt(p), resize: "vertical", fontFamily: "inherit" }} value={data.notes} onChange={e => update("notes", e.target.value)} />
                  </Field>
                </div>
              )}

              {step === 5 && (
                <div>
                  <div style={{
                    background: p.bg, border: `1px solid ${p.line}`,
                    padding: 20, borderRadius: 10, marginBottom: 20
                  }}>
                    <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: p.inkSoft, fontWeight: 600, marginBottom: 12 }}>Summary</div>
                    <dl style={{
                      display: "grid", gridTemplateColumns: "auto 1fr", gap: "8px 20px",
                      margin: 0, fontSize: 14
                    }}>
                      {[
                        ["Applicant", `${data.firstName || ""} ${data.lastName || ""}`.trim() || "—"],
                        ["Contact", data.email && data.phone ? `${data.email} · ${data.phone}` : "—"],
                        ["Pets", data.pets === "no" ? "None" : (data.petDesc || data.pets)],
                        ["Income", data.income ? `$${data.income}/mo` : "—"],
                        ["Property", data.property || "—"],
                        ["Unit type", data.unitType || "—"],
                        ["Move-in", data.moveIn || "—"]
                      ].map(([k, v]) => (
                        <React.Fragment key={k}>
                          <dt style={{ color: p.inkSoft, fontWeight: 500 }}>{k}</dt>
                          <dd style={{ margin: 0, color: p.ink }}>{v}</dd>
                        </React.Fragment>
                      ))}
                    </dl>
                  </div>
                  <label style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    padding: 16, border: `1px solid ${fieldErrors.consent ? '#EF4444' : p.line}`, borderRadius: 10,
                    cursor: "pointer", background: data.consent ? p.bg : "transparent",
                    transition: "background 160ms ease"
                  }}>
                    <input type="checkbox" checked={data.consent} onChange={e => update("consent", e.target.checked)} style={{ marginTop: 2, accentColor: p.primary }} />
                    <span style={{ fontSize: 13, color: p.inkSoft, lineHeight: 1.55 }}>
                      I authorize Yellowstone Asset Management to verify the information above, including credit history, rental history, employment, and background. I understand the $40 application fee is non-refundable. Equal Housing Opportunity.
                    </span>
                  </label>
                  {fieldErrors.consent && <span style={{ fontSize: 12, color: "#991B1B", marginTop: 6, display: "block" }}>{fieldErrors.consent}</span>}

                  {/* Honeypot */}
                  <input type="text" name="website" tabIndex={-1} autoComplete="off" style={{ position: "absolute", opacity: 0, pointerEvents: "none", height: 0, width: 0 }} value="" readOnly />
                </div>
              )}
            </div>

            <div style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginTop: 28, paddingTop: 20, borderTop: `1px solid ${p.line}`
            }}>
              <button onClick={() => setStep(s => Math.max(0, s - 1))} disabled={step === 0} style={{
                padding: "10px 18px", background: "transparent",
                border: `1px solid ${step === 0 ? p.line : p.ink}`,
                color: step === 0 ? p.inkSoft : p.ink,
                fontSize: 14, fontWeight: 500, borderRadius: 10,
                cursor: step === 0 ? "default" : "pointer",
                fontFamily: "inherit",
                transition: "all 160ms ease"
              }}>← Back</button>
              {step < STEPS.length - 1 ? (
                <button onClick={() => {
                  if (validateCurrentStep()) setStep(s => s + 1);
                }} disabled={!canAdvance()} style={{
                  padding: "12px 22px",
                  background: canAdvance() ? p.primary : p.line,
                  color: p.paper, fontSize: 14, fontWeight: 600,
                  border: "none", borderRadius: 10,
                  cursor: canAdvance() ? "pointer" : "default",
                  fontFamily: "inherit",
                  transition: "all 160ms ease"
                }}>Continue →</button>
              ) : (
                <button onClick={handleSubmit} disabled={!canAdvance() || status === "sending"} style={{
                  padding: "12px 24px",
                  background: canAdvance() && status !== "sending" ? p.accent : p.line,
                  color: p.paper, fontSize: 14, fontWeight: 600,
                  border: "none", borderRadius: 10,
                  cursor: canAdvance() && status !== "sending" ? "pointer" : "default",
                  fontFamily: "inherit",
                  transition: "all 160ms ease"
                }}>
                  {status === "sending" ? "Submitting..." : "Submit application"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Apply = Apply;

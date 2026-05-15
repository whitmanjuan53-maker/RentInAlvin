/* global React, ReactDOM */
const { useEffect } = React;

const {
  TWEAK_DEFAULTS, PALETTES,
  Nav, Footer, SectionHead
} = window.Shared;

const { FAQ } = window;

function AboutPage() {
  const [tweaks, setTweak] = (window.useTweaks || (() => [TWEAK_DEFAULTS, () => {}]))(TWEAK_DEFAULTS);
  const p = PALETTES[tweaks.palette] || PALETTES.forest;
  const displayFont = tweaks.displayFont;

  useEffect(() => {
    document.body.style.background = p.bg;
    document.body.style.color = p.ink;
  }, [p]);

  return (
    <div style={{ background: p.bg, color: p.ink, minHeight: "100vh" }}>
      <Nav p={p} currentPage="about" />

      <section style={{ padding: "120px var(--pad-x) 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHead
            p={p}
            displayFont={displayFont}
            eyebrow="About"
            title="Family-run property management in Alvin." />
        </div>
      </section>

      <section style={{ padding: "40px var(--pad-x) 80px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start" }} className="ys-about-grid">
            <div>
              <p style={{ fontSize: 18, lineHeight: 1.65, color: p.inkSoft, margin: "0 0 20px" }}>
                <strong style={{ color: p.ink }}>RentInAlvin</strong> is managed by Yellowstone Asset Management, a family-run property management company based at 410 S 2nd Street in Alvin, Texas.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.65, color: p.inkSoft, margin: "0 0 20px" }}>
                We lease and maintain over 160 units across five properties in Alvin. Our team lives here, works here, and knows the properties personally. When you call, you talk to someone who can actually help — not a call center in another state.
              </p>
              <p style={{ fontSize: 17, lineHeight: 1.65, color: p.inkSoft, margin: 0 }}>
                We believe in honest pricing, responsive maintenance, and treating renters with respect. No bait-and-switch, no hidden fees, no runaround.
              </p>
            </div>
            <div style={{
              background: p.paper,
              border: `1px solid ${p.line}`,
              borderRadius: 8,
              padding: 32
            }}>
              <h3 style={{
                fontFamily: `'${displayFont}', serif`,
                fontSize: 22, fontWeight: 400, letterSpacing: "-0.01em",
                margin: "0 0 20px", color: p.ink
              }}>At a glance</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  ["150+", "units managed"],
                  ["5", "properties in Alvin"],
                  ["$890", "starting monthly rent"],
                  ["48 hrs", "average application decision"],
                  ["Local", "family-run team"]
                ].map(([n, label], i) => (
                  <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", paddingBottom: 14, borderBottom: i < 4 ? `1px solid ${p.line}` : "none" }}>
                    <span style={{ fontSize: 15, color: p.inkSoft }}>{label}</span>
                    <span style={{ fontFamily: `'${displayFont}', serif`, fontSize: 22, color: p.ink }}>{n}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {FAQ && <FAQ p={p} displayFont={displayFont} />}

      <section style={{ padding: "80px var(--pad-x)", background: p.paper }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontFamily: `'${displayFont}', serif`,
            fontSize: "clamp(28px, 3.5vw, 44px)",
            lineHeight: 1.05, letterSpacing: "-0.02em",
            margin: "0 auto", color: p.ink, fontWeight: 400,
            maxWidth: "16ch"
          }}>Have more questions?</h2>
          <p style={{
            fontSize: 17, lineHeight: 1.6, color: p.inkSoft,
            maxWidth: "48ch", margin: "14px auto 0"
          }}>We're happy to talk. Call, email, or book a tour and we'll answer everything in person.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
            <a href="contact.html" style={{
              padding: "14px 24px", background: p.primary, color: p.paper,
              textDecoration: "none", fontSize: 15, fontWeight: 600,
              borderRadius: 10, display: "inline-flex", alignItems: "center", gap: 10,
              transition: "transform 180ms ease, background 180ms ease"
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.background = p.primarySoft; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = p.primary; }}>
              Contact us
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </a>
            <a href="book-tour.html" style={{
              padding: "14px 24px", background: "transparent", color: p.ink,
              textDecoration: "none", fontSize: 15, fontWeight: 600,
              borderRadius: 10, border: `1px solid ${p.ink}`,
              transition: "all 180ms ease"
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = p.ink; e.currentTarget.style.color = p.paper; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = p.ink; }}>
              Book a tour
            </a>
          </div>
        </div>
      </section>

      <Footer p={p} displayFont={displayFont} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<AboutPage />);

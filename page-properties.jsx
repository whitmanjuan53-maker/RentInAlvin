/* global React, ReactDOM */
const { useEffect } = React;

const {
  TWEAK_DEFAULTS, PALETTES,
  Nav, Footer, SectionHead, PropertyCard, Properties, Floorplans
} = window.Shared;

const { Availability } = window;

function PropertiesPage() {
  const [tweaks, setTweak] = (window.useTweaks || (() => [TWEAK_DEFAULTS, () => {}]))(TWEAK_DEFAULTS);
  const p = PALETTES[tweaks.palette] || PALETTES.forest;
  const displayFont = tweaks.displayFont;

  useEffect(() => {
    document.body.style.background = p.bg;
    document.body.style.color = p.ink;
  }, [p]);

  return (
    <div style={{ background: p.bg, color: p.ink, minHeight: "100vh" }}>
      <Nav p={p} currentPage="properties" />

      <section style={{ padding: "120px var(--pad-x) 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{
            fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
            color: p.accent, fontWeight: 600, marginBottom: 14
          }}>Our properties</div>
          <h1 style={{
            fontFamily: `'${displayFont}', serif`,
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 1, letterSpacing: "-0.02em",
            margin: 0, color: p.ink, fontWeight: 400,
            maxWidth: "14ch"
          }}>Five communities in Alvin.</h1>
          <p style={{
            fontSize: 18, lineHeight: 1.6, color: p.inkSoft,
            maxWidth: "50ch", marginTop: 16
          }}>Every property is within a seven-minute drive of our office. Browse floor plans and availability below.</p>
        </div>
      </section>

      <Properties p={p} displayFont={displayFont} />
      <Floorplans p={p} displayFont={displayFont} />
      {Availability && <Availability p={p} displayFont={displayFont} />}

      <section style={{ padding: "80px var(--pad-x)", background: p.paper }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontFamily: `'${displayFont}', serif`,
            fontSize: "clamp(28px, 3.5vw, 44px)",
            lineHeight: 1.05, letterSpacing: "-0.02em",
            margin: "0 auto", color: p.ink, fontWeight: 400,
            maxWidth: "16ch"
          }}>Ready to schedule a tour?</h2>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 24 }}>
            <a href="book-tour.html" style={{
              padding: "14px 24px", background: p.primary, color: p.paper,
              textDecoration: "none", fontSize: 15, fontWeight: 600,
              borderRadius: 10, display: "inline-flex", alignItems: "center", gap: 10,
              transition: "transform 180ms ease, background 180ms ease"
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.background = p.primarySoft; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = p.primary; }}>
              Book a tour
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </a>
            <a href="apply.html" style={{
              padding: "14px 24px", background: "transparent", color: p.ink,
              textDecoration: "none", fontSize: 15, fontWeight: 600,
              borderRadius: 10, border: `1px solid ${p.ink}`,
              transition: "all 180ms ease"
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = p.ink; e.currentTarget.style.color = p.paper; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = p.ink; }}>
              Apply now
            </a>
          </div>
        </div>
      </section>

      <Footer p={p} displayFont={displayFont} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<PropertiesPage />);

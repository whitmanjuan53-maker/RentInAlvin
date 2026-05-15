/* global React, ReactDOM */
const { useEffect } = React;

const {
  TWEAK_DEFAULTS, PALETTES,
  Nav, Footer, SectionHead
} = window.Shared;

const { AlvinMap } = window;

function LocationPage() {
  const [tweaks, setTweak] = (window.useTweaks || (() => [TWEAK_DEFAULTS, () => {}]))(TWEAK_DEFAULTS);
  const p = PALETTES[tweaks.palette] || PALETTES.forest;
  const displayFont = tweaks.displayFont;

  useEffect(() => {
    document.body.style.background = p.bg;
    document.body.style.color = p.ink;
  }, [p]);

  return (
    <div style={{ background: p.bg, color: p.ink, minHeight: "100vh" }}>
      <Nav p={p} currentPage="location" />

      <section style={{ padding: "120px var(--pad-x) 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="ys-location-hero" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
            <SectionHead
              p={p}
              displayFont={displayFont}
              eyebrow="Location"
              title="Everything is close in Alvin."
              lead="All five properties are within city limits and a short drive from our leasing office." />
            <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: `1px solid ${p.line}`, aspectRatio: "4/3", background: p.paper, marginTop: 32 }}>
              <img
                src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop&q=80"
                alt="Alvin local schools"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              <div style={{
                position: "absolute", bottom: 0, left: 0, right: 0,
                padding: "20px 24px",
                background: "linear-gradient(to top, rgba(27,42,74,0.65), transparent)",
                color: "#fff"
              }}>
                <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.04em" }}>Alvin Independent School District</div>
                <div style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>Highly rated schools minutes from every property</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {AlvinMap && <AlvinMap p={p} displayFont={displayFont} />}

      <section style={{ padding: "80px var(--pad-x)", background: p.paper }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48 }} className="ys-contact-grid">
            <div>
              <h3 style={{
                fontFamily: `'${displayFont}', serif`,
                fontSize: "clamp(24px, 2.5vw, 32px)",
                fontWeight: 400, letterSpacing: "-0.01em",
                margin: "0 0 16px", color: p.ink
              }}>Leasing office</h3>
              <div style={{ fontSize: 16, lineHeight: 1.7, color: p.inkSoft }}>
                <strong style={{ color: p.ink }}>410 S 2nd Street</strong><br />
                Alvin, TX 77511<br /><br />
                <strong style={{ color: p.ink }}>Monday – Friday</strong><br />
                9:00am – 5:00pm<br /><br />
                <strong style={{ color: p.ink }}>Saturday</strong><br />
                By appointment<br /><br />
                <strong style={{ color: p.ink }}>Sunday</strong><br />
                Closed
              </div>
              <a
                href="https://maps.google.com/?q=410+S+2nd+St+Alvin+TX+77511"
                target="_blank" rel="noopener"
                style={{
                  marginTop: 20, display: "inline-flex", alignItems: "center", gap: 8,
                  fontSize: 14, fontWeight: 600, color: p.primary, textDecoration: "none"
                }}>
                Get directions
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7m0 0L6.5 3m3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
              </a>
            </div>
            <div>
              <h3 style={{
                fontFamily: `'${displayFont}', serif`,
                fontSize: "clamp(24px, 2.5vw, 32px)",
                fontWeight: 400, letterSpacing: "-0.01em",
                margin: "0 0 16px", color: p.ink
              }}>Contact</h3>
              <div style={{ fontSize: 16, lineHeight: 1.7, color: p.inkSoft }}>
                <a href="tel:8322103968" style={{ color: p.ink, textDecoration: "none", fontWeight: 600, fontSize: 20, display: "block", marginBottom: 8 }}>(832) 210-3968</a>
                <a href="mailto:office@yellowstone-am.com" style={{ color: p.ink, textDecoration: "none", fontSize: 16 }}>office@yellowstone-am.com</a>
              </div>
              <div style={{ marginTop: 24 }}>
                <a href="book-tour.html" style={{
                  padding: "12px 20px", background: p.primary, color: p.paper,
                  textDecoration: "none", fontSize: 14, fontWeight: 600,
                  borderRadius: 10, display: "inline-flex", alignItems: "center", gap: 8,
                  transition: "transform 180ms ease"
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-1px)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                  Book a tour
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
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
root.render(<LocationPage />);

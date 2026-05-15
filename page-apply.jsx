/* global React, ReactDOM */
const { useEffect } = React;

const {
  TWEAK_DEFAULTS, PALETTES,
  Nav, Footer
} = window.Shared;

const { Apply } = window;

function ApplyPage() {
  const [tweaks, setTweak] = (window.useTweaks || (() => [TWEAK_DEFAULTS, () => {}]))(TWEAK_DEFAULTS);
  const p = PALETTES[tweaks.palette] || PALETTES.forest;
  const displayFont = tweaks.displayFont;

  useEffect(() => {
    document.body.style.background = p.bg;
    document.body.style.color = p.ink;
  }, [p]);

  return (
    <div style={{ background: p.bg, color: p.ink, minHeight: "100vh" }}>
      <Nav p={p} currentPage="apply" />

      <section style={{ padding: "120px var(--pad-x) 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{
            fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
            color: p.accent, fontWeight: 600, marginBottom: 14
          }}>
            Apply
          </div>
          <h1 style={{
            fontFamily: `'${displayFont}', serif`,
            fontSize: "clamp(36px, 5vw, 64px)",
            lineHeight: 1, letterSpacing: "-0.02em",
            margin: 0, color: p.ink, fontWeight: 400,
            maxWidth: "14ch"
          }}>Apply for your new home.</h1>
          <p style={{
            fontSize: 18, lineHeight: 1.6, color: p.inkSoft,
            maxWidth: "50ch", marginTop: 16
          }}>
            Complete the application below. Most decisions are made within 48 hours. A $40 application fee applies per adult.
          </p>
        </div>
      </section>

      <section style={{ padding: "40px var(--pad-x) 80px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {Apply && <Apply p={p} displayFont={displayFont} />}
        </div>
      </section>

      <Footer p={p} displayFont={displayFont} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<ApplyPage />);

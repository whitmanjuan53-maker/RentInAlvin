/* global React, ReactDOM */
const { useEffect } = React;

const {
  TWEAK_DEFAULTS, PALETTES,
  Nav, Footer, SectionHead
} = window.Shared;

const { SellProperty } = window;

function SellPage() {
  const [tweaks, setTweak] = (window.useTweaks || (() => [TWEAK_DEFAULTS, () => {}]))(TWEAK_DEFAULTS);
  const p = PALETTES[tweaks.palette] || PALETTES.forest;
  const displayFont = tweaks.displayFont;

  useEffect(() => {
    document.body.style.background = p.bg;
    document.body.style.color = p.ink;
  }, [p]);

  return (
    <div style={{ background: p.bg, color: p.ink, minHeight: "100vh" }}>
      <Nav p={p} currentPage="sell" />

      <section style={{ padding: "120px var(--pad-x) 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHead
            p={p}
            displayFont={displayFont}
            eyebrow="For property owners"
            title="Sell your property direct."
            lead="Yellowstone Asset Management is actively buying homes, duplexes, and small multifamily properties in Alvin. No commissions, no listing pressure." />
        </div>
      </section>

      {SellProperty && <SellProperty p={p} displayFont={displayFont} />}

      <Footer p={p} displayFont={displayFont} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<SellPage />);

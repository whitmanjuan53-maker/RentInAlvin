/* global React, ReactDOM */
const { useEffect, useState } = React;

const {
  TWEAK_DEFAULTS, PALETTES,
  Nav, Footer, SectionHead
} = window.Shared;

const { TourBooking } = window;

function BookTourPage() {
  const [tweaks, setTweak] = (window.useTweaks || (() => [TWEAK_DEFAULTS, () => {}]))(TWEAK_DEFAULTS);
  const p = PALETTES[tweaks.palette] || PALETTES.forest;
  const displayFont = tweaks.displayFont;
  const [config, setConfig] = useState({ bookingProvider: 'custom', calendlyUrl: '', googleCalendarUrl: '' });

  useEffect(() => {
    document.body.style.background = p.bg;
    document.body.style.color = p.ink;
  }, [p]);

  useEffect(() => {
    if (window.RentInAlvinAPI && window.RentInAlvinAPI.getConfig) {
      window.RentInAlvinAPI.getConfig().then(setConfig).catch(() => {});
    }
  }, []);

  const hasCalendarEmbed = config.bookingProvider !== 'custom' && (config.calendlyUrl || config.googleCalendarUrl);

  return (
    <div style={{ background: p.bg, color: p.ink, minHeight: "100vh" }}>
      <Nav p={p} currentPage="book-tour" />

      <section style={{ padding: "120px var(--pad-x) 80px" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <SectionHead
            p={p}
            displayFont={displayFont}
            eyebrow="Book a tour"
            title="See it in person."
            lead="Pick a property, choose a date and time, and we'll confirm within 24 hours." />

          <div style={{
            background: p.paper,
            border: `1px solid ${p.line}`,
            borderRadius: 8,
            padding: "32px 36px",
            marginTop: 8
          }}>
            <TourBooking inline p={p} displayFont={displayFont} open={true} />
          </div>

          {hasCalendarEmbed && (
            <div style={{ marginTop: 40 }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 16, marginBottom: 24
              }}>
                <div style={{ flex: 1, height: 1, background: p.line }}></div>
                <span style={{ fontSize: 13, color: p.inkSoft, fontWeight: 500 }}>Or book instantly</span>
                <div style={{ flex: 1, height: 1, background: p.line }}></div>
              </div>

              {config.calendlyUrl && (
                <div style={{
                  background: p.paper,
                  border: `1px solid ${p.line}`,
                  borderRadius: 8,
                  overflow: "hidden",
                  minHeight: 630
                }}>
                  <iframe
                    src={`${config.calendlyUrl}?embed_domain=${window.location.hostname}&embed_type=Inline`}
                    width="100%"
                    height="630"
                    frameBorder="0"
                    title="Schedule a tour"
                    style={{ border: "none" }}
                  />
                </div>
              )}

              {config.googleCalendarUrl && !config.calendlyUrl && (
                <div style={{
                  background: p.paper,
                  border: `1px solid ${p.line}`,
                  borderRadius: 8,
                  overflow: "hidden",
                  minHeight: 500
                }}>
                  <iframe
                    src={config.googleCalendarUrl}
                    width="100%"
                    height="500"
                    frameBorder="0"
                    title="Schedule a tour"
                    style={{ border: "none" }}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer p={p} displayFont={displayFont} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<BookTourPage />);

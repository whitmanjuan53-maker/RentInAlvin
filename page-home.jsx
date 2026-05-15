/* global React, ReactDOM */
const { useState, useEffect } = React;

const {
  TWEAK_DEFAULTS, PALETTES, PROPERTIES,
  Nav, Footer, SectionHead, PropertyCard, InstagramFeed
} = window.Shared;

const { Availability, AlvinMap } = window;

function HomePage() {
  const [tweaks, setTweak] = (window.useTweaks || (() => [TWEAK_DEFAULTS, () => {}]))(TWEAK_DEFAULTS);
  const p = PALETTES[tweaks.palette] || PALETTES.forest;
  const displayFont = tweaks.displayFont;

  useEffect(() => {
    document.body.style.background = p.bg;
    document.body.style.color = p.ink;
  }, [p]);

  const featuredProps = PROPERTIES.slice(0, 3);
  const [focusedProperty, setFocusedProperty] = useState(null);

  return (
    <div style={{ background: p.bg, color: p.ink, minHeight: "100vh" }}>
      <Nav p={p} currentPage="home" />

      {/* Hero */}
      <section className="ys-hero" style={{
        position: "relative",
        padding: "80px 24px 0",
        minHeight: "calc(100vh - 60px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", width: "100%", flex: "1 0 auto", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 10,
            fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
            color: p.inkSoft, marginBottom: 24, fontWeight: 500
          }}>
            <span style={{ width: 20, height: 1, background: p.inkSoft }}></span>
            Apartments &amp; townhomes in Alvin, Texas
          </div>

          <h1 style={{
            fontFamily: `'${displayFont}', serif`,
            fontSize: "clamp(56px, 8vw, 120px)",
            lineHeight: 0.95,
            letterSpacing: "-0.03em",
            margin: 0,
            color: p.ink,
            fontWeight: 400,
            maxWidth: "14ch"
          }}>
            A home in <em style={{ color: p.primary }}>Alvin,</em><br />
            made simple.
          </h1>

          <p style={{
            fontSize: 20, lineHeight: 1.6, color: p.inkSoft,
            maxWidth: "52ch", margin: "24px 0 0"
          }}>
            RentInAlvin manages over <strong style={{ color: p.ink }}>160 units across five properties</strong> in Alvin. Apartments and townhomes from $800 to $1,650, leased and maintained by a local team.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
            <a href="book-tour.html" style={{
              padding: "14px 24px", background: p.primary, color: p.paper,
              textDecoration: "none", fontSize: 15, fontWeight: 600,
              borderRadius: 10, letterSpacing: "0.01em",
              display: "inline-flex", alignItems: "center", gap: 10,
              transition: "transform 180ms ease, background 180ms ease"
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = p.primarySoft; e.currentTarget.style.transform = "translateY(-1px)"; }}
            onMouseOut={(e) => { e.currentTarget.style.background = p.primary; e.currentTarget.style.transform = "translateY(0)"; }}>
              Book a tour
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </a>
            <a href="properties.html" style={{
              padding: "14px 24px", background: "transparent", color: p.ink,
              textDecoration: "none", fontSize: 15, fontWeight: 600,
              borderRadius: 10, border: `1px solid ${p.ink}`,
              transition: "all 180ms ease"
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = p.ink; e.currentTarget.style.color = p.paper; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = p.ink; }}>
              See properties
            </a>
          </div>
        </div>

        {tweaks.showStats && (
          <div style={{
            maxWidth: 1400, margin: "0 auto", width: "100%",
            marginTop: "auto",
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
            borderTop: `1px solid ${p.line}`,
            paddingTop: 20,
            paddingBottom: 24
          }} className="ys-hero-stats">
            {[
              ["150+", "units managed"],
              ["5", "properties in Alvin"],
              ["$899", "starting rent"],
              ["Local", "family-run team"]
            ].map(([n, label], i) => (
              <div key={i} style={{
                borderLeft: i === 0 ? "none" : `1px solid ${p.line}`,
                paddingLeft: i === 0 ? 0 : 24
              }}>
                <div style={{
                  fontFamily: `'${displayFont}', serif`,
                  fontSize: "clamp(32px, 3.5vw, 48px)", lineHeight: 1, color: p.ink,
                  letterSpacing: "-0.02em"
                }}>{n}</div>
                <div style={{
                  fontSize: 13, letterSpacing: "0.06em",
                  textTransform: "uppercase", color: p.inkSoft,
                  marginTop: 8, fontWeight: 500
                }}>{label}</div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Apply CTA Strip */}
      <section style={{
        padding: "18px var(--pad-x)",
        background: p.primary,
        color: p.paper
      }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase", opacity: 0.7, fontWeight: 600, marginBottom: 6 }}>
              Ready to move?
            </div>
            <div style={{ fontFamily: `'${displayFont}', serif`, fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.2 }}>
              Apply online in 5 minutes.
            </div>
          </div>
          <a href="apply.html" style={{
            padding: "12px 24px", background: p.paper, color: p.primary,
            textDecoration: "none", fontSize: 15, fontWeight: 600,
            borderRadius: 10, display: "inline-flex", alignItems: "center", gap: 10,
            transition: "all 180ms ease",
            flexShrink: 0
          }}
          onMouseOver={(e) => { e.currentTarget.style.background = p.accent; e.currentTarget.style.color = "#fff"; }}
          onMouseOut={(e) => { e.currentTarget.style.background = p.paper; e.currentTarget.style.color = p.primary; }}>
            Start application
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
          </a>
        </div>
      </section>

      {/* Featured Properties */}
      <section style={{ padding: "56px var(--pad-x)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHead
            p={p}
            displayFont={displayFont}
            marginBottom={32}
            eyebrow="Featured properties"
            title="A few of our available homes."
            lead="Browse all five communities on our Properties page." />
          <div className="ys-prop-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 20
          }}>
            {featuredProps.map((prop, i) =>
              <PropertyCard key={i} prop={prop} p={p} idx={i} displayFont={displayFont} onSelect={setFocusedProperty} />
            )}
          </div>
          <div style={{ textAlign: "center", marginTop: 36 }}>
            <a href="properties.html" style={{
              padding: "12px 24px", background: "transparent", color: p.ink,
              textDecoration: "none", fontSize: 15, fontWeight: 600,
              borderRadius: 10, border: `1px solid ${p.ink}`,
              display: "inline-flex", alignItems: "center", gap: 10,
              transition: "all 180ms ease"
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = p.ink; e.currentTarget.style.color = p.paper; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = p.ink; }}>
              View all properties
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Availability teaser */}
      {Availability && <Availability p={p} displayFont={displayFont} limit={3} compact />}

      {/* Property Map */}
      {AlvinMap && <AlvinMap p={p} displayFont={displayFont} focusedProperty={focusedProperty} />}

      {/* About teaser */}
      <section style={{ padding: "56px var(--pad-x)" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, alignItems: "center" }} className="ys-about-grid">
            <div>
              <SectionHead
                p={p}
                displayFont={displayFont}
                marginBottom={32}
                eyebrow="Why RentInAlvin"
                title="Built around the way Alvin actually lives." />
              <p style={{ fontSize: 17, lineHeight: 1.6, color: p.inkSoft, maxWidth: "48ch" }}>
                Every property we manage is within ten minutes of our office at 410 S 2nd St. When you call, you reach the team that manages your home — not a call center.
              </p>
              <a href="about.html" style={{
                marginTop: 20,
                display: "inline-flex", alignItems: "center", gap: 8,
                fontSize: 14, fontWeight: 600, color: p.primary, textDecoration: "none"
              }}>
                Learn more about us
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7m0 0L6.5 3m3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
              </a>
            </div>
            <div style={{
              background: p.paper,
              border: `1px solid ${p.line}`,
              borderRadius: 8,
              padding: 32,
              display: "flex", flexDirection: "column", gap: 20
            }}>
              {[
                { title: "Local & responsive", body: "Our office is on-site at Kings Haven. We pick up the phone." },
                { title: "Honest pricing", body: "Rents are published upfront. No bait-and-switch, no hidden fees." },
                { title: "Fast maintenance", body: "Most non-emergency issues are closed within 48 hours." }
              ].map((item, i) => (
                <div key={i} style={{ paddingBottom: i < 2 ? 20 : 0, borderBottom: i < 2 ? `1px solid ${p.line}` : "none" }}>
                  <div style={{ fontSize: 15, fontWeight: 600, color: p.ink, marginBottom: 4 }}>{item.title}</div>
                  <div style={{ fontSize: 14, lineHeight: 1.55, color: p.inkSoft }}>{item.body}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section style={{ padding: "56px var(--pad-x)", background: p.paper }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
          <h2 style={{
            fontFamily: `'${displayFont}', serif`,
            fontSize: "clamp(28px, 3.5vw, 44px)",
            lineHeight: 1.05, letterSpacing: "-0.02em",
            margin: "0 auto", color: p.ink, fontWeight: 400,
            maxWidth: "16ch"
          }}>Ready to see your new home?</h2>
          <p style={{
            fontSize: 16, lineHeight: 1.6, color: p.inkSoft,
            maxWidth: "48ch", margin: "12px auto 0"
          }}>Stop by the office or book a tour online. We're here to help.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 20 }}>
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
            <a href="contact.html" style={{
              padding: "14px 24px", background: "transparent", color: p.ink,
              textDecoration: "none", fontSize: 15, fontWeight: 600,
              borderRadius: 10, border: `1px solid ${p.ink}`,
              transition: "all 180ms ease"
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = p.ink; e.currentTarget.style.color = p.paper; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = p.ink; }}>
              Contact us
            </a>
          </div>
        </div>
      </section>

      <InstagramFeed p={p} displayFont={displayFont} />
      <Footer p={p} displayFont={displayFont} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<HomePage />);

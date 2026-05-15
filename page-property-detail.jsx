/* global React, ReactDOM */
const { useState, useEffect } = React;

const {
  TWEAK_DEFAULTS, PALETTES, PROPERTIES, FLOORPLANS,
  Nav, Footer, SectionHead
} = window.Shared;

function ImageGallery({ images, p, propName }) {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState({});

  if (!images || images.length === 0) {
    return (
      <div style={{
        position: "relative", aspectRatio: "16/9", overflow: "hidden",
        borderRadius: 8, background: p.bg,
        display: "flex", alignItems: "center", justifyContent: "center"
      }}>
        <span style={{ fontSize: 14, color: p.inkSoft, fontWeight: 500 }}>{propName}</span>
      </div>
    );
  }

  return (
    <div>
      {/* Main image */}
      <div style={{
        position: "relative", aspectRatio: "16/9", overflow: "hidden",
        borderRadius: 8, background: p.bg
      }}>
        <img
          src={images[active]}
          alt={`${propName} - photo ${active + 1}`}
          loading="eager"
          onLoad={() => setLoaded(prev => ({ ...prev, [active]: true }))}
          style={{
            width: "100%", height: "100%", objectFit: "cover", display: "block",
            opacity: loaded[active] ? 1 : 0,
            transition: "opacity 400ms ease"
          }}
        />
        {!loaded[active] && (
          <div style={{
            position: "absolute", inset: 0,
            background: `repeating-linear-gradient(135deg, ${p.paper} 0 14px, color-mix(in oklab, ${p.ink} 3%, ${p.paper}) 14px 28px)`,
            display: "flex", alignItems: "flex-end", padding: 14
          }}>
            <span style={{
              fontFamily: "'Source Sans 3', ui-sans-serif, sans-serif",
              fontSize: 10, letterSpacing: "0.06em", textTransform: "uppercase",
              background: p.paper, padding: "5px 9px",
              border: `1px solid color-mix(in oklab, ${p.ink} 12%, transparent)`,
              borderRadius: 4, fontWeight: 500, color: p.ink
            }}>
              {propName}
            </span>
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="ys-thumb-row" style={{
          display: "flex", gap: 8, marginTop: 12,
          overflowX: "auto", paddingBottom: 4, scrollbarWidth: "thin"
        }}>
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                flex: "0 0 auto",
                width: 84, height: 64, borderRadius: 6, overflow: "hidden",
                border: active === i ? `2px solid ${p.primary}` : `2px solid transparent`,
                padding: 0, cursor: "pointer",
                transition: "all 180ms ease",
                outline: "none"
              }}
            >
              <img
                src={img}
                alt={`thumbnail ${i + 1}`}
                loading="lazy"
                style={{
                  width: "100%", height: "100%", objectFit: "cover", display: "block",
                  opacity: active === i ? 1 : 0.6,
                  transition: "opacity 180ms ease"
                }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function PropertyDetailPage() {
  const [tweaks, setTweak] = (window.useTweaks || (() => [TWEAK_DEFAULTS, () => {}]))(TWEAK_DEFAULTS);
  const p = PALETTES[tweaks.palette] || PALETTES.forest;
  const displayFont = tweaks.displayFont;

  const params = new URLSearchParams(window.location.search);
  const propId = params.get("property") || "";

  const property = PROPERTIES.find(prop => prop.id === propId) || PROPERTIES[0];

  const heroImage = property.heroImage || (typeof property.img === "string" && property.img.startsWith("http") ? property.img : null);
  const gallery = property.gallery || [];
  const allImages = [heroImage, ...gallery].filter(img => img && typeof img === "string" && img.startsWith("http"));

  /* Filter floorplans to property-relevant layouts */
  const propertyFloorplans = (() => {
    const u = (property.units || "").toLowerCase();
    const relevant = [];
    FLOORPLANS.forEach((f, i) => {
      const ft = f.type.toLowerCase();
      if (ft.includes("1 bed") && (u.includes("1br") || u.includes("1 bed"))) relevant.push(i);
      else if (ft.includes("2 bed") && !ft.includes("2.5") && (u.includes("2br") || u.includes("2 bed"))) {
        if (ft.includes("1 bath") && u.includes("1ba")) relevant.push(i);
        if (ft.includes("2 bath") && u.includes("2ba")) relevant.push(i);
      }
      else if (ft.includes("2 bed") && ft.includes("2.5") && (u.includes("2.5") || u.includes("townhome"))) relevant.push(i);
      else if (ft.includes("3 bed") && (u.includes("3br") || u.includes("3 bed"))) relevant.push(i);
    });
    return relevant.length > 0 ? relevant : FLOORPLANS.map((_, i) => i);
  })();

  useEffect(() => {
    document.body.style.background = p.bg;
    document.body.style.color = p.ink;
    if (property) {
      document.title = `${property.name} | RentInAlvin — Apartments & Townhomes in Alvin, TX`;
    }
  }, [p, property]);

  if (!property) {
    return (
      <div style={{ background: p.bg, color: p.ink, minHeight: "100vh" }}>
        <Nav p={p} currentPage="properties" />
        <section style={{ padding: "140px var(--pad-x)", textAlign: "center" }}>
          <h1 style={{ fontFamily: `'${displayFont}', serif`, fontSize: 32 }}>Property not found</h1>
          <a href="properties.html" style={{ color: p.primary, fontWeight: 600 }}>View all properties</a>
        </section>
        <Footer p={p} displayFont={displayFont} />
      </div>
    );
  }

  return (
    <div style={{ background: p.bg, color: p.ink, minHeight: "100vh" }}>
      <Nav p={p} currentPage="properties" />

      <section style={{ padding: "120px var(--pad-x) 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {/* Back link */}
          <a href="properties.html" style={{
            fontSize: 14, fontWeight: 500, color: p.inkSoft,
            textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6,
            marginBottom: 28, transition: "color 160ms ease"
          }}
          onMouseOver={(e) => e.currentTarget.style.color = p.accent}
          onMouseOut={(e) => e.currentTarget.style.color = p.inkSoft}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M10 7H3m0 0l3.5-3.5M3 7l3.5 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/></svg>
            All properties
          </a>

          <div className="ys-detail-grid" style={{
            display: "grid", gridTemplateColumns: "1.15fr 1fr", gap: 56
          }}>
            {/* Left: Gallery */}
            <div>
              <ImageGallery images={allImages} p={p} propName={property.name} />
            </div>

            {/* Right: Info */}
            <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
              <div>
                <div style={{
                  fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
                  color: p.accent, fontWeight: 600, marginBottom: 10
                }}>
                  {property.tag}
                </div>
                <h1 style={{
                  fontFamily: `'${displayFont}', serif`,
                  fontSize: "clamp(32px, 4vw, 52px)",
                  lineHeight: 1.05, letterSpacing: "-0.02em",
                  margin: 0, color: p.ink, fontWeight: 400
                }}>
                  {property.name}
                </h1>
                <div style={{ fontSize: 16, color: p.inkSoft, marginTop: 8 }}>
                  {property.addr} · Alvin, TX
                </div>
              </div>

              <p style={{ fontSize: 16, lineHeight: 1.65, color: p.inkSoft, margin: 0 }}>
                {property.description || property.note}
              </p>

              {/* Highlights */}
              {property.highlights && property.highlights.length > 0 && (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {property.highlights.map((h, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: p.accent, flexShrink: 0 }}></div>
                      <span style={{ fontSize: 15, color: p.ink }}>{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Price & units */}
              <div style={{
                padding: "20px 0", borderTop: `1px solid ${p.line}`, borderBottom: `1px solid ${p.line}`,
                display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20
              }}>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: p.inkSoft, fontWeight: 500, marginBottom: 4 }}>
                    Units
                  </div>
                  <div style={{ fontSize: 15, lineHeight: 1.4 }}>{property.units}</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: p.inkSoft, fontWeight: 500, marginBottom: 4 }}>
                    Starting rent
                  </div>
                  <div style={{ fontFamily: `'${displayFont}', serif`, fontSize: 24, color: p.primary }}>
                    {property.price}
                  </div>
                </div>
              </div>

              {/* Amenities */}
              {property.amenities && property.amenities.length > 0 && (
                <div>
                  <div style={{
                    fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
                    color: p.inkSoft, fontWeight: 600, marginBottom: 12
                  }}>
                    Amenities
                  </div>
                  <div className="ys-amenities-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
                    {property.amenities.map((a, i) => (
                      <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <div style={{ width: 5, height: 5, borderRadius: "50%", background: p.accent, flexShrink: 0 }}></div>
                        <span style={{ fontSize: 14, color: p.inkSoft }}>{a}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTAs */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 4 }}>
                <a href={`book-tour.html?property=${property.id}`} style={{
                  padding: "14px 24px", background: p.primary, color: p.paper,
                  textDecoration: "none", fontSize: 15, fontWeight: 600,
                  borderRadius: 10, display: "inline-flex", alignItems: "center", gap: 10,
                  transition: "transform 180ms ease, background 180ms ease"
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.background = p.primarySoft; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = p.primary; }}>
                  Book a tour
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                </a>
                <a href={`contact.html?property=${property.id}`} style={{
                  padding: "14px 24px", background: "transparent", color: p.ink,
                  textDecoration: "none", fontSize: 15, fontWeight: 600,
                  borderRadius: 10, border: `1px solid ${p.ink}`,
                  transition: "all 180ms ease"
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = p.ink; e.currentTarget.style.color = p.paper; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = p.ink; }}>
                  Inquire
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Floorplans at this property */}
      <section style={{ padding: "80px var(--pad-x)", background: p.paper, borderTop: `1px solid ${p.line}` }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHead
            p={p}
            displayFont={displayFont}
            eyebrow="Available layouts"
            title="Floor plans at this property."
            lead="Call to confirm current availability and pricing." />

          <div className="ys-prop-grid" style={{
            display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20
          }}>
            {propertyFloorplans.map((fi, idx) => {
              const f = FLOORPLANS[fi];
              return (
                <div key={fi} style={{
                  background: p.bg,
                  border: `1px solid ${p.line}`,
                  borderRadius: 8,
                  padding: 24,
                  display: "flex", flexDirection: "column", gap: 12
                }}>
                  <div style={{
                    fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
                    color: p.accent, fontWeight: 600
                  }}>
                    Layout 0{fi + 1}
                  </div>
                  <h3 style={{
                    fontFamily: `'${displayFont}', serif`,
                    fontSize: 22, fontWeight: 400, letterSpacing: "-0.01em",
                    margin: 0, color: p.ink
                  }}>
                    {f.type}
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 4 }}>
                    <div>
                      <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: p.inkSoft, fontWeight: 500, marginBottom: 2 }}>Sq ft</div>
                      <div style={{ fontSize: 15 }}>{f.sqft}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: p.inkSoft, fontWeight: 500, marginBottom: 2 }}>Rent</div>
                      <div style={{ fontSize: 15 }}>{f.price}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: "auto", paddingTop: 12, borderTop: `1px solid ${p.line}` }}>
                    <div style={{ fontSize: 14, color: p.inkSoft }}>{f.available} units available</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer p={p} displayFont={displayFont} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<PropertyDetailPage />);

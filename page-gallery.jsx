/* global React, ReactDOM */
const { useState, useEffect } = React;

const {
  TWEAK_DEFAULTS, PALETTES, PROPERTIES,
  Nav, Footer, SectionHead
} = window.Shared;

function Lightbox({ images, startIndex, onClose, p, propName, displayFont }) {
  const [index, setIndex] = useState(startIndex);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIndex(i => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIndex(i => (i - 1 + images.length) % images.length);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [images.length, onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        background: "rgba(0,0,0,0.92)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "40px 20px"
      }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute", top: 20, right: 20,
          width: 44, height: 44, borderRadius: "50%",
          background: "rgba(255,255,255,0.15)", border: "none",
          color: "#fff", fontSize: 24, cursor: "pointer",
          display: "grid", placeItems: "center",
          transition: "background 200ms ease"
        }}
        onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.3)"}
        onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M4 4l10 10M14 4L4 14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); setIndex(i => (i - 1 + images.length) % images.length); }}
          style={{
            position: "absolute", left: 20, top: "50%", transform: "translateY(-50%)",
            width: 48, height: 48, borderRadius: "50%",
            background: "rgba(255,255,255,0.15)", border: "none",
            color: "#fff", cursor: "pointer",
            display: "grid", placeItems: "center",
            transition: "background 200ms ease"
          }}
          onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.3)"}
          onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
        >
          <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
            <path d="M10 7H3m0 0l3.5-3.5M3 7l3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); setIndex(i => (i + 1) % images.length); }}
          style={{
            position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)",
            width: 48, height: 48, borderRadius: "50%",
            background: "rgba(255,255,255,0.15)", border: "none",
            color: "#fff", cursor: "pointer",
            display: "grid", placeItems: "center",
            transition: "background 200ms ease"
          }}
          onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.3)"}
          onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
        >
          <svg width="20" height="20" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      )}

      {/* Image */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: "90vw", maxHeight: "85vh",
          display: "flex", flexDirection: "column", alignItems: "center", gap: 12
        }}
      >
        <img
          src={images[index]}
          alt={`${propName} - photo ${index + 1}`}
          style={{
            maxWidth: "100%", maxHeight: "80vh",
            objectFit: "contain", borderRadius: 8,
            boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
          }}
        />
        <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 14, fontWeight: 500 }}>
          {propName} · {index + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}

function GalleryPage() {
  const [tweaks, setTweak] = (window.useTweaks || (() => [TWEAK_DEFAULTS, () => {}]))(TWEAK_DEFAULTS);
  const p = PALETTES[tweaks.palette] || PALETTES.forest;
  const displayFont = tweaks.displayFont;

  const [activeProp, setActiveProp] = useState("all");
  const [lightbox, setLightbox] = useState(null); // { images, index, propName }

  useEffect(() => {
    document.body.style.background = p.bg;
    document.body.style.color = p.ink;
  }, [p]);

  const allGalleryItems = PROPERTIES.flatMap((prop) => {
    const images = [prop.heroImage, ...(prop.gallery || [])].filter(
      img => img && typeof img === "string" && img.startsWith("http")
    );
    return images.map((img, i) => ({ prop, img, idx: i }));
  });

  const filteredProps = activeProp === "all"
    ? PROPERTIES
    : PROPERTIES.filter(prop => prop.id === activeProp);

  return (
    <div style={{ background: p.bg, color: p.ink, minHeight: "100vh" }}>
      <Nav p={p} currentPage="gallery" />

      <section style={{ padding: "120px var(--pad-x) 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <SectionHead
            p={p}
            displayFont={displayFont}
            eyebrow="Gallery"
            title="See where you could live."
            lead="Photos of our properties, interiors, and community spaces. Click any image to enlarge." />
        </div>
      </section>

      {/* Property filter tabs */}
      <section style={{ padding: "0 var(--pad-x) 40px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <button
              onClick={() => setActiveProp("all")}
              style={{
                padding: "8px 16px",
                background: activeProp === "all" ? p.ink : "transparent",
                color: activeProp === "all" ? p.paper : p.ink,
                border: `1px solid ${activeProp === "all" ? p.ink : p.line}`,
                fontSize: 13, fontWeight: 500, cursor: "pointer",
                fontFamily: "inherit", borderRadius: 10,
                transition: "all 200ms ease"
              }}
            >
              All properties
            </button>
            {PROPERTIES.map(prop => (
              <button
                key={prop.id}
                onClick={() => setActiveProp(prop.id)}
                style={{
                  padding: "8px 16px",
                  background: activeProp === prop.id ? p.ink : "transparent",
                  color: activeProp === prop.id ? p.paper : p.ink,
                  border: `1px solid ${activeProp === prop.id ? p.ink : p.line}`,
                  fontSize: 13, fontWeight: 500, cursor: "pointer",
                  fontFamily: "inherit", borderRadius: 10,
                  transition: "all 200ms ease"
                }}
              >
                {prop.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery grids by property */}
      <section style={{ padding: "0 var(--pad-x) 80px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          {filteredProps.map((prop) => {
            const images = [prop.heroImage, ...(prop.gallery || [])].filter(
              img => img && typeof img === "string" && img.startsWith("http")
            );
            if (images.length === 0) return null;
            return (
              <div key={prop.id} style={{ marginBottom: 64 }}>
                <h3 style={{
                  fontFamily: `'${displayFont}', serif`,
                  fontSize: "clamp(24px, 2.5vw, 32px)",
                  fontWeight: 400, letterSpacing: "-0.01em",
                  margin: "0 0 20px", color: p.ink
                }}>{prop.name}</h3>
                <div className="ys-gallery-grid" style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: 12
                }}>
                  {images.map((img, i) => (
                    <div
                      key={i}
                      onClick={() => setLightbox({ images, index: i, propName: prop.name })}
                      style={{
                        position: "relative",
                        minHeight: 120,
                        background: p.paper,
                        border: `1px solid ${p.line}`,
                        borderRadius: 8,
                        overflow: "hidden",
                        cursor: "pointer"
                      }}
                    >
                      <img
                        src={img}
                        alt={`${prop.name} - photo ${i + 1}`}
                        loading="lazy"
                        style={{
                          position: "absolute", inset: 0,
                          width: "100%", height: "100%", objectFit: "cover", display: "block",
                          transition: "transform 400ms ease"
                        }}
                        onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.04)"}
                        onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
                      />
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {allGalleryItems.length === 0 && (
            <div style={{
              padding: 48, textAlign: "center",
              background: p.paper, border: `1px solid ${p.line}`,
              borderRadius: 8, color: p.inkSoft
            }}>
              <p style={{ fontSize: 16, margin: 0 }}>
                Photos coming soon. <a href="book-tour.html" style={{ color: p.primary, textDecoration: "none", fontWeight: 600 }}>Book a tour</a> to see properties in person.
              </p>
            </div>
          )}
        </div>
      </section>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.index}
          propName={lightbox.propName}
          p={p}
          displayFont={displayFont}
          onClose={() => setLightbox(null)}
        />
      )}

      <Footer p={p} displayFont={displayFont} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<GalleryPage />);

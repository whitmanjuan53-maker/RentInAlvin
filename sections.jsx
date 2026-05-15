const { useState: useStateS, useEffect: useEffectS, useRef: useRefS, useMemo: useMemoS } = React;

/* ============================================================
   Sections: Availability, Alvin Map, FAQ
============================================================ */

const AVAILABILITY = [
  { property: "Kings Haven", addr: "410 S 2nd", type: "2 Bed · 1 Bath", sqft: 850, price: 925, ready: "Available now", featured: true },
  { property: "French Quarter", addr: "2550 S Bypass 35", type: "2 Bed · 1 Bath", sqft: 850, price: 950, ready: "Available now", featured: true },
  { property: "White House", addr: "1606 W Sealy", type: "2 Bed · 1 Bath", sqft: 850, price: 925, ready: "Available now", featured: true },
  { property: "Kings Manor", addr: "328 S 2nd", type: "3 Bed · 2.5 Bath", sqft: 1250, price: 1595, ready: "Available now", featured: false },
  { property: "Kings Haven (100)", addr: "100 S 2nd", type: "1 Bed · 1 Bath", sqft: 600, price: 850, ready: "Available now", featured: false }
];

function Availability({ p, displayFont, limit, compact }) {
  const [filter, setFilter] = useStateS("all");
  const { availability, status } = (window.useAvailability || (() => ({ availability: AVAILABILITY, status: "fallback" })))();
  let filtered = availability.filter(a => {
    if (filter === "all") return true;
    if (filter === "now") return a.ready.includes("now");
    if (filter === "1br") return a.type.startsWith("1 Bed");
    if (filter === "2br") return a.type.startsWith("2 Bed");
    if (filter === "3br") return a.type.startsWith("3 Bed");
    return true;
  });
  if (limit) filtered = filtered.slice(0, limit);

  const filters = [
    ["all", "All open units"],
    ["now", "Move-in now"],
    ["1br", "1 Bed"],
    ["2br", "2 Bed"],
    ["3br", "3 Bed"]
  ];

  return (
    <section id="availability" style={{ padding: compact ? "56px var(--pad-x)" : "80px var(--pad-x)", background: p.paper }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "flex-end",
          marginBottom: 32, gap: 24, flexWrap: "wrap"
        }}>
          <div>
            <div style={{
              fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
              color: p.accent, fontWeight: 600, marginBottom: 12,
              display: "flex", alignItems: "center", gap: 10
            }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22c55e" }}></span>
              Open this week
            </div>
            <h2 style={{
              fontFamily: `'${displayFont}', serif`,
              fontSize: "clamp(32px, 4.6vw, 56px)",
              lineHeight: 1, letterSpacing: "-0.02em",
              margin: 0, fontWeight: 400, color: p.ink, maxWidth: "16ch"
            }}>
              {limit ? "Available right now." : "See what's open."}
            </h2>
          </div>
          {!limit && (
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {filters.map(([k, label]) => (
                <button key={k} onClick={() => setFilter(k)} style={{
                  padding: "8px 16px",
                  background: filter === k ? p.ink : "transparent",
                  color: filter === k ? p.paper : p.ink,
                  border: `1px solid ${filter === k ? p.ink : p.line}`,
                  fontSize: 13, fontWeight: 500, cursor: "pointer",
                  fontFamily: "inherit",
                  borderRadius: 10,
                  transition: "all 200ms ease"
                }}>{label}</button>
              ))}
            </div>
          )}
        </div>

        <div className="ys-avail-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 16
        }}>
          {filtered.length === 0 && (
            <div style={{
              gridColumn: "1 / -1", padding: 48, textAlign: "center",
              background: p.bg, color: p.inkSoft, fontSize: 15, borderRadius: 8, border: `1px solid ${p.line}`
            }}>
              No units match. Call us — we may have something coming up.
            </div>
          )}
          {filtered.map((u, i) => (
            <div key={i} style={{
              background: p.bg,
              padding: 24,
              borderRadius: 12,
              border: `1px solid ${p.line}`,
              boxShadow: "0 2px 8px rgba(27, 42, 74, 0.04)",
              display: "flex", flexDirection: "column", gap: 12,
              position: "relative",
              transition: "box-shadow 200ms ease",
            }}
            onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 12px 24px -12px color-mix(in oklab, ${p.ink} 10%, transparent)`}
            onMouseLeave={(e) => e.currentTarget.style.boxShadow = "none"}
            >
              {u.featured && (
                <div style={{
                  position: "absolute", top: 16, right: 16,
                  fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase",
                  color: p.accent, fontWeight: 600
                }}>Featured</div>
              )}
              <div>
                <div style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: p.inkSoft, fontWeight: 500 }}>
                  {u.property}
                </div>
                <div style={{
                  fontFamily: `'${displayFont}', serif`,
                  fontSize: 22, lineHeight: 1.1, color: p.ink,
                  marginTop: 6, fontWeight: 400, letterSpacing: "-0.01em"
                }}>{u.type}</div>
                <div style={{ fontSize: 13, color: p.inkSoft, marginTop: 4 }}>
                  {u.addr} · {u.sqft} sq ft
                </div>
              </div>
              <div style={{
                display: "flex", justifyContent: "space-between", alignItems: "baseline",
                paddingTop: 12, borderTop: `1px solid ${p.line}`, marginTop: "auto"
              }}>
                <div>
                  <div style={{
                    fontFamily: "'Lora', serif",
                    fontSize: 22, color: p.primary, fontWeight: 400
                  }}>${u.price.toLocaleString()}<span style={{ fontSize: 13, color: p.inkSoft, fontFamily: "Source Sans 3, sans-serif" }}>/mo</span></div>
                  <div style={{ fontSize: 12, color: "#16a34a", marginTop: 2, fontWeight: 500 }}>
                    {u.ready}
                  </div>
                </div>
                <a href="#" onClick={(e) => { e.preventDefault(); window.__openBooking && window.__openBooking(); }} style={{
                  fontSize: 13, fontWeight: 600, color: p.ink,
                  textDecoration: "none",
                  padding: "10px 16px",
                  border: `1px solid ${p.ink}`,
                  borderRadius: 10,
                  transition: "all 200ms ease"
                }}
                onMouseOver={(e) => { e.currentTarget.style.background = p.ink; e.currentTarget.style.color = p.paper; }}
                onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = p.ink; }}>
                  Tour
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Alvin Map ----------------------------- */

const MAP_PROPS = [
  { id: 0, name: "Kings Haven", addr: "410 S 2nd St", lat: 29.4218, lng: -95.2442, office: true },
  { id: 1, name: "Kings Manor", addr: "328 S 2nd St", lat: 29.4225, lng: -95.2441 },
  { id: 2, name: "Kings Haven (100)", addr: "100 S 2nd St", lat: 29.4245, lng: -95.2439 },
  { id: 3, name: "French Quarter", addr: "2550 S Bypass 35", lat: 29.3950, lng: -95.2330 },
  { id: 4, name: "White House", addr: "1606 W Sealy St", lat: 29.4260, lng: -95.2550 }
];

function AlvinMap({ p, displayFont }) {
  const [active, setActive] = useStateS(0);
  const mapRef = useRefS(null);
  const mapInstanceRef = useRefS(null);
  const markersRef = useRefS([]);

  useEffectS(() => {
    if (!mapRef.current || mapInstanceRef.current || typeof L === "undefined") return;

    const map = L.map(mapRef.current, {
      scrollWheelZoom: false,
      attributionControl: false
    }).setView([29.415, -95.240], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    L.control.attribution({ position: 'bottomright' }).addTo(map);

    const markers = [];
    MAP_PROPS.forEach((m) => {
      const isOffice = m.office;
      const markerColor = isOffice ? '#C9A96E' : '#1B2A4A';
      const icon = L.divIcon({
        className: '',
        html: `<div style="
          width: 28px; height: 28px; border-radius: 50% 50% 50% 0;
          background: ${markerColor};
          border: 2px solid #fff;
          transform: rotate(-45deg);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
          transition: all 200ms ease;
        ">
          <span style="
            transform: rotate(45deg);
            color: #fff; font-size: 11px; font-weight: 600;
            font-family: 'Source Sans 3', sans-serif;
          ">${isOffice ? '★' : m.id + 1}</span>
        </div>`,
        iconSize: [28, 28],
        iconAnchor: [14, 28]
      });

      const marker = L.marker([m.lat, m.lng], { icon }).addTo(map);

      const popupContent = document.createElement('div');
      popupContent.innerHTML = `<strong style="font-family: '${displayFont}', serif; font-size: 14px;">${m.name}</strong><br/><span style="font-size: 12px; color: #5A5A5A;">${m.addr}${isOffice ? ' · Leasing office' : ''}</span>`;

      const popup = L.popup({ offset: [0, -24], closeButton: true, className: 'ys-map-popup' })
        .setContent(popupContent);

      marker.bindPopup(popup);

      marker.on('click', () => {
        setActive(m.id);
      });

      markers.push(marker);
    });

    mapInstanceRef.current = map;
    markersRef.current = markers;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
      markersRef.current = [];
    };
  }, []);

  useEffectS(() => {
    if (markersRef.current[active] && mapInstanceRef.current) {
      const marker = markersRef.current[active];
      marker.openPopup();
      mapInstanceRef.current.panTo(marker.getLatLng(), { animate: true, duration: 0.5 });
    }
  }, [active]);

  return (
    <section id="map" style={{ padding: "80px var(--pad-x)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ marginBottom: 40 }}>
          <div style={{
            fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
            color: p.accent, fontWeight: 600, marginBottom: 14
          }}>
            All within Alvin
          </div>
          <h2 style={{
            fontFamily: `'${displayFont}', serif`,
            fontSize: "clamp(32px, 4vw, 52px)",
            lineHeight: 1.05, letterSpacing: "-0.02em",
            margin: 0, color: p.ink, fontWeight: 400, maxWidth: "16ch"
          }}>Five communities, one neighborhood.</h2>
          <p style={{
            fontSize: 17, lineHeight: 1.6, color: p.inkSoft,
            maxWidth: "50ch", marginTop: 16
          }}>The furthest property is a seven-minute drive from our office.</p>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 24
        }} className="ys-map-grid">
          {/* List */}
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {MAP_PROPS.map(m => (
              <button
                key={m.id}
                onMouseEnter={() => setActive(m.id)}
                onClick={() => setActive(m.id)}
                style={{
                  textAlign: "left", padding: "14px 16px",
                  background: active === m.id ? p.paper : "transparent",
                  border: "none",
                  borderTop: m.id === 0 ? `1px solid ${p.line}` : "none",
                  borderBottom: `1px solid ${p.line}`,
                  borderLeft: `2px solid ${active === m.id ? p.accent : "transparent"}`,
                  cursor: "pointer", fontFamily: "inherit",
                  display: "flex", alignItems: "center", gap: 12,
                  transition: "all 160ms ease",
                  borderRadius: active === m.id ? 10 : 0
                }}
              >
                <span style={{
                  width: 26, height: 26, borderRadius: "50%",
                  background: m.office ? p.accent : p.primary,
                  color: p.paper,
                  display: "grid", placeItems: "center",
                  fontSize: 11, fontWeight: 600, flexShrink: 0
                }}>{m.office ? "★" : m.id + 1}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontFamily: `'${displayFont}', serif`, fontSize: 17,
                    color: p.ink, lineHeight: 1.2, fontWeight: 400
                  }}>{m.name}</div>
                  <div style={{ fontSize: 12, color: p.inkSoft, marginTop: 2 }}>
                    {m.addr}{m.office ? " · Leasing office" : ""}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Real Map */}
          <div
            ref={mapRef}
            style={{
              position: "relative",
              aspectRatio: "4/3",
              background: p.paper,
              border: `1px solid ${p.line}`,
              borderRadius: 8,
              overflow: "hidden",
              minHeight: 320
            }}
          />
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- FAQ ----------------------------- */

const FAQS = [
  {
    q: "What's required to apply?",
    a: "A government-issued ID, proof of income (typically 3× monthly rent), and a $40 application fee per adult. Most applications are decided within 48 hours."
  },
  {
    q: "Are pets allowed?",
    a: "Yes, most properties accept cats and dogs under 50 lbs with a $300 pet deposit and $25/month pet rent. Breed restrictions apply at some buildings."
  },
  {
    q: "What's included in rent?",
    a: "Water and trash are not included at all five properties. Electric and internet are billed by the resident directly."
  },
  {
    q: "How do I submit a maintenance request?",
    a: "Call (832) 210-3968 or email office@yellowstone-am.com. Emergency requests are handled within 24 hours; standard requests within 48 hours during business days."
  },
  {
    q: "Do you offer short-term leases?",
    a: "Standard leases are 12 months. We can offer 6-month leases at a slight premium and month-to-month for existing residents on renewal."
  }
];

function FAQ({ p, displayFont }) {
  const [open, setOpen] = useStateS(0);
  return (
    <section id="faq" style={{ padding: "80px var(--pad-x)", background: p.paper }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 2fr", gap: 48, alignItems: "start"
        }} className="ys-faq-grid">
          <div>
            <div style={{
              fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
              color: p.accent, fontWeight: 600, marginBottom: 14
            }}>Common questions</div>
            <h2 style={{
              fontFamily: `'${displayFont}', serif`,
              fontSize: "clamp(32px, 4vw, 52px)",
              lineHeight: 1.05, letterSpacing: "-0.02em",
              margin: 0, color: p.ink, fontWeight: 400, maxWidth: "14ch"
            }}>Things renters usually ask first.</h2>
            <p style={{
              fontSize: 15, lineHeight: 1.6, color: p.inkSoft,
              marginTop: 20, maxWidth: "36ch"
            }}>Don't see your question? Call <a href="tel:8322103968" style={{ color: p.primary, textDecoration: "none", fontWeight: 600 }}>(832) 210-3968</a>.</p>
          </div>
          <div>
            {FAQS.map((f, i) => {
              const isOpen = open === i;
              return (
                <div key={i} style={{
                  borderTop: i === 0 ? `1px solid ${p.line}` : "none",
                  borderBottom: `1px solid ${p.line}`
                }}>
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    style={{
                      width: "100%", textAlign: "left",
                      padding: "20px 0",
                      background: "transparent", border: "none",
                      cursor: "pointer", fontFamily: "inherit",
                      display: "flex", alignItems: "center", gap: 16,
                      color: p.ink
                    }}
                  >
                    <span style={{
                      fontFamily: "'Source Sans 3', sans-serif",
                      fontSize: 12, color: p.accent, fontWeight: 600,
                      flexShrink: 0, width: 24
                    }}>{String(i + 1).padStart(2, "0")}</span>
                    <span style={{
                      flex: 1,
                      fontFamily: `'${displayFont}', serif`,
                      fontSize: "clamp(17px, 1.8vw, 22px)",
                      fontWeight: 400, letterSpacing: "-0.01em",
                      lineHeight: 1.25
                    }}>{f.q}</span>
                    <span style={{
                      width: 26, height: 26, borderRadius: "50%",
                      border: `1px solid ${p.line}`,
                      display: "grid", placeItems: "center",
                      flexShrink: 0,
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                      transition: "transform 220ms ease",
                      background: isOpen ? p.ink : "transparent",
                      color: isOpen ? p.paper : p.ink
                    }}>
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                        <path d="M6 1.5v9M1.5 6h9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                    </span>
                  </button>
                  <div style={{
                    maxHeight: isOpen ? 180 : 0,
                    overflow: "hidden",
                    transition: "max-height 300ms ease, padding 300ms ease",
                    paddingBottom: isOpen ? 20 : 0,
                    paddingLeft: 40
                  }}>
                    <p style={{
                      fontSize: 15, lineHeight: 1.6, color: p.inkSoft,
                      margin: 0, maxWidth: "56ch"
                    }}>{f.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

window.Availability = Availability;
window.AlvinMap = AlvinMap;
window.FAQ = FAQ;

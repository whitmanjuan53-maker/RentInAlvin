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
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
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

function getMapProps() {
  const shared = window.Shared && window.Shared.PROPERTIES;
  if (shared && Array.isArray(shared) && shared.length > 0 && shared[0].lat != null) {
    return shared.map((prop, i) => ({
      id: i,
      slug: prop.id,
      name: prop.name,
      addr: prop.addr,
      fullAddr: prop.fullAddr || `${prop.addr}, Alvin, TX 77511`,
      lat: prop.lat,
      lng: prop.lng,
      office: !!prop.office,
      heroImage: prop.heroImage || "",
      description: prop.description || prop.note || "",
      note: prop.note || "",
      price: prop.price || ""
    }));
  }
  // Fallback hardcoded data (self-contained for pages without shared.jsx)
  return [
    { id: 0, slug: "kings-haven", name: "King's Haven", addr: "410 S 2nd St", fullAddr: "410 S 2nd St, Alvin, TX 77511", lat: 29.4208, lng: -95.2442, office: true, heroImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop&q=80", description: "Our flagship community and company headquarters.", note: "Headquarters of Yellowstone Management. Walkable to downtown Alvin.", price: "from $890" },
    { id: 1, slug: "kings-manor", name: "King's Manor", addr: "328 S 2nd St", fullAddr: "328 S 2nd St, Alvin, TX 77511", lat: 29.4215, lng: -95.2441, office: false, heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop&q=80", description: "Spacious two-story townhomes with private entries.", note: "Two-story townhomes with private entries and 2.5 baths.", price: "from $1,250" },
    { id: 2, slug: "kings-haven-100", name: "King's Haven (100)", addr: "100 S 2nd St", fullAddr: "100 S 2nd St, Alvin, TX 77511", lat: 29.4235, lng: -95.2439, office: false, heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop&q=80", description: "A quieter sister location with newly renovated interiors.", note: "Quiet block near 100 S 2nd; renovated interiors.", price: "from $850" },
    { id: 3, slug: "french-quarter", name: "French Quarter", addr: "2550 S Bypass 35", fullAddr: "2550 S Bypass 35, Alvin, TX 77511", lat: 29.3950, lng: -95.2330, office: false, heroImage: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&h=300&fit=crop&q=80", description: "Our largest community along the bypass.", note: "Larger community along the bypass with ample parking.", price: "from $950" },
    { id: 4, slug: "white-house", name: "White House", addr: "1606 W Sealy St", fullAddr: "1606 W Sealy St, Alvin, TX 77511", lat: 29.4260, lng: -95.2550, office: false, heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=300&fit=crop&q=80", description: "Classic white-clad architecture on a quiet street.", note: "Classic white-clad apartments on a quiet residential street.", price: "from $900" }
  ];
}

function AlvinMap({ p, displayFont, focusedProperty }) {
  const props = useMemoS(() => getMapProps(), []);
  const [active, setActive] = useStateS(0);
  const [mapError, setMapError] = useStateS(false);
  const [isMobile, setIsMobile] = useStateS(false);
  const [mapLoaded, setMapLoaded] = useStateS(false);
  const mapContainerRef = useRefS(null);
  const mapRef = useRefS(null);
  const mapInstanceRef = useRefS(null);
  const markersRef = useRefS([]);
  const activeRef = useRefS(0);
  useEffectS(() => { activeRef.current = active; }, [active]);

  useEffectS(() => {
    const check = () => setIsMobile(window.innerWidth <= 960);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Initialize Leaflet immediately on mount
  useEffectS(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const timer = setTimeout(() => {
      if (typeof L === "undefined") {
        console.error("[AlvinMap] Leaflet library not loaded.");
        setMapError(true);
        return;
      }
      try {
        const container = mapRef.current;
        if (!container || container.clientWidth === 0 || container.clientHeight === 0) {
          console.error("[AlvinMap] Map container has zero dimensions.");
          setMapError(true);
          return;
        }

        const map = L.map(container, {
          scrollWheelZoom: false,
          attributionControl: false
        }).setView([29.415, -95.240], 13);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        L.control.attribution({ position: "bottomright", prefix: false }).addTo(map);

        const markers = [];
        props.forEach((m) => {
          const isOffice = m.office;
          const markerColor = isOffice ? p.accent : p.primary;
          const icon = L.divIcon({
            className: "",
            html: `<div style="
              width: 32px; height: 32px; border-radius: 50% 50% 50% 0;
              background: ${markerColor};
              border: 2.5px solid #fff;
              transform: rotate(-45deg);
              display: flex; align-items: center; justify-content: center;
              box-shadow: 0 3px 10px rgba(0,0,0,0.28);
            ">
              <span style="
                transform: rotate(45deg);
                color: #fff; font-size: 12px; font-weight: 700;
                font-family: 'Source Sans 3', sans-serif;
              ">${isOffice ? "★" : m.id + 1}</span>
            </div>`,
            iconSize: [32, 32],
            iconAnchor: [16, 32]
          });

          const marker = L.marker([m.lat, m.lng], { icon }).addTo(map);

          const directionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(m.fullAddr)}`;

          const popupEl = document.createElement("div");
          popupEl.style.cssText = "font-family:'Source Sans 3',sans-serif;min-width:180px;max-width:min(240px, 80vw);";
          popupEl.innerHTML = `
            <div style="padding:14px 16px 16px;">
              <div style="font-family:'${displayFont}',serif;font-size:16px;color:#2D2D2D;line-height:1.2;font-weight:400;">${m.name}</div>
              <div style="font-size:12px;color:#5A5A5A;margin-top:4px;">${m.fullAddr}${isOffice ? " · Leasing office" : ""}</div>
              <div style="display:flex;gap:8px;margin-top:12px;flex-wrap:wrap;">
                <a href="${directionsUrl}" target="_blank" rel="noopener" style="flex:1;min-width:90px;text-align:center;padding:12px 0;background:${p.primary};color:#fff;text-decoration:none;font-size:13px;font-weight:600;border-radius:8px;letter-spacing:0.01em;min-height:44px;display:flex;align-items:center;justify-content:center;">Get directions</a>
                <a href="property-detail.html?property=${m.slug}" style="flex:1;min-width:90px;text-align:center;padding:12px 0;background:transparent;color:${p.primary};text-decoration:none;font-size:12px;font-weight:600;border-radius:8px;border:1.5px solid ${p.primary};letter-spacing:0.01em;">View property</a>
              </div>
            </div>
          `;

          const popup = L.popup({ offset: [0, -30], closeButton: true, className: "ys-map-popup" })
            .setContent(popupEl);

          marker.bindPopup(popup);

          // Track popup state to prevent reopening after manual close
          popup.on('popupclose', () => {
            // Only clear active if this marker was the active one
            // Use activeRef to avoid stale closure
            if (markersRef.current[activeRef.current] === marker) {
              setActive(-1);
            }
          });

          marker.on("click", () => {
            setActive(m.id);
          });

          markers.push(marker);
        });

        mapInstanceRef.current = map;
        markersRef.current = markers;
        setMapLoaded(true);
        // Ensure Leaflet recalculates container dimensions after layout settles
        // Multiple calls at different times to handle various layout scenarios
        requestAnimationFrame(() => map.invalidateSize());
        setTimeout(() => map.invalidateSize(), 100);
        setTimeout(() => map.invalidateSize(), 500);
      } catch (err) {
        console.error("[AlvinMap] Map initialization failed:", err);
        setMapError(true);
      }
    }, 300);

    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        try { mapInstanceRef.current.remove(); } catch (e) {}
        mapInstanceRef.current = null;
        markersRef.current = [];
      }
    };
  }, []);

  // Focus marker when active changes from list or external prop
  useEffectS(() => {
    if (markersRef.current[active] && mapInstanceRef.current) {
      const marker = markersRef.current[active];
      marker.openPopup();
      mapInstanceRef.current.flyTo(marker.getLatLng(), 16, { animate: true, duration: 0.6 });
    }
  }, [active]);

  // Handle external focusedProperty prop
  useEffectS(() => {
    if (focusedProperty != null) {
      const idx = props.findIndex(m => m.slug === focusedProperty);
      if (idx >= 0) setActive(idx);
    }
  }, [focusedProperty]);

  const handleListClick = (id) => {
    setActive(id);
    if (isMobile && mapContainerRef.current) {
      mapContainerRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  const Fallback = () => (
    <div style={{
      position: "relative",
      height: isMobile ? "clamp(280px, 42vh, 420px)" : "clamp(420px, 55vh, 580px)",
      background: p.bg,
      border: `1px solid ${p.line}`,
      borderRadius: 12,
      overflow: "hidden",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 40, textAlign: "center"
    }}>
      <div style={{ maxWidth: "34ch" }}>
        <div style={{ fontSize: 36, marginBottom: 12 }}>🗺️</div>
        <div style={{ fontFamily: `'${displayFont}', serif`, fontSize: 20, color: p.ink, marginBottom: 8 }}>
          Map unavailable right now.
        </div>
        <p style={{ fontSize: 15, color: p.inkSoft, margin: "0 auto 20px", lineHeight: 1.55 }}>
          Use the directions links below to find each property.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: "center" }}>
          {props.map(m => (
            <a key={m.id} href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(m.fullAddr)}`} target="_blank" rel="noopener" style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "8px 14px", background: p.paper, color: p.ink,
              textDecoration: "none", fontSize: 13, fontWeight: 600,
              borderRadius: 8, border: `1px solid ${p.line}`,
              width: "100%", justifyContent: "center"
            }}>
              <span style={{ fontSize: 11 }}>{m.office ? "★" : m.id + 1}</span>
              {m.name}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7m0 0L6.5 3m3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
            </a>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <section id="map" style={{ padding: isMobile ? "56px var(--pad-x)" : "80px var(--pad-x)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ marginBottom: isMobile ? 24 : 40 }}>
          <div style={{
            fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
            color: p.accent, fontWeight: 600, marginBottom: 14
          }}>
            Explore our communities
          </div>
          <h2 style={{
            fontFamily: `'${displayFont}', serif`,
            fontSize: "clamp(32px, 4vw, 52px)",
            lineHeight: 1.05, letterSpacing: "-0.02em",
            margin: 0, color: p.ink, fontWeight: 400, maxWidth: "18ch"
          }}>Find Apartments in Alvin</h2>
          <p style={{
            fontSize: 17, lineHeight: 1.6, color: p.inkSoft,
            maxWidth: "52ch", marginTop: 16
          }}>Click any property on the map to see details, or tap a location in the list to focus its pin.</p>
        </div>

        {/* Mobile horizontal scroll cards */}
        {isMobile && (
          <div className="ys-mobile-cards" style={{
            display: "flex", gap: 10, overflowX: "auto", paddingBottom: 4, marginBottom: 16,
            scrollbarWidth: "none", msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch"
          }}>
            <style>{`.ys-mobile-cards::-webkit-scrollbar { display: none; }`}</style>
            {props.map(m => {
              const selected = active === m.id;
              return (
                <div
                  key={m.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => handleListClick(m.id)}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleListClick(m.id); } }}
                  style={{
                    flex: "0 0 auto",
                    width: 220,
                    textAlign: "left",
                    padding: "12px 14px",
                    background: selected ? p.paper : p.bg,
                    border: `1.5px solid ${selected ? p.accent : p.line}`,
                    borderRadius: 10,
                    cursor: "pointer",
                    fontFamily: "inherit",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 10,
                    transition: "all 160ms ease"
                  }}
                >
                  <span style={{
                    width: 24, height: 24, borderRadius: "50%",
                    background: m.office ? p.accent : p.primary,
                    color: p.paper,
                    display: "grid", placeItems: "center",
                    fontSize: 10, fontWeight: 600, flexShrink: 0, marginTop: 2
                  }}>{m.office ? "★" : m.id + 1}</span>
                  <div style={{ minWidth: 0 }}>
                    <div style={{
                      fontFamily: `'${displayFont}', serif`, fontSize: 15,
                      color: p.ink, lineHeight: 1.2, fontWeight: 400
                    }}>{m.name}</div>
                    <div style={{ fontSize: 12, color: p.inkSoft, marginTop: 2, lineHeight: 1.4 }}>
                      {m.addr}{m.office ? " · Leasing office" : ""}
                    </div>
                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(m.fullAddr)}`}
                      target="_blank" rel="noopener"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: "inline-flex", alignItems: "center", gap: 4,
                        marginTop: 8, fontSize: 12, fontWeight: 600,
                        color: p.primary, textDecoration: "none"
                      }}
                    >
                      Directions
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7m0 0L6.5 3m3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <div style={{
          display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.6fr", gap: 24
        }} className="ys-map-grid">
          {/* Desktop list */}
          {!isMobile && (
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {props.map(m => {
                const selected = active === m.id;
                return (
                  <div
                    key={m.id}
                    role="button"
                    tabIndex={0}
                    onMouseEnter={() => setActive(m.id)}
                    onClick={() => setActive(m.id)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setActive(m.id); } }}
                    style={{
                      textAlign: "left", padding: "14px 16px",
                      background: selected ? p.paper : "transparent",
                      border: "none",
                      borderTop: m.id === 0 ? `1px solid ${p.line}` : "none",
                      borderBottom: `1px solid ${p.line}`,
                      borderLeft: `3px solid ${selected ? p.primary : "transparent"}`,
                      cursor: "pointer", fontFamily: "inherit",
                      display: "flex", alignItems: "center", gap: 12,
                      transition: "all 160ms ease",
                      borderRadius: selected ? 10 : 0
                    }}
                  >
                    <span style={{
                      width: 28, height: 28, borderRadius: "50%",
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
                    <a href={`property-detail.html?property=${m.slug}`} onClick={(e) => e.stopPropagation()} style={{
                      fontSize: 12, fontWeight: 600, color: p.primary, textDecoration: "none",
                      flexShrink: 0, padding: "4px 8px", borderRadius: 6,
                      transition: "background 160ms ease"
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = p.bg}
                    onMouseOut={(e) => e.currentTarget.style.background = "transparent"}>
                      View →
                    </a>
                  </div>
                );
              })}
            </div>
          )}

          {/* Map container */}
          <div
            ref={mapContainerRef}
            style={{
              position: "relative",
              width: "100%",
              height: isMobile ? 380 : "clamp(420px, 55vh, 580px)",
              background: p.paper,
              border: `1px solid ${p.line}`,
              borderRadius: 12,
              overflow: "hidden",
              touchAction: "auto"
            }}
          >
            {mapError ? (
              <Fallback />
            ) : (
              <>
                <div ref={mapRef} style={{ width: "100%", height: "100%" }} />
                {!mapLoaded && (
                  <div style={{
                    position: "absolute", inset: 0, zIndex: 2,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: p.bg
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: "50%",
                      border: `3px solid ${p.line}`,
                      borderTopColor: p.accent,
                      animation: "ys-spin 1s linear infinite"
                    }} />
                    <style>{`@keyframes ys-spin { to { transform: rotate(360deg); } }`}</style>
                  </div>
                )}
              </>
            )}
          </div>
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

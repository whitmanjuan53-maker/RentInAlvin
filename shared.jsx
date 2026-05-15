/* global React, ReactDOM */
const { useState, useEffect } = React;

/* ============================================================
   RENT IN ALVIN — Shared Components
   Aesthetic: editorial, warm, residential.
   Lora for headings. Source Sans 3 for body text.
============================================================ */

const TWEAK_DEFAULTS = {
  palette: "warm",
  displayFont: "Lora",
  showStats: true
};

const SOCIAL_LINKS = {
  instagram: "https://instagram.com/rentinalvin",
  facebook: "https://facebook.com/rentinalvin"
};

const PALETTES = {
  warm: {
    bg: "#FAFAF8",
    paper: "#FFFFFF",
    ink: "#2D2D2D",
    inkSoft: "#5A5A5A",
    primary: "#1B2A4A",
    primarySoft: "#243554",
    accent: "#C9A96E",
    line: "rgba(27, 42, 74, 0.10)"
  },
  sand: {
    bg: "#F2EFE9",
    paper: "#FAFAF8",
    ink: "#2D2D2D",
    inkSoft: "#5A5A5A",
    primary: "#1B2A4A",
    primarySoft: "#243554",
    accent: "#B8975A",
    line: "rgba(27, 42, 74, 0.10)"
  },
  slate: {
    bg: "#EAE8E3",
    paper: "#F5F3EE",
    ink: "#2D2D2D",
    inkSoft: "#5A5A5A",
    primary: "#1B2A4A",
    primarySoft: "#243554",
    accent: "#C9A96E",
    line: "rgba(27, 42, 74, 0.12)"
  },
  forest: {
    bg: "#F4EEE4",
    paper: "#FBF7F0",
    ink: "#1A1815",
    inkSoft: "#5C5750",
    primary: "#1F3A2E",
    primarySoft: "#2A4A3C",
    accent: "#B5703D",
    line: "rgba(26,24,21,0.12)"
  }
};

const PROPERTIES = [
  {
    id: "kings-haven",
    name: "Kings Haven Apartments",
    addr: "410 S 2nd St",
    fullAddr: "410 S 2nd St, Alvin, TX 77511",
    lat: 29.4208,
    lng: -95.2442,
    office: true,
    tag: "Flagship · Office on-site",
    units: "2BR · 1BA · 850 sq ft",
    price: "from $890",
    note: "Headquarters of Yellowstone Management. Walkable to downtown Alvin.",
    img: "Kings Haven exterior",
    heroImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80"
    ],
    description: "Our flagship community and company headquarters. Kings Haven offers well-maintained two-bedroom apartments in the heart of downtown Alvin. The on-site office means help is never more than a few steps away.",
    amenities: ["On-site laundry", "Central A/C", "Off-street parking", "Pet friendly", "High-speed internet ready", "On-site management"],
    highlights: ["Office on-site", "Walkable to downtown", "Recently renovated units"]
  },
  {
    id: "kings-manor",
    name: "Kings Manor Townhomes",
    addr: "328 S 2nd St",
    fullAddr: "328 S 2nd St, Alvin, TX 77511",
    lat: 29.4215,
    lng: -95.2441,
    tag: "Townhome",
    units: "2BR · 2.5BA · 3BR · 2.5BA · 1,250 sq ft",
    price: "from $1,250",
    note: "Two-story townhomes with private entries and 2.5 baths.",
    img: "Kings Manor exterior",
    heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80"
    ],
    description: "Spacious two-story townhomes with private entries, 2.5 baths, and room to spread out. Kings Manor combines the privacy of a home with the convenience of a professionally managed community.",
    amenities: ["Private entry", "In-unit W/D hookups", "Central A/C", "Attached garage", "Fenced yard", "Pet friendly"],
    highlights: ["Two-story layouts", "Private entries", "2.5 baths"]
  },
  {
    id: "kings-haven-100",
    name: "Kings Haven Apartments",
    addr: "100 S 2nd St",
    fullAddr: "100 S 2nd St, Alvin, TX 77511",
    lat: 29.4235,
    lng: -95.2439,
    tag: "Apartments",
    units: "2BR · 1BA · 850 sq ft",
    price: "from $850",
    note: "Quiet block near 100 S 2nd; renovated interiors.",
    img: "Kings Haven 100 exterior",
    heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop&q=80"
    ],
    description: "A quieter sister location to our flagship, Kings Haven at 100 S 2nd offers the same quality management with newly renovated interiors. A great choice for residents who want to be close to downtown without the bustle.",
    amenities: ["On-site laundry", "Central A/C", "Off-street parking", "Pet friendly", "High-speed internet ready", "Renovated interiors"],
    highlights: ["Quiet residential block", "Renovated interiors", "Close to schools"]
  },
  {
    id: "french-quarter",
    name: "French Quarter Residency",
    addr: "2550 S Bypass 35",
    fullAddr: "2550 S Bypass 35, Alvin, TX 77511",
    lat: 29.3950,
    lng: -95.2330,
    tag: "Apartments",
    units: "2BR · 1BA · 850 sq ft",
    price: "from $950",
    note: "Larger community along the bypass with ample parking.",
    img: "French Quarter exterior",
    heroImage: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop&q=80"
    ],
    description: "Our largest community, French Quarter sits along the bypass for easy commuting. Ample parking, well-maintained grounds, and a professional management team make this a popular choice for working professionals.",
    amenities: ["Ample parking", "Central A/C", "On-site laundry", "Pet friendly", "High-speed internet ready", "Easy bypass access"],
    highlights: ["Ample parking", "Easy bypass access", "Larger community"]
  },
  {
    id: "white-house",
    name: "The White House Apartments",
    addr: "1606 W Sealy St",
    fullAddr: "1606 W Sealy St, Alvin, TX 77511",
    lat: 29.4260,
    lng: -95.2550,
    tag: "Apartments",
    units: "2BR · 1BA · 850 sq ft",
    price: "from $900",
    note: "Classic white-clad apartments on a quiet residential street.",
    img: "White House exterior",
    heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop&q=80",
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop&q=80"
    ],
    description: "Classic white-clad architecture gives this community its name and its charm. The White House Apartments sit on a quiet residential street near local parks, offering a peaceful setting with the same responsive management you expect from RentInAlvin.",
    amenities: ["On-site laundry", "Central A/C", "Off-street parking", "Pet friendly", "High-speed internet ready", "Near parks"],
    highlights: ["Classic architecture", "Quiet residential street", "Near parks"]
  }
];

const FLOORPLANS = [
  { type: "1 Bed · 1 Bath", sqft: "600 sq ft", price: "$850 – $999", available: 2 },
  { type: "2 Bed · 1 Bath", sqft: "850 sq ft", price: "$900 – $975", available: 4 },
  { type: "2 Bed · 2 Bath", sqft: "1,150 sq ft", price: "$1,250 – $1,395", available: 3 },
  { type: "2 Bed · 2.5 Bath", sqft: "1,250 sq ft (townhome)", price: "$1,295 – $1,450", available: 2 },
  { type: "3 Bed · 2.5 Bath", sqft: "1,250 sq ft (townhome)", price: "$1,495 – $1,650", available: 1 }
];

/* ----------------------------- placeholder image ----------------------------- */

function Placeholder({ label, ink, paper }) {
  const subtle = `color-mix(in oklab, ${ink} 4%, ${paper})`;
  return (
    <div style={{
      position: "absolute", inset: 0,
      background: subtle,
      display: "flex", alignItems: "center", justifyContent: "center",
      color: ink, opacity: 0.6
    }}>
      <span style={{
        fontFamily: "'Source Sans 3', ui-sans-serif, sans-serif",
        fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase",
        fontWeight: 500
      }}>
        {label}
      </span>
    </div>
  );
}

/* ----------------------------- nav ----------------------------- */

function Nav({ p, currentPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => { document.body.style.overflow = prev; };
    }
  }, [menuOpen]);

  const links = [
    { label: "Home", href: "index.html", id: "home" },
    { label: "Properties", href: "properties.html", id: "properties" },
    { label: "Gallery", href: "gallery.html", id: "gallery" },
    { label: "Location", href: "location.html", id: "location" },
    { label: "Apply", href: "apply.html", id: "apply" },
    { label: "Sell", href: "sell.html", id: "sell" },
    { label: "FAQ", href: "about.html#faq", id: "faq" },
    { label: "Contact", href: "contact.html", id: "contact" },
    { label: "About", href: "about.html", id: "about" }
  ];

  return (
    <header className="ys-nav" style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      padding: scrolled ? "14px var(--pad-x)" : "20px var(--pad-x)",
      transition: "all 220ms ease",
      background: scrolled ? `color-mix(in oklab, ${p.bg} 94%, transparent)` : "transparent",
      backdropFilter: scrolled ? "blur(10px)" : "none",
      borderBottom: scrolled ? `1px solid ${p.line}` : "1px solid transparent",
      display: "flex", alignItems: "center", justifyContent: "space-between"
    }}>
      <a href="index.html" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: p.ink }}>
        <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.15 }}>
          <span style={{ fontFamily: "'Lora', serif", fontSize: 22, letterSpacing: "-0.01em", fontWeight: 500 }}>
            RentInAlvin.com
          </span>
          <span style={{ fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: p.inkSoft, fontWeight: 500 }}>
            Managed by Yellowstone Asset Management
          </span>
        </div>
      </a>
      <nav className="ys-nav-links" style={{ display: "flex", alignItems: "center", gap: 24 }}>
        {links.map((link) => (
          <a
            key={link.id}
            href={link.href}
            style={{
              color: currentPage === link.id ? p.primary : p.ink,
              textDecoration: "none",
              fontSize: 14,
              fontWeight: currentPage === link.id ? 600 : 500,
              letterSpacing: "0.01em",
              transition: "color 160ms ease",
              borderBottom: currentPage === link.id ? `2px solid ${p.accent}` : "2px solid transparent",
              paddingBottom: 2
            }}
            onMouseOver={(e) => { if (currentPage !== link.id) e.currentTarget.style.color = p.accent; }}
            onMouseOut={(e) => { if (currentPage !== link.id) e.currentTarget.style.color = p.ink; }}
          >
            {link.label}
          </a>
        ))}
        <a href="tel:8322103968" style={{
          color: p.primary, textDecoration: "none", fontSize: 14, fontWeight: 600,
          padding: "8px 16px", border: `1px solid ${p.primary}`, borderRadius: 6,
          transition: "all 180ms ease"
        }}
        onMouseOver={(e) => { e.currentTarget.style.background = p.primary; e.currentTarget.style.color = p.paper; }}
        onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = p.primary; }}>
          (832) 210-3968
        </a>
      </nav>
      <button className="ys-nav-burger" onClick={() => setMenuOpen((o) => !o)} aria-label="Menu" style={{
        display: "none",
        background: "transparent", border: `1px solid ${p.line}`, borderRadius: 6,
        width: 40, height: 40, padding: 0, cursor: "pointer",
        alignItems: "center", justifyContent: "center"
      }}>
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          {menuOpen ?
            <path d="M4 4l10 10M14 4L4 14" stroke={p.ink} strokeWidth="1.6" strokeLinecap="round" /> :
            <><path d="M2 5h14M2 9h14M2 13h14" stroke={p.ink} strokeWidth="1.6" strokeLinecap="round" /></>}
        </svg>
      </button>
      {menuOpen && (
        <>
        <div onClick={() => setMenuOpen(false)} style={{
          position: "fixed", inset: 0, top: 72, zIndex: 49,
          background: "rgba(27, 42, 74, 0.25)",
          backdropFilter: "blur(2px)"
        }} />
        <div className="ys-nav-mobile" style={{
          position: "absolute", top: "100%", left: 0, right: 0, zIndex: 50,
          background: p.paper, borderBottom: `1px solid ${p.line}`,
          padding: "12px var(--pad-x) 20px",
          display: "flex", flexDirection: "column", gap: 2,
          maxHeight: "80vh", overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          boxShadow: "0 20px 40px rgba(27, 42, 74, 0.12)"
        }}>
          {links.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              style={{
                color: p.ink, textDecoration: "none",
                fontSize: 16, fontWeight: currentPage === link.id ? 600 : 500,
                padding: "10px 0", borderBottom: `1px solid ${p.line}`
              }}
            >
              {link.label}
            </a>
          ))}
          <a href="tel:8322103968" style={{
            marginTop: 12, padding: "14px 20px",
            background: p.primary, color: p.paper,
            textDecoration: "none", fontSize: 15, fontWeight: 600,
            textAlign: "center", borderRadius: 6,
            minHeight: 44, display: "flex", alignItems: "center", justifyContent: "center"
          }}>Call (832) 210-3968</a>
        </div>
        </>
      )}
    </header>
  );
}

/* ----------------------------- section header ----------------------------- */

function SectionHead({ p, eyebrow, title, lead, displayFont, marginBottom }) {
  return (
    <div className="ys-section-head" style={{ marginBottom: marginBottom ?? 48 }}>
      {eyebrow && (
        <div style={{
          fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase",
          color: p.accent, fontWeight: 600, marginBottom: 14
        }}>
          {eyebrow}
        </div>
      )}
      <h2 style={{
        fontFamily: `'${displayFont}', serif`,
        fontSize: "clamp(32px, 4vw, 52px)",
        lineHeight: 1.05, letterSpacing: "-0.02em",
        margin: 0, color: p.ink, fontWeight: 400,
        maxWidth: "18ch"
      }}>{title}</h2>
      <div style={{ width: 48, height: 3, background: p.accent, marginTop: 16, borderRadius: 2 }} />
      {lead && (
        <p style={{
          fontSize: 17, lineHeight: 1.6, color: p.inkSoft,
          maxWidth: "52ch", marginTop: 16
        }}>{lead}</p>
      )}
    </div>
  );
}

/* ----------------------------- properties ----------------------------- */

function PropertyCard({ prop, p, idx, displayFont, onSelect }) {
  const [hover, setHover] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const hasImage = prop.heroImage && typeof prop.heroImage === "string" && prop.heroImage.startsWith("http");
  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={(e) => {
        if (onSelect && !e.target.closest('a')) {
          onSelect(prop.id);
        }
      }}
      style={{
        background: p.paper,
        border: `1px solid ${p.line}`,
        borderRadius: 14,
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        transition: "all 300ms ease",
        transform: hover ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hover ? "0 16px 40px -10px rgba(27, 42, 74, 0.14)" : "0 1px 4px rgba(27, 42, 74, 0.06)",
        cursor: onSelect ? "pointer" : "default"
      }}
    >
      <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: p.bg }}>
        {hasImage ? (
          <>
            <img
              src={prop.heroImage}
              alt={prop.name}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: "100%", objectFit: "cover", display: "block",
                opacity: imgLoaded ? 1 : 0,
                transition: "opacity 500ms ease"
              }}
            />
            {!imgLoaded && <Placeholder label={prop.img} ink={p.ink} paper={p.paper} />}
          </>
        ) : (
          <Placeholder label={prop.img} ink={p.ink} paper={p.paper} />
        )}
        <div style={{
          position: "absolute", top: 16, left: 16,
          background: p.paper, padding: "6px 12px",
          fontSize: 10, letterSpacing: "0.08em", textTransform: "uppercase",
          color: p.primary, fontWeight: 700,
          border: `1px solid ${p.line}`,
          borderRadius: 8,
          boxShadow: "0 2px 8px rgba(27, 42, 74, 0.08)"
        }}>
          {prop.tag}
        </div>
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
          background: p.accent
        }} />
      </div>
      <div style={{ padding: "22px 24px 24px", display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        <div>
          <h3 style={{
            fontFamily: `'${displayFont}', serif`,
            fontSize: 22, lineHeight: 1.15, letterSpacing: "-0.01em",
            margin: 0, color: p.ink, fontWeight: 400
          }}>{prop.name}</h3>
          <div style={{ fontSize: 13, color: p.inkSoft, marginTop: 4, display: "flex", alignItems: "center", gap: 6 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={p.inkSoft} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {prop.addr} · Alvin, TX
          </div>
        </div>
        <p style={{ fontSize: 14, color: p.inkSoft, lineHeight: 1.55, margin: 0, flex: 1 }}>
          {prop.note}
        </p>
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap",
          paddingTop: 14, borderTop: `1px solid ${p.line}`,
          gap: 12
        }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: p.inkSoft, fontWeight: 500 }}>
              {prop.units}
            </div>
            <div style={{
              fontFamily: `'${displayFont}', serif`,
              fontSize: 20, color: p.primary, marginTop: 2
            }}>
              {prop.price}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
            <a href={`property-detail.html?property=${prop.id}`} style={{
              fontSize: 13, fontWeight: 600, color: p.primary, textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 6,
              transition: "color 200ms ease"
            }}
            onMouseOver={(e) => e.currentTarget.style.color = p.accent}
            onMouseOut={(e) => e.currentTarget.style.color = p.primary}>
              View details
            </a>
            <span style={{ color: p.line, fontSize: 13 }}>|</span>
            <a href="book-tour.html" style={{
              fontSize: 13, fontWeight: 600, color: p.ink, textDecoration: "none",
              display: "inline-flex", alignItems: "center", gap: 6,
              transition: "color 200ms ease"
            }}
            onMouseOver={(e) => e.currentTarget.style.color = p.accent}
            onMouseOut={(e) => e.currentTarget.style.color = p.ink}>
              Book tour
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7m0 0L6.5 3m3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}

function Properties({ p, displayFont, onPropertySelect }) {
  return (
    <section id="properties" style={{ padding: "80px var(--pad-x)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionHead
          p={p}
          displayFont={displayFont}
          eyebrow="Five properties · One zip code"
          title="Every address we manage, all within Alvin."
          lead="From Kings Haven on South 2nd to the White House on Sealy, five communities, one local team." />
        <div className="ys-prop-grid" style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20
        }}>
          {PROPERTIES.map((prop, i) =>
            <PropertyCard key={i} prop={prop} p={p} idx={i} displayFont={displayFont} onSelect={onPropertySelect} />
          )}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- floorplans ----------------------------- */

function Floorplans({ p, displayFont }) {
  const [active, setActive] = useState(0);
  return (
    <section id="floorplans" style={{ padding: "80px var(--pad-x)", background: p.paper }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionHead
          p={p}
          displayFont={displayFont}
          eyebrow="Floor plans"
          title="Five layouts, honestly priced."
          lead="Rents are listed up-front with no surprise fees. Call to confirm current availability." />

        <div className="ys-floor-grid" style={{
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start"
        }}>
          <div>
            {FLOORPLANS.map((f, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                style={{
                  width: "100%", textAlign: "left",
                  padding: "20px 0",
                  borderBottom: `1px solid ${p.line}`,
                  background: "transparent", border: "none",
                  borderTop: i === 0 ? `1px solid ${p.line}` : "none",
                  cursor: "pointer",
                  display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 20,
                  alignItems: "center",
                  color: p.ink,
                  opacity: active === i ? 1 : 0.5,
                  transition: "opacity 180ms ease",
                  fontFamily: "inherit"
                }}
              >
                <span style={{ fontFamily: "'Source Sans 3', sans-serif", fontSize: 12, color: p.accent, fontWeight: 600 }}>
                  0{i + 1}
                </span>
                <span style={{
                  fontFamily: `'${displayFont}', serif`,
                  fontSize: "clamp(20px, 2.2vw, 26px)", fontWeight: 400, letterSpacing: "-0.01em"
                }}>
                  {f.type}
                </span>
                <span style={{ fontSize: 14, fontWeight: 500 }}>
                  {f.price}
                </span>
              </button>
            ))}
          </div>

          <div className="ys-floor-detail" style={{
            background: p.bg,
            border: `1px solid ${p.line}`,
            borderRadius: 8,
            padding: 32,
            position: "sticky", top: 90
          }}>
            <div style={{
              fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
              color: p.accent, fontWeight: 600
            }}>
              Layout 0{active + 1}
            </div>
            <h3 style={{
              fontFamily: `'${displayFont}', serif`,
              fontSize: "clamp(32px, 3.6vw, 44px)", fontWeight: 400, letterSpacing: "-0.02em",
              lineHeight: 1, margin: "12px 0 0"
            }}>
              {FLOORPLANS[active].type}
            </h3>
            <div style={{
              marginTop: 24,
              display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20
            }}>
              <div>
                <div style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.5, marginBottom: 4, fontWeight: 500 }}>Square feet</div>
                <div style={{ fontSize: 16 }}>{FLOORPLANS[active].sqft}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.5, marginBottom: 4, fontWeight: 500 }}>Monthly rent</div>
                <div style={{ fontSize: 16 }}>{FLOORPLANS[active].price}</div>
              </div>
              <div>
                <div style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.5, marginBottom: 4, fontWeight: 500 }}>Available now</div>
                <div style={{ fontSize: 16 }}>{FLOORPLANS[active].available} units</div>
              </div>
              <div>
                <div style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", opacity: 0.5, marginBottom: 4, fontWeight: 500 }}>Deposit</div>
                <div style={{ fontSize: 16 }}>One month's rent</div>
              </div>
            </div>
            <a href="book-tour.html" style={{
              marginTop: 24,
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "12px 22px",
              background: p.primary, color: p.paper,
              textDecoration: "none", fontWeight: 600, fontSize: 14,
              borderRadius: 10,
              transition: "transform 180ms ease, background 180ms ease"
            }}
            onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-1px)"; e.currentTarget.style.background = p.primarySoft; }}
            onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.background = p.primary; }}>
              Schedule a viewing
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- about ----------------------------- */

function About({ p, displayFont }) {
  const items = [
    {
      title: "Local & responsive",
      body: "Our office is at 410 S 2nd St. When you call, you reach the team that manages your home, not a call center."
    },
    {
      title: "Honest leasing",
      body: "Rents are published on this page. No application bait-and-switch, no surprise admin fees."
    },
    {
      title: "Maintenance, handled",
      body: "Submit a request and a technician we know personally is dispatched. Most issues are closed within 48 hours."
    }
  ];

  return (
    <section id="about" style={{ padding: "80px var(--pad-x)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <SectionHead
          p={p}
          displayFont={displayFont}
          title="Built around the way Alvin actually lives."
          lead="Every property we manage is within ten minutes of our office. That proximity is the whole point." />
        <div className="ys-about-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginTop: 8 }}>
          {items.map((it, i) => (
            <div key={i} style={{ padding: "24px 0", borderTop: `2px solid ${p.ink}` }}>
              <h3 style={{
                fontFamily: `'${displayFont}', serif`,
                fontSize: "clamp(22px, 2.2vw, 26px)", fontWeight: 400, letterSpacing: "-0.01em",
                margin: 0, lineHeight: 1.15, color: p.ink
              }}>{it.title}</h3>
              <p style={{
                fontSize: 15, lineHeight: 1.6, color: p.inkSoft,
                marginTop: 12
              }}>{it.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- contact ----------------------------- */

function Contact({ p, displayFont, simplified }) {
  const [hovered, setHovered] = useState(null);
  const channels = [
    {
      key: "book",
      eyebrow: "Preferred",
      label: "Book a viewing",
      detail: "30 minutes · in-person or virtual",
      action: "Schedule",
      href: "book-tour.html"
    },
    {
      key: "call",
      eyebrow: "Mon–Fri · 9–5 CT",
      label: "(832) 210-3968",
      detail: "Direct line to the leasing office.",
      action: "Call",
      href: "tel:8322103968"
    },
    {
      key: "email",
      eyebrow: "We reply within a day",
      label: "office@yellowstone-am.com",
      detail: "Best for documents and lease questions.",
      action: "Email",
      href: "mailto:office@yellowstone-am.com"
    }
  ];

  if (simplified) {
    return (
      <section id="contact" style={{ padding: "80px var(--pad-x)", background: p.paper }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", textAlign: "center" }}>
          <SectionHead
            p={p}
            displayFont={displayFont}
            title="Ready to see your new home?"
            lead="Stop by the office or book a tour online. We're here to help." />
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginTop: 8 }}>
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
    );
  }

  return (
    <section id="contact" style={{ padding: "80px var(--pad-x)", background: p.paper }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div className="ys-contact-grid" style={{ display: "grid", gridTemplateColumns: "1.1fr 1fr", gap: 64 }}>
          <div>
            <SectionHead
              p={p}
              displayFont={displayFont}
              eyebrow="Visit · Call · Schedule"
              title="Stop by the office, or pick a time online." />
            <div style={{
              marginTop: 8,
              padding: 24,
              border: `1px solid ${p.line}`,
              borderRadius: 8,
              background: p.bg
            }}>
              <div style={{ fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: p.inkSoft, fontWeight: 500 }}>
                Leasing office
              </div>
              <div style={{
                fontFamily: `'${displayFont}', serif`,
                fontSize: "clamp(26px, 2.8vw, 32px)", lineHeight: 1.1, color: p.ink,
                marginTop: 8, fontWeight: 400
              }}>
                410 S 2nd Street<br />Alvin, TX 77511
              </div>
              <div style={{
                marginTop: 16, display: "flex", gap: 24, flexWrap: "wrap",
                fontSize: 13, color: p.inkSoft
              }}>
                <div><div style={{ fontWeight: 600, color: p.ink }}>Mon – Fri</div>9:00am – 5:00pm</div>
                <div><div style={{ fontWeight: 600, color: p.ink }}>Saturday</div>By appointment</div>
                <div><div style={{ fontWeight: 600, color: p.ink }}>Sunday</div>Closed</div>
              </div>
              <a
                href="https://maps.google.com/?q=410+S+2nd+St+Alvin+TX+77511"
                target="_blank" rel="noopener"
                style={{
                  marginTop: 16, display: "inline-flex", alignItems: "center", gap: 8,
                  fontSize: 13, fontWeight: 600, color: p.primary, textDecoration: "none"
                }}>
                Get directions
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2.5 6h7m0 0L6.5 3m3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" /></svg>
              </a>
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {channels.map((c, i) => (
              <a
                key={c.key}
                href={c.href}
                onMouseEnter={() => setHovered(c.key)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: "block",
                  padding: "24px 0",
                  borderTop: i === 0 ? `1px solid ${p.line}` : "none",
                  borderBottom: `1px solid ${p.line}`,
                  textDecoration: "none", color: p.ink,
                  transition: "padding 220ms ease",
                  paddingLeft: hovered === c.key ? 12 : 0,
                  position: "relative"
                }}
              >
                <div style={{
                  position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)",
                  width: hovered === c.key ? 6 : 0, height: hovered === c.key ? 6 : 0,
                  borderRadius: "50%", background: p.accent,
                  transition: "all 220ms ease"
                }}></div>
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap",
                  fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
                  color: p.inkSoft, fontWeight: 500, marginBottom: 8
                }}>
                  <span>{c.eyebrow}</span>
                  <span style={{ color: p.accent }}>{c.action} →</span>
                </div>
                <div style={{
                  fontFamily: `'${displayFont}', serif`,
                  fontSize: c.key === "email" ? "clamp(18px, 2vw, 24px)" : "clamp(26px, 2.8vw, 30px)",
                  lineHeight: 1.15, fontWeight: 400, letterSpacing: "-0.01em",
                  wordBreak: "break-word", overflowWrap: "anywhere"
                }}>
                  {c.label}
                </div>
                <div style={{ fontSize: 14, color: p.inkSoft, marginTop: 8 }}>
                  {c.detail}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- instagram feed ----------------------------- */

function InstagramFeed({ p, displayFont }) {
  const feedImages = PROPERTIES.flatMap(prop => [
    prop.heroImage,
    ...(prop.gallery || [])
  ]).filter(img => img && typeof img === "string" && img.startsWith("http"))
    .slice(0, 6);

  if (feedImages.length === 0) return null;

  const igIcon = (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  );

  return (
    <section style={{ padding: "80px var(--pad-x)", background: p.paper, borderTop: `1px solid ${p.line}` }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", color: "inherit", display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
            <span style={{ color: p.ink }}>{igIcon}</span>
            <span style={{ fontFamily: `'${displayFont}', serif`, fontSize: "clamp(22px, 2.5vw, 30px)", color: p.ink, fontWeight: 400 }}>
              @rentinalvin
            </span>
          </a>
          <p style={{ fontSize: 15, color: p.inkSoft, margin: "8px 0 0", maxWidth: "50ch", marginLeft: "auto", marginRight: "auto" }}>
            Follow us for property updates, community events, and behind-the-scenes looks at life in Alvin.
          </p>
        </div>

        <div className="ys-ig-grid" style={{ display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 4 }}>
          {feedImages.map((img, i) => (
            <a
              key={i}
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden", background: p.bg, display: "block" }}
            >
              <img
                src={img}
                alt={`Instagram post ${i + 1}`}
                loading="lazy"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 400ms ease" }}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.06)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              />
            </a>
          ))}
        </div>

        <div style={{ textAlign: "center", marginTop: 28 }}>
          <a
            href={SOCIAL_LINKS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "10px 20px", border: `1px solid ${p.line}`,
              borderRadius: 10, textDecoration: "none",
              fontSize: 14, fontWeight: 600, color: p.ink,
              transition: "all 200ms ease"
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = p.ink; e.currentTarget.style.color = p.paper; e.currentTarget.style.borderColor = p.ink; }}
            onMouseOut={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = p.ink; e.currentTarget.style.borderColor = p.line; }}
          >
            {igIcon}
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- footer ----------------------------- */

function Footer({ p, displayFont }) {
  const footerLink = {
    display: "flex", alignItems: "center", fontSize: 14, color: "inherit",
    textDecoration: "none", padding: "8px 0",
    transition: "color 200ms ease, transform 200ms ease",
    minHeight: 44
  };
  const headingStyle = {
    color: p.paper, fontWeight: 600, fontSize: 13,
    letterSpacing: "0.08em", textTransform: "uppercase",
    marginBottom: 16
  };

  const socialIconStyle = {
    color: `color-mix(in oklab, ${p.paper} 55%, transparent)`,
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    transition: "color 200ms ease"
  };

  return (
    <footer style={{
      padding: "72px var(--pad-x) 36px",
      background: p.primary,
      color: `color-mix(in oklab, ${p.paper} 70%, transparent)`
    }}>
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* Main grid */}
        <div className="ys-footer-grid" style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr 1fr 1fr",
          gap: 48,
          paddingBottom: 40
        }}>
          {/* Brand column */}
          <div>
            <div style={{
              fontFamily: `'${displayFont}', serif`,
              fontSize: "clamp(26px, 2.8vw, 36px)",
              color: p.paper, lineHeight: 1, letterSpacing: "-0.01em"
            }}>
              RentInAlvin.com
            </div>
            <div style={{
              width: 40, height: 2, background: p.accent,
              marginTop: 14, borderRadius: 1
            }} />
            <div style={{
              fontSize: 12, letterSpacing: "0.12em",
              textTransform: "uppercase", color: p.accent,
              fontWeight: 600, marginTop: 14
            }}>
              Managed by Yellowstone Asset Management
            </div>
            <p style={{
              fontSize: 15, lineHeight: 1.65, marginTop: 16,
              maxWidth: "38ch", color: `color-mix(in oklab, ${p.paper} 65%, transparent)`
            }}>
              Family-run property management serving Alvin, Texas. Local team, honest leases, homes that feel like home.
            </p>
            <div style={{ display: "flex", gap: 14, marginTop: 20 }}>
              <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" style={socialIconStyle}
                onMouseOver={(e) => e.currentTarget.style.color = p.paper}
                onMouseOut={(e) => e.currentTarget.style.color = `color-mix(in oklab, ${p.paper} 55%, transparent)`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" style={socialIconStyle}
                onMouseOver={(e) => e.currentTarget.style.color = p.paper}
                onMouseOut={(e) => e.currentTarget.style.color = `color-mix(in oklab, ${p.paper} 55%, transparent)`}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Properties */}
          <div>
            <div style={headingStyle}>Properties</div>
            {[
              { name: "Kings Haven", id: "kings-haven" },
              { name: "Kings Manor", id: "kings-manor" },
              { name: "French Quarter", id: "french-quarter" },
              { name: "White House", id: "white-house" },
              { name: "Kings Haven (100)", id: "kings-haven-100" }
            ].map((prop) => (
              <a key={prop.id} href={`property-detail.html?property=${prop.id}`} style={footerLink}
                onMouseOver={(e) => { e.currentTarget.style.color = p.accent; e.currentTarget.style.transform = "translateX(3px)"; }}
                onMouseOut={(e) => { e.currentTarget.style.color = "inherit"; e.currentTarget.style.transform = "translateX(0)"; }}>
                {prop.name}
              </a>
            ))}
          </div>

          {/* Office */}
          <div>
            <div style={headingStyle}>Office</div>
            <div style={{ fontSize: 14, lineHeight: 1.8, color: `color-mix(in oklab, ${p.paper} 60%, transparent)` }}>
              410 S 2nd Street<br />
              Alvin, TX 77511
            </div>
            <div style={{ fontSize: 13, marginTop: 10, color: `color-mix(in oklab, ${p.paper} 45%, transparent)` }}>
              Mon–Fri · 9am–5pm CT
            </div>
          </div>

          {/* Contact */}
          <div>
            <div style={headingStyle}>Contact</div>
            <a href="tel:8322103968" style={footerLink}
              onMouseOver={(e) => { e.currentTarget.style.color = p.accent; e.currentTarget.style.transform = "translateX(3px)"; }}
              onMouseOut={(e) => { e.currentTarget.style.color = "inherit"; e.currentTarget.style.transform = "translateX(0)"; }}>
              (832) 210-3968
            </a>
            <a href="mailto:office@yellowstone-am.com" style={footerLink}
              onMouseOver={(e) => { e.currentTarget.style.color = p.accent; e.currentTarget.style.transform = "translateX(3px)"; }}
              onMouseOut={(e) => { e.currentTarget.style.color = "inherit"; e.currentTarget.style.transform = "translateX(0)"; }}>
              office@yellowstone-am.com
            </a>
            <a href="book-tour.html"
              style={{
                ...footerLink, marginTop: 8,
                color: p.accent, fontWeight: 600
              }}
              onMouseOver={(e) => { e.currentTarget.style.color = p.paper; }}
              onMouseOut={(e) => { e.currentTarget.style.color = p.accent; }}>
              Book a tour →
            </a>
          </div>
        </div>

        {/* Gold divider */}
        <div style={{
          height: 1,
          background: `linear-gradient(to right, transparent, ${p.accent}, transparent)`,
          opacity: 0.4
        }} />

        {/* Bottom bar */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          paddingTop: 24, fontSize: 12,
          color: `color-mix(in oklab, ${p.paper} 45%, transparent)`,
          flexWrap: "wrap", gap: 12
        }}>
          <span>© {new Date().getFullYear()} RentInAlvin · Yellowstone Asset Management. Equal Housing Opportunity.</span>
          <div style={{ display: "flex", gap: 18, alignItems: "center" }}>
            <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, transition: "color 200ms ease" }}
              onMouseOver={(e) => e.currentTarget.style.color = p.accent}
              onMouseOut={(e) => e.currentTarget.style.color = "inherit"}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
              Instagram
            </a>
            <a href={SOCIAL_LINKS.facebook} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, transition: "color 200ms ease" }}
              onMouseOver={(e) => e.currentTarget.style.color = p.accent}
              onMouseOut={(e) => e.currentTarget.style.color = "inherit"}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
              Facebook
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ----------------------------- export ----------------------------- */

window.Shared = {
  TWEAK_DEFAULTS,
  SOCIAL_LINKS,
  PALETTES,
  PROPERTIES,
  FLOORPLANS,
  Placeholder,
  Nav,
  SectionHead,
  PropertyCard,
  Properties,
  Floorplans,
  About,
  Contact,
  InstagramFeed,
  Footer
};

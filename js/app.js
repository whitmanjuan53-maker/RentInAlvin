(function(){
'use strict';
const {
  useState,
  useEffect,
  useRef
} = React;

/* ============================================================
   RentInAlvin — Landing Page
   Managed by Yellowstone Asset Management
   Aesthetic: warm, minimal, professional. Lora + Source Sans 3.
   Cream / deep navy / warm bronze accents.
============================================================ */

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": "forest",
  "displayFont": "Lora",
  "showStats": false
} /*EDITMODE-END*/;
const SOCIAL_LINKS = {
  instagram: "https://instagram.com/rentinalvin",
  facebook: "https://facebook.com/rentinalvin"
};
const PALETTES = {
  forest: {
    bg: "#F5F0E8",
    paper: "#FAFAF8",
    ink: "#2D2D2D",
    inkSoft: "#5A5A5A",
    primary: "#1F3A2E",
    primarySoft: "#2A4A3A",
    accent: "#C9A96E",
    line: "rgba(31, 58, 46, 0.10)"
  },
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
  }
};

// Professional placeholder images using Unsplash source
const PLACEHOLDER_IMAGES = {
  hero: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1400&h=800&fit=crop&q=80",
  propertyExterior: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop&q=80",
  townhome: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&q=80",
  gardenApt: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80",
  courtyard: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80",
  oakCanopy: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&q=80",
  whiteClapboard: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop&q=80",
  interior: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&q=80",
  livingRoom: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop&q=80",
  kitchen: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&q=80",
  bedroom: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop&q=80",
  neighborhood: "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop&q=80"
};
const PROPERTIES = [{
  id: "kings-haven",
  name: "Kings Haven Apartments",
  addr: "410 S 2nd St",
  tag: "Flagship · Office on-site",
  units: "2BR · 1BA · 850 sq ft",
  price: "from $890",
  note: "Headquarters of Yellowstone Management. Walkable to downtown Alvin.",
  img: PLACEHOLDER_IMAGES.propertyExterior,
  heroImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=800&fit=crop&q=80",
  gallery: ["https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&q=80", "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&q=80", "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop&q=80", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80"],
  description: "Our flagship community and company headquarters. Kings Haven offers well-maintained two-bedroom apartments in the heart of downtown Alvin. The on-site office means help is never more than a few steps away.",
  amenities: ["On-site laundry", "Central A/C", "Off-street parking", "Pet friendly", "High-speed internet ready", "On-site management"],
  highlights: ["Office on-site", "Walkable to downtown", "Recently renovated units"]
}, {
  id: "kings-manor",
  name: "Kings Manor Townhomes",
  addr: "328 S 2nd St",
  tag: "Townhome",
  units: "2BR · 2.5BA  ·  3BR · 2.5BA · 1,250 sq ft",
  price: "from $1,250",
  note: "Two-story townhomes with private entries and 2.5 baths.",
  img: PLACEHOLDER_IMAGES.townhome,
  heroImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&h=800&fit=crop&q=80",
  gallery: ["https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&q=80", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&q=80", "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop&q=80", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80"],
  description: "Spacious two-story townhomes with private entries, 2.5 baths, and room to spread out. Kings Manor combines the privacy of a home with the convenience of a professionally managed community.",
  amenities: ["Private entry", "In-unit W/D hookups", "Central A/C", "Attached garage", "Fenced yard", "Pet friendly"],
  highlights: ["Two-story layouts", "Private entries", "2.5 baths"]
}, {
  id: "kings-haven-100",
  name: "Kings Haven Apartments",
  addr: "100 S 2nd St",
  tag: "Apartments",
  units: "2BR · 1BA · 850 sq ft",
  price: "from $850",
  note: "Quiet block near 100 S 2nd; renovated interiors.",
  img: PLACEHOLDER_IMAGES.gardenApt,
  heroImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=800&fit=crop&q=80",
  gallery: ["https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop&q=80", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&q=80", "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop&q=80", "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop&q=80"],
  description: "A quieter sister location to our flagship, Kings Haven at 100 S 2nd offers the same quality management with newly renovated interiors. A great choice for residents who want to be close to downtown without the bustle.",
  amenities: ["On-site laundry", "Central A/C", "Off-street parking", "Pet friendly", "High-speed internet ready", "Renovated interiors"],
  highlights: ["Quiet residential block", "Renovated interiors", "Close to schools"]
}, {
  id: "french-quarter",
  name: "French Quarter Residency",
  addr: "2550 S Bypass 35",
  tag: "Apartments",
  units: "2BR · 1BA · 850 sq ft",
  price: "from $950",
  note: "Larger community along the bypass with ample parking.",
  img: PLACEHOLDER_IMAGES.courtyard,
  heroImage: "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=1200&h=800&fit=crop&q=80",
  gallery: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80", "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&q=80", "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop&q=80", "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop&q=80"],
  description: "Our largest community, French Quarter sits along the bypass for easy commuting. Ample parking, well-maintained grounds, and a professional management team make this a popular choice for working professionals.",
  amenities: ["Ample parking", "Central A/C", "On-site laundry", "Pet friendly", "High-speed internet ready", "Easy bypass access"],
  highlights: ["Ample parking", "Easy bypass access", "Larger community"]
}, {
  id: "white-house",
  name: "The White House Apartments",
  addr: "1606 W Sealy St",
  tag: "Apartments",
  units: "2BR · 1BA · 850 sq ft",
  price: "from $900",
  note: "Classic white-clad apartments on a quiet residential street.",
  img: PLACEHOLDER_IMAGES.whiteClapboard,
  heroImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&h=800&fit=crop&q=80",
  gallery: ["https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=800&h=600&fit=crop&q=80", "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80", "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&h=600&fit=crop&q=80", "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&h=600&fit=crop&q=80", "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=800&h=600&fit=crop&q=80"],
  description: "Classic white-clad architecture gives this community its name and its charm. The White House Apartments sit on a quiet residential street near local parks, offering a peaceful setting with the same responsive management you expect from RentInAlvin.",
  amenities: ["On-site laundry", "Central A/C", "Off-street parking", "Pet friendly", "High-speed internet ready", "Near parks"],
  highlights: ["Classic architecture", "Quiet residential street", "Near parks"]
}];
const FLOORPLANS = [{
  type: "1 Bed · 1 Bath",
  sqft: "600 sq ft",
  price: "$850 – $999",
  available: 2
}, {
  type: "2 Bed · 1 Bath",
  sqft: "850 sq ft",
  price: "$900 – $975",
  available: 4
}, {
  type: "2 Bed · 2 Bath",
  sqft: "1,150 sq ft",
  price: "$1,250 – $1,395",
  available: 3
}, {
  type: "2 Bed · 2.5 Bath",
  sqft: "1,250 sq ft (townhome)",
  price: "$1,295 – $1,450",
  available: 2
}, {
  type: "3 Bed · 2.5 Bath",
  sqft: "1,250 sq ft (townhome)",
  price: "$1,495 – $1,650",
  available: 1
}];

/* ----------------------------- image component ----------------------------- */

function PropertyImage({
  src,
  alt,
  p
}) {
  const [loaded, setLoaded] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      background: p.bg
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    loading: "lazy",
    onLoad: () => setLoaded(true),
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: loaded ? 1 : 0,
      transition: "opacity 400ms ease",
      display: "block"
    }
  }), !loaded && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: `repeating-linear-gradient(135deg, ${p.paper} 0 14px, color-mix(in oklab, ${p.ink} 3%, ${p.paper}) 14px 28px)`,
      display: "flex",
      alignItems: "flex-end",
      padding: 14,
      color: p.ink,
      opacity: 0.7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Source Sans 3', ui-sans-serif, sans-serif",
      fontSize: 10,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      background: p.paper,
      padding: "5px 9px",
      border: `1px solid color-mix(in oklab, ${p.ink} 12%, transparent)`,
      borderRadius: 4,
      fontWeight: 500
    }
  }, alt)));
}

/* ----------------------------- nav ----------------------------- */

function Nav({
  p
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, {
      passive: true
    });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);
  const links = [["Available", "#availability"], ["Properties", "#properties"], ["Plans", "#floorplans"], ["Apply", "#apply"], ["FAQ", "#faq"], ["Contact", "#contact"]];
  return /*#__PURE__*/React.createElement("header", {
    className: "ys-nav",
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 50,
      padding: scrolled ? "12px var(--pad-x)" : "18px var(--pad-x)",
      transition: "all 300ms var(--transition-slow)",
      background: scrolled ? `color-mix(in oklab, ${p.paper} 96%, transparent)` : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${p.line}` : "1px solid transparent",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: scrolled ? "0 2px 16px rgba(27, 42, 74, 0.06)" : "none"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#top",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      textDecoration: "none",
      color: p.ink
    }
  }, /*#__PURE__*/React.createElement(RiALogo, {
    p: p
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      lineHeight: 1.15
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Lora', serif",
      fontSize: 22,
      letterSpacing: "-0.01em",
      fontWeight: 400
    }
  }, "RentInAlvin"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 9,
      letterSpacing: "0.16em",
      textTransform: "uppercase",
      color: p.inkSoft,
      fontWeight: 500,
      marginTop: 2
    }
  }, "Yellowstone Asset Management"))), /*#__PURE__*/React.createElement("nav", {
    className: "ys-nav-links",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 32
    }
  }, links.map(([label, href]) => /*#__PURE__*/React.createElement("a", {
    key: href,
    href: href,
    style: {
      color: p.ink,
      textDecoration: "none",
      fontSize: 14,
      fontWeight: 500,
      letterSpacing: "0.01em",
      position: "relative",
      padding: "4px 0",
      transition: "color 200ms ease"
    },
    onMouseOver: e => e.currentTarget.style.color = p.accent,
    onMouseOut: e => e.currentTarget.style.color = p.ink
  }, label)), /*#__PURE__*/React.createElement("a", {
    href: "#apply",
    style: {
      color: p.paper,
      textDecoration: "none",
      fontSize: 14,
      fontWeight: 600,
      padding: "9px 20px",
      background: p.primary,
      borderRadius: 8,
      transition: "all 200ms ease",
      boxShadow: "0 2px 8px rgba(27, 42, 74, 0.12)"
    },
    onMouseOver: e => {
      e.currentTarget.style.background = p.primarySoft;
      e.currentTarget.style.transform = "translateY(-1px)";
      e.currentTarget.style.boxShadow = "0 4px 14px rgba(27, 42, 74, 0.18)";
    },
    onMouseOut: e => {
      e.currentTarget.style.background = p.primary;
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 2px 8px rgba(27, 42, 74, 0.12)";
    }
  }, "Apply Now")), /*#__PURE__*/React.createElement("button", {
    className: "ys-nav-burger",
    onClick: () => setMenuOpen(o => !o),
    "aria-label": "Menu",
    style: {
      display: "none",
      background: "transparent",
      border: `1px solid ${p.line}`,
      borderRadius: 8,
      width: 42,
      height: 42,
      padding: 0,
      cursor: "pointer",
      alignItems: "center",
      justifyContent: "center",
      transition: "border-color 200ms ease"
    },
    onMouseOver: e => e.currentTarget.style.borderColor = p.accent,
    onMouseOut: e => e.currentTarget.style.borderColor = p.line
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none"
  }, menuOpen ? /*#__PURE__*/React.createElement("path", {
    d: "M4 4l10 10M14 4L4 14",
    stroke: p.ink,
    strokeWidth: "1.6",
    strokeLinecap: "round"
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("path", {
    d: "M2 5h14M2 9h14M2 13h14",
    stroke: p.ink,
    strokeWidth: "1.6",
    strokeLinecap: "round"
  })))), menuOpen && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    onClick: () => setMenuOpen(false),
    style: {
      position: "fixed",
      inset: 0,
      top: 72,
      zIndex: 49,
      background: "rgba(27, 42, 74, 0.25)",
      backdropFilter: "blur(2px)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "ys-nav-mobile",
    style: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      zIndex: 50,
      background: p.paper,
      borderBottom: `1px solid ${p.line}`,
      padding: "20px var(--pad-x) 28px",
      display: "flex",
      flexDirection: "column",
      gap: 0,
      boxShadow: "0 20px 40px rgba(27, 42, 74, 0.12)",
      maxHeight: "80vh",
      overflowY: "auto",
      WebkitOverflowScrolling: "touch"
    }
  }, links.map(([label, href], i) => /*#__PURE__*/React.createElement("a", {
    key: href,
    href: href,
    onClick: () => setMenuOpen(false),
    style: {
      color: p.ink,
      textDecoration: "none",
      fontFamily: "'Lora', serif",
      fontSize: 22,
      padding: "14px 0",
      borderBottom: i < links.length - 1 ? `1px solid ${p.line}` : "none",
      transition: "color 200ms ease"
    },
    onMouseOver: e => e.currentTarget.style.color = p.accent,
    onMouseOut: e => e.currentTarget.style.color = p.ink
  }, label)), /*#__PURE__*/React.createElement("a", {
    href: "#apply",
    onClick: () => setMenuOpen(false),
    style: {
      marginTop: 16,
      padding: "14px 20px",
      background: p.primary,
      color: p.paper,
      textDecoration: "none",
      fontSize: 15,
      fontWeight: 600,
      textAlign: "center",
      borderRadius: 8,
      boxShadow: "0 2px 8px rgba(27, 42, 74, 0.12)",
      minHeight: 44,
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }
  }, "Apply Now"))));
}
function YLogo({
  p
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 42,
      height: 42,
      borderRadius: 10,
      background: p.primary,
      color: p.paper,
      display: "grid",
      placeItems: "center",
      fontFamily: "'Lora', serif",
      fontSize: 22,
      fontStyle: "italic",
      lineHeight: 1,
      boxShadow: "0 2px 8px rgba(31, 58, 46, 0.18)",
      flexShrink: 0
    }
  }, "Y");
}

/* ----------------------------- hero ----------------------------- */

function Hero({
  p,
  displayFont,
  showStats
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    id: "top",
    className: "ys-hero",
    style: {
      position: "relative",
      padding: "100px var(--pad-x) 24px",
      minHeight: "calc(100vh - 260px)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("style", null, "@keyframes kenBurnsHome { 0%{transform:scale(1)} 100%{transform:scale(1.1)} }"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 0,
      backgroundImage: "url(images/hero-aerial.jpg)",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      animation: "kenBurnsHome 25s ease-in-out infinite alternate"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 1,
      background: "linear-gradient(120deg, rgba(250,250,248,0.88) 0%, rgba(250,250,248,0.70) 45%, rgba(250,250,248,0.45) 75%, rgba(250,250,248,0.30) 100%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 2,
      maxWidth: 1280,
      margin: "0 auto",
      width: "100%"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 14,
      fontSize: 12,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: p.inkSoft,
      marginBottom: 32,
      fontWeight: 500
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 32,
      height: 2,
      background: p.accent,
      borderRadius: 1
    }
  }), "Managed by Yellowstone Asset Management"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: `'${displayFont}', serif`,
      fontSize: "clamp(52px, 7vw, 108px)",
      lineHeight: 1.0,
      letterSpacing: "-0.03em",
      margin: 0,
      color: p.ink,
      fontWeight: 400,
      maxWidth: "14ch"
    }
  }, "A home in ", /*#__PURE__*/React.createElement("em", {
    style: {
      color: p.primary
    }
  }, "Alvin,"), /*#__PURE__*/React.createElement("br", null), "made simple."), /*#__PURE__*/React.createElement("div", {
    className: "ys-hero-row",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr auto",
      gap: 60,
      marginTop: 48,
      alignItems: "end"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      lineHeight: 1.65,
      color: p.inkSoft,
      maxWidth: "48ch",
      margin: 0
    }
  }, "RentInAlvin cares for over ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: p.ink
    }
  }, "160 units across five properties"), " in Alvin. Apartments and townhomes from $800 to $1,650, leased and maintained by a local team."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      window.__openBooking && window.__openBooking();
    },
    style: {
      padding: "15px 28px",
      background: p.primary,
      color: p.paper,
      textDecoration: "none",
      fontSize: 15,
      fontWeight: 600,
      borderRadius: 10,
      letterSpacing: "0.01em",
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      transition: "all 200ms ease",
      cursor: "pointer",
      boxShadow: "0 4px 16px rgba(27, 42, 74, 0.18)"
    },
    onMouseOver: e => {
      e.currentTarget.style.background = p.primarySoft;
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 8px 24px rgba(27, 42, 74, 0.24)";
    },
    onMouseOut: e => {
      e.currentTarget.style.background = p.primary;
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 4px 16px rgba(27, 42, 74, 0.18)";
    }
  }, "Book a tour", /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("a", {
    href: "#properties",
    style: {
      padding: "15px 28px",
      background: p.paper,
      color: p.ink,
      textDecoration: "none",
      fontSize: 15,
      fontWeight: 600,
      borderRadius: 10,
      border: `1px solid ${p.line}`,
      transition: "all 200ms ease",
      boxShadow: "0 2px 8px rgba(27, 42, 74, 0.06)"
    },
    onMouseOver: e => {
      e.currentTarget.style.background = p.ink;
      e.currentTarget.style.color = p.paper;
      e.currentTarget.style.borderColor = p.ink;
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 6px 18px rgba(27, 42, 74, 0.14)";
    },
    onMouseOut: e => {
      e.currentTarget.style.background = p.paper;
      e.currentTarget.style.color = p.ink;
      e.currentTarget.style.borderColor = p.line;
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 2px 8px rgba(27, 42, 74, 0.06)";
    }
  }, "See properties"))))), showStats && /*#__PURE__*/React.createElement("section", {
    style: {
      background: p.paper,
      padding: "24px var(--pad-x)",
      borderTop: `1px solid ${p.line}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto",
      width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)"
    },
    className: "ys-hero-stats"
  }, [["150+", "units managed"], ["5", "properties in Alvin"], ["$899", "starting rent"], ["Local", "family-run team"]].map(([n, label], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      borderLeft: i === 0 ? "none" : `1px solid ${p.line}`,
      paddingLeft: i === 0 ? 0 : 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: `'${displayFont}', serif`,
      fontSize: "clamp(36px, 4vw, 56px)",
      lineHeight: 1,
      color: p.primary,
      letterSpacing: "-0.02em"
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: p.inkSoft,
      marginTop: 10,
      fontWeight: 600
    }
  }, label))))));
}

/* ----------------------------- section header ----------------------------- */

function SectionHead({
  p,
  eyebrow,
  title,
  lead,
  displayFont
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "ys-section-head",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 2fr",
      gap: 48,
      alignItems: "start",
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: p.accent,
      fontWeight: 600,
      paddingTop: 10
    }
  }, eyebrow), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: `'${displayFont}', serif`,
      fontSize: "clamp(32px, 4vw, 52px)",
      lineHeight: 1.05,
      letterSpacing: "-0.02em",
      margin: 0,
      color: p.ink,
      fontWeight: 400,
      maxWidth: "18ch"
    }
  }, title), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 3,
      background: p.accent,
      marginTop: 16,
      borderRadius: 2
    }
  }), lead && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.6,
      color: p.inkSoft,
      maxWidth: "52ch",
      marginTop: 20
    }
  }, lead)));
}

/* ----------------------------- properties ----------------------------- */

function PropertyCard({
  prop,
  p,
  idx
}) {
  const [hover, setHover] = useState(false);
  return /*#__PURE__*/React.createElement("article", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: p.paper,
      border: `1px solid ${p.line}`,
      borderRadius: 14,
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      transition: "all 300ms ease",
      transform: hover ? "translateY(-4px)" : "translateY(0)",
      boxShadow: hover ? "0 16px 40px -10px rgba(27, 42, 74, 0.14)" : "0 1px 4px rgba(27, 42, 74, 0.06)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "4/3",
      overflow: "hidden",
      background: p.bg
    }
  }, /*#__PURE__*/React.createElement(PropertyImage, {
    src: prop.img,
    alt: prop.name,
    p: p
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 16,
      left: 16,
      background: p.paper,
      padding: "6px 12px",
      fontSize: 10,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: p.primary,
      fontWeight: 700,
      border: `1px solid ${p.line}`,
      borderRadius: 8,
      boxShadow: "0 2px 8px rgba(27, 42, 74, 0.08)"
    }
  }, prop.tag), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 3,
      background: p.accent
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "22px 24px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 10,
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: "'Lora', serif",
      fontSize: 22,
      lineHeight: 1.15,
      letterSpacing: "-0.01em",
      margin: 0,
      color: p.ink,
      fontWeight: 400
    }
  }, prop.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: p.inkSoft,
      marginTop: 4,
      display: "flex",
      alignItems: "center",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: p.inkSoft,
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "10",
    r: "3"
  })), prop.addr, " \xB7 Alvin, TX")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 14,
      color: p.inkSoft,
      lineHeight: 1.55,
      margin: 0,
      flex: 1
    }
  }, prop.note), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      flexWrap: "wrap",
      paddingTop: 14,
      borderTop: `1px solid ${p.line}`,
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
      color: p.inkSoft,
      fontWeight: 500
    }
  }, prop.units), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Lora', serif",
      fontSize: 20,
      color: p.primary,
      marginTop: 2
    }
  }, prop.price)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      flexShrink: 0
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: `property-detail.html?property=${prop.id}`,
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: p.primary,
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      transition: "color 200ms ease"
    },
    onMouseOver: e => e.currentTarget.style.color = p.accent,
    onMouseOut: e => e.currentTarget.style.color = p.primary
  }, "View details"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: p.line,
      fontSize: 13
    }
  }, "|"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      window.__openBooking && window.__openBooking(prop.id || "");
    },
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: p.ink,
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      transition: "color 200ms ease"
    },
    onMouseOver: e => e.currentTarget.style.color = p.accent,
    onMouseOut: e => e.currentTarget.style.color = p.ink
  }, "Schedule Tour", /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2.5 6h7m0 0L6.5 3m3 3-3 3",
    stroke: "currentColor",
    strokeWidth: "1.4",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      color: p.line,
      fontSize: 13
    }
  }, "|"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      window.__openInquiry && window.__openInquiry(prop.name);
    },
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: p.primary,
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      transition: "color 200ms ease"
    },
    onMouseOver: e => e.currentTarget.style.color = p.accent,
    onMouseOut: e => e.currentTarget.style.color = p.primary
  }, "Inquire")))));
}
function Properties({
  p,
  displayFont
}) {
  return /*#__PURE__*/React.createElement("section", {
    id: "properties",
    style: {
      padding: "var(--pad-x-lg) var(--pad-x)",
      borderTop: `1px solid ${p.line}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    p: p,
    displayFont: displayFont,
    eyebrow: "Five properties \xB7 One zip code",
    title: "Every address we manage, all within Alvin.",
    lead: "From Kings Haven on South 2nd to the White House on Sealy, five communities, one local team."
  }), /*#__PURE__*/React.createElement("div", {
    className: "ys-prop-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20
    }
  }, PROPERTIES.map((prop, i) => /*#__PURE__*/React.createElement(PropertyCard, {
    key: i,
    prop: prop,
    p: p,
    idx: i
  })))));
}

/* ----------------------------- floorplans / pricing ----------------------------- */

function Floorplans({
  p,
  displayFont
}) {
  const [active, setActive] = useState(0);
  return /*#__PURE__*/React.createElement("section", {
    id: "floorplans",
    style: {
      padding: "var(--pad-x-lg) var(--pad-x)",
      background: p.primary,
      color: p.paper
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ys-section-head",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 2fr",
      gap: 48,
      alignItems: "start",
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: p.accent,
      fontWeight: 600,
      paddingTop: 10
    }
  }, "Floor plans \xB7 $800 to $1,650"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: `'${displayFont}', serif`,
      fontSize: "clamp(32px, 4vw, 52px)",
      lineHeight: 1.05,
      letterSpacing: "-0.02em",
      margin: 0,
      fontWeight: 400,
      maxWidth: "18ch",
      color: p.paper
    }
  }, "Five layouts, honestly priced."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.6,
      color: `color-mix(in oklab, ${p.paper} 72%, transparent)`,
      maxWidth: "52ch",
      marginTop: 20
    }
  }, "Rents are listed up-front with no surprise fees. Call to confirm current availability."))), /*#__PURE__*/React.createElement("div", {
    className: "ys-floor-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 48,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: `1px solid color-mix(in oklab, ${p.paper} 18%, transparent)`
    }
  }, FLOORPLANS.map((f, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setActive(i),
    onMouseEnter: () => setActive(i),
    style: {
      width: "100%",
      textAlign: "left",
      padding: "22px 0",
      borderBottom: `1px solid color-mix(in oklab, ${p.paper} 18%, transparent)`,
      background: "transparent",
      border: "none",
      borderTop: "none",
      cursor: "pointer",
      display: "grid",
      gridTemplateColumns: "auto 1fr auto",
      gap: 20,
      alignItems: "center",
      color: p.paper,
      opacity: active === i ? 1 : 0.5,
      transition: "opacity 180ms ease",
      fontFamily: "inherit"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "'Source Sans 3', sans-serif",
      fontSize: 12,
      color: p.accent,
      fontWeight: 600
    }
  }, "0", i + 1), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: `'${displayFont}', serif`,
      fontSize: "clamp(22px, 2.4vw, 28px)",
      fontWeight: 400,
      letterSpacing: "-0.01em"
    }
  }, f.type), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500
    }
  }, f.price)))), /*#__PURE__*/React.createElement("div", {
    className: "ys-floor-detail",
    style: {
      background: `color-mix(in oklab, ${p.paper} 8%, transparent)`,
      border: `1px solid color-mix(in oklab, ${p.paper} 16%, transparent)`,
      borderRadius: 8,
      padding: 36,
      position: "sticky",
      top: 100
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: p.accent,
      fontWeight: 600
    }
  }, "Layout 0", active + 1), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: `'${displayFont}', serif`,
      fontSize: "clamp(36px, 4vw, 48px)",
      fontWeight: 400,
      letterSpacing: "-0.02em",
      lineHeight: 1,
      margin: "14px 0 0"
    }
  }, FLOORPLANS[active].type), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      opacity: 0.55,
      marginBottom: 6,
      fontWeight: 500
    }
  }, "Square feet"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17
    }
  }, FLOORPLANS[active].sqft)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      opacity: 0.55,
      marginBottom: 6,
      fontWeight: 500
    }
  }, "Monthly rent"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17
    }
  }, FLOORPLANS[active].price)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      opacity: 0.55,
      marginBottom: 6,
      fontWeight: 500
    }
  }, "Available now"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17
    }
  }, FLOORPLANS[active].available, " units")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      opacity: 0.55,
      marginBottom: 6,
      fontWeight: 500
    }
  }, "Deposit"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 17
    }
  }, "One month's rent"))), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      window.__openBooking && window.__openBooking();
    },
    style: {
      marginTop: 28,
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      padding: "14px 26px",
      background: p.accent,
      color: "#fff",
      textDecoration: "none",
      fontWeight: 700,
      fontSize: 14,
      cursor: "pointer",
      borderRadius: 10,
      boxShadow: "0 4px 16px rgba(184, 134, 11, 0.25)",
      transition: "all 200ms ease"
    },
    onMouseOver: e => {
      e.currentTarget.style.transform = "translateY(-2px)";
      e.currentTarget.style.boxShadow = "0 6px 24px rgba(184, 134, 11, 0.35)";
    },
    onMouseOut: e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.boxShadow = "0 4px 16px rgba(184, 134, 11, 0.25)";
    }
  }, "Schedule a viewing", /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  })))))));
}

/* ----------------------------- about ----------------------------- */

function About({
  p,
  displayFont
}) {
  const items = [{
    n: "01",
    title: "Local & responsive",
    body: "Our office is at 410 S 2nd St. When you call, you reach the team that manages your home, not a call center."
  }, {
    n: "02",
    title: "Honest leasing",
    body: "Rents are published on this page. No application bait-and-switch, no surprise admin fees."
  }, {
    n: "03",
    title: "Maintenance, handled",
    body: "Submit a request and a technician we know personally is dispatched. Most issues are closed within 48 hours."
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "about",
    style: {
      padding: "var(--pad-x-lg) var(--pad-x)",
      borderTop: `1px solid ${p.line}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    p: p,
    displayFont: displayFont,
    eyebrow: "Why RentInAlvin",
    title: "Built around the way Alvin actually lives.",
    lead: "Every property we manage is within ten minutes of our office. That proximity is the whole point."
  }), /*#__PURE__*/React.createElement("div", {
    className: "ys-about-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 24,
      marginTop: 16
    }
  }, items.map(it => /*#__PURE__*/React.createElement("div", {
    key: it.n,
    style: {
      padding: 28,
      borderTop: `2px solid ${p.accent}`,
      background: p.paper,
      borderRadius: 12,
      border: `1px solid ${p.line}`,
      borderTopWidth: 2,
      transition: "transform 200ms ease, box-shadow 200ms ease"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "'Source Sans 3', sans-serif",
      fontSize: 11,
      color: p.accent,
      fontWeight: 700,
      letterSpacing: "0.08em",
      marginBottom: 14
    }
  }, it.n), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: `'${displayFont}', serif`,
      fontSize: "clamp(22px, 2.4vw, 26px)",
      fontWeight: 400,
      letterSpacing: "-0.01em",
      margin: 0,
      lineHeight: 1.1,
      color: p.ink
    }
  }, it.title), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.6,
      color: p.inkSoft,
      marginTop: 14
    }
  }, it.body))))));
}

/* ----------------------------- contact ----------------------------- */

const CALENDAR_URL = "https://calendar.google.com/calendar/u/0/appointments/schedules/yellowstone-am";
function Contact({
  p,
  displayFont
}) {
  const [hovered, setHovered] = useState(null);
  const channels = [{
    key: "book",
    eyebrow: "Preferred",
    label: "Book a viewing",
    detail: "30 minutes · in-person or virtual",
    action: "Schedule a tour",
    href: "#",
    onClick: e => {
      e.preventDefault();
      window.__openBooking && window.__openBooking();
    }
  }, {
    key: "call",
    eyebrow: "Mon–Fri · 9–5 CT",
    label: "(832) 210-3968",
    detail: "Direct line to the leasing office.",
    action: "Call now",
    href: "tel:8322103968"
  }, {
    key: "email",
    eyebrow: "We reply within a day",
    label: "office@yellowstone-am.com",
    detail: "Best for documents and lease questions.",
    action: "Compose email",
    href: "mailto:office@yellowstone-am.com"
  }];
  return /*#__PURE__*/React.createElement("section", {
    id: "contact",
    style: {
      padding: "var(--pad-x-lg) var(--pad-x)",
      background: p.paper,
      borderTop: `1px solid ${p.line}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ys-contact-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "1.1fr 1fr",
      gap: 64
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: p.accent,
      fontWeight: 600,
      marginBottom: 24
    }
  }, "Visit \xB7 Call \xB7 Schedule"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: `'${displayFont}', serif`,
      fontSize: "clamp(36px, 5vw, 72px)",
      lineHeight: 1,
      letterSpacing: "-0.02em",
      margin: 0,
      fontWeight: 400,
      color: p.ink
    }
  }, "Stop by the office, or pick a time online."), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40,
      padding: 28,
      border: `1px solid ${p.line}`,
      borderRadius: 8,
      background: p.bg
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: p.inkSoft,
      fontWeight: 500
    }
  }, "Leasing office"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: `'${displayFont}', serif`,
      fontSize: "clamp(28px, 3vw, 36px)",
      lineHeight: 1.1,
      color: p.ink,
      marginTop: 10,
      fontWeight: 400
    }
  }, "410 S 2nd Street", /*#__PURE__*/React.createElement("br", null), "Alvin, TX 77511"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      display: "flex",
      gap: 24,
      fontSize: 13,
      color: p.inkSoft
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: p.ink
    }
  }, "Mon \u2013 Fri"), "9:00am \u2013 5:00pm"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: p.ink
    }
  }, "Saturday"), "By appointment"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 600,
      color: p.ink
    }
  }, "Sunday"), "Closed")), /*#__PURE__*/React.createElement("a", {
    href: "https://maps.google.com/?q=410+S+2nd+St+Alvin+TX+77511",
    target: "_blank",
    rel: "noopener",
    style: {
      marginTop: 20,
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontSize: 13,
      fontWeight: 600,
      color: p.primary,
      textDecoration: "none"
    }
  }, "Get directions", /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2.5 6h7m0 0L6.5 3m3 3-3 3",
    stroke: "currentColor",
    strokeWidth: "1.4",
    strokeLinecap: "round"
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 0
    }
  }, channels.map((c, i) => /*#__PURE__*/React.createElement("a", {
    key: c.key,
    href: c.href,
    onClick: c.onClick,
    target: c.external ? "_blank" : undefined,
    rel: c.external ? "noopener" : undefined,
    onMouseEnter: () => setHovered(c.key),
    onMouseLeave: () => setHovered(null),
    style: {
      display: "block",
      padding: "28px 0",
      borderTop: i === 0 ? `1px solid ${p.line}` : "none",
      borderBottom: `1px solid ${p.line}`,
      textDecoration: "none",
      color: p.ink,
      transition: "padding 220ms ease",
      paddingLeft: hovered === c.key ? 12 : 0,
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: 0,
      top: "50%",
      transform: "translateY(-50%)",
      width: hovered === c.key ? 6 : 0,
      height: hovered === c.key ? 6 : 0,
      borderRadius: "50%",
      background: p.accent,
      transition: "all 220ms ease"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "baseline",
      flexWrap: "wrap",
      fontSize: 11,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: p.inkSoft,
      fontWeight: 500,
      marginBottom: 10
    }
  }, /*#__PURE__*/React.createElement("span", null, c.eyebrow), /*#__PURE__*/React.createElement("span", {
    style: {
      color: p.accent
    }
  }, c.action, " \u2192")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: `'${displayFont}', serif`,
      fontSize: c.key === "email" ? "clamp(20px, 2.2vw, 26px)" : "clamp(28px, 3vw, 32px)",
      lineHeight: 1.15,
      fontWeight: 400,
      letterSpacing: "-0.01em",
      wordBreak: "break-word",
      overflowWrap: "anywhere"
    }
  }, c.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      color: p.inkSoft,
      marginTop: 10
    }
  }, c.detail)))))));
}

/* ----------------------------- contact form ----------------------------- */

function ContactForm({
  p,
  displayFont
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: ""
  });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const update = (k, v) => setForm(f => ({
    ...f,
    [k]: v
  }));
  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name || !form.phone && !form.email) {
      setStatus("error");
      setErrorMsg("Please provide your name and at least one way to reach you.");
      return;
    }
    setStatus("sending");
    const payload = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      message: form.message,
      page: window.location.href,
      website: ""
    };
    let result;
    const api = window.RentInAlvinAPI;
    if (api && api.submitContact) {
      result = await api.submitContact(payload);
    } else {
      try {
        const res = await fetch("/api/submit/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
        const body = await res.json().catch(() => ({}));
        result = {
          success: res.ok && body.success,
          error: body.error,
          data: body
        };
      } catch (err) {
        result = {
          success: false,
          error: "Network error. Please try again or call us."
        };
      }
    }
    if (result.success) {
      setStatus("success");
      setForm({
        name: "",
        phone: "",
        email: "",
        message: ""
      });
    } else {
      setStatus("error");
      setErrorMsg(result.error || "Something went wrong. Please call us directly.");
    }
  };
  const inputStyle = {
    padding: "13px 16px",
    fontSize: 16,
    background: p.bg,
    border: `1px solid ${p.line}`,
    borderRadius: 10,
    color: p.ink,
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 200ms ease, box-shadow 200ms ease",
    width: "100%"
  };
  return /*#__PURE__*/React.createElement("section", {
    id: "contact-form",
    style: {
      padding: "var(--pad-x-lg) var(--pad-x)",
      background: p.bg,
      borderTop: `1px solid ${p.line}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 720,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: p.accent,
      fontWeight: 600,
      marginBottom: 14
    }
  }, "Send a message"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: `'${displayFont}', serif`,
      fontSize: "clamp(32px, 4vw, 48px)",
      lineHeight: 1.05,
      letterSpacing: "-0.02em",
      margin: 0,
      color: p.ink,
      fontWeight: 400
    }
  }, "Get in touch."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.6,
      color: p.inkSoft,
      marginTop: 14
    }
  }, "Have a question? We'll respond within one business day.")), status === "success" ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "40px 24px",
      background: p.paper,
      border: `1px solid ${p.line}`,
      borderRadius: 14,
      boxShadow: "0 4px 24px rgba(27, 42, 74, 0.06)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: "50%",
      background: p.primary,
      color: p.paper,
      display: "grid",
      placeItems: "center",
      fontSize: 28,
      margin: "0 auto 20px"
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: `'${displayFont}', serif`,
      fontSize: 26,
      fontWeight: 400,
      margin: "0 0 12px",
      color: p.ink
    }
  }, "Message sent!"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: p.inkSoft,
      maxWidth: "40ch",
      margin: "0 auto",
      lineHeight: 1.55
    }
  }, "Thanks for reaching out. Our team will get back to you within one business day."), /*#__PURE__*/React.createElement("button", {
    onClick: () => setStatus("idle"),
    style: {
      marginTop: 20,
      padding: "12px 24px",
      background: p.ink,
      color: p.paper,
      border: "none",
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "inherit",
      borderRadius: 10,
      transition: "transform 200ms ease"
    },
    onMouseOver: e => e.currentTarget.style.transform = "translateY(-1px)",
    onMouseOut: e => e.currentTarget.style.transform = "translateY(0)"
  }, "Send another")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    style: {
      background: p.paper,
      border: `1px solid ${p.line}`,
      borderRadius: 14,
      padding: "32px 36px",
      boxShadow: "0 4px 24px rgba(27, 42, 74, 0.06)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 16
    },
    className: "ys-form-grid"
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: p.inkSoft,
      fontWeight: 600
    }
  }, "Your name *"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    style: inputStyle,
    value: form.name,
    onChange: e => update("name", e.target.value),
    placeholder: "Maria Garcia"
  })), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: p.inkSoft,
      fontWeight: 600
    }
  }, "Phone"), /*#__PURE__*/React.createElement("input", {
    type: "tel",
    style: inputStyle,
    value: form.phone,
    onChange: e => update("phone", e.target.value),
    placeholder: "(832) 210-3968"
  })), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 5,
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: p.inkSoft,
      fontWeight: 600
    }
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    style: inputStyle,
    value: form.email,
    onChange: e => update("email", e.target.value),
    placeholder: "you@email.com"
  })), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 5,
      gridColumn: "1 / -1"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: p.inkSoft,
      fontWeight: 600
    }
  }, "Message *"), /*#__PURE__*/React.createElement("textarea", {
    required: true,
    rows: 4,
    style: {
      ...inputStyle,
      resize: "vertical"
    },
    value: form.message,
    onChange: e => update("message", e.target.value),
    placeholder: "How can we help you?"
  }))), status === "error" && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      padding: 12,
      background: "#FEF2F2",
      border: "1px solid #FECACA",
      borderRadius: 6,
      color: "#991B1B",
      fontSize: 14
    }
  }, errorMsg), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: status === "sending",
    style: {
      marginTop: 20,
      width: "100%",
      padding: "15px 24px",
      background: status === "sending" ? p.line : p.primary,
      color: p.paper,
      border: "none",
      fontSize: 15,
      fontWeight: 700,
      cursor: status === "sending" ? "wait" : "pointer",
      fontFamily: "inherit",
      letterSpacing: "0.01em",
      borderRadius: 10,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 10,
      transition: "transform 200ms ease, background 200ms ease, box-shadow 200ms ease"
    },
    onMouseOver: e => {
      if (status !== "sending") {
        e.currentTarget.style.background = p.primarySoft;
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(44, 62, 80, 0.25)";
      }
    },
    onMouseOut: e => {
      if (status !== "sending") {
        e.currentTarget.style.background = p.primary;
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
      }
    }
  }, status === "sending" ? "Sending..." : "Send message", status !== "sending" && /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 12,
      color: p.inkSoft,
      marginTop: 12,
      lineHeight: 1.5,
      textAlign: "center"
    }
  }, "Or call us directly at ", /*#__PURE__*/React.createElement("a", {
    href: "tel:8322103968",
    style: {
      color: p.primary,
      fontWeight: 600,
      textDecoration: "none"
    }
  }, "(832) 210-3968")))));
}

/* ----------------------------- property inquiry modal ----------------------------- */

function PropertyInquiry({
  open,
  onClose,
  p,
  displayFont,
  initialProperty
}) {
  const [property, setProperty] = useState(initialProperty || "");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMsg, setErrorMsg] = useState("");
  const PROPERTIES_LIST = ["Kings Haven Apartments, 410 S 2nd St", "Kings Manor Townhomes, 328 S 2nd St", "Kings Haven Apartments, 100 S 2nd St", "French Quarter Residency, 2550 S Bypass 35", "The White House Apartments, 1606 W Sealy St", "Not sure yet"];
  useEffect(() => {
    if (open) {
      setStatus("idle");
      setErrorMsg("");
      if (initialProperty) setProperty(initialProperty);
    }
  }, [open, initialProperty]);
  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);
  useEffect(() => {
    if (!open) return;
    const onKey = e => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);
  if (!open) return null;
  const canSubmit = !!name && (!!phone || !!email) && !!property;
  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus("sending");
    const payload = {
      property,
      name,
      phone,
      email,
      message,
      page: window.location.href,
      website: ""
    };
    let result;
    const api = window.RentInAlvinAPI;
    if (api && api.submitInquiry) {
      result = await api.submitInquiry(payload);
    } else {
      try {
        const res = await fetch("/api/submit/inquiry", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        });
        const body = await res.json().catch(() => ({}));
        result = {
          success: res.ok && body.success,
          error: body.error,
          data: body
        };
      } catch (err) {
        result = {
          success: false,
          error: "Network error. Please try again or call us."
        };
      }
    }
    if (result.success) {
      setStatus("success");
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } else {
      setStatus("error");
      setErrorMsg(result.error || "Something went wrong. Please try again or call us.");
    }
  }
  const inputStyle = {
    padding: "13px 16px",
    fontSize: 16,
    background: p.bg,
    border: `1px solid ${p.line}`,
    borderRadius: 10,
    color: p.ink,
    fontFamily: "inherit",
    outline: "none",
    transition: "border-color 200ms ease, box-shadow 200ms ease",
    width: "100%"
  };
  return /*#__PURE__*/React.createElement("div", {
    onClick: e => {
      if (e.target === e.currentTarget) onClose();
    },
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 10000,
      background: "rgba(27, 42, 74, 0.55)",
      backdropFilter: "blur(4px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
      animation: "ys-fade-in 200ms ease"
    }
  }, /*#__PURE__*/React.createElement("style", null, `
        @keyframes ys-fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes ys-slide-up { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
      `), /*#__PURE__*/React.createElement("div", {
    style: {
      background: p.paper,
      width: "100%",
      maxWidth: 560,
      maxHeight: "92vh",
      display: "flex",
      flexDirection: "column",
      animation: "ys-slide-up 260ms cubic-bezier(0.2, 0.8, 0.2, 1)",
      boxShadow: "0 24px 64px rgba(27, 42, 74, 0.25)",
      overflow: "hidden",
      borderRadius: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 24px",
      borderBottom: `1px solid ${p.line}`,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      background: p.paper
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: "0.14em",
      textTransform: "uppercase",
      color: p.accent,
      fontWeight: 600
    }
  }, status === "success" ? "Sent" : "Property inquiry"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: `'${displayFont}', serif`,
      fontSize: 24,
      color: p.ink,
      marginTop: 4,
      fontWeight: 400
    }
  }, status === "success" ? "Inquiry sent" : "Ask about a property")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      background: "transparent",
      border: "none",
      cursor: "pointer",
      color: p.ink,
      padding: 8,
      fontSize: 18,
      lineHeight: 1,
      borderRadius: 10,
      transition: "background 200ms ease"
    },
    onMouseOver: e => e.currentTarget.style.background = p.bg,
    onMouseOut: e => e.currentTarget.style.background = "transparent"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: "auto",
      padding: 24,
      background: p.paper
    }
  }, status === "success" ? /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      padding: "16px 0 32px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 56,
      height: 56,
      borderRadius: "50%",
      background: p.primary,
      color: p.paper,
      display: "grid",
      placeItems: "center",
      fontSize: 28,
      margin: "0 auto 20px"
    }
  }, "\u2713"), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: `'${displayFont}', serif`,
      fontSize: 26,
      fontWeight: 400,
      margin: "0 0 12px",
      color: p.ink
    }
  }, "We'll be in touch shortly."), /*#__PURE__*/React.createElement("p", {
    style: {
      color: p.inkSoft,
      maxWidth: "40ch",
      margin: "0 auto",
      lineHeight: 1.55
    }
  }, "Your inquiry has been sent to our leasing team. We typically respond within one business day."), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      marginTop: 20,
      padding: "12px 24px",
      background: p.ink,
      color: p.paper,
      border: "none",
      fontSize: 14,
      fontWeight: 600,
      cursor: "pointer",
      fontFamily: "inherit",
      borderRadius: 10,
      transition: "transform 200ms ease"
    },
    onMouseOver: e => e.currentTarget.style.transform = "translateY(-1px)",
    onMouseOut: e => e.currentTarget.style.transform = "translateY(0)"
  }, "Close")) : /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: p.inkSoft,
      fontWeight: 600
    }
  }, "Property *"), /*#__PURE__*/React.createElement("select", {
    required: true,
    style: inputStyle,
    value: property,
    onChange: e => setProperty(e.target.value)
  }, /*#__PURE__*/React.createElement("option", {
    value: ""
  }, "Choose a property\u2026"), PROPERTIES_LIST.map(o => /*#__PURE__*/React.createElement("option", {
    key: o
  }, o)))), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: p.inkSoft,
      fontWeight: 600
    }
  }, "Your name *"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    required: true,
    style: inputStyle,
    value: name,
    onChange: e => setName(e.target.value),
    placeholder: "Maria Garcia"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 14
    },
    className: "ys-book-row"
  }, /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: p.inkSoft,
      fontWeight: 600
    }
  }, "Phone"), /*#__PURE__*/React.createElement("input", {
    type: "tel",
    style: inputStyle,
    value: phone,
    onChange: e => setPhone(e.target.value),
    placeholder: "(832) 210-3968"
  })), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: p.inkSoft,
      fontWeight: 600
    }
  }, "Email"), /*#__PURE__*/React.createElement("input", {
    type: "email",
    style: inputStyle,
    value: email,
    onChange: e => setEmail(e.target.value),
    placeholder: "you@email.com"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: p.inkSoft,
      marginTop: -6
    }
  }, "Phone or email \u2014 at least one so we can reply."), /*#__PURE__*/React.createElement("label", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 5
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: p.inkSoft,
      fontWeight: 600
    }
  }, "Message *"), /*#__PURE__*/React.createElement("textarea", {
    required: true,
    rows: 3,
    style: {
      ...inputStyle,
      resize: "vertical"
    },
    value: message,
    onChange: e => setMessage(e.target.value),
    placeholder: "What would you like to know?"
  })), status === "error" && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "12px 14px",
      background: "#fef2f2",
      border: "1px solid #fecaca",
      borderRadius: 6,
      color: "#991b1b",
      fontSize: 14,
      lineHeight: 1.5
    }
  }, errorMsg), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: !canSubmit || status === "sending",
    style: {
      marginTop: 6,
      padding: "14px 24px",
      background: canSubmit && status !== "sending" ? p.primary : p.line,
      color: p.paper,
      border: "none",
      cursor: canSubmit && status !== "sending" ? "pointer" : "not-allowed",
      fontSize: 14,
      fontWeight: 700,
      fontFamily: "inherit",
      opacity: canSubmit && status !== "sending" ? 1 : 0.5,
      borderRadius: 10,
      transition: "all 200ms ease",
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 8
    }
  }, status === "sending" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 14,
      border: `2px solid ${p.paper}`,
      borderTopColor: "transparent",
      borderRadius: "50%",
      display: "inline-block",
      animation: "ys-spin 0.7s linear infinite"
    }
  }), "Sending\u2026") : "Send inquiry →")))), /*#__PURE__*/React.createElement("style", null, `@keyframes ys-spin { to { transform: rotate(360deg); } }`));
}

/* ----------------------------- instagram feed ----------------------------- */

function InstagramFeed({
  p,
  displayFont
}) {
  const feedImages = PROPERTIES.flatMap(prop => [prop.heroImage, ...(prop.gallery || [])]).filter(img => img && typeof img === "string" && img.startsWith("http")).slice(0, 6);
  if (feedImages.length === 0) return null;
  const igIcon = /*#__PURE__*/React.createElement("svg", {
    width: "22",
    height: "22",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "20",
    rx: "5",
    ry: "5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "17.5",
    y1: "6.5",
    x2: "17.51",
    y2: "6.5"
  }));
  return /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "80px var(--pad-x)",
      background: p.paper,
      borderTop: `1px solid ${p.line}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginBottom: 36
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: SOCIAL_LINKS.instagram,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      textDecoration: "none",
      color: "inherit",
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: p.ink
    }
  }, igIcon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: `'${displayFont}', serif`,
      fontSize: "clamp(22px, 2.5vw, 30px)",
      color: p.ink,
      fontWeight: 400
    }
  }, "@rentinalvin")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      color: p.inkSoft,
      margin: "8px 0 0",
      maxWidth: "50ch",
      marginLeft: "auto",
      marginRight: "auto"
    }
  }, "Follow us for property updates, community events, and behind-the-scenes looks at life in Alvin.")), /*#__PURE__*/React.createElement("div", {
    className: "ys-ig-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(6, 1fr)",
      gap: 4
    }
  }, feedImages.map((img, i) => /*#__PURE__*/React.createElement("a", {
    key: i,
    href: SOCIAL_LINKS.instagram,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      position: "relative",
      aspectRatio: "1/1",
      overflow: "hidden",
      background: p.bg,
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: `Instagram post ${i + 1}`,
    loading: "lazy",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      transition: "transform 400ms ease"
    },
    onMouseOver: e => e.currentTarget.style.transform = "scale(1.06)",
    onMouseOut: e => e.currentTarget.style.transform = "scale(1)"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: SOCIAL_LINKS.instagram,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      padding: "10px 20px",
      border: `1px solid ${p.line}`,
      borderRadius: 10,
      textDecoration: "none",
      fontSize: 14,
      fontWeight: 600,
      color: p.ink,
      transition: "all 200ms ease"
    },
    onMouseOver: e => {
      e.currentTarget.style.background = p.ink;
      e.currentTarget.style.color = p.paper;
      e.currentTarget.style.borderColor = p.ink;
    },
    onMouseOut: e => {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.color = p.ink;
      e.currentTarget.style.borderColor = p.line;
    }
  }, igIcon, "Follow on Instagram"))));
}

/* ----------------------------- footer ----------------------------- */

function Footer({
  p,
  displayFont
}) {
  const footerLink = {
    display: "block",
    fontSize: 14,
    color: "inherit",
    textDecoration: "none",
    padding: "5px 0",
    transition: "color 200ms ease, transform 200ms ease"
  };
  const headingStyle = {
    color: p.paper,
    fontWeight: 600,
    fontSize: 13,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    marginBottom: 16
  };
  const socialIconStyle = {
    color: `color-mix(in oklab, ${p.paper} 55%, transparent)`,
    textDecoration: "none",
    display: "flex",
    alignItems: "center",
    transition: "color 200ms ease"
  };
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      padding: "72px var(--pad-x) 36px",
      background: p.primary,
      color: `color-mix(in oklab, ${p.paper} 70%, transparent)`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ys-footer-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "2fr 1fr 1fr 1fr",
      gap: 48,
      paddingBottom: 40
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: `'${displayFont}', serif`,
      fontSize: "clamp(30px, 3.2vw, 40px)",
      color: p.paper,
      lineHeight: 1,
      letterSpacing: "-0.01em"
    }
  }, "RentInAlvin"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 40,
      height: 2,
      background: p.accent,
      marginTop: 14,
      borderRadius: 1
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      color: p.accent,
      fontWeight: 600,
      marginTop: 14
    }
  }, "Managed by Yellowstone Asset Management"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 15,
      lineHeight: 1.65,
      marginTop: 16,
      maxWidth: "38ch",
      color: `color-mix(in oklab, ${p.paper} 65%, transparent)`
    }
  }, "Family-run property management serving Alvin, Texas. Local team, honest leases, homes that feel like home."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 14,
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: SOCIAL_LINKS.instagram,
    target: "_blank",
    rel: "noopener noreferrer",
    style: socialIconStyle,
    onMouseOver: e => e.currentTarget.style.color = p.paper,
    onMouseOut: e => e.currentTarget.style.color = `color-mix(in oklab, ${p.paper} 55%, transparent)`
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "20",
    rx: "5",
    ry: "5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "17.5",
    y1: "6.5",
    x2: "17.51",
    y2: "6.5"
  }))), /*#__PURE__*/React.createElement("a", {
    href: SOCIAL_LINKS.facebook,
    target: "_blank",
    rel: "noopener noreferrer",
    style: socialIconStyle,
    onMouseOver: e => e.currentTarget.style.color = p.paper,
    onMouseOut: e => e.currentTarget.style.color = `color-mix(in oklab, ${p.paper} 55%, transparent)`
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
  }))))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: headingStyle
  }, "Properties"), [{
    name: "Kings Haven",
    id: "kings-haven"
  }, {
    name: "Kings Manor",
    id: "kings-manor"
  }, {
    name: "French Quarter",
    id: "french-quarter"
  }, {
    name: "Royal Oaks",
    id: "royal-oaks"
  }, {
    name: "White House",
    id: "white-house"
  }].map(prop => /*#__PURE__*/React.createElement("a", {
    key: prop.id,
    href: `#properties`,
    style: footerLink,
    onMouseOver: e => {
      e.currentTarget.style.color = p.accent;
      e.currentTarget.style.transform = "translateX(3px)";
    },
    onMouseOut: e => {
      e.currentTarget.style.color = "inherit";
      e.currentTarget.style.transform = "translateX(0)";
    }
  }, prop.name))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: headingStyle
  }, "Office"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      lineHeight: 1.8,
      color: `color-mix(in oklab, ${p.paper} 60%, transparent)`
    }
  }, "410 S 2nd Street", /*#__PURE__*/React.createElement("br", null), "Alvin, TX 77511"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      marginTop: 10,
      color: `color-mix(in oklab, ${p.paper} 45%, transparent)`
    }
  }, "Mon\u2013Fri \xB7 9am\u20135pm CT")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: headingStyle
  }, "Contact"), /*#__PURE__*/React.createElement("a", {
    href: "tel:8322103968",
    style: footerLink,
    onMouseOver: e => {
      e.currentTarget.style.color = p.accent;
      e.currentTarget.style.transform = "translateX(3px)";
    },
    onMouseOut: e => {
      e.currentTarget.style.color = "inherit";
      e.currentTarget.style.transform = "translateX(0)";
    }
  }, "(832) 210-3968"), /*#__PURE__*/React.createElement("a", {
    href: "mailto:office@yellowstone-am.com",
    style: footerLink,
    onMouseOver: e => {
      e.currentTarget.style.color = p.accent;
      e.currentTarget.style.transform = "translateX(3px)";
    },
    onMouseOut: e => {
      e.currentTarget.style.color = "inherit";
      e.currentTarget.style.transform = "translateX(0)";
    }
  }, "office@yellowstone-am.com"), /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      window.__openBooking && window.__openBooking();
    },
    style: {
      ...footerLink,
      marginTop: 8,
      color: p.accent,
      fontWeight: 600
    },
    onMouseOver: e => {
      e.currentTarget.style.color = p.paper;
    },
    onMouseOut: e => {
      e.currentTarget.style.color = p.accent;
    }
  }, "Schedule a tour \u2192"))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: `linear-gradient(to right, transparent, ${p.accent}, transparent)`,
      opacity: 0.4
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 24,
      fontSize: 12,
      color: `color-mix(in oklab, ${p.paper} 45%, transparent)`,
      flexWrap: "wrap",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("span", null, "\xA9 ", new Date().getFullYear(), " RentInAlvin \xB7 Yellowstone Asset Management. Equal Housing Opportunity."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: SOCIAL_LINKS.instagram,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      color: "inherit",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      transition: "color 200ms ease"
    },
    onMouseOver: e => e.currentTarget.style.color = p.accent,
    onMouseOut: e => e.currentTarget.style.color = "inherit"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("rect", {
    x: "2",
    y: "2",
    width: "20",
    height: "20",
    rx: "5",
    ry: "5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "17.5",
    y1: "6.5",
    x2: "17.51",
    y2: "6.5"
  })), "Instagram"), /*#__PURE__*/React.createElement("a", {
    href: SOCIAL_LINKS.facebook,
    target: "_blank",
    rel: "noopener noreferrer",
    style: {
      color: "inherit",
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      transition: "color 200ms ease"
    },
    onMouseOver: e => e.currentTarget.style.color = p.accent,
    onMouseOut: e => e.currentTarget.style.color = "inherit"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 24 24",
    fill: "currentColor"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
  })), "Facebook"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.3
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("a", {
    href: "Yellowstone Management.html",
    style: {
      color: "inherit",
      textDecoration: "none",
      transition: "color 200ms ease"
    },
    onMouseOver: e => e.currentTarget.style.color = p.accent,
    onMouseOut: e => e.currentTarget.style.color = "inherit"
  }, "EN"), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: 0.3
    }
  }, "\xB7"), /*#__PURE__*/React.createElement("a", {
    href: "Yellowstone Management ES.html",
    style: {
      color: "inherit",
      textDecoration: "none",
      transition: "color 200ms ease"
    },
    onMouseOver: e => e.currentTarget.style.color = p.accent,
    onMouseOut: e => e.currentTarget.style.color = "inherit"
  }, "ES")))));
}

/* ----------------------------- tweaks panel ----------------------------- */

function Tweaks({
  tweaks,
  setTweak
}) {
  if (!window.TweaksPanel) return null;
  return /*#__PURE__*/React.createElement(window.TweaksPanel, {
    title: "Tweaks"
  }, /*#__PURE__*/React.createElement(window.TweakSection, {
    title: "Palette"
  }, /*#__PURE__*/React.createElement(window.TweakRadio, {
    label: "Color system",
    value: tweaks.palette,
    onChange: v => setTweak("palette", v),
    options: [{
      value: "warm",
      label: "Warm"
    }, {
      value: "sand",
      label: "Sand"
    }, {
      value: "slate",
      label: "Slate"
    }]
  })), /*#__PURE__*/React.createElement(window.TweakSection, {
    title: "Typography"
  }, /*#__PURE__*/React.createElement(window.TweakSelect, {
    label: "Display font",
    value: tweaks.displayFont,
    onChange: v => setTweak("displayFont", v),
    options: [{
      value: "Lora",
      label: "Lora"
    }, {
      value: "Playfair Display",
      label: "Playfair Display"
    }, {
      value: "EB Garamond",
      label: "EB Garamond"
    }]
  })), /*#__PURE__*/React.createElement(window.TweakSection, {
    title: "Hero"
  }, /*#__PURE__*/React.createElement(window.TweakToggle, {
    label: "Show stat strip",
    value: tweaks.showStats,
    onChange: v => setTweak("showStats", v)
  })));
}

/* ----------------------------- app ----------------------------- */

function App() {
  const [tweaks, setTweak] = (window.useTweaks || (() => [TWEAK_DEFAULTS, () => {}]))(TWEAK_DEFAULTS);
  const p = PALETTES[tweaks.palette] || PALETTES.warm;

  // Tour booking modal — exposed globally so any component can trigger it
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingPropId, setBookingPropId] = useState("");
  useEffect(() => {
    window.__openBooking = propId => {
      setBookingPropId(propId || "");
      setBookingOpen(true);
    };
    return () => {
      delete window.__openBooking;
    };
  }, []);

  // Property inquiry modal
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [inquiryProperty, setInquiryProperty] = useState("");
  useEffect(() => {
    window.__openInquiry = propertyName => {
      setInquiryProperty(propertyName || "");
      setInquiryOpen(true);
    };
    return () => {
      delete window.__openInquiry;
    };
  }, []);
  useEffect(() => {
    document.body.style.background = p.bg;
    document.body.style.color = p.ink;
  }, [p]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: p.bg,
      color: p.ink,
      minHeight: "100vh"
    }
  }, /*#__PURE__*/React.createElement(Nav, {
    p: p
  }), /*#__PURE__*/React.createElement(Hero, {
    p: p,
    displayFont: tweaks.displayFont,
    showStats: tweaks.showStats
  }), window.Availability && /*#__PURE__*/React.createElement(window.Availability, {
    p: p,
    displayFont: tweaks.displayFont
  }), /*#__PURE__*/React.createElement(Properties, {
    p: p,
    displayFont: tweaks.displayFont
  }), /*#__PURE__*/React.createElement(Floorplans, {
    p: p,
    displayFont: tweaks.displayFont
  }), /*#__PURE__*/React.createElement(About, {
    p: p,
    displayFont: tweaks.displayFont
  }), window.Apply && /*#__PURE__*/React.createElement(window.Apply, {
    p: p,
    displayFont: tweaks.displayFont
  }), window.FAQ && /*#__PURE__*/React.createElement(window.FAQ, {
    p: p,
    displayFont: tweaks.displayFont
  }), window.SellProperty && /*#__PURE__*/React.createElement(window.SellProperty, {
    p: p,
    displayFont: tweaks.displayFont
  }), /*#__PURE__*/React.createElement(Contact, {
    p: p,
    displayFont: tweaks.displayFont
  }), /*#__PURE__*/React.createElement(ContactForm, {
    p: p,
    displayFont: tweaks.displayFont
  }), /*#__PURE__*/React.createElement(InstagramFeed, {
    p: p,
    displayFont: tweaks.displayFont
  }), /*#__PURE__*/React.createElement(Footer, {
    p: p,
    displayFont: tweaks.displayFont
  }), /*#__PURE__*/React.createElement(Tweaks, {
    tweaks: tweaks,
    setTweak: setTweak
  }), window.TourBooking && /*#__PURE__*/React.createElement(window.TourBooking, {
    open: bookingOpen,
    onClose: () => setBookingOpen(false),
    p: p,
    displayFont: tweaks.displayFont,
    initialPropertyId: bookingPropId
  }), /*#__PURE__*/React.createElement(PropertyInquiry, {
    open: inquiryOpen,
    onClose: () => setInquiryOpen(false),
    p: p,
    displayFont: tweaks.displayFont,
    initialProperty: inquiryProperty
  }));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(/*#__PURE__*/React.createElement(App, null));
})();
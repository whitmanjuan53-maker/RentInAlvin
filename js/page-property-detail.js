(function(){
'use strict';
/* global React, ReactDOM */
const {
  useState,
  useEffect
} = React;
const {
  TWEAK_DEFAULTS,
  PALETTES,
  PROPERTIES,
  FLOORPLANS,
  Nav,
  Footer,
  SectionHead
} = window.Shared;
function ImageGallery({
  images,
  p,
  propName
}) {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState({});
  if (!images || images.length === 0) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        aspectRatio: "16/9",
        overflow: "hidden",
        borderRadius: 8,
        background: p.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: p.inkSoft,
        fontWeight: 500
      }
    }, propName));
  }
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "16/9",
      overflow: "hidden",
      borderRadius: 8,
      background: p.bg
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: images[active],
    alt: `${propName} - photo ${active + 1}`,
    loading: "eager",
    onLoad: () => setLoaded(prev => ({
      ...prev,
      [active]: true
    })),
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      opacity: loaded[active] ? 1 : 0,
      transition: "opacity 400ms ease"
    }
  }), !loaded[active] && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      inset: 0,
      background: `repeating-linear-gradient(135deg, ${p.paper} 0 14px, color-mix(in oklab, ${p.ink} 3%, ${p.paper}) 14px 28px)`,
      display: "flex",
      alignItems: "flex-end",
      padding: 14
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
      fontWeight: 500,
      color: p.ink
    }
  }, propName))), images.length > 1 && /*#__PURE__*/React.createElement("div", {
    className: "ys-thumb-row",
    style: {
      display: "flex",
      gap: 8,
      marginTop: 12,
      overflowX: "auto",
      paddingBottom: 4,
      scrollbarWidth: "thin"
    }
  }, images.map((img, i) => /*#__PURE__*/React.createElement("button", {
    key: i,
    onClick: () => setActive(i),
    style: {
      flex: "0 0 auto",
      width: 84,
      height: 64,
      borderRadius: 6,
      overflow: "hidden",
      border: active === i ? `2px solid ${p.primary}` : `2px solid transparent`,
      padding: 0,
      cursor: "pointer",
      transition: "all 180ms ease",
      outline: "none"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: img,
    alt: `thumbnail ${i + 1}`,
    loading: "lazy",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      display: "block",
      opacity: active === i ? 1 : 0.6,
      transition: "opacity 180ms ease"
    }
  })))));
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
      if (ft.includes("1 bed") && (u.includes("1br") || u.includes("1 bed"))) relevant.push(i);else if (ft.includes("2 bed") && !ft.includes("2.5") && (u.includes("2br") || u.includes("2 bed"))) {
        if (ft.includes("1 bath") && u.includes("1ba")) relevant.push(i);
        if (ft.includes("2 bath") && u.includes("2ba")) relevant.push(i);
      } else if (ft.includes("2 bed") && ft.includes("2.5") && (u.includes("2.5") || u.includes("townhome"))) relevant.push(i);else if (ft.includes("3 bed") && (u.includes("3br") || u.includes("3 bed"))) relevant.push(i);
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
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: p.bg,
        color: p.ink,
        minHeight: "100vh"
      }
    }, /*#__PURE__*/React.createElement(Nav, {
      p: p,
      currentPage: "properties"
    }), /*#__PURE__*/React.createElement("section", {
      style: {
        padding: "140px var(--pad-x)",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("h1", {
      style: {
        fontFamily: `'${displayFont}', serif`,
        fontSize: 32
      }
    }, "Property not found"), /*#__PURE__*/React.createElement("a", {
      href: "properties.html",
      style: {
        color: p.primary,
        fontWeight: 600
      }
    }, "View all properties")), /*#__PURE__*/React.createElement(Footer, {
      p: p,
      displayFont: displayFont
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: p.bg,
      color: p.ink,
      minHeight: "100vh"
    }
  }, /*#__PURE__*/React.createElement(Nav, {
    p: p,
    currentPage: "properties"
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "120px var(--pad-x) 40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "properties.html",
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: p.inkSoft,
      textDecoration: "none",
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
      marginBottom: 28,
      transition: "color 160ms ease"
    },
    onMouseOver: e => e.currentTarget.style.color = p.accent,
    onMouseOut: e => e.currentTarget.style.color = p.inkSoft
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 7H3m0 0l3.5-3.5M3 7l3.5 3.5",
    stroke: "currentColor",
    strokeWidth: "1.4",
    strokeLinecap: "round"
  })), "All properties"), /*#__PURE__*/React.createElement("div", {
    className: "ys-detail-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "1.15fr 1fr",
      gap: 56
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(ImageGallery, {
    images: allImages,
    p: p,
    propName: property.name
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: p.accent,
      fontWeight: 600,
      marginBottom: 10
    }
  }, property.tag), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: `'${displayFont}', serif`,
      fontSize: "clamp(32px, 4vw, 52px)",
      lineHeight: 1.05,
      letterSpacing: "-0.02em",
      margin: 0,
      color: p.ink,
      fontWeight: 400
    }
  }, property.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 16,
      color: p.inkSoft,
      marginTop: 8
    }
  }, property.addr, " \xB7 Alvin, TX")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.65,
      color: p.inkSoft,
      margin: 0
    }
  }, property.description || property.note), property.highlights && property.highlights.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: 10
    }
  }, property.highlights.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: p.accent,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: p.ink
    }
  }, h)))), /*#__PURE__*/React.createElement("div", {
    className: "ys-detail-meta",
    style: {
      padding: "20px 0",
      borderTop: `1px solid ${p.line}`,
      borderBottom: `1px solid ${p.line}`,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: p.inkSoft,
      fontWeight: 500,
      marginBottom: 4
    }
  }, "Units"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      lineHeight: 1.4
    }
  }, property.units)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: p.inkSoft,
      fontWeight: 500,
      marginBottom: 4
    }
  }, "Starting rent"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: `'${displayFont}', serif`,
      fontSize: 24,
      color: p.primary
    }
  }, property.price))), property.amenities && property.amenities.length > 0 && /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: p.inkSoft,
      fontWeight: 600,
      marginBottom: 12
    }
  }, "Amenities"), /*#__PURE__*/React.createElement("div", {
    className: "ys-amenities-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "8px 16px"
    }
  }, property.amenities.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 5,
      height: 5,
      borderRadius: "50%",
      background: p.accent,
      flexShrink: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      color: p.inkSoft
    }
  }, a))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: `book-tour.html?property=${property.id}`,
    style: {
      padding: "14px 24px",
      background: p.primary,
      color: p.paper,
      textDecoration: "none",
      fontSize: 15,
      fontWeight: 600,
      borderRadius: 10,
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      transition: "transform 180ms ease, background 180ms ease"
    },
    onMouseOver: e => {
      e.currentTarget.style.transform = "translateY(-1px)";
      e.currentTarget.style.background = p.primarySoft;
    },
    onMouseOut: e => {
      e.currentTarget.style.transform = "translateY(0)";
      e.currentTarget.style.background = p.primary;
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
    href: `contact.html?property=${property.id}`,
    style: {
      padding: "14px 24px",
      background: "transparent",
      color: p.ink,
      textDecoration: "none",
      fontSize: 15,
      fontWeight: 600,
      borderRadius: 10,
      border: `1px solid ${p.ink}`,
      transition: "all 180ms ease"
    },
    onMouseOver: e => {
      e.currentTarget.style.background = p.ink;
      e.currentTarget.style.color = p.paper;
    },
    onMouseOut: e => {
      e.currentTarget.style.background = "transparent";
      e.currentTarget.style.color = p.ink;
    }
  }, "Inquire")))))), /*#__PURE__*/React.createElement("section", {
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
  }, /*#__PURE__*/React.createElement(SectionHead, {
    p: p,
    displayFont: displayFont,
    eyebrow: "Available layouts",
    title: "Floor plans at this property.",
    lead: "Call to confirm current availability and pricing."
  }), /*#__PURE__*/React.createElement("div", {
    className: "ys-prop-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20
    }
  }, propertyFloorplans.map((fi, idx) => {
    const f = FLOORPLANS[fi];
    return /*#__PURE__*/React.createElement("div", {
      key: fi,
      style: {
        background: p.bg,
        border: `1px solid ${p.line}`,
        borderRadius: 8,
        padding: 24,
        display: "flex",
        flexDirection: "column",
        gap: 12
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: p.accent,
        fontWeight: 600
      }
    }, "Layout 0", fi + 1), /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: `'${displayFont}', serif`,
        fontSize: 22,
        fontWeight: 400,
        letterSpacing: "-0.01em",
        margin: 0,
        color: p.ink
      }
    }, f.type), /*#__PURE__*/React.createElement("div", {
      className: "ys-floor-meta",
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 16,
        marginTop: 4
      }
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: p.inkSoft,
        fontWeight: 500,
        marginBottom: 2
      }
    }, "Sq ft"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15
      }
    }, f.sqft)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 11,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        color: p.inkSoft,
        fontWeight: 500,
        marginBottom: 2
      }
    }, "Rent"), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 15
      }
    }, f.price))), /*#__PURE__*/React.createElement("div", {
      style: {
        marginTop: "auto",
        paddingTop: 12,
        borderTop: `1px solid ${p.line}`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 14,
        color: p.inkSoft
      }
    }, f.available, " units available")));
  })))), /*#__PURE__*/React.createElement(Footer, {
    p: p,
    displayFont: displayFont
  }));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(/*#__PURE__*/React.createElement(PropertyDetailPage, null));
})();
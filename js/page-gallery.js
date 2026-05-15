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
  Nav,
  Footer,
  SectionHead
} = window.Shared;
function Lightbox({
  images,
  startIndex,
  onClose,
  p,
  propName,
  displayFont
}) {
  const [index, setIndex] = useState(startIndex);
  useEffect(() => {
    const onKey = e => {
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
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 100,
      background: "rgba(0,0,0,0.92)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "16px 12px"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    style: {
      position: "absolute",
      top: 12,
      right: 12,
      width: 40,
      height: 40,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.15)",
      border: "none",
      color: "#fff",
      fontSize: 24,
      cursor: "pointer",
      display: "grid",
      placeItems: "center",
      transition: "background 200ms ease"
    },
    onMouseOver: e => e.currentTarget.style.background = "rgba(255,255,255,0.3)",
    onMouseOut: e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "18",
    height: "18",
    viewBox: "0 0 18 18",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M4 4l10 10M14 4L4 14",
    stroke: "currentColor",
    strokeWidth: "1.8",
    strokeLinecap: "round"
  }))), images.length > 1 && /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      setIndex(i => (i - 1 + images.length) % images.length);
    },
    style: {
      position: "absolute",
      left: 8,
      top: "50%",
      transform: "translateY(-50%)",
      width: 44,
      height: 44,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.15)",
      border: "none",
      color: "#fff",
      cursor: "pointer",
      display: "grid",
      placeItems: "center",
      transition: "background 200ms ease"
    },
    onMouseOver: e => e.currentTarget.style.background = "rgba(255,255,255,0.3)",
    onMouseOut: e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M10 7H3m0 0l3.5-3.5M3 7l3.5 3.5",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }))), images.length > 1 && /*#__PURE__*/React.createElement("button", {
    onClick: e => {
      e.stopPropagation();
      setIndex(i => (i + 1) % images.length);
    },
    style: {
      position: "absolute",
      right: 8,
      top: "50%",
      transform: "translateY(-50%)",
      width: 44,
      height: 44,
      borderRadius: "50%",
      background: "rgba(255,255,255,0.15)",
      border: "none",
      color: "#fff",
      cursor: "pointer",
      display: "grid",
      placeItems: "center",
      transition: "background 200ms ease"
    },
    onMouseOver: e => e.currentTarget.style.background = "rgba(255,255,255,0.3)",
    onMouseOut: e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "20",
    height: "20",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }))), /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      maxWidth: "96vw",
      maxHeight: "88vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: images[index],
    alt: `${propName} - photo ${index + 1}`,
    style: {
      maxWidth: "100%",
      maxHeight: "80vh",
      objectFit: "contain",
      borderRadius: 8,
      boxShadow: "0 20px 60px rgba(0,0,0,0.5)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      color: "rgba(255,255,255,0.8)",
      fontSize: 14,
      fontWeight: 500
    }
  }, propName, " \xB7 ", index + 1, " / ", images.length)));
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
  const allGalleryItems = PROPERTIES.flatMap(prop => {
    const images = [prop.heroImage, ...(prop.gallery || [])].filter(img => img && typeof img === "string" && img.startsWith("http"));
    return images.map((img, i) => ({
      prop,
      img,
      idx: i
    }));
  });
  const filteredProps = activeProp === "all" ? PROPERTIES : PROPERTIES.filter(prop => prop.id === activeProp);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: p.bg,
      color: p.ink,
      minHeight: "100vh"
    }
  }, /*#__PURE__*/React.createElement(Nav, {
    p: p,
    currentPage: "gallery"
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "120px var(--pad-x) 40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    p: p,
    displayFont: displayFont,
    eyebrow: "Gallery",
    title: "See where you could live.",
    lead: "Photos of our properties, interiors, and community spaces. Click any image to enlarge."
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "0 var(--pad-x) 40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setActiveProp("all"),
    style: {
      padding: "8px 16px",
      background: activeProp === "all" ? p.ink : "transparent",
      color: activeProp === "all" ? p.paper : p.ink,
      border: `1px solid ${activeProp === "all" ? p.ink : p.line}`,
      fontSize: 13,
      fontWeight: 500,
      cursor: "pointer",
      fontFamily: "inherit",
      borderRadius: 10,
      transition: "all 200ms ease"
    }
  }, "All properties"), PROPERTIES.map(prop => /*#__PURE__*/React.createElement("button", {
    key: prop.id,
    onClick: () => setActiveProp(prop.id),
    style: {
      padding: "8px 16px",
      background: activeProp === prop.id ? p.ink : "transparent",
      color: activeProp === prop.id ? p.paper : p.ink,
      border: `1px solid ${activeProp === prop.id ? p.ink : p.line}`,
      fontSize: 13,
      fontWeight: 500,
      cursor: "pointer",
      fontFamily: "inherit",
      borderRadius: 10,
      transition: "all 200ms ease"
    }
  }, prop.name))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "0 var(--pad-x) 80px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto"
    }
  }, filteredProps.map(prop => {
    const images = [prop.heroImage, ...(prop.gallery || [])].filter(img => img && typeof img === "string" && img.startsWith("http"));
    if (images.length === 0) return null;
    const hero = images[0];
    const rest = images.slice(1);
    return /*#__PURE__*/React.createElement("div", {
      key: prop.id,
      style: {
        marginBottom: 72,
        background: p.paper,
        border: `1px solid ${p.line}`,
        borderRadius: 16,
        padding: "28px 28px 32px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.04)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "8px 16px",
        marginBottom: 20
      }
    }, /*#__PURE__*/React.createElement("h3", {
      style: {
        fontFamily: `'${displayFont}', serif`,
        fontSize: "clamp(22px, 2.2vw, 30px)",
        fontWeight: 400,
        letterSpacing: "-0.01em",
        margin: 0,
        color: p.ink
      }
    }, prop.name), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        color: p.inkSoft,
        fontWeight: 500
      }
    }, images.length, " photo", images.length !== 1 ? "s" : "")), /*#__PURE__*/React.createElement("div", {
      onClick: () => setLightbox({
        images,
        index: 0,
        propName: prop.name
      }),
      className: "ys-gallery-hero",
      style: {
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
        cursor: "pointer",
        marginBottom: 16,
        background: p.bg,
        aspectRatio: "16 / 9"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: hero,
      alt: `${prop.name} - featured`,
      loading: "lazy",
      style: {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        transition: "transform 500ms ease"
      },
      onMouseOver: e => e.currentTarget.style.transform = "scale(1.03)",
      onMouseOut: e => e.currentTarget.style.transform = "scale(1)"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.35) 0%, transparent 40%)",
        pointerEvents: "none"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        bottom: 16,
        left: 16,
        color: "#fff",
        fontSize: 13,
        fontWeight: 600,
        letterSpacing: "0.05em",
        textTransform: "uppercase",
        background: "rgba(0,0,0,0.45)",
        padding: "4px 10px",
        borderRadius: 6,
        backdropFilter: "blur(4px)"
      }
    }, "Featured")), rest.length > 0 && /*#__PURE__*/React.createElement("div", {
      className: "ys-gallery-grid"
    }, rest.map((img, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      onClick: () => setLightbox({
        images,
        index: i + 1,
        propName: prop.name
      }),
      className: "ys-gallery-thumb",
      style: {
        position: "relative",
        background: p.bg,
        borderRadius: 10,
        overflow: "hidden",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement("img", {
      src: img,
      alt: `${prop.name} - photo ${i + 2}`,
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
      onMouseOver: e => e.currentTarget.style.transform = "scale(1.05)",
      onMouseOut: e => e.currentTarget.style.transform = "scale(1)"
    })))));
  }), allGalleryItems.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 48,
      textAlign: "center",
      background: p.paper,
      border: `1px solid ${p.line}`,
      borderRadius: 8,
      color: p.inkSoft
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      margin: 0
    }
  }, "Photos coming soon. ", /*#__PURE__*/React.createElement("a", {
    href: "book-tour.html",
    style: {
      color: p.primary,
      textDecoration: "none",
      fontWeight: 600
    }
  }, "Book a tour"), " to see properties in person.")))), lightbox && /*#__PURE__*/React.createElement(Lightbox, {
    images: lightbox.images,
    startIndex: lightbox.index,
    propName: lightbox.propName,
    p: p,
    displayFont: displayFont,
    onClose: () => setLightbox(null)
  }), /*#__PURE__*/React.createElement(Footer, {
    p: p,
    displayFont: displayFont
  }));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(/*#__PURE__*/React.createElement(GalleryPage, null));
})();
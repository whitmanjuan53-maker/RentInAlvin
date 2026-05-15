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
  SectionHead,
  PropertyCard,
  InstagramFeed
} = window.Shared;
const {
  Availability,
  AlvinMap
} = window;
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
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: p.bg,
      color: p.ink,
      minHeight: "100vh"
    }
  }, /*#__PURE__*/React.createElement(Nav, {
    p: p,
    currentPage: "home"
  }), /*#__PURE__*/React.createElement("section", {
    className: "ys-hero",
    style: {
      position: "relative",
      padding: "60px 24px 0",
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
    className: "ys-hero-content",
    style: {
      maxWidth: 1400,
      margin: "0 auto",
      width: "100%",
      flex: "1 0 auto",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: `'${displayFont}', serif`,
      fontSize: "clamp(56px, 8vw, 120px)",
      lineHeight: 0.95,
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
  }, "Alvin,"), /*#__PURE__*/React.createElement("br", null), "made simple."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 20,
      lineHeight: 1.6,
      color: p.inkSoft,
      maxWidth: "52ch",
      margin: "24px 0 0"
    }
  }, "Yellowstone Asset Management manages over ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: p.ink
    }
  }, "160 units across five properties"), " in Alvin. Apartments and townhomes from $800 to $1,650, leased and maintained by a local team."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      flexWrap: "wrap",
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "book-tour.html",
    style: {
      padding: "14px 24px",
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
      transition: "transform 180ms ease, background 180ms ease"
    },
    onMouseOver: e => {
      e.currentTarget.style.background = p.primarySoft;
      e.currentTarget.style.transform = "translateY(-1px)";
    },
    onMouseOut: e => {
      e.currentTarget.style.background = p.primary;
      e.currentTarget.style.transform = "translateY(0)";
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
    href: "properties.html",
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
  }, "See properties")))), tweaks.showStats && /*#__PURE__*/React.createElement("section", {
    style: {
      background: p.paper,
      padding: "24px var(--pad-x)",
      borderTop: `1px solid ${p.line}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1400,
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
      paddingLeft: i === 0 ? 0 : 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: `'${displayFont}', serif`,
      fontSize: "clamp(36px, 4vw, 56px)",
      lineHeight: 1,
      color: p.ink,
      letterSpacing: "-0.02em"
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      letterSpacing: "0.08em",
      textTransform: "uppercase",
      color: p.inkSoft,
      marginTop: 10,
      fontWeight: 600
    }
  }, label))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "18px var(--pad-x)",
      background: p.primary,
      color: p.paper
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: 24,
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      opacity: 0.7,
      fontWeight: 600,
      marginBottom: 6
    }
  }, "Ready to move?"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: `'${displayFont}', serif`,
      fontSize: "clamp(20px, 2.5vw, 28px)",
      fontWeight: 400,
      letterSpacing: "-0.01em",
      lineHeight: 1.2
    }
  }, "Apply online in 5 minutes.")), /*#__PURE__*/React.createElement("a", {
    href: "apply.html",
    style: {
      padding: "12px 24px",
      background: p.paper,
      color: p.primary,
      textDecoration: "none",
      fontSize: 15,
      fontWeight: 600,
      borderRadius: 10,
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      transition: "all 180ms ease",
      flexShrink: 0
    },
    onMouseOver: e => {
      e.currentTarget.style.background = p.accent;
      e.currentTarget.style.color = "#fff";
    },
    onMouseOut: e => {
      e.currentTarget.style.background = p.paper;
      e.currentTarget.style.color = p.primary;
    }
  }, "Start application", /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  }))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "56px var(--pad-x)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    p: p,
    displayFont: displayFont,
    marginBottom: 32,
    eyebrow: "Featured properties",
    title: "A few of our available homes.",
    lead: "Browse all five communities on our Properties page."
  }), /*#__PURE__*/React.createElement("div", {
    className: "ys-prop-grid",
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3, 1fr)",
      gap: 20
    }
  }, featuredProps.map((prop, i) => /*#__PURE__*/React.createElement(PropertyCard, {
    key: i,
    prop: prop,
    p: p,
    idx: i,
    displayFont: displayFont,
    onSelect: setFocusedProperty
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center",
      marginTop: 36
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "properties.html",
    style: {
      padding: "12px 24px",
      background: "transparent",
      color: p.ink,
      textDecoration: "none",
      fontSize: 15,
      fontWeight: 600,
      borderRadius: 10,
      border: `1px solid ${p.ink}`,
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
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
  }, "View all properties", /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M3 7h8m0 0L7.5 3.5M11 7l-3.5 3.5",
    stroke: "currentColor",
    strokeWidth: "1.5",
    strokeLinecap: "round"
  })))))), Availability && /*#__PURE__*/React.createElement(Availability, {
    p: p,
    displayFont: displayFont,
    limit: 3,
    compact: true
  }), AlvinMap && /*#__PURE__*/React.createElement(AlvinMap, {
    p: p,
    displayFont: displayFont,
    focusedProperty: focusedProperty
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "56px var(--pad-x)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 32,
      alignItems: "center"
    },
    className: "ys-about-grid"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(SectionHead, {
    p: p,
    displayFont: displayFont,
    marginBottom: 32,
    eyebrow: "Why Yellowstone Asset Management",
    title: "Built around the way Alvin actually lives."
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 17,
      lineHeight: 1.6,
      color: p.inkSoft,
      maxWidth: "48ch"
    }
  }, "Every property we manage is within ten minutes of our office at 410 S 2nd St. When you call, you reach the team that manages your home \u2014 not a call center."), /*#__PURE__*/React.createElement("a", {
    href: "about.html",
    style: {
      marginTop: 20,
      display: "inline-flex",
      alignItems: "center",
      gap: 8,
      fontSize: 14,
      fontWeight: 600,
      color: p.primary,
      textDecoration: "none"
    }
  }, "Learn more about us", /*#__PURE__*/React.createElement("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2.5 6h7m0 0L6.5 3m3 3-3 3",
    stroke: "currentColor",
    strokeWidth: "1.4",
    strokeLinecap: "round"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      background: p.paper,
      border: `1px solid ${p.line}`,
      borderRadius: 8,
      padding: 32,
      display: "flex",
      flexDirection: "column",
      gap: 20
    }
  }, [{
    title: "Local & responsive",
    body: "Our office is on-site at Kings Haven. We pick up the phone."
  }, {
    title: "Honest pricing",
    body: "Rents are published upfront. No bait-and-switch, no hidden fees."
  }, {
    title: "Fast maintenance",
    body: "Most non-emergency issues are closed within 48 hours."
  }].map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      paddingBottom: i < 2 ? 20 : 0,
      borderBottom: i < 2 ? `1px solid ${p.line}` : "none"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: p.ink,
      marginBottom: 4
    }
  }, item.title), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      lineHeight: 1.55,
      color: p.inkSoft
    }
  }, item.body))))))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "56px var(--pad-x)",
      background: p.paper
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: `'${displayFont}', serif`,
      fontSize: "clamp(28px, 3.5vw, 44px)",
      lineHeight: 1.05,
      letterSpacing: "-0.02em",
      margin: "0 auto",
      color: p.ink,
      fontWeight: 400,
      maxWidth: "16ch"
    }
  }, "Ready to see your new home?"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 16,
      lineHeight: 1.6,
      color: p.inkSoft,
      maxWidth: "48ch",
      margin: "12px auto 0"
    }
  }, "Stop by the office or book a tour online. We're here to help."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 12,
      justifyContent: "center",
      flexWrap: "wrap",
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "book-tour.html",
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
    href: "contact.html",
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
  }, "Contact us")))), /*#__PURE__*/React.createElement(InstagramFeed, {
    p: p,
    displayFont: displayFont
  }), /*#__PURE__*/React.createElement(Footer, {
    p: p,
    displayFont: displayFont
  }));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(/*#__PURE__*/React.createElement(HomePage, null));
})();
/* global React, ReactDOM */
const {
  useEffect
} = React;
const {
  TWEAK_DEFAULTS,
  PALETTES,
  Nav,
  Footer
} = window.Shared;
const {
  Apply
} = window;
function ApplyPage() {
  const [tweaks, setTweak] = (window.useTweaks || (() => [TWEAK_DEFAULTS, () => {}]))(TWEAK_DEFAULTS);
  const p = PALETTES[tweaks.palette] || PALETTES.forest;
  const displayFont = tweaks.displayFont;
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
    p: p,
    currentPage: "apply"
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "120px var(--pad-x) 40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: p.accent,
      fontWeight: 600,
      marginBottom: 14
    }
  }, "Apply"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: `'${displayFont}', serif`,
      fontSize: "clamp(36px, 5vw, 64px)",
      lineHeight: 1,
      letterSpacing: "-0.02em",
      margin: 0,
      color: p.ink,
      fontWeight: 400,
      maxWidth: "14ch"
    }
  }, "Apply for your new home."), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 18,
      lineHeight: 1.6,
      color: p.inkSoft,
      maxWidth: "50ch",
      marginTop: 16
    }
  }, "Complete the application below. Most decisions are made within 48 hours. A $40 application fee applies per adult."))), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "40px var(--pad-x) 80px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1280,
      margin: "0 auto"
    }
  }, Apply && /*#__PURE__*/React.createElement(Apply, {
    p: p,
    displayFont: displayFont
  }))), /*#__PURE__*/React.createElement(Footer, {
    p: p,
    displayFont: displayFont
  }));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(/*#__PURE__*/React.createElement(ApplyPage, null));
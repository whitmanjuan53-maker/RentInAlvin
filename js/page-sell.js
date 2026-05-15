(function(){
'use strict';
/* global React, ReactDOM */
const {
  useEffect
} = React;
const {
  TWEAK_DEFAULTS,
  PALETTES,
  Nav,
  Footer,
  SectionHead
} = window.Shared;
const {
  SellProperty
} = window;
function SellPage() {
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
    currentPage: "sell"
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
    eyebrow: "For property owners",
    title: "Sell your property direct.",
    lead: "Yellowstone Asset Management is actively buying homes, duplexes, and small multifamily properties in Alvin. No commissions, no listing pressure."
  }))), SellProperty && /*#__PURE__*/React.createElement(SellProperty, {
    p: p,
    displayFont: displayFont
  }), /*#__PURE__*/React.createElement(Footer, {
    p: p,
    displayFont: displayFont
  }));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(/*#__PURE__*/React.createElement(SellPage, null));
})();
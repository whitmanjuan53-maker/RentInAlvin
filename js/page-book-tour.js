(function(){
'use strict';
/* global React, ReactDOM */
const {
  useEffect,
  useState
} = React;
const {
  TWEAK_DEFAULTS,
  PALETTES,
  Nav,
  Footer,
  SectionHead
} = window.Shared;
const {
  TourBooking
} = window;
function BookTourPage() {
  const [tweaks, setTweak] = (window.useTweaks || (() => [TWEAK_DEFAULTS, () => {}]))(TWEAK_DEFAULTS);
  const p = PALETTES[tweaks.palette] || PALETTES.forest;
  const displayFont = tweaks.displayFont;
  const [config, setConfig] = useState({
    bookingProvider: 'custom',
    calendlyUrl: '',
    googleCalendarUrl: ''
  });
  useEffect(() => {
    document.body.style.background = p.bg;
    document.body.style.color = p.ink;
  }, [p]);
  useEffect(() => {
    if (window.RentInAlvinAPI && window.RentInAlvinAPI.getConfig) {
      window.RentInAlvinAPI.getConfig().then(setConfig).catch(() => {});
    }
  }, []);
  const hasCalendarEmbed = config.bookingProvider !== 'custom' && (config.calendlyUrl || config.googleCalendarUrl);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: p.bg,
      color: p.ink,
      minHeight: "100vh"
    }
  }, /*#__PURE__*/React.createElement(Nav, {
    p: p,
    currentPage: "book-tour"
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      padding: "120px var(--pad-x) 80px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 680,
      margin: "0 auto"
    }
  }, /*#__PURE__*/React.createElement(SectionHead, {
    p: p,
    displayFont: displayFont,
    eyebrow: "Book a tour",
    title: "See it in person.",
    lead: "Pick a property, choose a date and time, and we'll confirm within 24 hours."
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      background: p.paper,
      border: `1px solid ${p.line}`,
      borderRadius: 8,
      padding: "32px 36px",
      marginTop: 8
    }
  }, /*#__PURE__*/React.createElement(TourBooking, {
    inline: true,
    p: p,
    displayFont: displayFont,
    open: true
  })), hasCalendarEmbed && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16,
      marginBottom: 24
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: p.line
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: p.inkSoft,
      fontWeight: 500
    }
  }, "Or book instantly"), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: p.line
    }
  })), config.calendlyUrl && /*#__PURE__*/React.createElement("div", {
    style: {
      background: p.paper,
      border: `1px solid ${p.line}`,
      borderRadius: 8,
      overflow: "hidden",
      minHeight: 630
    }
  }, /*#__PURE__*/React.createElement("iframe", {
    src: `${config.calendlyUrl}?embed_domain=${window.location.hostname}&embed_type=Inline`,
    width: "100%",
    height: "630",
    frameBorder: "0",
    title: "Schedule a tour",
    style: {
      border: "none"
    }
  })), config.googleCalendarUrl && !config.calendlyUrl && /*#__PURE__*/React.createElement("div", {
    style: {
      background: p.paper,
      border: `1px solid ${p.line}`,
      borderRadius: 8,
      overflow: "hidden",
      minHeight: 500
    }
  }, /*#__PURE__*/React.createElement("iframe", {
    src: config.googleCalendarUrl,
    width: "100%",
    height: "500",
    frameBorder: "0",
    title: "Schedule a tour",
    style: {
      border: "none"
    }
  }))))), /*#__PURE__*/React.createElement(Footer, {
    p: p,
    displayFont: displayFont
  }));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(/*#__PURE__*/React.createElement(BookTourPage, null));
})();
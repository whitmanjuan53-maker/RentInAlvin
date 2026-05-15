(function(){
'use strict';
/* global React */
const {
  useState: useStateL
} = React;

/* ============================================================
   Logo set — 8 directions, all forest + cream, all "Yellowstone Asset Management"
   Each is sized for an 800x500 artboard with breathing room.
   Built with inline SVG so they scale crisp at any size.
============================================================ */

const PALETTE = {
  ink: "#1F3A2E",
  // forest green (primary)
  inkDark: "#142922",
  cream: "#FBF7F0",
  paper: "#F4EEE4",
  rule: "rgba(31, 58, 46, 0.18)",
  accent: "#B6743F"
};
const SERIF = `'Instrument Serif', 'EB Garamond', Georgia, serif`;
const SERIF_DISPLAY = `'Lora', 'Playfair Display', Georgia, serif`;
const SANS = `'Source Sans 3', system-ui, -apple-system, sans-serif`;

/* ----------------------------- Shared frame ----------------------------- */
function LogoFrame({
  children,
  bg = PALETTE.cream,
  ink = PALETTE.ink,
  label
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 800,
      height: 500,
      background: bg,
      color: ink,
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 18,
      left: 24,
      fontFamily: SANS,
      fontSize: 10,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: ink,
      opacity: 0.4,
      fontWeight: 500
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "grid",
      placeItems: "center",
      padding: "60px 40px 40px"
    }
  }, children), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: `1px solid ${PALETTE.rule}`,
      padding: "14px 24px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      fontFamily: SANS,
      fontSize: 10,
      opacity: 0.55,
      letterSpacing: "0.14em",
      textTransform: "uppercase"
    }
  }, /*#__PURE__*/React.createElement("span", null, "Forest #1F3A2E"), /*#__PURE__*/React.createElement("span", null, "Cream #FBF7F0")));
}

/* ============================================================
   1. SERIF MONOGRAM CREST
   "Y" inside a thin circle, full name beneath.
============================================================ */
function Logo01() {
  return /*#__PURE__*/React.createElement(LogoFrame, {
    label: "01 \xB7 Crest monogram"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "160",
    height: "160",
    viewBox: "0 0 160 160"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "80",
    cy: "80",
    r: "76",
    fill: "none",
    stroke: PALETTE.ink,
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "80",
    cy: "80",
    r: "68",
    fill: "none",
    stroke: PALETTE.ink,
    strokeWidth: "0.8",
    opacity: "0.4"
  }), /*#__PURE__*/React.createElement("text", {
    x: "80",
    y: "108",
    textAnchor: "middle",
    fontFamily: SERIF_DISPLAY,
    fontSize: "110",
    fill: PALETTE.ink,
    fontStyle: "italic",
    fontWeight: "400"
  }, "Y")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SERIF,
      fontSize: 28,
      letterSpacing: "0.02em",
      lineHeight: 1,
      fontStyle: "italic"
    }
  }, "Yellowstone"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontSize: 10,
      letterSpacing: "0.42em",
      textTransform: "uppercase",
      marginTop: 8,
      fontWeight: 500
    }
  }, "Asset Management"))));
}

/* ============================================================
   2. PURE WORDMARK — no symbol
   "Yellowstone" in a refined italic display serif.
============================================================ */
function Logo02() {
  return /*#__PURE__*/React.createElement(LogoFrame, {
    label: "02 \xB7 Wordmark only"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SERIF_DISPLAY,
      fontSize: 88,
      letterSpacing: "-0.02em",
      lineHeight: 0.95,
      fontStyle: "italic",
      fontWeight: 400,
      color: PALETTE.ink
    }
  }, "Yellowstone"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 50,
      height: 1,
      background: PALETTE.ink,
      opacity: 0.6
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: SANS,
      fontSize: 11,
      letterSpacing: "0.46em",
      textTransform: "uppercase",
      fontWeight: 500
    }
  }, "Asset Management"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 50,
      height: 1,
      background: PALETTE.ink,
      opacity: 0.6
    }
  }))));
}

/* ============================================================
   3. GEOMETRIC Y / ROOF MARK
   The Y as architectural roofline, very minimal & modern.
============================================================ */
function Logo03() {
  return /*#__PURE__*/React.createElement(LogoFrame, {
    label: "03 \xB7 Roofline mark"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "120",
    height: "120",
    viewBox: "0 0 120 120"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 20 100 L 60 30 L 100 100",
    fill: "none",
    stroke: PALETTE.ink,
    strokeWidth: "6",
    strokeLinecap: "square"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "60",
    y1: "30",
    x2: "60",
    y2: "100",
    stroke: PALETTE.ink,
    strokeWidth: "6",
    strokeLinecap: "square"
  }), /*#__PURE__*/React.createElement("line", {
    x1: "14",
    y1: "108",
    x2: "106",
    y2: "108",
    stroke: PALETTE.ink,
    strokeWidth: "2"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: `1px solid ${PALETTE.rule}`,
      paddingLeft: 28,
      height: 80,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontSize: 28,
      letterSpacing: "0.06em",
      fontWeight: 600,
      textTransform: "uppercase",
      color: PALETTE.ink
    }
  }, "Yellowstone"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontSize: 11,
      letterSpacing: "0.32em",
      textTransform: "uppercase",
      marginTop: 6,
      fontWeight: 400,
      opacity: 0.7
    }
  }, "Asset Management"))));
}

/* ============================================================
   4. LETTERPRESS STAMP / SEAL
   Concentric circles + "EST. 2018" type detail. High trust.
============================================================ */
function Logo04() {
  return /*#__PURE__*/React.createElement(LogoFrame, {
    label: "04 \xB7 Letterpress seal"
  }, /*#__PURE__*/React.createElement("svg", {
    width: "280",
    height: "280",
    viewBox: "0 0 280 280"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("path", {
    id: "topArc",
    d: "M 40 140 A 100 100 0 0 1 240 140"
  }), /*#__PURE__*/React.createElement("path", {
    id: "botArc",
    d: "M 40 140 A 100 100 0 0 0 240 140"
  })), /*#__PURE__*/React.createElement("circle", {
    cx: "140",
    cy: "140",
    r: "120",
    fill: "none",
    stroke: PALETTE.ink,
    strokeWidth: "1.2"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "140",
    cy: "140",
    r: "106",
    fill: "none",
    stroke: PALETTE.ink,
    strokeWidth: "0.6",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("text", {
    fontFamily: SANS,
    fontSize: "11",
    letterSpacing: "6",
    fill: PALETTE.ink,
    fontWeight: "600"
  }, /*#__PURE__*/React.createElement("textPath", {
    href: "#topArc",
    startOffset: "50%",
    textAnchor: "middle"
  }, "YELLOWSTONE \xB7 ASSET MANAGEMENT")), /*#__PURE__*/React.createElement("text", {
    fontFamily: SANS,
    fontSize: "10",
    letterSpacing: "6",
    fill: PALETTE.ink,
    fontWeight: "500"
  }, /*#__PURE__*/React.createElement("textPath", {
    href: "#botArc",
    startOffset: "50%",
    textAnchor: "middle"
  }, "ALVIN \xB7 TEXAS \xB7 EST 2018")), /*#__PURE__*/React.createElement("text", {
    x: "140",
    y: "158",
    textAnchor: "middle",
    fontFamily: SERIF_DISPLAY,
    fontSize: "78",
    fill: PALETTE.ink,
    fontStyle: "italic",
    fontWeight: "400"
  }, "Y"), /*#__PURE__*/React.createElement("circle", {
    cx: "48",
    cy: "140",
    r: "2.5",
    fill: PALETTE.ink
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "232",
    cy: "140",
    r: "2.5",
    fill: PALETTE.ink
  })));
}

/* ============================================================
   5. MONOLITH BLOCK
   Solid forest-green rectangle with a cream Y, name beside.
   Architectural / monolithic / very confident.
============================================================ */
function Logo05() {
  return /*#__PURE__*/React.createElement(LogoFrame, {
    label: "05 \xB7 Monolith block"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "stretch",
      gap: 28,
      height: 160
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 130,
      background: PALETTE.ink,
      color: PALETTE.cream,
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: SERIF_DISPLAY,
      fontSize: 110,
      lineHeight: 1,
      fontStyle: "italic",
      fontWeight: 400
    }
  }, "Y")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SERIF,
      fontSize: 44,
      lineHeight: 1,
      color: PALETTE.ink,
      fontWeight: 400,
      letterSpacing: "-0.01em"
    }
  }, "Yellowstone"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontSize: 12,
      letterSpacing: "0.32em",
      textTransform: "uppercase",
      marginTop: 12,
      color: PALETTE.ink,
      fontWeight: 500,
      opacity: 0.85
    }
  }, "Asset Management"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 60,
      height: 2,
      background: PALETTE.ink,
      marginTop: 14
    }
  }))));
}

/* ============================================================
   6. HORIZON / LANDSCAPE MARK
   Subtle nod to Yellowstone-the-place: distant horizon ridges.
============================================================ */
function Logo06() {
  return /*#__PURE__*/React.createElement(LogoFrame, {
    label: "06 \xB7 Horizon mark"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "200",
    height: "80",
    viewBox: "0 0 200 80"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 0 60 Q 30 38 60 50 T 120 42 T 200 52 L 200 80 L 0 80 Z",
    fill: PALETTE.ink,
    opacity: "0.18"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 70 Q 40 50 80 62 T 160 58 T 200 66 L 200 80 L 0 80 Z",
    fill: PALETTE.ink,
    opacity: "0.4"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 0 76 L 200 76 L 200 80 L 0 80 Z",
    fill: PALETTE.ink
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "100",
    cy: "34",
    r: "14",
    fill: "none",
    stroke: PALETTE.ink,
    strokeWidth: "1.5"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SERIF,
      fontSize: 38,
      letterSpacing: "0.01em",
      lineHeight: 1,
      fontWeight: 400,
      color: PALETTE.ink
    }
  }, "Yellowstone"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontSize: 10,
      letterSpacing: "0.42em",
      textTransform: "uppercase",
      marginTop: 10,
      fontWeight: 500
    }
  }, "Asset Management \xB7 Alvin, TX"))));
}

/* ============================================================
   7. STACKED Y·A·M INITIALS
   Confident typographic monogram, treats each letter as a peer.
============================================================ */
function Logo07() {
  return /*#__PURE__*/React.createElement(LogoFrame, {
    label: "07 \xB7 YAM monogram"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 36
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      fontFamily: SERIF_DISPLAY,
      color: PALETTE.ink,
      lineHeight: 0.85,
      fontWeight: 400
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 72,
      fontStyle: "italic"
    }
  }, "Y."), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 72,
      fontStyle: "italic",
      marginLeft: 12
    }
  }, "A."), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 72,
      fontStyle: "italic",
      marginLeft: 24
    }
  }, "M.")), /*#__PURE__*/React.createElement("div", {
    style: {
      borderLeft: `1px solid ${PALETTE.rule}`,
      paddingLeft: 28,
      height: 180,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      gap: 4
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontSize: 11,
      letterSpacing: "0.32em",
      textTransform: "uppercase",
      color: PALETTE.ink,
      fontWeight: 600
    }
  }, "Yellowstone"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontSize: 11,
      letterSpacing: "0.32em",
      textTransform: "uppercase",
      color: PALETTE.ink,
      fontWeight: 600
    }
  }, "Asset"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontSize: 11,
      letterSpacing: "0.32em",
      textTransform: "uppercase",
      color: PALETTE.ink,
      fontWeight: 600
    }
  }, "Management"), /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 1,
      background: PALETTE.ink,
      marginTop: 10,
      opacity: 0.5
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontSize: 9,
      letterSpacing: "0.28em",
      textTransform: "uppercase",
      marginTop: 6,
      opacity: 0.55
    }
  }, "Alvin \xB7 Texas"))));
}

/* ============================================================
   8. DOORWAY / KEYHOLE MARK
   Property-management cue, but abstract enough not to be cliché.
   A simple arched doorway; subtle and warm.
============================================================ */
function Logo08() {
  return /*#__PURE__*/React.createElement(LogoFrame, {
    label: "08 \xB7 Doorway mark"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "100",
    height: "140",
    viewBox: "0 0 100 140"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M 8 132 L 8 50 Q 8 8 50 8 Q 92 8 92 50 L 92 132 Z",
    fill: "none",
    stroke: PALETTE.ink,
    strokeWidth: "2.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M 22 132 L 22 56 Q 22 22 50 22 Q 78 22 78 56 L 78 132",
    fill: "none",
    stroke: PALETTE.ink,
    strokeWidth: "1.2",
    opacity: "0.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "50",
    y: "92",
    textAnchor: "middle",
    fontFamily: SERIF_DISPLAY,
    fontSize: "56",
    fill: PALETTE.ink,
    fontStyle: "italic",
    fontWeight: "400"
  }, "Y"), /*#__PURE__*/React.createElement("line", {
    x1: "0",
    y1: "134",
    x2: "100",
    y2: "134",
    stroke: PALETTE.ink,
    strokeWidth: "2"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SERIF,
      fontSize: 42,
      letterSpacing: "0.01em",
      lineHeight: 1,
      color: PALETTE.ink,
      fontWeight: 400
    }
  }, "Yellowstone"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontSize: 11,
      letterSpacing: "0.36em",
      textTransform: "uppercase",
      marginTop: 12,
      fontWeight: 500
    }
  }, "Asset Management"))));
}

/* ============================================================
   Reverse / dark-bg variant — shows logos work on forest green too
============================================================ */
function LogoReverse() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 800,
      height: 500,
      background: PALETTE.ink,
      color: PALETTE.cream,
      display: "grid",
      placeItems: "center",
      position: "relative"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 18,
      left: 24,
      fontFamily: SANS,
      fontSize: 10,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      opacity: 0.5,
      fontWeight: 500
    }
  }, "Reverse \xB7 on forest green"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 24
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "120",
    height: "120",
    viewBox: "0 0 120 120"
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "60",
    cy: "60",
    r: "56",
    fill: "none",
    stroke: PALETTE.cream,
    strokeWidth: "1.5"
  }), /*#__PURE__*/React.createElement("text", {
    x: "60",
    y: "82",
    textAnchor: "middle",
    fontFamily: SERIF_DISPLAY,
    fontSize: "80",
    fill: PALETTE.cream,
    fontStyle: "italic",
    fontWeight: "400"
  }, "Y")), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SERIF,
      fontSize: 32,
      letterSpacing: "0.02em",
      lineHeight: 1,
      fontStyle: "italic"
    }
  }, "Yellowstone"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontSize: 11,
      letterSpacing: "0.42em",
      textTransform: "uppercase",
      marginTop: 10,
      fontWeight: 500,
      opacity: 0.85
    }
  }, "Asset Management"))));
}

/* ============================================================
   Mini-set: how each logo looks at favicon / business-card scale
============================================================ */
function MiniSet() {
  const items = [{
    label: "01",
    el: /*#__PURE__*/React.createElement("svg", {
      width: "40",
      height: "40",
      viewBox: "0 0 160 160"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "80",
      cy: "80",
      r: "76",
      fill: "none",
      stroke: PALETTE.ink,
      strokeWidth: "3"
    }), /*#__PURE__*/React.createElement("text", {
      x: "80",
      y: "112",
      textAnchor: "middle",
      fontFamily: SERIF_DISPLAY,
      fontSize: "110",
      fill: PALETTE.ink,
      fontStyle: "italic"
    }, "Y"))
  }, {
    label: "02",
    el: /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: SERIF_DISPLAY,
        fontSize: 22,
        fontStyle: "italic",
        color: PALETTE.ink
      }
    }, "Yellowstone")
  }, {
    label: "03",
    el: /*#__PURE__*/React.createElement("svg", {
      width: "40",
      height: "40",
      viewBox: "0 0 120 120"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M 20 100 L 60 30 L 100 100",
      fill: "none",
      stroke: PALETTE.ink,
      strokeWidth: "10",
      strokeLinecap: "square"
    }), /*#__PURE__*/React.createElement("line", {
      x1: "60",
      y1: "30",
      x2: "60",
      y2: "100",
      stroke: PALETTE.ink,
      strokeWidth: "10"
    }))
  }, {
    label: "04",
    el: /*#__PURE__*/React.createElement("svg", {
      width: "40",
      height: "40",
      viewBox: "0 0 280 280"
    }, /*#__PURE__*/React.createElement("circle", {
      cx: "140",
      cy: "140",
      r: "120",
      fill: "none",
      stroke: PALETTE.ink,
      strokeWidth: "6"
    }), /*#__PURE__*/React.createElement("text", {
      x: "140",
      y: "170",
      textAnchor: "middle",
      fontFamily: SERIF_DISPLAY,
      fontSize: "100",
      fill: PALETTE.ink,
      fontStyle: "italic"
    }, "Y"))
  }, {
    label: "05",
    el: /*#__PURE__*/React.createElement("div", {
      style: {
        width: 40,
        height: 40,
        background: PALETTE.ink,
        color: PALETTE.cream,
        display: "grid",
        placeItems: "center",
        fontFamily: SERIF_DISPLAY,
        fontSize: 32,
        fontStyle: "italic"
      }
    }, "Y")
  }, {
    label: "06",
    el: /*#__PURE__*/React.createElement("svg", {
      width: "40",
      height: "40",
      viewBox: "0 0 200 80"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M 0 70 Q 40 50 80 62 T 160 58 T 200 66 L 200 80 L 0 80 Z",
      fill: PALETTE.ink
    }), /*#__PURE__*/React.createElement("circle", {
      cx: "100",
      cy: "40",
      r: "14",
      fill: "none",
      stroke: PALETTE.ink,
      strokeWidth: "4"
    }))
  }, {
    label: "07",
    el: /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: SERIF_DISPLAY,
        fontSize: 22,
        fontStyle: "italic",
        color: PALETTE.ink,
        letterSpacing: "0.02em"
      }
    }, "Y\xB7A\xB7M")
  }, {
    label: "08",
    el: /*#__PURE__*/React.createElement("svg", {
      width: "32",
      height: "40",
      viewBox: "0 0 100 140"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M 8 132 L 8 50 Q 8 8 50 8 Q 92 8 92 50 L 92 132 Z",
      fill: "none",
      stroke: PALETTE.ink,
      strokeWidth: "6"
    }), /*#__PURE__*/React.createElement("text", {
      x: "50",
      y: "92",
      textAnchor: "middle",
      fontFamily: SERIF_DISPLAY,
      fontSize: "56",
      fill: PALETTE.ink,
      fontStyle: "italic"
    }, "Y"))
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 800,
      height: 500,
      background: PALETTE.cream,
      display: "flex",
      flexDirection: "column",
      position: "relative",
      padding: "40px"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontSize: 10,
      letterSpacing: "0.22em",
      textTransform: "uppercase",
      color: PALETTE.ink,
      opacity: 0.5,
      fontWeight: 500
    }
  }, "Favicon scale \xB7 40px square"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SERIF,
      fontSize: 26,
      color: PALETTE.ink,
      marginTop: 8,
      fontWeight: 400,
      fontStyle: "italic"
    }
  }, "Each mark, reduced."), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "grid",
      gridTemplateColumns: "repeat(4, 1fr)",
      gridTemplateRows: "repeat(2, 1fr)",
      gap: 20,
      marginTop: 30,
      alignItems: "center",
      justifyItems: "center"
    }
  }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
      padding: "20px 16px",
      border: `1px solid ${PALETTE.rule}`,
      width: "100%",
      height: "100%",
      justifyContent: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      placeItems: "center",
      height: 50
    }
  }, it.el), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: SANS,
      fontSize: 9,
      letterSpacing: "0.18em",
      textTransform: "uppercase",
      color: PALETTE.ink,
      opacity: 0.5
    }
  }, "Direction ", it.label)))));
}

/* ============================================================
   App — design canvas
============================================================ */
function LogoApp() {
  const DC = window.DesignCanvas;
  const DCSection = window.DCSection;
  const DCArtboard = window.DCArtboard;
  if (!DC) return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 40
    }
  }, "Loading canvas\u2026");
  return /*#__PURE__*/React.createElement(DC, {
    title: "Yellowstone Asset Management",
    subtitle: "Eight logo directions \xB7 forest green + cream"
  }, /*#__PURE__*/React.createElement(DCSection, {
    id: "primary",
    title: "Primary marks"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "l1",
    label: "01 \xB7 Crest monogram",
    width: 800,
    height: 500
  }, /*#__PURE__*/React.createElement(Logo01, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "l2",
    label: "02 \xB7 Wordmark only",
    width: 800,
    height: 500
  }, /*#__PURE__*/React.createElement(Logo02, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "l3",
    label: "03 \xB7 Roofline mark",
    width: 800,
    height: 500
  }, /*#__PURE__*/React.createElement(Logo03, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "l4",
    label: "04 \xB7 Letterpress seal",
    width: 800,
    height: 500
  }, /*#__PURE__*/React.createElement(Logo04, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "l5",
    label: "05 \xB7 Monolith block",
    width: 800,
    height: 500
  }, /*#__PURE__*/React.createElement(Logo05, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "l6",
    label: "06 \xB7 Horizon mark",
    width: 800,
    height: 500
  }, /*#__PURE__*/React.createElement(Logo06, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "l7",
    label: "07 \xB7 YAM monogram",
    width: 800,
    height: 500
  }, /*#__PURE__*/React.createElement(Logo07, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "l8",
    label: "08 \xB7 Doorway mark",
    width: 800,
    height: 500
  }, /*#__PURE__*/React.createElement(Logo08, null))), /*#__PURE__*/React.createElement(DCSection, {
    id: "checks",
    title: "Sanity checks"
  }, /*#__PURE__*/React.createElement(DCArtboard, {
    id: "reverse",
    label: "Reverse \xB7 forest bg",
    width: 800,
    height: 500
  }, /*#__PURE__*/React.createElement(LogoReverse, null)), /*#__PURE__*/React.createElement(DCArtboard, {
    id: "favicon",
    label: "Favicon scale",
    width: 800,
    height: 500
  }, /*#__PURE__*/React.createElement(MiniSet, null))));
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(/*#__PURE__*/React.createElement(LogoApp, null));
})();
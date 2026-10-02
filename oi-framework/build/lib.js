// Shared theme, layouts, content model and drawing helpers for the
// Outcome-First Challenge Journey decks (client deck + internal playbook).
const pptxgen = require("pptxgenjs");
const React = require("react");
const ReactDOMServer = require("react-dom/server");
const sharp = require("sharp");
const fa = require("react-icons/fa");

const THEME = {
  name: "Challenge Journey",
  headFontFace: "Cambria",
  bodyFontFace: "Calibri",
  colors: {
    dk1: "1A2B2E", // ink
    lt1: "FFFFFF",
    dk2: "0F4C4A", // deep teal (dominant)
    lt2: "EEF4F2", // mist
    accent1: "0F4C4A",
    accent2: "E8602C", // coral (sharp accent)
    accent3: "2E8C7E", // mid teal
    accent4: "F2B24C", // amber (gates)
    accent5: "5F7376", // slate
    accent6: "BFE0D8", // light mint
    hlink: "2E8C7E",
    folHlink: "5F7376",
  },
};
const H = THEME.colors; // hex, for hex-only options (shadows, backgrounds)

const W = 13.333, HGT = 7.5;
const FOOTER = "Outcome-First Challenge Journey";

function newDeck(title) {
  const pres = new pptxgen();
  pres.layout = "LAYOUT_WIDE";
  pres.theme = { headFontFace: THEME.headFontFace, bodyFontFace: THEME.bodyFontFace };
  pres.title = title;
  pres.author = "Open Innovation Practice";
  const C = pres.SchemeColor;
  const P = {
    ink: C.text1, teal: C.text2, white: C.background1, mist: C.background2,
    coral: C.accent2, mid: C.accent3, amber: C.accent4, slate: C.accent5, mint: C.accent6,
  };

  pres.defineSlideMaster({
    title: "Title Dark",
    background: { color: H.dk2 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 2.2, w: 11.7, h: 1.7,
        fontFace: THEME.headFontFace, fontSize: 44, bold: true, color: P.white, valign: "bottom", align: "left", margin: 0 }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 4.15, w: 11.0, h: 1.2,
        fontSize: 20, color: P.mint, valign: "top", align: "left", margin: 0 }, text: "" } },
    ],
  });
  pres.defineSlideMaster({
    title: "Section Dark",
    background: { color: H.dk2 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.8, y: 2.6, w: 11.7, h: 1.3,
        fontFace: THEME.headFontFace, fontSize: 40, bold: true, color: P.white, valign: "bottom", align: "left", margin: 0 }, text: "" } },
      { placeholder: { options: { name: "body", type: "body", x: 0.8, y: 4.05, w: 11.0, h: 1.0,
        fontSize: 18, color: P.mint, valign: "top", align: "left", margin: 0 }, text: "" } },
    ],
    slideNumber: { x: 12.3, y: 6.95, w: 0.6, h: 0.3, fontSize: 10, color: P.mint, align: "right" },
  });
  pres.defineSlideMaster({
    title: "Title Only",
    background: { color: H.lt1 },
    objects: [
      { placeholder: { options: { name: "title", type: "title", x: 0.6, y: 0.35, w: 12.1, h: 0.95,
        fontFace: THEME.headFontFace, fontSize: 28, bold: true, color: P.teal, valign: "middle", align: "left", margin: 0 }, text: "" } },
      { text: { text: FOOTER, options: { x: 0.6, y: 6.98, w: 6, h: 0.3, fontSize: 10, color: P.slate, margin: 0 } } },
    ],
    slideNumber: { x: 12.1, y: 6.98, w: 0.6, h: 0.3, fontSize: 10, color: P.slate, align: "right" },
  });
  return { pres, C, P };
}

// ---------- drawing helpers ----------
function T(slide, text, o) {
  slide.addText(text, Object.assign({ isTextBox: true, margin: 0, fontSize: 14, valign: "top", fit: "none" }, o));
}
function shadow() {
  return { type: "outer", color: "1A2B2E", opacity: 0.12, blur: 6, offset: 2, angle: 90 };
}
function card(slide, P, x, y, w, h, o = {}) {
  slide.addShape("roundRect", Object.assign({
    x, y, w, h, rectRadius: 0.08, fill: { color: o.fill || P.mist },
    line: { color: o.line || o.fill || P.mist, width: 0.75 },
  }, o.shadow ? { shadow: shadow() } : {}, o.name ? { objectName: o.name } : {}));
}
function bulletRuns(items, o = {}) {
  return items.map((t, i) => {
    const base = Object.assign({ bullet: o.bullet === false ? false : { indent: 14 }, paraSpaceAfter: o.gap ?? 5 }, o.run || {});
    if (i < items.length - 1) base.breakLine = true;
    if (Array.isArray(t)) { // [bold lead, rest]
      const rest = Object.assign({}, o.run || {});
      if (base.breakLine) rest.breakLine = true;
      return [{ text: t[0], options: Object.assign({}, base, { bold: true, breakLine: false }) },
              { text: t[1], options: rest }];
    }
    return [{ text: t, options: base }];
  }).flat();
}
function circleNum(slide, P, x, y, d, label, o = {}) {
  slide.addShape("ellipse", { x, y, w: d, h: d, fill: { color: o.fill || P.teal }, line: { color: o.fill || P.teal } });
  T(slide, String(label), { x, y, w: d, h: d, align: "center", valign: "middle", bold: true,
    fontSize: o.fontSize || Math.round(d * 26), color: o.color || P.white, fontFace: THEME.headFontFace });
}
function source(slide, P, text, y = 6.62) {
  T(slide, text, { x: 0.6, y, w: 12.1, h: 0.32, fontSize: 9.5, color: P.slate, italic: true, valign: "bottom" });
}
function table(slide, P, rows, o) {
  const fs = (o.fontSize || 11) + (o.bump ?? 1.5);
  const data = rows.map((r, ri) => r.map((cell) => {
    const opt = ri === 0
      ? { bold: true, color: P.white, fill: { color: P.teal }, fontSize: fs, valign: "middle" }
      : { color: P.ink, fill: { color: ri % 2 ? P.white : P.mist }, fontSize: fs, valign: "top" };
    if (typeof cell === "object" && cell !== null) return { text: cell.text, options: Object.assign(opt, cell.options || {}) };
    return { text: cell, options: opt };
  }));
  const opts = Object.assign({
    border: { type: "solid", pt: 0.5, color: H.accent6 }, margin: [4, 6, 4, 6], autoPage: false,
  }, o);
  delete opts.fontSize; delete opts.bump;
  slide.addTable(data, opts);
}

// ---------- icons ----------
async function icon(name, color = "#FFFFFF") {
  const svg = ReactDOMServer.renderToStaticMarkup(React.createElement(fa[name], { color, size: 256 }));
  const buf = await sharp(Buffer.from(svg)).png().toBuffer();
  return "image/png;base64," + buf.toString("base64");
}

// ---------- content model ----------
const PHASES = [
  { n: 1, name: "Commit", icon: "FaFlag", dur: "2–4 weeks",
    q: "What outcome do we need, and are we ready to act on the answer?",
    gate: "Ready to commit" },
  { n: 2, name: "Frame", icon: "FaCrosshairs", dur: "3–6 weeks",
    q: "Which problem, stated so the right outsiders recognize it?",
    gate: "Problem approved" },
  { n: 3, name: "Design", icon: "FaDraftingCompass", dur: "4–8 weeks",
    q: "Which mechanism, rules and incentives — and where will the winner land?",
    gate: "Design signed off" },
  { n: 4, name: "Mobilize", icon: "FaBullhorn", dur: "1–12 months",
    q: "Are the right solvers, including unexpected ones, competing?",
    gate: "Participation check" },
  { n: 5, name: "Select", icon: "FaBalanceScale", dur: "2–6 weeks",
    q: "Can we pick winners fairly, defensibly and on evidence?",
    gate: "Awards approved" },
  { n: 6, name: "Adopt", icon: "FaSeedling", dur: "3–24 months",
    q: "Does the solution get used, and does the capability stay?",
    gate: "Scale, iterate or stop" },
];

async function loadIcons() {
  const out = {};
  for (const p of PHASES) out[p.name] = await icon(p.icon);
  return out;
}

// One-page framework graphic. Draws within x..x+w, y..y+h.
function drawFramework(slide, P, icons, x = 0.6, y = 1.55, w = 12.1) {
  const n = PHASES.length, gap = 0.22;
  const colW = (w - gap * (n - 1)) / n;
  // stage bands
  const bands = [
    { label: "BEFORE LAUNCH", from: 0, to: 2 },
    { label: "IN MARKET", from: 3, to: 4 },
    { label: "AFTER AWARD", from: 5, to: 5 },
  ];
  for (const b of bands) {
    const bx = x + b.from * (colW + gap), bw = (b.to - b.from + 1) * colW + (b.to - b.from) * gap;
    T(slide, b.label, { x: bx, y, w: bw, h: 0.28, fontSize: 10.5, bold: true, color: P.slate, align: "center", charSpacing: 2 });
  }
  const cy = y + 0.38;
  PHASES.forEach((p, i) => {
    const cx = x + i * (colW + gap);
    card(slide, P, cx, cy, colW, 3.05, { fill: P.mist, name: `phase-${p.n}` });
    const d = 0.62;
    slide.addShape("ellipse", { x: cx + 0.18, y: cy + 0.2, w: d, h: d, fill: { color: P.teal }, line: { color: P.teal } });
    slide.addImage({ data: icons[p.name], x: cx + 0.18 + 0.16, y: cy + 0.2 + 0.16, w: 0.3, h: 0.3 });
    T(slide, String(p.n), { x: cx + colW - 0.62, y: cy + 0.18, w: 0.45, h: 0.6, fontSize: 30, bold: true,
      color: P.coral, align: "right", fontFace: THEME.headFontFace });
    T(slide, p.name, { x: cx + 0.18, y: cy + 0.95, w: colW - 0.3, h: 0.42, fontSize: 19, bold: true,
      color: P.teal, fontFace: THEME.headFontFace });
    T(slide, p.q, { x: cx + 0.18, y: cy + 1.4, w: colW - 0.32, h: 1.15, fontSize: 12.5, color: P.ink });
    T(slide, p.dur, { x: cx + 0.18, y: cy + 2.62, w: colW - 0.3, h: 0.3, fontSize: 11, color: P.slate, italic: true });
    // gate diamond + label beneath each phase
    const gy = cy + 3.22;
    slide.addShape("diamond", { x: cx + 0.18, y: gy, w: 0.3, h: 0.3, fill: { color: P.amber }, line: { color: P.amber } });
    T(slide, p.gate, { x: cx + 0.56, y: gy - 0.02, w: colW - 0.6, h: 0.34, fontSize: 11, bold: true, color: P.ink, valign: "middle" });
    if (i < n - 1) {
      slide.addShape("rightArrow", { x: cx + colW + 0.02, y: cy + 0.38, w: gap - 0.04, h: 0.26,
        fill: { color: P.coral }, line: { color: P.coral } });
    }
  });
  // cross-cutting capability layer
  const ly = cy + 3.75;
  card(slide, P, x, ly, w, 0.95, { fill: P.teal, name: "capability-layer" });
  T(slide, "Throughout: build a lasting capability", { x: x + 0.3, y: ly + 0.12, w: 4.2, h: 0.7, fontSize: 15, bold: true,
    color: P.white, valign: "middle", fontFace: THEME.headFontFace });
  T(slide, "Named sponsor and problem owner  ·  stakeholder governance and gates  ·  solver and partner network  ·  reusable rules, templates and metrics  ·  problem pipeline for the next challenge",
    { x: x + 4.5, y: ly + 0.12, w: w - 4.8, h: 0.7, fontSize: 12.5, color: P.mint, valign: "middle" });
}

// Small phase tracker shown under the title on phase slides.
function tracker(slide, P, current, x = 0.6, y = 1.45) {
  const w = 1.6, gap = 0.12;
  PHASES.forEach((p, i) => {
    const on = p.n === current;
    slide.addShape("roundRect", { x: x + i * (w + gap), y, w, h: 0.34, rectRadius: 0.17,
      fill: { color: on ? P.coral : P.mist }, line: { color: on ? P.coral : P.mist } });
    T(slide, `${p.n}  ${p.name}`, { x: x + i * (w + gap), y, w, h: 0.34, fontSize: 11, bold: on,
      color: on ? P.white : P.slate, align: "center", valign: "middle" });
  });
}

module.exports = { THEME, H, W, HGT, newDeck, T, card, bulletRuns, circleNum, source, table, icon, PHASES,
  loadIcons, drawFramework, tracker, shadow };

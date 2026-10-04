// NSF edition of the client deck: working session with NSF and Quantum+X industry collaborators.
// Built on the generic Challenge Journey template (lib.js); content traced to RFTP NOIS3-085.
const { applyTheme } = require(process.env.PPTX_SKILL + "/scripts/apply_theme.js");
const L = require("./lib");
const { T, card, bulletRuns, circleNum, source, table, PHASES, H } = L;

const OUT = process.argv[2] || "nsf_client.pptx";
const NAME = "NSF Quantum Algorithms Challenge"; // replace with the confirmed competition name

(async () => {
  const { pres, P } = L.newDeck(NAME + ": working session", { footer: NAME + "  ·  Working session with NSF and industry collaborators" });
  const icons = await L.loadIcons();
  const HF = L.THEME.headFontFace;
  const slide = (sec, title) => { const s = pres.addSlide({ masterName: "Title Only", sectionTitle: sec }); s.addText(title, { placeholder: "title" }); return s; };

  // ---------------- 1. Title ----------------
  pres.addSection({ title: "Context" });
  let s = pres.addSlide({ masterName: "Title Dark", sectionTitle: "Context" });
  s.addText(NAME, { placeholder: "title" });
  s.addText("Working session with NSF and Quantum+X industry collaborators\nFrom Phase 1 proposals to industry pilots  ·  October 2026", { placeholder: "body" });
  s.addNotes("Goal of the session: leave with the inputs and decisions the competition needs before rules go to NSF review in November and launch in early December. The deck is built around those asks; slides 13–17 are the ones to land: the logframe shows where the theory is riskiest, and the asks retire those risks.");

  // ---------------- 2. Context: Project Triad ----------------
  s = slide("Context", "The challenge is the first public execution of Quantum+X, inside NSF's Project Triad");
  const triad = [
    ["NSF National Quantum Virtual Laboratory", "Proof-of-concept integrated quantum system for experimentation and testing"],
    ["NSF X-Labs", "Milestone-funded teams solving specific engineering challenges such as interconnects and photonics"],
    ["NSF Quantum+X", "Works directly with industry on use cases in energy, finance, biotechnology, pharmaceuticals and more"],
  ];
  T(s, "Project Triad integrates quantum sensing, networking and computing into one operational system and moves it toward real-world use.", { x: 0.6, y: 1.5, w: 12.1, h: 0.45, fontSize: 15, color: P.ink });
  triad.forEach((t, i) => {
    const x = 0.6 + i * 4.1, hi = i === 2;
    card(s, P, x, 2.15, 3.85, 1.95, { fill: hi ? P.teal : P.mist, name: `triad-${i + 1}` });
    T(s, t[0], { x: x + 0.25, y: 2.3, w: 3.35, h: 0.65, fontSize: 15, bold: true, color: hi ? P.white : P.teal, valign: "middle" });
    T(s, t[1], { x: x + 0.25, y: 3.0, w: 3.35, h: 1.0, fontSize: 12.5, color: hi ? P.mint : P.ink });
  });
  s.addShape("downArrow", { x: 10.35, y: 4.2, w: 0.45, h: 0.4, fill: { color: P.coral }, line: { color: P.coral } });
  card(s, P, 0.6, 4.75, 12.1, 1.65, { fill: P.white, line: P.mint, name: "challenge-gap" });
  T(s, "The gap this challenge targets", { x: 0.9, y: 4.9, w: 5, h: 0.4, fontSize: 15, bold: true, color: P.coral });
  T(s, "Quantum hardware is advancing faster than the algorithms and software that would put it to real use. The challenge asks academics, developers, startups, students and multidisciplinary teams to propose, verify and validate quantum algorithms against realistic industry constraints, working with about eight collaborating U.S. companies.",
    { x: 0.9, y: 5.32, w: 11.5, h: 1.0, fontSize: 13, color: P.ink });
  source(s, P, "Sources: RFTP NOIS3-085 §1.2–1.3; NSF Project Triad announcement (July 2026) as reported by MeriTalk, Quantum Computing Report and The Quantum Insider.");
  s.addNotes("Keep this short. The room knows Triad. The one point to make: this is Quantum+X's first public program, so its visibility is high and its design sets a precedent for later Quantum+X tracks.");

  // ---------------- 3. Built-in landing zone ----------------
  s = slide("Context", "This challenge already has what most challenges lack: a place for winners to land");
  card(s, P, 0.6, 1.55, 5.7, 4.85, { fill: P.mist, name: "typical" });
  T(s, "The typical challenge", { x: 0.9, y: 1.75, w: 5.1, h: 0.45, fontSize: 18, bold: true, color: P.teal, fontFace: HF });
  T(s, bulletRuns([
    "The competition ends at the award.",
    "Winners go looking for a buyer or partner on their own.",
    "In one survey, 81% of corporate innovation programs turned fewer than 1 in 4 pilots into commercial deals.",
  ], { gap: 10, run: { fontSize: 14, color: P.ink } }), { x: 0.9, y: 2.35, w: 5.1, h: 3.0 });
  card(s, P, 6.6, 1.55, 6.1, 4.85, { fill: P.teal, name: "this-challenge" });
  T(s, "This challenge", { x: 6.9, y: 1.75, w: 5.5, h: 0.45, fontSize: 18, bold: true, color: P.white, fontFace: HF });
  T(s, bulletRuns([
    "Phase 2 pairs Phase 1 winners with industry partners that NSF has pre-qualified, each with a significant problem to solve.",
    "Teams design a solution with their partner, pilot it for about six months, then refine it and monitor results for about nine more.",
    "Phase 3 scales solutions toward commercial adoption.",
  ], { gap: 10, run: { fontSize: 14, color: P.white } }), { x: 6.9, y: 2.35, w: 5.5, h: 2.5 });
  T(s, [{ text: "The design implication: ", options: { bold: true, color: P.amber } }, { text: "Phase 1 must be built backward from Phase 2. The use cases, the winner count and the judging criteria should all serve the pairing.", options: { color: P.white } }],
    { x: 6.9, y: 4.95, w: 5.5, h: 1.3, fontSize: 13.5 });
  source(s, P, "Sources: RFTP NOIS3-085 §1.3 (Phase 2 and Phase 3); 500 Startups survey of 100+ corporate innovation programs, via Fortune (2017).");
  s.addNotes("This is the central idea of the session. Everything we ask of the collaborators later follows from it: if Phase 2 is the landing zone, the collaborators need to shape Phase 1 now, not after winners are chosen.");

  // ---------------- 4. Framework applied ----------------
  pres.addSection({ title: "Where we are" });
  s = slide("Where we are", "Our six-phase approach, applied: commitment is done, and the next 60 days decide the design");
  const status = [
    ["Done", P.mid, "Project Triad mandate; COMPETES and CHIPS prize authority; $1M Phase 1 purse; task order awarded"],
    ["In progress", P.coral, "Problem statement and use-case scope, anchored in collaborators' real constraints"],
    ["In progress", P.coral, "Prize structure, judging criteria, rules and participation agreement into NSF review in November"],
    ["Started", P.amber, "Splash page live; Quantum World Congress handout done. Window: early Dec 2026 to Mar 2027"],
    ["Apr–May 2027", P.slate, "Federal and industry judges; up to 40 winners; solutions to NSF by May 20, 2027"],
    ["Mid-2027–2029", P.slate, "Phase 2 pairing, six-month pilot, nine-month monitoring; Phase 3 scaling"],
  ];
  const colW = (12.1 - 0.22 * 5) / 6;
  PHASES.forEach((p, i) => {
    const x = 0.6 + i * (colW + 0.22), y = 1.6;
    card(s, P, x, y, colW, 4.4, { fill: P.mist, name: `phase-${p.n}` });
    s.addShape("ellipse", { x: x + 0.18, y: y + 0.2, w: 0.62, h: 0.62, fill: { color: P.teal }, line: { color: P.teal } });
    s.addImage({ data: icons[p.name], x: x + 0.34, y: y + 0.36, w: 0.3, h: 0.3 });
    T(s, String(p.n), { x: x + colW - 0.62, y: y + 0.18, w: 0.45, h: 0.6, fontSize: 30, bold: true, color: P.coral, align: "right", fontFace: HF });
    T(s, p.name, { x: x + 0.18, y: y + 0.95, w: colW - 0.3, h: 0.42, fontSize: 19, bold: true, color: P.teal, fontFace: HF });
    const st = status[i];
    s.addShape("roundRect", { x: x + 0.18, y: y + 1.45, w: colW - 0.36, h: 0.36, rectRadius: 0.18, fill: { color: st[1] }, line: { color: st[1] } });
    T(s, st[0], { x: x + 0.18, y: y + 1.45, w: colW - 0.36, h: 0.36, fontSize: 11.5, bold: true, color: P.white, align: "center", valign: "middle" });
    T(s, st[2], { x: x + 0.18, y: y + 1.95, w: colW - 0.32, h: 2.35, fontSize: 12, color: P.ink });
    if (i < 5) s.addShape("rightArrow", { x: x + colW + 0.02, y: y + 0.38, w: 0.18, h: 0.26, fill: { color: P.coral }, line: { color: P.coral } });
  });
  T(s, [{ text: "Today: ", options: { bold: true, color: P.coral } }, { text: "Frame and Design run in parallel, and both need inputs from the industry collaborators before rules are finalized." }],
    { x: 0.6, y: 6.2, w: 12.1, h: 0.4, fontSize: 13.5, color: P.ink });
  s.addNotes("Walk left to right briefly. The point: Commit is behind us, so this is not a 'should we' meeting; it's a 'what exactly' meeting. Frame and Design are open, and they close when the rules enter NSF review.");

  // ---------------- 5. Outcome ladder ----------------
  s = slide("Where we are", "The three NSF phases climb from ideas to pilots to markets, so each phase must screen for the next");
  const ladder = [
    ["Phase 1", "Proposal", "Attract new ideas", "Algorithms with real use cases, benchmarks and preliminary results. No quantum hardware required.", "Up to 40 × $25,000"],
    ["Phase 2", "Development", "Build prototypes and launch pilots", "Industry pairing, joint design, six-month pilot, nine-month monitoring.", "Purse and payer to be determined"],
    ["Phase 3", "Scaling and translation", "Stimulate markets", "Refine, scale and prepare for commercial adoption. Final versions may run on promising quantum hardware.", "Outside this task order"],
  ];
  ladder.forEach((l, i) => {
    const x = 0.6 + i * 4.1, y = 3.55 - i * 0.9, h = 2.85 + i * 0.9;
    const hi = i === 1;
    card(s, P, x, y, 3.85, h, { fill: hi ? P.teal : P.mist, name: `step-${i + 1}` });
    T(s, `${l[0]}  ·  ${l[1]}`, { x: x + 0.25, y: y + 0.18, w: 3.4, h: 0.35, fontSize: 12.5, bold: true, color: hi ? P.amber : P.coral });
    T(s, l[2], { x: x + 0.25, y: y + 0.55, w: 3.4, h: 0.75, fontSize: 17, bold: true, color: hi ? P.white : P.teal, fontFace: HF });
    T(s, l[3], { x: x + 0.25, y: y + 1.35, w: 3.4, h: 1.05, fontSize: 12.5, color: hi ? P.white : P.ink });
    T(s, l[4], { x: x + 0.25, y: y + h - 0.5, w: 3.4, h: 0.35, fontSize: 12, italic: true, color: hi ? P.mint : P.slate });
  });
  T(s, "Implication: Phase 1 judging should reward evidence that a team can work with an industry partner, not only algorithmic novelty.",
    { x: 0.6, y: 1.5, w: 7.7, h: 1.4, fontSize: 15, bold: true, color: P.teal, fontFace: HF });
  source(s, P, "Outcome labels follow Deloitte's prize-outcome typology (2014). Phase details: RFTP NOIS3-085 §1.3. Phase 2 purse, payer and number of prizes not yet determined (RFTP).");

  // ---------------- 6. Timeline ----------------
  s = slide("Where we are", "Timeline: launch in early December, winners by May 20, 2027, task order complete by October 1, 2029");
  const gx = 3.3, gw = 9.3, M = 37, gy = 1.6; // month 0 = Sep 2026
  const mx = (m) => gx + (m / M) * gw;
  [["Sep 2026", 0], ["Jan 2027", 4], ["Jan 2028", 16], ["Jan 2029", 28], ["Oct 2029", 37]].forEach(([lab, m]) => {
    s.addShape("line", { x: mx(m), y: gy + 0.35, w: 0, h: 4.1, line: { color: H.accent6, width: 0.75, dashType: "dash" } });
    T(s, lab, { x: mx(m) - 0.55, y: gy, w: 1.1, h: 0.3, fontSize: 11, color: P.slate, align: "center" });
  });
  const rows = [
    ["Stand-up: rules, website, USA.gov", 0.5, 3, P.teal, "Sep–Nov 2026"],
    ["Phase 1 submission window", 3, 7, P.coral, "Dec 2026–Mar 2027"],
    ["Judging, verification, awards", 7, 8.65, P.coral, "by May 20, 2027"],
    ["Phase 2 pairing event (third-party)", 9, 11, P.mid, "1–2 months after winners"],
    ["Phase 2 design, pilot, monitoring", 11, 29, P.mid, "~6-mo pilot + ~9-mo monitoring"],
    ["Phase 3 (outside this task order)", 29, 37, P.mint, "informational"],
  ];
  rows.forEach((r, i) => {
    const y = gy + 0.5 + i * 0.62;
    T(s, r[0], { x: 0.6, y, w: 2.6, h: 0.45, fontSize: 12.5, bold: true, color: P.teal, valign: "middle" });
    s.addShape("roundRect", { x: mx(r[1]), y: y + 0.06, w: mx(r[2]) - mx(r[1]), h: 0.34, rectRadius: 0.08, fill: { color: r[3] }, line: { color: r[3] } });
    const after = mx(r[2]) + 0.1;
    T(s, r[4], { x: after + 2.2 > 12.7 ? mx(r[1]) + 0.12 : after, y, w: 2.2, h: 0.45, fontSize: 11, italic: true, color: (r[3] === P.mint || after + 2.2 <= 12.7) ? P.slate : P.white, valign: "middle" });
  });
  // today marker
  const tx = mx(1.1);
  s.addShape("line", { x: tx, y: gy + 0.35, w: 0, h: 4.1, line: { color: H.accent2, width: 2 } });
  T(s, "Today", { x: tx - 0.4, y: gy + 4.5, w: 0.8, h: 0.3, fontSize: 11, bold: true, color: P.coral, align: "center" });
  T(s, "Done: splash page and Quantum World Congress handout (Sep 23–25, 2026)", { x: 3.3, y: gy + 4.85, w: 9.3, h: 0.3, fontSize: 12, color: P.ink });
  source(s, P, "RFTP NOIS3-085 §1.3, §3.1–3.2; proposed schedule (award assumed Sep 16, 2026). Phase 2 internal timing is indicative and depends on NSF decisions.", 6.6);

  // ---------------- 7. Frame ----------------
  pres.addSection({ title: "Design decisions" });
  s = slide("Design decisions", "Frame: industry use cases turn \"any quantum algorithm\" into problems worth solving");
  T(s, "What a Phase 1 submission must show", { x: 0.6, y: 1.5, w: 5.9, h: 0.4, fontSize: 15, bold: true, color: P.teal });
  T(s, bulletRuns([
    ["The algorithm: ", "novel, or a creative extension of an existing one."],
    ["The real-world use case ", "and the impact it could have."],
    ["Benchmarks ", "developed for it, with preliminary analyses and results showing efficacy."],
    ["The hardware and other resources ", "needed to implement it."],
  ], { gap: 9, run: { fontSize: 13.5, color: P.ink } }), { x: 0.6, y: 1.95, w: 5.9, h: 2.7 });
  card(s, P, 0.6, 4.75, 5.9, 1.65, { fill: P.mist, name: "framing-choice" });
  T(s, "The framing choice for NSF", { x: 0.85, y: 4.88, w: 5.4, h: 0.35, fontSize: 14, bold: true, color: P.coral });
  T(s, "Open sectors (energy, finance, biotechnology, pharmaceuticals and others), or anchored to problem areas the collaborators publish? Anchoring improves Phase 2 fit; staying open widens the solver pool.",
    { x: 0.85, y: 5.25, w: 5.4, h: 1.1, fontSize: 12.5, color: P.ink });
  card(s, P, 6.85, 1.5, 5.85, 4.9, { fill: P.teal, name: "use-case-brief" });
  T(s, "A collaborator use-case brief (one page)", { x: 7.1, y: 1.65, w: 5.4, h: 0.4, fontSize: 15, bold: true, color: P.white });
  T(s, bulletRuns([
    ["Problem area: ", "the business or scientific problem, in plain language."],
    ["Why it's hard classically: ", "the limits of current methods, in scale, accuracy or cost."],
    ["Realistic constraints: ", "data size and type, latency, accuracy thresholds."],
    ["What \"better\" looks like: ", "a measurable improvement over the classical baseline."],
    ["What can be shared: ", "public datasets or synthetic data; the brief can be anonymized."],
    ["Phase 2 offer: ", "data, compute or hardware access, and expert time."],
  ], { gap: 8, run: { fontSize: 12.5, color: P.white } }), { x: 7.1, y: 2.15, w: 5.4, h: 4.1 });
  source(s, P, "RFTP NOIS3-085 §1.3 (Phase 1 requirements). Brief structure adapts the problem-statement canvas (Spradlin, HBR 2012) to an industry partner. Abstraction lets solvers from distant fields contribute (Jeppesen & Lakhani, 2010).");
  s.addNotes("Ask the collaborators directly: could you write one page like this by mid-November? Anonymized is fine. This is the single most valuable input they can give Phase 1.");

  // ---------------- 8. Prize structure ----------------
  s = slide("Design decisions", "Prize structure: set the winner count by Phase 2 pairing capacity, and the award size by what a credible entry costs");
  table(s, P, [
    ["Option", "Structure ($1M)", "Strengths", "Watch-outs"],
    [{ text: "A · RFTP baseline", options: { bold: true } }, "40 × $25,000", "Widest funnel into Phase 2; rewards the most teams, including first-time NSF applicants", "With about 8 collaborators, roughly 5 winners per company to pair"],
    [{ text: "B · Tiered", options: { bold: true } }, "20 × $25,000 + 10 × $50,000", "Signals quality; the top tier could get pairing priority", "Needs judging precision at the tier line"],
    [{ text: "C · Fewer, larger", options: { bold: true } }, "20 × $50,000", "Matches tighter pairing capacity; a stronger incentive for benchmark-heavy work", "Narrower funnel; fewer teams reach Phase 2"],
    [{ text: "If the purse rises to $2M", options: { bold: true } }, "e.g., 40 × $50,000 (RFTP example)", "Larger awards at the same breadth", "Added by task order modification; decide timing relative to the rules"],
  ], { x: 0.6, y: 1.5, w: 12.1, colW: [2.4, 2.6, 3.8, 3.3], fontSize: 12 });
  card(s, P, 0.6, 4.75, 12.1, 1.6, { fill: P.mist, name: "prize-question" });
  T(s, "What we need to decide", { x: 0.85, y: 4.88, w: 5, h: 0.35, fontSize: 14, bold: true, color: P.coral });
  T(s, bulletRuns([
    "Collaborators: how many Phase 2 teams can each of you realistically take on?",
    "NSF: which option goes into the rules, and can the rules accommodate a later purse increase? (A question for NSF counsel.)",
  ], { gap: 5, run: { fontSize: 13, color: P.ink } }), { x: 0.85, y: 5.25, w: 11.6, h: 1.05 });
  source(s, P, "RFTP NOIS3-085 §1.3: \"open to contractors proposing a better alternative prize structure, if appropriate\"; $2M possibility and task order modification. Options B and C are illustrations for discussion.", 6.55);

  // ---------------- 9. Judging ----------------
  s = slide("Design decisions", "Judging: score each dimension separately, and manage conflicts where industry judges may later partner with teams");
  const crit = [
    ["Algorithmic novelty", "New, or a creative extension of an existing algorithm"],
    ["Use-case realism and impact", "A real problem under real constraints, with credible impact"],
    ["Evidence credibility", "Benchmarks and preliminary results compared with classical baselines"],
    ["Resource estimates", "Hardware and other resources needed, realistically assessed"],
    ["Phase 2 readiness (proposed)", "Team capacity and fit with an industry partner's problem"],
  ];
  crit.forEach((c, i) => {
    const x = 0.6 + i * 2.46, prop = i === 4;
    card(s, P, x, 1.5, 2.3, 2.15, { fill: prop ? P.white : P.mist, line: prop ? P.coral : P.mist, name: `criterion-${i + 1}` });
    circleNum(s, P, x + 0.18, 1.65, 0.45, i + 1, { fill: prop ? P.coral : P.teal, fontSize: 14 });
    T(s, c[0], { x: x + 0.18, y: 2.18, w: 1.95, h: 0.6, fontSize: 13.5, bold: true, color: P.teal });
    T(s, c[1], { x: x + 0.18, y: 2.8, w: 1.95, h: 0.8, fontSize: 11.5, color: P.ink });
  });
  T(s, "Process", { x: 0.6, y: 3.9, w: 5.8, h: 0.35, fontSize: 14, bold: true, color: P.teal });
  T(s, bulletRuns([
    "Eligibility and compliance screen as submissions arrive",
    "Technical pre-read flags submissions for the panel",
    "Calibrated federal and industry panel scores each dimension",
    "Divergent scores reconciled; NSF concurrence before any announcement",
  ], { gap: 5, run: { fontSize: 12.5, color: P.ink } }), { x: 0.6, y: 4.3, w: 5.8, h: 2.1 });
  card(s, P, 6.75, 3.9, 5.95, 2.5, { fill: P.teal, name: "guardrails" });
  T(s, "Guardrails", { x: 7.0, y: 4.02, w: 5.4, h: 0.35, fontSize: 14, bold: true, color: P.white });
  T(s, bulletRuns([
    "External judges only from designated countries under FAR 52.225-5",
    "NDA and conflict-of-interest attestation for every judge",
    "Industry judges recuse from teams they have ties to; agree on a rule for future Phase 2 partners",
    "Weights set with NSF and published in the rules",
  ], { gap: 5, run: { fontSize: 12, color: P.white } }), { x: 7.0, y: 4.42, w: 5.5, h: 1.9 });
  source(s, P, "Criteria 1–4 as proposed; criterion 5 is a proposal for discussion. RFTP NOIS3-085 §2.1.5 (judging; industry partners may provide judges; FAR 52.225-5).", 6.55);

  // ---------------- 10. Mobilize ----------------
  pres.addSection({ title: "Mobilize to adopt" });
  s = slide("Mobilize to adopt", "Mobilize: reach algorithm builders and domain experts alike, with deliberate reach into EPSCoR jurisdictions");
  const segs = [
    ["Quantum algorithm researchers", "NSF Quantum Leap Challenge Institutes; university quantum information science centers"],
    ["Quantum software startups", "Founders and developers building quantum software and tools"],
    ["National laboratory groups", "Quantum teams at DOE national labs and research centers"],
    ["Domain experts (the \"X\")", "Energy, finance, biotechnology and pharmaceutical specialists who can team with quantum researchers"],
    ["Students and early-career teams", "University programs and multidisciplinary student teams"],
    ["EPSCoR jurisdictions", "Emerging quantum ecosystems, reached through state EPSCoR offices and university programs"],
  ];
  segs.forEach((g, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.6 + col * 2.75, y = 1.5 + row * 2.0, hi = i === 5;
    card(s, P, x, y, 2.6, 1.85, { fill: hi ? P.teal : P.mist, name: `segment-${i + 1}` });
    T(s, g[0], { x: x + 0.18, y: y + 0.12, w: 2.25, h: 0.6, fontSize: 13, bold: true, color: hi ? P.white : P.teal, valign: "middle" });
    T(s, g[1], { x: x + 0.18, y: y + 0.75, w: 2.25, h: 1.05, fontSize: 11.5, color: hi ? P.mint : P.ink });
  });
  card(s, P, 9.0, 1.5, 3.7, 3.85, { fill: P.white, line: P.mint, name: "engagement" });
  T(s, "Engagement across the window", { x: 9.2, y: 1.62, w: 3.3, h: 0.35, fontSize: 13.5, bold: true, color: P.teal });
  T(s, bulletRuns([
    "Launch announcement and USA.gov posting",
    "Three collaborator webinars, hosted by a third party and promoted by us",
    "Registrant Q&A webinars",
    "Monthly report on the registrant pool and likely high-quality submitters",
    "Targeted pushes where the data shows gaps",
  ], { gap: 5, run: { fontSize: 11.5, color: P.ink } }), { x: 9.2, y: 2.02, w: 3.35, h: 3.25 });
  T(s, [{ text: "Already done: ", options: { bold: true, color: P.coral } }, { text: "splash page live to capture sign-ups; Quantum World Congress handout ready. A domain expert paired with a quantum researcher is the team most likely to clear the use-case bar." }],
    { x: 0.6, y: 5.6, w: 12.1, h: 0.75, fontSize: 12.5, color: P.ink });
  source(s, P, "RFTP NOIS3-085 §1.3 notes, §2.1.1.6, §2.1.4. Distant-field solvers win more often: Jeppesen & Lakhani (2010).", 6.55);

  // ---------------- 11. Select & comply ----------------
  s = slide("Mobilize to adopt", "Select and verify: NSF's eligibility and research-security requirements are built in from registration");
  const cols = [
    ["Eligibility to win", ["U.S.-incorporated entity, or U.S. citizen or permanent resident", "Not a federal entity or federal employee acting in that role", "Not an NSF employee acting personally", "Other federal employees consult their ethics official"]],
    ["Participation agreement", ["Indemnify the government against third-party claims", "Liability insurance, if NSF requires it", "IP remains with participants", "NSF research security certification (DCL 26-022)", "Privacy Act notice"]],
    ["NSF-format documents", ["Biographical sketch in SciENcv format", "Current and Pending (Other) Support", "Collaborators and Other Affiliations", "Tip: first-time NSF applicants will need a short guide and office hours"]],
  ];
  cols.forEach((c, i) => {
    const x = 0.6 + i * 4.1, hi = i === 1;
    card(s, P, x, 1.5, 3.85, 3.95, { fill: hi ? P.teal : P.mist, name: `comply-${i + 1}` });
    T(s, c[0], { x: x + 0.25, y: 1.65, w: 3.4, h: 0.4, fontSize: 15, bold: true, color: hi ? P.white : P.teal });
    T(s, bulletRuns(c[1], { gap: 6, run: { fontSize: 12.5, color: hi ? P.white : P.ink } }), { x: x + 0.25, y: 2.15, w: 3.4, h: 3.2 });
  });
  T(s, [{ text: "Hard date: ", options: { bold: true, color: P.coral } }, { text: "winners verified, paid through the administrator, and all Phase 1 solutions delivered to NSF by May 20, 2027." }],
    { x: 0.6, y: 5.7, w: 12.1, h: 0.45, fontSize: 13.5, color: P.ink });
  source(s, P, "RFTP NOIS3-085 §2.1.2.2, §2.1.6.1–2.1.6.2, §3.1. Participation is limited to the U.S.", 6.55);

  // ---------------- 12. Adopt ----------------
  s = slide("Mobilize to adopt", "Adopt: three things must be true before launch for Phase 2 pairings to succeed");
  const conds = [
    ["Problems are visible early", "Collaborators' problem areas are published at launch, so Phase 1 teams can aim at them."],
    ["Capacity matches the winner count", "Each collaborator knows how many teams it can pair with, and what data, compute or hardware it can offer."],
    ["The pairing path is clear", "Winners know before they apply what Phase 2 involves: the pairing event, pilot, monitoring and any Phase 2 prize."],
  ];
  conds.forEach((c, i) => {
    const y = 1.55 + i * 1.3;
    circleNum(s, P, 0.6, y + 0.12, 0.65, i + 1, { fill: P.coral, fontSize: 20 });
    T(s, c[0], { x: 1.45, y, w: 6.2, h: 0.45, fontSize: 16, bold: true, color: P.teal, fontFace: HF });
    T(s, c[1], { x: 1.45, y: y + 0.45, w: 6.2, h: 0.75, fontSize: 13, color: P.ink });
  });
  card(s, P, 8.0, 1.5, 4.7, 4.9, { fill: P.mist, name: "phase2-flow" });
  T(s, "Phase 2 as written", { x: 8.25, y: 1.65, w: 4.2, h: 0.4, fontSize: 15, bold: true, color: P.teal });
  const flow = ["In-person pairing event with pre-qualified partners (third-party host), 1–2 months after winners", "Joint solution design with the industry partner", "About six months of piloting", "About nine months of refinement, implementation and monitoring", "Virtual status webinar at the midpoint"];
  flow.forEach((f, i) => {
    const y = 2.15 + i * 0.83;
    s.addShape("ellipse", { x: 8.25, y: y + 0.08, w: 0.3, h: 0.3, fill: { color: i === 4 ? P.amber : P.teal }, line: { color: i === 4 ? P.amber : P.teal } });
    T(s, f, { x: 8.7, y, w: 3.85, h: 0.75, fontSize: 12, color: P.ink });
  });
  T(s, "IP remains with participants, so collaborators and teams agree their own terms for Phase 2 work.", { x: 0.6, y: 5.5, w: 7.1, h: 0.8, fontSize: 12.5, italic: true, color: P.slate });
  source(s, P, "RFTP NOIS3-085 §1.3 (Phase 2), §2.1.4 (industry collaborators), §2.1.6.1.3 (IP).", 6.55);

  // ---------------- 13. Logframe ----------------
  pres.addSection({ title: "Logic and risks" });
  s = slide("Logic and risks", "Logframe: the challenge's theory of change, and where its assumptions are weakest");
  const R = (lvl) => ({ text: lvl + "  ", options: { bold: true, color: lvl === "HIGH" ? P.coral : lvl === "WATCH" ? P.slate : P.mid } });
  const cellRuns = (lvl, txt) => ({ text: [R(lvl), { text: txt, options: { color: P.ink } }] });
  const lv = (t, sub) => ({ text: [{ text: t, options: { bold: true, color: P.teal, breakLine: true } }, { text: sub, options: { color: P.slate, italic: true } }] });
  table(s, P, [
    ["Level", "What we aim for", "Indicators", "How we'll know", "Assumptions needed to reach the level above"],
    [lv("Goal", "Project Triad"), "Quantum technology moves from the lab into real-world use in U.S. industry", "Solutions adopted commercially; follow-on funding and contracts", "NSF Quantum+X tracking; 12–36-month follow-up", cellRuns("WATCH", "Quantum+X continues after this challenge, and later tracks reuse what it builds")],
    [lv("Purpose", "Phase 2 outcome"), "Industry-paired teams validate quantum algorithms on real problems", "Pairings formed; pilots launched; pilots meeting agreed success criteria", "Phase 2 status webinar; collaborator reports; close-out", cellRuns("HIGH", "Pilots lead to adoption, and quantum hardware matures enough to run the algorithms at useful scale (largely outside our control)")],
    [lv("Outputs", "Phase 1 results"), "Up to 40 credible proposals with real use cases and benchmarks; winners verified and solutions to NSF by May 20, 2027", "Qualified submissions; share with classical baselines; EPSCoR share; on-time verification", "Platform data; judging records; RFTP §4.3 reports", cellRuns("HIGH", "Winners fit collaborator problems; pairing capacity matches the winner count; the Phase 2 prize and terms keep teams engaged")],
    [lv("Activities", "Our delivery"), "Rules, website, outreach incl. EPSCoR, webinars, judging, verification and payment, pairing logistics", "Launch in early Dec 2026; milestones on schedule", "Status meetings; pre- and post-competition reports", cellRuns("MEDIUM", "Enough qualified, diverse teams enter despite the quantum skills barrier and NSF-format documents, and paper proposals can be judged credibly")],
  ], { x: 0.6, y: 1.5, w: 12.1, colW: [1.45, 2.85, 2.45, 2.2, 3.15], fontSize: 11, bump: 1.5 });
  T(s, [{ text: "Read bottom-up: ", options: { bold: true, color: P.teal } }, { text: "if the activities happen and their assumptions hold, the outputs follow; if the outputs land and their assumptions hold, the purpose follows; and so on up to the goal. Preconditions for the activities: rules through NSF review by November, and collaborator inputs by mid-November." }],
    { x: 0.6, y: 5.95, w: 12.1, h: 0.6, fontSize: 12, color: P.ink });
  source(s, P, "Logical framework format (narrative, indicators, means of verification, assumptions). Content: RFTP NOIS3-085 §1.2–1.3, §2.1, §3.1, §4.3. Risk ratings are our assessment for discussion.", 6.62);
  s.addNotes("Don't walk every cell. Point to the right-hand column: that's where the risk is. Most of it sits in the jump from Phase 1 outputs to Phase 2 outcomes, and that's exactly what the collaborators control. Then move to the next slide.");

  // ---------------- 14. Riskiest assumptions ----------------
  s = slide("Logic and risks", "The four assumptions to test early, and one to watch");
  const ra = [
    ["HIGH", "Collaborators can pair with the number of winners", "If not, winners have nowhere to go", "Each company names a team count", "Late Oct 2026", "Ask 1"],
    ["HIGH", "Paper proposals can show real quantum value", "Claims of advantage are hard to verify without hardware", "Mock-judge two or three sample entries against classical baselines", "Jan 2027", "Judging design"],
    ["HIGH", "The Phase 2 incentive and terms keep winners engaged", "The Phase 2 prize, payer and IP terms are undetermined", "NSF decides the Phase 2 prize; partner guidance on terms", "Before winners are announced", "NSF decision"],
    ["MEDIUM", "Enough qualified, diverse teams enter", "Quantum skills barrier, NSF-format documents, holiday launch", "Monthly registrant-quality report; EPSCoR share; January push", "Jan–Mar 2027", "Outreach"],
    ["WATCH", "Hardware matures in time for Phase 3", "Outside the challenge's control", "Require resource estimates; hardware not required in Phase 1", "Ongoing", "—"],
  ];
  const head = ["Risk", "Assumption", "Why it's risky", "Early test or signal", "When", "Linked to"];
  table(s, P, [head, ...ra.map((r) => [
    { text: r[0], options: { bold: true, color: r[0] === "HIGH" ? P.coral : r[0] === "WATCH" ? P.slate : P.mid } },
    { text: r[1], options: { bold: true } }, r[2], r[3], r[4], r[5]])],
  { x: 0.6, y: 1.5, w: 12.1, colW: [1.0, 2.9, 2.75, 2.95, 1.35, 1.15], fontSize: 12, bump: 1.5 });
  card(s, P, 0.6, 5.3, 12.1, 1.05, { fill: P.teal, name: "logframe-takeaway" });
  T(s, [{ text: "The takeaway: ", options: { bold: true, color: P.amber } }, { text: "two of the three high risks sit in the handoff from Phase 1 to Phase 2, and the third in how Phase 1 is judged. Collaborator inputs and NSF's Phase 2 decisions retire the first two (the next two slides), and the judging design addresses the third.", options: { color: P.white } }],
    { x: 0.85, y: 5.38, w: 11.6, h: 0.9, fontSize: 13.5, valign: "middle" });
  source(s, P, "Ratings are our working assessment; revisit them at each gate.", 6.55);

  // ---------------- 13. Asks of industry ----------------
  pres.addSection({ title: "Asks and next steps" });
  s = slide("Asks and next steps", "What we ask of the industry collaborators");
  table(s, P, [
    ["Ask", "What it involves", "Needed by"],
    [{ text: "1 · Phase 2 pairing capacity", options: { bold: true } }, "How many teams each company can take on, and what data, compute or hardware access it can offer", "Late October 2026"],
    [{ text: "2 · Use-case brief", options: { bold: true } }, "One page per company on a problem area, publishable at launch; anonymized is fine", "Mid-November 2026"],
    [{ text: "3 · Webinar speakers", options: { bold: true } }, "Speakers for the three third-party-hosted collaborator webinars", "December 2026–March 2027"],
    [{ text: "4 · Amplification", options: { bold: true } }, "Share the launch through developer communities, partner networks and social channels", "Early December 2026"],
    [{ text: "5 · Judges", options: { bold: true } }, "Nominate technical reviewers (subject to FAR 52.225-5 and conflict-of-interest rules)", "January 2027, before training"],
  ], { x: 0.6, y: 1.5, w: 12.1, colW: [3.1, 6.4, 2.6], fontSize: 13, bump: 2.5 });
  source(s, P, "Dates work back from rules entering NSF review in November and launch in the first week of December 2026. RFTP NOIS3-085 §2.1.4, §2.1.5.2.1.");
  s.addNotes("Close the collaborator part of the session by confirming a named contact at each company for asks 1 and 2. Without those, the prize structure and the problem framing stay open past the rules deadline.");

  // ---------------- 14. NSF decisions ----------------
  s = slide("Asks and next steps", "Decisions we need from NSF to keep the December launch");
  table(s, P, [
    ["Decision", "Options or input", "Needed by"],
    [{ text: "Use-case scope", options: { bold: true } }, "Open sectors, or anchored to collaborator problem areas", "October 2026"],
    [{ text: "Prize structure and winner count", options: { bold: true } }, "Option A, B or C, informed by collaborators' pairing capacity", "Early November 2026"],
    [{ text: "Judging criteria and weights", options: { bold: true } }, "Four proposed dimensions, plus Phase 2 readiness; judge mix; industry conflict-of-interest rule", "November 2026"],
    [{ text: "Review calendar", options: { bold: true } }, "Two-week media review windows mapped to rules, site, launch and webinars", "October 2026"],
    [{ text: "$2M purse timing", options: { bold: true } }, "Decide before launch if possible, or confirm the rules can absorb a later increase", "Before launch"],
    [{ text: "Phase 2 prize", options: { bold: true } }, "Size, number of prizes, and whether NSF or the administrator pays", "Before Phase 1 winners are announced"],
  ], { x: 0.6, y: 1.5, w: 12.1, colW: [3.2, 6.3, 2.6], fontSize: 13, bump: 2.5 });
  source(s, P, "RFTP NOIS3-085 §1.3 (prize notes), §2.1.4.2.1 (media review), §2.1.5. Phase 2 prize and payer are undetermined in the RFTP.");

  // ---------------- 15. Next 90 days ----------------
  s = slide("Asks and next steps", "The next 90 days: from today to launch");
  const months = [
    ["October", ["Collect pairing capacity and use-case scope", "Draft rules and participation agreement", "Set the review calendar with NSF", "Splash page keeps collecting sign-ups"]],
    ["November", ["Rules, agreement and website complete NSF review", "Use-case briefs in hand", "USA.gov posting prepared", "Pre-launch report filed one week before go-live"]],
    ["December", ["Launch in the first week; announcement to the community", "Registrant Q&A webinar", "First collaborator webinar promoted", "Judge recruitment begins"]],
    ["January–March", ["Monthly registrant-quality reports", "Targeted pushes, including EPSCoR", "Judge training before April", "Submissions close in March 2027"]],
  ];
  months.forEach((m, i) => {
    const x = 0.6 + i * 3.08;
    circleNum(s, P, x, 1.55, 0.55, i + 1, { fill: i === 0 ? P.coral : P.teal, fontSize: 17 });
    if (i < 3) s.addShape("line", { x: x + 0.65, y: 1.825, w: 2.33, h: 0, line: { color: H.accent6, width: 2 } });
    card(s, P, x, 2.3, 2.85, 3.9, { fill: i === 0 ? P.teal : P.mist, name: `month-${i + 1}` });
    T(s, m[0], { x: x + 0.2, y: 2.45, w: 2.5, h: 0.4, fontSize: 16, bold: true, color: i === 0 ? P.white : P.teal, fontFace: HF });
    T(s, bulletRuns(m[1], { gap: 7, run: { fontSize: 12.5, color: i === 0 ? P.white : P.ink } }), { x: x + 0.2, y: 2.95, w: 2.5, h: 3.15 });
  });
  source(s, P, "Follows the proposed schedule: stand-up September–November 2026; launch in the first week of December 2026; submissions through March 2027.", 6.5);

  // ---------------- 16. Sources ----------------
  pres.addSection({ title: "Appendix" });
  s = slide("Appendix", "Sources");
  const src = [
    "NASA NOIS3 Request for Task Plan NOIS3-085: U.S. National Science Foundation Quantum Algorithm Challenge (released Aug 27, 2026)",
    "NSF Project Triad announcement (July 2026), as reported by MeriTalk, Quantum Computing Report and The Quantum Insider",
    "NSF, Project Triad initiative page (nsf.gov/funding/initiatives/project-triad)",
    "America COMPETES Act, 15 U.S.C. §3719; CHIPS and Science Act, 42 U.S.C. §19101 et seq.",
    "NSF Dear Colleague Letter 26-022 (research security)",
    "Deloitte GovLab (2014), The Craft of Incentive Prize Design",
    "Jeppesen & Lakhani (2010), Marginality and Problem-Solving Effectiveness in Broadcast Search, Organization Science",
    "Spradlin (2012), Are You Solving the Right Problem?, Harvard Business Review",
    "500 Startups survey of corporate innovation programs, reported in Fortune (2017)",
  ];
  T(s, bulletRuns(src, { gap: 8, run: { fontSize: 13.5, color: P.ink } }), { x: 0.6, y: 1.5, w: 12.1, h: 5.2 });

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, L.THEME);
  console.log("wrote", OUT);
})();

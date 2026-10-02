// Client-facing deck: 60–90 minute introductory meeting.
const path = require("path");
const { applyTheme } = require(process.env.PPTX_SKILL + "/scripts/apply_theme.js");
const L = require("./lib");
const { T, card, bulletRuns, circleNum, source, PHASES, H } = L;

const OUT = process.argv[2] || "client.pptx";

(async () => {
  const { pres, P } = L.newDeck("From Problem to Adoption");
  const icons = await L.loadIcons();
  const ic = {};
  for (const n of ["FaUsers", "FaChartLine", "FaHandshake", "FaLightbulb", "FaSearch", "FaRoute", "FaUniversity",
    "FaLandmark", "FaCogs", "FaGavel", "FaFileContract", "FaCoins", "FaBullhorn", "FaUserTie", "FaClipboardCheck"]) ic[n] = await L.icon(n);

  // ---------------- 1. Title ----------------
  pres.addSection({ title: "Opening" });
  let s = pres.addSlide({ masterName: "Title Dark", sectionTitle: "Opening" });
  s.addText("From problem to adoption", { placeholder: "title" });
  s.addText("An outcome-first approach to open innovation challenges and prizes\nDiscussion document  ·  Prepared for [Client]  ·  October 2026", { placeholder: "body" });
  s.addNotes("Purpose of the meeting: share how we approach open innovation challenges, test where you are on the journey, and agree a first step. Keep this to a conversation — the framework is a tool for deciding, not a sales pitch for a prize.");

  // ---------------- 2. Why challenges ----------------
  s = pres.addSlide({ masterName: "Title Only", sectionTitle: "Opening" });
  s.addText("Well-designed challenges reach solvers that your own networks never would", { placeholder: "title" });
  const stats = [
    { big: "10×", label: "Leverage on the purse", body: "26 teams spent more than $100M competing for the $10M Ansari XPRIZE." },
    { big: "Outsiders", label: "Distant-field solvers win more often", body: "Across 166 science challenges and 12,000+ solvers, the further a solver's field was from the problem's, the likelier they were to solve it." },
    { big: "$194M", label: "Federal prize purses", body: "251 US federal prize competitions ran in FY2021–22. Prizes are now a mainstream tool, not an experiment." },
    { big: "Pay for", label: "results, not proposals", body: "A prize pays only when the outcome is achieved, shifting technical risk to the teams that choose to compete." },
  ];
  stats.forEach((st, i) => {
    const x = 0.6 + i * 3.08, y = 1.75;
    card(s, P, x, y, 2.85, 4.35, { fill: i === 1 ? P.teal : P.mist, name: `stat-${i + 1}` });
    const dark = i === 1;
    T(s, st.big, { x: x + 0.25, y: y + 0.35, w: 2.4, h: 1.0, fontSize: st.big.length > 7 ? 34 : st.big.length > 4 ? 40 : 54, bold: true,
      color: dark ? P.white : P.coral, fontFace: L.THEME.headFontFace, valign: "bottom" });
    T(s, st.label, { x: x + 0.25, y: y + 1.45, w: 2.4, h: 0.5, fontSize: 15, bold: true, color: dark ? P.mint : P.teal });
    T(s, st.body, { x: x + 0.25, y: y + 2.05, w: 2.4, h: 2.1, fontSize: 13.5, color: dark ? P.white : P.ink });
  });
  source(s, P, "Sources: XPRIZE / Ansari X Prize history; Jeppesen & Lakhani, Organization Science (2010); OSTP, Implementation of Federal Prize Authority FY2021–22 (2024).");
  s.addNotes("Lead with the distant-solver finding: it is the most counterintuitive and the most important for design. It is why we spend so much effort writing the problem so outsiders recognize it.");

  // ---------------- 3. Why they fail ----------------
  s = pres.addSlide({ masterName: "Title Only", sectionTitle: "Opening" });
  s.addText("Disappointing challenges usually fail before launch or after the award, not during the competition", { placeholder: "title" });
  const fail = [
    { h: "Before launch", tag: "Most failures start here", fill: P.teal, items: [
      ["Wrong problem. ", "The answer is obvious or can be bought, or the problem is too vague or confidential to publish."],
      ["No owner. ", "The problem belongs to someone who is not in the room and will not use the result."],
      ["Mis-sized incentives. ", "The purse is too small for the effort asked, or the IP terms scare off the best solvers."],
      ["Under-budgeted. ", "In disclosed federal cases, running a small prize cost 1.7× to 11× its purse."],
    ] },
    { h: "During", tag: "Usually recoverable", fill: P.mist, items: [
      ["Thin participation. ", "Outreach stays inside the obvious field."],
      ["Contested judging. ", "Criteria are unmeasurable or drift."],
    ] },
    { h: "After the award", tag: "The most expensive failure", fill: P.teal, items: [
      ["Solution orphans. ", "81% of corporate innovation programs converted fewer than 1 in 4 startup pilots into commercial deals."],
      ["Late procurement. ", "There is no contract or pilot route, so winners wait for months."],
      ["Not invented here. ", "Internal experts treat outside answers as a threat."],
    ] },
  ];
  const fw = [4.4, 3.0, 4.3];
  let fx = 0.6;
  fail.forEach((f, i) => {
    const dark = f.fill === P.teal;
    card(s, P, fx, 1.6, fw[i], 4.85, { fill: f.fill, name: `fail-${i + 1}` });
    T(s, f.h, { x: fx + 0.3, y: 1.82, w: fw[i] - 0.6, h: 0.45, fontSize: 19, bold: true, color: dark ? P.white : P.teal, fontFace: L.THEME.headFontFace });
    T(s, f.tag, { x: fx + 0.3, y: 2.27, w: fw[i] - 0.6, h: 0.32, fontSize: 12, italic: true, color: dark ? P.amber : P.coral });
    T(s, bulletRuns(f.items, { gap: 9, run: { color: dark ? P.white : P.ink, fontSize: 13.5 } }), { x: fx + 0.3, y: 2.75, w: fw[i] - 0.55, h: 3.55 });
    fx += fw[i] + 0.2;
  });
  source(s, P, "Sources: Nextgov (2012) on White House-disclosed prize administration costs; 500 Startups survey of 100+ corporate innovation programs, via Fortune (2017); Lifshitz-Assaf, NYU Stern, on NASA open innovation.");
  s.addNotes("The message: the competition itself is the easy part. Our framework puts most of the effort into the two places where challenges actually fail — the front end (problem and design) and the back end (adoption).");

  // ---------------- 4. Principles ----------------
  pres.addSection({ title: "Our approach" });
  s = pres.addSlide({ masterName: "Title Only", sectionTitle: "Our approach" });
  s.addText("Six principles that the best practitioners agree on", { placeholder: "title" });
  const princ = [
    ["Start from the outcome, not the prize", "Decide whether you need ideas, prototypes, a market, awareness, action or transformation. Then design backward from it.", "Deloitte (2014); NASA outcome-driven open innovation"],
    ["Treat a challenge as one tool among several", "Test it against scouting, contracts, grants and internal R&D. If the answer can be bought, buy it.", "OSTP; XPRIZE \"can a prize help?\"; Boudreau & Lakhani (2013)"],
    ["Treat the problem statement as the product", "Define the need rigorously, then strip out jargon so solvers from distant fields recognize their expertise.", "Spradlin, HBR (2012); Jeppesen & Lakhani (2010)"],
    ["Front-load the effort", "The best prizes spend months on landscape and design with experts and likely competitors before announcing a purse.", "McKinsey (2009); XPRIZE prize design"],
    ["Design the ending first", "Fix the landing zone (adoption owner, budget, pilot or procurement route) before launch, not after the award.", "Challenge.gov \"Transition\"; MITRE on prize-to-procurement"],
    ["Leave a capability, not an event", "The network, templates and internal champions should outlast the challenge and feed the next one.", "DOE American-Made; NASA CoECI; Nesta"],
  ];
  princ.forEach((p, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.6 + col * 4.1, y = 1.6 + row * 2.55;
    card(s, P, x, y, 3.85, 2.35, { fill: P.mist, name: `principle-${i + 1}` });
    circleNum(s, P, x + 0.25, y + 0.25, 0.5, i + 1, { fill: P.coral, fontSize: 16 });
    T(s, p[0], { x: x + 0.9, y: y + 0.22, w: 2.8, h: 0.62, fontSize: 15, bold: true, color: P.teal, valign: "middle" });
    T(s, p[1], { x: x + 0.25, y: y + 0.95, w: 3.4, h: 1.0, fontSize: 12.5, color: P.ink });
    T(s, p[2], { x: x + 0.25, y: y + 1.95, w: 3.4, h: 0.3, fontSize: 9.5, italic: true, color: P.slate });
  });
  s.addNotes("These six principles are distilled from McKinsey, Deloitte, the Challenge.gov toolkit, XPRIZE, Nesta/Challenge Works, InnoCentive/Wazoku and Harvard LISH research. Every phase of the journey enforces at least one of them.");

  // ---------------- 5. Framework ----------------
  s = pres.addSlide({ masterName: "Title Only", sectionTitle: "Our approach" });
  s.addText("The Challenge Journey: six phases, each ending in a decision gate", { placeholder: "title" });
  L.drawFramework(s, P, icons, 0.6, 1.45, 12.1);
  s.addNotes("This is the one-page view. Walk it left to right. Stress three things: (1) half the phases happen before anything is announced; (2) every phase ends in an explicit decision, including the decision not to proceed; (3) the bottom band — the capability — is what makes the second challenge cheaper and better than the first. Durations are typical ranges, not commitments.");

  // ---------------- 6. Tool choice ----------------
  s = pres.addSlide({ masterName: "Title Only", sectionTitle: "Our approach" });
  s.addText("The first decision: is a challenge the right tool for this problem at all?", { placeholder: "title" });
  const qs = [
    ["Does a workable solution probably already exist somewhere?", "Technology scouting or a targeted partner search", "License or partner for it, don't reinvent it"],
    ["Is the work well defined, with known skills required?", "Crowd labor market or invited contest", "Many entrants lower effort per entrant on well-specified tasks"],
    ["Must contributions build on one another?", "Collaborative community", "Open-source-style cumulative work"],
    ["Is it novel and uncertain, with measurable success?", "Open challenge or prize", "Many independent attempts surface extreme-value solutions"],
  ];
  qs.forEach((q, i) => {
    const y = 1.6 + i * 1.12;
    card(s, P, 0.6, y, 5.6, 0.92, { fill: P.mist, name: `question-${i + 1}` });
    T(s, `Q${i + 1}`, { x: 0.8, y, w: 0.6, h: 0.92, fontSize: 18, bold: true, color: P.coral, valign: "middle", fontFace: L.THEME.headFontFace });
    T(s, q[0], { x: 1.4, y, w: 4.6, h: 0.92, fontSize: 14, color: P.ink, valign: "middle" });
    s.addShape("rightArrow", { x: 6.35, y: y + 0.3, w: 0.55, h: 0.32, fill: { color: P.coral }, line: { color: P.coral } });
    T(s, "YES", { x: 6.35, y: y + 0.02, w: 0.55, h: 0.26, fontSize: 9.5, bold: true, color: P.slate, align: "center" });
    const last = i === qs.length - 1;
    card(s, P, 7.05, y, 5.65, 0.92, { fill: last ? P.teal : P.white, line: last ? P.teal : P.mint, name: `answer-${i + 1}` });
    T(s, q[1], { x: 7.3, y: y + 0.1, w: 5.2, h: 0.4, fontSize: 15, bold: true, color: last ? P.white : P.teal });
    T(s, q[2], { x: 7.3, y: y + 0.5, w: 5.2, h: 0.35, fontSize: 12, color: last ? P.mint : P.slate });
  });
  T(s, [{ text: "If the answer to every question is no: ", options: { bold: true } }, { text: "use a grant, a contract or internal R&D. Prizes tend to suit well-defined leaps better than open-ended basic research." }],
    { x: 0.6, y: 6.1, w: 12.1, h: 0.4, fontSize: 13, color: P.ink });
  source(s, P, "Sources: Boudreau & Lakhani, HBR (2013); Boudreau, Lacetera & Lakhani, Management Science (2011); Pisano & Verganti, HBR (2008); InnoCentive/Wazoku challenge types.", 6.55);
  s.addNotes("Ask the questions in order — they are a sieve. Most first-time sponsors assume they need a prize; a meaningful share actually need scouting. Saying so builds trust.");

  // ---------------- 7–12. Phase slides ----------------
  pres.addSection({ title: "The six phases" });
  const detail = [
    { title: "1 · Commit: agree the outcome and confirm the organization can act on the answer",
      do: [
        ["Choose the outcome: ", "new ideas, prototypes and pilots, a market, awareness, action or transformation."],
        ["Assess readiness ", "on eight dimensions, from sponsor and owner to budget, IP, capacity to absorb a solution and adoption route."],
        ["Name ", "an executive sponsor and a problem owner who will personally use the result."],
        ["Test the alternatives: ", "scouting, grant, contract or internal R&D."],
      ],
      get: ["Outcome statement", "Readiness scorecard with gaps and fixes", "Sponsor and owner commitments", "Go / no-go recommendation"],
      gate: ["Problem owner named and engaged", "Funding covers operations and transition, not just the purse", "No red flags on ownership, capacity or adoption route"],
      anchor: "Deloitte, Craft of Incentive Prize Design (2014); Challenge.gov toolkit \"Prepare\"; NASA@Work requires owners to own the problem." },
    { title: "2 · Frame: find the right problem and state it so unexpected solvers recognize it",
      do: [
        ["Discover: ", "interview owners and mine roadmaps for a long list of gaps."],
        ["Prioritize: ", "score each candidate on challenge fit and select one to three."],
        ["Define: ", "establish and justify the need, set its context, then write the statement."],
        ["Abstract: ", "remove jargon and confidential detail, and break big problems into solvable modules."],
        ["Test ", "the draft with a few likely solvers before anything is published."],
      ],
      get: ["Problem long list with fit scores", "Problem statement: internal and solver-facing versions", "Measurable success criteria", "Landscape of what has been tried"],
      gate: ["Owner signs off the statement", "Success can be measured and judged objectively", "Publishable without confidential detail; not purchasable today"],
      anchor: "Spradlin, \"Are You Solving the Right Problem?\" HBR (2012); Jeppesen & Lakhani (2010); NASA on problem decomposition." },
    { title: "3 · Design: build the challenge backward from the outcome and fix where the winner will land",
      do: [
        ["Structure: ", "single or staged (ideas, then design, then prototype, then pilot), with milestone awards."],
        ["Incentives: ", "a purse sized to solver effort and follow-on value, plus test access, data, mentoring and buyers."],
        ["Rules: ", "eligibility, IP and data terms that enable the adoption route."],
        ["Judging: ", "measurable criteria, a rubric, the panel and conflict checks."],
        ["Landing zone: ", "an adoption owner, a budget, and a pilot, procurement or license route."],
      ],
      get: ["Challenge design brief", "Rules, terms and IP model", "Judging plan and rubric", "Landing-zone plan", "Full-lifecycle budget and outreach plan"],
      gate: ["Sponsor, legal and procurement sign off", "Transition is funded", "A team can read the rules and know exactly what wins"],
      anchor: "Deloitte's five design elements; XPRIZE \"audacious but achievable\"; MITRE, From Prize Competitions to Procurement." },
    { title: "4 · Mobilize: recruit beyond the usual suspects and help teams reach a credible entry",
      do: [
        ["Recruit across disciplines, ", "not just in the obvious field. Outsiders win disproportionately."],
        ["Enlist multipliers: ", "universities, professional societies, accelerators, labs and diaspora networks."],
        ["Lower early barriers: ", "a cheap first round, office hours, Q&A and team matching."],
        ["Steer with data: ", "track registrations and discipline mix weekly and adjust outreach mid-course."],
      ],
      get: ["Launch and outreach campaign", "Partner and multiplier network", "Solver support program", "Participation dashboard"],
      gate: ["Enough qualified entries to judge", "Spread across distinct disciplines", "If not: extend, adjust outreach, or re-scope"],
      anchor: "DOE American-Made Challenges \"Power Connectors\"; Boudreau, Lacetera & Lakhani (2011); Deloitte on non-cash motivators." },
    { title: "5 · Select: judge on evidence, defensibly, with the people who will adopt the result",
      do: [
        ["Build the panel: ", "balanced, conflict-screened and calibrated on the rubric before scoring."],
        ["Triage in stages: ", "eligibility screen, then blind expert review, then finalist testing."],
        ["Reconcile ", "divergent scores in discussion rather than averaging them away."],
        ["Verify winners: ", "eligibility, compliance and reproducible results."],
        ["Seat the problem owner ", "on the panel. Adoption starts here."],
      ],
      get: ["Scored, documented decisions", "Verified winners", "Award announcement and recognition", "Audit-ready decision record"],
      gate: ["Results verified and reproducible", "Decision record defensible to any entrant", "Sponsor approves awards"],
      anchor: "Challenge.gov toolkit \"Conduct\" and \"Award\"; XPRIZE objective testing; 15 U.S.C. §3719 judging requirements (federal)." },
    { title: "6 · Adopt: move winners into use and keep the network working",
      do: [
        ["Activate the landing zone: ", "the pre-agreed pilot, contract, license or investment."],
        ["Showcase winners ", "to buyers, investors and follow-on funders."],
        ["Hand off the network: ", "solvers, experts and partners stay reachable."],
        ["Measure impact ", "at 12, 24 and 36 months. Most impact arrives after the prize closes."],
        ["Feed the pipeline: ", "lessons and the next problem go into the next challenge."],
      ],
      get: ["Pilot or contract under way", "Network handoff package", "Impact report", "Lessons learned and next-problem pipeline"],
      gate: ["Scale: evidence supports wider use", "Iterate: a promising gap remains", "Stop: record and share what was learned"],
      anchor: "Challenge.gov toolkit \"Transition\"; Deloitte \"legacy\"; Nesta/Challenge Works; Unilever Foundry funded pilots." },
  ];
  detail.forEach((d, i) => {
    const ph = PHASES[i];
    s = pres.addSlide({ masterName: "Title Only", sectionTitle: "The six phases" });
    s.addText(d.title, { placeholder: "title" });
    L.tracker(s, P, ph.n);
    // question band
    T(s, `“${ph.q}”`, { x: 0.6, y: 2.0, w: 12.1, h: 0.45, fontSize: 17, italic: true, color: P.coral, fontFace: L.THEME.headFontFace });
    // what we do
    T(s, "What we do together", { x: 0.6, y: 2.6, w: 5.6, h: 0.35, fontSize: 15, bold: true, color: P.teal });
    T(s, bulletRuns(d.do, { gap: 7, run: { fontSize: 13, color: P.ink } }), { x: 0.6, y: 3.0, w: 5.75, h: 3.5 });
    // deliverables
    card(s, P, 6.65, 2.6, 3.0, 3.85, { fill: P.mist, name: "deliverables" });
    T(s, "What you get", { x: 6.85, y: 2.75, w: 2.6, h: 0.35, fontSize: 15, bold: true, color: P.teal });
    T(s, bulletRuns(d.get, { gap: 7, run: { fontSize: 13, color: P.ink } }), { x: 6.85, y: 3.2, w: 2.65, h: 3.1 });
    // gate
    card(s, P, 9.85, 2.6, 2.85, 3.85, { fill: P.teal, name: "gate" });
    s.addShape("diamond", { x: 10.05, y: 2.8, w: 0.34, h: 0.34, fill: { color: P.amber }, line: { color: P.amber } });
    T(s, `Gate: ${ph.gate}`, { x: 10.5, y: 2.75, w: 2.1, h: 0.45, fontSize: 13.5, bold: true, color: P.white, valign: "middle" });
    T(s, bulletRuns(d.gate, { gap: 7, run: { fontSize: 12.5, color: P.white } }), { x: 10.05, y: 3.35, w: 2.5, h: 2.5 });
    T(s, `Typical duration: ${ph.dur}`, { x: 10.05, y: 5.95, w: 2.5, h: 0.35, fontSize: 11.5, italic: true, color: P.mint });
    source(s, P, "Best-practice anchors: " + d.anchor);
  });

  // ---------------- 13. Capability ----------------
  pres.addSection({ title: "Building capability" });
  s = pres.addSlide({ masterName: "Title Only", sectionTitle: "Building capability" });
  s.addText("The goal is a repeatable capability; the first challenge is how you start building it", { placeholder: "title" });
  const stages = [
    { h: "First challenge", sub: "Learn by doing", items: ["One well-framed problem with an engaged owner", "Templates and rules drafted for reuse", "Internal champions identified and celebrated"] },
    { h: "Repeatable practice", sub: "Make the second one cheaper", items: ["A problem pipeline with intake criteria", "Pre-agreed legal, IP and procurement templates", "A standing solver and partner network"] },
    { h: "Standing program", sub: "Open innovation as a normal tool", items: ["A center of excellence that brokers methods", "Pre-competed vehicles to buy challenge services fast", "Portfolio review and an outcomes dashboard"] },
  ];
  stages.forEach((st, i) => {
    const x = 0.6 + i * 4.1, y = 1.6 + (2 - i) * 0.4, h = 3.0 + i * 0.4;
    card(s, P, x, y, 3.85, h, { fill: i === 2 ? P.teal : P.mist, name: `stage-${i + 1}` });
    const dark = i === 2;
    T(s, st.h, { x: x + 0.3, y: y + 0.25, w: 3.3, h: 0.45, fontSize: 19, bold: true, color: dark ? P.white : P.teal, fontFace: L.THEME.headFontFace });
    T(s, st.sub, { x: x + 0.3, y: y + 0.72, w: 3.3, h: 0.35, fontSize: 13, italic: true, color: dark ? P.amber : P.coral });
    T(s, bulletRuns(st.items, { gap: 8, run: { fontSize: 13.5, color: dark ? P.white : P.ink } }), { x: x + 0.3, y: y + 1.2, w: 3.3, h: 2.0 });
    if (i < 2) s.addShape("rightArrow", { x: x + 3.88, y: y + h - 0.6, w: 0.2, h: 0.3, fill: { color: P.coral }, line: { color: P.coral } });
  });
  T(s, [{ text: "Culture is the binding constraint. ", options: { bold: true } },
    { text: "In NASA's experience, external solutions were adopted only where internal experts came to see themselves as \"solution seekers\" as well as problem solvers. Involve them as co-designers and judges, not bystanders." }],
    { x: 0.6, y: 5.7, w: 12.1, h: 0.7, fontSize: 13, color: P.ink });
  source(s, P, "Examples: NASA CoECI and the NOIS contract vehicles; DOE American-Made Challenges; P&G Connect + Develop. Culture finding: Lifshitz-Assaf, NYU Stern study of NASA R&D.", 6.65);

  // ---------------- 14. Timeline ----------------
  s = pres.addSlide({ masterName: "Title Only", sectionTitle: "Building capability" });
  s.addText("A first challenge typically takes 5–18 months from commitment to award; adoption continues beyond that", { placeholder: "title" });
  const gx = 2.6, gw = 9.9, months = 18, gy = 1.85;
  for (let m = 0; m <= months; m += 3) {
    const x = gx + (m / months) * gw;
    s.addShape("line", { x, y: gy + 0.35, w: 0, h: 4.0, line: { color: H.accent6, width: 0.75, dashType: "dash" } });
    T(s, `M${m}`, { x: x - 0.3, y: gy, w: 0.6, h: 0.3, fontSize: 11, color: P.slate, align: "center" });
  }
  const bars = [[0, 0.75], [0.75, 2], [2, 3.75], [3.75, 10.5], [10.5, 11.75], [11.75, 18]];
  PHASES.forEach((p, i) => {
    const y = gy + 0.5 + i * 0.64;
    T(s, `${p.n}  ${p.name}`, { x: 0.6, y, w: 1.9, h: 0.45, fontSize: 14, bold: true, color: P.teal, valign: "middle" });
    const [a, b] = bars[i];
    const bx = gx + (a / months) * gw, bw = ((b - a) / months) * gw;
    s.addShape("roundRect", { x: bx, y: y + 0.04, w: bw, h: 0.38, rectRadius: 0.1,
      fill: { color: i === 5 ? P.mint : (i < 3 ? P.teal : P.coral) }, line: { color: i === 5 ? P.mint : (i < 3 ? P.teal : P.coral) } });
    T(s, p.dur, { x: bx + bw + 0.1 > gx + gw - 1.6 ? bx + 0.15 : bx + bw + 0.1, y, w: 1.6, h: 0.45, fontSize: 11, color: i === 5 ? P.teal : P.slate, valign: "middle", italic: true });
  });
  // legend
  [["Before launch: about 2–4 months", P.teal], ["In market: varies with challenge type", P.coral], ["After award: ongoing", P.mint]].forEach((lg, i) => {
    const x = 2.6 + i * 3.4;
    s.addShape("roundRect", { x, y: 6.12, w: 0.35, h: 0.22, rectRadius: 0.05, fill: { color: lg[1] }, line: { color: lg[1] } });
    T(s, lg[0], { x: x + 0.45, y: 6.07, w: 2.9, h: 0.32, fontSize: 12, color: P.ink, valign: "middle" });
  });
  source(s, P, "Illustrative mid-range plan. Ideation challenges can run in weeks; hardware prizes with physical testing can run for years. Durations draw on Challenge.gov, Nesta and DOE American-Made practice.", 6.55);

  // ---------------- 15. Roles ----------------
  s = pres.addSlide({ masterName: "Title Only", sectionTitle: "Building capability" });
  s.addText("Success depends on a few named people on your side; we bring the rest", { placeholder: "title" });
  const roles = [
    ["FaUserTie", "Executive sponsor", "Owns the outcome and budget; chairs the gates; attends the award."],
    ["FaClipboardCheck", "Problem owner", "Signs the problem statement, sits on the panel and adopts the result."],
    ["FaGavel", "Legal and IP", "Confirms authority, IP model and terms early, not at launch."],
    ["FaFileContract", "Procurement", "Designs the pilot or contract route before launch."],
    ["FaCoins", "Finance", "Funds the purse, operations and transition as one budget."],
    ["FaBullhorn", "Communications", "Owns brand and story; amplifies outreach."],
  ];
  T(s, "From you", { x: 0.6, y: 1.55, w: 7.6, h: 0.4, fontSize: 16, bold: true, color: P.teal });
  roles.forEach((r, i) => {
    const col = i % 2, row = Math.floor(i / 2);
    const x = 0.6 + col * 3.85, y = 2.05 + row * 1.45;
    s.addShape("ellipse", { x, y, w: 0.6, h: 0.6, fill: { color: P.teal }, line: { color: P.teal } });
    s.addImage({ data: ic[r[0]], x: x + 0.15, y: y + 0.15, w: 0.3, h: 0.3 });
    T(s, r[1], { x: x + 0.75, y: y - 0.02, w: 2.9, h: 0.35, fontSize: 14, bold: true, color: P.teal });
    T(s, r[2], { x: x + 0.75, y: y + 0.34, w: 2.9, h: 0.9, fontSize: 12, color: P.ink });
  });
  card(s, P, 8.55, 1.55, 4.15, 4.85, { fill: P.teal, name: "what-we-bring" });
  T(s, "From us, end to end", { x: 8.85, y: 1.75, w: 3.6, h: 0.4, fontSize: 16, bold: true, color: P.white });
  T(s, bulletRuns(["Readiness and problem-discovery facilitation", "Problem framing and abstraction", "Challenge design, rules, judging and budget", "Platform, outreach and solver support", "Judging operations and winner verification", "Transition support, network handoff and impact measurement"],
    { gap: 9, run: { fontSize: 13, color: P.white } }), { x: 8.85, y: 2.3, w: 3.6, h: 3.9 });
  s.addNotes("Push gently on the problem owner and procurement roles. These are the two most commonly missing, and the two most predictive of whether a winner is ever used.");

  // ---------------- 16. Next step ----------------
  pres.addSection({ title: "Next steps" });
  s = pres.addSlide({ masterName: "Title Only", sectionTitle: "Next steps" });
  s.addText("Proposed next step: a six-week Commit-and-Frame sprint ending in a go / no-go", { placeholder: "title" });
  const sprint = [
    ["Weeks 1–2", "Readiness", "Five to eight stakeholder interviews; readiness scorecard; outcome statement draft"],
    ["Weeks 2–3", "Discovery workshop", "Half-day session to build and score a long list of candidate problems"],
    ["Weeks 4–5", "Frame", "Problem statements for the top one to three; landscape scan; solver-pool check"],
    ["Week 6", "Decision", "Go / no-go, recommended mechanism and an outline design brief"],
  ];
  sprint.forEach((sp, i) => {
    const x = 0.6 + i * 3.08, y = 1.65;
    circleNum(s, P, x, y, 0.55, i + 1, { fill: i === 3 ? P.coral : P.teal, fontSize: 17 });
    if (i < 3) s.addShape("line", { x: x + 0.65, y: y + 0.275, w: 2.33, h: 0, line: { color: H.accent6, width: 2 } });
    T(s, sp[0], { x, y: y + 0.7, w: 2.85, h: 0.3, fontSize: 12, color: P.slate, italic: true });
    T(s, sp[1], { x, y: y + 1.0, w: 2.85, h: 0.4, fontSize: 16, bold: true, color: P.teal });
    T(s, sp[2], { x, y: y + 1.45, w: 2.8, h: 1.1, fontSize: 12.5, color: P.ink });
  });
  card(s, P, 0.6, 4.55, 12.1, 1.85, { fill: P.mist, name: "decisions-today" });
  T(s, "Decisions we would like from today", { x: 0.9, y: 4.72, w: 6, h: 0.4, fontSize: 15, bold: true, color: P.teal });
  T(s, bulletRuns(["Who is the executive sponsor, and who are the candidate problem owners?", "Which five to eight people should we interview in weeks 1–2?"], { gap: 6, run: { fontSize: 13, color: P.ink } }),
    { x: 0.9, y: 5.17, w: 5.6, h: 1.1 });
  T(s, bulletRuns(["A date for the half-day discovery workshop", "Any constraints we should know now: authority, IP, procurement, timing"], { gap: 6, run: { fontSize: 13, color: P.ink } }),
    { x: 6.7, y: 5.17, w: 5.8, h: 1.1 });

  // ---------------- 17. Sources ----------------
  pres.addSection({ title: "Appendix" });
  s = pres.addSlide({ masterName: "Title Only", sectionTitle: "Appendix" });
  s.addText("Sources", { placeholder: "title" });
  const src = [
    "Boudreau, K. & Lakhani, K. (2013). Using the Crowd as an Innovation Partner. Harvard Business Review.",
    "Boudreau, K., Lacetera, N. & Lakhani, K. (2011). Incentives and Problem Uncertainty in Innovation Contests. Management Science.",
    "Challenge.gov / GSA. Prize and Challenge Toolkit (Prepare, Develop, Conduct, Award, Transition).",
    "Deloitte GovLab (2014). The Craft of Incentive Prize Design: Lessons from the Public Sector.",
    "Jeppesen, L. B. & Lakhani, K. (2010). Marginality and Problem-Solving Effectiveness in Broadcast Search. Organization Science.",
    "Lifshitz-Assaf, H. (2018). Dismantling Knowledge Boundaries at NASA. Administrative Science Quarterly.",
    "McKinsey & Company (2009). And the Winner Is…: Capturing the Promise of Philanthropic Prizes.",
    "MITRE. From Incentive Prize and Challenge Competitions to Procurement.",
    "Nesta / Challenge Works. Challenge Prizes: A Practice Guide.",
    "Nextgov (2012). White House discloses administrative costs for innovation contests.",
    "OSTP (2024). Implementation of Federal Prize and Citizen Science Authority, FY2021–22.",
    "Pisano, G. & Verganti, R. (2008). Which Kind of Collaboration Is Right for You? Harvard Business Review.",
    "Spradlin, D. (2012). Are You Solving the Right Problem? Harvard Business Review.",
    "US DOE / NREL. American-Made Challenges program and Power Connectors.",
    "XPRIZE Foundation. Prize design process; Ansari X Prize history.",
    "500 Startups survey of corporate innovation programs, reported in Fortune (2017).",
  ];
  T(s, bulletRuns(src.slice(0, 8), { gap: 8, run: { fontSize: 13, color: P.ink } }), { x: 0.6, y: 1.5, w: 5.9, h: 5.2 });
  T(s, bulletRuns(src.slice(8), { gap: 8, run: { fontSize: 13, color: P.ink } }), { x: 6.8, y: 1.5, w: 5.9, h: 5.2 });

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, L.THEME);
  console.log("wrote", OUT);
})();

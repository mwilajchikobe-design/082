// Internal practitioner playbook: methodology, gates, tools, workshops, evidence bank.
const { applyTheme } = require(process.env.PPTX_SKILL + "/scripts/apply_theme.js");
const L = require("./lib");
const { T, card, bulletRuns, circleNum, source, table, PHASES, H } = L;

const OUT = process.argv[2] || "playbook.pptx";

(async () => {
  const { pres, P } = L.newDeck("Challenge Journey Playbook");
  const icons = await L.loadIcons();
  const SEC = (t) => pres.addSection({ title: t });
  const slide = (sec, title) => { const s = pres.addSlide({ masterName: "Title Only", sectionTitle: sec }); s.addText(title, { placeholder: "title" }); return s; };
  const divider = (sec, title, sub) => { const s = pres.addSlide({ masterName: "Section Dark", sectionTitle: sec }); s.addText(title, { placeholder: "title" }); s.addText(sub, { placeholder: "body" }); return s; };

  // ---------- Title ----------
  SEC("Overview");
  let s = pres.addSlide({ masterName: "Title Dark", sectionTitle: "Overview" });
  s.addText("Challenge Journey Playbook", { placeholder: "title" });
  s.addText("Internal methodology, tools and workshop guides for client open innovation challenges and prizes\nPractitioner use  ·  Version 1.0  ·  October 2026", { placeholder: "body" });

  // ---------- How to use ----------
  s = slide("Overview", "How to use this playbook");
  const parts = [
    ["The framework", "Six phases, their gates and the evidence behind them. Use it to orient the team and the client.", "Slides 3–6"],
    ["The tools", "Ten working tools, from readiness scorecard to landing-zone plan, plus KPIs and a risk register. Each maps to a phase.", "Slides 7–19"],
    ["The workshops", "Agendas for the first client meeting and the half-day problem-discovery workshop, plus a question bank.", "Slides 20–23"],
    ["The evidence", "Claims we cite, with sources and a flag where the figure must be checked before external use.", "Slides 24–25"],
  ];
  parts.forEach((p, i) => {
    const x = 0.6 + (i % 2) * 6.15, y = 1.6 + Math.floor(i / 2) * 2.45;
    card(s, P, x, y, 5.95, 2.2, { fill: P.mist, name: `part-${i + 1}` });
    circleNum(s, P, x + 0.3, y + 0.3, 0.55, i + 1, { fill: P.coral, fontSize: 17 });
    T(s, p[0], { x: x + 1.05, y: y + 0.3, w: 4.6, h: 0.55, fontSize: 18, bold: true, color: P.teal, valign: "middle", fontFace: L.THEME.headFontFace });
    T(s, p[1], { x: x + 1.05, y: y + 0.95, w: 4.6, h: 0.85, fontSize: 13, color: P.ink });
    T(s, p[2], { x: x + 1.05, y: y + 1.75, w: 4.6, h: 0.3, fontSize: 11, italic: true, color: P.slate });
  });
  T(s, [{ text: "Ground rule: ", options: { bold: true } }, { text: "a gate is a real decision. Recommending \"not now\" or \"use scouting instead\" is a good outcome, not a lost sale." }],
    { x: 0.6, y: 6.4, w: 12.1, h: 0.4, fontSize: 13, color: P.ink });

  // ---------- Framework ----------
  SEC("Framework");
  s = slide("Framework", "The Challenge Journey on one page");
  L.drawFramework(s, P, icons, 0.6, 1.45, 12.1);

  // ---------- Crosswalk ----------
  s = slide("Framework", "Each phase maps onto the established models, so clients can trace our method to recognized practice");
  table(s, P, [
    ["Our phase", "Challenge.gov / GSA", "Deloitte (2014)", "Nesta / Challenge Works", "XPRIZE", "InnoCentive / Wazoku"],
    ["1 Commit", "Prepare: goals, fit, authority, budget", "Choose among six outcomes", "Discover", "\"Can a prize help?\"", "Establish and justify the need"],
    ["2 Frame", "Prepare: define the problem", "—", "Define", "Landscape analysis; prizeability", "Contextualize; write; abstract"],
    ["3 Design", "Develop: structure, rules, judging, metrics", "Five design elements", "Design", "Prize direction, then design", "Challenge type and award"],
    ["4 Mobilize", "Conduct: communications, submissions", "Implementation", "Deliver: team support", "Registration and team support", "Post to the solver crowd"],
    ["5 Select", "Conduct: judging, verification; Award", "Evaluation; Award", "Deliver: judging", "Semifinals, finals, testing", "Seeker evaluation; award"],
    ["6 Adopt", "Transition: document, engage, manage solutions", "Legacy", "Impact (after prize)", "Impact strategy", "Seeker implements"],
    ["Throughout", "Build the team; share best practice", "Resources; communications", "Ecosystem impact", "Operational plan", "Challenge-driven enterprise"],
  ], { x: 0.6, y: 1.55, w: 12.1, colW: [1.45, 2.4, 2.05, 2.0, 2.0, 2.2], fontSize: 11.5 });
  source(s, P, "Sources: GSA Prize and Challenge Toolkit; Deloitte, The Craft of Incentive Prize Design (2014); Nesta/Challenge Works Practice Guide; XPRIZE prize design; Spradlin, HBR (2012). Labels paraphrased from search summaries; confirm against primary documents.");

  // ---------- Engagement model ----------
  s = slide("Framework", "Engagement model: what each phase demands of us and of the client");
  table(s, P, [
    ["Phase", "Typical duration", "Our core activities", "Client time required", "Key deliverables"],
    ["1 Commit", "2–4 weeks", "Stakeholder interviews; readiness scoring; outcome framing; alternatives check", "Sponsor 2 hrs; 5–8 interviewees 1 hr each", "Outcome statement; readiness scorecard; go/no-go"],
    ["2 Frame", "3–6 weeks", "Discovery workshop; fit scoring; problem statements; abstraction; landscape scan; solver test", "Owners: workshop + 2–3 working sessions", "Long list; 1–3 problem statements; success criteria"],
    ["3 Design", "4–8 weeks", "Mechanism and structure; incentives; rules and IP; judging plan; landing zone; budget; outreach plan", "Legal, procurement, finance reviews", "Design brief; rules; judging plan; landing-zone plan; budget"],
    ["4 Mobilize", "1–12 months", "Launch; outreach; partner network; solver support; participation tracking", "Comms amplification; owner Q&A", "Campaign; partner network; dashboard"],
    ["5 Select", "2–6 weeks", "Panel recruitment and calibration; staged triage; reconciliation; verification", "Judges; owner on panel; sponsor approval", "Decision record; verified winners; award event"],
    ["6 Adopt", "3–24 months", "Landing-zone activation; showcases; network handoff; impact measurement", "Owner and procurement lead adoption", "Pilot or contract; handoff; impact report"],
  ], { x: 0.6, y: 1.55, w: 12.1, colW: [1.3, 1.45, 3.9, 2.55, 2.9], fontSize: 11.5 });
  source(s, P, "Durations are planning ranges synthesized from Challenge.gov, Nesta and DOE American-Made practice; calibrate per engagement. Client time estimates are our planning assumptions.");

  // ---------- Gates ----------
  s = slide("Framework", "Gate criteria: what must be true to move to the next phase");
  table(s, P, [
    ["Gate", "Decision", "Must be true", "Decides"],
    ["1 Ready to commit", "Proceed, fix gaps first, or not now", "Named problem owner; budget covers operations and transition; no red score on owner, absorptive capacity or adoption route; a challenge beats the alternatives", "Executive sponsor"],
    ["2 Problem approved", "Which problem(s) go to design", "Owner signs the statement; success measurable; publishable without confidential detail; not purchasable today; plausible solver pool exists", "Sponsor + problem owner"],
    ["3 Design signed off", "Launch or revise", "Rules unambiguous (a team knows what wins); IP model fits the adoption route; judging plan approved; transition funded; legal and procurement sign off", "Steering group"],
    ["4 Participation check", "Continue, extend, re-scope", "Qualified entries meet the target; entrants span distinct disciplines; no unresolved rule disputes", "Challenge manager + owner"],
    ["5 Awards approved", "Confirm winners", "Scores reconciled and documented; winners verified (eligibility, compliance, reproducibility); decision record defensible", "Sponsor (or federal judges)"],
    ["6 Scale, iterate or stop", "What happens to the result", "Pilot evidence reviewed against success criteria; next-step budget and owner identified; lessons captured", "Sponsor + owner"],
  ], { x: 0.6, y: 1.55, w: 12.1, colW: [2.0, 2.3, 5.8, 2.0], fontSize: 11.5 });

  // ---------- Tools ----------
  SEC("Tools");
  divider("Tools", "The toolkit", "Ten working tools. Each one produces a client-ready deliverable and feeds a gate.");

  // Tool 1: readiness
  s = slide("Tools", "Tool 1 · Readiness scorecard (Commit): score eight dimensions from 1 to 5");
  table(s, P, [
    ["#", "Dimension", "What a 5 looks like", "Red flag (score 1–2)"],
    ["1", "Executive sponsor", "Named senior owner with budget authority who will attend the award", "\"The innovation team will handle it\""],
    ["2", "Problem owner ★", "Owner who will personally use the result and sit on the panel", "\"We're solving this for another department\""],
    ["3", "Funding", "Purse, operations and transition budgeted together", "Only the purse is funded"],
    ["4", "Legal and IP posture", "Authority confirmed; IP model agreed in principle", "Legal first engaged at rules drafting"],
    ["5", "Absorptive capacity ★", "People, test facilities and budget to evaluate and integrate a solution", "No one has time to test the winner"],
    ["6", "Adoption pathway ★", "Pilot, procurement or license route identified", "\"We'll work out next steps after the award\""],
    ["7", "Cultural openness", "Experts see outside solutions as wins; some prior open innovation", "A challenge is seen as a verdict on internal staff"],
    ["8", "Measurement", "Baseline and target metrics defined", "Success means \"good press\""],
  ], { x: 0.6, y: 1.5, w: 8.6, colW: [0.4, 2.0, 3.4, 2.8], fontSize: 11.5, bump: 1 });
  card(s, P, 9.45, 1.5, 3.25, 4.95, { fill: P.teal, name: "scoring-rule" });
  T(s, "Suggested decision rule", { x: 9.7, y: 1.68, w: 2.8, h: 0.4, fontSize: 15, bold: true, color: P.white });
  T(s, bulletRuns([
    ["Proceed: ", "28–40, and no ★ item below 3"],
    ["Fix first: ", "20–27, or any ★ item below 3"],
    ["Not now: ", "below 20. Offer scouting or an internal challenge to build familiarity"],
  ], { gap: 10, run: { fontSize: 13, color: P.white } }), { x: 9.7, y: 2.2, w: 2.8, h: 2.6 });
  T(s, "★ Low scores on these three predict \"solution orphans\": winners nobody adopts. Thresholds are our heuristic; recalibrate after the first few uses.",
    { x: 9.7, y: 4.85, w: 2.8, h: 1.5, fontSize: 11, italic: true, color: P.mint });
  source(s, P, "Synthesized from the IBM/APQC ecosystem innovation maturity model, Mind the Bridge Open Innovation Readiness Index, NASA@Work owner rules and Cohen & Levinthal on absorptive capacity.");

  // Tool 2: outcome selector
  s = slide("Tools", "Tool 2 · Outcome selector (Commit): the outcome you choose drives every design choice");
  table(s, P, [
    ["Outcome you need", "Design implications", "Example metrics"],
    [{ text: "Develop solutions", options: { bold: true, color: P.teal, fill: { color: P.mint } } }, { text: "", options: { fill: { color: P.mint } } }, { text: "", options: { fill: { color: P.mint } } }],
    ["Attract new ideas", "Low entry barrier; short window; small guaranteed awards; broad, multidisciplinary outreach", "Number of novel ideas; solver diversity; share new to the sponsor"],
    ["Build prototypes and launch pilots", "Staged structure; milestone awards; test facilities; reduction-to-practice evidence; pilot partner lined up", "Performance against target; pilots launched"],
    ["Stimulate markets", "Large purse or purchase commitment; clear performance threshold; investor and buyer engagement", "Entrants; private investment; price or cost change"],
    [{ text: "Engage people", options: { bold: true, color: P.teal, fill: { color: P.mint } } }, { text: "", options: { fill: { color: P.mint } } }, { text: "", options: { fill: { color: P.mint } } }],
    ["Raise awareness", "Public-facing format; storytelling; media-worthy finish", "Reach; engagement; sentiment"],
    ["Mobilize action", "Participation prize; community tools; low-cost entry", "Actions taken; participants retained"],
    ["Inspire transformation", "Long horizon; network-building; legacy funding", "Policy or practice change; network ties formed"],
  ], { x: 0.6, y: 1.5, w: 12.1, colW: [3.0, 5.6, 3.5], fontSize: 12 });
  source(s, P, "Outcome typology: Deloitte, The Craft of Incentive Prize Design (2014). Prize archetypes for cross-reference: McKinsey (2009): point-solution, market-stimulation, participation, exemplar, exposition, network.");

  // Tool 3: problem fit scorecard
  s = slide("Tools", "Tool 3 · Challenge-fit scorecard (Frame): score each candidate problem out of 70");
  table(s, P, [
    ["Criterion", "Weight", "Score 1–5", "Stop if"],
    ["Important and widely recognized as a problem", "×2", "", ""],
    ["Solution not obvious and cannot be bought off the shelf ★", "×2", "", "Purchasable: procure or scout"],
    ["Outsiders could plausibly contribute; a solver pool exists", "×2", "", ""],
    ["Success measurable and objectively judgeable ★", "×2", "", "Not measurable: reframe"],
    ["Can be stated without confidential context", "×1", "", ""],
    ["IP and data shareable on acceptable terms", "×1", "", ""],
    ["Owner and adoption path exist ★", "×2", "", "No owner: park it"],
    ["Solvable at reasonable cost and time relative to the incentive", "×1", "", ""],
    ["A challenge beats grants, contracts and internal R&D here", "×1", "", ""],
    [{ text: "Total (maximum 70)", options: { bold: true } }, "", "", ""],
  ], { x: 0.6, y: 1.5, w: 8.6, colW: [4.6, 0.8, 1.1, 2.1], fontSize: 12 });
  card(s, P, 9.45, 1.5, 3.25, 4.95, { fill: P.mist, name: "fit-reading" });
  T(s, "Reading the score", { x: 9.7, y: 1.68, w: 2.8, h: 0.4, fontSize: 15, bold: true, color: P.teal });
  T(s, bulletRuns([["50+: ", "strong candidate"], ["35–49: ", "reframe or decompose, then rescore"], ["Below 35: ", "use another tool"], ["Any ★ scored 1: ", "stop, whatever the total"]],
    { gap: 9, run: { fontSize: 13, color: P.ink } }), { x: 9.7, y: 2.2, w: 2.8, h: 2.3 });
  T(s, "Run it as dot-voting in the discovery workshop, then score the top candidates properly with the owner.", { x: 9.7, y: 4.7, w: 2.8, h: 1.5, fontSize: 11.5, italic: true, color: P.slate });
  source(s, P, "Criteria compiled from Nesta (\"When is your problem a challenge?\"), the Challenge.gov toolkit, McKinsey's conditions for incentive prizes and XPRIZE prizeability tests. Weights and thresholds are our heuristic.");

  // Tool 4: problem statement canvas
  s = slide("Tools", "Tool 4 · Problem-statement canvas (Frame): define rigorously, then abstract for outsiders");
  const canvas = [
    ["1 Need", "Why solve this now? What happens if we don't?"],
    ["2 Justification", "Strategic fit; value of a solution; who benefits"],
    ["3 Context", "What has been tried, by us and others; why it fell short; constraints"],
    ["4 How might we…", "One sentence that implies a solution is possible without prescribing it"],
    ["5 Success criteria", "Measurable thresholds a judge can verify; what must and must not be true"],
    ["6 Out of scope", "Approaches, technologies or markets we exclude, and why"],
    ["7 Solver-facing version", "Rewrite without jargon or confidential detail, for a capable person in a distant field"],
    ["8 IP and data", "What solvers keep, what we need, which data we can share"],
    ["9 Owner and landing zone", "Who adopts the result, through which route, with what budget"],
  ];
  canvas.forEach((c, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.6 + col * 4.08, y = 1.5 + row * 1.68;
    const hi = i === 6;
    card(s, P, x, y, 3.9, 1.5, { fill: hi ? P.teal : P.mist, name: `canvas-${i + 1}` });
    T(s, c[0], { x: x + 0.2, y: y + 0.15, w: 3.5, h: 0.38, fontSize: 14.5, bold: true, color: hi ? P.white : P.teal });
    T(s, c[1], { x: x + 0.2, y: y + 0.58, w: 3.5, h: 0.85, fontSize: 12.5, color: hi ? P.mint : P.ink });
  });
  source(s, P, "Boxes 1–3 and 5 follow Spradlin's four steps (HBR, 2012); box 4 is IDEO's \"How might we\"; box 7 applies the abstraction evidence of Jeppesen & Lakhani (2010). Balance abstraction against fit: too abstract draws irrelevant entries (Wazoku's \"Goldilocks\" point).", 6.5);

  // Tool 5: mechanism selector
  s = slide("Tools", "Tool 5 · Mechanism selector (Design): match the open-innovation mechanism to the problem");
  table(s, P, [
    ["Mechanism", "Use when", "Typical incentive", "Reference models"],
    ["Technology scouting / partner search", "A solution probably exists; you want a license or partner", "Contract or license", "NineSigma, yet2, Innoget, eRFP"],
    ["Ideation challenge", "You need many early ideas fast", "Small, often guaranteed awards", "InnoCentive ideation; OpenIDEO"],
    ["Theoretical / design challenge", "You need a detailed, testable design", "Mid-size award; IP often transferred", "InnoCentive Theoretical"],
    ["Prototype / reduction-to-practice prize", "You need working evidence against a threshold", "Large, staged purse plus test access", "XPRIZE; NASA Centennial; InnoCentive RTP"],
    ["Data / algorithm contest", "Performance can be scored on held-out data", "Leaderboard purse", "Kaggle; NASA Tournament Lab"],
    ["Crowd labor market / task contests", "Work is well-defined with known skills", "Pay per accepted output", "Topcoder"],
    ["Collaborative community", "Contributions must build on one another", "Recognition, access, shared use", "Open source"],
    ["Market-stimulation prize", "You want to drive down cost or prove demand", "Large purse or purchase commitment", "McKinsey market-stimulation archetype"],
  ], { x: 0.6, y: 1.5, w: 12.1, colW: [3.0, 3.9, 2.6, 2.6], fontSize: 12 });
  source(s, P, "Boudreau & Lakhani, HBR (2013); Boudreau, Lacetera & Lakhani (2011): open wide for uncertain problems, limit entry for well-specified ones; InnoCentive/Wazoku challenge types; Pisano & Verganti (2008).");

  // Tool 6: design checklist
  s = slide("Tools", "Tool 6 · Design checklist (Design): decide all five elements together, not in sequence");
  const els = [
    ["Structure", ["Single or multi-stage?", "Milestone or progress awards?", "Eligibility and team rules", "Timeline and stage gates"]],
    ["Motivators", ["Purse and its split across stages", "Test access, data, mentoring", "Access to buyers and investors", "Recognition and validation"]],
    ["Evaluation", ["Criteria derived from the outcome", "Objective test or rubric", "Panel and conflict checks", "Winner verification"]],
    ["Resources", ["Platform and datasets", "Test facilities and protocols", "Partners and multipliers", "Staffing and budget"]],
    ["Communications", ["Brand and story", "Outreach channels by discipline", "Community management", "Award moment and media"]],
  ];
  els.forEach((e, i) => {
    const x = 0.6 + i * 2.46;
    card(s, P, x, 1.5, 2.3, 3.05, { fill: P.mist, name: `element-${i + 1}` });
    T(s, e[0], { x: x + 0.18, y: 1.65, w: 2.0, h: 0.4, fontSize: 15, bold: true, color: P.teal });
    T(s, bulletRuns(e[1], { gap: 6, run: { fontSize: 12, color: P.ink } }), { x: x + 0.18, y: 2.12, w: 2.0, h: 2.35 });
  });
  T(s, "IP model spectrum: the heavier the encumbrance, the smaller and more skewed the solver pool", { x: 0.6, y: 4.8, w: 12.1, h: 0.35, fontSize: 14, bold: true, color: P.teal });
  const ip = ["Solvers keep IP", "License option or right of first negotiation", "Open-source requirement", "Full assignment for the award"];
  ip.forEach((t, i) => {
    const x = 0.6 + i * 3.08;
    s.addShape("roundRect", { x, y: 5.25, w: 2.85, h: 0.75, rectRadius: 0.08, fill: { color: i === 0 ? P.mint : i === 3 ? P.coral : P.mist }, line: { color: P.mint } });
    T(s, t, { x: x + 0.15, y: 5.25, w: 2.55, h: 0.75, fontSize: 12.5, bold: true, color: i === 3 ? P.white : P.ink, align: "center", valign: "middle" });
    if (i < 3) s.addShape("rightArrow", { x: x + 2.88, y: 5.5, w: 0.17, h: 0.25, fill: { color: P.slate }, line: { color: P.slate } });
  });
  source(s, P, "Five elements: Deloitte (2014). IP spectrum: Frangione (XPRIZE) Senate testimony; InnoCentive terms. Federal: 15 U.S.C. §3719 bars taking participant IP without written consent (confirm with counsel).", 6.35);

  // Tool 7: purse and budget
  s = slide("Tools", "Tool 7 · Purse and budget worksheet (Design): size the purse to the solver, budget the whole lifecycle");
  T(s, "Five lenses for the purse", { x: 0.6, y: 1.5, w: 5.6, h: 0.4, fontSize: 15, bold: true, color: P.teal });
  T(s, bulletRuns([
    ["Cost to solve: ", "the expected prize plus non-cash value must justify the effort of the target solver."],
    ["Follow-on value: ", "a weak follow-on market needs a bigger purse or more non-cash value."],
    ["Value to sponsor: ", "the purse should be a fraction of the cost or time it saves."],
    ["Signal: ", "the size of the purse tells solvers how much the problem matters."],
    ["Staging: ", "spread the purse across stages to fund more early teams and keep option value."],
  ], { gap: 8, run: { fontSize: 12.5, color: P.ink } }), { x: 0.6, y: 1.95, w: 5.6, h: 3.0 });
  card(s, P, 0.6, 5.0, 5.6, 1.4, { fill: P.mist, name: "benchmarks" });
  T(s, bulletRuns([
    "Federal average ≈ $775K per competition (FY21–22: $194.4M across 251)",
    "Federal: purses over $1M need agency-head approval; over $50M, 30 days' notice to Congress",
    "Kaggle ≈ $10K–$250K; InnoCentive-type ≈ $5K–$100K+ (verify)",
  ], { gap: 4, run: { fontSize: 11.5, color: P.ink } }), { x: 0.8, y: 5.1, w: 5.3, h: 1.25 });
  table(s, P, [
    ["Lifecycle budget line", "Often missed?"],
    ["Design and problem framing", ""],
    ["Legal, rules and IP", ""],
    ["Platform and data", ""],
    ["Outreach and partner network", ""],
    ["Solver support (mentoring, vouchers, test access)", "Often"],
    ["Judging and testing (costly for hardware)", "Often"],
    ["Purse", ""],
    ["Transition (pilot, contract vehicle, adoption)", "Most often"],
    ["Evaluation and reporting", "Often"],
  ], { x: 6.6, y: 1.5, w: 6.1, colW: [4.6, 1.5], fontSize: 12 });
  T(s, "Do not quote operations as a fixed ratio of the purse. In disclosed small federal prizes, administration ran 1.7× to 11× the purse; the ratio falls as purses grow.",
    { x: 6.6, y: 5.6, w: 6.1, h: 0.8, fontSize: 11.5, italic: true, color: P.slate });
  source(s, P, "Sources: OSTP FY2021–22 report; 15 U.S.C. §3719; Nextgov (2012); Kay, IBM Center for the Business of Government (2011); McKinsey (2009).", 6.5);

  // Tool 8: RACI
  s = slide("Tools", "Tool 8 · Governance and RACI (all phases): who decides what");
  table(s, P, [
    ["Activity", "Exec sponsor", "Problem owner", "Our team", "Legal", "Procurement", "Comms", "Judges"],
    ["Readiness go / no-go", "A", "C", "R", "C", "C", "–", "–"],
    ["Problem selection and statement", "A", "R", "R (facilitate)", "I", "I", "–", "–"],
    ["Rules, eligibility and IP terms", "I", "C", "R", "A", "C", "I", "I"],
    ["Purse and lifecycle budget", "A", "C", "R", "I", "C", "–", "–"],
    ["Outreach and solver support", "I", "C", "A / R", "–", "–", "R", "–"],
    ["Judging process", "I", "C", "R", "C", "–", "–", "–"],
    ["Award decisions", "A", "C", "C", "C", "–", "I", "R"],
    ["Transition vehicle", "A", "R", "C", "C", "R", "–", "–"],
    ["Impact measurement", "A", "C", "R", "–", "–", "I", "–"],
  ], { x: 0.6, y: 1.5, w: 8.9, colW: [2.55, 0.95, 1.0, 1.15, 0.7, 1.25, 0.75, 0.75], fontSize: 11.5, bump: 1 });
  card(s, P, 9.75, 1.5, 2.95, 4.9, { fill: P.teal, name: "steering" });
  T(s, "Steering group", { x: 10.0, y: 1.68, w: 2.5, h: 0.4, fontSize: 15, bold: true, color: P.white });
  T(s, "Chaired by the sponsor, with the problem owner, legal, procurement, finance and communications. It meets at every gate.",
    { x: 10.0, y: 2.15, w: 2.5, h: 1.5, fontSize: 12.5, color: P.white });
  T(s, "Federal note: under 15 U.S.C. §3719 judges must be conflict-free, panels are exempt from FACA, and agencies may contract a private entity to administer the prize. Federal judges make award determinations.",
    { x: 10.0, y: 3.75, w: 2.5, h: 2.5, fontSize: 11, italic: true, color: P.mint });
  source(s, P, "R = responsible, A = accountable, C = consulted, I = informed. Adapted from Wazoku/Planview platform roles and NC3Rs CRACK IT sponsor roles. Bring procurement in during Commit, not after the award.");

  // Tool 9: judging
  s = slide("Tools", "Tool 9 · Judging design (Design to Select): defensible decisions in seven steps");
  const steps = [
    ["Criteria", "Derived from the outcome; published in advance; measurable"],
    ["Panel", "Balanced expertise; the problem owner included; conflicts screened"],
    ["Calibrate", "Train on the rubric; score sample entries together"],
    ["Triage", "Eligibility screen, then blind expert review, then finalists"],
    ["Test", "Objective tests or held-out data wherever possible"],
    ["Reconcile", "Discuss divergent scores; never average them away"],
    ["Verify and record", "Eligibility, compliance, reproducibility; audit trail"],
  ];
  steps.forEach((st, i) => {
    const x = 0.6 + i * 1.75;
    circleNum(s, P, x + 0.5, 1.65, 0.6, i + 1, { fill: i === 5 ? P.coral : P.teal, fontSize: 18 });
    if (i < 6) s.addShape("line", { x: x + 1.15, y: 1.95, w: 1.15, h: 0, line: { color: H.accent6, width: 2 } });
    T(s, st[0], { x, y: 2.4, w: 1.6, h: 0.4, fontSize: 14, bold: true, color: P.teal, align: "center" });
    T(s, st[1], { x, y: 2.85, w: 1.6, h: 1.4, fontSize: 11.5, color: P.ink, align: "center" });
  });
  card(s, P, 0.6, 4.5, 12.1, 1.85, { fill: P.mist, name: "judging-tips" });
  T(s, "Practitioner notes", { x: 0.85, y: 4.65, w: 5, h: 0.35, fontSize: 14, bold: true, color: P.teal });
  T(s, bulletRuns([
    "\"You get what you incentivize\": any criterion that can be gamed will be. Pressure-test the rubric with a mock entry.",
    "Where reviewers in different disciplines score the same entry, keep the tracks separate and reconcile in a moderated session. The split is often the most important signal.",
    "Seating the problem owner on the panel is also the first step toward adoption.",
  ], { gap: 5, run: { fontSize: 12, color: P.ink } }), { x: 0.85, y: 5.05, w: 11.6, h: 1.3 });
  source(s, P, "Challenge.gov toolkit (\"Conduct\": manage judging, verify winners); XPRIZE objective testing; Frangione, Senate testimony.", 6.5);

  // Tool 10: landing zone
  s = slide("Tools", "Tool 10 · Landing-zone plan (Design to Adopt): decide where the winner lands before launch");
  T(s, "Questions to answer before launch", { x: 0.6, y: 1.5, w: 6, h: 0.4, fontSize: 15, bold: true, color: P.teal });
  T(s, bulletRuns([
    "Who adopts the result, and have they agreed to?",
    "Through which route: pilot, procurement, license, investment or a follow-on challenge?",
    "What budget, and when is it available?",
    "Do the IP and data terms allow that route?",
    "What does a winner get beyond cash: a pilot, a buyer meeting, validation data?",
    "What does success look like at 12, 24 and 36 months?",
    "Who holds the solver and expert network after handoff?",
  ], { gap: 7, run: { fontSize: 13, color: P.ink } }), { x: 0.6, y: 1.95, w: 6.0, h: 4.4 });
  card(s, P, 6.95, 1.5, 2.75, 4.0, { fill: P.teal, name: "routes-gov" });
  T(s, "Government routes", { x: 7.15, y: 1.65, w: 2.4, h: 0.4, fontSize: 14, bold: true, color: P.white });
  T(s, bulletRuns(["Follow-on contract justified by the competition", "Competition results used as the competitive evaluation", "Other Transaction (OTA) follow-on production", "SBIR/STTR on-ramp for winning teams", "Vouchers for national-lab access (DOE model)"],
    { gap: 6, run: { fontSize: 12, color: P.white } }), { x: 7.15, y: 2.1, w: 2.4, h: 4.2 });
  card(s, P, 9.95, 1.5, 2.75, 4.0, { fill: P.mist, name: "routes-corp" });
  T(s, "Corporate routes", { x: 10.15, y: 1.65, w: 2.4, h: 0.4, fontSize: 14, bold: true, color: P.teal });
  T(s, bulletRuns(["Pre-committed investment pool (GE ecomagination)", "Funded pilots on a standard contract (Unilever Foundry)", "Royalty or license (LEGO Ideas)", "Proof-of-concept gates with follow-on funding (Shell GameChanger)"],
    { gap: 6, run: { fontSize: 12, color: P.ink } }), { x: 10.15, y: 2.1, w: 2.4, h: 4.2 });
  source(s, P, "MITRE, From Incentive Prize and Challenge Competitions to Procurement; DOE American-Made Challenges; corporate examples from secondary sources (see evidence bank).", 6.5);

  // KPIs
  s = slide("Tools", "Measuring success: five levels of KPIs, tracked from launch through 36 months");
  table(s, P, [
    ["Level", "Indicators", "When"],
    ["Activity", "Registrations; submissions; disciplines and geographies represented; share new to the sponsor; stage-pass rates", "During Mobilize"],
    ["Output", "Solutions meeting the threshold; performance against baseline; judge scores", "At Select"],
    ["Efficiency", "Cost per viable solution against the internal baseline; time to solution; solver investment as a multiple of the purse", "At award and close"],
    ["Outcome", "Share of winners piloted; share adopted or contracted within 12–24 months; follow-on funding raised; licenses", "12–36 months"],
    ["Capability", "Repeat problem owners; size of the problem pipeline; time from intake to launch; internal attitude survey", "Annually"],
  ], { x: 0.6, y: 1.5, w: 12.1, colW: [1.7, 8.0, 2.4], fontSize: 12.5 });
  source(s, P, "Synthesized from OSTP prize reporting, Nesta impact evaluation and DOE American-Made practice. Nesta: most impact arrives after the prize closes, so budget the 12–36 month follow-up.");

  // Failure modes
  s = slide("Tools", "Risk register: the ten most common failure modes, their early warnings and mitigations");
  table(s, P, [
    ["Failure mode", "Early warning", "Mitigation", "Phase"],
    ["Wrong problem", "Solution is obvious, purchasable or vague", "Fit scorecard; alternatives test", "1–2"],
    ["Absent owner", "Owner skips the interviews", "Make a named owner a gate 1 condition", "1"],
    ["No landing zone", "\"We'll decide after the award\"", "Landing-zone plan at gate 3", "3"],
    ["Mis-sized purse", "Solver test calls it not worth it", "Five-lens sizing; staging; non-cash value", "3"],
    ["Under-budgeted operations", "Budget covers the purse only", "Lifecycle budget worksheet", "1, 3"],
    ["Deterrent IP terms", "Legal arrives at rules drafting", "Legal in Commit; IP model chosen to fit the route", "1, 3"],
    ["Thin participation", "Registrations below target at midpoint", "Multidisciplinary outreach; multipliers; extend", "4"],
    ["Contested judging", "Criteria open to interpretation", "Calibrated rubric; reconciliation; record", "3, 5"],
    ["Not invented here", "Experts describe the challenge as a threat", "Experts as co-designers and judges", "All"],
    ["One-off mindset", "No reuse of templates or network", "Capability layer; handoff package", "6"],
  ], { x: 0.6, y: 1.5, w: 12.1, colW: [2.4, 3.6, 4.9, 1.2], fontSize: 11.5 });

  // ---------- Workshops ----------
  SEC("Workshops");
  divider("Workshops", "Workshops and facilitation", "The first client meeting, the half-day problem-discovery workshop and a question bank.");

  s = slide("Workshops", "First client meeting (60–90 minutes): agenda and facilitator moves");
  table(s, P, [
    ["90-min", "60-min", "Segment", "Facilitator moves", "Deck"],
    ["0–10", "0–5", "Introductions and objectives", "Ask: \"What would make this worth your time a year from now?\" Note the outcome language they use.", "1"],
    ["10–25", "5–15", "Why challenges work and why they fail", "Lead with the distant-solver finding; then failure modes. Ask which ones feel familiar.", "2–4"],
    ["25–45", "15–30", "The journey and the tool choice", "Walk the one-page framework; run the four tool-choice questions against their candidate problem.", "5–6, 13"],
    ["45–70", "30–45", "Rapid readiness conversation", "Probe the three ★ dimensions: owner, absorptive capacity, adoption route. Score privately afterward.", "7, 15"],
    ["70–85", "45–55", "First candidate problems", "Capture 3–8 problems verbatim; do not score yet.", "—"],
    ["85–90", "55–60", "Next steps and decisions", "Propose the six-week sprint; confirm sponsor, owners, interviewees and workshop date.", "16"],
  ], { x: 0.6, y: 1.5, w: 12.1, colW: [0.9, 0.9, 2.7, 6.4, 1.2], fontSize: 12 });
  T(s, [{ text: "Bring: ", options: { bold: true } }, { text: "printed one-page framework, blank readiness scorecard (for your notes only), a list of two or three relevant prize examples from the client's sector." }],
    { x: 0.6, y: 6.15, w: 12.1, h: 0.5, fontSize: 12.5, color: P.ink });

  s = slide("Workshops", "Problem-discovery workshop (half-day, Frame): from a long list to one to three challenge-ready problems");
  table(s, P, [
    ["Time", "Block", "Method", "Output"],
    ["Pre-work", "Interviews and landscape", "Owner interviews; roadmap and gap review; scan of prior challenges in the field", "Seed list of 15–30 gaps"],
    ["0:00–0:20", "Anchor the outcome", "Recap Tool 2; agree which outcome this program serves", "Agreed outcome"],
    ["0:20–1:00", "Diverge", "Silent writing of pain points as \"How might we…\"; cluster on a wall", "Long list in clusters"],
    ["1:00–1:40", "Converge", "Dot-vote on the ★ fit criteria; discuss outliers", "Shortlist of 4–6"],
    ["1:40–1:55", "Break", "", ""],
    ["1:55–2:45", "Define", "Breakouts fill canvas boxes 1–6 for each shortlisted problem", "Draft canvases"],
    ["2:45–3:20", "Abstract", "Rewrite each statement for \"a smart engineer in another industry\"; swap and critique", "Solver-facing drafts"],
    ["3:20–3:40", "Land it", "Canvas box 9: who adopts, which route, what budget", "Landing-zone check"],
    ["3:40–4:00", "Decide", "Rank; name owners; agree follow-up scoring and solver tests", "Top 1–3 and owners"],
  ], { x: 0.6, y: 1.5, w: 12.1, colW: [1.25, 2.05, 6.0, 2.8], fontSize: 11.5 });
  source(s, P, "Participants: sponsor (opening and close), 2–4 problem owners, 2–3 technical experts, one procurement or legal voice. Materials: canvas posters, Tool 3 sheets, dot stickers. Abstraction exercise based on InnoCentive practice.");

  s = slide("Workshops", "Discovery question bank: what to ask in interviews and the first meeting");
  const qb = [
    ["Outcome", ["What would success look like in two years?", "Are you after a solution, a market, a community, or attention?", "What have you tried, and why did it fall short?"]],
    ["Problem", ["Who else has this problem?", "Could you buy the answer today?", "How would you know, objectively, that it is solved?"]],
    ["Owner and adoption", ["Who will use the winning solution day to day?", "What happens the week after the award?", "Which budget pays for a pilot?"]],
    ["Constraints", ["What authority lets you award prizes?", "What must you own; what can solvers keep?", "Can data be shared? Any export controls?"]],
    ["Culture", ["How will your experts react to an outside winner?", "Who internally would champion it?", "Has an outside idea ever been adopted here?"]],
    ["Budget and time", ["Is there funding beyond the purse?", "Any fixed dates: fiscal year, events, announcements?", "Who signs off spending?"]],
  ];
  qb.forEach((q, i) => {
    const col = i % 3, row = Math.floor(i / 3);
    const x = 0.6 + col * 4.08, y = 1.5 + row * 2.5;
    card(s, P, x, y, 3.9, 2.3, { fill: row === 0 && col === 2 ? P.teal : P.mist, name: `qbank-${i + 1}` });
    const dark = row === 0 && col === 2;
    T(s, q[0], { x: x + 0.2, y: y + 0.15, w: 3.5, h: 0.38, fontSize: 15, bold: true, color: dark ? P.white : P.teal });
    T(s, bulletRuns(q[1], { gap: 5, run: { fontSize: 12, color: dark ? P.white : P.ink } }), { x: x + 0.2, y: y + 0.6, w: 3.5, h: 1.6 });
  });

  // ---------- Evidence ----------
  SEC("Evidence");
  s = slide("Evidence", "Evidence bank: claims we use and how confident we are in each");
  const V = (t) => ({ text: t, options: { color: P.teal, bold: true } });
  const X = (t) => ({ text: t, options: { color: P.coral, bold: true } });
  table(s, P, [
    ["Claim", "Source", "Status"],
    ["Distant-field solvers more likely to win (166 challenges, 12,000+ solvers)", "Jeppesen & Lakhani, Organization Science (2010)", V("Peer reviewed")],
    ["Ansari XPRIZE: 26 teams, >$100M spent for a $10M purse", "XPRIZE; Wikipedia", V("Widely reported")],
    ["251 federal competitions, $194.4M in purses, FY21–22", "OSTP report (2024)", V("Government report")],
    ["More entrants: less effort each, more extreme-value outcomes", "Boudreau, Lacetera & Lakhani, Management Science (2011)", V("Peer reviewed")],
    ["Small-prize administration 1.7×–11× the purse", "Nextgov (2012), White House disclosures", V("Press, 2012 data")],
    ["81% convert under 25% of startup pilots into deals", "500 Startups survey via Fortune (2017)", X("Survey; check wording")],
    ["NASA scientists adopted external solutions only after identity shift", "Lifshitz-Assaf, ASQ (2018)", V("Peer reviewed")],
    ["NOIS3: 25 awardees, up to $475M over 10 years", "GovConWire (2025)", X("Trade press; confirm")],
    ["Unilever Foundry: ~95 pilots, ~45 scaled", "FoodNavigator (2016)", X("Single secondary source")],
    ["NASA Tournament Lab: ~94% success, 80–99% savings", "NASA CoECI presentation", X("Self-reported")],
    ["\"Operations ≈ 1–2× purse\" rule of thumb", "None found", X("Do not use")],
  ], { x: 0.6, y: 1.5, w: 12.1, colW: [5.6, 4.3, 2.2], fontSize: 11.5 });
  source(s, P, "Research ran through search summaries because the primary PDFs were not reachable from this environment. Check every coral-flagged item against the primary document before using it in a proposal.");

  s = slide("Evidence", "Sources and further reading");
  const src = [
    "Boudreau & Lakhani (2013), Using the Crowd as an Innovation Partner, HBR",
    "Boudreau, Lacetera & Lakhani (2011), Incentives and Problem Uncertainty in Innovation Contests, Management Science",
    "Challenge.gov / GSA, Prize and Challenge Toolkit (2026 edition)",
    "Cohen & Levinthal (1990), Absorptive Capacity, Administrative Science Quarterly",
    "Deloitte GovLab (2014), The Craft of Incentive Prize Design",
    "Frangione, C., XPRIZE testimony to the US Senate Commerce Committee",
    "Jeppesen & Lakhani (2010), Marginality and Problem-Solving Effectiveness in Broadcast Search",
    "Kay, L. (2011), Managing Innovation Prizes in Government, IBM Center for the Business of Government",
    "Lifshitz-Assaf (2018), Dismantling Knowledge Boundaries at NASA, ASQ",
    "McKinsey & Company (2009), And the Winner Is…",
    "MITRE, From Incentive Prize and Challenge Competitions to Procurement",
    "Nesta / Challenge Works, Challenge Prizes: A Practice Guide",
    "NREL, American-Made Solar Prize evaluation (TP-6A50-89607)",
    "OMB M-10-11 (2010), Guidance on the Use of Challenges and Prizes",
    "OSTP (2024), Implementation of Federal Prize and Citizen Science Authority FY2021–22",
    "Pisano & Verganti (2008), Which Kind of Collaboration Is Right for You?, HBR",
    "Spradlin (2012), Are You Solving the Right Problem?, HBR",
    "15 U.S.C. §3719 (America COMPETES Reauthorization Act of 2010, §105)",
  ];
  T(s, bulletRuns(src.slice(0, 9), { gap: 7, run: { fontSize: 12.5, color: P.ink } }), { x: 0.6, y: 1.5, w: 5.9, h: 5.2 });
  T(s, bulletRuns(src.slice(9), { gap: 7, run: { fontSize: 12.5, color: P.ink } }), { x: 6.8, y: 1.5, w: 5.9, h: 5.2 });

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, L.THEME);
  console.log("wrote", OUT);
})();

// NSF edition of the internal playbook: the template's tools applied to RFTP NOIS3-085.
const { applyTheme } = require(process.env.PPTX_SKILL + "/scripts/apply_theme.js");
const L = require("./lib");
const { T, card, bulletRuns, circleNum, source, table, H } = L;

const OUT = process.argv[2] || "nsf_playbook.pptx";
const NAME = "NSF Quantum Algorithms Challenge";

(async () => {
  const { pres, P } = L.newDeck(NAME + ": delivery playbook", { footer: NAME + "  ·  Delivery playbook  ·  Internal" });
  const HF = L.THEME.headFontFace;
  const slide = (sec, title) => { const s = pres.addSlide({ masterName: "Title Only", sectionTitle: sec }); s.addText(title, { placeholder: "title" }); return s; };
  const V = (t) => ({ text: t, options: { bold: true, color: P.teal } });
  const X = (t) => ({ text: t, options: { bold: true, color: P.coral } });

  // ---------- Title ----------
  pres.addSection({ title: "Overview" });
  let s = pres.addSlide({ masterName: "Title Dark", sectionTitle: "Overview" });
  s.addText("NSF delivery playbook", { placeholder: "title" });
  s.addText(NAME + " (NOIS3-085)  ·  The Challenge Journey tools applied to this task order\nInternal  ·  Working draft  ·  October 2026", { placeholder: "body" });

  // ---------- Curation rules ----------
  s = slide("Overview", "How this edition relates to the template");
  const rules = [
    ["The template stays generic", "The Challenge Journey client deck and playbook are unchanged and reusable for any client."],
    ["Same framework, same tools", "This edition applies the six phases and the ten tools to NOIS3-085; nothing new is invented for NSF alone."],
    ["Every claim traces to a source", "Each NSF-specific statement cites an RFTP section, our proposal (v6, Sep 9, 2026) or a public source."],
    ["Client-facing and internal stay separate", "The NSF client deck carries no contractor branding; internal scoring and risks live only here."],
    ["Update as decisions land", "Each NSF or collaborator decision updates one content file; both decks rebuild from it."],
  ];
  rules.forEach((r, i) => {
    const y = 1.5 + i * 0.98;
    circleNum(s, P, 0.6, y + 0.1, 0.55, i + 1, { fill: i === 0 ? P.coral : P.teal, fontSize: 17 });
    T(s, r[0], { x: 1.4, y, w: 4.2, h: 0.75, fontSize: 15, bold: true, color: P.teal, valign: "middle" });
    T(s, r[1], { x: 5.7, y, w: 7.0, h: 0.75, fontSize: 13.5, color: P.ink, valign: "middle" });
  });

  // ---------- Traceability ----------
  pres.addSection({ title: "Traceability" });
  s = slide("Traceability", "Traceability: every RFTP requirement lands in a phase, with our committed response and status");
  table(s, P, [
    ["Phase", "RFTP requirements", "Our proposal commitment (v6)", "Status, Oct 2026"],
    ["1 Commit", "§1.2–1.3 goals; COMPETES and CHIPS authority; $1M Phase 1 purse", "Kickoff in award week; pre-competition launch report Part 1 within 7 days", V("Done")],
    ["2 Frame", "§2.1.1.1 problem analysis and decomposition; challenge statement", "Problem statement anchored in industry constraints; scoring dimensions separated", X("Open: use-case scope")],
    ["3 Design", "§2.1.1.2 rules, terms and conditions; §2.1.6.1 participation agreement; §2.1.5 judging", "Rules and agreement drafted in the first 4 weeks; NSF review; judges calibrated", X("Open: prize structure, criteria")],
    ["4 Mobilize", "§2.1.2 splash page, website, Q&A; §2.1.4 outreach, EPSCoR, webinars; §2.1.1.6 registrant analysis", "Outreach to ~280 organizations; monthly registrant-quality reports; launch in early Dec", V("Splash page and QWC done")],
    ["5 Select", "§2.1.5 judging; §2.1.6.2 eligibility verification; §3.1 solutions by May 20, 2027", "April judging; up to 40 × $25K paid with documented verification", "Upcoming: Apr–May 2027"],
    ["6 Adopt", "§2.1.4 collaborator coordination; Phase 2 status webinar; §4.3 close-out; §2.1.8 records", "Pairing logistics; status webinar; close-out package from live data", "Upcoming: mid-2027–2029"],
  ], { x: 0.6, y: 1.5, w: 12.1, colW: [1.3, 4.1, 4.3, 2.4], fontSize: 11.5, bump: 2.5 });
  source(s, P, "Sources: RFTP NOIS3-085; NOIS3-085 proposal portal response v6 (Sep 9, 2026). Award assumed Sep 16, 2026 per the RFTP Q&A.");

  // ---------- Gates ----------
  s = slide("Traceability", "NSF gates: dated decision points to keep the December launch and the May 20 delivery");
  table(s, P, [
    ["Gate", "Must be true", "Decides", "Target date"],
    ["2 Problem approved", "Use-case scope decided; collaborator problem areas in hand or a fallback agreed; success criteria measurable", "NSF", "Late Oct 2026"],
    ["3 Design signed off", "Prize structure chosen against pairing capacity; criteria and weights set; rules and agreement through NSF review; USA.gov posting ready", "NSF (with CoECI)", "Late Nov 2026"],
    ["4 Participation check", "Registrants on pace by segment and EPSCoR reach; likely high-quality submitters identified monthly", "Our team + NSF", "Monthly, Jan–Mar 2027"],
    ["5 Awards approved", "Scores reconciled; winners verified (eligibility, DCL 26-022, ethics); NSF concurrence", "NSF", "Early May 2027"],
    ["6 Phase 2 go", "Pairings agreed with pre-qualified partners; Phase 2 prize and payer defined", "NSF + collaborators", "Jun–Jul 2027"],
  ], { x: 0.6, y: 1.5, w: 12.1, colW: [2.2, 6.4, 1.9, 1.6], fontSize: 12, bump: 2.5 });
  source(s, P, "Dates follow the proposed schedule and RFTP §3.1. The Gate 4 thresholds should be set once the first monthly registrant report is in.");

  // ---------- Tools applied ----------
  pres.addSection({ title: "Tools applied" });
  s = slide("Tools applied", "Tool 1 applied · Readiness: 29 of 40, so proceed, with three dimensions sitting exactly at the threshold");
  table(s, P, [
    ["Dimension", "Score", "Evidence", "Action"],
    ["Executive sponsor", "5", "NSF TIP; Project Triad and Quantum+X are top-level priorities", "Keep sponsor at gates 3 and 5"],
    ["Problem owner ★", "3", "NSF owns the program; ownership of each use case with the ~8 companies is unclear", "Name a contact per company (ask 1–2)"],
    ["Funding", "3", "Phase 1 purse funded; Phase 2 purse and payer undetermined", "Decision before Phase 1 winners"],
    ["Legal and IP", "4", "COMPETES and CHIPS authority; IP stays with participants; DCL 26-022 certification", "FAQ on research security"],
    ["Absorptive capacity ★", "3", "Depends on each company's capacity to pilot with teams", "Collect pairing capacity (ask 1)"],
    ["Adoption pathway ★", "4", "Phase 2 pairing and pilots designed in", "Make the pairing path explicit in the rules"],
    ["Cultural openness", "4", "Industry co-design is built into Quantum+X", "—"],
    ["Measurement", "3", "RFTP metrics are activity-level; no Phase 2/3 outcome metrics yet", "Propose outcome KPIs"],
  ], { x: 0.6, y: 1.5, w: 12.1, colW: [2.4, 0.8, 5.3, 3.6], fontSize: 11.5, bump: 2.5 });
  source(s, P, "Internal working assessment for discussion; do not share with the client. Decision rule from the template: proceed at 28+ with no ★ item below 3.");

  s = slide("Tools applied", "Tool 3 applied · Challenge fit: 56 of 70, a strong candidate, held back by measurability and outsider access");
  table(s, P, [
    ["Criterion", "Weight", "Score", "Note"],
    ["Important and widely recognized", "×2", "5", "Algorithm gap is a recognized national priority"],
    ["Solution not obvious or purchasable ★", "×2", "5", "No off-the-shelf quantum advantage for these use cases"],
    ["Outsiders could contribute", "×2", "3", "Quantum expertise is a barrier; domain experts help through teaming"],
    ["Success measurable and judgeable ★", "×2", "3", "Paper Phase 1: credibility rests on benchmarks against classical baselines"],
    ["Statable without confidential context", "×1", "4", "Depends on how anonymized the collaborator briefs are"],
    ["IP and data shareable", "×1", "4", "IP stays with participants; data depends on collaborators"],
    ["Owner and adoption path ★", "×2", "4", "Phase 2 pairing; per-company ownership to confirm"],
    ["Solvable at reasonable cost", "×1", "4", "$25K fits a proposal-stage entry; benchmarks add effort"],
    ["Challenge beats alternatives", "×1", "4", "Reaches beyond NSF's grantee base; complements Quantum+X funding tracks"],
    [{ text: "Total", options: { bold: true } }, "", { text: "56 / 70", options: { bold: true } }, ""],
  ], { x: 0.6, y: 1.5, w: 12.1, colW: [3.7, 0.9, 0.9, 6.6], fontSize: 11.5, bump: 2.5 });
  source(s, P, "Internal working assessment. The two weakest items point to two design actions: a benchmark-credibility criterion, and explicit teaming support between quantum researchers and domain experts.");

  s = slide("Tools applied", "Tool 10 applied · Landing-zone plan: the gaps to close before launch");
  table(s, P, [
    ["Question", "What we know", "Gap and owner"],
    ["Who adopts the result?", "Pre-qualified industry partners in Phase 2", X("Named contact per company: NSF")],
    ["Through which route?", "Pairing event, joint design, ~6-month pilot, ~9-month monitoring", V("Defined in RFTP")],
    ["What budget, when?", "Phase 2 prize undetermined; payer undetermined", X("NSF decision before Phase 1 winners")],
    ["Do IP and data terms allow it?", "IP remains with participants; companies negotiate directly", X("Guidance for partners on terms: NSF and counsel")],
    ["What do winners get beyond cash?", "Industry pairing; partner data, compute or hardware (to confirm)", X("Collaborator offers: ask 1")],
    ["Success at 12, 24, 36 months?", "Not yet defined beyond RFTP §4.3 reporting", X("Propose outcome KPIs: our team")],
    ["Who holds the network after?", "Records relinquished to NSF; database kept one year past performance", V("RFTP §2.1.5.5, §2.1.8")],
  ], { x: 0.6, y: 1.5, w: 12.1, colW: [3.2, 5.0, 3.9], fontSize: 12, bump: 2.5 });

  s = slide("Tools applied", "Tool 7 applied · Purse: options within $1M, with judging load and pairing capacity as the tests");
  table(s, P, [
    ["Option", "Structure", "Teams entering Phase 2", "Per collaborator (~8)", "Verification load by May 20"],
    ["A · RFTP baseline", "40 × $25,000", "Up to 40", "~5", "40 winner verifications and payments"],
    ["B · Tiered", "20 × $25,000 + 10 × $50,000", "Up to 30", "~4", "30; tier line needs reconciled scores"],
    ["C · Fewer, larger", "20 × $50,000", "Up to 20", "~2–3", "20"],
    ["$2M modification", "e.g., 40 × $50,000", "Up to 40", "~5", "40; same process, scales unchanged"],
  ], { x: 0.6, y: 1.5, w: 12.1, colW: [2.3, 3.0, 2.2, 2.0, 2.6], fontSize: 12.5, bump: 2.5 });
  card(s, P, 0.6, 4.4, 12.1, 2.0, { fill: P.mist, name: "purse-notes" });
  T(s, "Practitioner notes", { x: 0.85, y: 4.52, w: 5, h: 0.35, fontSize: 14, bold: true, color: P.teal });
  T(s, bulletRuns([
    "The RFTP invites a better alternative structure; our proposal priced the baseline. Any change goes through NSF before the rules are drafted, not after.",
    "Price is unaffected: the purse is a pass-through at $1M whichever split is chosen.",
    "If collaborators report low pairing capacity, Option A still works if NSF accepts that not every Phase 1 winner enters Phase 2. Say that explicitly in the rules.",
  ], { gap: 5, run: { fontSize: 12.5, color: P.ink } }), { x: 0.85, y: 4.9, w: 11.6, h: 1.45 });
  source(s, P, "RFTP NOIS3-085 §1.3; proposal v6 §5.2.6 (purse is a pass-through with no indirects or fee).", 6.55);

  // ---------- Risks ----------
  pres.addSection({ title: "Risks and KPIs" });
  s = slide("Risks and KPIs", "NSF risk register: the eleven risks most likely to hurt this challenge");
  table(s, P, [
    ["Risk", "Early warning", "Mitigation", "Owner"],
    ["Pairing capacity below winner count", "Collaborators can't name team counts", "Size winner count to capacity; state pairing limits in rules", "NSF"],
    ["Use cases too vague (or too narrow)", "Briefs not in by mid-Nov", "Brief template; fallback to sector-level framing", "NSF + us"],
    ["Unverifiable quantum-advantage claims", "Submissions lack classical baselines", "Evidence-credibility criterion; baseline guidance in rules", "Us"],
    ["Entry burden of NSF-format documents", "Registrants drop off at submission", "SciENcv guide, office hours, early reminders", "Us"],
    ["Industry judge conflicts", "Judge ties to teams or future pairings", "Attestations; recusal rule agreed up front", "NSF + us"],
    ["Thin EPSCoR participation", "Low registrations from EPSCoR states", "State EPSCoR offices; targeted webinars", "Us"],
    ["Holiday-season launch", "Slow December sign-ups", "Plan a January relaunch push", "Us"],
    ["Research security confusion (DCL 26-022)", "Repeated questions in the Q&A forum", "Plain-language FAQ reviewed by NSF", "NSF + us"],
    ["Media review delays", "Assets waiting on two-week review", "Review calendar set in October", "Us"],
    ["Phase 2 prize undefined", "Winners unsure what comes next", "NSF decision before winners are announced", "NSF"],
    ["40 verifications by May 20", "Judging slips past April", "Verify eligibility on arrival; payment process ready", "Us"],
  ], { x: 0.6, y: 1.5, w: 12.1, colW: [3.3, 3.2, 4.3, 1.3], fontSize: 11, bump: 2 });

  s = slide("Risks and KPIs", "KPIs: RFTP reporting metrics plus the outcome metrics we propose to NSF");
  table(s, P, [
    ["Level", "Required by RFTP §4.3.9", "Proposed additions"],
    ["Activity", "Webinar attendees; registered participants; active participants; unique solvers; submissions; countries", "Share from EPSCoR jurisdictions; share new to NSF funding; mix by segment (researcher, startup, lab, domain expert, student)"],
    ["Output", "Winners and award amounts; solution records with TRL and taxonomy ID", "Share of submissions with credible classical baselines; spread of judge scores"],
    ["Efficiency", "Contractor–government meeting hours", "Cost per qualified submission; days from close to award"],
    ["Outcome", "—", "Pairings formed; pilots launched; pilots meeting success criteria; follow-on funding or contracts at 12 and 24 months"],
    ["Capability", "Lessons learned; close-out meeting", "Reusable rules and brief templates for later Quantum+X tracks; network handed to NSF"],
  ], { x: 0.6, y: 1.5, w: 12.1, colW: [1.6, 5.0, 5.5], fontSize: 12, bump: 2.5 });
  source(s, P, "Countries is required by the RFTP but participation is U.S.-only; report states and EPSCoR jurisdictions alongside it.");

  // ---------- Meeting ----------
  pres.addSection({ title: "Next week" });
  s = slide("Next week", "Next week's session with NSF and the industry collaborators: agenda and facilitator moves");
  table(s, P, [
    ["90-min", "60-min", "Segment", "Facilitator moves", "Deck slides"],
    ["0–10", "0–5", "Introductions and goals", "Each collaborator: one sentence on the problem they'd most like solved", "1–2"],
    ["10–20", "5–12", "The landing-zone idea", "Land the core point: Phase 1 is built backward from Phase 2", "3–5"],
    ["20–30", "12–17", "Where we are and the timeline", "Confirm the December launch; flag the November rules deadline", "4, 6"],
    ["30–50", "17–32", "Use cases and the brief", "Walk the one-page brief; get a yes or no from each company on writing one", "7"],
    ["50–65", "32–42", "Pairing capacity and prize structure", "Ask each company for a team count; test options A, B and C", "8"],
    ["65–80", "42–52", "Judging and conflicts", "Agree the recusal principle; ask for judge nominations", "9"],
    ["80–90", "52–60", "Asks, decisions, next 90 days", "Confirm a named contact and a date for each ask", "13–15"],
  ], { x: 0.6, y: 1.5, w: 12.1, colW: [0.9, 0.9, 2.6, 6.2, 1.5], fontSize: 12, bump: 2.5 });
  T(s, [{ text: "Hold in reserve: ", options: { bold: true } }, { text: "slides 10–12 (mobilize, eligibility, adopt) for questions; send the deck afterward with the asks table as the cover note." }],
    { x: 0.6, y: 6.0, w: 12.1, h: 0.5, fontSize: 12.5, color: P.ink });

  s = slide("Next week", "Question bank for the session");
  const qb = [
    ["For each collaborator", ["Which problem would you most want a quantum team working on?", "What would a measurable win over your classical method look like?", "How many Phase 2 teams could you work with, and with what data or compute?", "Who on your team owns a pilot?"]],
    ["For NSF", ["Open sectors or anchored problem areas?", "Is there appetite for a tiered or fewer-larger prize?", "Can the rules state a purse that may increase?", "When will the Phase 2 prize and payer be settled?"]],
    ["For everyone", ["What should a judge do if they may later partner with a team?", "How should the challenge treat claims of quantum advantage?", "What would make this a model for later Quantum+X tracks?"]],
  ];
  qb.forEach((q, i) => {
    const x = 0.6 + i * 4.1, hi = i === 0;
    card(s, P, x, 1.5, 3.85, 4.9, { fill: hi ? P.teal : P.mist, name: `qbank-${i + 1}` });
    T(s, q[0], { x: x + 0.25, y: 1.65, w: 3.4, h: 0.4, fontSize: 15, bold: true, color: hi ? P.white : P.teal });
    T(s, bulletRuns(q[1], { gap: 9, run: { fontSize: 13, color: hi ? P.white : P.ink } }), { x: x + 0.25, y: 2.2, w: 3.4, h: 4.0 });
  });

  // ---------- Open items ----------
  s = slide("Next week", "Open items to confirm before the deck goes out");
  table(s, P, [
    ["Item", "Why it matters", "Status"],
    ["Official competition name", "The deck uses the RFTP title as a placeholder", X("Confirm")],
    ["Names of the ~8 collaborating companies", "Not in the RFTP; the deck avoids naming them", X("Confirm with NSF")],
    ["Phase 2 timing", "Deck timeline infers design, pilot and monitoring dates", X("Indicative")],
    ["Project Triad details", "Taken from press coverage; nsf.gov was not reachable for verification", X("Verify on nsf.gov")],
    ["Splash page and QWC handout", "Reported done; deck states it", V("Confirmed by team")],
    ["Media review", "The deck is a client product, and may need NSF review before external sharing", X("Check with COR")],
  ], { x: 0.6, y: 1.5, w: 12.1, colW: [3.6, 6.2, 2.3], fontSize: 12.5, bump: 2.5 });

  await pres.writeFile({ fileName: OUT });
  await applyTheme(OUT, L.THEME);
  console.log("wrote", OUT);
})();

# NOIS3-073 (Qu-SAFE) — Draft status

Submission deadline: **09/10/2026, 5:00 PM Central**. Portal:
`https://nasacentral.my.site.com/coecicontractor/s/submit-proposal`
One proposal per prime; a later submission silently replaces an earlier one.

**These files are now the current version**, replacing the earlier drafts that
carried `[DATE]` / `[QUANTUM PARTNER]` / `[ALT TOTAL]` placeholders and the
CIMIT + QDTI team. Subcontractor is WFIRM. Paste each file verbatim.

## Field drafts and character counts (verified with `wc -m`)

| File | Field | Cap | Count | Fill |
|---|---|---|---|---|
| `01_technical_approach.md` | Technical Approach | 7,500 | 7,493 | 99.9% |
| `02_schedule_pm_communications.md` | Schedule, PM, Communications | 3,000 | 2,999 | 100.0% |
| `03_rationale_for_selection.md` | Rationale for Selection | 2,000 | 1,999 | 100.0% |
| `04_total_price_and_narrative.md` | Total Price + Narrative | 900 (narrative) | 804 | 89.3% |
| `05_teaming_arrangements.md` | Teaming Arrangements | 2,000 | 1,996 | 99.8% |
| `06_alternate_approach.md` | Alternate Approach (optional) | 3,000 | 2,577 | 85.9% |

`04` line 1 is the Total Price field (5.2.5); the narrative (5.2.6) starts line 3.
Caps of 7,500 and 900 are the live portal values, not the RFTP PDF's 6,500 / 500.

## Price reconciliation (all ties verified)

- Phase splits `177,398 + 125,122 + 159,973 = 462,493`
- FedTech `139,403 + 87,127 + 121,978 = 348,508` (75.4% prime share, clears the >50% rule)
- Panel `37,995 x 3 = 113,985`; `348,508 + 113,985 = 462,493`
- Labor `279,922` + loaded ODC/travel `68,586` = `348,508`
- Honoraria `120 x $193 + 160 x $271 = 66,520`; `+ 47,465` panel overhead `= 113,985`
- Stage 2 honoraria `37,120`; Tier 1 `+57,444 = 94,564` (2.55x); tiers `519,937` / `552,396`

## Technical Approach restructured to the NOIS3-045 pattern

Field 1 now mirrors the structure of the successful 045 bid, at the user's
direction, after the 045 source text became available:

- Two anchor paragraphs (field state, three gaps, who does what), then
- **Challenge Design and Stage Structure** as the largest single block - five
  paragraphs walking pre-launch, Stage 1, between-stage matchmaking,
  Milestone 1 and Milestone 2. By-phase content went from 608 characters in
  one paragraph to 2,454 across five.
- Then 045's focused closers with run-in labels: Outreach and Participant
  Recruitment, Platform and Submission Management, Judging and Evaluation,
  In-Person Convening, Reporting and Network Handoff.

Proportions match 045's own (phase block largest single section; closers
collectively larger). The standalone compliance paragraph was dissolved and
its content threaded into Platform, Judging and Reporting, which is what 045
does.

Cut to fund the expansion: the four NOIS3-039 named individuals (045 names
categories and one network, never individuals), the UMD Quantum Startup
Foundry mention (deduped - it carries the point in field 3), and the AVATAR
opener, demoted to a clause in the second anchor paragraph.

**Known limitation.** 045 attaches a named instrument to every phase (POCTRN,
CoLab, Risk Assessment Score, CRAASH). Qu-SAFE has one, PhysioVerse. The
remaining phase paragraphs describe process rather than proprietary method.
This is downstream of the SME concepting conversation that never happened.

## Fields 2, 3 and 5 benchmarked to NOIS3-045

Same pass as field 1, using the 045 source text.

- **Field 2** now opens with a `Project Timeline:` label and run-in phase
  labels (Setup and Launch, Stage 2, Convening and Closeout), as 045 does.
  Added a named communications owner with tenure (Justin Panzer, Director of
  Marketing, 20+ years), audience segmentation, and the named-role backup
  commitment within FedTech's 10+ person Arlington VA delivery team - the
  continuity answer a five-year period with long gaps needs.
- **Field 3** gained a one-line thesis and FedTech throughput figures carried
  from 045: 136 programs, and xTechSearch at 134 startups across 15+ cohorts
  with 1,650 mentorship hours.
- **Field 5** gained the named single point of contact (Chikobe) and 516+
  engagements spanning DOD, DARPA, NASA and civilian agencies.

**Deliberately NOT carried from 045:** its "TO 021, TO 039" active task order
citation. Field 3 names 045, 050 and 039, which is this bid's own established
set, and field 5 says "an active NOIS3 performer" without numbers.

**Carried from 045 at the user's direction and therefore as old as that bid:**
136 programs, 516+ engagements, 134 startups / 15+ cohorts / 1,650 hours,
10+ person Arlington team, Chikobe 15+ years, Panzer 20+ years. Refresh any
that have moved before submitting.

## Resolved this pass

- **AVATAR corrected.** Artemis II launched 04/01/2026, splashed down 04/10/2026.
  Was written in present tense ("is flying") — now past tense, samples in
  post-flight analysis. Attribution fixed: NASA-led with BARDA and NCATS.
- **Quantum specificity restored.** NV-diamond magnetometry, OPM, quantum dot
  labels, single-photon detection, plus two named endpoints with classical
  comparators (MEA population average; plate-assay limit of detection).
- **ODC changed `68,590` -> `68,586`** so labor + ODC + panel ties exactly to
  462,493. **Confirm against the budget workbook before submitting.**
- Duplicated media-review fragment deleted from field 2 (90 chars).
- Alternate no longer concedes the base bid under-funds Stage 2 review.
- Teaming: added weekly sync, three-capabilities framing, and real 5.3.3
  disclosure in place of a promise to disclose later.
- HBCU / MSI / EPSCoR recruitment metric restored to field 1.
- Cross-field near-verbatim repeats removed (Yoo/ISS, registrant declaration,
  recusal, DC-and-Boston).

## Open items before submitting

1. **RFTP PDF still missing.** Field 2 dates are unverified against §1.3.2, and
   SOW §2.1.2–2.1.10 has not been walked against source. Highest-priority check.
2. **Confirm ODC `68,586`** against `NOIS3-073-Budget-Workbook.xlsx`.
3. **Chikobe "15 years"** carried from the 045 bid — confirm.
4. **WFIRM is a verbal commitment** from Atala and Yoo. Field 5 says "have
   committed… subcontract executes at award," which is accurate for a verbal.
   Do not upgrade that wording without an instrument.
5. **File uploads.** Max 2 PDFs, 1 page each, never the proposal itself.
   Recommendation stands: Gantt + problem-understanding graphic; drop the team
   graphic (field 5 covers it at 99.7%). Both need rebuilding.
6. Fresh-eyes read-through before pasting (single-submission rule).

## Compliance tripwires

- [x] Every field under cap (verified)
- [x] One hyperlink, in Rationale only, past project only (NASA Vascular Tissue Challenge)
- [x] Total Price excludes the $7.1M purse, stated explicitly
- [x] Convening budget covers contractor staff travel only
- [x] Section 508 + 36 C.F.R. Part 1194 stated for products, platform, communications
- [x] FAR 52.225-5 designated countries applied to external reviewers
- [x] Subcontractor identity and relationship disclosed (§5.3.3)
- [x] Prime performs >50% (75.4%)
- [x] SOW cited by content, not by the RFTP's defective numbering
- [x] No placeholders remain
- [ ] Items 1–3 above verified

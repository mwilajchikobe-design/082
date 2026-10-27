# Handoff: apply FedTech branding to the NOIS3 Challenge Playbook and the Challenge Design Document template

Paste this brief into a new Claude session on the FedTech work account and upload the files listed in step 1. Upload the FedTech brand guide and logo files in the same message.

---

## 1. Files to upload

| File | What it is |
|---|---|
| `FedTech_NOIS3_Challenge_Playbook.pdf` | The playbook as it stands: 58 landscape pages (1920×1440 artboards). Reference only. Every page is a flat image, so do not edit the PDF directly. |
| `Challenge_Design_Document_Template.docx` | Word template for the challenge design document: 23 pages, US Letter, Arial. |
| `FedTech_Playbook_and_Design_Doc_Source.zip` | The editable source for both documents. See section 5. |
| FedTech brand guide, logo files (SVG/PNG), brand fonts | Supplied from the work account. |

The playbook was also built as a Claude Design canvas on a personal account. That canvas is private, so the work account cannot open it. Work from the source zip instead.

## 2. What these documents are

**NOIS3 Challenge Playbook.** An internal reference for FedTech Program Managers who lead NASA Open Innovation Services 3 (NOIS3) prize challenges. It is also shared with marketing. Contents, in order:

- **Start here (pages 1–13):** overview; contents; the FedTech way (principles and design method, both marked "draft for review"); where CoECI sits; participant and client journeys; timeline and dependencies; milestone readiness checks; risks and early warnings; PM resourcing (section page, team matrix, what the PM keeps, delegation guide).
- **Fifteen workflows (pages 14–51),** in three phases plus a quality check. Each has a dark section-break page (illustration, best practices, key questions) followed by a step sheet.
  - **Design & launch (01–06):** challenge design session, website, application platform, Challenge.gov, outreach, info session.
  - **Run the competition (07–09):** competitor management, technical webinar, judging, plus the rubric method and the evaluation benchmarks.
  - **Results & closeout (10–14):** prize purse, winner announcement, convening, reporting and closeout, subcontractors.
  - **Quality check (15):** pipeline and outreach QA, with the ecosystem map and pipeline assumptions worksheet (A10) and the outreach plan and partner QA worksheet (A11).
  - Workflow 01 also has the glossary, the design document checklist and the rules and compliance page. Workflow 10 has a worked example from NOIS3-085.
- **Annex and references (pages 52–58):** templates index; design document key questions (two pages); evaluation rubric template; blank workflow template; references (two pages).

**Challenge Design Document template.** A Word document a PM fills in with the client during the design session, then sends for agency clearance. It has:

- a cover, document control and how-to-use page;
- 17 sections. Each has a purpose line, a red draft note, a blue key-questions box and fill-in tables;
- Annex A (glossary), Annex B (rules and compliance questions) and an approval block.

The two documents share content. Both the Word template and playbook pages 53–54 are generated from `design-doc/content.json`. If you change section names or key questions, keep the two in step.

## 3. The branding task

Apply the FedTech visual identity to both documents: logo, colors, typefaces, cover treatment, headers and footers, and the illustration style on the section-break pages. Then rebuild the PDF and the Word file.

### Colour meanings that must survive the rebrand

Some colours carry meaning, not just style. You may change the exact hex values to fit the brand, but keep three clearly distinct categories, and check contrast with WCAG AA.

| Current colour | Meaning | Where it appears |
|---|---|---|
| Orange `#C2410C` (tints `#FDEEE4`, `#9A3412`, `#7A2A07`) | **Client approval gate**. Work stops until the client signs off. Also used for "client named" tags and for warnings. | Step-card headers, gate counts, diamonds on the timeline, "common trap" boxes |
| Blue `#1D4ED8` (tints `#E8EEFD`, `#EEF2FD`, `#1E3A8A`) | **Client input**, and **key questions to ask the client**. | Step cards, key-question boxes |
| Gray `#4A5059` / `#F2F3F5` | **FedTech internal** step | Step cards |
| Ink `#16181D` | Body text, section-break panels, rules | Everywhere |
| Teal `#0F766E` and violet `#6D28D9` | Participant lane and client lane | Journey page only |
| Bright red `#E00000` on `#FFE5E5` (Word only) | **Draft note: delete before sending to the client**. Keep this unmistakable, whatever the brand palette. | Every section of the design document |

Approval (orange) and input (blue) must never become the same colour or similar shades. PMs read the whole playbook through that distinction. Every page also uses the same diamond / circle / square icons for approval, input and internal, so keep those shapes even if the colours change.

### Typefaces

- **Playbook:** IBM Plex Sans and IBM Plex Mono, loaded from Google Fonts in each page's `<helmet>` block. Swap them for FedTech fonts. Mono is used for labels and kickers; keep a distinct label style if the brand has no mono face.
- **Word template:** Arial. Change the `FONT` constant in `build.js`.

## 4. Content rules: do not change these while branding

- **CoECI:** the CoECI contact and the backup CoECI contact are copied on every client communication. CoECI is a party to the task order: the parent agreement is an inter-agency agreement between CoECI and the client agency. CoECI's COR oversees the task order. The client agency approves products and public materials.
- **Who decides:** federal judges make every award decision. FedTech, partners and SMEs advise and score.
- **Legal disclaimer:** the rules and compliance page and Annex B say "a planning aid, not legal advice." Keep that wording.
- **Draft label:** keep the "DRAFT FOR REVIEW" tags on the FedTech way pages (pages 3–4) until FedTech leadership approves the wording. The principle names, step names and "common traps" are drafted, not established FedTech language.
- **Placeholders:** square-bracket placeholders such as `[NOIS3-XXX]` and `[X] days` are intentional fill-ins.

### Known open items (not branding, but flag them back)

1. **Qu-SAFE examples.** The FedTech way pages use NOIS3-073 (NIH Qu-SAFE) as their only example. That proposal is unawarded, and parts of it are unverified. Swap in a delivered challenge before external use.
2. **Unchecked statutory points.** The COMPETES Act thresholds on the compliance page ($1M agency-head approval, $50M notice to Congress) were not verified against the statute text. The references page says so.
3. **Internal sources.** The references page lists internal sources: the NOIS3-073 proposal, the NOIS3-085 RFTP, the CoECI memo for NOIS3-071, and a CDC/NIOSH client email. Remove that group if the playbook will leave FedTech.

## 5. Working with the source zip

```
playbook/pages/      58 pages, one self-contained HTML file each (*.dc.html), plus canvas.json (page order and titles)
playbook/build/      render.js (Playwright screenshots each page), make_pdf.py (renders in canvas.json order and stitches the PDF)
design-doc/          content.json (all 17 sections, glossary, compliance questions) and build.js (docx-js script that writes the .docx)
```

- **Edit pages directly.** Every page uses inline styles with literal hex values. There are no shared CSS variables, so a find-and-replace of the colours in the table above, applied across `playbook/pages/*.dc.html`, rebrands most of it. Each file's `<helmet>` block holds the font links.
- **Recurring parts.** Repeated patterns appear across many files: the section-break left panel (760px, dark), the step-card header bands, and the page header (kicker, h1, intro). Consider adding a logo to the section-break panel and a small logo mark to each page header.
- **Rebuild the playbook PDF:**
  1. `cd playbook/build && npm install`
  2. `python make_pdf.py ../pages FedTech_NOIS3_Challenge_Playbook.pdf`

  This needs Node, Playwright with a Chromium browser, and Python with Pillow. Set `CHROME_PATH` if Chromium is not at Playwright's default location.
- **Rebuild the Word file:**
  1. `cd design-doc && npm install docx`
  2. `node build.js`

  Brand colours are constants at the top of `build.js`: `INK`, `OR`, `ORL`, `BL`, `BLL`, `GR`, `GRL`. The cover page is the first block in the `kids` array. Header and footer text is near the end. For a logo, add an `ImageRun` (with `type: 'png'`) to the cover and the header.
- **Contents page.** Page numbers on the contents page (page 2) and the templates annex (page 52) are typed in. If you add, remove or reorder pages, update both.

## 6. What to send back

1. The branded playbook PDF, plus the updated `pages/` folder.
2. The branded Word template, plus the updated `build.js`.
3. A short list of anything that couldn't be branded cleanly, and any content issues you noticed. Report content issues; don't fix them silently.

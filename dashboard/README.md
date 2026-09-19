# Challenge Launch Console

A single-file project management dashboard tracking FedTech's three NOIS3
prize competitions standing up in the same window (Sep–Oct 2026): portfolio
KPIs, a per-competition status card, a shared timeline plotting each
competition's own real phase/stage structure on one axis, a filterable
action-item tracker, a risk register, and each competition's communications
cadence.

Tracks:
- **NOIS3-085** — NSF Quantum Algorithm Challenge
- **NOIS3-073** — Qu-SAFE Challenge (NIH/NCATS + NASA/BPS)
- **NOIS3-081** — Firefighter Safety, Health and Well-being Challenge (CDC/NIOSH)

Open `index.html` directly in a browser — no build step, no dependencies
beyond a Google Fonts stylesheet link. It also renders in light and dark
mode automatically.

## Customizing

All content lives in one place: the `<script>` block near the bottom of
`index.html`, in three arrays.

- **`COMPETITIONS`** — one entry per competition: display name, sponsoring
  agency, owner, status (`on-track` / `at-risk` / `off-track`), a manually
  set `readiness` percentage, a short `price` string, and a `stages` array.
  Each stage is `{ label, abbr, type: 'range'|'point', start/end or date,
  detail? }` — `detail` is an optional second tooltip line for a fact worth
  surfacing (winner count, sub-deadline, purse amount). Stages aren't a
  fixed shape: each competition's array reflects its own real phase
  structure, and the timeline/card rendering handles any length or mix of
  ranges and points.
- **`TASKS`** — action items shown in the filterable tracker: competition,
  task, owner, due date, status (`todo` / `progress` / `blocked` / `done`).
- **`RISKS`** — the risk register: scope (a competition id, or `'portfolio'`
  for cross-cutting risks), likelihood/impact, the risk text, mitigation,
  and owner.

`AS_OF` near the top of the script is the date the whole dashboard is
computed relative to (countdowns, overdue flags, the timeline's "Today"
line, which stage in each row is emphasized). It's a fixed date rather than
the live clock, so the dashboard stays internally consistent regardless of
when the page is opened — update it to the actual current date each time
you refresh the data.

## What's real vs. estimated

Competition names, agencies, owners, prices, and every stage date are
sourced from each competition's RFTP, FedTech's proposal narrative for it,
and (where one exists) FedTech's own Gantt chart. Risks are drawn from each
proposal's own stated risks, plus one portfolio-level risk about the shared
stand-up window.

Two things are **not** sourced and are this dashboard's own placeholders,
flagged in the on-page banner:
- `status` and `readiness` — no live status report exists yet for any of
  the three (these are pre-award/early-award planning documents), so both
  are a reasonable early-stand-up estimate, not a reported figure.
- Any stage date given only as "Month YYYY" in a source document is placed
  on the 15th of that month as a neutral placeholder — day-exact dates
  (there are many) are used wherever a source gives one.

## Cross-functional load

A separate section (`WORKLOAD` in the script, rendered by
`renderWorkload()`) totals what the portfolio asks of Marketing, BIS, and
FinOps between now and end of 2027 — websites/campaigns, platforms to
build, and prize dollars to deploy by month. Every count is Claude's
itemized read of the RFTPs and proposal narratives (the counted items are
listed in each card, not just totaled), not a reported actual. FinOps
figures are FedTech-deployed purse only — NOIS3-073's $7.1M purse is paid
directly by NIH and excluded.

## Live version

Also published as a Claude Artifact for sharing without cloning the repo:
https://claude.ai/artifact/3puP3jVm25LpUiCCarNQot — republish it from a
Claude Code session pointed at this repo if you want the hosted copy to
track further edits to `index.html`.

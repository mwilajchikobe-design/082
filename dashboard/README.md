# Challenge Launch Console

A single-file project management dashboard for tracking three prize
competitions that launch in the same window: portfolio KPIs, a per-competition
status card, a shared timeline (Stage 1 / Milestone 1 / Milestone 2 /
Convening across all three on one axis), a filterable action-item tracker,
a risk register, and the standing communications cadence.

Open `index.html` directly in a browser — no build step, no dependencies
beyond a Google Fonts stylesheet link. It also renders in light and dark
mode automatically.

## Customizing

All content lives in one place: the `<script>` block near the bottom of
`index.html`, in three arrays.

- **`COMPETITIONS`** — one entry per competition: display name, sponsoring
  agency, owner, status (`on-track` / `at-risk` / `off-track`), a manually
  set `readiness` percentage, and a `stages` array (`Stage 1`, `Milestone 1`,
  `Milestone 2`, `Convening`) with open/close/winners-announced dates.
- **`TASKS`** — action items shown in the filterable tracker: competition,
  task, owner, due date, status (`todo` / `progress` / `blocked` / `done`).
- **`RISKS`** — the risk register: scope (a competition id, or `'portfolio'`
  for cross-cutting risks), likelihood/impact, the risk text, mitigation,
  and owner.

`AS_OF` near the top of the script is the date the whole dashboard is
computed relative to (countdowns, overdue flags, the timeline's "Today"
line). It's a fixed date rather than the live clock, so the sample data
stays internally consistent regardless of when the page is opened — update
it alongside your real dates.

Everything currently in those arrays — names in `[brackets]`, dates, owners —
is sample data for illustration. Replace it with your actual competitions.

## Live version

Also published as a Claude Artifact for sharing without cloning the repo:
https://claude.ai/artifact/3puP3jVm25LpUiCCarNQot — republish it from a
Claude Code session pointed at this repo if you want the hosted copy to
track further edits to `index.html`.

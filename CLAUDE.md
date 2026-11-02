# Working in MSP-Digitisation

Instructions for anyone (person or AI assistant) changing code here. Read `README.md` first for the
map of what is where.

## Before changing a tool
- Read that tool's own `apps/<tool>/README.md` (and its `CLAUDE.md` or `EDITING-INSTRUCTIONS.md` if
  it has one). They describe its build steps, data files and quirks; follow them.
- Work inside one `apps/<tool>/` folder per change where you can. A push to `main` publishes every
  tool whose folder changed, so keep unrelated changes in separate commits.
- Some tools generate files: the FAQ builds `content.json` and an offline copy (`node tools/...`),
  the course planner bakes its data into one HTML file. Regenerate instead of hand-editing output.

## Privacy and security (this repository is public)
- Never commit personal data: student or staff names, student numbers, grades, emails, exports from
  SAP, Collent, Canvas or Qualtrics. Tests and examples use made-up people.
- Never commit passwords or Supabase service-role keys. Before every commit, check `git diff` for them.
- Internal notes files (`content.staff.json` and similar) are gitignored: keep it that way.

## Backend
- One Supabase project for all tools (EU region), one schema per tool, row-level security on every
  table. Changes to tables go in `supabase/` as migrations, never by clicking in the dashboard only.
- The Tutoring backend is live with real registrations: change it carefully and test on a copy first.

## Style
- Plain HTML/CSS/JS, no frameworks or build steps unless a tool already has one; nothing loaded from
  other companies' servers (fonts and libraries are vendored).
- Plain English in everything people read (pages, guides, error messages). Students first.

## Publishing
- Push to `main` publishes changed tools to their live repositories (see README, *How publishing
  works*). Never push directly to a tool's own repository once the switch-over is done.

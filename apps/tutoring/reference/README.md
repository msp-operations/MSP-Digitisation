# Reference - MSP Tutor Registration (2026/2027)

Curated background/context for the tutor-registration tool, distilled from the
MSP office's working archive. The archive itself is ~2,600 files (registration
exports, emails, old years) and is **not** committed; this folder keeps only the
slim, current, decision-useful slice for **academic year 2026/2027**.

Everything here is either a clean Markdown/CSV distillation (readable on GitHub,
usable as context) or a small set of canonical source PDFs.

## Contents

| File | What it is | Feeds / relates to |
|---|---|---|
| [`course-catalogue-2026-2027.md`](course-catalogue-2026-2027.md) / `.csv` | All 142 courses & skills by discipline + period, with pre-/co-requisites. "Course" = has tutorial groups (tutor-relevant); "Skill" = PRA practical. | The course list & prerequisites shown on the register page (`course` table, `details` JSONB). |
| `coordinators-2026-2027.md` / `.csv` *(kept on UM storage, not in this repo)* | 81 course coordinators -> UM email. | `coordinator` / `coordinator_email` fields when adding/maintaining courses. |
| [`frame-schedule-2026-2027.md`](frame-schedule-2026-2027.md) | The 5 fixed weekly slots + standard teaching time blocks + period dates. | The Mon-Fri timetable and time-clash logic on the register page. |
| [`tutoring-procedures.md`](tutoring-procedures.md) | How the course-registration -> scheduling -> tutor-allocation cycle works, who's eligible, how tutors are sourced. | Context for maintaining the tool / onboarding. |
| `Info for tutor registration tool.xlsx` *(kept on UM storage, not in this repo)* | Tutorial groups, days & times (Fall P1/P2). | Source for `seed.sql` / `demo-data.js` - the live catalogue. |
| [`originals/`](originals/) | Canonical source PDFs (see below). | Authoritative fallback for the distilled files. |

### `originals/`

- `2026-2027 MSP Course Catalogue May 2026.pdf` - full course descriptions,
  objectives, literature, assessment, GenAI policy. The up-to-date catalogue
  (supersedes earlier April 2026 drafts).
- `Frame schedule MSP 2026-2027 Period 1/2/4/5 - Final.pdf` - authoritative
  per-course slot allocations (which course is in which slot) + coordinators.
- `Pre-corequisites overview 2026-2027 P1 and P2 April 2026.pdf` - source for the
  Fall prerequisite columns.
- `Switch and withdraw deadlines Academic Year 2026 2027.pdf` - student
  switch/withdraw deadlines.

## How this maps to the tool

The tool's live catalogue is generated from two source files (the spreadsheet is
kept on UM storage, not in this public repo):
`Info for tutor registration tool.xlsx` (tutorial groups, days, times -> currently
Fall P1/P2 only, the 12 active courses / 117 groups) and the catalogue PDF in
`originals/` (course detail). **This folder is the supporting reference** for that data: the
full catalogue beyond the active 12, the coordinator->email lookup, the slot
system behind the timetable, and the office workflow the tool fits into.

## Updating for a new year

The distilled files were generated from the office archive's `2026-2027` folders:
`Course Catalogue/Course overview`, `Pre and Corequisites Overview`,
`Course Information/Course Coordinators...`, the frame-schedule PDFs, and
`Procedures/`. For a new year, re-run the same extraction against the new year's
equivalents and replace these files.

## Provenance & privacy

Sources are internal MSP office documents. Only **course-level** information is
included here (course codes, titles, schedules, procedures) - no student data, no
tutor data, no registration exports, no private correspondence from the archive.
Files with names of tutors or staff (the tutor spreadsheet, the coordinator list)
stay on UM storage and are listed in `.gitignore` so they can't be committed by
accident.

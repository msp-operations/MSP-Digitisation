# MSP Digitisation

All the online tools of the Maastricht Science Programme (MSP, Maastricht University) in one
repository: one place to work, one shared look, one backend. Each tool keeps its own folder and its
own live address; students and staff notice nothing of the move.

**Status (2 Nov 2026): set up, not switched on yet.** The live sites are still published from their
own repositories. See *Switching over* below.

## What is where

| Folder | What it is | Live at | Publishes to repo | Backend |
|---|---|---|---|---|
| `apps/msp-online/` | MSP Digital Hub: one front door for all tools, a student hub and a staff hub (repo renamed from MSP-Remodel-Preview on 2 Nov 2026) | msp-operations.github.io/MSP-Digital (students: `/v3/`, staff: `/v3/staff.html`) | MSP-Digital | none yet |
| `apps/faq/` | Student FAQ: search-first answers, offline copy, admissions journey | msp-faqs.nl | MSP-FAQ-s | none (static) |
| `apps/btr-dashboard/` | Bachelor Thesis Research: timelines, guides, rubrics, supervisor pages, project catalogue | msp-btr.nl | btr-dashboard | Formspree (project submissions) |
| `apps/tutoring/` | Tutor registration and the office dashboard | msp-tutoring.nl | Tutoring | Supabase (EU, Frankfurt) |
| `apps/academic-calendar/` | All MSP deadlines in one place, subscribable calendar feeds | msp-operations.github.io/Academic-Calendar | Academic-Calendar | none (static) |
| `apps/project-periods/` | P3/P6 project catalogue, preferences and allocation (first build, demo data) | msp-operations.github.io/Project-Periods | Project-Periods | Supabase (not connected yet: preview mode) |
| `apps/exams-handbook/` | Exam coordination handbook (built site) | msp-operations.github.io/MSP-Exams-Office | MSP-Exams-Office | none (static) |
| `apps/msp-alumni/` | Alumni world map, stories, events | msp-alumni.nl | msp-alumni | Formspree |
| `apps/ce-alumni/` | Circular Engineering alumni outcomes | ce-alumni.nl | ce-alumni-dashboard | none (static) |
| `archive/msp-15-years/` | Invitation site for the MSP 15th anniversary (event over) | msp15.nl | (not republished) | none |
| `shared/` | Things every tool should share: the design system, later the login | | | |
| `supabase/` | The one MSP backend: database layout, security rules, history of changes | | | Supabase |
| `docs/guides/` | Plain-language user guides per tool, for the staff who use them | | | |
| `office-tools/` | Offline tools for the offices (BTR grading, ESD record check) | | | |

Each app folder has its own README with how that tool works. Those READMEs are the authority for
their tool; this file is only the map.

## Not in here yet, and why

| What | Why not yet | What is needed |
|---|---|---|
| Course planner (private repo MSP-Course-Planner-2) | Private repo: contains frame schedules and catalogue PDFs | Decide whether it can be public; then bring it in as `apps/course-planner/` |
| Course planner web version | Lives on a staff member's own GitHub account | Agree with the planner team; bring it in next to the file version |
| Exams handbook source (private repo Exams-Office) | Its git history holds old exam-system passwords | Bring in the current files without history (after changing those passwords), so the build happens here |
| BTR Grading Tool, ESD Record Check | Tests, code comments and guide screenshots contain real student data | Replace with made-up data, then add to `office-tools/` |
| Old BTR-Projects, MSP-Course-Selection | Superseded by btr-dashboard and the course planner | Archive the repos on GitHub |

## How publishing works

You only ever change files here. On every push to `main`, `.github/workflows/publish.yml` looks at
which `apps/<tool>/` folders changed and pushes each changed folder to that tool's own repository,
which GitHub Pages already serves on the tool's address. The history carries over unchanged (tested:
splitting each folder gives back exactly the commit that is live now), so these are normal pushes,
never force-pushes.

The workflow does nothing until the repository variable `PUBLISH_ENABLED` is `true` and the secret
`PUBLISH_TOKEN` holds a token with write access to the tool repositories. You can also publish one
tool by hand: *Actions → Publish apps → Run workflow*.

## Switching over (one time)

1. Tell everyone with push access to the tool repositories: from now on, change things here only.
   A direct commit to a tool repository makes its next publish fail (on purpose, so nothing is lost).
2. Pull in anything committed to the tool repositories since this repo was made:
   `git subtree pull --prefix=apps/<tool> https://github.com/msp-operations/<repo>.git main`.
3. Exams handbook: point its build script at `apps/exams-handbook/` instead of force-pushing to
   MSP-Exams-Office.
4. Add the `PUBLISH_TOKEN` secret, set `PUBLISH_ENABLED` to `true`, make a small change to one tool
   and check it goes live.
5. Add a note to each tool repository's README: "edited in MSP-Digitisation, do not change here".

## Rules (public repository)

- No personal data: no student or staff names, numbers, grades, email lists or exports. Use made-up
  data in examples and tests.
- No passwords, and no Supabase service keys (the public "anon" key in a tool's config is fine; the
  security comes from the database rules in `supabase/`).
- One shared feedback address for every tool: msp-digital@maastrichtuniversity.nl.
- Data about real people only ever lives in the backend (EU region), never in files here.

# The MSP backend (Supabase)

One Supabase project for all MSP tools, in the MSP organisation, EU region (Frankfurt).

- **One schema per tool** (`tutoring`, `planner`, `project_periods`, ...), row-level security on
  every table. Public reads only where the data is public (course schedules); everything else needs
  a signed-in user with the right role.
- **Migrations live here**, one folder per schema. Nothing changes in the database without a
  migration file in this folder.
- **Hub feedback (2 Nov 2026):** `hub-feedback.sql` (copy of `apps/msp-online/backend/hub-feedback.sql`): table hub_feedback, submit_hub_feedback(), team list hub_admin, read via `apps/msp-online/inbox/`. Live.
- **Hub announcements (2 Nov 2026):** `hub-announcements.sql`: table hub_announcement (public reads only live ones, team writes), managed in the team console.
- **Hub team tab (2 Nov 2026):** `hub-team.sql`: hub_link + hub_upcoming, team only (no public read).
- **Today:** Tutoring is connected (its setup and SQL are in `apps/tutoring/app/supabase/`; its
  keepalive workflow stops the free project from pausing). Project Periods has a schema ready
  (`apps/project-periods/`) but runs in preview mode.
- **Next:** course planner data (frame schedules, catalogue: no personal data), so the scheduling
  office can update the planner without editing code. Then one login for staff and students.
- **Before real personal data goes beyond Tutoring:** UM approval (data processing agreement) and a
  paid plan with backups, paid by MSP.

# The MSP backend (Supabase)

One Supabase project for all MSP tools, in the MSP organisation, EU region (Frankfurt).

- **One schema per tool** (`tutoring`, `planner`, `project_periods`, ...), row-level security on
  every table. Public reads only where the data is public (course schedules); everything else needs
  a signed-in user with the right role.
- **Migrations live here**, one folder per schema. Nothing changes in the database without a
  migration file in this folder.
- **Today:** only Tutoring is connected (its setup and SQL are in `apps/tutoring/app/supabase/`; its
  keepalive workflow stops the free project from pausing). Project Periods has a schema ready
  (`apps/project-periods/`) but runs in preview mode.
- **Next:** course planner data (frame schedules, catalogue: no personal data), so the scheduling
  office can update the planner without editing code. Then one login for staff and students.
- **Before real personal data goes beyond Tutoring:** UM approval (data processing agreement) and a
  paid plan with backups, paid by MSP.

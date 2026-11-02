-- ============================================================================
-- MSP Tutor Registration - let the office manage the catalogue from the
-- dashboard, instead of writing SQL.
-- ============================================================================
-- Run this ONCE in the Supabase SQL editor (Dashboard -> SQL Editor -> New
-- query -> paste -> Run). It is safe to run more than once, and it does NOT
-- touch any course, group or registration data - it only changes permissions.
--
-- WHAT IT DOES
--   Before: allow-listed admins could only EDIT things that already existed
--           (a group's capacity, open/closed). Creating a course or a group
--           meant hand-writing INSERT statements in this editor.
--   After:  admins can also ADD and DELETE courses and groups, which is what
--           the "Courses & groups" section of the Office Dashboard now uses.
--
-- THE SAFETY RAIL
--   Deleting is deliberately refused while anyone is signed up. The DELETE
--   policies below only match rows with no confirmed registrations, so a
--   delete of a claimed group simply affects zero rows and the dashboard
--   reports "somebody is signed up for this". Registrations can never be
--   erased by a mis-click in the catalogue screen; release the tutor first.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Admins may CREATE courses and tutorial groups.
-- ---------------------------------------------------------------------------
drop policy if exists course_admin_insert on course;
drop policy if exists group_admin_insert  on tutorial_group;

create policy course_admin_insert on course         for insert with check (is_admin());
create policy group_admin_insert  on tutorial_group for insert with check (is_admin());

-- ---------------------------------------------------------------------------
-- Admins may DELETE courses and tutorial groups, but only while nobody holds
-- a confirmed place. (Deleting a course cascades to its groups, so the course
-- policy has to look one level deeper, through tutorial_group.)
-- ---------------------------------------------------------------------------
drop policy if exists course_admin_delete on course;
drop policy if exists group_admin_delete  on tutorial_group;

create policy group_admin_delete on tutorial_group for delete
  using (
    is_admin()
    and not exists (
      select 1
        from registration r
       where r.group_id = tutorial_group.id
         and r.status = 'confirmed'
    )
  );

create policy course_admin_delete on course for delete
  using (
    is_admin()
    and not exists (
      select 1
        from registration r
        join tutorial_group g on g.id = r.group_id
       where g.course_id = course.id
         and r.status = 'confirmed'
    )
  );

-- ---------------------------------------------------------------------------
-- The office allow-list. Adding someone stays SQL on purpose: it is the one
-- action that grants access to tutor personal data.
--
-- Check who is already on it before adding anyone:
--   select email from admin_user order by email;
--
-- To add a colleague, edit the address and remove the leading "--":
-- ---------------------------------------------------------------------------
-- insert into admin_user (email) values ('s.dufour@maastrichtuniversity.nl')
--   on conflict (email) do nothing;

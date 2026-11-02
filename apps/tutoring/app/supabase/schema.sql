-- ============================================================================
-- MSP Tutor Registration - database schema (Supabase / PostgreSQL)
-- ============================================================================
-- Run this ONCE in the Supabase SQL editor, then run seed.sql to load courses.
--
-- Design goals:
--   * TRUE first-come-first-serve: claiming a group is atomic, so two tutors
--     can never both win the same group, even if they click at the same instant.
--   * PRIVACY: the public (anonymous) site can read course/group AVAILABILITY
--     only. Tutor names and emails live in `registration`, which anonymous
--     visitors cannot read at all. Only logged-in admins (allow-listed emails)
--     can see who registered.
--   * LIVE updates: `tutorial_group.claimed_count` is kept in sync by triggers,
--     and that table is published to Supabase Realtime so groups grey out for
--     everyone the moment they fill.
-- ============================================================================

-- ---------------------------------------------------------------------------
-- Tables
-- ---------------------------------------------------------------------------
create table if not exists course (
  id                uuid primary key default gen_random_uuid(),
  code              text not null,           -- e.g. CHE1101
  title             text not null,           -- e.g. Introduction to Chemistry
  period            text not null,           -- 'P1' / 'P2' (extensible)
  department        text not null default 'MSP',
  coordinator       text,                    -- from the MSP course catalogue
  coordinator_email text,
  prerequisites     text,
  description        text,                   -- "About this course" blurb
  details           jsonb,                   -- everything else from the catalogue
                                             -- (level, note, corequisites, recommended,
                                             --  objectives[], literature, instructional_format,
                                             --  assessment[], genai)
  sort              int  not null default 0,
  created_at        timestamptz not null default now(),
  unique (code, period)
);
-- Upgrade older deployments that pre-date the catalogue fields:
alter table course add column if not exists coordinator_email text;
alter table course add column if not exists prerequisites     text;
alter table course add column if not exists description        text;
alter table course add column if not exists details           jsonb;

create table if not exists tutorial_group (
  id            uuid primary key default gen_random_uuid(),
  course_id     uuid not null references course(id) on delete cascade,
  label         text not null,               -- e.g. "A1 + B1"
  day1          text,
  start1        text,                         -- "HH:MM" (kept as text for simple display)
  end1          text,
  day2          text,
  start2        text,
  end2          text,
  capacity      int  not null default 1 check (capacity >= 0),
  claimed_count int  not null default 0,      -- maintained by trigger (for display + realtime)
  is_open       boolean not null default true,-- admin can close a group manually
  sort          int  not null default 0,
  created_at    timestamptz not null default now(),
  unique (course_id, label)
);

create table if not exists registration (
  id          uuid primary key default gen_random_uuid(),
  group_id    uuid not null references tutorial_group(id) on delete cascade,
  tutor_name  text not null,
  tutor_email text,
  tutor_type  text,                           -- 'PhD' / 'Alumnus' / 'Staff' / 'Master student' / 'Pre-assigned'
  affiliation text,
  phone       text,
  motivation  text,
  status      text not null default 'confirmed' check (status in ('confirmed','withdrawn')),
  created_at  timestamptz not null default now()
);
create index if not exists registration_group_idx on registration(group_id);

-- Admin allow-list: only these email addresses may read registrations / manage groups.
create table if not exists admin_user (
  email      text primary key,
  added_at   timestamptz not null default now()
);

-- A single-row settings table so admins can globally open/close registration.
create table if not exists app_settings (
  id                 int primary key default 1 check (id = 1),
  registration_open  boolean not null default true,
  banner_message     text,
  -- Which teaching periods tutors are shown. NULL or empty means every period,
  -- which is how the tool behaved before this column existed. Set it to for
  -- example '{P2}' to run a single-period round while the other periods stay
  -- visible to the office in the dashboard. Managed from the Office Dashboard,
  -- no SQL needed.
  active_periods     text[]
);
insert into app_settings (id) values (1) on conflict (id) do nothing;
-- Upgrade older deployments that pre-date period visibility:
alter table app_settings add column if not exists active_periods text[];

-- ---------------------------------------------------------------------------
-- Keep claimed_count in sync with confirmed registrations
-- ---------------------------------------------------------------------------
create or replace function recount_group(p_group uuid) returns void as $$
  update tutorial_group g
     set claimed_count = (
       select count(*) from registration r
        where r.group_id = p_group and r.status = 'confirmed')
   where g.id = p_group;
$$ language sql;

create or replace function trg_registration_recount() returns trigger as $$
begin
  if (tg_op = 'DELETE') then
    perform recount_group(old.group_id);
    return old;
  end if;
  perform recount_group(new.group_id);
  if (tg_op = 'UPDATE' and new.group_id <> old.group_id) then
    perform recount_group(old.group_id);
  end if;
  return new;
end;
$$ language plpgsql;

drop trigger if exists registration_recount on registration;
create trigger registration_recount
  after insert or update or delete on registration
  for each row execute function trg_registration_recount();

-- ---------------------------------------------------------------------------
-- Atomic claim: the heart of first-come-first-serve.
-- Locks each requested group row FOR UPDATE, re-checks live availability, then
-- inserts. All-or-nothing: if ANY chosen group is full/closed the whole call
-- rolls back and nothing is registered.
-- ---------------------------------------------------------------------------
create or replace function claim_groups(
  p_group_ids   uuid[],
  p_tutor_name  text,
  p_tutor_email text,
  p_tutor_type  text,
  p_affiliation text,
  p_phone       text,
  p_motivation  text
) returns setof registration
language plpgsql
security definer
set search_path = public
as $$
declare
  gid       uuid;
  g         tutorial_group%rowtype;
  live      int;
  glabel    text;
begin
  if p_tutor_name is null or btrim(p_tutor_name) = '' then
    raise exception 'NAME_REQUIRED';
  end if;
  if p_group_ids is null or array_length(p_group_ids, 1) is null then
    raise exception 'NO_GROUPS';
  end if;

  if not (select registration_open from app_settings where id = 1) then
    raise exception 'REGISTRATION_CLOSED';
  end if;

  foreach gid in array p_group_ids loop
    -- Lock this group so concurrent claims serialise on it.
    select * into g from tutorial_group where id = gid for update;
    if not found then
      raise exception 'GROUP_NOT_FOUND:%', gid;
    end if;
    if not g.is_open then
      raise exception 'GROUP_CLOSED:%', g.label;
    end if;
    select count(*) into live from registration
      where group_id = gid and status = 'confirmed';
    if live >= g.capacity then
      raise exception 'GROUP_FULL:%', g.label;
    end if;
  end loop;

  -- All checks passed under lock -> insert.
  foreach gid in array p_group_ids loop
    return query
      insert into registration (group_id, tutor_name, tutor_email, tutor_type, affiliation, phone, motivation)
      values (gid, btrim(p_tutor_name), nullif(btrim(p_tutor_email), ''), p_tutor_type, p_affiliation, p_phone, p_motivation)
      returning *;
  end loop;
end;
$$;

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table course         enable row level security;
alter table tutorial_group enable row level security;
alter table registration   enable row level security;
alter table app_settings   enable row level security;
alter table admin_user     enable row level security;

-- helper: is the current logged-in user an allow-listed admin?
create or replace function is_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from admin_user
     where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

-- Public catalog: anyone may READ courses, groups and settings (no PII there).
drop policy if exists course_read   on course;
drop policy if exists group_read    on tutorial_group;
drop policy if exists settings_read on app_settings;
create policy course_read   on course         for select using (true);
create policy group_read    on tutorial_group for select using (true);
create policy settings_read on app_settings   for select using (true);

-- Registrations: NOT readable by the public. Only admins may read.
drop policy if exists reg_admin_read   on registration;
drop policy if exists reg_admin_update on registration;
drop policy if exists reg_admin_delete on registration;
create policy reg_admin_read   on registration for select using (is_admin());
create policy reg_admin_update on registration for update using (is_admin());
create policy reg_admin_delete on registration for delete using (is_admin());
-- NOTE: there is no INSERT policy on purpose. Public sign-ups go exclusively
-- through claim_groups() (security definer), which enforces availability.

-- Admins may edit groups (capacity / open-close) and settings.
drop policy if exists group_admin_write on tutorial_group;
drop policy if exists course_admin_write on course;
drop policy if exists settings_admin_write on app_settings;
create policy group_admin_write  on tutorial_group for update using (is_admin());
create policy course_admin_write on course         for update using (is_admin());
create policy settings_admin_write on app_settings for update using (is_admin());

-- Admins may also ADD and DELETE courses and groups, which is what the
-- "Courses & groups" section of the Office Dashboard uses (no SQL needed).
-- Deleting is refused while anyone holds a confirmed place: the DELETE
-- policies below simply do not match those rows, so the delete affects zero
-- rows and the dashboard says so. Sign-ups can never be lost to a mis-click.
drop policy if exists course_admin_insert on course;
drop policy if exists group_admin_insert  on tutorial_group;
create policy course_admin_insert on course         for insert with check (is_admin());
create policy group_admin_insert  on tutorial_group for insert with check (is_admin());

drop policy if exists course_admin_delete on course;
drop policy if exists group_admin_delete  on tutorial_group;
create policy group_admin_delete on tutorial_group for delete
  using (
    is_admin()
    and not exists (
      select 1 from registration r
       where r.group_id = tutorial_group.id and r.status = 'confirmed'
    )
  );
create policy course_admin_delete on course for delete
  using (
    is_admin()
    and not exists (
      select 1 from registration r
        join tutorial_group g on g.id = r.group_id
       where g.course_id = course.id and r.status = 'confirmed'
    )
  );

-- admin_user is readable/writable only by existing admins (manage via SQL editor for the first one).
drop policy if exists admin_self_read on admin_user;
create policy admin_self_read on admin_user for select using (is_admin());

-- ---------------------------------------------------------------------------
-- Realtime: publish the (PII-free) tables so the UI updates live.
-- ---------------------------------------------------------------------------
alter publication supabase_realtime add table tutorial_group;
alter publication supabase_realtime add table course;
alter publication supabase_realtime add table app_settings;

-- ---------------------------------------------------------------------------
-- Convenience: bootstrap your first admin (edit the email, then run once).
--   insert into admin_user (email) values ('s.dufour@maastrichtuniversity.nl');
-- ---------------------------------------------------------------------------

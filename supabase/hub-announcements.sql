-- MSP Digital Hub: announcements shown at the top of the hubs, managed in the team console (inbox/).
-- Run once in the Supabase SQL editor of the MSP project, AFTER hub-feedback.sql (it uses is_hub_admin()).
-- Safe to run again.
--
-- Who can do what
--   * anyone (anon key): read only the announcements that are switched on and inside their dates.
--   * the hub team (hub_admin): read all, add, edit, switch off, delete.

create table if not exists hub_announcement (
  id          uuid primary key default gen_random_uuid(),
  hub         text not null default 'students' check (hub in ('students','staff','both')),
  tone        text not null default 'info' check (tone in ('info','important')),
  message     text not null check (char_length(message) between 1 and 280),
  link_url    text check (link_url is null or link_url ~ '^https://'),
  link_text   text check (link_text is null or char_length(link_text) <= 40),
  starts_at   timestamptz not null default now(),
  ends_at     timestamptz,
  active      boolean not null default true,
  created_by  text default (auth.jwt() ->> 'email'),
  created_at  timestamptz not null default now(),
  check (ends_at is null or ends_at > starts_at)
);
create index if not exists hub_announcement_starts_idx on hub_announcement(starts_at desc);

alter table hub_announcement enable row level security;

drop policy if exists hub_announcement_public_read on hub_announcement;
drop policy if exists hub_announcement_team_read   on hub_announcement;
drop policy if exists hub_announcement_team_insert on hub_announcement;
drop policy if exists hub_announcement_team_update on hub_announcement;
drop policy if exists hub_announcement_team_delete on hub_announcement;

create policy hub_announcement_public_read on hub_announcement for select
  using (active and starts_at <= now() and (ends_at is null or ends_at > now()));
create policy hub_announcement_team_read   on hub_announcement for select using (is_hub_admin());
create policy hub_announcement_team_insert on hub_announcement for insert with check (is_hub_admin());
create policy hub_announcement_team_update on hub_announcement for update using (is_hub_admin()) with check (is_hub_admin());
create policy hub_announcement_team_delete on hub_announcement for delete using (is_hub_admin());

grant select on hub_announcement to anon, authenticated;
grant insert, update, delete on hub_announcement to authenticated;

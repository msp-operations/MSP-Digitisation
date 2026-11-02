-- MSP Digital Hub: the "Team" tab of the team console (inbox/): team links and "Coming up" dates.
-- Run once in the Supabase SQL editor of the MSP project, AFTER hub-feedback.sql (it uses is_hub_admin()).
-- Safe to run again.
--
-- Team only: nothing in these tables is readable by the public (the console page itself is public
-- HTML, so the links live here instead of in the page). The first fill (links, contacts, dates) is
-- NOT in this public file; it is added once from the SQL editor or in the console itself.
-- No passwords, keys or files here: files go in the team's Teams space.

create table if not exists hub_link (
  id          uuid primary key default gen_random_uuid(),
  grp         text not null check (char_length(grp) between 1 and 40),
  title       text not null check (char_length(title) between 1 and 80),
  url         text not null check (url ~ '^(https://|mailto:)' and char_length(url) <= 500),
  note        text check (note is null or char_length(note) <= 200),
  sort        int  not null default 100,
  created_by  text default (auth.jwt() ->> 'email'),
  updated_at  timestamptz not null default now()
);

create table if not exists hub_upcoming (
  id          uuid primary key default gen_random_uuid(),
  title       text not null check (char_length(title) between 1 and 160),
  due         date not null,
  owner       text check (owner is null or char_length(owner) <= 60),
  note        text check (note is null or char_length(note) <= 300),
  done        boolean not null default false,
  created_by  text default (auth.jwt() ->> 'email'),
  created_at  timestamptz not null default now()
);
create index if not exists hub_upcoming_due_idx on hub_upcoming(due);

alter table hub_link     enable row level security;
alter table hub_upcoming enable row level security;

drop policy if exists hub_link_team     on hub_link;
drop policy if exists hub_upcoming_team on hub_upcoming;
create policy hub_link_team     on hub_link     for all using (is_hub_admin()) with check (is_hub_admin());
create policy hub_upcoming_team on hub_upcoming for all using (is_hub_admin()) with check (is_hub_admin());

revoke all on hub_link, hub_upcoming from anon;
grant select, insert, update, delete on hub_link, hub_upcoming to authenticated;

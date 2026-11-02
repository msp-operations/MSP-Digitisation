-- MSP Digital Hub: feedback from the two hubs, read in the team inbox (inbox/index.html).
-- Run once in the Supabase SQL editor of the MSP project (the one Tutoring uses). Safe to run again.
--
-- Deliberately separate from Tutoring's own `feedback` table and `admin_user` list: the hub team
-- (hub_admin) reads hub feedback only and never sees tutor registrations, and Tutoring's office
-- admins do not see hub feedback.
--
-- Who can do what
--   * anyone (anon key): submit_hub_feedback() only. There is no INSERT policy, so the function is the
--     only public write path; it trims and caps every field and refuses floods.
--   * the hub team (emails in hub_admin, signed in with a magic link): read, mark handled, delete.
--
-- The team list holds UM email addresses, so it is NOT in this public file. After running this
-- script, add the team in the same SQL editor:
--   insert into hub_admin (email) values ('name@maastrichtuniversity.nl') on conflict do nothing;
--
-- Also needed once: Authentication > URL Configuration > Redirect URLs, add
--   https://msp-operations.github.io/MSP-Digital/inbox/
-- otherwise the sign-in link sends people to the Site URL instead of the inbox.

create table if not exists hub_feedback (
  id          uuid primary key default gen_random_uuid(),
  hub         text not null default 'students' check (hub in ('students','staff')),
  tool        text not null,
  category    text not null default 'Problem' check (category in ('Problem','Suggestion','Other')),
  message     text not null,
  name        text,                  -- optional, typed by the sender
  page        text,                  -- the address the form was sent from
  user_agent  text,                  -- browser string, for debugging
  handled     boolean not null default false,
  created_at  timestamptz not null default now()
);
create index if not exists hub_feedback_created_idx on hub_feedback(created_at desc);

create table if not exists hub_admin (
  email     text primary key,
  added_at  timestamptz not null default now()
);

create or replace function is_hub_admin() returns boolean
language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from hub_admin
     where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

create or replace function submit_hub_feedback(
  p_tool       text,
  p_message    text,
  p_category   text default 'Problem',
  p_name       text default null,
  p_hub        text default 'students',
  p_page       text default null,
  p_user_agent text default null
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_id uuid;
begin
  if p_message is null or btrim(p_message) = '' then
    raise exception 'MESSAGE_REQUIRED';
  end if;
  -- flood cap for the whole table: a burst of more than 30 in ten minutes is not real feedback
  if (select count(*) from hub_feedback where created_at > now() - interval '10 minutes') >= 30 then
    raise exception 'TOO_MANY';
  end if;

  insert into hub_feedback (hub, tool, category, message, name, page, user_agent)
  values (
    case when p_hub = 'staff' then 'staff' else 'students' end,
    left(coalesce(nullif(btrim(p_tool), ''), 'Something else'), 60),
    case when p_category in ('Problem','Suggestion','Other') then p_category else 'Problem' end,
    left(btrim(p_message), 4000),
    nullif(left(btrim(coalesce(p_name, '')), 120), ''),
    nullif(left(btrim(coalesce(p_page, '')), 300), ''),
    left(coalesce(p_user_agent, ''), 300)
  )
  returning id into new_id;

  return new_id;
end;
$$;

revoke all on function submit_hub_feedback(text,text,text,text,text,text,text) from public;
grant execute on function submit_hub_feedback(text,text,text,text,text,text,text) to anon, authenticated;
grant execute on function is_hub_admin() to authenticated;

alter table hub_feedback enable row level security;
alter table hub_admin    enable row level security;

drop policy if exists hub_feedback_read   on hub_feedback;
drop policy if exists hub_feedback_update on hub_feedback;
drop policy if exists hub_feedback_delete on hub_feedback;
create policy hub_feedback_read   on hub_feedback for select using (is_hub_admin());
create policy hub_feedback_update on hub_feedback for update using (is_hub_admin()) with check (is_hub_admin());
create policy hub_feedback_delete on hub_feedback for delete using (is_hub_admin());
-- deliberately no INSERT policy: the public writes only through submit_hub_feedback()

drop policy if exists hub_admin_read on hub_admin;
create policy hub_admin_read on hub_admin for select using (is_hub_admin());

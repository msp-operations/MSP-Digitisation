-- ============================================================================
-- MSP Tutor Registration - feedback feature (run ONCE in the Supabase SQL editor)
-- ============================================================================
-- Lets anyone leave website feedback. Submissions are PRIVATE: the public can
-- only INSERT (via the submit_feedback function) and can never read what others
-- wrote. Only allow-listed admins (admin_user) can read/manage feedback in the
-- office dashboard.
--
-- Mirrors the existing design:
--   * submit_feedback() is SECURITY DEFINER, like claim_groups() - there is no
--     public INSERT policy, so the function is the only public write path.
--   * read/update/delete are admin-only via is_admin(), like `registration`.
--
-- Email forwarding to msp-operations@ is OPTIONAL and set up separately (see
-- app/supabase/FEEDBACK-SETUP.md). Feedback is captured here regardless.
-- ============================================================================

create table if not exists feedback (
  id          uuid primary key default gen_random_uuid(),
  category    text not null default 'Suggestion'
                check (category in ('Suggestion','Problem','Compliment','Other')),
  message     text not null,
  name        text,                 -- optional
  email       text,                 -- optional
  page        text,                 -- which page it came from (index/register/admin)
  user_agent  text,                 -- browser string, for debugging issues
  handled     boolean not null default false,   -- admin can tick "dealt with"
  created_at  timestamptz not null default now()
);
create index if not exists feedback_created_idx on feedback(created_at desc);

-- ---------------------------------------------------------------------------
-- Public submit path (the ONLY way the public can write feedback).
-- Validates + trims, caps length, returns the new row id.
-- ---------------------------------------------------------------------------
create or replace function submit_feedback(
  p_message    text,
  p_category   text default 'Suggestion',
  p_name       text default null,
  p_email      text default null,
  p_page       text default null,
  p_user_agent text default null
) returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  new_id uuid;
  cat    text;
begin
  if p_message is null or btrim(p_message) = '' then
    raise exception 'MESSAGE_REQUIRED';
  end if;
  cat := case when p_category in ('Suggestion','Problem','Compliment','Other')
              then p_category else 'Suggestion' end;

  insert into feedback (category, message, name, email, page, user_agent)
  values (
    cat,
    left(btrim(p_message), 4000),
    nullif(btrim(coalesce(p_name,  '')), ''),
    nullif(btrim(coalesce(p_email, '')), ''),
    nullif(btrim(coalesce(p_page,  '')), ''),
    left(coalesce(p_user_agent, ''), 500)
  )
  returning id into new_id;

  return new_id;
end;
$$;

-- Let the public call ONLY this function (not table inserts).
grant execute on function submit_feedback(text,text,text,text,text,text) to anon, authenticated;

-- ---------------------------------------------------------------------------
-- Row Level Security: no public read; admins manage.
-- ---------------------------------------------------------------------------
alter table feedback enable row level security;

drop policy if exists feedback_admin_read   on feedback;
drop policy if exists feedback_admin_update on feedback;
drop policy if exists feedback_admin_delete on feedback;
create policy feedback_admin_read   on feedback for select using (is_admin());
create policy feedback_admin_update on feedback for update using (is_admin());
create policy feedback_admin_delete on feedback for delete using (is_admin());
-- NOTE: deliberately no INSERT policy - public writes go through submit_feedback().

# Feedback feature - setup

The "Share feedback" link (in the footer of every page) lets tutors and visitors
send feedback. It works in two layers:

1. **Capture** - every submission is saved in Supabase and shows up in the
   **Website feedback** section of the office dashboard (`admin.html`), with CSV
   export. *This is all you need for the feature to work.*
2. **Email forwarding (optional)** - each new submission is also emailed to
   **msp-operations@maastrichtuniversity.nl** automatically.

---

## 1. Capture (required - 1 minute)

In the Supabase **SQL Editor**, run the contents of **`feedback.sql`** once.
(Run it after `schema.sql`, since it reuses the `is_admin()` helper.)

That's it - feedback now saves and appears in the dashboard. You can stop here.

---

## 2. Email forwarding to the office (optional - ~10 minutes)

This sends an email to the office whenever feedback arrives. The email key stays
on the server (never in the website), and a shared secret stops anyone else from
triggering emails.

### a. Get an email API key (Resend - free)
1. Sign up at <https://resend.com>.
2. Easiest start: use the built-in sender `onboarding@resend.dev` (good for
   testing). For a branded sender (`feedback@...`), verify your domain in Resend
   and use that address as `FEEDBACK_FROM`.
3. Create an API key -> copy it.

### b. Deploy the function (Supabase CLI)
```bash
# one-time: install CLI + link your project
npm i -g supabase
supabase login
supabase link --project-ref jrjimjtpcofcnpynredc   # your project ref

# set the secrets (pick any long random string for WEBHOOK_SECRET)
supabase secrets set RESEND_API_KEY=re_xxxxxxxx
supabase secrets set FEEDBACK_FROM="MSP Tutoring <onboarding@resend.dev>"
supabase secrets set FEEDBACK_TO=msp-operations@maastrichtuniversity.nl
supabase secrets set WEBHOOK_SECRET=choose-a-long-random-string

# deploy (from the repo root; the function lives in app/supabase/functions/)
supabase functions deploy feedback-email --no-verify-jwt
```
The deploy prints the function URL, e.g.
`https://jrjimjtpcofcnpynredc.functions.supabase.co/feedback-email`.

### c. Fire it on each new feedback (Database Webhook)
In the Supabase dashboard -> **Database -> Webhooks -> Create a new hook**:
- **Table:** `feedback`  · **Events:** `Insert`
- **Type:** HTTP Request · **Method:** `POST`
- **URL:** the function URL from step b
- **HTTP Headers:** add `x-webhook-secret` = the same `WEBHOOK_SECRET` you set

Save. Now every new feedback row triggers an email to the office.

### Test it
Submit feedback via the site's "Share feedback" link -> it should appear in the
dashboard **and** arrive at the office inbox. If the email doesn't arrive, check
**Edge Functions -> feedback-email -> Logs** in Supabase.

> Same mechanism (Resend + this function pattern) can later power tutor
> confirmation emails - see the roadmap.

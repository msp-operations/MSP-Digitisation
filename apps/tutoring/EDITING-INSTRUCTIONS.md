# Running the MSP Tutor Registration tool

A guide for the MSP office. No coding experience needed for anything in sections 1 to 7.

Live site: **https://msp-tutoring.nl**
Office Dashboard: **https://msp-tutoring.nl/app/admin.html**

---

## 1. The short version

Almost everything you will ever want to do is a button in the **Office Dashboard**. That includes
adding a course, adding its tutorial groups, and setting up a whole new period. You do not need
GitHub, you do not need to write anything technical, and you cannot break the website from there.

The dashboard is also the only place where tutor names and emails are visible. That is deliberate:
the public site only ever shows how many places are left, never who took them.

---

## 2. Signing in

1. Go to **https://msp-tutoring.nl/app/admin.html**
2. Type your Maastricht University email address.
3. Click **Email me a sign-in link**, then open the link in the mail you receive.

There is no password. The link is single use and only works for addresses on the office
allow-list, so if you get "not on the office allow-list", your address still needs to be added.
Ask Martijn, it takes a minute.

Sign-in links sometimes take a few minutes to arrive, and occasionally get held up if several
people sign in at once. Wait before requesting a second one, otherwise both stop working.

---

## 3. Setting up a new period

This is the big yearly job, and it is the reason the dashboard has an editor. Two ways to do it.

### The fast way: copy last period

If the course runs again with roughly the same groups:

1. Open the period tab that already has the course.
2. Click **Copy** on the course.
3. Type the period you want it in, for example `P4`, and click **Copy course**.

You get a complete copy: same groups, same days, same times, same capacities. Nobody comes with
it, every group is open, and the original is untouched. Then go through the copy and correct
whatever changed. Times and rooms usually shift a little, so check them rather than assuming.

### The full way: build it from scratch

1. Click **+ Add course** (top right of the Courses & groups section).
2. Fill in the code, the title and the period. Those three are required, the rest is optional
   but worth doing, because tutors read it when deciding.
3. Click **Add course**. It appears immediately, with no groups yet.
4. Click **+ Add group** on the new course and add the tutorial groups one at a time.

### Before you let tutors in

- Check the **Periods tutors can see** row near the top. Keep the new period hidden while you
  are still building it, and switch it on when you are ready.
- Check each group is showing the right day and time on the public site.

---

## 4. Adding or changing a course

Click **Edit course** on any course. The fields:

| Field | What it is |
|---|---|
| Course code | For example `BIO1101`. Shown as the badge on the card. |
| Period | `P1`, `P2`, and so on. Type a new one to start a period that does not exist yet. |
| Course title | The full name, as in the course catalogue. |
| Course coordinator | Name and email. Tutors use this to ask questions, so keep it current. |
| Prerequisites | Free text, for example `MSP1000`. Leave empty if there are none. |
| About this course | The blurb tutors read when they open the course. Plain text is fine. |

The same course code can exist in more than one period, but only once per period. If you get
"that course code already exists in that period", it is already there, so edit that one instead
of adding a second.

---

## 5. Adding or changing a tutorial group

Click **+ Add group** on a course, or **Edit** on a group that already exists.

| Field | What it is |
|---|---|
| Group name | Exactly what tutors will see, for example `A1 + B1`. |
| Tutors needed | Usually 1. Lab sessions are often 2. |
| First meeting | Day, start time, end time. |
| Second meeting | Same again. Leave it empty for a one-off session. |
| Open to tutors | Untick to keep the group listed but block sign-ups. |

For one-off sessions, such as the PRA1102 labs, put the date and room in the group name
(`GR07 Physics - Tue 27 Oct - DUB30 0.231`) and leave the second meeting empty.

**Small change, no form needed:** the **Need** box on each group card changes the number of
tutors straight away, and **Close** / **Open** toggles sign-ups. Use those for quick fixes.

---

## 6. The everyday jobs

| I want to... | Do this |
|---|---|
| Stop all sign-ups for a while | **Close registration** at the top. Tutors see a message instead of the list. |
| Show tutors one period only | **Periods tutors can see**. Hiding a period never hides it from you. |
| Change how many tutors a group needs | The **Need** box on the group card. |
| Stop sign-ups for one group only | **Close** on that group card. |
| Remove a tutor from a group | **Release** in the registrations table. The group reopens instantly for everyone. |
| Get the list into Excel | **Export CSV**, in the registrations table. |
| See what tutors are saying | The **Website feedback** section at the bottom. |

**Please export the CSV now and then.** The database is on a free plan with no automatic
backups, so that export is the only copy that lives anywhere else.

---

## 7. What the tool will refuse to do, on purpose

- **You cannot delete a course or a group while somebody is signed up for it.** The dashboard
  says so, and even if it did not, the database itself refuses. Release the tutor first if you
  really mean to remove it.
- **You cannot set a group to need fewer tutors than have already claimed it.** Release somebody
  first.
- **Deleting a course asks you to type the course code.** It removes all of its groups too, and
  it cannot be undone.

If something does go wrong, nothing here can lose a registration silently. The worst case is a
course or group that needs recreating.

---

## 8. Changing the words on the website

This part is GitHub, not the dashboard, and you only need it for wording, colours and images.
Skip it unless you have been given access to **https://github.com/msp-operations/Tutoring**.

The website is a set of text files. Editing one and clicking **Commit changes** publishes it to
the live site in about one to two minutes. There is no separate "publish" step, so commit means
live.

1. Open https://github.com/msp-operations/Tutoring and sign in.
2. Open the `app` folder and click the file you need.
3. Click the pencil icon, make the change, then **Commit changes**.
4. Wait a minute or two and refresh the live site with **Ctrl+Shift+R**.

| I want to change... | File |
|---|---|
| Words on the Home, Register or Privacy page | `app/index.html`, `app/register.html`, `app/privacy.html` |
| The "Questions?" email or the academic year | `app/assets/config.js` |
| The period dates, for example "31 August to 16 October 2026" | `app/register.html`, search for `PERIOD_DATES` |
| A colour | `app/assets/styles.css`, the `:root` block at the top |
| A logo or the tab icon | `app/assets/img/`, replace the file keeping the same file name |

When editing text, change only the words. Leave the `< >` tags alone: in `<p>Hello</p>`, only
`Hello` is yours.

Every version is kept. Click **History** on any file to see previous versions and go back.

---

## 9. Leave these alone and ask Martijn

- The `app/supabase/` folder. That is the database itself.
- `app/assets/config.js` keys `SUPABASE_URL` and `SUPABASE_ANON_KEY`.
- Anything inside `<script>` tags, and the `.js` files in `app/assets/`.
- Adding a new person to the office allow-list. That one grants access to tutor personal data,
  so it stays a deliberate manual step.

Also worth a message rather than a guess:

- Sign-ups are not saving, or the site shows an error.
- You need a course to behave differently from every other course.
- Something looks wrong on the public site after a change you made.

---

## 10. Glossary

- **Dashboard** or **admin**: the office page where you manage everything by clicking.
- **Group**: one tutorial group a tutor can claim. Capacity is how many tutors it needs.
- **Claim**: a tutor taking a group. First come, first served, and a full group disappears from
  the public list at that moment.
- **Release**: undoing a claim from the office side. The group reopens for everybody.
- **Period**: teaching period, `P1` through `P6`.
- **Repo**: the folder of website files on GitHub.
- **Commit**: saving a change on GitHub. On this site that also publishes it.
- **Supabase**: the database service that stores courses, groups and sign-ups. It is hosted in
  Frankfurt, inside the EU.

---

*Technical setup and deployment: `app/README.md`. Database permissions behind the course editor:
`app/supabase/admin-catalogue.sql`.*

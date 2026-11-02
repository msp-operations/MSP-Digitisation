# Editing the MSP Student FAQ

Plain-language guide for the office. You do not need to be able to code to keep this FAQ correct.
Nearly everything you will want to change is an ordinary Word-style edit to one markdown document.

**Live at:** https://msp-faqs.nl

---

## The one rule

> **All answers live in one file:**
> `c:\dev\MSP\_Inventory\Knowledge Base\MSP Student FAQ - MASTER.md`
>
> Never edit `content.json`, and never edit the answers inside `index.html`. Those are built from
> the master document. Editing them by hand creates a second, divergent copy of the FAQ, which is
> the exact problem this app was built to end. MSP already had five disagreeing FAQ copies.

---

## Changing an answer, or adding a question

1. Open `MSP Student FAQ - MASTER.md` in any text editor.
2. Find the office section (`##`) and the category (`###`) the question belongs under.
3. A question is a line in `**bold**`. Everything underneath it, until the next bold line or
   heading, is its answer.
4. Edit the words. To add a question, copy the shape of the one above it.
5. Save.
6. Open a terminal in `Github Repo\` and run:
   ```
   node tools/convert.mjs
   ```
7. `git add -A`, `git commit -m "FAQ: <what changed>"`, `git push`
8. Live in about a minute.

### Marking something as needing a decision

Write `[NEEDS MARTIJN]` (or a successor's name) in the answer. The build **strips these from the
student-facing site**, so an unfinished answer never reaches a student. To see them, open the site
with `?staff` on the end of the URL. That is how the open-questions list is tracked.

### House style

Official MSP text going out under a real person's name. No em dashes, no AI-sounding phrasing.
State the rule in plain language and link the official source. **Never rehost login-gated UM
documents** such as the EER or Rules and Regulations, link to them.

---

## The four things in the app itself you might want to change

These live in `index.html`. It has a numbered contents block at the top of each half, and the file
opens with a signpost pointing at exactly these four.

| What | Where | What it does |
|---|---|---|
| `CHIPS` | script section 5 | The shortcut buttons under the search box. Seven fit on one phone row. They also generate the "popular questions" list. |
| `SYN` | script section 5 | Everyday word on the left, FAQ vocabulary on the right, so a student typing "I am sick" still finds the attendance answers. It can only ever widen a search, so adding a line here is safe. |
| `QUICK` | script section 6 | The quick-link tiles on the home page. |
| `DEGREE_RULES` | script section 10 | The graduation arithmetic behind the degree-check card. |

⚠️ `DEGREE_RULES` is the one to be careful with. It decides whether the site tells a student they
are on track to graduate. There is a validation harness in
`c:\dev\Operations\Projects\Degree-Checker\` that checks the engine against real printed results.
Re-run it after any change there, and read that README first.

---

## Things that will catch you out

**"I changed an answer and the site still shows the old one."**
Did you run `node tools/convert.mjs`? The master document is not read by the live site directly.

**"I added a question and it did not appear."**
Check it is a `**bold line**` and that it sits under a recognised office heading. Anything before
the first office heading is ignored on purpose, which is how the table of contents stays out.

**"Students say the app is showing an old version."**
This is an installable app, so it caches itself to work offline. Content edits reach everyone with
no action needed. You only bump the cache name in `sw.js` when a *file* is added, removed or
renamed, or when you need to force everyone off an old copy immediately. A bump makes every user
re-download several megabytes, so it is not a routine step. `sw.js` explains this at the top.

**Local preview before pushing:** `node tools/serve.mjs`, then open http://localhost:8099.

---

## The twice-yearly review

The FAQ is only trustworthy if it is checked. The intended rhythm is a review with each office
twice a year, walking their section and confirming it still matches practice. An FAQ nobody has
verified for two years is worse than no FAQ, because people act on it.

---

## Where the deeper context lives

- `README.md` here: the technical picture.
- `c:\dev\Operations\Projects\FAQ\CLAUDE.md`: the pipeline and the project rules.
- `c:\dev\Operations\Projects\FAQ\_FAQ_TODO.md`: what is still open.
- `c:\dev\Operations\Projects\Degree-Checker\`: the degree-check engine and its validation harness.

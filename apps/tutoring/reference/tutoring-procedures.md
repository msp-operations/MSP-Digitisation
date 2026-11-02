# How MSP tutoring & course scheduling works

Background context for maintaining the tutor-registration tool, distilled from the
MSP office procedure documents (`Extra Context for tutoring/Procedures/...`). This
explains *where the tool sits* in the wider course-registration cycle and *how
tutors are sourced* - it is not a user manual for the tool itself (see the repo
`README.md` for that).

## Who can tutor

Tutoring positions are open to **eligible PhD candidates, MSP alumni and staff**.
Candidates are normally invited by the MSP office.
External-course tutors are supplied by the course coordinator; internal-education
tutors are coordinated via **msp-tutoring@maastrichtuniversity.nl**. Unsure
candidates should email the office before registering.

## The annual cycle

Course registration runs **twice a year - May (Fall, P1/P2) and November
(Spring, P4/P5)**. The tutor-registration tool plugs into the scheduling step.

1. **Course registration** - students choose courses via a Qualtrics form. Output
   is pulled into a per-period **workbook** (one Excel sheet per period).
2. **Pre-/co-requisite check** - each student choice is checked against the
   pre-/co-requisite overview (see `course-catalogue-2026-2027.md`). Rules are
   enforced in SAP ("rule containers"); warnings can be overruled only with a
   **waiver** - an email from the course coordinator. *No waiver = no booking.*
   - P1/P4: check the waiver directly.
   - P2/P5: first check the workbook/Student Follow-up to see if the student is
     taking the pre-requisite in the previous period; if yes, book it.
3. **Student numbers -> tutorial groups** - the workbook counts students per module
   and derives the number of tutorial groups (rule of thumb: **13 students ->
   1 group; 14+ -> split**). This sets how many tutors each course needs.
4. **Schedule build** - using the **frame schedule** (the 5 fixed slots, see
   `frame-schedule-2026-2027.md`) and the student counts, the office draws up the
   detailed schedule in Syllabus. With >2 groups, parallel/consecutive sessions
   are arranged to minimise tutors while letting students combine courses that
   share a second teaching day (Wed/Thu/Fri). Tutorial-room counts per timeslot
   are a constraint.
5. **Tutor allocation** - tutors are gathered: course coordinators provide tutors
   for external courses; **msp-tutoring@** provides them for internal education.
   **This is the step the registration tool digitises** - instead of collecting
   tutor names by email, eligible tutors claim open tutorial groups themselves,
   first-come-first-served.
6. **Publish** - draft timetables go out >=2 weeks before publication for
   coordinator checks; schedules release ~2.5 weeks before teaching starts.

## The slot system (why no clashes)

Every course is fixed to one of five weekly slots, each a pair of half-days:

| Slot | Day 1 (am) | Day 2 (pm) |
|---|---|---|
| 1 (AE) | Monday am | Wednesday pm |
| 2 (BF) | Monday pm | Thursday am |
| 3 (CF) | Tuesday am | Thursday pm |
| 4 (DG) | Tuesday pm | Friday am |
| 5 (EG) | Wednesday am | Friday pm |

Because tutorial groups always fall inside their course's slot, the tool can show
a Mon-Fri timetable and warn about time clashes reliably. Full per-period detail:
`frame-schedule-2026-2027.md` + the PDFs in `originals/`.

## Switch & withdraw

Students change courses via the intranet **Withdraw/switch form**, processed in
Corsa and reflected in the workbook (insert new choice, delete old, keep the
"#open spots" / total columns current). A `0` in "#open spots" = the module is
full; switches into full modules are denied (waiting-list candidates noted).
Deadlines are published per academic year (`Switch and withdraw deadlines
Academic Year 2026 2027.pdf`).

## Key mailboxes

| Purpose | Mailbox |
|---|---|
| Tutoring / internal tutor coordination | msp-tutoring@maastrichtuniversity.nl |
| Exams & mid-terms | msp-exams@maastrichtuniversity.nl |
| Education support (ESD) | msp-educationsupport@maastrichtuniversity.nl |

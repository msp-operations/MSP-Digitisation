# MSP Frame Schedule - 2026/2027

The MSP frame schedule places every course into one of five fixed weekly **slots**.
Each slot is a pair of half-day blocks (an "am" block and a "pm" block on two
different weekdays). A course's PBL tutorial groups always meet inside its slot,
which is why the registration tool can show a Mon-Fri timetable without clashes.

The authoritative, per-course slot allocations (which course sits in which slot,
plus coordinators and pre/co-requisite flags) are the four PDFs in
[`originals/`](originals/):

- `Frame schedule MSP 2026-2027 Period 1 - Final.pdf`
- `Frame schedule MSP 2026-2027 Period 2 - Final.pdf`
- `Frame schedule MSP 2026-2027 Period 4 - Final.pdf`
- `Frame schedule MSP 2026-2027 Period 5 - Final.pdf`

The exact tutorial group days/times that drive the tool live in
`reference/Info for tutor registration tool.xlsx` (-> `seed.sql` / `demo-data.js`).

## Slot legend (identical across P1, P2, P4, P5)

| Slot | Code | Day 1 (am) | Day 2 (pm) |
|---|---|---|---|
| 1 | AE | Monday am | Wednesday pm |
| 2 | BF | Monday pm | Thursday am |
| 3 | CF | Tuesday am | Thursday pm |
| 4 | DG | Tuesday pm | Friday am |
| 5 | EG | Wednesday am | Friday pm |

> The two-letter code (AE, BF, ...) is the UM half-day block pairing. "am"/"pm"
> map to the standard MSP teaching blocks below.

## Standard teaching time blocks

These are the actual start/end times used by tutorial groups in the tool:

| Block | Time |
|---|---|
| Morning 1 | 08:30 - 10:00 |
| Morning 2 | 10:15 - 11:45 |
| Midday | 12:00 - 13:30 |
| Afternoon 1 | 14:00 - 15:30 |
| Afternoon 2 | 15:45 - 17:15 |

A single course typically runs two parallel tutorial blocks (e.g. an "A/B" round
in the morning and again in the afternoon), so several tutors are needed per
course - which is exactly what the registration tool allocates.

## Period dates 2026/2027

- **Period 1:** 31 August - 16 October 2026 (Fall)
- **Period 2:** Fall semester (after P1)
- **Period 4 / 5:** Spring semester

(Exact P2/P4/P5 dates are printed on each frame-schedule PDF.)

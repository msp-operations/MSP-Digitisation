/* The MSP tools shown on the two hubs. Edit this file, nothing else, to add or change a tool.
   Order here is the order of the cards on the hub (left to right, top to bottom).

   fields
     id         short slug
     name       the tool's name as students and staff know it
     blurb      one line, what you do there (shown on the card)
     blurbStaff optional: a different line on the staff hub
     hubs       which hub(s) show it: 'students', 'staff'
     icon       a name from msp-shell.js (see the design system page, "Icons")
     live       the public address today (empty string if not published)
     next       the address of the restyled version once it is published
     status     live | dev
     card       optional: 'search' (wide, with a search box that opens the tool with ?q=)
                or 'tall' (two rows high, light, with a small picture)
     mark       optional: a big word shown on the card instead of the icon (e.g. 'P3 · P6')
     cta        optional: the link text at the bottom of a 'search' or 'tall' card

   CE Alumni is deliberately not on either hub (Martijn, 6 Oct 2026).
*/
window.MSP_HUBS = {
  // The student hub links to no other hub (2 Nov 2026), so students never see the staff side; staff open staff.html.
  students: { title: 'For Students', line: 'Answers from the office, your course plan, projects, your thesis and where graduates went.', file: 'index.html' },
  staff:    { title: 'For Staff', line: 'The tools behind the programme, for support and academic staff.', other: 'students', otherLabel: 'Student tools', file: 'staff.html' }
};

window.MSP_PROJECTS = [
  { id: 'faq',      name: 'Student FAQ',        hubs: ['students'],          icon: 'help',      live: 'https://msp-operations.github.io/MSP-Digital/faq/', next: 'faq/', status: 'live',
    card: 'search', cta: 'Open the FAQ',
    blurb: 'Search-first answers to the questions students ask the office.' },
  { id: 'planner',  name: 'Course Planner',     hubs: ['students'],          icon: 'calendar',  live: '', next: 'course-planner/', status: 'live',
    card: 'tall', cta: 'Plan your courses',
    blurb: 'Build a clash-free schedule and track your progress.' },
  { id: 'periods',  name: 'Project Periods (beta)',    hubs: ['students', 'staff'], icon: 'target',    live: 'https://msp-operations.github.io/MSP-Digital/project-periods/', next: 'project-periods/', status: 'live',
    mark: 'P3 · P6',
    blurb: 'The P3 and P6 project catalogue and your preferences.',
    blurbStaff: 'Offer a P3 or P6 project, or run the allocation as the committee.' },
  { id: 'btr',      name: 'BTR Dashboard',      hubs: ['students'],          icon: 'book',      live: 'https://msp-operations.github.io/MSP-Digital/btr-dashboard/', next: 'btr-dashboard/', status: 'live',
    blurb: 'Guides, cohorts, rubrics and the projects on offer for your thesis.' },
  { id: 'alumni',   name: 'MSP Alumni',         hubs: ['students'],          icon: 'globe',     live: 'https://msp-operations.github.io/MSP-Digital/msp-alumni/', next: 'msp-alumni/', status: 'live',
    blurb: 'Where MSP graduates went: destinations, stories, community.' },

  { id: 'calendar', name: 'Academic Calendar',  hubs: ['staff'],             icon: 'clock',     live: 'https://msp-operations.github.io/MSP-Digital/academic-calendar/', next: 'academic-calendar/', status: 'live',
    card: 'tall', cta: 'Open the calendar',
    blurb: 'Every operational deadline per office and period.' },
  { id: 'exams',    name: 'Exams Office',       hubs: [],                    icon: 'clipboard', live: 'https://msp-operations.github.io/MSP-Digital/exams-office/', next: 'exams-office/', status: 'live',
    blurb: 'The exam coordinator manual: periods, checklists, procedures.' },
  { id: 'tutoring', name: 'Tutor Registration', hubs: ['staff'],             icon: 'users',     live: 'https://msp-operations.github.io/MSP-Digital/tutoring/', next: 'tutoring/', status: 'live',
    blurb: 'Claim the tutorial groups you want to teach; the office allocates from here.' },
  { id: 'btr-proj', name: 'BTR for Supervisors', hubs: ['staff'],             icon: 'briefcase', live: 'https://msp-operations.github.io/MSP-Digital/btr-projects/', next: 'btr-projects/', status: 'live',
    blurb: 'Offer a thesis project and read the supervisor and advisor roles.' }
];

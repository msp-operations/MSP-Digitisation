/* The MSP tools shown on the two hubs. Edit this file, nothing else, to add or change a tool.
   Order here is the order around the emblem (clockwise from the top).

   fields
     id         short slug
     name       the tool's name as students and staff know it
     blurb      one line, what you do there (shown on hover)
     blurbStaff optional: a different line on the staff hub
     hubs       which hub(s) show it: 'students', 'staff'
     icon       a name from msp-shell.js (see the design system page, "Icons")
     live       the public address today (empty string if not published)
     next       the address of the restyled version once it is published
     status     live | dev

   CE Alumni is deliberately not on either hub (Martijn, 6 Oct 2026).
*/
window.MSP_HUBS = {
  students: { title: 'For Students', line: 'Everything you need as an MSP student, in one place.', other: 'staff', otherLabel: 'Staff tools', file: 'index.html' },
  staff:    { title: 'For Staff', line: 'The tools behind the programme, for support and academic staff.', other: 'students', otherLabel: 'Student tools', file: 'staff.html' }
};

window.MSP_PROJECTS = [
  { id: 'faq',      name: 'Student FAQ',        hubs: ['students'],          icon: 'help',      live: 'https://msp-operations.github.io/MSP-Remodel-Preview/faq/', next: 'faq/', status: 'live',
    blurb: 'Search-first answers to the questions students ask the office.' },
  { id: 'planner',  name: 'Course Planner',     hubs: ['students'],          icon: 'calendar',  live: '', next: 'course-planner/', status: 'live',
    blurb: 'Build a clash-free schedule and track your progress.' },
  { id: 'btr',      name: 'BTR Dashboard',      hubs: ['students'],          icon: 'book',      live: 'https://msp-operations.github.io/MSP-Remodel-Preview/btr-dashboard/', next: 'btr-dashboard/', status: 'live',
    blurb: 'Guides, cohorts, rubrics and the projects on offer for your thesis.' },
  { id: 'periods',  name: 'Project Periods',    hubs: ['students', 'staff'], icon: 'target',    live: 'https://msp-operations.github.io/MSP-Remodel-Preview/project-periods/', next: 'project-periods/', status: 'live',
    blurb: 'The P3 and P6 project catalogue and your preferences.',
    blurbStaff: 'Offer a P3 or P6 project, or run the allocation as the committee.' },
  { id: 'alumni',   name: 'MSP Alumni',         hubs: ['students'],          icon: 'globe',     live: 'https://msp-operations.github.io/MSP-Remodel-Preview/msp-alumni/', next: 'msp-alumni/', status: 'live',
    blurb: 'Where MSP graduates went: destinations, stories, community.' },

  { id: 'calendar', name: 'Academic Calendar',  hubs: ['staff'],             icon: 'clock',     live: 'https://msp-operations.github.io/MSP-Remodel-Preview/academic-calendar/', next: 'academic-calendar/', status: 'live',
    blurb: 'Every operational deadline per office and period.' },
  { id: 'exams',    name: 'Exams Office',       hubs: [],                    icon: 'clipboard', live: 'https://msp-operations.github.io/MSP-Remodel-Preview/exams-office/', next: 'exams-office/', status: 'live',
    blurb: 'The exam coordinator manual: periods, checklists, procedures.' },
  { id: 'tutoring', name: 'Tutor Registration', hubs: ['staff'],             icon: 'users',     live: 'https://msp-operations.github.io/MSP-Remodel-Preview/tutoring/', next: 'tutoring/', status: 'live',
    blurb: 'Claim the tutorial groups you want to teach; the office allocates from here.' },
  { id: 'btr-proj', name: 'BTR for Supervisors', hubs: ['staff'],             icon: 'briefcase', live: 'https://msp-operations.github.io/MSP-Remodel-Preview/btr-projects/', next: 'btr-projects/', status: 'live',
    blurb: 'Offer a thesis project and read the supervisor and advisor roles.' }
];

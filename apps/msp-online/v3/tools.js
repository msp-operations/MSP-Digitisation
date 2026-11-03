/* Version 3: the original websites, untouched, inside one shared side nav.
   Each tool is the LIVE site (or, for the unpublished Course Planner, the original copy).
   hint  = the short line under the name in the side nav
   blurb = the longer line shown on the landing view when you hover a tool
   ownNav: true = the tool brings its own navy sidebar; the shared nav then shrinks to an icon rail.
   note  = optional line under the nav; build-preview.py adds 'Pending change, not on the live site yet' (and swaps
           the url to sites/...) for tools listed in its PENDING table, so do not look for that text here.
   Landing view (the cards), all optional:
   card  = 'search' (wide, with a search box that opens the tool with ?q=) or 'tall' (two rows high, light, small picture)
   mark  = a big word shown on the card instead of the icon (e.g. 'P3 · P6')
   cta   = the link text at the bottom of a 'search' or 'tall' card
   The order here is the order of the cards (left to right, top to bottom) and of the menu.
   other / otherLabel = the hub this one links to. The student hub links to none (2 Nov 2026), so students never
   see the staff side; staff open it at staff.html.
   Edit this file to add, remove or reorder tools. Version 2 (the restyle) is separate. */
window.V3 = {
  name: 'MSP Digital Hub',   // Martijn, 2 Nov 2026 (was the placeholder 'MSP Online')
  suites: {
    students: {
      label: 'Students', one: 'student', title: 'For Students',
      line: 'Answers from the office, your course plan, projects, your thesis and where graduates went.',
      tools: [
        { id: 'faq',             name: 'Student FAQ',     icon: 'help',     hint: 'Answers from the office', card: 'search', cta: 'Open the FAQ',
          blurb: 'Search-first answers to the questions students ask the office.', url: 'https://msp-faqs.nl/' },
        // the planner team's web version with the advising backend (Arthur, Panos), shown as a preview from 2 Nov 2026;
        // the Canvas file stays the version for registration until this one has the final data and UM sign-in
        { id: 'course-planner',  name: 'Course Planner',  icon: 'calendar', hint: 'Plan your courses', card: 'tall', cta: 'Plan your courses',
          blurb: 'Build a clash-free schedule and track your progress.', url: 'https://arthurgallaxy.github.io/msp-course-lab-selector-development/',
          ownNav: true, note: 'Preview of the new planner: test accounts only' },
        { id: 'project-periods', name: 'Project Periods (beta)', icon: 'target',   hint: 'P3 and P6 projects', mark: 'P3 · P6',
          blurb: 'The P3 and P6 project catalogue and your preferences.', url: 'sites/project-periods/', note: 'Pending change, not on the live site yet' },
        { id: 'btr',             name: 'BTR Dashboard',   icon: 'book',     hint: 'Your bachelor thesis',
          blurb: 'Guides, cohorts, rubrics and the projects on offer for your thesis.', url: 'sites/btr/', note: 'Pending change, not on the live site yet' },
        { id: 'msp-alumni',      name: 'MSP Alumni',      icon: 'globe',    hint: 'Where graduates went',
          blurb: 'Where MSP graduates went: destinations, stories, community.', url: 'sites/msp-alumni/', note: 'Pending change, not on the live site yet' }
      ]
    },
    staff: {
      label: 'Staff', one: 'staff', title: 'For Staff', other: 'students', otherLabel: 'Student tools',
      line: 'The tools behind the programme, for support and academic staff.',
      tools: [
        { id: 'project-periods',   name: 'Project Periods (beta)',    icon: 'target',    hint: 'Offer and allocate projects', mark: 'P3 · P6',
          blurb: 'Offer a P3 or P6 project, or run the allocation as the committee.', url: 'sites/project-periods/', note: 'Pending change, not on the live site yet' },
        { id: 'academic-calendar', name: 'Academic Calendar',  icon: 'clock',     hint: 'Deadlines per office', card: 'tall', cta: 'Open the calendar',
          blurb: 'Every operational deadline per office and period.', url: 'sites/academic-calendar/', note: 'Pending change, not on the live site yet', ownNav: true },
        { id: 'plan-reviews',      name: 'Plan reviews',       icon: 'clipboard', hint: 'Advisors and study plans', card: 'tall', cta: 'Open, then sign in as advisor',
          blurb: 'Advisors sign in under Account to see the study plans students send from the Course Planner, and approve or comment.',
          url: 'https://arthurgallaxy.github.io/msp-course-lab-selector-development/', ownNav: true,
          note: 'Preview of the new planner: test accounts only' },
        { id: 'tutoring',          name: 'Tutor Registration', icon: 'users',     hint: 'Tutorial groups',
          blurb: 'Claim the tutorial groups you want to teach; the office allocates from here.', url: 'https://msp-tutoring.nl/' },
        { id: 'btr-projects',      name: 'BTR Projects',       icon: 'briefcase', hint: 'Offer a thesis project',
          blurb: 'Offer a Bachelor Thesis Research project to MSP students.', url: 'sites/btr-projects/', note: 'Pending change, not on the live site yet' }
      ]
    }
  },

  // The start page of both sides (hub-home.js). Update once a year, with the Academic Calendar:
  // periods = data/year-2026-27.yaml of the Academic-Calendar repo; keyDates = only the big milestones per side
  // (period starts, exam weeks, breaks, and the calendar's events for everyone). The page shows the next five.
  // kind: 'exam' shows the date in orange; 'reg' is a registration moment (the student Course Planner card counts down to it).
  home: {
    periods: [
      { id: 'P1', start: '2026-08-31', end: '2026-10-16' },
      { id: 'P2', start: '2026-10-26', end: '2026-12-11' },
      { id: 'P3', start: '2027-01-04', end: '2027-01-22' },
      { id: 'P4', start: '2027-01-25', end: '2027-03-19' },
      { id: 'P5', start: '2027-03-29', end: '2027-05-21' },
      { id: 'P6', start: '2027-05-24', end: '2027-06-11' }
    ],
    keyDates: {
      staff: [
        { start: '2026-11-09',                    title: 'Course registration week', kind: 'reg' },
        { start: '2026-11-14',                    title: 'Bachelor Open Day' },
        { start: '2026-11-27',                    title: 'Graduation ceremony' },
        { start: '2026-12-07', end: '2026-12-11', title: 'P2 exam week', kind: 'exam' },
        { start: '2026-12-21', end: '2027-01-01', title: 'Christmas break' },
        { start: '2027-01-04',                    title: 'P3 project period starts' },
        { start: '2027-01-25',                    title: 'P4 starts' },
        { start: '2027-02-08', end: '2027-02-12', title: 'Carnival week' },
        { start: '2027-02-27',                    title: 'Bachelor Open Day' },
        { start: '2027-03-15', end: '2027-03-19', title: 'P4 exam week', kind: 'exam' },
        { start: '2027-03-29',                    title: 'P5 starts' },
        { start: '2027-04-29',                    title: 'Academic advising opens (fall registration)', kind: 'reg' },
        { start: '2027-05-17', end: '2027-05-21', title: 'P5 exam week', kind: 'exam' },
        { start: '2027-05-24',                    title: 'P6 project period starts' },
        { start: '2027-06-14', end: '2027-06-18', title: 'Resit week P5', kind: 'exam' },
        { start: '2027-06-21',                    title: 'Summer break begins' }
      ],
      students: [
        { start: '2026-11-09',                    title: 'Course registration week', kind: 'reg' },
        { start: '2026-11-27',                    title: 'Graduation ceremony' },
        { start: '2026-12-07', end: '2026-12-11', title: 'P2 exam week', kind: 'exam' },
        { start: '2026-12-21', end: '2027-01-01', title: 'Christmas break' },
        { start: '2027-01-04',                    title: 'P3 project period starts' },
        { start: '2027-01-25',                    title: 'P4 starts' },
        { start: '2027-02-08', end: '2027-02-12', title: 'Carnival week' },
        { start: '2027-03-15', end: '2027-03-19', title: 'P4 exam week', kind: 'exam' },
        { start: '2027-03-29',                    title: 'P5 starts' },
        { start: '2027-04-29',                    title: 'Academic advising opens (fall registration)', kind: 'reg' },
        { start: '2027-05-17', end: '2027-05-21', title: 'P5 exam week', kind: 'exam' },
        { start: '2027-05-24',                    title: 'P6 project period starts' },
        { start: '2027-06-14', end: '2027-06-18', title: 'Resit week P5', kind: 'exam' },
        { start: '2027-06-21',                    title: 'Summer break begins' }
      ]
    }
  }
};

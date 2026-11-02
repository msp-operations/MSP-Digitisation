/* Version 3: the original websites, untouched, inside one shared side nav.
   Each tool is the LIVE site (or, for the unpublished Course Planner, the original copy).
   hint  = the short line under the name in the side nav
   blurb = the longer line shown on the landing view when you hover a tool
   ownNav: true = the tool brings its own navy sidebar; the shared nav then shrinks to an icon rail.
   note  = optional line under the nav; build-preview.py adds 'Pending change, not on the live site yet' (and swaps
           the url to sites/...) for tools listed in its PENDING table, so do not look for that text here.
   Edit this file to add, remove or reorder tools. Version 2 (the restyle) is separate. */
window.V3 = {
  name: 'MSP Online',   // placeholder name, Martijn's call
  suites: {
    students: {
      label: 'Students', one: 'student', title: 'For Students', other: 'staff', otherLabel: 'Staff tools',
      line: 'Everything you need as an MSP student, in one place.',
      tools: [
        { id: 'faq',             name: 'Student FAQ',     icon: 'help',     hint: 'Answers from the office',
          blurb: 'Search-first answers to the questions students ask the office.', url: 'https://msp-faqs.nl/' },
        { id: 'course-planner',  name: 'Course Planner',  icon: 'calendar', hint: 'Plan your courses',
          blurb: 'Build a clash-free schedule and track your progress.', url: 'sites/course-planner/index.html', ownNav: true },
        { id: 'btr',             name: 'BTR Dashboard',   icon: 'book',     hint: 'Your bachelor thesis',
          blurb: 'Guides, cohorts, rubrics and the projects on offer for your thesis.', url: 'sites/btr/', note: 'Pending change, not on the live site yet' },
        { id: 'project-periods', name: 'Project Periods', icon: 'target',   hint: 'P3 and P6 projects',
          blurb: 'The P3 and P6 project catalogue and your preferences.', url: 'sites/project-periods/', note: 'Pending change, not on the live site yet' },
        { id: 'msp-alumni',      name: 'MSP Alumni',      icon: 'globe',    hint: 'Where graduates went',
          blurb: 'Where MSP graduates went: destinations, stories, community.', url: 'sites/msp-alumni/', note: 'Pending change, not on the live site yet' }
      ]
    },
    staff: {
      label: 'Staff', one: 'staff', title: 'For Staff', other: 'students', otherLabel: 'Student tools',
      line: 'The tools behind the programme, for support and academic staff.',
      tools: [
        { id: 'project-periods',   name: 'Project Periods',    icon: 'target',    hint: 'Offer and allocate projects',
          blurb: 'Offer a P3 or P6 project, or run the allocation as the committee.', url: 'sites/project-periods/', note: 'Pending change, not on the live site yet' },
        { id: 'academic-calendar', name: 'Academic Calendar',  icon: 'clock',     hint: 'Deadlines per office',
          blurb: 'Every operational deadline per office and period.', url: 'sites/academic-calendar/', note: 'Pending change, not on the live site yet', ownNav: true },
        { id: 'tutoring',          name: 'Tutor Registration', icon: 'users',     hint: 'Tutorial groups',
          blurb: 'Claim the tutorial groups you want to teach; the office allocates from here.', url: 'https://msp-tutoring.nl/' },
        { id: 'btr-projects',      name: 'BTR Projects',       icon: 'briefcase', hint: 'Offer a thesis project',
          blurb: 'Offer a Bachelor Thesis Research project to MSP students.', url: 'sites/btr-projects/', note: 'Pending change, not on the live site yet' }
      ]
    }
  }
};

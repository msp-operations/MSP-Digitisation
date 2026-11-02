/* ============================================
   BTR Dashboard - shared frame + page helpers
   --------------------------------------------
   Loaded at the end of every page, AFTER
   assets/msp-ui/msp-shell.js. It:
     1. builds the shared MSP sidebar with the one
        navigation for the whole site (MSPShell.init)
     2. marks the parent entry active on sub-pages
        (data-active on <body>, or window.BTR_PAGE)
     3. adds the breadcrumb kicker inside the hero
     4. adds the student-journey bar on the five
        guide pages
     5. fades .content-section blocks in on scroll
   The old hamburger menu, overlay and skip link are
   gone: the shell provides those.
   ============================================ */
(function () {
    var NAV = [
        { label: 'Students', group: true },
        { label: 'Home', href: 'index.html', icon: 'home', hint: 'BTR at a glance' },
        { label: 'Before you start', href: 'before-you-start.html', icon: 'compass' },
        { label: 'Browse projects', href: 'browse-projects.html', icon: 'search', hint: 'Find your thesis project' },
        { label: 'Writing the proposal', href: 'writing-the-proposal.html', icon: 'edit' },
        { label: 'Writing the thesis', href: 'writing-the-thesis.html', icon: 'filetext' },
        { label: 'Video guidelines', href: 'btr-video.html', icon: 'video' },
        { label: 'Assessment rubrics', href: 'rubrics.html', icon: 'check' },
        { label: 'FAQ', href: 'faq.html', icon: 'help' },
        { label: 'Cohorts', group: true },
        { label: 'September 2026', href: 'september-cohort-2026.html', icon: 'calendar', hint: 'Dashboard and timeline' },
        { label: 'February 2027', href: 'february-cohort-2027.html', icon: 'calendar', hint: 'Dashboard and timeline' },
        { divider: true },
        { label: 'Contact the BTR office', href: 'mailto:msp-btr@maastrichtuniversity.nl', icon: 'mail', external: true }
    ];

    /* Sub-pages highlight their parent entry. The body attribute wins,
       then window.BTR_PAGE, then this fallback map. */
    var PARENT = {
        'timeline-september.html': 'september-cohort-2026.html',
        'timeline-february.html': 'february-cohort-2027.html',
        '404.html': 'index.html'
    };

    var path = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    var page = window.BTR_PAGE || {};
    var active = document.body.getAttribute('data-active') || page.active || PARENT[path] || null;

    if (window.MSPShell) {
        MSPShell.init({
            title: 'BTR Dashboard',
            home: 'index.html',
            nav: NAV,
            active: active || undefined,
            footer: 'Bachelor Thesis Research, Maastricht Science Programme.'
        });
    }

    var hero = document.querySelector('.msp-hero');

    /* --- Breadcrumb kicker (inside the hero, above the title) --- */
    var breadcrumbMap = {
        'february-cohort-2027.html': ['February 2027 Cohort'],
        'september-cohort-2026.html': ['September 2026 Cohort'],
        'before-you-start.html': ['Before You Start'],
        'writing-the-proposal.html': ['Writing the Proposal'],
        'writing-the-thesis.html': ['Writing the Thesis'],
        'btr-video.html': ['BTR Video'],
        'timeline-february.html': ['February 2027 Cohort|february-cohort-2027.html', 'Timeline'],
        'timeline-september.html': ['September 2026 Cohort|september-cohort-2026.html', 'Timeline'],
        'faq.html': ['FAQ'],
        'rubrics.html': ['Assessment Rubrics'],
        'browse-projects.html': ['Browse Projects']

    };
    var crumbs = breadcrumbMap[path];
    if (crumbs && hero && !hero.querySelector('.btr-crumbs')) {
        var crumbNav = document.createElement('nav');
        crumbNav.className = 'btr-crumbs';
        crumbNav.setAttribute('aria-label', 'Breadcrumb');
        var html = '<a href="index.html">Home</a>';
        for (var i = 0; i < crumbs.length; i++) {
            html += '<span class="sep" aria-hidden="true">/</span>';
            var parts = crumbs[i].split('|');
            if (i < crumbs.length - 1 && parts.length > 1) {
                html += '<a href="' + parts[1] + '">' + parts[0] + '</a>';
            } else {
                html += '<span class="current" aria-current="page">' + parts[0] + '</span>';
            }
        }
        crumbNav.innerHTML = html;
        hero.insertBefore(crumbNav, hero.firstChild);
    }

    /* --- Student journey bar (five guide pages) --- */
    var journeyPages = [
        { label: 'Start', href: 'before-you-start.html' },
        { label: 'Proposal', href: 'writing-the-proposal.html' },
        { label: 'Thesis', href: 'writing-the-thesis.html' },
        { label: 'Video', href: 'btr-video.html' },
        { label: 'Rubrics', href: 'rubrics.html' }
    ];
    var activeIndex = -1;
    for (var j = 0; j < journeyPages.length; j++) { if (journeyPages[j].href === path) activeIndex = j; }
    if (activeIndex >= 0 && hero) {
        var bar = document.createElement('nav');
        bar.className = 'journey-progress';
        bar.setAttribute('aria-label', 'BTR journey');
        for (var s = 0; s < journeyPages.length; s++) {
            if (s > 0) {
                var connector = document.createElement('span');
                connector.className = 'journey-connector';
                bar.appendChild(connector);
            }
            var step = document.createElement('a');
            step.href = journeyPages[s].href;
            step.className = 'journey-step';
            if (s === activeIndex) { step.classList.add('active'); step.setAttribute('aria-current', 'page'); }
            if (s < activeIndex) step.classList.add('completed');
            var dot = document.createElement('span');
            dot.className = 'journey-step-dot';
            dot.textContent = s < activeIndex ? '✓' : (s + 1);
            var label = document.createElement('span');
            label.className = 'journey-step-label';
            label.textContent = journeyPages[s].label;
            step.appendChild(dot);
            step.appendChild(label);
            bar.appendChild(step);
        }
        hero.parentNode.insertBefore(bar, hero.nextSibling);
    }

    /* --- Scroll reveal for .content-section (cohort pages) --- */
    var sections = document.querySelectorAll('.content-section');
    if (sections.length > 0) {
        document.documentElement.classList.add('js-reveal');
        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function (entries) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });
            sections.forEach(function (s) { observer.observe(s); });
        } else {
            sections.forEach(function (s) { s.classList.add('visible'); });
        }
    }
})();

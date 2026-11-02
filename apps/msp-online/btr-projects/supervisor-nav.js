/* ============================================
   BTR for Supervisors - shared frame for the supervisor pages
   (copied from the BTR Dashboard's nav.js on 6 Oct 2026; same helpers, supervisor nav)
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
        { label: 'Supervisors', group: true },
        { label: 'Home', href: 'index.html', icon: 'home', hint: 'BTR for supervisors' },
        { label: 'Offer a project', href: 'submit.html', icon: 'edit', hint: 'Submit a BTR project' },
        { label: 'What is the BTR?', href: 'supervisor-btr-overview.html', icon: 'info', hint: 'The programme in brief' },
        { label: 'Research supervisor', href: 'supervisor-role.html', icon: 'users', hint: 'Your role and tasks' },
        { label: 'Internal advisor', href: 'internal-advisor-role.html', icon: 'shield', hint: 'Your role and tasks' },
        { divider: true },
        { label: 'Contact the BTR office', href: 'mailto:msp-btr@maastrichtuniversity.nl', icon: 'mail', external: true }
    ];

    /* Sub-pages highlight their parent entry. The body attribute wins,
       then window.BTR_PAGE, then this fallback map. */
    var PARENT = {};

    var path = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    var page = window.BTR_PAGE || {};
    var active = document.body.getAttribute('data-active') || page.active || PARENT[path] || null;

    if (window.MSPShell) {
        MSPShell.init({
            title: 'BTR for Supervisors',
            home: 'index.html',
            nav: NAV,
            active: active || undefined,
            footer: 'Bachelor Thesis Research, Maastricht Science Programme.'
        });
    }

    var hero = document.querySelector('.msp-hero');

    /* --- Breadcrumb kicker (inside the hero, above the title) --- */
    var breadcrumbMap = {
        'supervisor-role.html': ['Research Supervisor'],
        'internal-advisor-role.html': ['Internal Advisor'],
        'supervisor-btr-overview.html': ['What is the BTR?']
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

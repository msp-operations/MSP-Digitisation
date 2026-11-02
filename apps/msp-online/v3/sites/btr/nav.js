/* ============================================
   BTR Dashboard — Navigation & Accessibility
   Adds hamburger menu, skip link, breadcrumbs,
   student journey progress bar, and scroll reveal
   ============================================ */
(function () {
    // --- Skip to Content Link ---
    var mainContent = document.querySelector('.hero, .page-hero, .hero--centered, .hero--orange, main, .content-section');
    if (mainContent) {
        mainContent.id = mainContent.id || 'main-content';
        var skipLink = document.createElement('a');
        skipLink.href = '#' + mainContent.id;
        skipLink.className = 'skip-to-content';
        skipLink.textContent = 'Skip to content';
        document.body.insertBefore(skipLink, document.body.firstChild);
    }

    // --- Page Load Animation ---
    document.body.classList.add('page-loaded');

    // --- Scroll Reveal for Content Sections ---
    document.documentElement.classList.add('js-reveal');
    var sections = document.querySelectorAll('.content-section');
    if (sections.length > 0 && 'IntersectionObserver' in window) {
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
        // Fallback: show everything
        sections.forEach(function (s) { s.classList.add('visible'); });
    }

    // --- Breadcrumb Navigation ---
    var path = window.location.pathname.split('/').pop() || 'index.html';
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
        'supervisor-role.html': ['Supervisors|supervisors.html', 'Supervisor Role'],
        'supervisor-btr-overview.html': ['Supervisors|supervisors.html', 'BTR Overview']
    };

    var crumbs = breadcrumbMap[path];
    if (crumbs) {
        var header = document.querySelector('.header');
        var hero = document.querySelector('.hero, .page-hero, .hero--centered, .hero--orange');
        var insertTarget = hero || (header ? header.nextElementSibling : null);

        if (insertTarget) {
            var breadcrumbNav = document.createElement('nav');
            breadcrumbNav.className = 'breadcrumbs';
            breadcrumbNav.setAttribute('aria-label', 'Breadcrumb');
            var html = '<a href="index.html">Home</a>';
            for (var i = 0; i < crumbs.length; i++) {
                html += '<span class="separator" aria-hidden="true">/</span>';
                var parts = crumbs[i].split('|');
                if (i < crumbs.length - 1 && parts.length > 1) {
                    html += '<a href="' + parts[1] + '">' + parts[0] + '</a>';
                } else {
                    html += '<span class="current" aria-current="page">' + parts[0] + '</span>';
                }
            }
            breadcrumbNav.innerHTML = html;
            insertTarget.parentNode.insertBefore(breadcrumbNav, insertTarget.nextSibling);
        }
    }

    // --- Student Journey Progress Indicator ---
    var journeyPages = [
        { label: 'Start', href: 'before-you-start.html', key: 'before-you-start.html' },
        { label: 'Proposal', href: 'writing-the-proposal.html', key: 'writing-the-proposal.html' },
        { label: 'Thesis', href: 'writing-the-thesis.html', key: 'writing-the-thesis.html' },
        { label: 'Video', href: 'btr-video.html', key: 'btr-video.html' },
        { label: 'Rubrics', href: 'rubrics.html', key: 'rubrics.html' }
    ];

    var showJourney = journeyPages.some(function (p) { return p.key === path; });

    if (showJourney) {
        var headerEl = document.querySelector('.header');
        if (headerEl) {
            var bar = document.createElement('div');
            bar.className = 'journey-progress';
            bar.setAttribute('aria-label', 'BTR Journey Progress');
            var activeIndex = journeyPages.findIndex(function (p) { return p.key === path; });

            for (var s = 0; s < journeyPages.length; s++) {
                if (s > 0) {
                    var connector = document.createElement('div');
                    connector.className = 'journey-connector';
                    bar.appendChild(connector);
                }
                var step = document.createElement('a');
                step.href = journeyPages[s].href;
                step.className = 'journey-step';
                if (s === activeIndex) step.classList.add('active');
                if (s < activeIndex) step.classList.add('completed');

                var dot = document.createElement('span');
                dot.className = 'journey-step-dot';
                dot.textContent = s < activeIndex ? '\u2713' : (s + 1);

                var label = document.createElement('span');
                label.className = 'journey-step-label';
                label.textContent = journeyPages[s].label;

                step.appendChild(dot);
                step.appendChild(label);
                bar.appendChild(step);
            }
            headerEl.parentNode.insertBefore(bar, headerEl.nextSibling);
        }
    }

    // --- Mobile Navigation ---
    var nav = document.querySelector('.nav-menu');
    if (!nav) return;

    var headerContent = nav.parentElement;

    // Detect if header has dark background
    var headerForNav = document.querySelector('.header');
    var headerBg = headerForNav ? getComputedStyle(headerForNav).backgroundColor : '';
    var isDark = headerBg && headerBg !== 'rgb(255, 255, 255)' && headerBg !== 'rgba(0, 0, 0, 0)';

    // Create hamburger button
    var btn = document.createElement('button');
    btn.className = 'hamburger';
    btn.setAttribute('aria-label', 'Toggle navigation');
    btn.setAttribute('aria-expanded', 'false');
    for (var h = 0; h < 3; h++) {
        var span = document.createElement('span');
        if (isDark) span.style.background = '#fff';
        btn.appendChild(span);
    }

    // Create overlay for closing menu on outside click
    var overlay = document.createElement('div');
    overlay.className = 'nav-overlay';
    document.body.appendChild(overlay);

    // Insert hamburger before nav
    headerContent.insertBefore(btn, nav);

    function toggle() {
        var isOpen = nav.classList.toggle('active');
        btn.classList.toggle('active');
        overlay.classList.toggle('active');
        btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        document.body.style.overflow = isOpen ? 'hidden' : '';
    }

    function close() {
        nav.classList.remove('active');
        btn.classList.remove('active');
        overlay.classList.remove('active');
        btn.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
    }

    btn.addEventListener('click', toggle);
    overlay.addEventListener('click', close);

    // Close menu when a nav link is clicked
    var links = nav.querySelectorAll('a');
    for (var j = 0; j < links.length; j++) {
        links[j].addEventListener('click', close);
    }

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') close();
    });
})();

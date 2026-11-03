/* The start page of the MSP Digital Hub, for both sides (2 Nov 2026). Styles in hub-home.css.

   MSPHome.mount(element, {
     side,        'staff' or 'students'
     tools,       the tools of this side from tools.js (id, name, icon, ownNav)
     students,    staff side only: the student tools, shown as small cards
     config,      V3.home in tools.js: the teaching year (periods) and the key dates per side
     studentHub,  staff side only: the address of the student hub
     icon,        MSPShell.icon
     open(id),    opens a tool in the hub
     search(q)    students only: opens the Student FAQ with this question
   })

   Live data, each with a quiet fallback when it cannot be loaded:
   - the Academic Calendar's events (staff): this month's deadlines, the next one, and search;
   - Tutor Registration (staff; the MSP backend, public read): how many groups still need a tutor;
   - the Student FAQ (students): how many answers it holds;
   - announcements from the team console (MSPAnnounce in backend.js).
   Today's date, the week number, the year bar and "in N days" are worked out in the browser. */
(function (global) {
  'use strict';

  var CAL_URL = 'https://msp-operations.github.io/Academic-Calendar/events.json';
  var FAQ_URL = 'https://msp-faqs.nl/content.json';
  var FEEDBACK = 'msp-digital@maastrichtuniversity.nl';
  var STUDY_DESK = 'msp-educationsupport@maastrichtuniversity.nl';   // Education Support: questions about your studies
  var DAY = 864e5;
  var STUDENT_NOTE = { 'faq': 'msp-faqs.nl', 'course-planner': 'Plan your courses', 'btr': 'msp-btr.nl', 'msp-alumni': 'msp-alumni.nl' };
  var STUDENT_ORDER = ['faq', 'course-planner', 'btr', 'msp-alumni'];
  var POPULAR = ['Resits', 'Course registration', 'Thesis (BTR)', 'Going abroad'];
  var KICK = { 'academic-calendar': 'Deadlines', 'tutoring': 'Teaching', 'btr-projects': 'Theses', 'plan-reviews': 'Advising',
               'course-planner': 'Studies', 'faq': 'Answers', 'btr': 'Your thesis', 'msp-alumni': 'After MSP' };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function el(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }
  function startOfDay(d) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
  function parse(s) { var p = String(s).slice(0, 10).split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function iso(d) { return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2); }
  function isoWeek(d) {
    var t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    var n = t.getUTCDay() || 7; t.setUTCDate(t.getUTCDate() + 4 - n);
    var y0 = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
    return Math.ceil(((t - y0) / DAY + 1) / 7);
  }
  function fmt(d, o) { return d.toLocaleDateString('en-GB', o); }
  function label(a, b) {
    if (!b || +a === +b) return fmt(a, { weekday: 'short', day: 'numeric', month: 'short' });
    if (a.getMonth() === b.getMonth()) return a.getDate() + ' &ndash; ' + fmt(b, { day: 'numeric', month: 'short' });
    return fmt(a, { day: 'numeric', month: 'short' }) + ' &ndash; ' + fmt(b, { day: 'numeric', month: 'short' });
  }
  function days(a, today) { return Math.round((a - today) / DAY); }
  function relative(a, b, today) {
    if (a <= today && today <= (b || a)) return 'now';
    var n = days(a, today);
    return n === 1 ? 'tomorrow' : n <= 31 ? 'in ' + n + ' days' : 'in ' + Math.round(n / 7) + ' weeks';
  }

  function mount(root, ctx) {
    if (!root) return;
    var staff = ctx.side === 'staff';
    var today = startOfDay(new Date()), cfg = ctx.config || {}, I = ctx.icon;
    var byId = {}; (ctx.tools || []).forEach(function (t) { byId[t.id] = t; });
    var events = null;

    // ── left: the building, the year bar, the key dates ──
    var periods = (cfg.periods || []).map(function (p) { return { id: p.id, a: parse(p.start), b: parse(p.end) }; });
    var track = '';
    if (periods.length) {
      var y0 = periods[0].a, span = (periods[periods.length - 1].b - y0) / DAY + 1, pct = function (d) { return 100 * ((d - y0) / DAY) / span; };
      periods.forEach(function (p) {
        var cls = p.a <= today && today <= p.b ? 'now' : p.b < today ? 'past' : '';
        track += '<i class="' + cls + '" style="left:' + pct(p.a).toFixed(2) + '%;width:' + (pct(p.b) - pct(p.a) + 100 / span).toFixed(2) + '%"><span>' + esc(p.id) + '</span></i>';
      });
      if (today >= y0 && today <= periods[periods.length - 1].b) track += '<b class="here" style="left:' + pct(today).toFixed(2) + '%"></b>';
    }
    var allDates = ((cfg.keyDates || {})[staff ? 'staff' : 'students'] || []).map(function (k) { return { a: parse(k.start), b: k.end ? parse(k.end) : null, title: k.title, kind: k.kind || '' }; })
      .filter(function (k) { return (k.b || k.a) >= today; })
      .sort(function (x, y) { return x.a - y.a; });
    var list = allDates.slice(0, 5).map(function (k) {
      return '<li class="' + esc(k.kind) + '"><strong>' + label(k.a, k.b) + '</strong><span>' + esc(k.title) + '</span><span class="in">' + relative(k.a, k.b, today) + '</span></li>';
    }).join('');

    var brand = '<img src="msp-ui/msp-emblem-white.png" alt=""><div><b>Maastricht Science Programme</b><small>Faculty of Science and Engineering</small></div>';
    var search = staff
      ? '<div class="sh-search" role="search"><label>' + I('search') + '<input type="search" placeholder="Find a tool, a deadline or a form" aria-label="Find a tool, a deadline or a form" autocomplete="off"><kbd>Ctrl K</kbd></label><div class="sh-res" hidden></div></div>'
      : '<form class="sh-ask" role="search"><label>' + I('search') + '<input type="search" name="q" placeholder="Ask a question: resit, registration, thesis..." aria-label="Search the Student FAQ" autocomplete="off"></label><button type="submit">Search</button></form>' +
        '<div class="sh-pop"><span>Often asked:</span>' + POPULAR.map(function (p) { return '<button type="button">' + esc(p) + '</button>'; }).join('') + '</div>';
    var lower = staff
      ? '<section class="sh-stu" aria-label="Student tools"><div class="sh-sh"><h2>For students</h2><a href="' + esc(ctx.studentHub) + '">Open the student hub &rarr;</a></div><div class="sh-sgrid"></div></section>' +
        '<section class="sh-contact"><h2>Questions or comments?</h2><div class="sh-opts">' +
          '<div class="sh-opt"><small>Any question? Email the team</small><div class="sh-mailrow"><a class="mail" href="mailto:' + FEEDBACK + '">' + FEEDBACK + '</a><button type="button" class="copy" data-copy="' + FEEDBACK + '">Copy</button></div></div>' +
          '<div class="sh-opt"><small>A comment on one of the tools?</small><button type="button" class="go">Write a comment &rarr;</button></div>' +
        '</div></section>'
      : '<section class="sh-contact"><h2>Questions?</h2><div class="sh-opts">' +
          '<div class="sh-opt"><small>About your studies? Email Education Support</small><div class="sh-mailrow"><a class="mail" href="mailto:' + STUDY_DESK + '">' + STUDY_DESK + '</a><button type="button" class="copy" data-copy="' + STUDY_DESK + '">Copy</button></div></div>' +
          '<div class="sh-opt"><small>Something wrong with one of these tools?</small><button type="button" class="go">Tell us &rarr;</button></div>' +
        '</div></section>';

    root.className = 'shp ' + (staff ? 'is-staff' : 'is-students');
    root.innerHTML =
      '<section class="sh-left">' +
        '<div class="sh-ph"></div><video class="sh-vid" muted loop playsinline preload="none" aria-hidden="true" tabindex="-1"></video><div class="sh-shade"></div>' +
        '<div class="sh-brand">' + brand + '</div>' +
        '<div class="sh-mid">' +
          '<h1>MSP Digital Hub</h1>' +
          (track ? '<div class="sh-year" aria-label="The teaching year, periods 1 to 6, with today marked"><div class="sh-track">' + track + '</div></div>' : '') +
          (list ? '<div class="sh-dates"><h2>Key dates</h2><ol>' + list + '</ol></div>' : '') +
          '<div class="sh-inst"><img src="msp-ui/um-wordmark.png" alt="Maastricht University"><span>Paul-Henri Spaaklaan 1, Maastricht' + (staff ? ' &middot; <a href="../inbox/">Team console</a>' : '') + '</span></div>' +
        '</div>' +
      '</section>' +
      '<section class="sh-right">' +
        (staff ? '' : '<div class="sh-phonebar"><img src="msp-ui/msp-emblem-white.png" alt=""><div><b>MSP Digital Hub</b><small>Maastricht Science Programme</small></div></div>') +
        '<div class="sh-dateline"><span class="dnum">' + today.getDate() + '</span>' +
          '<span class="dtext"><b>' + fmt(today, { weekday: 'long' }) + '</b><small>' + fmt(today, { month: 'long', year: 'numeric' }) + '</small></span>' +
          '<span class="rule" aria-hidden="true"></span><span class="wk">Week ' + isoWeek(today) + '</span></div>' +
        '<div class="sh-ann" hidden></div>' +
        search +
        '<nav class="sh-cards" aria-label="' + (staff ? 'Staff tools' : 'Student tools') + '"></nav>' +
        lower +
      '</section>';
    root.hidden = false;
    var $ = function (s) { return root.querySelector(s); };

    // ── the clouds moving over the building: desktop only, not for reduced motion or data saving;
    //    the still photo shows first, the video fades in once it plays and pauses while a tool is open ──
    var vid = $('.sh-vid'), conn = navigator.connection || {};
    var calm = global.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (vid && window.innerWidth > 900 && !calm && !conn.saveData && !/2g/.test(conn.effectiveType || '')) {
      vid.addEventListener('playing', function () { vid.classList.add('on'); }, { once: true });
      vid.src = 'assets/phs-clouds.webm';
      var sync = function () { if (document.body.classList.contains('home') && !document.hidden) { var p = vid.play(); if (p && p.catch) p.catch(function () {}); } else vid.pause(); };
      new MutationObserver(sync).observe(document.body, { attributes: true, attributeFilter: ['class'] });
      document.addEventListener('visibilitychange', sync);
      sync();
    } else if (vid) { vid.remove(); }

    // ── announcements (only shown when the team posted one) ──
    if (global.MSPAnnounce) MSPAnnounce.mount($('.sh-ann'), staff ? 'staff' : 'students');

    // ── the cards ──
    var cards = $('.sh-cards');
    function card(id, cls, inner) {
      var t = byId[id]; if (!t) return null;
      var a = el('<a class="sh-card ' + cls + '" href="#' + esc(id) + '" data-id="' + esc(id) + '">' + inner(t) + '</a>');
      // no icons: a plain category word above the title, and an arrow at the bottom right (2 Nov 2026)
      var ic = a.querySelector('.ic');
      if (ic) { var k = document.createElement('span'); k.className = 'kick'; k.textContent = KICK[id] || ''; ic.parentNode.replaceChild(k, ic); }
      if (cls.indexOf('tall') < 0) a.insertAdjacentHTML('beforeend', '<span class="arr" aria-hidden="true">&rarr;</span>');
      a.addEventListener('click', function (e) { if (e.metaKey || e.ctrlKey || e.shiftKey || e.button) return; e.preventDefault(); go(a, t); });
      // a tool still in development carries (beta) in its name: shown lighter after the title
      var h3 = a.querySelector('h3');
      if (h3 && /\s*\(beta\)$/i.test(h3.textContent)) h3.innerHTML = esc(h3.textContent.replace(/\s*\(beta\)$/i, '')) + ' <span class="beta">(beta)</span>';
      cards.appendChild(a); return a;
    }
    var calCard = null, tutCard = null, faqCard = null;
    if (staff) {
      calCard = card('academic-calendar', 'tall', function (t) {
        return '<div class="ch"><span class="ic">' + I(t.icon) + '</span><span class="tag" hidden></span></div><h3>' + esc(t.name) + '</h3>' +
          '<p class="cal-line">Every operational deadline per office and period.</p><div class="sh-month"></div><div class="end"><span class="cta">Open the calendar &rarr;</span></div>';
      });
      card('project-periods', '', function (t) { return '<span class="mark">P3 &middot; P6</span><div class="end"><h3>' + esc(t.name) + '</h3><p>Offer a P3 or P6 project, or run the allocation.</p></div>'; });
      tutCard = card('tutoring', '', function (t) {
        return '<div class="ch"><span class="ic">' + I(t.icon) + '</span></div><div class="end"><div class="big" hidden></div><h3>' + esc(t.name) + '</h3>' +
          '<p class="tut-line">Claim tutorial groups; the office sees who teaches what.</p><div class="meter" hidden><i></i></div></div>';
      });
      card('btr-projects', 'dots', function (t) { return '<div class="ch"><span class="ic">' + I(t.icon) + '</span></div><div class="end"><h3>' + esc(t.name) + '</h3><p>Offer a Bachelor Thesis Research project.</p></div>'; });
      card('plan-reviews', '', function (t) { return '<div class="ch"><span class="ic">' + I(t.icon) + '</span><span class="tag g">Preview</span></div><div class="end"><h3>' + esc(t.name) + '</h3><p>Approve or comment on the study plans students send.</p></div>'; });
    } else {
      // Course Planner: counts down to the next course registration week (key dates with kind 'reg')
      var reg = allDates.filter(function (k) { return k.kind === 'reg'; })[0];
      var regDays = reg ? days(reg.a, today) : null, regSoon = reg && regDays <= 60;
      var count = !regSoon ? '' : regDays <= 0
        ? '<div class="sh-count"><b>Now</b><span>' + esc(reg.title) + '</span></div>'
        : '<div class="sh-count"><b>' + regDays + (regDays === 1 ? ' day' : ' days') + '</b><span>until ' + esc(reg.title.charAt(0).toLowerCase() + reg.title.slice(1)) + ', ' + fmt(reg.a, { weekday: 'long', day: 'numeric', month: 'long' }) + '</span></div>';
      card('course-planner', 'tall', function (t) {
        return '<div class="ch"><span class="ic">' + I(t.icon) + '</span>' + (regSoon ? '<span class="tag">Registration ' + fmt(reg.a, { day: 'numeric', month: 'short' }) + '</span>' : '') + '</div>' +
          '<h3>' + esc(t.name) + '</h3><p>Build a clash-free schedule and track your credits.</p>' + count +
          '<ol class="sh-steps"><li>Choose your courses and labs</li><li>Check clashes and credits</li><li>Submit the course registration form</li></ol>' +
          '<div class="end"><span class="cta">Plan your courses &rarr;</span></div>';
      });
      // Project Periods: when the next one starts
      var nextPP = periods.filter(function (p) { return (p.id === 'P3' || p.id === 'P6') && p.a > today; })[0];
      card('project-periods', '', function (t) {
        return '<span class="mark">P3 &middot; P6</span><div class="end"><h3>' + esc(t.name) + '</h3><p>' +
          (nextPP ? esc(nextPP.id) + ' starts ' + fmt(nextPP.a, { weekday: 'short', day: 'numeric', month: 'short' }) + '. ' : '') + 'The project catalogue and your preferences.</p></div>';
      });
      faqCard = card('faq', '', function (t) {
        return '<div class="ch"><span class="ic">' + I(t.icon) + '</span></div><div class="end"><div class="big" hidden></div><h3>' + esc(t.name) + '</h3><p>Answers from every office, by topic.</p></div>';
      });
      card('btr', 'dots', function (t) { return '<div class="ch"><span class="ic">' + I(t.icon) + '</span></div><div class="end"><h3>' + esc(t.name) + '</h3><p>Guides, timelines and rubrics for your thesis.</p></div>'; });
      card('msp-alumni', '', function (t) { return '<div class="ch"><span class="ic">' + I(t.icon) + '</span></div><div class="end"><h3>' + esc(t.name) + '</h3><p>Where MSP graduates went next.</p></div>'; });
    }

    // the clicked card grows into the menu bar while the tool opens below it
    var reduce = global.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
    function go(a, t) {
      if (reduce || window.innerWidth <= 900 || !Element.prototype.animate) { ctx.open(t.id); return; }
      var r = a.getBoundingClientRect(), top = document.body.classList.contains('top');
      var to = top ? { w: window.innerWidth, h: 60 } : { w: t.ownNav ? 68 : (window.innerWidth <= 1100 ? 220 : 260), h: window.innerHeight };
      var from = a.classList.contains('tall') ? '#6ED2EC' : '#06294F';
      var g = a.cloneNode(true);
      g.classList.remove('dots'); g.classList.add('sh-ghost'); g.removeAttribute('href');
      g.style.cssText = 'left:' + r.left + 'px;top:' + r.top + 'px;width:' + r.width + 'px;height:' + r.height + 'px;background:' + from;
      document.body.appendChild(g);
      Array.prototype.forEach.call(g.children, function (c) { c.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 180, fill: 'forwards' }); });
      var anim = g.animate([
        { left: r.left + 'px', top: r.top + 'px', width: r.width + 'px', height: r.height + 'px', borderRadius: '2px', backgroundColor: from },
        { left: '0px', top: '0px', width: to.w + 'px', height: to.h + 'px', borderRadius: '0px', backgroundColor: '#011B3C' }
      ], { duration: 560, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'forwards' });
      var done = false, finish = function () { if (done) return; done = true; g.remove(); };
      anim.onfinish = function () { setTimeout(finish, 80); };
      setTimeout(finish, 1200);
      ctx.open(t.id);
    }

    // ── the lower part ──
    var copy = $('.copy');
    if (copy) copy.addEventListener('click', function () {
      var b = this;
      if (navigator.clipboard) navigator.clipboard.writeText(b.dataset.copy).then(function () { b.textContent = 'Copied'; setTimeout(function () { b.textContent = 'Copy'; }, 1500); });
    });
    $('.go').addEventListener('click', function (e) {
      if (!global.MSPFeedback) { location.href = 'mailto:' + FEEDBACK; return; }
      var names = (ctx.tools || []).map(function (t) { return t.name; });
      MSPFeedback.open({ hub: staff ? 'staff' : 'students', tools: staff ? names.concat(['A student tool']) : names, returnFocus: e.currentTarget });
    });


    if (!staff) {
      // ── students: the FAQ search and the often-asked topics ──
      var ask = $('.sh-ask');
      ask.addEventListener('submit', function (e) { e.preventDefault(); ctx.search(ask.q.value.trim()); });
      Array.prototype.forEach.call(root.querySelectorAll('.sh-pop button'), function (b) {
        b.addEventListener('click', function () { ctx.search(b.textContent.replace(/\s*\(.*\)$/, '')); });
      });
      // ── live: how many answers the FAQ holds (only the first bytes of the file are needed) ──
      if (faqCard) fetch(FAQ_URL, { headers: { Range: 'bytes=0-400' } }).then(function (r) { return r.ok ? r.text() : ''; }).then(function (t) {
        var m = /"count"\s*:\s*(\d+)/.exec(t); if (!m) return;
        var big = faqCard.querySelector('.big'); big.innerHTML = m[1] + ' <small>answers</small>'; big.hidden = false;
      }).catch(function () {});
      return;
    }

    // ── staff: the month in the calendar card, deadline days dark, today orange ──
    function drawMonth(counts) {
      var y = today.getFullYear(), m = today.getMonth(), first = new Date(y, m, 1), n = new Date(y, m + 1, 0).getDate();
      var cells = [], lead = (first.getDay() + 6) % 7, i;
      for (i = 0; i < lead; i++) cells.push('<i class="x"></i>');
      for (i = 1; i <= n; i++) {
        var c = (counts || {})[i] || 0;
        cells.push('<i class="' + (i === today.getDate() ? 'today' : c ? (c >= 3 ? 'dl many' : 'dl') : '') + '">' + i + '</i>');
      }
      while (cells.length % 7) cells.push('<i class="x"></i>');
      if (calCard) calCard.querySelector('.sh-month').innerHTML = '<div class="mh"><b>M</b><b>T</b><b>W</b><b>T</b><b>F</b><b>S</b><b>S</b></div><div class="mg">' + cells.join('') + '</div>';
    }
    drawMonth(null);

    // ── staff: the student tools ──
    var sgrid = $('.sh-sgrid'), stu = {};
    (ctx.students || []).forEach(function (t) { stu[t.id] = t; });
    STUDENT_ORDER.forEach(function (id) {
      var t = stu[id]; if (!t) return;
      sgrid.appendChild(el('<a class="sh-sc" href="' + esc(ctx.studentHub + '#' + id) + '"><span class="st2"><b>' + esc(t.name) + '</b><small>' + esc(STUDENT_NOTE[id] || t.hint || '') + '</small></span></a>'));
    });

    // ── live: the Academic Calendar ──
    fetch(CAL_URL).then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); }).then(function (data) {
      events = (Array.isArray(data) ? data : data.events || []).filter(function (e) { return e && e.date && e.title; });
      var ym = iso(today).slice(0, 7), counts = {}, total = 0, todayIso = iso(today), next = null;
      events.forEach(function (e) {
        var d = String(e.date).slice(0, 10);
        if (d.slice(0, 7) === ym) { counts[+d.slice(8, 10)] = (counts[+d.slice(8, 10)] || 0) + 1; total++; }
        if (d > todayIso && (!next || d < next)) next = d;
      });
      drawMonth(counts);
      if (!calCard) return;
      calCard.querySelector('.cal-line').textContent = total + (total === 1 ? ' deadline in ' : ' deadlines in ') + fmt(today, { month: 'long' }) + ', per office and period.';
      if (next) { var tag = calCard.querySelector('.tag'); tag.textContent = 'Next: ' + fmt(parse(next), { day: 'numeric', month: 'short' }); tag.hidden = false; }
    }).catch(function () {});

    // ── live: Tutor Registration (public read of the catalogue, no personal data) ──
    var B = global.MSPBackend && MSPBackend.config;
    if (B && tutCard) {
      var h = { headers: { apikey: B.key, Authorization: 'Bearer ' + B.key } };
      Promise.all([
        fetch(B.url + '/rest/v1/app_settings?select=active_periods', h).then(function (r) { return r.ok ? r.json() : []; }),
        fetch(B.url + '/rest/v1/tutorial_group?select=capacity,claimed_count,is_open,course(period)', h).then(function (r) { return r.ok ? r.json() : []; })
      ]).then(function (res) {
        var period = ((res[0][0] || {}).active_periods || [])[0];
        var groups = (res[1] || []).filter(function (g) { return g.course && g.course.period === period; });
        if (!period || !groups.length) return;
        var open = groups.filter(function (g) { return g.is_open && g.claimed_count < g.capacity; }).length;
        var big = tutCard.querySelector('.big'), line = tutCard.querySelector('.tut-line'), meter = tutCard.querySelector('.meter');
        big.innerHTML = open + ' <small>of ' + groups.length + '</small>'; big.hidden = false;
        line.textContent = open ? period + ' groups that still need a tutor.' : 'All ' + period + ' groups have a tutor.';
        meter.firstChild.style.width = Math.round(100 * (groups.length - open) / groups.length) + '%'; meter.hidden = false;
      }).catch(function () {});
    }

    // ── staff: search across the tools on both sides and the calendar's deadlines ──
    var input = $('.sh-search input'), box = $('.sh-res'), hits = [], sel = 0;
    function index() {
      var items = [];
      (ctx.tools || []).forEach(function (t) { items.push({ kind: 'Staff tool', title: t.name, sub: t.hint || '', text: [t.name, t.hint, t.blurb].join(' '), run: function () { var a = cards.querySelector('[data-id="' + t.id + '"]'); if (a) go(a, t); else ctx.open(t.id); } }); });
      (ctx.students || []).forEach(function (t) { items.push({ kind: 'Student tool', title: t.name, sub: t.hint || '', text: [t.name, t.hint, t.blurb].join(' '), run: function () { location.href = ctx.studentHub + '#' + t.id; } }); });
      var cal = byId['academic-calendar'], openCal = function () { if (cal) { var a = cards.querySelector('[data-id="academic-calendar"]'); if (a) go(a, cal); else ctx.open(cal.id); } };
      var todayIso = iso(today);
      (events || []).forEach(function (e) {
        var d = String(e.date).slice(0, 10); if (d < todayIso) return;
        items.push({ kind: fmt(parse(d), { day: 'numeric', month: 'short', year: parse(d).getFullYear() !== today.getFullYear() ? 'numeric' : undefined }), title: e.title, sub: e.office ? 'Deadline · ' + e.office : 'Deadline', text: [e.title, e.office, e.audience].join(' '), date: d, run: openCal });
      });
      return items;
    }
    function render() {
      var q = input.value.trim().toLowerCase();
      if (!q) { box.hidden = true; return; }
      var words = q.split(/\s+/);
      hits = index().filter(function (it) { var s = it.text.toLowerCase(); return words.every(function (w) { return s.indexOf(w) >= 0; }); })
        .sort(function (a, b) { return (a.date ? 1 : 0) - (b.date ? 1 : 0) || (a.date || '').localeCompare(b.date || ''); }).slice(0, 8);
      sel = 0;
      box.innerHTML = hits.length ? hits.map(function (h, i) {
        return '<button type="button" data-i="' + i + '"' + (i === 0 ? ' class="on"' : '') + '><span><b>' + esc(h.title) + '</b><small>' + esc(h.sub) + '</small></span><em>' + esc(h.kind) + '</em></button>';
      }).join('') : '<div class="none">Nothing found. Try another word, or open the Academic Calendar.</div>';
      box.hidden = false;
    }
    function pick(i) { var h = hits[i]; if (!h) return; box.hidden = true; input.blur(); h.run(); }
    input.addEventListener('input', render);
    input.addEventListener('focus', render);
    input.addEventListener('keydown', function (e) {
      var b = box.querySelectorAll('button');
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        e.preventDefault(); if (!b.length) return;
        b[sel].classList.remove('on'); sel = (sel + (e.key === 'ArrowDown' ? 1 : b.length - 1)) % b.length; b[sel].classList.add('on'); b[sel].scrollIntoView({ block: 'nearest' });
      } else if (e.key === 'Enter') { e.preventDefault(); pick(sel); }
      else if (e.key === 'Escape') { input.value = ''; box.hidden = true; input.blur(); }
    });
    box.addEventListener('mousedown', function (e) { var b = e.target.closest('button'); if (b) { e.preventDefault(); pick(+b.dataset.i); } });
    input.addEventListener('blur', function () { setTimeout(function () { box.hidden = true; }, 120); });
    document.addEventListener('keydown', function (e) {
      if (!document.body.classList.contains('home')) return;
      if ((e.key === 'k' || e.key === 'K') && (e.ctrlKey || e.metaKey)) { e.preventDefault(); input.focus(); }
      else if (e.key === '/' && !/input|textarea|select/i.test((document.activeElement || {}).tagName || '')) { e.preventDefault(); input.focus(); }
    });
  }

  global.MSPHome = { mount: mount };
})(window);

/**
 * CE Alumni Network - Homepage rendering
 *
 * Everything on the homepage that carries a number reads CE_DATA, so the
 * annual update stays a data.js edit and nothing here needs hand-patching.
 *
 * Load order in index.html: data.js -> ce-render.js -> inline map script.
 * This file runs synchronously; every element it writes to is parsed before it.
 *
 * Where this differs from the MSP site, it is because the programme is much
 * younger: 46 graduates over two cohorts rather than 1,527 over thirteen.
 * Ranked lists are short, most universities appear once, and one of the four
 * concentrations has no graduates yet. Those are stated rather than hidden.
 */

(function () {
    'use strict';

    if (typeof CE_DATA === 'undefined') {
        console.error('CE_DATA not loaded. data.js must come before ce-render.js');
        return;
    }

    var D = CE_DATA;
    var fmt = function (n) { return n.toLocaleString('en-US'); };
    var el = function (id) { return document.getElementById(id); };
    var set = function (id, text) { var e = el(id); if (e) e.textContent = text; };

    /* ----------------------------------------------------------------
       1. Map counts
       Natural Earth (world-atlas 110m) names differ from data.js for a
       couple of countries. Only the ones CE actually has are mapped.
       ---------------------------------------------------------------- */
    var ATLAS_NAME = {
        'United States': 'United States of America',
        'Czech Republic': 'Czechia',
        'South Korea': 'South Korea'
    };

    var counts = {};
    var located = 0;
    D.countriesLivingIn.forEach(function (c) {
        counts[ATLAS_NAME[c.name] || c.name] = c.count;
        located += c.count;
    });
    window.CE_MAP_COUNTS = counts;

    /* ----------------------------------------------------------------
       2. Headline figures
       ---------------------------------------------------------------- */
    var S = D.summary;
    // Destinations, concentrations, gender and employment are only known for the
    // classes that have returned a graduation form. Denominators for those sections
    // come from profiledAlumni, never from the headline total.
    var profiled = S.profiledAlumni || S.totalAlumni;
    var profiledScope = S.profiledAlumni && S.profiledAlumni !== S.totalAlumni
        ? ' of the 2024 and 2025 classes' : '';
    set('hero-total', fmt(S.totalAlumni));
    set('stat-alumni', fmt(S.totalAlumni));
    set('stat-nationalities', fmt(S.nationalities));
    set('stat-countries', fmt(S.countriesLivingIn));
    set('stat-unis', fmt(S.universitiesAttended));
    set('world-count', fmt(S.countriesLivingIn));
    set('uni-total', fmt(S.universitiesAttended));

    var years = (D.graduationByYear || []).slice().sort(function (a, b) { return a.year - b.year; });
    if (years.length) {
        set('hero-cohorts', years.length === 1
            ? 'One cohort so far, graduating in ' + years[0].year + '.'
            : years.length + ' cohorts so far, ' + years[0].year + ' to ' + years[years.length - 1].year + '.');
    }

    /* ----------------------------------------------------------------
       3. Map legend
       "Elsewhere" is the located total minus the Netherlands, not the
       headline total: location is known for `located` of the graduates.
       ---------------------------------------------------------------- */
    var nl = D.countriesLivingIn.filter(function (c) { return c.code === 'nl'; })[0];
    var nlCount = nl ? nl.count : 0;
    set('legend-nl', nlCount + ' in the Netherlands');
    set('legend-rest', (located - nlCount) + ' elsewhere, in ' +
        (S.countriesLivingIn - (nlCount ? 1 : 0)) + ' countries');

    /* ----------------------------------------------------------------
       4. Alumni stories
       ---------------------------------------------------------------- */
    var storyWrap = el('story-list');
    if (storyWrap && D.studentStories) {
        storyWrap.innerHTML = D.studentStories.map(function (s) {
            var place = s.location ? (s.location.city + ', ' + s.location.country) : '';
            var now = [s.currentStatus, s.university].filter(Boolean).join(' &middot; ');

            // Not every record has every answer, so each row is optional.
            var detail = [
                row('Why Circular Engineering', s.whyCircularEngineering),
                row('Thesis', s.thesisTitle),
                row('Favourite courses at CE', s.favoriteCoursesAtCE)
            ].filter(Boolean).join('');

            return '' +
                '<article class="alum">' +
                  (s.photo ? '<div class="alum-photo"><img src="' + esc(s.photo) + '" alt="' + esc(s.name) +
                             '" loading="lazy" onerror="this.closest(\'.alum-photo\').remove()" /></div>' : '') +
                  '<div class="alum-body">' +
                    '<span class="chip" style="background:' + hexToSoft(s.concentrationColor) + '">' +
                      esc(s.concentration || '') + '</span>' +
                    '<div>' +
                      '<div class="alum-name">' + esc(s.name) + '</div>' +
                      '<div class="alum-now">' + now + (place ? ' &middot; ' + esc(place) : '') +
                        (s.graduated ? ' &middot; class of ' + s.graduated : '') + '</div>' +
                    '</div>' +
                    '<p class="alum-quote">&ldquo;' + esc(cleanQuote(s.quote)) + '&rdquo;</p>' +
                    (detail ? '<div class="alum-dl">' + detail + '</div>' : '') +
                    (s.testimonialUrl
                      ? '<a class="alum-link" href="' + esc(s.testimonialUrl) + '" target="_blank" rel="noopener">Read the full testimonial &rarr;</a>'
                      : '') +
                  '</div>' +
                '</article>';
        }).join('');
    }

    function row(label, value) {
        if (!value) return '';
        return '<div><div class="alum-dt">' + label + '</div>' +
               '<div class="alum-dd">' + esc(value) + '</div></div>';
    }

    /* ----------------------------------------------------------------
       5. Concentrations
       One track currently has no graduates. It still belongs on the page,
       so the card says so rather than showing an empty bar.
       ---------------------------------------------------------------- */
    var concWrap = el('conc-list');
    if (concWrap && D.concentrations) {
        var withGrads = D.concentrations.filter(function (c) { return c.count > 0; });
        concWrap.innerHTML = D.concentrations.map(function (c) {
            var body = c.count > 0
                ? '<span class="conc-count"><span class="conc-num">' + c.count + '</span>' +
                  '<span class="conc-share">' + c.percentage + '% of graduates</span></span>'
                : '<span class="conc-empty">No graduates yet</span>';
            return '' +
                '<div class="conc">' +
                  '<span class="conc-dot" style="background:' + esc(c.color || '#10B981') + '"></span>' +
                  '<span class="conc-name">' + esc(c.name) + '</span>' +
                  body +
                  '<p class="conc-desc">' + esc(c.description || '') + '</p>' +
                '</div>';
        }).join('');

        set('conc-lead', 'Every CE student picks one of four concentrations. ' +
            cap(numWord(withGrads.length)) + ' of the four have produced graduates so far; the programme is young enough that the fourth has not yet.' +
            (profiledScope ? ' The counts cover the ' + profiled + ' graduates' + profiledScope + '.' : ''));
    }

    /* ----------------------------------------------------------------
       5b. Where each track leads
       Which master's programmes each concentration fed into. Only tracks
       with graduates appear, so the empty concentration is not shown here.
       ---------------------------------------------------------------- */
    var trackWrap = el('track-list');
    if (trackWrap && D.concentrationPathways) {
        var tracks = Object.keys(D.concentrationPathways);
        // logo file per university, from the same list the destinations section uses
        var logoOf = {};
        (D.topUniversities || []).forEach(function (u) { if (u.logo) logoOf[u.name] = u.logo; });
        trackWrap.innerHTML = tracks.map(function (name) {
            var t = D.concentrationPathways[name];
            if (!t || !t.total) return '';
            var unis = (t.universities || []).slice(0, 4).map(function (u) {
                return '<div class="track-uni">' +
                         (logoOf[u.name]
                           ? '<img class="track-logo" src="assets/logos/' + esc(logoOf[u.name]) + '" alt="" aria-hidden="true">' : '') +
                         '<span class="track-uni-name">' + esc(u.name) + (u.count > 1 ? ' &middot; ' + u.count : '') + '</span>' +
                         (u.programmes && u.programmes.length
                           ? '<span class="track-progs">' + esc(u.programmes.join(', ')) + '</span>' : '') +
                       '</div>';
            }).join('');
            return '' +
                '<div class="track-card">' +
                  '<div class="track-head">' +
                    '<span class="conc-dot" style="background:' + esc(t.color || '#10B981') + '"></span>' +
                    '<span class="track-name">' + esc(name) + '</span>' +
                  '</div>' +
                  '<span class="track-meta">' + t.total + ' graduates continued to a master’s' +
                    (t.percentOfTrack ? ', ' + t.percentOfTrack + '% of the track' : '') + '</span>' +
                  unis +
                '</div>';
        }).join('');
    }

    /* ----------------------------------------------------------------
       5c. Regional impact
       CE is a Euregio programme, so where graduates stay matters to the
       faculty as much as where they scatter.
       ---------------------------------------------------------------- */
    var R = D.regionalData;
    if (R && el('region-list')) {
        var cards = [
            ['stayInMaastricht', 'still in Maastricht'],
            ['limburgImpact', 'working or studying in Limburg'],
            ['euregioImpact', 'active in the Euregio Meuse-Rhine'],
            ['stayInNetherlands', 'still in the Netherlands']
        ];
        el('region-list').innerHTML = cards.map(function (c) {
            var n = R[c[0]], p = R[c[0] + 'Percent'];
            if (n == null) return '';
            return '<div class="region-card">' +
                     '<span class="region-num">' + n + '</span>' +
                     (p != null ? '<span class="region-pct">' + p + '%</span>' : '') +
                     '<div class="region-label">' + c[1] + '</div>' +
                   '</div>';
        }).join('');

        if (el('region-lead') && R.euregioOrigin != null) {
            set('region-lead', R.euregioOrigin + ' of the ' + profiled +
                ' graduates' + profiledScope + ' came from the Euregio Meuse-Rhine to begin with, ' +
                R.euregioOriginPercent + '%. Of everyone who has graduated, ' +
                R.euregioImpact + ' are still working or studying in the region.');
        }
    }

    if (el('city-list') && D.topCities) {
        el('city-list').innerHTML = D.topCities.map(function (c) {
            return '<span class="city-chip">' + esc(c.name) + '<b>' + c.count + '</b></span>';
        }).join('');
    }

    /* ----------------------------------------------------------------
       6. Countries
       ---------------------------------------------------------------- */
    var ranked = D.countriesLivingIn.slice().sort(function (a, b) { return b.count - a.count; });
    var countryWrap = el('country-list');
    if (countryWrap && ranked.length) {
        var countryMax = ranked[0].count;
        countryWrap.innerHTML = ranked.map(function (c, i) {
            var band = i === 0 ? 'bar-navy' : (i < 5 ? 'bar-blue' : 'bar-orange');
            return '' +
                '<div class="row">' +
                  flagImg(c.code) +
                  '<span class="row-name">' + esc(c.name) + '</span>' +
                  '<span class="track row-track"><span class="fill ' + band + '" style="width: ' +
                      Math.max(3, Math.round((c.count / countryMax) * 100)) + '%"></span></span>' +
                  '<span class="row-num">' + c.count + '</span>' +
                '</div>';
        }).join('');
    }

    var big = ranked[0];
    if (big) {
        set('world-lead', big.name + ' holds ' + big.count + ' of the ' + located +
            ' graduates whose location we know, ' + Math.round((big.count / located) * 100) +
            '%. The rest are spread across ' + (ranked.length - 1) + ' more countries.');
    }
    set('country-note', 'Every country with a CE graduate is listed.');

    /* ----------------------------------------------------------------
       7. Universities
       Counts run 3, 2 and 1. Showing a ranked top ten of mostly ones is
       noise, so only the universities with more than one graduate get a
       row and the single-graduate tail is summarised.
       ---------------------------------------------------------------- */
    var uniWrap = el('uni-list');
    if (uniWrap && D.topUniversities) {
        var unis = D.topUniversities.slice().sort(function (a, b) { return b.count - a.count; });
        var repeated = unis.filter(function (u) { return u.count > 1; });
        var singles = unis.length - repeated.length;
        var uniMax = repeated.length ? repeated[0].count : 1;

        uniWrap.innerHTML = repeated.map(function (u, i) {
            return '' +
                '<div class="uni">' +
                  '<span class="uni-rank">' + String(i + 1).padStart(2, '0') + '</span>' +
                  '<span class="uni-logo">' + uniLogo(u) + '</span>' +
                  '<span class="uni-main">' +
                    '<span class="uni-name">' + esc(u.name) + '</span>' +
                    '<span class="uni-country">' + esc(u.country || '') + '</span>' +
                  '</span>' +
                  '<span class="track track-lg"><span class="fill bar-navy" style="width: ' +
                      Math.round((u.count / uniMax) * 100) + '%"></span></span>' +
                  '<span class="uni-num">' + u.count + '</span>' +
                '</div>';
        }).join('');

        set('uni-note', singles > 0
            ? 'Plus ' + singles + ' more universities with one CE graduate each.'
            : '');
    }

    /* ----------------------------------------------------------------
       8. Studying vs working, and the cohorts
       ---------------------------------------------------------------- */
    var emp = D.employment;
    if (emp && el('status-bar')) {
        var total = emp.studying + emp.working;
        el('status-bar').innerHTML =
            '<span style="width:' + (emp.studying / total * 100) + '%;background:var(--blue)"></span>' +
            '<span style="width:' + (emp.working / total * 100) + '%;background:var(--accent)"></span>';
        el('status-key').innerHTML =
            '<span><span class="split-swatch" style="background:var(--blue)"></span>' + emp.studying + ' studying</span>' +
            '<span><span class="split-swatch" style="background:var(--accent)"></span>' + emp.working + ' working</span>';
        set('status-title', emp.studying > emp.working
            ? 'Most are still studying.'
            : 'Most are already working.');
        set('status-note', 'Of the ' + total + ' graduates' + profiledScope + ', ' +
            Math.round(emp.studying / total * 100) + '% are in a master’s or doctorate and ' +
            Math.round(emp.working / total * 100) + '% are in work. ' +
            (profiledScope ? 'The class of 2026 graduated this summer; we are collecting where they went.' : ''));
    }

    if (el('cohort-list') && years.length) {
        el('cohort-list').innerHTML = years.map(function (y) {
            return '<div><div class="cohort-num">' + y.count + '</div>' +
                   '<div class="cohort-label">Class of ' + y.year + '</div></div>';
        }).join('');
    }

    /* ----------------------------------------------------------------
       9. Footer data line
       ---------------------------------------------------------------- */
    set('data-note', (D.lastUpdated ? 'Data current as of ' + D.lastUpdated + '. ' : '') +
        fmt(S.totalAlumni) + ' records.');

    /* ---- helpers ---- */

    function cap(w) { return w.charAt(0).toUpperCase() + w.slice(1); }

    function numWord(n) {
        return ['zero','one','two','three','four'][n] || String(n);
    }

    function esc(s) {
        return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
        });
    }

    // Concentration colours as a soft chip background.
    function hexToSoft(hex) {
        if (!/^#[0-9a-f]{6}$/i.test(hex || "")) return "rgba(0, 28, 61, 0.06)";
        var r = parseInt(hex.slice(1,3),16), g = parseInt(hex.slice(3,5),16), b = parseInt(hex.slice(5,7),16);
        return "rgba(" + r + ", " + g + ", " + b + ", 0.13)";
    }

    // Quotes carry their own surrounding punctuation in data.js.
    function cleanQuote(q) {
        return String(q || "").replace(/^["201c]|["201d]$/g, "").trim();
    }

    // Quotes in data.js run long; the card holds roughly this much.
    function trimQuote(q) {
        if (!q) return '';
        q = String(q).replace(/^["“]|["”]$/g, '').trim();
        if (q.length <= 150) return q;
        var cut = q.slice(0, 150);
        var stop = Math.max(cut.lastIndexOf('. '), cut.lastIndexOf(', '), cut.lastIndexOf(' '));
        return cut.slice(0, stop > 80 ? stop : 150).replace(/[,.]$/, '') + '…';
    }

    // Flags from flagcdn, decorative only, so the country name carries meaning.
    function flagImg(code) {
        if (!code) return '';
        return '<img class="row-flag" src="https://flagcdn.com/w160/' + esc(code.toLowerCase()) +
               '.png" alt="" aria-hidden="true" loading="lazy" onerror="this.remove()" />';
    }

    // Logos are local files. A missing file removes only the image.
    function uniLogo(u) {
        if (!u.logo) return '';
        return '<img src="assets/logos/' + esc(u.logo) + '" alt="" aria-hidden="true" ' +
               'loading="lazy" onerror="this.remove()" />';
    }
})();

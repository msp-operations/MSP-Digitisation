/**
 * MSP Alumni Network - Homepage rendering
 *
 * The homepage figures that data-bind.js does not cover: the hero map counts,
 * the map legend, the university ranking, the field breakdown and the growth
 * chart. Everything here reads MSP_DATA, so the annual update stays a data.js
 * edit and nothing on the homepage needs hand-patching.
 *
 * Load order in index.html: data.js -> data-bind.js -> home-render.js -> inline map script.
 * This file runs synchronously; every element it writes to is parsed before it.
 */

(function () {
    'use strict';

    if (typeof MSP_DATA === 'undefined') {
        console.error('MSP_DATA not loaded. data.js must come before home-render.js');
        return;
    }

    var fmt = function (n) { return n.toLocaleString('en-US'); };
    var el = function (id) { return document.getElementById(id); };

    /* ----------------------------------------------------------------
       1. Map counts
       Natural Earth (world-atlas 110m) uses its own country names. Only
       these two differ from the names in data.js. Sint Maarten and Hong
       Kong have no separate admin-0 feature in the 110m atlas, so they
       carry no dot; they are still counted in the totals below.
       ---------------------------------------------------------------- */
    var ATLAS_NAME = {
        'United States': 'United States of America',
        'Czech Republic': 'Czechia'
    };

    var counts = {};
    var located = 0;
    MSP_DATA.countriesLiving.forEach(function (c) {
        counts[ATLAS_NAME[c.name] || c.name] = c.count;
        located += c.count;
    });
    window.MSP_MAP_COUNTS = counts;

    /* ----------------------------------------------------------------
       2. Map legend
       "Elsewhere" is the located total minus the Netherlands, not the
       headline total: location is known for `located` of the alumni, not
       all of them. Stating it the other way overstates the map.
       ---------------------------------------------------------------- */
    var nl = MSP_DATA.countriesLiving.find(function (c) { return c.code === 'nl'; });
    var nlCount = nl ? nl.count : 0;
    var otherCountries = MSP_DATA.summary.countriesLivingIn - (nlCount ? 1 : 0);

    if (el('legend-nl')) {
        el('legend-nl').textContent = fmt(nlCount) + ' in the Netherlands';
    }
    if (el('legend-rest')) {
        el('legend-rest').textContent = fmt(located - nlCount) + ' elsewhere, in ' + otherCountries + ' countries';
    }
    if (el('map-coverage')) {
        el('map-coverage').textContent =
            'Current location known for ' + fmt(located) + ' alumni.';
    }

    /* ----------------------------------------------------------------
       3. Country ranking (top 18, as in the original layout)
       data.js does not keep countriesLiving strictly sorted, so sort here.
       ---------------------------------------------------------------- */
    var TOP_COUNTRIES = 18;
    var ranked = MSP_DATA.countriesLiving.slice().sort(function (a, b) { return b.count - a.count; });
    var shown = ranked.slice(0, TOP_COUNTRIES);

    var countryWrap = el('country-list');
    if (countryWrap && shown.length) {
        var countryMax = shown[0].count;
        countryWrap.innerHTML = shown.map(function (c, i) {
            var band = i < 4 ? 'bar-navy' : (i < 11 ? 'bar-blue' : 'bar-orange');
            return '' +
                '<div class="row">' +
                  flagImg(c.code) +
                  '<span class="row-name">' + esc(c.name) + '</span>' +
                  '<span class="track row-track"><span class="fill ' + band + '" style="width: ' +
                      Math.max(1, Math.round((c.count / countryMax) * 100)) + '%"></span></span>' +
                  '<span class="row-num">' + fmt(c.count) + '</span>' +
                '</div>';
        }).join('');
    }

    if (el('country-note')) {
        var rest = ranked.length - shown.length;
        // Take the cap from the first country NOT shown, so a tie on the
        // boundary can never make the sentence false.
        var cap = rest > 0 ? ranked[shown.length].count : 0;
        el('country-note').textContent = rest > 0
            ? 'Plus ' + rest + ' countries with ' + numWord(cap) + ' or fewer alumni each.'
            : '';
    }

    if (el('world-lead')) {
        var big4 = ranked.slice(0, 4);
        var big4Sum = big4.reduce(function (s, c) { return s + c.count; }, 0);
        el('world-lead').textContent =
            Math.round((big4Sum / located) * 100) + '% of alumni with a known address are in ' +
            listOf(big4.map(function (c) { return article(c.name); })) + '. The rest are spread across ' +
            (MSP_DATA.summary.countriesLivingIn - 4) + ' more countries.';
    }

    /* ----------------------------------------------------------------
       4. University ranking (top 10)
       ---------------------------------------------------------------- */
    var uniWrap = el('uni-list');
    if (uniWrap) {
        var unis = MSP_DATA.topUniversities.slice(0, 10);
        var uniMax = unis[0] ? unis[0].count : 1;
        uniWrap.innerHTML = unis.map(function (u, i) {
            var pct = Math.round((u.count / uniMax) * 100);
            return '' +
                '<div class="uni">' +
                  '<span class="uni-rank">' + String(i + 1).padStart(2, '0') + '</span>' +
                  '<span class="uni-logo">' + uniLogo(u) + '</span>' +
                  '<span class="uni-main">' +
                    '<span class="uni-name">' + esc(u.name) + '</span>' +
                    '<span class="uni-country">' + esc(u.country) + '</span>' +
                  '</span>' +
                  '<span class="track track-lg"><span class="fill bar-navy" style="width: ' + pct + '%"></span></span>' +
                  '<span class="uni-num">' + fmt(u.count) + '</span>' +
                '</div>';
        }).join('');
    }

    /* ----------------------------------------------------------------
       5. Fields of study (top 8, excluding the "Other" bucket)
       Percentages in data.js are a share of alumni with a recorded
       master's, not of all alumni, so the intro says which.
       ---------------------------------------------------------------- */
    var fieldWrap = el('field-list');
    if (fieldWrap) {
        var named = MSP_DATA.fieldsOfStudy.filter(function (f) { return f.name !== 'Other'; });
        var fields = named.slice(0, 8);
        var fieldMax = fields[0] ? fields[0].count : 1;
        var tone = function (i) { return i === 0 ? 'bar-navy' : (i < 4 ? 'bar-blue' : 'bar-orange'); };

        fieldWrap.innerHTML = fields.map(function (f, i) {
            var pct = Math.round((f.count / fieldMax) * 100);
            return '' +
                '<div class="field">' +
                  '<div class="field-head">' +
                    '<span class="field-name">' + esc(f.name) + '</span>' +
                    '<span class="field-val">' + fmt(f.count) + ' &middot; ' + f.percent + '%</span>' +
                  '</div>' +
                  '<span class="track track-full"><span class="fill ' + tone(i) + '" style="width: ' + pct + '%"></span></span>' +
                '</div>';
        }).join('');
    }

    var degreeTotal = MSP_DATA.fieldsOfStudy.reduce(function (s, f) { return s + f.count; }, 0);
    if (el('field-note')) {
        el('field-note').textContent =
            'Share of recorded master’s degrees by field, across the ' + fmt(degreeTotal) +
            ' alumni whose next degree we know. The long tail — computer science, policy, ' +
            'economics — is what an interdisciplinary bachelor makes possible.';
    }

    /* ----------------------------------------------------------------
       6. Growth chart
       The final year is a partial year whenever data.js was last updated
       inside that same year before December.
       ---------------------------------------------------------------- */
    var years = MSP_DATA.graduationByYear;
    var chart = el('growth-chart');
    if (chart && years.length) {
        var peak = years.reduce(function (m, y) { return Math.max(m, y.count); }, 0);
        var lastYear = years[years.length - 1].year;
        var partial = isPartialYear(lastYear, MSP_DATA.lastUpdated);

        chart.innerHTML = years.map(function (y, i) {
            var isLast = i === years.length - 1;
            var hatched = isLast && partial;
            return '' +
                '<div class="bar-col">' +
                  '<span class="bar-num">' + fmt(y.count) + '</span>' +
                  '<span class="bar' + (hatched ? ' bar-partial' : '') + '" style="height: ' +
                      Math.round((y.count / peak) * 100) + '%"></span>' +
                  '<span class="bar-year">’' + String(y.year).slice(2) + '</span>' +
                '</div>';
        }).join('');

        if (el('growth-title')) {
            el('growth-title').textContent =
                'From ' + fmt(years[0].count) + ' graduates to ' + fmt(peak) + ' a year.';
        }
        if (el('growth-note')) {
            el('growth-note').textContent = partial
                ? 'Graduates per academic year. The ' + lastYear + ' bar covers graduations through ' +
                  monthOf(MSP_DATA.lastUpdated) + ' only — it is not a full year.'
                : 'Graduates per academic year, first cohort to most recent.';
        }
        if (el('legend-partial')) {
            el('legend-partial').textContent = partial
                ? lastYear + ' so far — partial year'
                : 'Most recent full year';
            el('legend-partial').parentNode.hidden = !partial;
        }
    }

    /* ----------------------------------------------------------------
       7. Footer data line
       ---------------------------------------------------------------- */
    if (el('data-note')) {
        el('data-note').textContent =
            'Data current as of ' + MSP_DATA.lastUpdated + '.';
    }

    /* ---- helpers ---- */

    function esc(s) {
        return String(s).replace(/[&<>"]/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
        });
    }

    // Flags come from flagcdn, the same source the rest of the site already
    // uses. Decorative only, so it is aria-hidden and the name carries meaning.
    function flagImg(code) {
        if (!code) return '';
        return '<img class="row-flag" src="https://flagcdn.com/w160/' + esc(code.toLowerCase()) +
               '.png" alt="" aria-hidden="true" loading="lazy" onerror="this.remove()" />';
    }

    // Logos are local files in assets/logos. A missing file removes just the
    // image, leaving the row intact rather than showing a broken-image icon.
    function uniLogo(u) {
        if (!u.logo) return '';
        return '<img src="assets/logos/' + esc(u.logo) + '" alt="" aria-hidden="true" ' +
               'loading="lazy" onerror="this.remove()" />';
    }

    function article(name) {
        // Country names that read wrong without a definite article in running prose.
        var needsThe = ['Netherlands', 'United Kingdom', 'United States', 'Philippines',
                        'United Arab Emirates', 'Czech Republic'];
        return needsThe.indexOf(name) > -1 ? 'the ' + name : name;
    }

    function numWord(n) {
        var words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven',
                     'eight', 'nine', 'ten', 'eleven', 'twelve'];
        return words[n] || fmt(n);
    }

    function listOf(names) {
        if (names.length < 2) return names[0] || '';
        return names.slice(0, -1).join(', ') + ' or ' + names[names.length - 1];
    }

    function monthOf(lastUpdated) {
        return String(lastUpdated || '').split(' ')[0] || 'the latest update';
    }

    function isPartialYear(year, lastUpdated) {
        var parts = String(lastUpdated || '').split(' ');
        var month = parts[0];
        var updatedYear = parseInt(parts[1], 10);
        if (!month || isNaN(updatedYear)) return false;
        return updatedYear === year && month.toLowerCase() !== 'december';
    }
})();

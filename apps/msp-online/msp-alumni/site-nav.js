/**
 * MSP Alumni Network - the shared frame config
 *
 * One navigation set for all eight pages. Each page loads
 * assets/msp-ui/msp-shell.js and then this file at the end of <body>.
 * A page can override anything by setting window.MSP_SHELL_OPTS before
 * this script runs (country.html uses it to mark Destinations active).
 */
(function () {
  'use strict';

  var cfg = {
    title: 'MSP Alumni Network',
    nav: [
      { label: 'Home',            href: 'index.html',           icon: 'home' },
      { label: 'Destinations',    href: 'destinations.html',    icon: 'globe' },
      { label: 'Stories',         href: 'stories.html',         icon: 'star' },
      { label: 'Community',       href: 'community.html',       icon: 'users' },
      { label: 'Events',          href: 'events.html',          icon: 'calendar' },
      { divider: true },
      { label: 'Considering MSP?', hint: 'For prospective students', href: 'considering-msp.html', icon: 'gradcap' },
      { label: 'Privacy',         href: 'privacy.html',         icon: 'shield' }
    ],
    // From privacy.html: what the public site shows.
    footer: 'Aggregated, anonymized statistics only. Individual alumni information is never displayed publicly without explicit consent.'
  };

  var opts = window.MSP_SHELL_OPTS || {};
  Object.keys(opts).forEach(function (k) { cfg[k] = opts[k]; });

  if (!window.MSPShell) {
    console.error('site-nav.js: load assets/msp-ui/msp-shell.js first');
    return;
  }
  window.MSPShell.init(cfg);

  // MSPShell.init defers to DOMContentLoaded while the page is still parsing.
  // This listener is registered right after it, so it runs once the frame is
  // in place; pages that measure layout (the Leaflet maps) wait for it.
  function framed() { document.dispatchEvent(new CustomEvent('msp:frame')); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', framed);
  else framed();
})();

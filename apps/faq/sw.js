// MSP FAQ service worker: offline support and auto-updating content.
// Strategy: stale-while-revalidate for everything (GET). The shell loads
// instantly from cache; content.json refreshes in the background so an edit
// you push shows up on the student's next visit without any re-download.
//
// WHAT THIS MEANS IN PRACTICE
// A student always sees the cached copy first and the fresh copy from the
// second visit after a deploy. That is deliberate: it is what makes the app
// open instantly and work with no signal.
//
// WHEN TO BUMP THE CACHE NAME BELOW
// Only when a file in CORE is added, removed or renamed, or when you need to
// force everyone off an old copy immediately. A bump throws away every cached
// file and re-downloads the lot (a few MB, mostly the PDF reader), so it is not
// something to do on every content edit. Content edits need no bump at all.

const CACHE = 'msp-faq-v28';
// Everything the app needs to run with no connection. Anything not listed is
// still cached the first time it is fetched, it just is not pre-loaded.
const CORE = ['./', 'index.html', 'content.json', 'degree-data.json', 'manifest.webmanifest', 'icon.svg',
  'assets/msp-faq.png', 'assets/um-logo.png', 'assets/building.jpg',
  // vendored (no CDNs): fonts, search, and the on-demand PDF reader
  'assets/vendor/fonts.css', 'assets/vendor/minisearch.min.js',
  'assets/vendor/pdf.min.js', 'assets/vendor/pdf.worker.min.js',
  'assets/vendor/inter-400-latin.woff2', 'assets/vendor/inter-400-latin-ext.woff2',
  'assets/vendor/sourceserif4-400-latin.woff2', 'assets/vendor/sourceserif4-400-latin-ext.woff2',
  'assets/vendor/sourceserif4-600-latin.woff2', 'assets/vendor/sourceserif4-600-latin-ext.woff2'];

// Install: pre-load CORE, then take over straight away rather than waiting for
// every open tab to close.
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

// Activate: delete every cache that is not the current CACHE name. This is the
// only thing that clears old files, which is why the name has a version in it.
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Fetch: answer from the cache when there is something there, and refresh that
// entry from the network in the background. If the network fails, the cached
// copy is what the student gets, which is the whole offline story.
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(e.request);
      const network = fetch(e.request).then(res => {
        if (res && (res.ok || res.type === 'opaque')) cache.put(e.request, res.clone());
        return res;
      }).catch(() => cached);
      return cached || network;
    })
  );
});

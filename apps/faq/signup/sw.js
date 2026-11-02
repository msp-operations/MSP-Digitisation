// MSP sign-up page service worker (msp-faqs.nl/signup/, 29 Oct 2026).
// Keeps the page and the faculty video on the iPad, so a wifi dropout at the open day changes nothing.
// Scope is /signup/ only: the FAQ's own service worker (/sw.js) is not involved here.
// Sign-ups never pass through this file: they stay in the browser storage of the iPad.
//
// Bump CACHE whenever index.html or the video changes, so iPads drop the old copy on their next visit.

const CACHE = 'msp-signup-v2';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'icon-512.png', 'fse-video.mp4'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('msp-signup-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Safari asks for video in byte ranges; a cached file has to be cut to the range asked for, or it will not play offline.
async function videoResponse(request) {
  const cache = await caches.open(CACHE);
  let full = await cache.match('fse-video.mp4', { ignoreSearch: true });
  if (!full) {
    try { full = await fetch(new URL('fse-video.mp4', self.registration.scope)); if (full.ok) cache.put('fse-video.mp4', full.clone()); }
    catch (err) { return fetch(request); }
  }
  const range = request.headers.get('range');
  if (!range) return full;
  const blob = await full.blob(), size = blob.size;
  const m = /bytes=(\d*)-(\d*)/.exec(range) || [];
  let start = m[1] ? parseInt(m[1], 10) : 0, end = m[2] ? parseInt(m[2], 10) : size - 1;
  if (!m[1] && m[2]) { start = size - parseInt(m[2], 10); end = size - 1; }    // suffix range: last N bytes
  end = Math.min(end, size - 1);
  return new Response(blob.slice(start, end + 1), { status: 206, statusText: 'Partial Content', headers: {
    'Content-Type': 'video/mp4', 'Content-Length': String(end - start + 1),
    'Content-Range': `bytes ${start}-${end}/${size}`, 'Accept-Ranges': 'bytes' } });
}

// Everything else: answer from the cache at once and refresh it in the background (the FAQ does the same).
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;
  if (url.pathname.endsWith('/fse-video.mp4')) { e.respondWith(videoResponse(e.request)); return; }
  e.respondWith(
    caches.open(CACHE).then(async cache => {
      const cached = await cache.match(e.request, { ignoreSearch: true });
      const network = fetch(e.request).then(res => { if (res && res.ok) cache.put(e.request, res.clone()); return res; }).catch(() => cached);
      return cached || network;
    })
  );
});

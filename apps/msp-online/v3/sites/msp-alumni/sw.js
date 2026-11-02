const CACHE_NAME = 'msp-alumni-v6';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/destinations.html',
  '/community.html',
  '/events.html',
  '/stories.html',
  '/considering-msp.html',
  '/privacy.html',
  '/country.html',
  '/data.js',
  '/data-bind.js',
  '/programmes.js',
  '/assets/logos/msp-logo.png',
  '/assets/logos/maastricht-science-programme-logo.png',
  '/assets/logos/msp-logo-white.png',
  '/assets/icons/icon-192x192.png',
  '/assets/icons/icon-512x512.png'
];

// Install — cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS_TO_CACHE))
      .then(() => self.skipWaiting())
  );
});

// Activate — clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Fetch — network first, fall back to cache
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    fetch(event.request)
      .then(response => {
        // Cache successful responses
        if (response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

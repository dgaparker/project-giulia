const CACHE = 'giulia-v4';
const ASSETS = [
  '/project-giulia/',
  '/project-giulia/index.html',
  '/project-giulia/manifest.json',
  '/project-giulia/assets/IMG_0083.PNG',
  '/project-giulia/assets/IMG_0365.jpeg',
  '/project-giulia/assets/Squadra pic.png',
  '/project-giulia/assets/Squadra pic 2.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

// Network first: always fetch fresh content, fall back to cache when offline
self.addEventListener('fetch', e => {
  e.respondWith(
    fetch(e.request)
      .then(response => {
        var clone = response.clone();
        caches.open(CACHE).then(c => c.put(e.request, clone));
        return response;
      })
      .catch(() => caches.match(e.request))
  );
});

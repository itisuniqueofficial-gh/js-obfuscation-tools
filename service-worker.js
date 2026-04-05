const CACHE_NAME = 'js-obfuscation-tools-v1';
const BASE_PATH = self.location.pathname.replace(/\/service-worker\.js$/, '');
const ASSETS = [
  BASE_PATH + '/',
  BASE_PATH + '/deobfuscator/',
  BASE_PATH + '/assets/css/main.css',
  BASE_PATH + '/assets/js/main.js',
  BASE_PATH + '/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }

        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
        return response;
      });
    })
  );
});

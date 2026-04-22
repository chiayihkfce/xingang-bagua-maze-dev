// Updated Service Worker for Hsinkang Bagua Maze
// Optimized for stability and PWA installability

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

/**
 * Standard fetch handler to satisfy PWA criteria.
 * By not calling event.respondWith(), we allow the browser to handle 
 * all requests normally, preventing any "Failed to fetch" or 
 * "Failed to convert value to Response" errors.
 */
self.addEventListener('fetch', (event) => {
  // PWA requires a fetch listener to be present, but it doesn't have to intercept.
  // Letting the browser handle it is the most stable approach.
});

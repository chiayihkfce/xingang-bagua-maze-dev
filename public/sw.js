// Minimal Service Worker to satisfy PWA criteria
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Avoid intercepting fetch requests to prevent "Failed to fetch" errors from crashing the app
// Chrome still considers the PWA installable as long as a fetch handler exists
self.addEventListener('fetch', (event) => {
  // Do nothing, let the browser handle the request normally
});

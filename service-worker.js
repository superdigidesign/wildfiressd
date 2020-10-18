
// Service worker https://developers.google.com/web/fundamentals/codelabs/offline/
// Add the script tag for this service worker
// This script checks if the browser supports service workers.

if('serviceWorker' in navigator) {
    navigator.serviceWorker
             .register('/sw.js')
             .then(function() { console.log("Service Worker Registered"); });
  }

  importScripts('/cache-polyfill.js');


// Add event listener
// The first line below adds the Cache polyfill. This polyfill is already included in the repository. We need to use the polyfill because the Cache API is not yet fully supported in all browsers. Next comes the install event listener. The install event listener opens the caches object and then populates it with the list of resources that we want to cache. One important thing about the addAll operation is that it's all or nothing. If one of the files is not present or fails to be fetched, the entire addAll operation fails. A good application will handle this scenario.

// The next step is to program our service worker to return the intercept the requests to any of these resources and use the caches object to return the locally stored version of each resource.


self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('airhorner').then(function(cache) {
     return cache.addAll([
       '/',
       '/index.html',
       '/index.html?homescreen=1',
       '/?homescreen=1',
       '/style.css',
       '/script.js',
     ]);
   })
 );
});



self.addEventListener('fetch', function(event) {
    console.log(event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(response) {
          return response || fetch(event.request);
        })
      );
   });
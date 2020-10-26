importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');

if (workbox)
    console.log(`Workbox berhasil dimuat`);
else
    console.log(`Workbox gagal dimuat`);

workbox.precaching.precacheAndRoute([
    { url: '/', revision: '1' },
    { url: '/nav.html', revision: '1' },
    { url: '/index.html', revision: '1' },
    { url: '/detailTeam.html', revision: '1' },
    { url: '/css/materialize.min.css', revision: '1' },
    { url: '/css/home.css', revision: '1' },
    { url: '/css/standings.css', revision: '1' },
    { url: '/css/detailTeam.css', revision: '1' },
    { url: '/js/materialize.min.js', revision: '1' },
    { url: '/js/nav.js', revision: '1' },
    { url: '/js/reg.js', revision: '1' },
    { url: '/js/api.js', revision: '1' },
    { url: '/js/db.js', revision: '1' },
    { url: '/js/idb.js', revision: '1' },
    { url: '/manifest.json', revision: '1' },
    { url: '/pages/home.html', revision: '1' },
    { url: '/pages/standings.html', revision: '1' },
    { url: '/pages/favorite.html', revision: '1' },
    { url: '/pages/about.html', revision: '1' },
    { url: 'https://fonts.googleapis.com/icon?family=Material+Icons', revision: '1' },
    { url: 'https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2', revision: '1' },
], {
    ignoreUrlParametersMatching: [/.*/]
});


workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    workbox.strategies.cacheFirst({
        cacheName: "images",
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 60,
                maxAgeSeconds: 7 * 24 * 60 * 60,
            }),
        ],
    })
);

workbox.routing.registerRoute(
    new RegExp("/pages/"),
    workbox.strategies.staleWhileRevalidate({
        cacheName: "pages"
    })
);

workbox.routing.registerRoute(
    new RegExp('https://api.football-data.org/v2/'),
    workbox.strategies.staleWhileRevalidate()
)

self.addEventListener('push', function (event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: 'img/pwa-192x192.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});



// const CACHE_NAME = "firstpwa-v4";
// let urlsToCache = [
//     "/",
//     "/nav.html",
//     "/index.html",
//     "/detailTeam.html",
//     "/css/materialize.min.css",
//     "/css/home.css",
//     "/css/standings.css",
//     "/css/detailTeam.css",
//     "/js/materialize.min.js",
//     "/js/nav.js",
//     "/js/reg.js",
//     "/js/api.js",
//     "/js/db.js",
//     "/js/idb.js",
//     "/manifest.json",
//     "/img/favicon-16x16.png",
//     "/img/football-icon.png",
//     "/img/icon-ball.png",
//     "/img/logo-football-white.png",
//     "/img/pwa-192x192.png",
//     "/img/pwa-512x512.png",
//     "/img/favicon.ico",
//     "/img/mario.png",
//     "/pages/home.html",
//     "/pages/standings.html",
//     "/pages/favorite.html",
//     "/pages/about.html",
//     "https://fonts.googleapis.com/icon?family=Material+Icons",
//     "https://fonts.gstatic.com/s/materialicons/v55/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2"
// ];

// self.addEventListener("install", function (event) {
//     event.waitUntil(
//         caches.open(CACHE_NAME).then(function (cache) {
//             return cache.addAll(urlsToCache);
//         })
//     );
// });

// self.addEventListener('fetch', function (event) {
//     event.respondWith(
//         caches.match(event.request, { cacheName: CACHE_NAME })
//             .then(function (response) {
//                 if (response) {
//                     return response;
//                 }
//                 var fetchRequest = event.request.clone();
//                 return fetch(fetchRequest).then(
//                     function (response) {
//                         if (!response || response.status !== 200) {
//                             return response;
//                         }
//                         var responseToCache = response.clone();
//                         caches.open(CACHE_NAME)
//                             .then(function (cache) {
//                                 cache.put(event.request, responseToCache);
//                             });
//                         return response;
//                     }
//                 );
//             })
//     );
// });

// self.addEventListener('activate', function (event) {
//     console.log('Aktivasi service worker baru');
//     event.waitUntil(
//         caches.keys().then(function (cacheNames) {
//             return Promise.all(
//                 cacheNames.map(function (cacheName) {
//                     if (cacheName !== CACHE_NAME && cacheName.startsWith("firstpwa")) {
//                         return caches.delete(cacheName);
//                     }
//                 })
//             );
//         })
//     );
// });

// self.addEventListener('push', function (event) {
//     var body;
//     if (event.data) {
//         body = event.data.text();
//     } else {
//         body = 'Push message no payload';
//     }
//     var options = {
//         body: body,
//         icon: 'img/pwa-192x192.png',
//         vibrate: [100, 50, 100],
//         data: {
//             dateOfArrival: Date.now(),
//             primaryKey: 1
//         }
//     };
//     event.waitUntil(
//         self.registration.showNotification('Push Notification', options)
//     );
// });
importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js"
);

const urlsToCache = [
  { url: "/", revision: "1" },
  { url: "/index.html", revision: "1" },
  { url: "/nav.html", revision: "1" },
  { url: "/manifest.json", revision: "1" },
  { url: "/css/materialize.min.css", revision: "1" },
  { url: "/css/style.css", revision: "1" },
  { url: "/css/aos.css", revision: "1" },
  { url: "/js/aos.js", revision: "1" },
  { url: "/js/materialize.min.js", revision: "1" },
  { url: "/js/api.js", revision: "1" },
  { url: "/js/idb.js", revision: "1" },
  { url: "/js/db-controller.js", revision: "1" },
  { url: "/js/nav.js", revision: "1" },
  { url: "/js/regisSW.js", revision: "1" },
  { url: "/images/icon-notifikasi.png", revision: "1" },
  { url: "/images/Premier_League_Logo.svg", revision: "1" },
  { url: "/images/icons/ic_favorite.svg", revision: "1" },
  { url: "/images/icons/ic_home.svg", revision: "1" },
  { url: "/images/icons/ic_soccer.svg", revision: "1" },
  { url: "/images/icons/ic_trophy.svg", revision: "1" },
  { url: "/images/icons/icon-192x192.png", revision: "1" },
  { url: "/images/icons/icon-512x512.png", revision: "1" },
  { url: "/font/Poppins-Medium.ttf", revision: "1" },
];

workbox.precaching.precacheAndRoute(urlsToCache);

workbox.routing.registerRoute(
  /.*(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: "images-cache",
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200],
      }),
      new workbox.expiration.Plugin({
        maxEntries: 100,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

workbox.routing.registerRoute(
  new RegExp("https://api.football-data.org/v2/"),
  workbox.strategies.staleWhileRevalidate()
);

workbox.routing.registerRoute(
  /^https:\/\/fonts\.googleapis\.com/,
  workbox.strategies.staleWhileRevalidate({
    cacheName: "google-fonts-stylesheets",
  })
);

self.addEventListener("push", function (event) {
  let body;

  if (event.data) {
    body = event.data.text();
  } else {
    body = "Push Message no payload";
  }

  let options = {
    body: body,
    icon: "/images/icon-notifikasi.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification("Push Notification", options)
  );
});

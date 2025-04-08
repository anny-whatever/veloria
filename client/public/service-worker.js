// Service Worker for Veloria
const CACHE_NAME = "veloria-cache-v1";
const RUNTIME_CACHE = "veloria-runtime-v1";

// Static assets to cache during installation
const STATIC_ASSETS = [
  "/",
  "/favicon.ico",
  "/favicon.png",
  "/index.html",
  "/assets/index.css",
  "/assets/index.js",
];

// URL canonicalization helpers
const PREFERRED_DOMAIN = "veloria.in";
const shouldRedirect = (url) => {
  const urlObj = new URL(url);

  // Conditions for redirects:
  // 1. If using non-preferred domain (www vs non-www)
  // 2. If using HTTP instead of HTTPS
  // 3. If URL has trailing slash (except for root)

  const shouldRedirectDomain =
    urlObj.hostname === `www.${PREFERRED_DOMAIN}` &&
    PREFERRED_DOMAIN !== `www.${PREFERRED_DOMAIN}`;
  const shouldRedirectProtocol = urlObj.protocol === "http:";
  const shouldRedirectSlash =
    urlObj.pathname !== "/" && urlObj.pathname.endsWith("/");

  return shouldRedirectDomain || shouldRedirectProtocol || shouldRedirectSlash;
};

const getCanonicalUrl = (url) => {
  const urlObj = new URL(url);

  // Set preferred domain
  urlObj.hostname = PREFERRED_DOMAIN;

  // Enforce HTTPS
  urlObj.protocol = "https:";

  // Remove trailing slashes except on root path
  if (urlObj.pathname !== "/" && urlObj.pathname.endsWith("/")) {
    urlObj.pathname = urlObj.pathname.slice(0, -1);
  }

  return urlObj.toString();
};

// Install event - pre-cache static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return cacheNames.filter(
          (cacheName) => !currentCaches.includes(cacheName)
        );
      })
      .then((cachesToDelete) => {
        return Promise.all(
          cachesToDelete.map((cacheToDelete) => {
            return caches.delete(cacheToDelete);
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - handle redirects and caching
self.addEventListener("fetch", (event) => {
  // Skip non-GET requests and browser extensions
  if (event.request.method !== "GET" || !event.request.url.startsWith("http")) {
    return;
  }

  // URL canonicalization
  if (shouldRedirect(event.request.url)) {
    const canonicalUrl = getCanonicalUrl(event.request.url);
    event.respondWith(Response.redirect(canonicalUrl, 301));
    return;
  }

  // Network-first strategy for HTML navigation
  const isNavigationRequest =
    event.request.mode === "navigate" &&
    event.request.destination === "document";

  const isAPIRequest =
    event.request.url.includes("/api/") ||
    event.request.url.includes("/graphql");

  if (isNavigationRequest || isAPIRequest) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Don't cache API responses that aren't successful
          if (isAPIRequest && !response.ok) {
            return response;
          }

          // Clone the response to store in cache and return the original
          const responseToCache = response.clone();

          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }

            // For navigation requests, fall back to index.html
            if (isNavigationRequest) {
              return caches.match("/index.html");
            }

            // Otherwise, return a 404 error
            return new Response("Network error occurred", {
              status: 404,
              headers: { "Content-Type": "text/plain" },
            });
          });
        })
    );
    return;
  }

  // Cache-first for static assets (CSS, JS, images)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(event.request)
        .then((response) => {
          // Don't cache responses that aren't successful
          if (!response.ok) {
            return response;
          }

          // Clone the response to store in cache and return the original
          const responseToCache = response.clone();

          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(event.request, responseToCache);
          });

          return response;
        })
        .catch(() => {
          // Return a 404 error if network fails and item isn't in cache
          return new Response("Network error occurred", {
            status: 404,
            headers: { "Content-Type": "text/plain" },
          });
        });
    })
  );
});

// Support for back/forward cache
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

// Service Worker for Veloria
const CACHE_NAME = "veloria-cache-v2";
const RUNTIME_CACHE = "veloria-runtime-v2";

// Only cache the most essential static assets during installation
// Let other assets be cached at runtime to avoid installation failures
const STATIC_ASSETS = ["/", "/index.html"];

// URL canonicalization helpers
const PREFERRED_DOMAIN = "veloria.in";
const shouldRedirect = (url) => {
  const urlObj = new URL(url);

  // Only apply redirects in production, not in development
  // Skip redirects on localhost or IP addresses
  if (/localhost|127\.0\.0\.1|\d+\.\d+\.\d+\.\d+/.test(urlObj.hostname)) {
    return false;
  }

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

  // Set preferred domain (skip for localhost)
  if (!/localhost|127\.0\.0\.1|\d+\.\d+\.\d+\.\d+/.test(urlObj.hostname)) {
    urlObj.hostname = PREFERRED_DOMAIN;
    // Enforce HTTPS for production sites
    urlObj.protocol = "https:";
  }

  // Remove trailing slashes except on root path
  if (urlObj.pathname !== "/" && urlObj.pathname.endsWith("/")) {
    urlObj.pathname = urlObj.pathname.slice(0, -1);
  }

  return urlObj.toString();
};

// Safely cache an individual request
async function cacheResource(cache, url) {
  try {
    const request = typeof url === "string" ? new Request(url) : url;
    const response = await fetch(request, { credentials: "same-origin" });

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${request.url}`);
    }

    await cache.put(request, response);
    return true;
  } catch (error) {
    console.warn(`Failed to cache resource: ${url}`, error);
    return false;
  }
}

// Install event - pre-cache minimal static assets
self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);

        // Process each asset individually and collect results
        const results = await Promise.allSettled(
          STATIC_ASSETS.map((url) => cacheResource(cache, url))
        );

        // Log success/failure statistics
        const succeeded = results.filter(
          (r) => r.status === "fulfilled" && r.value === true
        ).length;
        console.log(
          `Service worker: cached ${succeeded}/${STATIC_ASSETS.length} initial assets`
        );

        // Always proceed with activation regardless of caching success
        await self.skipWaiting();
      } catch (error) {
        console.error("Service worker installation error:", error);
        // Proceed with activation even if installation fails
        await self.skipWaiting();
      }
    })()
  );
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE];

  event.waitUntil(
    (async () => {
      try {
        // Get all cache names
        const cacheNames = await caches.keys();

        // Filter caches that should be deleted
        const cachesToDelete = cacheNames.filter(
          (cacheName) => !currentCaches.includes(cacheName)
        );

        // Delete old caches
        await Promise.all(
          cachesToDelete.map((cacheToDelete) => caches.delete(cacheToDelete))
        );

        // Take control of clients
        await self.clients.claim();
        console.log("Service worker activated and controlling clients");
      } catch (error) {
        console.error("Service worker activation error:", error);
        // Still claim clients even if cache cleanup fails
        await self.clients.claim();
      }
    })()
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

  // Handle different types of requests
  if (isNavigationRequest || isAPIRequest) {
    // Network-first for navigation and API
    event.respondWith(
      (async () => {
        try {
          // Try network first
          const response = await fetch(event.request);

          // Only cache successful responses
          if (response.ok && !isAPIRequest) {
            try {
              const cache = await caches.open(RUNTIME_CACHE);
              cache.put(event.request, response.clone());
            } catch (cacheError) {
              console.warn("Failed to cache response:", cacheError);
            }
          }

          return response;
        } catch (error) {
          // Network failed, try cache
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          }

          // For navigation, fall back to index.html
          if (isNavigationRequest) {
            const indexResponse = await caches.match("/index.html");
            if (indexResponse) {
              return indexResponse;
            }
          }

          // No network and no cache: error response
          return new Response("Network error occurred", {
            status: 504,
            headers: { "Content-Type": "text/plain" },
          });
        }
      })()
    );
  } else {
    // Cache-first for static assets (CSS, JS, images)
    event.respondWith(
      (async () => {
        try {
          // Try cache first
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) {
            return cachedResponse;
          }

          // Cache miss, try network
          const response = await fetch(event.request);

          // Cache successful responses in the background
          if (response.ok) {
            const responseToCache = response.clone();
            caches
              .open(RUNTIME_CACHE)
              .then((cache) => cache.put(event.request, responseToCache))
              .catch((error) =>
                console.warn("Background caching failed:", error)
              );
          }

          return response;
        } catch (error) {
          // Both cache and network failed
          return new Response("Resource unavailable", {
            status: 504,
            headers: { "Content-Type": "text/plain" },
          });
        }
      })()
    );
  }
});

// Support for updates
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

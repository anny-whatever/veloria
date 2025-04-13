// Service Worker for Veloria
const CACHE_NAME = "veloria-cache-v3";
const RUNTIME_CACHE = "veloria-runtime-v3";
const ASSETS_CACHE = "veloria-assets-v3";
const API_CACHE = "veloria-api-v3";

// Assets that should be cached immediately during installation
const STATIC_ASSETS = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/favicon.png",
  "/site.webmanifest",
  "/sitemap.xml",
  "/robots.txt",
];

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

// Helper to determine cache duration based on file type
function getCacheDuration(url) {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname.toLowerCase();

    // Long-lived assets (1 year)
    if (pathname.match(/\.(js|css|woff2?|ttf|otf|eot)$/)) {
      return 31536000; // 365 days
    }

    // Medium-lived assets (1 week)
    if (pathname.match(/\.(jpe?g|png|gif|webp|avif|svg|ico)$/)) {
      return 604800; // 7 days
    }

    // API responses (5 minutes)
    if (pathname.includes("/api/")) {
      return 300; // 5 minutes
    }

    // Default (1 day)
    return 86400; // 24 hours
  } catch (e) {
    return 3600; // 1 hour fallback
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
  const currentCaches = [CACHE_NAME, RUNTIME_CACHE, ASSETS_CACHE, API_CACHE];

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

  const url = new URL(event.request.url);

  // Determine the type of request
  const isNavigationRequest =
    event.request.mode === "navigate" &&
    event.request.destination === "document";

  const isAPIRequest = url.pathname.includes("/api/");
  const isAssetRequest =
    event.request.destination === "style" ||
    event.request.destination === "script" ||
    event.request.destination === "font" ||
    event.request.destination === "image" ||
    /\.(css|js|woff2?|ttf|otf|eot|svg|png|jpe?g|gif|webp|avif|ico)$/i.test(
      url.pathname
    );

  // SEO files should always be fresh
  const isSEOFile = /robots\.txt|sitemap\.xml/.test(url.pathname);

  // 1. Handle SEO files - network first
  if (isSEOFile) {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(event.request);
          // Update cache in the background
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        } catch (error) {
          const cachedResponse = await caches.match(event.request);
          return (
            cachedResponse ||
            new Response("SEO file not available", { status: 503 })
          );
        }
      })()
    );
    return;
  }

  // 2. Handle navigation requests - network first, fallback to cache
  if (isNavigationRequest) {
    event.respondWith(
      (async () => {
        try {
          const networkResponse = await fetch(event.request);
          // Update cache in the background
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        } catch (error) {
          // Network failed, try cache
          const cachedResponse = await caches.match(event.request);
          if (cachedResponse) return cachedResponse;

          // Fall back to index.html
          const indexResponse = await caches.match("/index.html");
          if (indexResponse) return indexResponse;

          return new Response("Network error occurred", { status: 504 });
        }
      })()
    );
    return;
  }

  // 3. Handle API requests - stale-while-revalidate with short expiration
  if (isAPIRequest) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(API_CACHE);

        // Try to get from cache first
        const cachedResponse = await cache.match(event.request);

        // Start fetching fresh data immediately
        const networkResponsePromise = fetch(event.request)
          .then((response) => {
            if (response.ok) {
              // Add Cache-Control header with proper expiration
              const cacheDuration = getCacheDuration(event.request.url);
              const responseWithCacheControl = new Response(
                response.clone().body,
                {
                  status: response.status,
                  statusText: response.statusText,
                  headers: new Headers(response.headers),
                }
              );
              responseWithCacheControl.headers.set(
                "Cache-Control",
                `max-age=${cacheDuration}`
              );

              // Update cache
              cache.put(event.request, responseWithCacheControl);
            }
            return response;
          })
          .catch((error) => {
            console.error("API fetch failed:", error);
            throw error;
          });

        // Return cached response immediately if available
        if (cachedResponse) {
          // Revalidate in the background
          networkResponsePromise.catch(() => {});
          return cachedResponse;
        }

        // If no cached response, wait for network
        return await networkResponsePromise;
      })()
    );
    return;
  }

  // 4. Handle asset requests - cache first, then network
  if (isAssetRequest) {
    event.respondWith(
      (async () => {
        const cache = await caches.open(ASSETS_CACHE);

        // Try cache first
        const cachedResponse = await cache.match(event.request);
        if (cachedResponse) {
          // Revalidate in the background for next time
          fetch(event.request)
            .then((networkResponse) => {
              if (networkResponse.ok) {
                cache.put(event.request, networkResponse);
              }
            })
            .catch(() => {});

          return cachedResponse;
        }

        // No cache hit, use network
        try {
          const networkResponse = await fetch(event.request);
          if (networkResponse.ok) {
            // Cache for future
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        } catch (error) {
          return new Response("Asset unavailable", { status: 504 });
        }
      })()
    );
    return;
  }

  // 5. Default handling - simple network with fallback to cache
  event.respondWith(
    (async () => {
      try {
        const response = await fetch(event.request);
        return response;
      } catch (error) {
        const cachedResponse = await caches.match(event.request);
        return (
          cachedResponse || new Response("Content unavailable", { status: 504 })
        );
      }
    })()
  );
});

// Support for updates
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});

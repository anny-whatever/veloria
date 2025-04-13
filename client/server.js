import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import { createServer as createViteServer } from "vite";
import compression from "compression";
import serveStatic from "serve-static";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 3000;

// Function to set canonical URL headers
const setCanonicalHeaders = (req, res, next) => {
  // Get hostname and protocol
  const protocol = req.headers["x-forwarded-proto"] || req.protocol;
  const preferredDomain = process.env.CANONICAL_DOMAIN || "veloria.in";

  // Set Link header with canonical URL
  const canonicalPath =
    req.originalUrl.endsWith("/") && req.originalUrl !== "/"
      ? req.originalUrl.slice(0, -1)
      : req.originalUrl;

  const canonicalUrl = `https://${preferredDomain}${canonicalPath}`;

  // Set response headers
  res.setHeader("Link", `<${canonicalUrl}>; rel="canonical"`);

  // If not the canonical domain, redirect
  if (req.hostname !== preferredDomain && req.hostname !== "localhost") {
    return res.redirect(301, canonicalUrl);
  }

  // If using HTTP when in production, redirect to HTTPS
  if (isProduction && protocol !== "https") {
    return res.redirect(301, canonicalUrl);
  }

  // If has trailing slash (except root path), redirect to non-trailing version
  if (req.originalUrl !== "/" && req.originalUrl.endsWith("/")) {
    return res.redirect(301, canonicalUrl);
  }

  next();
};

async function createServer() {
  const app = express();

  // Enable compression
  app.use(compression());

  // Set canonical URL headers for SEO (only for page routes, not assets)
  app.use((req, res, next) => {
    // Skip for asset requests
    if (req.path.includes(".") || req.path.startsWith("/assets/")) {
      return next();
    }

    setCanonicalHeaders(req, res, next);
  });

  // Set caching headers for static assets
  const setCacheHeaders = (res, path) => {
    const fileExtension = path.split(".").pop()?.toLowerCase();

    // Configure caching headers based on file type
    if (
      ["jpg", "jpeg", "png", "gif", "webp", "avif", "svg", "ico"].includes(
        fileExtension
      )
    ) {
      // Images - cache for 1 year
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    } else if (["js", "css"].includes(fileExtension)) {
      // JS/CSS files - cache for 1 year but allow revalidation
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    } else if (["woff", "woff2", "ttf", "otf", "eot"].includes(fileExtension)) {
      // Fonts - cache for 1 year
      res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    } else {
      // Other static files - cache for 1 day
      res.setHeader("Cache-Control", "public, max-age=86400");
    }
  };

  let vite;

  if (!isProduction) {
    // In development: Create Vite server in middleware mode and configure app to use it
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    // In production: Serve the static assets and use the client-side build
    app.use(
      serveStatic(path.resolve(__dirname, "dist/client"), {
        index: false,
        setHeaders: setCacheHeaders,
      })
    );

    // Explicitly serve the assets directory with proper caching
    app.use(
      "/assets",
      express.static(path.resolve(__dirname, "dist/client/assets"), {
        maxAge: "1y",
        immutable: true,
        setHeaders: setCacheHeaders,
      })
    );
  }

  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    // Skip SSR for certain paths
    if (url.includes(".") || url.startsWith("/assets/")) {
      return next();
    }

    try {
      let template, render;

      if (!isProduction) {
        // In development: Get and transform the index.html with Vite
        template = fs.readFileSync(
          path.resolve(__dirname, "index.html"),
          "utf-8"
        );
        template = await vite.transformIndexHtml(url, template);

        // Load the server entry module with Vite
        render = (await vite.ssrLoadModule("/src/entry-server.jsx")).render;
      } else {
        // In production: Use the built template and server-side renderer
        template = fs.readFileSync(
          path.resolve(__dirname, "dist/client/index.html"),
          "utf-8"
        );

        // Try multiple server entry paths for compatibility
        try {
          // First try the new path (most reliable)
          render = (await import("./dist/server/index.js")).render;
        } catch (importError) {
          console.log(
            "Could not import from index.js, trying entry-server.js..."
          );
          try {
            // Then try the direct path
            render = (await import("./dist/server/entry-server.js")).render;
          } catch (fallbackError) {
            console.error("Failed to load server entry module:", fallbackError);
            // Output helpful diagnostic information
            console.error(
              "Available files in dist/server:",
              fs.existsSync(path.resolve(__dirname, "dist/server"))
                ? fs.readdirSync(path.resolve(__dirname, "dist/server"))
                : "directory not found"
            );
            throw fallbackError;
          }
        }
      }

      // Render the app HTML and get the helmet context
      const { html: appHtml, context: helmetContext } = render(url);

      // Insert the rendered app and meta tags into the template
      let htmlWithApp = template.replace("<!--app-html-->", appHtml);

      // Insert meta tags if available
      if (helmetContext && helmetContext.helmet) {
        const { helmet } = helmetContext;
        htmlWithApp = htmlWithApp.replace(
          "<!--head-meta-->",
          `
          ${helmet.title?.toString() || ""}
          ${helmet.meta?.toString() || ""}
          ${helmet.link?.toString() || ""}
          ${helmet.script?.toString() || ""}
        `
        );
      }

      // Add preload hints for critical resources
      const preloadHints = generatePreloadHints(url);
      htmlWithApp = htmlWithApp.replace("</head>", `${preloadHints}</head>`);

      // Set appropriate headers and send the rendered HTML
      res.status(200).set({ "Content-Type": "text/html" }).end(htmlWithApp);
    } catch (e) {
      // If error, let Vite handle error processing in dev, or pass to next middleware in prod
      if (!isProduction) {
        vite.ssrFixStacktrace(e);
      }
      console.error(e.stack);
      next(e);
    }
  });

  // Handle 404 errors - must be placed after all other routes
  app.use((req, res) => {
    // For API requests, return a JSON response
    if (req.path.startsWith("/api/")) {
      return res.status(404).json({
        error: "Not Found",
        message: "The requested API endpoint does not exist.",
      });
    }

    // For other requests, serve the SSR 404 page
    res
      .status(404)
      .sendFile(
        path.resolve(
          __dirname,
          isProduction ? "dist/client/index.html" : "index.html"
        )
      );
  });

  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}

// Generate preload hints for critical resources based on the URL
function generatePreloadHints(url) {
  let hints = "";

  // Common critical assets for all pages
  const criticalAssets = [
    // Main CSS entry - high priority
    { href: "/assets/index.css", as: "style" },
    // Font preloads - lower priority
    { href: "https://fonts.googleapis.com", as: "preconnect" },
    { href: "https://fonts.gstatic.com", as: "preconnect", crossorigin: true },
  ];

  // Page-specific critical assets
  if (url === "/") {
    // Add homepage specific critical resources
    criticalAssets.push({
      href: "/assets/home-hero.webp",
      as: "image",
      fetchpriority: "high",
    });
  } else if (url.includes("/services")) {
    // Add services page specific critical resources
    criticalAssets.push({
      href: "/assets/services-hero.webp",
      as: "image",
      fetchpriority: "high",
    });
  }

  // Generate the HTML for preload links
  criticalAssets.forEach((asset) => {
    const crossOrigin = asset.crossorigin ? " crossorigin" : "";
    const fetchPriority = asset.fetchpriority
      ? ` fetchpriority="${asset.fetchpriority}"`
      : "";

    if (asset.as === "preconnect") {
      hints += `<link rel="preconnect" href="${asset.href}"${crossOrigin}>\n`;
    } else {
      hints += `<link rel="preload" href="${asset.href}" as="${asset.as}"${crossOrigin}${fetchPriority}>\n`;
    }
  });

  return hints;
}

createServer();

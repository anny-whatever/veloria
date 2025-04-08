import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import compression from "compression";

// Constants and configuration
const isProduction = process.env.NODE_ENV === "production";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST_CLIENT_DIR = path.resolve(__dirname, "dist/client");
const DIST_SERVER_DIR = path.resolve(__dirname, "dist/server");
const PORT = process.env.PORT || 3000;

// Set up the express app
const app = express();

// Compression middleware to optimize response size
app.use(compression());

// Cache control for static assets
const setStaticFileHeaders = (res, path) => {
  const isAsset =
    /\.(js|css|jpg|jpeg|png|gif|svg|ico|woff|woff2|ttf|otf|eot)$/i.test(path);

  if (isAsset) {
    // Long-term caching for static assets
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
  } else {
    // No caching for HTML and other non-asset files
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  }
};

// Setup for production vs development
async function setupServer() {
  let vite;
  if (!isProduction) {
    const { createServer } = await import("vite");
    vite = await createServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    // Add proper MIME type handling
    app.use((req, res, next) => {
      if (req.path.endsWith(".js")) {
        res.type("application/javascript");
      } else if (req.path.endsWith(".css")) {
        res.type("text/css");
      }
      next();
    });

    // Serve production static assets with appropriate cache headers
    app.use(
      express.static(DIST_CLIENT_DIR, {
        index: false,
        setHeaders: setStaticFileHeaders,
      })
    );
  }

  // SSR request handler
  app.use("*", async (req, res) => {
    const url = req.originalUrl;
    try {
      let template, render;

      if (!isProduction) {
        // In development: Use Vite's features
        template = fs.readFileSync(
          path.resolve(__dirname, "index.html"),
          "utf-8"
        );
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule("/src/entry-server.jsx")).render;
      } else {
        // In production: Use built files
        template = fs.readFileSync(
          path.resolve(DIST_CLIENT_DIR, "index.html"),
          "utf-8"
        );
        render = (
          await import(path.resolve(DIST_SERVER_DIR, "entry-server.js"))
        ).render;
      }

      // Get the app HTML and state from the SSR render function
      const { html, headTags, bodyTags } = await render(url);

      // Inject the app-rendered HTML into the template
      const renderedHtml = template
        .replace(`<!--app-html-->`, html)
        .replace(`<!--head-tags-->`, headTags || "")
        .replace(`<!--body-tags-->`, bodyTags || "");

      // Send the rendered HTML to the client
      res.status(200).set({ "Content-Type": "text/html" }).end(renderedHtml);
    } catch (error) {
      // Error handling
      console.error(`Error rendering ${url}:`, error);

      // If we're in development, let Vite handle the error
      if (!isProduction && vite) {
        vite.ssrFixStacktrace(error);
        next(error);
        return;
      }

      // Production error page fallback
      res.status(500).end(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Server Error</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; }
              h1 { color: #e53e3e; }
              p { line-height: 1.6; }
            </style>
          </head>
          <body>
            <h1>Server Error</h1>
            <p>We're sorry, but something went wrong on our server. Please try again later.</p>
            <p><a href="/">Return to Homepage</a></p>
          </body>
        </html>
      `);
    }
  });

  // Start the server
  app.listen(PORT, () => {
    console.log(
      `Server ${
        isProduction ? "production" : "development"
      } running at http://localhost:${PORT}`
    );
  });
}

// Start the server
setupServer().catch((error) => {
  console.error("Error starting server:", error);
  process.exit(1);
});

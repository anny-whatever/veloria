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

async function createServer() {
  const app = express();

  // Enable compression
  app.use(compression({ level: 6 }));

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
        maxAge: "1d",
        setHeaders: (res, path) => {
          // Set headers for assets to enable better caching
          if (path.includes("/assets/")) {
            res.setHeader(
              "Cache-Control",
              "public, max-age=2592000, immutable"
            );
          } else if (
            path.match(
              /\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$/
            )
          ) {
            res.setHeader(
              "Cache-Control",
              "public, max-age=1296000, immutable"
            );
          }
          // Add header for better compression and client caching
          res.setHeader("Vary", "Accept-Encoding");
        },
      })
    );

    // Explicitly serve the assets directory
    app.use(
      "/assets",
      express.static(path.resolve(__dirname, "dist/client/assets"), {
        maxAge: "30d",
        immutable: true,
        setHeaders: (res) => {
          // Explicitly set cache headers
          res.setHeader("Cache-Control", "public, max-age=2592000, immutable");
          res.setHeader("Vary", "Accept-Encoding");
        },
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
        render = (await import("./dist/server/entry-server.js")).render;
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

      // Set appropriate headers for HTML - use no-cache but not no-store to enable bfcache
      res
        .status(200)
        .set({
          "Content-Type": "text/html",
          "Cache-Control": "no-cache, must-revalidate",
          Pragma: "no-cache",
          Expires: "0",
        })
        .end(htmlWithApp);
    } catch (e) {
      // If error, let Vite handle error processing in dev, or pass to next middleware in prod
      if (!isProduction) {
        vite.ssrFixStacktrace(e);
      }
      console.error(e.stack);
      next(e);
    }
  });

  app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });
}

createServer();

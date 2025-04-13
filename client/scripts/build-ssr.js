import { build } from "vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Build client bundle
async function buildClient() {
  console.log("Building client bundle...");
  await build({
    configFile: resolve(__dirname, "../vite.config.js"),
    root: resolve(__dirname, ".."),
    build: {
      outDir: "dist/client",
      ssrManifest: true,
      emptyOutDir: true,
    },
    mode: "production",
  });
  console.log("Client bundle built!");
}

// Build server bundle
async function buildServer() {
  console.log("Building server bundle...");
  await build({
    configFile: resolve(__dirname, "../vite.config.js"),
    root: resolve(__dirname, ".."),
    build: {
      outDir: "dist/server",
      ssr: "src/entry-server.jsx",
      emptyOutDir: true,
    },
    mode: "production",
  });

  // Add CJS entry point for better compatibility
  const serverEntryPath = resolve(__dirname, "../dist/server/entry-server.js");
  if (fs.existsSync(serverEntryPath)) {
    // Create a CJS-compatible entry point
    const cjsWrapperContent = `
// CJS compatibility wrapper
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const require = createRequire(import.meta.url);

export * from './entry-server.js';
`;

    fs.writeFileSync(
      resolve(__dirname, "../dist/server/index.js"),
      cjsWrapperContent,
      "utf8"
    );

    console.log("Server bundle built with CJS compatibility!");
  } else {
    console.error("WARNING: Server entry file not found at expected path!");
    console.error(`Expected: ${serverEntryPath}`);
    console.error("This will cause SSR to fail in production");
  }
}

// Make sure the index.html has base paths correctly set
async function prepareHtml() {
  console.log("Preparing HTML template...");
  const clientPath = resolve(__dirname, "../dist/client");

  if (fs.existsSync(`${clientPath}/index.html`)) {
    let html = fs.readFileSync(`${clientPath}/index.html`, "utf-8");

    // Make sure the base path is set correctly
    html = html
      .replace(
        /<link rel="stylesheet" href="\//g,
        '<link rel="stylesheet" href="/'
      )
      .replace(
        /<script type="module" crossorigin src="\//g,
        '<script type="module" crossorigin src="/'
      );

    fs.writeFileSync(`${clientPath}/index.html`, html);
    console.log("HTML template prepared!");
  }
}

// Run builds
async function buildAll() {
  try {
    await buildClient();
    await buildServer();
    await prepareHtml();
    console.log("Build complete!");
  } catch (e) {
    console.error("Build failed:", e);
    process.exit(1);
  }
}

buildAll();

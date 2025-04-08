import { build } from "vite";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

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
    },
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
    },
  });
  console.log("Server bundle built!");
}

// Run builds
async function buildAll() {
  try {
    await buildClient();
    await buildServer();
    console.log("Build complete!");
  } catch (e) {
    console.error("Build failed:", e);
    process.exit(1);
  }
}

buildAll();

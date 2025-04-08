import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["9344-49-36-101-231.ngrok-free.app"],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
    // Create separate build outputs for client and server
    outDir: "dist/client",
    // Ensure assets have a predictable path structure
    assetsDir: "assets",
    // Generate manifest for SSR asset preloading
    manifest: true,
    // Use clean URLs for JS/CSS assets
    cssCodeSplit: true,
  },
  ssr: {
    // SSR specific configurations
    noExternal: ["react-helmet-async"],
    // Build output for server entry file
    format: "esm",
    target: "node",
    // Avoid dynamic imports in SSR build
    optimizeDeps: {
      include: ["react", "react-dom", "react-router-dom"],
    },
  },
  // Resolve aliases
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});

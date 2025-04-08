import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ["veloria.in", "www.veloria.in"],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
      output: {
        // Use deterministic asset names without content hashing for better caching
        entryFileNames: "assets/[name].js",
        chunkFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
        manualChunks: function (id) {
          // Core framework dependencies
          if (
            id.includes("node_modules/react/") ||
            id.includes("node_modules/react-dom/") ||
            id.includes("node_modules/scheduler/")
          ) {
            return "vendor-react";
          }

          // Routing libraries
          if (
            id.includes("node_modules/react-router") ||
            id.includes("node_modules/@remix-run/")
          ) {
            return "vendor-router";
          }

          // UI components and styling
          if (
            id.includes("node_modules/framer-motion/") ||
            id.includes("node_modules/lucide-react/")
          ) {
            return "vendor-ui";
          }

          // Calendar-related dependencies - only load on pages that use calendar
          if (id.includes("node_modules/@fullcalendar/")) {
            return "vendor-calendar";
          }

          // Other utilities - split into separate chunks to avoid large bundles
          if (id.includes("node_modules/date-fns/")) {
            return "vendor-date-fns";
          }

          if (id.includes("node_modules/axios/")) {
            return "vendor-axios";
          }

          // Features by main sections
          if (id.includes("/src/components/Admin/")) {
            return "feature-admin";
          }

          if (id.includes("/src/components/Contact/")) {
            return "feature-contact";
          }

          if (id.includes("/src/pages/GetStarted/")) {
            return "feature-get-started";
          }

          if (id.includes("/src/pages/Services/")) {
            return "feature-services";
          }

          // Other third-party dependencies
          if (id.includes("node_modules/")) {
            return "vendor-other";
          }
        },
      },
      external: ["intersection-observer", "react-helmet"],
    },
    // Create separate build outputs for client and server
    outDir: "dist/client",
    // Ensure assets have a predictable path structure
    assetsDir: "assets",
    // Generate manifest for SSR asset preloading
    manifest: true,
    // Use clean URLs for JS/CSS assets and extract CSS in a separate file
    cssCodeSplit: true,
    // Optimize code bundle size
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug"],
        passes: 2,
      },
      // Disable variable name mangling to prevent reference errors
      mangle: false,
      format: {
        comments: false,
      },
    },
    // Improve chunking strategy
    chunkSizeWarningLimit: 1000,
    // Tree-shaking
    sourcemap: false,
    // Make asset URLs absolute so they can be properly resolved
    base: "/",
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
  // Optimize dependencies
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "framer-motion",
      "lucide-react",
      "intersection-observer",
    ],
    exclude: ["@fullcalendar/core"],
  },
});

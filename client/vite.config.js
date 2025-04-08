import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { splitVendorChunkPlugin } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin()],
  server: {
    allowedHosts: ["veloria.in", "www.veloria.in"],
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
      output: {
        manualChunks: (id) => {
          // Create separate chunks for large dependencies
          if (id.includes("node_modules")) {
            if (id.includes("react")) return "react-vendor";
            if (id.includes("framer-motion")) return "framer-motion-vendor";
            if (id.includes("lucide-react")) return "lucide-vendor";
            if (id.includes("@fullcalendar")) return "fullcalendar-vendor";
            if (id.includes("node_modules")) return "vendor";
          }
        },
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
    // Enable source maps in production
    sourcemap: true,
    // Improve minification
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Reduce chunk size
    chunkSizeWarningLimit: 1000,
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
      "react-helmet-async",
      "react-intersection-observer",
    ],
    esbuildOptions: {
      target: "es2020",
    },
  },
});

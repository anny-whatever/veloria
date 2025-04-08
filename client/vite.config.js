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
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          ui: ["framer-motion", "lucide-react"],
          calendar: [
            "@fullcalendar/core",
            "@fullcalendar/daygrid",
            "@fullcalendar/timegrid",
            "@fullcalendar/interaction",
            "@fullcalendar/list",
            "@fullcalendar/react",
          ],
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
    // Optimize code bundle size
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug"],
      },
      format: {
        comments: false,
      },
    },
    // Improve chunking strategy
    chunkSizeWarningLimit: 1000,
    // Tree-shaking
    sourcemap: false,
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

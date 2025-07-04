import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { splitVendorChunkPlugin } from "vite";
import { imagetools } from "vite-imagetools";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    splitVendorChunkPlugin(),
    imagetools({
      defaultDirectives: () => {
        return new URLSearchParams({
          format: "webp;avif;original", // Generate WebP, AVIF and original format
          quality: "80", // Default quality
          w: "800", // Default max width
          as: "picture", // Generate picture element
        });
      },
    }),
  ],
  server: {
    port: 5173,
    strictPort: true,
    allowedHosts: ["veloria.in", "www.veloria.in"],
    fs: {
      // Allow serving files from one level up to the project root
      allow: [".."],
    },
    hmr: {
      overlay: true,
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
      output: {
        manualChunks: {
          // Explicitly group React and its ecosystem together
          "react-vendor": ["react", "react-dom", "react-router-dom"],
          "ui-vendor": ["framer-motion", "lucide-react"],
          "calendar-vendor": [
            "@fullcalendar/react",
            "@fullcalendar/daygrid",
            "@fullcalendar/interaction",
            "@fullcalendar/list",
            "@fullcalendar/timegrid",
          ],
        },
      },
    },
    // Ensure assets have a predictable path structure
    assetsDir: "assets",
    // Use clean URLs for JS/CSS assets
    cssCodeSplit: true,
    // Enable source maps in production
    sourcemap: true,
    // Reduce chunk size
    chunkSizeWarningLimit: 1000,
  },
  // Resolve aliases
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  css: {
    modules: {
      // Generate scoped CSS by default
      scopeBehaviour: "local",
      // Format for the generated class names
      localsConvention: "camelCaseOnly",
      // Custom CSS modules pattern
      generateScopedName: "[name]__[local]___[hash:base64:5]",
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
      drop: ["console", "debugger"],
    },
  },
});

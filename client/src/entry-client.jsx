import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./index.css";

// Mark the start time for performance metrics
const startTime = performance.now();

// Function to mark LCP complete
function markLCPComplete() {
  // Mark the Largest Contentful Paint time
  const lcpTime = performance.now() - startTime;
  // Avoid console logs in production
  if (process.env.NODE_ENV !== "production") {
    console.debug(`LCP completed in ${lcpTime.toFixed(2)}ms`);
  }

  // Add class to body to animate in LCP elements
  document.body.classList.add("lcp-loaded");

  // Clean up the observer
  if (lcpObserver) {
    lcpObserver.disconnect();
  }
}

// Measure Largest Contentful Paint only in browser environment
let lcpObserver;
if (typeof window !== "undefined" && "PerformanceObserver" in window) {
  lcpObserver = new PerformanceObserver((entryList) => {
    const entries = entryList.getEntries();
    if (entries.length > 0) {
      markLCPComplete();
    }
  });

  lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });

  // Fallback if LCP doesn't fire
  setTimeout(markLCPComplete, 3000);
}

// Main hydration function - this will run immediately
function hydrateApp() {
  ReactDOM.hydrateRoot(
    document.getElementById("root"),
    <React.StrictMode>
      <BrowserRouter>
        <AuthProvider>
          <ThemeProvider>
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </ThemeProvider>
        </AuthProvider>
      </BrowserRouter>
    </React.StrictMode>
  );
}

// Load non-critical resources after page is interactive
function loadNonCriticalResources() {
  // Load any other non-critical resources
  // This is where you'd dynamically import non-critical components
}

// If the browser supports requestIdleCallback, use it to load non-critical resources
if (typeof window !== "undefined" && "requestIdleCallback" in window) {
  window.requestIdleCallback(loadNonCriticalResources);
} else if (typeof window !== "undefined") {
  // Otherwise use a timeout as a fallback
  setTimeout(loadNonCriticalResources, 2000);
}

// Hydrate the app immediately to maintain interactivity
hydrateApp();

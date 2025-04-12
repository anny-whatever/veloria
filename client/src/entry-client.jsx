import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./index.css";

// In development, we can use createRoot to avoid hydration errors
// In production, use hydrateRoot for proper SSR
const isDev = import.meta.env.DEV;
const rootElement = document.getElementById("root");

// For development, use createRoot to avoid hydration warnings
// For production, use hydrateRoot for proper SSR benefits
if (isDev) {
  ReactDOM.createRoot(rootElement).render(
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
} else {
  ReactDOM.hydrateRoot(
    rootElement,
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

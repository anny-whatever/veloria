import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "./App";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./index.css";

export function render(url, context) {
  const helmetContext = {};

  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <AuthProvider>
          <ThemeProvider>
            <HelmetProvider context={helmetContext}>
              <App />
            </HelmetProvider>
          </ThemeProvider>
        </AuthProvider>
      </StaticRouter>
    </React.StrictMode>
  );

  return { html, context: helmetContext };
}

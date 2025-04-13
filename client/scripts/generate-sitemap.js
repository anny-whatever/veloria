/**
 * Automated Sitemap Generator for Veloria
 *
 * This script generates a sitemap.xml file based on the routes defined in the React app.
 * It excludes admin routes and adds appropriate priorities and change frequencies.
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Base URL of the website
const BASE_URL = "https://veloria.in";

// Get current date in YYYY-MM-DD format
const getFormattedDate = () => {
  const date = new Date();
  return date.toISOString().split("T")[0];
};

// Define routes based on App.jsx
// Each route has a path, priority, and change frequency
const routes = [
  {
    path: "/",
    priority: "1.0",
    changefreq: "weekly",
    lastmod: getFormattedDate(),
  },
  {
    path: "/services",
    priority: "0.9",
    changefreq: "monthly",
    lastmod: getFormattedDate(),
  },
  {
    path: "/get-started",
    priority: "0.9",
    changefreq: "monthly",
    lastmod: getFormattedDate(),
  },
  {
    path: "/services/web-development",
    priority: "0.8",
    changefreq: "monthly",
    lastmod: getFormattedDate(),
  },
  {
    path: "/services/mobile-app-development",
    priority: "0.8",
    changefreq: "monthly",
    lastmod: getFormattedDate(),
  },
  {
    path: "/services/custom-software-development",
    priority: "0.8",
    changefreq: "monthly",
    lastmod: getFormattedDate(),
  },
  {
    path: "/services/ui-ux-design",
    priority: "0.8",
    changefreq: "monthly",
    lastmod: getFormattedDate(),
  },
  {
    path: "/services/database-solutions",
    priority: "0.8",
    changefreq: "monthly",
    lastmod: getFormattedDate(),
  },
  {
    path: "/services/hotel-management-system",
    priority: "0.7",
    changefreq: "monthly",
    lastmod: getFormattedDate(),
  },
  {
    path: "/services/school-management-system",
    priority: "0.7",
    changefreq: "monthly",
    lastmod: getFormattedDate(),
  },
  {
    path: "/services/hospital-management-system",
    priority: "0.7",
    changefreq: "monthly",
    lastmod: getFormattedDate(),
  },
  {
    path: "/services/ecommerce-management-system",
    priority: "0.7",
    changefreq: "monthly",
    lastmod: getFormattedDate(),
  },
  {
    path: "/services/erp-system",
    priority: "0.7",
    changefreq: "monthly",
    lastmod: getFormattedDate(),
  },
  {
    path: "/services/payroll-management-system",
    priority: "0.7",
    changefreq: "monthly",
    lastmod: getFormattedDate(),
  },
  {
    path: "/privacy-policy",
    priority: "0.3",
    changefreq: "yearly",
    lastmod: getFormattedDate(),
  },
  {
    path: "/terms-of-service",
    priority: "0.3",
    changefreq: "yearly",
    lastmod: getFormattedDate(),
  },
  // Add additional routes as needed
];

// Home page sections as anchors
const homePageSections = [
  {
    path: "/#portfolio",
    priority: "0.8",
    changefreq: "monthly",
    lastmod: getFormattedDate(),
  },
  {
    path: "/#about",
    priority: "0.7",
    changefreq: "monthly",
    lastmod: getFormattedDate(),
  },
  {
    path: "/#contact",
    priority: "0.8",
    changefreq: "monthly",
    lastmod: getFormattedDate(),
  },
];

// Generate the sitemap XML content
function generateSitemapXML() {
  let sitemapContent = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemapContent +=
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" ';
  sitemapContent += 'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" ';
  sitemapContent +=
    'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">\n';

  // Add routes
  [...routes, ...homePageSections].forEach((route) => {
    sitemapContent += `  <url>\n`;
    sitemapContent += `    <loc>${BASE_URL}${route.path}</loc>\n`;
    sitemapContent += `    <lastmod>${route.lastmod}</lastmod>\n`;
    sitemapContent += `    <changefreq>${route.changefreq}</changefreq>\n`;
    sitemapContent += `    <priority>${route.priority}</priority>\n`;
    sitemapContent += `  </url>\n`;
  });

  sitemapContent += "</urlset>";
  return sitemapContent;
}

// Write the sitemap to the public directory
function writeSitemap() {
  const sitemapXML = generateSitemapXML();
  const outputPath = path.resolve(__dirname, "../public/sitemap.xml");

  fs.writeFileSync(outputPath, sitemapXML);
  console.log(`Sitemap generated at: ${outputPath}`);
}

// Execute the sitemap generation
writeSitemap();

/**
 * Generate sitemap.xml file for the Veloria website
 * Run this script during the build process to update the sitemap
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Base URL of the website
const BASE_URL = "https://veloria.in";

// Get current date in ISO format
const today = new Date().toISOString().split("T")[0];

// Main website routes
const routes = [
  {
    url: "/",
    changefreq: "weekly",
    priority: "1.0",
  },
  {
    url: "/services",
    changefreq: "monthly",
    priority: "0.9",
  },
  {
    url: "/#portfolio",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    url: "/#about",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    url: "/#contact",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    url: "/get-started",
    changefreq: "monthly",
    priority: "0.9",
  },
];

// Service pages
const servicePages = [
  {
    url: "/services/web-development",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    url: "/services/mobile-app-development",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    url: "/services/custom-software-development",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    url: "/services/ui-ux-design",
    changefreq: "monthly",
    priority: "0.8",
  },
  {
    url: "/services/database-solutions",
    changefreq: "monthly",
    priority: "0.8",
  },
];

// Management system pages - these have higher SEO value for our business
const managementSystemPages = [
  {
    url: "/services/hotel-management-system",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    url: "/services/school-management-system",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    url: "/services/hospital-management-system",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    url: "/services/ecommerce-management-system",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    url: "/services/erp-system",
    changefreq: "monthly",
    priority: "0.7",
  },
  {
    url: "/services/payroll-management-system",
    changefreq: "monthly",
    priority: "0.7",
  },
];

// Blog posts or resource pages (add dynamically if needed)
const blogPages = [
  {
    url: "/blog",
    changefreq: "weekly",
    priority: "0.6",
  },
];

// Legal pages
const legalPages = [
  {
    url: "/privacy-policy",
    changefreq: "yearly",
    priority: "0.3",
  },
  {
    url: "/terms-of-service",
    changefreq: "yearly",
    priority: "0.3",
  },
];

// Combine all routes
const allRoutes = [
  ...routes,
  ...servicePages,
  ...managementSystemPages,
  ...blogPages,
  ...legalPages,
];

// Generate sitemap XML content
const generateSitemapXml = () => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  allRoutes.forEach((route) => {
    xml += "  <url>\n";
    xml += `    <loc>${BASE_URL}${route.url}</loc>\n`;
    xml += `    <lastmod>${today}</lastmod>\n`;
    xml += `    <changefreq>${route.changefreq}</changefreq>\n`;
    xml += `    <priority>${route.priority}</priority>\n`;
    xml += "  </url>\n";
  });

  xml += "</urlset>";
  return xml;
};

// Write sitemap to file
const sitemap = generateSitemapXml();
const outputPath = path.resolve(__dirname, "../public/sitemap.xml");

fs.writeFileSync(outputPath, sitemap);
console.log(`✅ Sitemap generated at ${outputPath}`);

// Export for potential programmatic use
export { generateSitemapXml };

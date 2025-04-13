/**
 * SEO Schema Definitions for JSON-LD
 * These schemas help search engines understand the content and structure of the website
 */

/**
 * Organization schema for the company
 * @returns {Object} Organization schema in JSON-LD format
 */
export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Veloria",
  url: "https://veloria.in",
  logo: "https://veloria.in/favicon.png",
  sameAs: [
    "https://www.facebook.com/veloria",
    "https://www.linkedin.com/company/veloria",
    "https://twitter.com/veloria_agency",
    "https://www.instagram.com/veloria_agency",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91 9315360595",
    contactType: "customer service",
    email: "info@veloria.in",
    availableLanguage: ["English", "Hindi"],
  },
  address: {
    "@type": "PostalAddress",
    addressCountry: "India",
    addressRegion: "Delhi",
    addressLocality: "New Delhi",
  },
  description:
    "Veloria is a leading web design and development agency in India providing custom software, mobile apps, and IT services for businesses of all sizes.",
});

/**
 * LocalBusiness schema extends Organization with local business information
 * @returns {Object} LocalBusiness schema in JSON-LD format
 */
export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Veloria Web Development Agency",
  image: "https://veloria.in/favicon.png",
  url: "https://veloria.in",
  telephone: "+91 9315360595",
  email: "info@veloria.in",
  address: {
    "@type": "PostalAddress",
    addressCountry: "India",
    addressRegion: "Delhi",
    addressLocality: "New Delhi",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: "28.6139",
    longitude: "77.2090",
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  priceRange: "₹₹",
});

/**
 * Service schema for individual services
 * @param {string} name - Service name
 * @param {string} description - Service description
 * @param {string} url - Service page URL
 * @returns {Object} Service schema in JSON-LD format
 */
export const getServiceSchema = (name, description, url) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  serviceType: name,
  provider: {
    "@type": "Organization",
    name: "Veloria",
    url: "https://veloria.in",
  },
  name: name,
  description: description,
  url: url,
  areaServed: {
    "@type": "Country",
    name: "India",
  },
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Development Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: name,
        },
      },
    ],
  },
});

/**
 * WebPage schema for individual pages
 * @param {string} title - Page title
 * @param {string} description - Page description
 * @param {string} url - Page URL
 * @returns {Object} WebPage schema in JSON-LD format
 */
export const getWebPageSchema = (title, description, url) => ({
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: title,
  description: description,
  url: url,
  isPartOf: {
    "@type": "WebSite",
    name: "Veloria",
    url: "https://veloria.in",
  },
  publisher: {
    "@type": "Organization",
    name: "Veloria",
    logo: {
      "@type": "ImageObject",
      url: "https://veloria.in/favicon.png",
    },
  },
});

/**
 * WebSite schema for the entire website
 * @returns {Object} WebSite schema in JSON-LD format
 */
export const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Veloria",
  url: "https://veloria.in",
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: "https://veloria.in/search?q={search_term_string}",
    },
    "query-input": "required name=search_term_string",
  },
});

/**
 * BreadcrumbList schema for navigation breadcrumbs
 * @param {Array} items - Array of breadcrumb items
 * @returns {Object} BreadcrumbList schema in JSON-LD format
 */
export const getBreadcrumbSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

/**
 * FAQ schema for FAQ sections
 * @param {Array} items - Array of FAQ items with question and answer properties
 * @returns {Object} FAQPage schema in JSON-LD format
 */
export const getFAQSchema = (items) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

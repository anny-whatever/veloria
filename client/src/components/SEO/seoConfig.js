/**
 * SEO Configuration for Veloria website
 */

// Company Information
export const COMPANY_INFO = {
  name: "Veloria",
  fullName: "Veloria - Web Design & Development Agency",
  description:
    "Veloria is a leading web design and development agency in India offering custom software, mobile app development, and IT services for businesses of all sizes.",
  domain: "veloria.in",
  url: "https://veloria.in",
  email: "info@veloria.in",
  phone: "+91 9315360595",
  address: "India",
  socialProfiles: {
    facebook: "https://facebook.com/veloria",
    twitter: "https://twitter.com/veloria",
    linkedin: "https://linkedin.com/company/veloria",
    instagram: "https://instagram.com/veloria",
  },
  foundingDate: "2022", // Update with actual founding date
};

// Page-specific SEO settings
export const PAGE_SEO = {
  home: {
    title: "Veloria | Leading Web & App Development Company in India",
    description:
      "Veloria is a premier web and mobile app development company in India offering custom software solutions, IT services, and management systems for hotels, schools, and healthcare.",
    keywords:
      "web development company India, app development company India, IT solutions provider India, custom software development India",
  },
  services: {
    title: "Our Services | Web, Mobile & Custom Software Development | Veloria",
    description:
      "Explore our comprehensive web development, mobile app, and custom software development services. Specializing in management systems for hotels, schools, hospitals, and e-commerce solutions.",
    keywords:
      "web development services, mobile app development services, custom software development India, management system development, IT solutions provider India",
  },
  portfolio: {
    title: "Our Work | Web & App Development Projects | Veloria",
    description:
      "View our portfolio of successful web and mobile app development projects. Featuring custom management systems, e-commerce solutions, and innovative software applications.",
    keywords:
      "web development portfolio, app development projects, software development case studies, India development agency projects",
  },
  about: {
    title: "About Veloria | Leading Software Development Agency in India",
    description:
      "Learn about Veloria, a top-rated web development and IT solutions company in India. Our team of experts delivers exceptional digital experiences and custom software solutions.",
    keywords:
      "web development company India, app development company India, software development agency, IT solutions provider India",
  },
  contact: {
    title: "Contact Us | Veloria - Web & App Development Agency",
    description:
      "Get in touch with Veloria for your web development, app development, or custom software needs. Based in India, we serve clients worldwide.",
    keywords:
      "contact web development agency, hire app developers India, custom software development company contact, IT solutions provider contact",
  },
  getStarted: {
    title: "Get Started | Begin Your Project with Veloria",
    description:
      "Start your web development, mobile app, or custom software project with Veloria. Fill out our project form and let's create something amazing together.",
    keywords:
      "hire web developers India, start app development project, custom software development project, management system development India",
  },
  privacyPolicy: {
    title: "Privacy Policy | Veloria",
    description:
      "Read Veloria's Privacy Policy to understand how we collect, use, and protect your personal information when you use our website and services.",
    keywords:
      "privacy policy, privacy statement, data protection, information security, web development company privacy",
  },
  termsOfService: {
    title: "Terms of Service | Veloria",
    description:
      "Review Veloria's Terms of Service that govern your use of our website and services. Understanding our terms helps ensure a positive experience for all users.",
    keywords:
      "terms of service, terms and conditions, user agreement, legal terms, web development company terms",
  },
};

// Keyword collections by category
export const KEYWORD_GROUPS = {
  // Core Web & App Development Services
  coreServices: [
    "web development company India",
    "app development company India",
    "mobile app development services",
    "custom software development India",
    "web application development",
    "website design and development",
    "full-stack development services",
    "progressive Web App development",
    "cross-platform app development",
    "native app development",
    "IT solutions provider India",
    "software development agency",
  ],

  // Management System Specializations
  managementSystems: [
    "hotel management system development",
    "custom hotel management software India",
    "hotel booking engine development",
    "school management system development",
    "school ERP software India",
    "college management system development",
    "college ERP solutions",
    "education management software",
    "payroll management system development",
    "custom payroll software India",
    "HRMS development services",
    "hospital management system development",
    "clinic management software development",
    "healthcare management software",
    "institution management system software",
    "membership management system development",
    "inventory management system development",
    "custom ERP development India",
    "CRM development services",
    "booking and reservation system development",
  ],

  // Ecommerce Focus
  ecommerce: [
    "ecommerce website development India",
    "ecommerce app development company",
    "online store development services",
    "custom ecommerce platform development",
    "ecommerce solutions provider India",
    "build online store India",
    "B2B ecommerce development",
    "B2C ecommerce solutions",
    "marketplace development services",
    "Shopify development agency India",
    "Magento development services India",
    "WooCommerce development company",
    "ecommerce website design",
    "mobile commerce app development",
    "ecommerce integration services",
  ],

  // Combined & Long-Tail Keywords
  longTail: [
    "web and app development for hotels",
    "school management software development company",
    "custom management system development India",
    "develop hospital management app",
    "build ecommerce website and app",
    "payroll software for small business India",
    "affordable web development India",
    "enterprise software development India",
  ],

  // Location-Specific
  locations: [
    "web development company Mumbai",
    "app developers Bangalore",
    "ecommerce solutions Delhi",
    "hotel software development Chennai",
    "software development company India",
    "IT services provider India",
  ],
};

/**
 * Generate structured data for Organization
 */
export const getOrganizationSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: COMPANY_INFO.name,
    url: COMPANY_INFO.url,
    logo: `${COMPANY_INFO.url}/images/logo.png`,
    email: COMPANY_INFO.email,
    telephone: COMPANY_INFO.phone,
    description: COMPANY_INFO.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "India",
    },
    sameAs: [
      COMPANY_INFO.socialProfiles.facebook,
      COMPANY_INFO.socialProfiles.twitter,
      COMPANY_INFO.socialProfiles.linkedin,
      COMPANY_INFO.socialProfiles.instagram,
    ],
    foundingDate: COMPANY_INFO.foundingDate,
  };
};

/**
 * Generate structured data for LocalBusiness
 */
export const getLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: COMPANY_INFO.name,
    image: `${COMPANY_INFO.url}/images/logo.png`,
    url: COMPANY_INFO.url,
    telephone: COMPANY_INFO.phone,
    email: COMPANY_INFO.email,
    priceRange: "₹₹₹",
    description: COMPANY_INFO.description,
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "India",
    },
    geo: {
      "@type": "GeoCoordinates",
      // Add latitude and longitude if you have a specific location
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "09:00",
      closes: "18:00",
    },
    sameAs: [
      COMPANY_INFO.socialProfiles.facebook,
      COMPANY_INFO.socialProfiles.twitter,
      COMPANY_INFO.socialProfiles.linkedin,
      COMPANY_INFO.socialProfiles.instagram,
    ],
  };
};

/**
 * Generate structured data for a Service
 */
export const getServiceSchema = (service) => {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    provider: {
      "@type": "Organization",
      name: COMPANY_INFO.name,
      url: COMPANY_INFO.url,
    },
    description: service.description,
    name: service.name,
    url: `${COMPANY_INFO.url}/services/${service.slug}`,
  };
};

/**
 * Generate structured data for legal pages like Privacy Policy or Terms of Service
 */
export const getLegalPageSchema = (pageType, lastUpdated) => {
  const types = {
    "privacy-policy": {
      name: "Privacy Policy",
      type: "PrivacyPolicy",
    },
    "terms-of-service": {
      name: "Terms of Service",
      type: "TermsOfService",
    },
  };

  const pageInfo = types[pageType] || {
    name:
      pageType.charAt(0).toUpperCase() + pageType.slice(1).replace(/-/g, " "),
    type: "WebPage",
  };

  return {
    "@context": "https://schema.org",
    "@type": pageInfo.type,
    name: `${pageInfo.name} | ${COMPANY_INFO.name}`,
    url: `${COMPANY_INFO.url}/${pageType}`,
    lastUpdated: lastUpdated || new Date().toISOString().split("T")[0],
    publisher: {
      "@type": "Organization",
      name: COMPANY_INFO.name,
      url: COMPANY_INFO.url,
    },
    inLanguage: "en-IN",
  };
};

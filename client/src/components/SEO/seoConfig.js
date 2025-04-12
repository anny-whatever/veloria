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
    title:
      "Web Design & Development Agency | Custom Software & ERP Solutions | Veloria",
    description:
      "Expert web design, development and custom software agency specializing in ERP systems, business applications and enterprise IT solutions for growing companies.",
    keywords:
      "web design agency, website development company, custom software development, ERP development services, IT solutions provider, web application development",
  },
  services: {
    title:
      "Web Development, Custom Software & ERP Development Services | Veloria",
    description:
      "Professional web development, custom software and ERP systems development services. Specializing in business applications, management systems and IT solutions.",
    keywords:
      "web development services, custom software development, ERP development services, management system development, business IT solutions, custom application development",
  },
  portfolio: {
    title:
      "Web Design & Development Portfolio | Custom Software Projects | Veloria",
    description:
      "Explore our web design, custom software and ERP system development projects. Featuring enterprise applications, management systems and software solutions.",
    keywords:
      "web development portfolio, custom software projects, ERP system development, management system projects, business application examples",
  },
  about: {
    title: "Top Web Design & Software Development Agency | Veloria",
    description:
      "Veloria is a leading web design and custom software development agency. Our experts deliver enterprise-grade applications and management systems.",
    keywords:
      "top web design agency, best software development company, custom ERP developers, enterprise application development, UI/UX design services",
  },
  contact: {
    title:
      "Contact Us | Web Design & Custom Software Development Agency | Veloria",
    description:
      "Get in touch with Veloria for professional web design, custom software development and ERP implementation services. Free consultation available.",
    keywords:
      "contact web development agency, hire custom software developers, ERP implementation partners, IT solutions consultation",
  },
  getStarted: {
    title: "Start Your Web Design or Software Development Project | Veloria",
    description:
      "Begin your web design, custom software or ERP system development project with Veloria. Professional solutions tailored to your business requirements.",
    keywords:
      "hire web developers, start software development project, custom ERP development, management system implementation",
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
    "@id": "https://veloria.in/#organization",
    name: "Veloria - Web Design & Development Agency",
    image: `${COMPANY_INFO.url}/images/logo.png`,
    url: COMPANY_INFO.url,
    telephone: COMPANY_INFO.phone,
    email: COMPANY_INFO.email,
    priceRange: "₹₹₹",
    description:
      "Professional web design, development and custom software agency specializing in ERP systems, business applications and enterprise software solutions.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
      addressRegion: "India",
    },
    geo: {
      "@type": "GeoCoordinates",
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
    name: service.name,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: COMPANY_INFO.name,
      url: COMPANY_INFO.url,
    },
    url: `${COMPANY_INFO.url}/services/${service.slug}`,
    offers: {
      "@type": "Offer",
      availability: "http://schema.org/InStock",
      price: "",
      priceCurrency: "INR",
    },
    category: "Web and Software Development Services",
    audience: {
      "@type": "BusinessAudience",
      audienceType: "Businesses requiring digital solutions",
    },
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

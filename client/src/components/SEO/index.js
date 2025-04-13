import SeoHead from "./SeoHead";
import {
  COMPANY_INFO,
  KEYWORD_GROUPS,
  getOrganizationSchema,
  getLocalBusinessSchema,
  getServiceSchema,
  getLegalPageSchema,
  getStartedPageSchema,
} from "./seoConfig";
import BacklinkHelper from "./BacklinkHelper";
import LinkBuildingStrategy from "./LinkBuildingStrategy";

// Import schema generators
import {
  getServiceSchema as getServiceSchemaGenerator,
  getProjectSchema,
  getFaqSchema,
  getPersonSchema,
} from "./schemaGenerators";

// Export all the schema generators
export * from "./schemas";
export { default as SeoHead } from "./SeoHead";
export { default as BacklinkHelper } from "./BacklinkHelper";
export { default as LinkBuildingStrategy } from "./LinkBuildingStrategy";

// Page SEO data for consistent metadata across the site
export const PAGE_SEO = {
  home: {
    title: "Veloria | Web Design & Development Agency India",
    description:
      "Veloria is a leading web design and development agency in India providing custom software, mobile apps, and IT services for businesses of all sizes.",
    keywords:
      "web development company India, app development company India, IT solutions provider India, custom software development",
    canonical: "https://veloria.in/",
  },
  services: {
    title: "Our Services | Web, Mobile & Software Development - Veloria",
    description:
      "Expert web, mobile, and custom software development services. We build high-performance solutions tailored to your business needs.",
    keywords:
      "web development services, mobile app development, custom software solutions, UI/UX design services, database solutions",
    canonical: "https://veloria.in/services",
  },
  webDevelopment: {
    title: "Professional Web Development Services | Veloria",
    description:
      "Custom website development services from expert developers. We create responsive, high-performance websites that drive business growth.",
    keywords:
      "web development services, responsive website design, ecommerce website development, custom web applications",
    canonical: "https://veloria.in/services/web-development",
  },
  mobileDevelopment: {
    title: "Mobile App Development Services | iOS & Android Apps - Veloria",
    description:
      "Professional mobile app development for iOS and Android. We build custom, high-performance mobile applications that users love.",
    keywords:
      "mobile app development, iOS app development, Android app development, cross-platform apps",
    canonical: "https://veloria.in/services/mobile-app-development",
  },
  customSoftware: {
    title: "Custom Software Development Services | Veloria",
    description:
      "Tailored software solutions designed for your unique business needs. We build custom, scalable software that improves productivity and growth.",
    keywords:
      "custom software development, bespoke software solutions, enterprise software development, software consulting",
    canonical: "https://veloria.in/services/custom-software-development",
  },
  uiUxDesign: {
    title: "UI/UX Design Services | User Experience Design - Veloria",
    description:
      "Professional UI/UX design services that create beautiful, intuitive interfaces and exceptional user experiences for web and mobile apps.",
    keywords:
      "UI/UX design services, user experience design, interface design, UX consulting, UI design agency",
    canonical: "https://veloria.in/services/ui-ux-design",
  },
  getStarted: {
    title: "Get Started with Veloria | Book a Free Consultation",
    description:
      "Ready to start your project? Book a free consultation with our experts and get a custom solution for your business needs.",
    keywords:
      "book consultation, free consultation, project quote, software development consultation",
    canonical: "https://veloria.in/get-started",
  },
  privacyPolicy: {
    title: "Privacy Policy | Veloria",
    description:
      "Read about our privacy policy and how we protect your data at Veloria.",
    keywords:
      "privacy policy, data protection, privacy terms, confidentiality policy",
    canonical: "https://veloria.in/privacy-policy",
  },
  termsOfService: {
    title: "Terms of Service | Veloria",
    description:
      "Read about our terms of service and conditions for using Veloria services and products.",
    keywords:
      "terms of service, terms and conditions, service agreement, legal terms",
    canonical: "https://veloria.in/terms-of-service",
  },
  notFound: {
    title: "Page Not Found | 404 Error - Veloria",
    description:
      "The page you are looking for does not exist. Return to our homepage or contact us for assistance.",
    keywords: "404, page not found, error page, missing page",
    canonical: "https://veloria.in/404",
  },
};

export {
  COMPANY_INFO,
  KEYWORD_GROUPS,
  getOrganizationSchema,
  getLocalBusinessSchema,
  getServiceSchema,
  getServiceSchemaGenerator,
  getProjectSchema,
  getFaqSchema,
  getPersonSchema,
  getLegalPageSchema,
  getStartedPageSchema,
};

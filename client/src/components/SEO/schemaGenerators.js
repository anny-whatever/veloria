/**
 * Schema.org generators for structured data
 * This file contains functions to generate various schema.org structured data
 */

import { COMPANY_INFO } from "./seoConfig";

/**
 * Generate structured data for a Service
 * @param {Object} service - Service details
 * @returns {Object} - Schema.org Service structured data
 */
export const getServiceSchema = (service) => {
  if (!service) return null;

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
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      price: service.price || "Custom",
      priceCurrency: service.priceCurrency || "INR",
    },
    areaServed: {
      "@type": "Country",
      name: "India",
    },
    audience: {
      "@type": "Audience",
      audienceType: service.audience || "Businesses and Organizations",
    },
  };
};

/**
 * Generate structured data for a Project
 * @param {Object} project - Project details
 * @returns {Object} - Schema.org CreativeWork structured data
 */
export const getProjectSchema = (project) => {
  if (!project) return null;

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    author: {
      "@type": "Organization",
      name: COMPANY_INFO.name,
      url: COMPANY_INFO.url,
    },
    datePublished: project.completionDate,
    image:
      project.imageUrl ||
      `${COMPANY_INFO.url}/images/portfolio/${project.slug}.jpg`,
    url: `${COMPANY_INFO.url}/portfolio/${project.slug}`,
    keywords: project.technologies?.join(", "),
  };
};

/**
 * Generate structured data for a FAQ
 * @param {Array} faqItems - Array of FAQ items with question and answer
 * @returns {Object} - Schema.org FAQPage structured data
 */
export const getFaqSchema = (faqItems) => {
  if (!faqItems || !faqItems.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
};

/**
 * Generate structured data for a Person (team member)
 * @param {Object} person - Person details
 * @returns {Object} - Schema.org Person structured data
 */
export const getPersonSchema = (person) => {
  if (!person) return null;

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.jobTitle,
    description: person.bio,
    image: person.imageUrl,
    sameAs: [person.linkedin, person.twitter, person.github].filter(Boolean),
    worksFor: {
      "@type": "Organization",
      name: COMPANY_INFO.name,
      url: COMPANY_INFO.url,
    },
  };
};

import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

/**
 * LinkBuildingStrategy - A component to help with backlink and SEO optimization
 *
 * This implements advanced SEO features to enhance the site's backlink profile
 * and optimize external links for better SEO performance.
 */
const LinkBuildingStrategy = ({
  citations = [],
  authorDetails = null,
  industry = "Web Development",
  includeStructuredData = true,
  isHomepage = false,
  currentPageUrl,
}) => {
  // Generate citation structured data
  const citationSchema =
    citations.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "Article",
          citation: citations.map((citation) => ({
            "@type": "CreativeWork",
            name: citation.title,
            url: citation.url,
          })),
        }
      : null;

  // Generate author schema if author details are provided
  const authorSchema = authorDetails
    ? {
        "@context": "https://schema.org",
        "@type": "Person",
        name: authorDetails.name,
        url: authorDetails.url,
        jobTitle: authorDetails.jobTitle || "Web Developer",
        worksFor: {
          "@type": "Organization",
          name: "Veloria",
          url: "https://veloria.in",
        },
      }
    : null;

  // Generate industry-specific schema
  const industrySchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    specialty: industry,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": currentPageUrl || "https://veloria.in/",
    },
  };

  // For homepage, add website schema with sitelinks search box
  const websiteSchema = isHomepage
    ? {
        "@context": "https://schema.org",
        "@type": "WebSite",
        url: "https://veloria.in/",
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://veloria.in/search?q={search_term_string}",
          },
          "query-input": "required name=search_term_string",
        },
      }
    : null;

  return (
    <Helmet>
      {/* Citation reference links with proper attributes for SEO */}
      {citations.map((citation, index) => (
        <link
          key={`citation-${index}`}
          rel="citation"
          href={citation.url}
          title={citation.title}
          data-citation-type={citation.type || "reference"}
        />
      ))}

      {/* Add structured data schemas */}
      {includeStructuredData && citationSchema && (
        <script type="application/ld+json">
          {JSON.stringify(citationSchema)}
        </script>
      )}

      {includeStructuredData && authorSchema && (
        <script type="application/ld+json">
          {JSON.stringify(authorSchema)}
        </script>
      )}

      {includeStructuredData && (
        <script type="application/ld+json">
          {JSON.stringify(industrySchema)}
        </script>
      )}

      {includeStructuredData && websiteSchema && (
        <script type="application/ld+json">
          {JSON.stringify(websiteSchema)}
        </script>
      )}

      {/* Add industry-specific meta tags */}
      <meta name="industry" content={industry} />
      <meta name="generator" content="Veloria Web Development" />
      <meta name="subject" content={`${industry} Services in India`} />

      {/* Set referrer policy for outbound links */}
      <meta name="referrer" content="origin-when-cross-origin" />
    </Helmet>
  );
};

LinkBuildingStrategy.propTypes = {
  citations: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      type: PropTypes.string,
    })
  ),
  authorDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string,
    jobTitle: PropTypes.string,
  }),
  industry: PropTypes.string,
  includeStructuredData: PropTypes.bool,
  isHomepage: PropTypes.bool,
  currentPageUrl: PropTypes.string,
};

export default LinkBuildingStrategy;

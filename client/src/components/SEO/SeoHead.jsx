import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

/**
 * SEO component for optimizing pages for search engines
 */
const SeoHead = ({
  title,
  description,
  canonicalUrl,
  ogType = "website",
  ogImage,
  pathname,
  keywords,
  structuredData,
  noIndex = false,
}) => {
  // Base URL for the website
  const siteUrl = "https://veloria.in";

  // Create the canonical URL
  const canonical = canonicalUrl || `${siteUrl}${pathname || ""}`;

  // Default image for social sharing
  const defaultOgImage = `${siteUrl}/images/veloria-og-image.jpg`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage || defaultOgImage} />
      <meta
        property="og:site_name"
        content="Veloria - Web Design & Development Agency"
      />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage || defaultOgImage} />

      {/* Contact Information */}
      <meta name="contact" content="info@veloria.in" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />

      {/* No index if needed */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Structured Data / Schema.org */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

SeoHead.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  canonicalUrl: PropTypes.string,
  ogType: PropTypes.string,
  ogImage: PropTypes.string,
  pathname: PropTypes.string,
  keywords: PropTypes.string,
  structuredData: PropTypes.object,
  noIndex: PropTypes.bool,
};

export default SeoHead;

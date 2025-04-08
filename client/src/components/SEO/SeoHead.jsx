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
  alternateLanguages = [],
  author = "Veloria",
  publishedDate,
  modifiedDate,
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

      {/* Author and dates for better SEO */}
      <meta name="author" content={author} />
      {publishedDate && (
        <meta name="article:published_time" content={publishedDate} />
      )}
      {modifiedDate && (
        <meta name="article:modified_time" content={modifiedDate} />
      )}

      {/* Alternate language versions for international SEO */}
      {alternateLanguages.map((lang) => (
        <link
          key={lang.code}
          rel="alternate"
          hrefLang={lang.code}
          href={`${siteUrl}${lang.path || pathname}`}
        />
      ))}
      {alternateLanguages.length > 0 && (
        <link rel="alternate" hrefLang="x-default" href={canonical} />
      )}

      {/* Rich snippet optimization tags */}
      <meta
        property="article:publisher"
        content="https://www.facebook.com/veloria"
      />
      <meta property="article:section" content="Technology" />

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
      <meta name="twitter:site" content="@veloria_in" />
      <meta name="twitter:creator" content="@veloria_in" />

      {/* Contact Information */}
      <meta name="contact" content="info@veloria.in" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />

      {/* No index if needed */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      {!noIndex && (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}

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
  alternateLanguages: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.string.isRequired,
      path: PropTypes.string,
    })
  ),
  author: PropTypes.string,
  publishedDate: PropTypes.string,
  modifiedDate: PropTypes.string,
};

export default SeoHead;

import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet-async";

/**
 * SeoHead Component
 * Handles all meta tags, structured data, and other SEO elements
 */
const SeoHead = ({
  title,
  description,
  keywords,
  pathname,
  structuredData,
  image = "https://veloria.in/og-image.jpg",
  type = "website",
  article = {},
  noIndex = false,
  children,
}) => {
  // Determine canonical URL
  const siteUrl = "https://veloria.in";
  const canonical = `${siteUrl}${pathname}`;

  // Format structured data as string
  const structuredDataJson = structuredData
    ? JSON.stringify(structuredData)
    : "";

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}

      {/* Canonical Link */}
      <link rel="canonical" href={canonical} />

      {/* OpenGraph and Facebook */}
      <meta property="og:site_name" content="Veloria" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content={title} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@veloria_agency" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Article Specific (if applicable) */}
      {type === "article" && (
        <>
          {article.publishedTime && (
            <meta
              property="article:published_time"
              content={article.publishedTime}
            />
          )}
          {article.modifiedTime && (
            <meta
              property="article:modified_time"
              content={article.modifiedTime}
            />
          )}
          {article.author && (
            <meta property="article:author" content={article.author} />
          )}
          {article.section && (
            <meta property="article:section" content={article.section} />
          )}
          {article.tags &&
            article.tags.map((tag, i) => (
              <meta property="article:tag" content={tag} key={i} />
            ))}
        </>
      )}

      {/* No-index directive if needed */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}

      {/* Mobile-specific */}
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, viewport-fit=cover"
      />
      <meta name="theme-color" content="#3b82f6" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta
        name="apple-mobile-web-app-status-bar-style"
        content="black-translucent"
      />

      {/* Structured Data */}
      {structuredDataJson && (
        <script type="application/ld+json">{structuredDataJson}</script>
      )}

      {/* Additional content */}
      {children}
    </Helmet>
  );
};

SeoHead.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  keywords: PropTypes.string,
  pathname: PropTypes.string.isRequired,
  structuredData: PropTypes.object,
  image: PropTypes.string,
  type: PropTypes.string,
  article: PropTypes.shape({
    publishedTime: PropTypes.string,
    modifiedTime: PropTypes.string,
    author: PropTypes.string,
    section: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
  noIndex: PropTypes.bool,
  children: PropTypes.node,
};

export default SeoHead;

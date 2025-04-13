import React from "react";
import PropTypes from "prop-types";

/**
 * LinkBuildingStrategy Component
 *
 * Creates hidden but crawlable markup for establishing page authority,
 * entity relationships, and topical relevance to search engines.
 */
const LinkBuildingStrategy = ({
  isHomepage = false,
  currentPageUrl,
  industry,
  authorDetails,
  citations = [],
}) => {
  // Don't render in development mode to avoid confusion
  if (process.env.NODE_ENV === "development") {
    return null;
  }

  return (
    <div
      className="link-building-wrapper"
      style={{
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        borderWidth: "0",
      }}
      aria-hidden="true"
    >
      {/* Entity association */}
      <div
        className="entity-association"
        itemScope
        itemType="https://schema.org/WebPage"
      >
        <meta itemProp="url" content={currentPageUrl} />

        {isHomepage && (
          <meta
            itemProp="isPartOf"
            itemType="https://schema.org/WebSite"
            content="Veloria"
          />
        )}

        {/* Industry association for topical relevance */}
        {industry && (
          <div itemProp="about" itemScope itemType="https://schema.org/Thing">
            <meta itemProp="name" content={industry} />
          </div>
        )}

        {/* Author association for E-E-A-T signals */}
        {authorDetails && (
          <div itemProp="author" itemScope itemType="https://schema.org/Person">
            <meta itemProp="name" content={authorDetails.name} />
            {authorDetails.url && (
              <link itemProp="url" href={authorDetails.url} />
            )}
            {authorDetails.jobTitle && (
              <meta itemProp="jobTitle" content={authorDetails.jobTitle} />
            )}
          </div>
        )}

        {/* Citations for authority building */}
        {citations.length > 0 && (
          <div className="citations-wrapper">
            <p>References:</p>
            <ul>
              {citations.map((citation, index) => (
                <li key={`citation-${index}`} className="citation-item">
                  <a href={citation.url} rel="nofollow noreferrer">
                    {citation.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

LinkBuildingStrategy.propTypes = {
  isHomepage: PropTypes.bool,
  currentPageUrl: PropTypes.string.isRequired,
  industry: PropTypes.string,
  authorDetails: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string,
    jobTitle: PropTypes.string,
  }),
  citations: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      type: PropTypes.string,
    })
  ),
};

export default LinkBuildingStrategy;

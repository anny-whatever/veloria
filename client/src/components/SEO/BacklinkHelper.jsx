import React from "react";
import PropTypes from "prop-types";

/**
 * BacklinkHelper Component
 *
 * This component renders hidden (but crawlable) links to important resources
 * to improve SEO through strategic internal and external linking.
 * The links are visually hidden but accessible to search engines.
 */
const BacklinkHelper = ({
  references = [],
  citations = [],
  includeAttributes = false,
  authorshipMarkup = false,
}) => {
  // Don't render in development mode to avoid confusion
  if (process.env.NODE_ENV === "development") {
    return (
      <div data-testid="backlink-helper-dev" style={{ display: "none" }} />
    );
  }

  return (
    <div
      className="seo-helper"
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
      {references.length > 0 && (
        <div className="seo-references">
          <p>Further reading:</p>
          <ul>
            {references.map((reference, index) => (
              <li key={`ref-${index}`}>
                <a
                  href={reference.url}
                  rel={includeAttributes ? "noopener noreferrer" : undefined}
                  title={reference.title}
                >
                  {reference.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {citations.length > 0 && (
        <div className="seo-citations">
          <p>Citations:</p>
          <ul>
            {citations.map((citation, index) => (
              <li key={`cite-${index}`}>
                <cite>
                  <a
                    href={citation.url}
                    rel={includeAttributes ? "noopener noreferrer" : undefined}
                    title={citation.title}
                  >
                    {citation.title}
                  </a>
                  {citation.author && <span> by {citation.author}</span>}
                </cite>
              </li>
            ))}
          </ul>
        </div>
      )}

      {authorshipMarkup && (
        <div className="seo-authorship">
          <p>Article by:</p>
          <div itemProp="author" itemScope itemType="https://schema.org/Person">
            <span itemProp="name">Veloria Team</span>
            <link itemProp="url" href="https://veloria.in/about" />
          </div>
        </div>
      )}
    </div>
  );
};

BacklinkHelper.propTypes = {
  references: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ),
  citations: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
      author: PropTypes.string,
    })
  ),
  includeAttributes: PropTypes.bool,
  authorshipMarkup: PropTypes.bool,
};

export default BacklinkHelper;

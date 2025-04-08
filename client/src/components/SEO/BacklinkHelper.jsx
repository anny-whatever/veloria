import { useEffect } from "react";
import PropTypes from "prop-types";

/**
 * BacklinkHelper component for improving backlink strategy
 *
 * This component adds structured data and attribution links to help with
 * backlink building and SEO.
 */
const BacklinkHelper = ({
  includeAttributes = true,
  authorshipMarkup = true,
  references = [],
  citations = [],
}) => {
  useEffect(() => {
    // Create backlink attribution markup
    if (includeAttributes) {
      const footer = document.querySelector("footer");
      if (footer) {
        // Create attribution container if it doesn't exist
        let attributionContainer = document.querySelector(".attribution-links");
        if (!attributionContainer) {
          attributionContainer = document.createElement("div");
          attributionContainer.className =
            "attribution-links text-sm opacity-80 mt-6";
          attributionContainer.setAttribute("data-nosnippet", "true");
          footer.appendChild(attributionContainer);
        }

        // Add references
        if (references.length > 0) {
          const referencesHeader = document.createElement("p");
          referencesHeader.className = "font-medium mt-2 mb-1";
          referencesHeader.textContent = "References:";
          attributionContainer.appendChild(referencesHeader);

          const refList = document.createElement("ul");
          refList.className = "list-disc pl-5 space-y-1";

          references.forEach((ref) => {
            const item = document.createElement("li");
            const link = document.createElement("a");
            link.href = ref.url;
            link.textContent = ref.title;
            link.rel = "noopener noreferrer";
            link.className =
              "hover:underline text-primary-600 dark:text-primary-400";
            item.appendChild(link);
            refList.appendChild(item);
          });

          attributionContainer.appendChild(refList);
        }

        // Add citations
        if (citations.length > 0) {
          const citationsHeader = document.createElement("p");
          citationsHeader.className = "font-medium mt-2 mb-1";
          citationsHeader.textContent = "Citations:";
          attributionContainer.appendChild(citationsHeader);

          const citeList = document.createElement("ul");
          citeList.className = "list-disc pl-5 space-y-1";

          citations.forEach((cite) => {
            const item = document.createElement("li");
            const link = document.createElement("a");
            link.href = cite.url;
            link.textContent = cite.title;
            link.rel = "noopener noreferrer";
            link.className =
              "hover:underline text-primary-600 dark:text-primary-400";
            item.appendChild(link);
            if (cite.author) {
              const authorSpan = document.createElement("span");
              authorSpan.textContent = ` by ${cite.author}`;
              authorSpan.className = "text-sm opacity-80";
              item.appendChild(authorSpan);
            }
            citeList.appendChild(item);
          });

          attributionContainer.appendChild(citeList);
        }
      }
    }

    // Add hidden authorship markup for search engines
    if (authorshipMarkup) {
      let authorLink = document.querySelector('link[rel="author"]');
      if (!authorLink) {
        authorLink = document.createElement("link");
        authorLink.rel = "author";
        authorLink.href = "https://veloria.in/about";
        document.head.appendChild(authorLink);
      }
    }

    // Cleanup function
    return () => {
      if (!includeAttributes) {
        const attributionContainer =
          document.querySelector(".attribution-links");
        if (attributionContainer) {
          attributionContainer.remove();
        }
      }
    };
  }, [includeAttributes, authorshipMarkup, references, citations]);

  return null; // This is a non-rendering component
};

BacklinkHelper.propTypes = {
  includeAttributes: PropTypes.bool,
  authorshipMarkup: PropTypes.bool,
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
};

export default BacklinkHelper;

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
          attributionContainer.className = "attribution-links";
          footer.appendChild(attributionContainer);
        }

        // Clear any existing content
        attributionContainer.innerHTML = "";

        // Add styled container
        attributionContainer.className =
          "attribution-links mt-8 pt-6 border-t border-gray-200 dark:border-gray-800";

        // Create flex container for references and citations
        const flexContainer = document.createElement("div");
        flexContainer.className = "grid grid-cols-1 md:grid-cols-2 gap-6";
        attributionContainer.appendChild(flexContainer);

        // Add references
        if (references.length > 0) {
          const referencesContainer = document.createElement("div");
          referencesContainer.className = "references-section";

          const referencesHeader = document.createElement("h4");
          referencesHeader.className =
            "text-lg font-semibold mb-3 text-gray-900 dark:text-white";
          referencesHeader.textContent = "References";
          referencesContainer.appendChild(referencesHeader);

          const refList = document.createElement("div");
          refList.className = "grid grid-cols-2 gap-3";

          references.forEach((ref) => {
            const item = document.createElement("div");
            item.className = "reference-item";

            const link = document.createElement("a");
            link.href = ref.url;
            link.textContent = ref.title;
            link.rel = "noopener noreferrer";
            link.className =
              "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors flex items-center";

            // Add arrow icon
            const arrowIcon = document.createElement("span");
            arrowIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>`;
            link.appendChild(arrowIcon);

            item.appendChild(link);
            refList.appendChild(item);
          });

          referencesContainer.appendChild(refList);
          flexContainer.appendChild(referencesContainer);
        }

        // Add citations
        if (citations.length > 0) {
          const citationsContainer = document.createElement("div");
          citationsContainer.className = "citations-section";

          const citationsHeader = document.createElement("h4");
          citationsHeader.className =
            "text-lg font-semibold mb-3 text-gray-900 dark:text-white";
          citationsHeader.textContent = "Citations";
          citationsContainer.appendChild(citationsHeader);

          const citeList = document.createElement("div");
          citeList.className = "grid grid-cols-2 gap-3";

          citations.forEach((cite) => {
            const item = document.createElement("div");
            item.className = "citation-item";

            const link = document.createElement("a");
            link.href = cite.url;
            link.textContent = cite.title;
            link.rel = "noopener noreferrer";
            link.className =
              "text-gray-700 hover:text-primary-600 dark:text-gray-300 dark:hover:text-primary-400 transition-colors flex items-center";

            // Add arrow icon
            const arrowIcon = document.createElement("span");
            arrowIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>`;
            link.appendChild(arrowIcon);

            item.appendChild(link);

            if (cite.author) {
              const authorSpan = document.createElement("span");
              authorSpan.textContent = ` by ${cite.author}`;
              authorSpan.className = "text-sm text-gray-500 dark:text-gray-400";
              item.appendChild(authorSpan);
            }

            citeList.appendChild(item);
          });

          citationsContainer.appendChild(citeList);
          flexContainer.appendChild(citationsContainer);
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

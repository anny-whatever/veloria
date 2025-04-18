import { useState, useEffect } from "react";

/**
 * Custom hook for responsive design - checks if the current viewport matches the provided media query
 * @param {Object} query - Media query object with maxWidth, minWidth, etc.
 * @returns {Boolean} - Whether the current viewport matches the query
 */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Create the media query
    const mediaQuery = window.matchMedia(createMediaQueryString(query));

    // Set the initial value
    setMatches(mediaQuery.matches);

    // Create event listener function
    const handleResize = (event) => {
      setMatches(event.matches);
    };

    // Add the listener
    mediaQuery.addEventListener("change", handleResize);

    // Clean up
    return () => {
      mediaQuery.removeEventListener("change", handleResize);
    };
  }, [query]);

  return matches;
}

/**
 * Helper function to create a media query string from an object
 * @param {Object} query - Object with media query parameters
 * @returns {String} - CSS media query string
 */
function createMediaQueryString(query) {
  const conditions = [];

  if (query.maxWidth) {
    conditions.push(`(max-width: ${query.maxWidth}px)`);
  }

  if (query.minWidth) {
    conditions.push(`(min-width: ${query.minWidth}px)`);
  }

  if (query.maxHeight) {
    conditions.push(`(max-height: ${query.maxHeight}px)`);
  }

  if (query.minHeight) {
    conditions.push(`(min-height: ${query.minHeight}px)`);
  }

  // For direct string query (like "(max-width: 768px)")
  if (typeof query === "string") {
    return query;
  }

  return conditions.join(" and ");
}

export default useMediaQuery;

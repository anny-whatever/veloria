/**
 * Smooth scroll to a section with proper offset calculation
 * @param {string} sectionId - The ID of the section to scroll to
 * @param {number} offset - Additional offset from the top (default: 20px)
 * @param {string} behavior - Scroll behavior (default: 'smooth')
 */
export const scrollToSection = (
  sectionId,
  offset = 20,
  behavior = "smooth"
) => {
  if (typeof window === "undefined") return;

  const section = document.getElementById(sectionId);
  if (!section) {
    console.warn(`Section with ID "${sectionId}" not found`);
    return;
  }

  // Get the navbar height to offset the scroll position
  const navbar = document.querySelector("nav");
  const navbarHeight = navbar ? navbar.offsetHeight : 0;

  // Calculate the target position
  const targetPosition =
    section.getBoundingClientRect().top +
    window.pageYOffset -
    navbarHeight -
    offset;

  // Use smooth scrolling with optimized behavior
  window.scrollTo({
    top: Math.max(0, targetPosition), // Ensure we don't scroll above the page
    behavior: behavior,
  });
};

/**
 * Smooth scroll to element with selector
 * @param {string} selector - CSS selector for the element
 * @param {number} offset - Additional offset from the top (default: 20px)
 * @param {string} behavior - Scroll behavior (default: 'smooth')
 */
export const scrollToElement = (selector, offset = 20, behavior = "smooth") => {
  if (typeof window === "undefined") return;

  const element = document.querySelector(selector);
  if (!element) {
    console.warn(`Element with selector "${selector}" not found`);
    return;
  }

  // Get the navbar height to offset the scroll position
  const navbar = document.querySelector("nav");
  const navbarHeight = navbar ? navbar.offsetHeight : 0;

  // Calculate the target position
  const targetPosition =
    element.getBoundingClientRect().top +
    window.pageYOffset -
    navbarHeight -
    offset;

  // Use smooth scrolling with optimized behavior
  window.scrollTo({
    top: Math.max(0, targetPosition), // Ensure we don't scroll above the page
    behavior: behavior,
  });
};

/**
 * Enhanced smooth scroll with callback support
 * @param {string} targetId - The ID of the target element
 * @param {Object} options - Scroll options
 * @param {number} options.offset - Additional offset (default: 20)
 * @param {string} options.behavior - Scroll behavior (default: 'smooth')
 * @param {Function} options.callback - Callback function to execute after scroll
 */
export const smoothScrollWithCallback = (targetId, options = {}) => {
  const { offset = 20, behavior = "smooth", callback = null } = options;

  if (typeof window === "undefined") return;

  const target = document.getElementById(targetId);
  if (!target) {
    console.warn(`Target with ID "${targetId}" not found`);
    return;
  }

  // Get the navbar height
  const navbar = document.querySelector("nav");
  const navbarHeight = navbar ? navbar.offsetHeight : 0;

  // Calculate the target position
  const targetPosition =
    target.getBoundingClientRect().top +
    window.pageYOffset -
    navbarHeight -
    offset;

  // Scroll to the target
  window.scrollTo({
    top: Math.max(0, targetPosition),
    behavior: behavior,
  });

  // Execute callback if provided
  if (callback && typeof callback === "function") {
    // Wait for scroll to complete (estimate based on distance)
    const scrollDistance = Math.abs(window.pageYOffset - targetPosition);
    const scrollDuration = Math.min(scrollDistance / 2, 1000); // Max 1 second

    setTimeout(callback, scrollDuration);
  }
};

/**
 * Get current active section based on scroll position
 * @param {Array} sectionIds - Array of section IDs to check
 * @param {number} threshold - Threshold for determining active section (default: 100)
 * @returns {string|null} - ID of the active section or null
 */
export const getCurrentActiveSection = (sectionIds = [], threshold = 100) => {
  if (typeof window === "undefined" || !sectionIds.length) return null;

  const scrollPosition = window.pageYOffset;
  const navbar = document.querySelector("nav");
  const navbarHeight = navbar ? navbar.offsetHeight : 0;

  for (const sectionId of sectionIds) {
    const section = document.getElementById(sectionId);
    if (!section) continue;

    const rect = section.getBoundingClientRect();
    const sectionTop = rect.top + scrollPosition - navbarHeight;
    const sectionBottom = sectionTop + rect.height;

    if (
      scrollPosition >= sectionTop - threshold &&
      scrollPosition < sectionBottom - threshold
    ) {
      return sectionId;
    }
  }

  return null;
};

/**
 * Get navbar color configuration based on current section
 * @param {string} currentSection - Current active section ID
 * @returns {Object} - Color configuration object
 */
export const getNavbarColors = (currentSection) => {
  const colorConfigs = {
    home: {
      bg: "rgba(30, 30, 30, 0.8)", // Dark but not full black
      text: "text-white",
      hoverText: "hover:text-gray-200",
      shadow: "shadow-md",
    },
    services: {
      bg: "rgba(30, 30, 30, 0.8)", // Dark but not full black
      text: "text-white",
      hoverText: "hover:text-gray-200",
      shadow: "shadow-md",
    },
    connectivity: {
      bg: "#EDEDED", // Light gray as requested
      text: "text-gray-700",
      hoverText: "hover:text-gray-900",
      shadow: "shadow-sm",
    },
    portfolio: {
      bg: "#101624", // Dark blue as requested
      text: "text-white",
      hoverText: "hover:text-gray-200",
      shadow: "shadow-lg",
    },
    "technical-excellence": {
      bg: "rgba(0, 0, 0, 0.9)", // Full black
      text: "text-white",
      hoverText: "hover:text-gray-200",
      shadow: "shadow-xl",
    },
    about: {
      bg: "rgba(0, 0, 0, 0.9)", // Full black
      text: "text-white",
      hoverText: "hover:text-gray-200",
      shadow: "shadow-xl",
    },
    contact: {
      bg: "#EDEDED", // Light gray as requested
      text: "text-gray-700",
      hoverText: "hover:text-gray-900",
      shadow: "shadow-sm",
    },
  };

  return (
    colorConfigs[currentSection] || {
      bg: "rgba(255, 255, 255, 0.9)", // Default white with transparency
      text: "text-gray-700",
      hoverText: "hover:text-gray-900",
      shadow: "shadow-sm",
    }
  );
};

/**
 * Setup section detection with callback for navbar color changes
 * @param {Function} callback - Callback function to execute when section changes
 * @param {Array} sectionIds - Array of section IDs to monitor
 * @param {number} threshold - Threshold for section detection (default: 100)
 * @returns {Function} - Cleanup function to remove event listeners
 */
export const setupSectionDetection = (
  callback,
  sectionIds = [],
  threshold = 100
) => {
  if (typeof window === "undefined") return () => {};

  let currentSection = null;
  let ticking = false;

  const handleScroll = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const newSection = getCurrentActiveSection(sectionIds, threshold);
        if (newSection !== currentSection) {
          currentSection = newSection;
          callback(newSection);
        }
        ticking = false;
      });
      ticking = true;
    }
  };

  // Initial check
  handleScroll();

  // Add scroll listener
  window.addEventListener("scroll", handleScroll, { passive: true });

  // Return cleanup function
  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
};

/**
 * Get section progress (0-1) for smooth transitions
 * @param {string} sectionId - Section ID to check
 * @returns {number} - Progress from 0 to 1
 */
export const getSectionProgress = (sectionId) => {
  if (typeof window === "undefined") return 0;

  const section = document.getElementById(sectionId);
  if (!section) return 0;

  const rect = section.getBoundingClientRect();
  const navbar = document.querySelector("nav");
  const navbarHeight = navbar ? navbar.offsetHeight : 0;

  const sectionTop = rect.top + window.pageYOffset - navbarHeight;
  const sectionBottom = sectionTop + rect.height;
  const currentScroll = window.pageYOffset;

  if (currentScroll < sectionTop) return 0;
  if (currentScroll > sectionBottom) return 1;

  return (currentScroll - sectionTop) / (sectionBottom - sectionTop);
};

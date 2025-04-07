/**
 * Dark Mode Utility Classes for Admin Panel
 *
 * This utility file contains common Tailwind CSS class mappings to help
 * consistently apply dark mode styling throughout the admin panel.
 */

// Background class mappings
export const backgroundClasses = {
  // Convert light backgrounds to dark
  "bg-white": "bg-white dark:bg-gray-800",
  "bg-gray-50": "bg-gray-50 dark:bg-gray-900",
  "bg-gray-100": "bg-gray-100 dark:bg-gray-800",
  "bg-gray-200": "bg-gray-200 dark:bg-gray-700",

  // Input fields
  "focus:bg-white": "focus:bg-white dark:focus:bg-gray-700",
  "bg-gray-50": "bg-gray-50 dark:bg-gray-800",

  // Table rows
  "hover:bg-gray-50": "hover:bg-gray-50 dark:hover:bg-gray-700",
  "bg-gray-50": "bg-gray-50 dark:bg-gray-900",

  // Avatar backgrounds
  "bg-primary-100": "bg-primary-100 dark:bg-primary-900/30",
  "bg-secondary-100": "bg-secondary-100 dark:bg-secondary-900/30",
  "bg-accent-100": "bg-accent-100 dark:bg-accent-900/30",
};

// Text color mappings
export const textClasses = {
  // Primary text
  "text-gray-900": "text-gray-900 dark:text-gray-100",
  "text-gray-800": "text-gray-800 dark:text-gray-200",
  "text-gray-700": "text-gray-700 dark:text-gray-300",

  // Secondary text
  "text-gray-600": "text-gray-600 dark:text-gray-400",
  "text-gray-500": "text-gray-500 dark:text-gray-400",
  "text-gray-400": "text-gray-400 dark:text-gray-500",

  // Brand colors
  "text-primary": "text-primary dark:text-primary-400",
  "text-primary-dark": "text-primary-dark dark:text-primary-300",
  "text-secondary": "text-secondary dark:text-secondary-400",
  "text-accent": "text-accent dark:text-accent-400",

  // Status colors
  "text-red-600": "text-red-600 dark:text-red-400",
  "text-red-800": "text-red-800 dark:text-red-300",
  "text-green-600": "text-green-600 dark:text-green-400",
  "text-green-800": "text-green-800 dark:text-green-300",
  "text-blue-600": "text-blue-600 dark:text-blue-400",
  "text-blue-800": "text-blue-800 dark:text-blue-300",
  "text-amber-600": "text-amber-600 dark:text-amber-400",
  "text-amber-800": "text-amber-800 dark:text-amber-300",
};

// Border color mappings
export const borderClasses = {
  "border-gray-300": "border-gray-300 dark:border-gray-600",
  "border-gray-200": "border-gray-200 dark:border-gray-700",
  "border-gray-100": "border-gray-100 dark:border-gray-700",
  "divide-gray-200": "divide-gray-200 dark:divide-gray-700",

  "focus:border-gray-300": "focus:border-gray-300 dark:focus:border-gray-500",
};

// Hover state mappings
export const hoverClasses = {
  "hover:bg-gray-100": "hover:bg-gray-100 dark:hover:bg-gray-700",
  "hover:bg-gray-200": "hover:bg-gray-200 dark:hover:bg-gray-600",
  "hover:bg-gray-50": "hover:bg-gray-50 dark:hover:bg-gray-700",
  "hover:text-primary": "hover:text-primary dark:hover:text-primary-400",
  "hover:text-primary-dark":
    "hover:text-primary-dark dark:hover:text-primary-300",
  "hover:text-red-800": "hover:text-red-800 dark:hover:text-red-300",
};

// Status badge background mappings
export const badgeClasses = {
  "bg-blue-100 text-blue-800":
    "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  "bg-green-100 text-green-800":
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  "bg-red-100 text-red-800":
    "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  "bg-amber-100 text-amber-800":
    "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300",
  "bg-purple-100 text-purple-800":
    "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
  "bg-cyan-100 text-cyan-800":
    "bg-cyan-100 text-cyan-800 dark:bg-cyan-900/30 dark:text-cyan-300",
  "bg-gray-100 text-gray-800":
    "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
};

// Function to apply dark mode classes to a component
export const applyDarkMode = (originalClassName) => {
  let updatedClassName = originalClassName;

  // Apply background classes
  Object.entries(backgroundClasses).forEach(([lightClass, darkClass]) => {
    if (
      updatedClassName.includes(lightClass) &&
      !updatedClassName.includes(`dark:`)
    ) {
      updatedClassName = updatedClassName.replace(lightClass, darkClass);
    }
  });

  // Apply text classes
  Object.entries(textClasses).forEach(([lightClass, darkClass]) => {
    if (
      updatedClassName.includes(lightClass) &&
      !updatedClassName.includes(`dark:`)
    ) {
      updatedClassName = updatedClassName.replace(lightClass, darkClass);
    }
  });

  // Apply border classes
  Object.entries(borderClasses).forEach(([lightClass, darkClass]) => {
    if (
      updatedClassName.includes(lightClass) &&
      !updatedClassName.includes(`dark:`)
    ) {
      updatedClassName = updatedClassName.replace(lightClass, darkClass);
    }
  });

  // Apply hover classes
  Object.entries(hoverClasses).forEach(([lightClass, darkClass]) => {
    if (
      updatedClassName.includes(lightClass) &&
      !updatedClassName.includes(`dark:`)
    ) {
      updatedClassName = updatedClassName.replace(lightClass, darkClass);
    }
  });

  return updatedClassName;
};

/**
 * Guidelines for implementing dark mode in admin components:
 *
 * 1. Background Colors:
 *    - Main backgrounds: bg-white → bg-white dark:bg-gray-800
 *    - Secondary backgrounds: bg-gray-100 → bg-gray-100 dark:bg-gray-800/50
 *    - UI element backgrounds: bg-gray-200 → bg-gray-200 dark:bg-gray-700
 *
 * 2. Text Colors:
 *    - Primary text: text-gray-900 → text-gray-900 dark:text-gray-100
 *    - Secondary text: text-gray-600 → text-gray-600 dark:text-gray-400
 *    - Muted text: text-gray-500 → text-gray-500 dark:text-gray-400
 *
 * 3. Borders:
 *    - Primary borders: border-gray-200 → border-gray-200 dark:border-gray-700
 *    - Input borders: border-gray-300 → border-gray-300 dark:border-gray-600
 *
 * 4. Brand Colors:
 *    - Use -400 variants for dark mode (e.g., primary-600 → primary-400)
 *
 * 5. Status Colors:
 *    - For badges, use darker backgrounds with higher opacity in dark mode
 *    - Example: bg-green-100 → dark:bg-green-900/30
 */

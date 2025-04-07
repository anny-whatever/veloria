import React, { useEffect } from "react";
import { useTheme } from "../../../contexts/ThemeContext";
import "../styles/adminDarkMode.css";

/**
 * This component ensures all admin panel pages have the proper class for
 * dark mode styling to be applied. It doesn't use inline styles anymore
 * but relies on the imported CSS file.
 */
const DarkModeFixApplier = () => {
  const { isDarkMode } = useTheme();

  // Add the admin-content class to the main content automatically if not present
  useEffect(() => {
    const mainContent = document.querySelector("main");
    if (mainContent && !mainContent.classList.contains("admin-content")) {
      mainContent.classList.add("admin-content");
    }

    return () => {
      // Clean up (technically not needed for this but good practice)
      if (mainContent && mainContent.classList.contains("admin-content")) {
        mainContent.classList.remove("admin-content");
      }
    };
  }, []);

  return null; // This component doesn't render anything
};

export default DarkModeFixApplier;

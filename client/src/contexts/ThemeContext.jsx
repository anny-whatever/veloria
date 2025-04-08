import { createContext, useState, useContext, useEffect } from "react";

// Create theme context
const ThemeContext = createContext();

// Check if code is running in browser environment
const isBrowser = typeof window !== "undefined";

// Custom hook to use the theme context
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // When running on the server, default to dark mode
    if (!isBrowser) return true;

    // Check for saved preference or system preference
    const savedMode = localStorage.getItem("darkMode");

    // If there's a saved preference, use that
    if (savedMode !== null) {
      return savedMode === "true";
    }

    // Check if browser preference can be detected
    try {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      return prefersDark;
    } catch (error) {
      // If we can't determine browser preference, default to dark
      return true;
    }
  });

  // Toggle dark mode function
  const toggleDarkMode = () => {
    setIsDarkMode((prev) => {
      const newMode = !prev;
      if (isBrowser) {
        localStorage.setItem("darkMode", newMode);
      }
      return newMode;
    });
  };

  // Listen for changes in system color scheme preference
  useEffect(() => {
    if (!isBrowser) return; // Skip on server

    try {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

      const handleChange = (e) => {
        // Only update if user hasn't explicitly set a preference
        if (localStorage.getItem("darkMode") === null) {
          setIsDarkMode(e.matches);
        }
      };

      // Add event listener using the appropriate method
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.addListener(handleChange);
      }

      // Clean up
      return () => {
        if (mediaQuery.removeEventListener) {
          mediaQuery.removeEventListener("change", handleChange);
        } else {
          mediaQuery.removeListener(handleChange);
        }
      };
    } catch (error) {
      console.error("Error setting up media query listener:", error);
    }
  }, []);

  // Apply dark mode class to document
  useEffect(() => {
    if (!isBrowser) return; // Skip on server

    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Provide theme state and toggle function to children
  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;

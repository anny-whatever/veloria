import { createContext, useContext, useEffect } from "react";

// Create a context for the admin theme
export const AdminThemeContext = createContext();

export const useAdminTheme = () => {
  const context = useContext(AdminThemeContext);
  if (!context) {
    throw new Error("useAdminTheme must be used within AdminThemeProvider");
  }
  return context;
};

// Admin Theme Provider - Forces dark mode in the admin panel
export const AdminThemeProvider = ({ children }) => {
  useEffect(() => {
    // Add the dark class to the document when on admin pages
    document.documentElement.classList.add("dark");

    // Clean up when unmounting
    return () => {
      // Only remove if we're navigating away from admin
      if (!window.location.pathname.includes("/admin")) {
        document.documentElement.classList.remove("dark");
      }
    };
  }, []);

  return (
    <AdminThemeContext.Provider value={{ isDarkMode: true }}>
      {children}
    </AdminThemeContext.Provider>
  );
};

export default AdminThemeProvider;

// client/src/pages/Admin/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminLogin from "./AdminLogin";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../contexts/ThemeContext";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { AdminThemeProvider } from "../../contexts/AdminThemeContext.jsx";

const AdminDashboard = () => {
  const { auth, loading } = useAuth();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(window.innerWidth >= 1024);
  const { darkMode } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery({ maxWidth: 1023 });

  // Toggle sidebar visibility
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Close sidebar on mobile when route changes
  useEffect(() => {
    if (isMobile) {
      setSidebarOpen(false);
    }
  }, [location.pathname, isMobile]);

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      const sidebar = document.getElementById("admin-sidebar");
      const toggleButton = document.getElementById("sidebar-toggle");

      if (
        isMobile &&
        sidebarOpen &&
        sidebar &&
        !sidebar.contains(event.target) &&
        toggleButton &&
        !toggleButton.contains(event.target)
      ) {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebarOpen, isMobile]);

  // If loading, show a loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-zinc-950">
        <div className="w-12 h-12 border-4 border-zinc-800 rounded-full border-t-primary-500 animate-spin"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!auth.token) {
    return (
      <AdminThemeProvider>
        <AdminLogin />
      </AdminThemeProvider>
    );
  }

  return (
    <AdminThemeProvider>
      <div className="min-h-screen min-w-screen bg-zinc-100 dark:bg-zinc-950 transition-colors duration-200 overflow-hidden">
        <AdminHeader toggleSidebar={toggleSidebar} />
        <div className="flex h-[calc(100vh-64px)] overflow-hidden">
          <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
          <main
            className={`flex-1 overflow-auto p-4 transition-all duration-300`}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </AdminThemeProvider>
  );
};

export default AdminDashboard;

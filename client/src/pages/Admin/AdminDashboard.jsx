// client/src/pages/Admin/AdminDashboard.jsx
import { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AdminSidebar from "./components/AdminSidebar";
import AdminHeader from "./components/AdminHeader";
import AdminLogin from "./AdminLogin";
import useAuth from "../../hooks/useAuth";
import DarkModeFixApplier from "./utils/DarkModeFixApplier";

const AdminDashboard = () => {
  const { auth, loading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Function to toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Close sidebar when route changes
  useEffect(() => {
    if (sidebarOpen) {
      setSidebarOpen(false);
    }
  }, [location.pathname]);

  // If loading, show a loading spinner
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-dark-100">
        <div className="w-12 h-12 border-4 border-gray-300 dark:border-gray-600 rounded-full border-t-primary animate-spin"></div>
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (!auth.token) {
    return <AdminLogin />;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Apply global dark mode fixes */}
      <DarkModeFixApplier />

      {/* Sidebar - no longer auto-open on desktop */}
      <AdminSidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        <AdminHeader toggleSidebar={toggleSidebar} />

        <main className="flex-1 p-4 overflow-y-auto bg-gray-100 dark:bg-gray-900 md:p-6 admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;

// client/src/pages/Admin/components/AdminHeader.jsx
import { useState } from "react";
import { Menu, Bell, User, Search } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import { useTheme } from "../../../contexts/ThemeContext";
import ThemeToggle from "../../../components/ThemeToggle";

const AdminHeader = ({ toggleSidebar }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { auth, logout } = useAuth();
  const { isDarkMode } = useTheme();

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sm:px-6">
      {/* Left: Hamburger and Search */}
      <div className="flex items-center">
        <button
          className="p-2 mr-2 text-gray-500 dark:text-gray-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
          onClick={toggleSidebar}
        >
          <Menu size={24} />
        </button>

        <div className="relative hidden md:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={18} className="text-gray-400 dark:text-gray-500" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-64 py-2 pl-10 pr-4 text-sm bg-gray-100 dark:bg-gray-700 dark:text-gray-200 border border-transparent dark:border-gray-600 rounded-md focus:outline-none focus:bg-white dark:focus:bg-gray-600 focus:border-gray-300 dark:focus:border-gray-500"
          />
        </div>
      </div>

      {/* Right: Notifications, Theme Toggle and User */}
      <div className="flex items-center space-x-4">
        <button className="p-1 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
          <Bell size={20} />
        </button>

        <ThemeToggle size="small" />

        <div className="relative">
          <button
            className="flex items-center p-1 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50"
            onClick={toggleUserMenu}
          >
            <div className="flex items-center justify-center w-8 h-8 text-white rounded-full bg-gradient-to-r from-primary to-secondary">
              {auth.user && auth.user.name ? (
                auth.user.name.charAt(0).toUpperCase()
              ) : (
                <User size={20} />
              )}
            </div>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 z-50 w-48 py-1 mt-2 origin-top-right bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 dark:ring-opacity-20">
              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {auth.user?.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {auth.user?.email}
                </p>
              </div>
              <a
                href="/admin/profile"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Your Profile
              </a>
              <a
                href="/admin/settings"
                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Settings
              </a>
              <button
                onClick={logout}
                className="block w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

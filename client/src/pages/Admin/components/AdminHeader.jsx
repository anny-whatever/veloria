// client/src/pages/Admin/components/AdminHeader.jsx
import { useState } from "react";
import { Menu, Bell, User, Search } from "lucide-react";
import useAuth from "../../../hooks/useAuth";

const AdminHeader = ({ toggleSidebar }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { auth, logout } = useAuth();

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 sm:px-6">
      {/* Left: Hamburger and Search */}
      <div className="flex items-center">
        <button
          className="p-2 mr-2 text-gray-500 rounded-md md:hidden hover:bg-gray-100 focus:outline-none"
          onClick={toggleSidebar}
        >
          <Menu size={24} />
        </button>

        <div className="relative hidden md:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search size={18} className="text-gray-400" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-64 py-2 pl-10 pr-4 text-sm bg-gray-100 border border-transparent rounded-md focus:outline-none focus:bg-white focus:border-gray-300"
          />
        </div>
      </div>

      {/* Right: Notifications and User */}
      <div className="flex items-center space-x-4">
        <button className="p-1 text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200">
          <Bell size={20} />
        </button>

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
            <div className="absolute right-0 z-50 w-48 py-1 mt-2 origin-top-right bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-4 py-3 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-700">
                  {auth.user?.name}
                </p>
                <p className="text-xs text-gray-500">{auth.user?.email}</p>
              </div>
              <a
                href="/admin/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Your Profile
              </a>
              <a
                href="/admin/settings"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Settings
              </a>
              <button
                onClick={logout}
                className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
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

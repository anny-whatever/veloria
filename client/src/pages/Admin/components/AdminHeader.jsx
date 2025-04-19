// client/src/pages/Admin/components/AdminHeader.jsx
import { useState, useRef, useEffect } from "react";
import {
  Menu,
  Bell,
  User,
  Search,
  ChevronDown,
  Settings,
  LogOut,
  BarChart2,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import { useAdminTheme } from "../../../contexts/AdminThemeContext.jsx";

const AdminHeader = ({ toggleSidebar }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const { auth, logout } = useAuth();
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
    if (showNotifications) setShowNotifications(false);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (showUserMenu) setShowUserMenu(false);
  };

  return (
    <header className="sticky top-0 z-10 flex items-center justify-between h-16 px-4 bg-zinc-950/90 border-b border-zinc-800/80 backdrop-blur-sm sm:px-6">
      {/* Left: Hamburger and Search */}
      <div className="flex items-center gap-4">
        <button
          id="sidebar-toggle"
          className="p-2 text-zinc-400 rounded-md transition-colors hover:bg-zinc-900 hover:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-zinc-700"
          onClick={toggleSidebar}
        >
          <Menu size={20} />
        </button>

        <div className="relative hidden md:block">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search size={16} className="text-zinc-500" />
          </span>
          <input
            type="text"
            placeholder="Search..."
            className="w-72 py-1.5 pl-10 pr-4 text-sm bg-zinc-900/50 text-zinc-200 border border-zinc-800 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
          />
        </div>
      </div>

      {/* Right: Actions and User */}
      <div className="flex items-center space-x-3">
        {/* Quick Stats Button */}
        <button className="hidden md:flex items-center px-3 py-1.5 text-sm border border-zinc-800 rounded-md text-zinc-300 bg-zinc-900/70 hover:bg-zinc-900 transition-colors gap-2">
          <BarChart2 size={16} className="text-primary-400" />
          <span>Quick Stats</span>
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button
            className="p-1.5 text-zinc-400 bg-zinc-900/70 border border-zinc-800 rounded-md hover:text-zinc-100 hover:bg-zinc-900 transition-colors relative"
            onClick={toggleNotifications}
          >
            <Bell size={16} />
            {/* Notification indicator */}
            <span className="absolute top-0 right-0 w-2 h-2 bg-primary-500 rounded-full transform translate-x-0.5 -translate-y-0.5"></span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 z-50 w-96 md:min-w-[450px] mt-2 origin-top-right bg-zinc-950 border border-zinc-800 rounded-md shadow-lg">
              <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between">
                <h3 className="text-sm font-medium text-zinc-200">
                  Notifications
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary-900/30 text-primary-300 border border-primary-800/50">
                  3 new
                </span>
              </div>

              <div className="max-h-80 overflow-y-auto">
                {/* Sample notification */}
                <div className="px-4 py-3 border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-blue-900/30 text-blue-300 border border-blue-800/50">
                      <BarChart2 size={14} />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-200">
                        New project request submitted
                      </p>
                      <p className="text-xs text-zinc-400 mt-0.5">Just now</p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 border-b border-zinc-800 hover:bg-zinc-900/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-green-900/30 text-green-300 border border-green-800/50">
                      <LogOut size={14} />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-200">
                        Client payment received
                      </p>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        2 hours ago
                      </p>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 hover:bg-zinc-900/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-amber-900/30 text-amber-300 border border-amber-800/50">
                      <Settings size={14} />
                    </div>
                    <div>
                      <p className="text-sm text-zinc-200">
                        Project deadline updated
                      </p>
                      <p className="text-xs text-zinc-400 mt-0.5">Yesterday</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-2 text-center border-t border-zinc-800">
                <button className="w-full px-4 py-2 text-xs text-zinc-300 rounded-md hover:bg-zinc-900 transition-colors">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            className="flex items-center space-x-2 px-2 py-1.5 text-sm text-zinc-200 rounded-md hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-zinc-700 transition-colors"
            onClick={toggleUserMenu}
          >
            <div className="flex items-center justify-center w-7 h-7 text-white rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 border border-zinc-800 shadow-sm">
              {auth.user && auth.user.name ? (
                auth.user.name.charAt(0).toUpperCase()
              ) : (
                <User size={16} />
              )}
            </div>
            <span className="max-w-[100px] truncate hidden sm:block">
              {auth.user?.name || "Admin"}
            </span>
            <ChevronDown size={14} className="text-zinc-400" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 z-50 w-56 mt-2 origin-top-right bg-zinc-950 border border-zinc-800 rounded-md shadow-lg">
              <div className="px-4 py-3 border-b border-zinc-800">
                <p className="text-sm font-medium text-zinc-200 truncate">
                  {auth.user?.name}
                </p>
                <p className="text-xs text-zinc-500 truncate">
                  {auth.user?.email}
                </p>
              </div>
              <div className="py-1">
                <a
                  href="/admin/profile"
                  className="flex items-center px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-900 transition-colors"
                >
                  <User size={16} className="mr-2 text-zinc-400" />
                  Your Profile
                </a>
                <a
                  href="/admin/settings"
                  className="flex items-center px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-900 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 text-zinc-400"
                  >
                    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  Settings
                </a>
              </div>
              <div className="py-1 border-t border-zinc-800">
                <button
                  onClick={logout}
                  className="flex items-center w-full px-4 py-2 text-sm text-zinc-200 hover:bg-zinc-900 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 text-zinc-400"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

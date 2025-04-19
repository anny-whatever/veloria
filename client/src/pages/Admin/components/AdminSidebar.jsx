// client/src/pages/Admin/components/AdminSidebar.jsx - Redesigned sidebar
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MessageCircle,
  FileText,
  Home,
  LogOut,
  ChevronRight,
  X,
  ClipboardList,
  PieChart,
  IndianRupee,
  User,
  Settings,
  Command,
  PanelLeftClose,
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { logout, auth } = useAuth();

  // Define nav items with sections
  const navSections = [
    {
      title: "Dashboard",
      items: [
        {
          path: "/admin",
          label: "Overview",
          icon: <Home size={18} className="stroke-[1.5px]" />,
        },
      ],
    },
    {
      title: "Projects",
      items: [
        {
          path: "/admin/projects",
          label: "Project Pipeline",
          icon: <ClipboardList size={18} className="stroke-[1.5px]" />,
        },
        {
          path: "/admin/projects/calendar",
          label: "Project Calendar",
          icon: <Calendar size={18} className="stroke-[1.5px]" />,
        },
      ],
    },
    {
      title: "Discovery Calls",
      items: [
        {
          path: "/admin/bookings",
          label: "Bookings List",
          icon: <FileText size={18} className="stroke-[1.5px]" />,
        },
        {
          path: "/admin/bookings/calendar",
          label: "Booking Calendar",
          icon: <Calendar size={18} className="stroke-[1.5px]" />,
        },
      ],
    },
    {
      title: "Communication",
      items: [
        {
          path: "/admin/contacts",
          label: "Contact Messages",
          icon: <MessageCircle size={18} className="stroke-[1.5px]" />,
        },
      ],
    },
    {
      title: "Finance",
      items: [
        {
          path: "/admin/finance",
          label: "Revenue Tracking",
          icon: <IndianRupee size={18} className="stroke-[1.5px]" />,
        },
      ],
    },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      {/* Mobile sidebar backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-20 bg-black/70 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
          ></motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div
        id="admin-sidebar"
        className={`fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static`}
      >
        <div className="h-full w-64 bg-zinc-950 border-r border-zinc-800/80 shadow-xl flex flex-col relative">
          {/* Close button for mobile */}
          <button
            className="absolute text-zinc-400 hover:text-zinc-200 top-4 right-4 z-50 lg:hidden"
            id="sidebar-toggle"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          >
            <X size={18} />
          </button>

          {/* Logo */}
          <div className="p-4 border-b border-zinc-800/80">
            <Link
              to="/admin"
              className="flex items-center justify-center"
              onClick={() => toggleSidebar()}
            >
              <div className="relative">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 mr-2 bg-zinc-900 border border-zinc-800 rounded-lg shadow-md">
                    <Command size={18} className="text-primary-400" />
                  </div>
                  <h2 className="text-xl font-bold text-zinc-100">Veloria</h2>
                </div>
              </div>
            </Link>
          </div>

          {/* Sidebar Toggle Button (visible on desktop) */}
          {/* Removed the toggle button div */}
          {/* <div className="absolute right-0 hidden transform translate-x-1/2 lg:block top-12">
            <button
              onClick={toggleSidebar}
              className="flex items-center justify-center w-8 h-8 text-zinc-400 bg-zinc-900 border border-zinc-800 rounded-full hover:text-white focus:outline-none focus:ring-2 focus:ring-zinc-600"
              aria-label="Toggle sidebar"
            >
              <PanelLeftClose size={16} />
            </button>
          </div> */}

          {/* Nav Items */}
          <nav className="flex-1 px-2 py-4 space-y-6 overflow-y-auto scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
            {navSections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="px-3 mb-2 text-xs font-medium tracking-wider text-zinc-500 uppercase">
                  {section.title}
                </h3>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive =
                      location.pathname === item.path ||
                      (item.path !== "/admin" &&
                        location.pathname.startsWith(item.path));

                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                          isActive
                            ? "bg-zinc-900 text-zinc-100 font-medium shadow-sm"
                            : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900/60"
                        }`}
                        onClick={toggleSidebar}
                      >
                        <span
                          className={`mr-2 ${
                            isActive ? "text-primary-400" : "text-zinc-500"
                          }`}
                        >
                          {item.icon}
                        </span>
                        <span>{item.label}</span>
                        {isActive && (
                          <motion.div
                            className="ml-auto text-primary-400"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                          >
                            <div className="w-1.5 h-1.5 rounded-full bg-primary-400" />
                          </motion.div>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>

          {/* User Profile */}
          <div className="p-4 mt-auto border-t border-zinc-800/80">
            <div className="flex items-center p-2 rounded-md bg-zinc-900/70">
              <div className="flex items-center justify-center w-8 h-8 mr-2 text-white rounded-full bg-gradient-to-br from-primary-500 to-secondary-600 border border-zinc-800 shadow-sm">
                {auth.user && auth.user.name ? (
                  auth.user.name.charAt(0).toUpperCase()
                ) : (
                  <User size={16} />
                )}
              </div>
              <div className="ml-2 overflow-hidden">
                <p className="text-sm font-medium text-zinc-200 truncate">
                  {auth.user?.name || "Admin User"}
                </p>
                <p className="text-xs text-zinc-500 truncate">
                  {auth.user?.email || "admin@veloria.in"}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-3">
              <Link
                to="/admin/settings"
                className="flex items-center justify-center px-2 py-1.5 text-xs font-medium text-zinc-300 rounded-md bg-zinc-900 hover:bg-zinc-800 transition-colors"
                onClick={toggleSidebar}
              >
                <Settings size={14} className="mr-1.5" />
                <span>Settings</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center px-2 py-1.5 text-xs font-medium text-zinc-300 rounded-md bg-zinc-900 hover:bg-zinc-800 transition-colors"
              >
                <LogOut size={14} className="mr-1.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Keyboard shortcuts hint */}
          <div className="hidden p-3 mx-3 my-2 rounded-md border border-zinc-800/80 bg-zinc-900/70 lg:block">
            <div className="flex items-center justify-between text-xs text-zinc-500">
              <span>Keyboard shortcuts</span>
              <span className="flex">
                <kbd className="px-1.5 py-0.5 mx-0.5 text-xs font-medium text-zinc-400 bg-zinc-900 rounded border border-zinc-800">
                  ⌘
                </kbd>
                <kbd className="px-1.5 py-0.5 mx-0.5 text-xs font-medium text-zinc-400 bg-zinc-900 rounded border border-zinc-800">
                  K
                </kbd>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;

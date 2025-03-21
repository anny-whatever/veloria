// client/src/pages/Admin/components/AdminSidebar.jsx - Updated with new navigation items
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
} from "lucide-react";
import useAuth from "../../../hooks/useAuth";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { logout, auth } = useAuth();

  // Define nav items with sections
  const navSections = [
    {
      title: "Dashboard",
      items: [{ path: "/admin", label: "Overview", icon: <Home size={20} /> }],
    },
    {
      title: "Projects",
      items: [
        {
          path: "/admin/projects",
          label: "Project Pipeline",
          icon: <ClipboardList size={20} />,
        },
        {
          path: "/admin/projects/calendar",
          label: "Project Calendar",
          icon: <Calendar size={20} />,
        },
      ],
    },
    {
      title: "Discovery Calls",
      items: [
        {
          path: "/admin/bookings",
          label: "Bookings List",
          icon: <FileText size={20} />,
        },
        {
          path: "/admin/bookings/calendar",
          label: "Booking Calendar",
          icon: <Calendar size={20} />,
        },
      ],
    },
    {
      title: "Communication",
      items: [
        {
          path: "/admin/contacts",
          label: "Contact Messages",
          icon: <MessageCircle size={20} />,
        },
      ],
    },
    {
      title: "Finance",
      items: [
        {
          path: "/admin/finance",
          label: "Revenue Tracking",
          icon: <IndianRupee size={20} />,
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
            className="fixed inset-0 z-20 bg-black/50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleSidebar}
          ></motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.div
        className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out flex flex-col`}
      >
        {/* Close button for mobile */}
        <button
          className="absolute text-gray-500 top-4 right-4 md:hidden"
          onClick={() => toggleSidebar()}
        >
          <X size={20} />
        </button>

        {/* Logo */}
        <div className="p-4 border-b">
          <Link
            to="/admin"
            className="flex items-center justify-center"
            onClick={() => isOpen && toggleSidebar()}
          >
            <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text">
              Veloria
            </h2>
          </Link>
        </div>

        {/* Nav Items */}
        <nav className="flex-1 px-2 py-4 space-y-6 overflow-y-auto">
          {navSections.map((section, sectionIndex) => (
            <div key={sectionIndex}>
              <h3 className="px-4 mb-2 text-xs font-semibold tracking-wider text-gray-500 uppercase">
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
                      className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        isActive
                          ? "bg-primary/10 text-primary"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => isOpen && toggleSidebar()}
                    >
                      <span className="mr-3">{item.icon}</span>
                      <span>{item.label}</span>
                      {isActive && (
                        <motion.div
                          className="ml-auto text-primary"
                          initial={{ scale: 0.5, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                        >
                          <ChevronRight size={16} />
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
        <div className="p-4 border-t">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-medium text-gray-800">{auth.user?.name}</p>
              <p className="text-xs text-gray-500">{auth.user?.email}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <Link
              to="/admin/settings"
              className="flex items-center justify-center flex-1 px-2 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              onClick={() => isOpen && toggleSidebar()}
            >
              <Settings size={18} className="mr-1" />
              <span>Settings</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center justify-center flex-1 px-2 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              <LogOut size={18} className="mr-1" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default AdminSidebar;

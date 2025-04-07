// src/components/Navbar/NavLink.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NavLink = ({ href, text, mobile = false, onClick }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Only add scroll listener for hash links
    if (href.startsWith("#")) {
      const handleScroll = () => {
        // Get the element with this ID
        const element = document.querySelector(href);
        if (!element) return;

        const rect = element.getBoundingClientRect();
        // Check if element is in viewport
        if (rect.top <= 100 && rect.bottom >= 100) {
          setIsActive(true);
        } else {
          setIsActive(false);
        }
      };

      window.addEventListener("scroll", handleScroll);
      // Initial check
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [href]);

  // For links starting with #, use normal anchor behavior
  if (href.startsWith("#")) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        className={`relative transition-all duration-300 ${
          mobile
            ? "text-xl font-medium text-gray-800 dark:text-gray-100"
            : "text-sm font-medium text-gray-800 dark:text-gray-100"
        } ${
          isActive
            ? "text-primary-600 dark:text-primary-400"
            : "text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {text}
        {isActive && !mobile && (
          <motion.span
            className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-primary rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 0.3 }}
          ></motion.span>
        )}
      </motion.a>
    );
  }

  // For other links, use Link component
  return (
    <Link to={href} onClick={onClick}>
      <motion.span
        className={`relative transition-all duration-300 ${
          mobile
            ? "text-xl font-medium text-gray-800 dark:text-gray-100"
            : "text-sm font-medium text-gray-800 dark:text-gray-100"
        } ${
          isActive
            ? "text-primary-600 dark:text-primary-400"
            : "text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400"
        }`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {text}
        {isActive && !mobile && (
          <motion.span
            className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-primary rounded-full"
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "100%", opacity: 1 }}
            transition={{ duration: 0.3 }}
          ></motion.span>
        )}
      </motion.span>
    </Link>
  );
};

export default NavLink;

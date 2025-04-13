// src/components/Navbar/NavLink.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavLink = ({ href, text, mobile = false, onClick }) => {
  const [isActive, setIsActive] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  // Check if we're in browser environment
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    // Skip on server or if not a hash link
    if (!isBrowser || !href.startsWith("#")) return;

    // Only add scroll listener for hash links
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
  }, [href, isBrowser]);

  // For links starting with #, use normal anchor behavior
  if (href.startsWith("#")) {
    return (
      <a
        href={href}
        onClick={onClick}
        className={`relative transition-all duration-300 hover-scale-small ${
          mobile
            ? "text-xl font-medium text-gray-800 dark:text-gray-100"
            : "text-sm font-medium text-gray-800 dark:text-gray-100"
        } ${
          isActive
            ? "text-primary-600 dark:text-primary-400"
            : "text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400"
        }`}
      >
        {text}
        {isActive && !mobile && (
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-primary rounded-full active-indicator"></span>
        )}
      </a>
    );
  }

  // For other links, use Link component
  return (
    <Link to={href} onClick={onClick}>
      <span
        className={`relative transition-all duration-300 hover-scale-small ${
          mobile
            ? "text-xl font-medium text-gray-800 dark:text-gray-100"
            : "text-sm font-medium text-gray-800 dark:text-gray-100"
        } ${
          isActive
            ? "text-primary-600 dark:text-primary-400"
            : "text-gray-700 dark:text-gray-200 hover:text-primary-500 dark:hover:text-primary-400"
        }`}
      >
        {text}
        {isActive && !mobile && (
          <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-primary rounded-full active-indicator"></span>
        )}
      </span>
    </Link>
  );
};

export default NavLink;

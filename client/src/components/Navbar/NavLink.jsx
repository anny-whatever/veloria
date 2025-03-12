// src/components/Navbar/NavLink.jsx
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NavLink = ({ href, text, mobile = false, onClick }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
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
    return () => window.removeEventListener("scroll", handleScroll);
  }, [href]);

  return (
    <motion.a
      href={href}
      onClick={onClick}
      className={`relative transition-all duration-300 ${
        mobile ? "text-gray-800 text-xl" : "text-gray-700"
      } hover:text-primary ${isActive ? "text-primary font-medium" : ""}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {text}
      {isActive && !mobile && (
        <motion.span
          className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        ></motion.span>
      )}
    </motion.a>
  );
};

export default NavLink;

// src/components/Navbar/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import NavLink from "./NavLink";
import ThemeToggle from "../ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);
  const navRef = useRef(null);

  // Set isBrowser flag on client side
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Handle scroll effect with smooth transitions
  useEffect(() => {
    if (!isBrowser) return;

    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isBrowser]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    if (!isBrowser) return;

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isBrowser]);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (!isBrowser) return;

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, isBrowser]);

  const navbarVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const mobileMenuVariants = {
    closed: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: "easeIn" },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const linkVariants = {
    closed: { opacity: 0, x: -20 },
    open: { opacity: 1, x: 0 },
  };

  return (
    <motion.nav
      ref={navRef}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-surface-50/90 backdrop-blur-md dark:bg-dark-200/90 shadow-sm"
          : "py-5 bg-transparent"
      }`}
      initial="initial"
      animate="animate"
      variants={navbarVariants}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Logo />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center md:space-x-3 lg:space-x-6 flex-wrap">
            <Link
              to="/"
              className={`text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 transition-colors duration-300 text-sm lg:text-base py-2`}
            >
              Home
            </Link>
            <a
              href="/#services"
              className={`text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 transition-colors duration-300 text-sm lg:text-base py-2`}
            >
              Services
            </a>
            <a
              href="/#portfolio"
              className={`text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 transition-colors duration-300 text-sm lg:text-base py-2`}
            >
              Portfolio
            </a>
            <a
              href="/#about"
              className={`text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 transition-colors duration-300 text-sm lg:text-base py-2`}
            >
              About
            </a>
            <a
              href="/#contact"
              className={`text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 transition-colors duration-300 text-sm lg:text-base py-2`}
            >
              Contact
            </a>

            {/* Dark mode toggle */}
            <ThemeToggle className="mx-1" />

            <Link to="/get-started">
              <motion.button
                className="btn-primary px-4 lg:px-6 py-2 text-white text-sm lg:text-base ml-1"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                Get Started
              </motion.button>
            </Link>
          </div>

          {/* Mobile Menu Button and Dark Mode Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Dark mode toggle */}
            <ThemeToggle size="small" />

            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none relative z-50 p-2 rounded-full bg-surface-200 dark:bg-dark-100"
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: 90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X size={20} className="text-accent-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={20} className="text-accent-500" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden fixed inset-0 bg-surface-50/95 dark:bg-dark-100/95 backdrop-blur-md z-40 pt-20"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <div className="flex flex-col items-center space-y-6 py-10">
                <motion.div variants={linkVariants}>
                  <Link
                    to="/"
                    className="text-xl font-medium text-gray-800 dark:text-white hover:text-primary dark:hover:text-primary-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </Link>
                </motion.div>
                <motion.div variants={linkVariants}>
                  <a
                    href="/#services"
                    className="text-xl font-medium text-gray-800 dark:text-white hover:text-primary dark:hover:text-primary-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Services
                  </a>
                </motion.div>
                <motion.div variants={linkVariants}>
                  <a
                    href="/#portfolio"
                    className="text-xl font-medium text-gray-800 dark:text-white hover:text-primary dark:hover:text-primary-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Portfolio
                  </a>
                </motion.div>
                <motion.div variants={linkVariants}>
                  <a
                    href="/#about"
                    className="text-xl font-medium text-gray-800 dark:text-white hover:text-primary dark:hover:text-primary-400"
                    onClick={() => setIsOpen(false)}
                  >
                    About
                  </a>
                </motion.div>
                <motion.div variants={linkVariants}>
                  <a
                    href="/#contact"
                    className="text-xl font-medium text-gray-800 dark:text-white hover:text-primary dark:hover:text-primary-400"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </a>
                </motion.div>
                <motion.div variants={linkVariants}>
                  <Link to="/get-started" onClick={() => setIsOpen(false)}>
                    <motion.button
                      className="mt-4 btn-primary px-8 py-3 w-full text-white"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Get Started
                    </motion.button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;

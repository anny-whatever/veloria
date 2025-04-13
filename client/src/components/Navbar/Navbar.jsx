// src/components/Navbar/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
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

  return (
    <nav
      ref={navRef}
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "py-3 bg-surface-50/90 backdrop-blur-md dark:bg-dark-200/90 shadow-sm"
          : "py-5 bg-transparent"
      } navbar-animation`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="logo-hover">
            <Logo />
          </div>

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
              <button className="btn-primary px-4 lg:px-6 py-2 text-white text-sm lg:text-base ml-1 hover-scale">
                Get Started
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button and Dark Mode Toggle */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Dark mode toggle */}
            <ThemeToggle size="small" />

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none relative z-50 p-2 rounded-full bg-surface-200 dark:bg-dark-100 menu-button"
            >
              {isOpen ? (
                <div className="icon-animate">
                  <X size={20} className="text-accent-500" />
                </div>
              ) : (
                <div className="icon-animate">
                  <Menu size={20} className="text-accent-500" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed inset-0 bg-surface-50/95 dark:bg-dark-100/95 backdrop-blur-md z-40 pt-20 mobile-menu h-screen ${
            isOpen ? "open" : "closed"
          }`}
        >
          <div className="flex flex-col items-center space-y-6 py-10">
            <div className="menu-link">
              <Link
                to="/"
                className="text-xl font-medium text-gray-800 dark:text-white hover:text-primary dark:hover:text-primary-400"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
            </div>
            <div className="menu-link">
              <a
                href="/#services"
                className="text-xl font-medium text-gray-800 dark:text-white hover:text-primary dark:hover:text-primary-400"
                onClick={() => setIsOpen(false)}
              >
                Services
              </a>
            </div>
            <div className="menu-link">
              <a
                href="/#portfolio"
                className="text-xl font-medium text-gray-800 dark:text-white hover:text-primary dark:hover:text-primary-400"
                onClick={() => setIsOpen(false)}
              >
                Portfolio
              </a>
            </div>
            <div className="menu-link">
              <a
                href="/#about"
                className="text-xl font-medium text-gray-800 dark:text-white hover:text-primary dark:hover:text-primary-400"
                onClick={() => setIsOpen(false)}
              >
                About
              </a>
            </div>
            <div className="menu-link">
              <a
                href="/#contact"
                className="text-xl font-medium text-gray-800 dark:text-white hover:text-primary dark:hover:text-primary-400"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </a>
            </div>
            <div className="menu-link">
              <Link to="/get-started" onClick={() => setIsOpen(false)}>
                <button className="mt-4 btn-primary px-8 py-3 w-full text-white">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

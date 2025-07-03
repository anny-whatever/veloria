// src/components/Navbar/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";

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
          ? "py-3 bg-black/95 backdrop-blur-lg border-b border-gray-800/50"
          : "py-5 bg-black/30 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="transform hover:scale-105 transition-transform duration-200">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center md:space-x-6 lg:space-x-8">
            <Link
              to="/"
              className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-all duration-300 text-sm lg:text-base font-medium"
            >
              Home
            </Link>
            <a
              href="/#services"
              className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-all duration-300 text-sm lg:text-base font-medium"
            >
              Services
            </a>
            <a
              href="/#portfolio"
              className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-all duration-300 text-sm lg:text-base font-medium"
            >
              Portfolio
            </a>
            <a
              href="/#about"
              className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-all duration-300 text-sm lg:text-base font-medium"
            >
              About
            </a>
            <a
              href="/#contact"
              className="text-gray-300 hover:text-white hover:bg-white/5 px-3 py-2 rounded-lg transition-all duration-300 text-sm lg:text-base font-medium"
            >
              Contact
            </a>

            <Link to="/get-started">
              <button className="group relative inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25 text-sm lg:text-base">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none relative z-50 p-3 rounded-full bg-gray-800/50 border border-gray-700/50 backdrop-blur-sm hover:bg-gray-700/50 transition-all duration-200"
            >
              {isOpen ? (
                <X size={20} className="text-white" />
              ) : (
                <Menu size={20} className="text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed inset-0 bg-black/95 backdrop-blur-lg z-40 pt-20 transition-all duration-300 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          <div className="flex flex-col items-center space-y-8 py-12">
            <Link
              to="/"
              className="text-2xl font-medium text-gray-300 hover:text-white hover:bg-white/5 px-6 py-3 rounded-lg transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <a
              href="/#services"
              className="text-2xl font-medium text-gray-300 hover:text-white hover:bg-white/5 px-6 py-3 rounded-lg transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Services
            </a>
            <a
              href="/#portfolio"
              className="text-2xl font-medium text-gray-300 hover:text-white hover:bg-white/5 px-6 py-3 rounded-lg transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Portfolio
            </a>
            <a
              href="/#about"
              className="text-2xl font-medium text-gray-300 hover:text-white hover:bg-white/5 px-6 py-3 rounded-lg transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href="/#contact"
              className="text-2xl font-medium text-gray-300 hover:text-white hover:bg-white/5 px-6 py-3 rounded-lg transition-all duration-300"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
            <Link to="/get-started" onClick={() => setIsOpen(false)}>
              <button className="group inline-flex items-center gap-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 text-lg mt-4">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

// src/components/Navbar/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Logo from "./Logo";
import {
  scrollToSection,
  setupSectionDetection,
  getNavbarColors,
} from "../../utils/smoothScroll";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentSection, setCurrentSection] = useState("home");
  const [isBrowser, setIsBrowser] = useState(false);
  const navRef = useRef(null);

  // Section IDs for detection
  const sectionIds = [
    "home",
    "services",
    "connectivity",
    "portfolio",
    "technical-excellence",
    "about",
    "contact",
  ];

  // Set isBrowser flag on client side
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Handle scroll effect and section detection
  useEffect(() => {
    if (!isBrowser) return;

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    // Setup section detection
    const cleanupSectionDetection = setupSectionDetection(
      (section) => {
        setCurrentSection(section || "home");
      },
      sectionIds,
      150
    );

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cleanupSectionDetection();
    };
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

  // Handle smooth scrolling to sections
  const handleSectionClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsOpen(false); // Close mobile menu if open
  };

  // Handle home button click
  const handleHomeClick = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setIsOpen(false); // Close mobile menu if open
  };

  // Get current navbar colors
  const navbarColors = getNavbarColors(currentSection);

  return (
    <nav
      ref={navRef}
      className={`fixed w-full z-50 transition-all duration-500 backdrop-blur-md ${navbarColors.shadow}`}
      style={{
        backgroundColor: scrolled ? navbarColors.bg : "transparent",
        paddingTop: scrolled ? "0.5rem" : "1rem",
        paddingBottom: scrolled ? "0.5rem" : "1rem",
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="transform transition-transform duration-200 hover:scale-105">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={handleHomeClick}
              className={`${navbarColors.text} ${navbarColors.hoverText} transition-colors duration-200 font-medium no-underline`}
            >
              Home
            </button>
            <button
              onClick={() => handleSectionClick("services")}
              className={`${navbarColors.text} ${navbarColors.hoverText} transition-colors duration-200 font-medium no-underline`}
            >
              Services
            </button>
            <button
              onClick={() => handleSectionClick("portfolio")}
              className={`${navbarColors.text} ${navbarColors.hoverText} transition-colors duration-200 font-medium no-underline`}
            >
              Portfolio
            </button>
            <button
              onClick={() => handleSectionClick("about")}
              className={`${navbarColors.text} ${navbarColors.hoverText} transition-colors duration-200 font-medium no-underline`}
            >
              About
            </button>
            <button
              onClick={() => handleSectionClick("contact")}
              className={`${navbarColors.text} ${navbarColors.hoverText} transition-colors duration-200 font-medium no-underline`}
            >
              Contact
            </button>

            <Link to="/get-started">
              <button className="inline-flex items-center gap-2 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white px-6 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105 no-underline">
                Get Started
                <ArrowRight className="w-4 h-4" />
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 ${navbarColors.text} ${navbarColors.hoverText} transition-colors duration-200`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed inset-0 z-40 pt-20 transition-all duration-300 ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          style={{
            backgroundColor:
              navbarColors.bg === "transparent"
                ? "rgba(255, 255, 255, 0.95)"
                : navbarColors.bg,
            backdropFilter: "blur(16px)",
          }}
        >
          <div className="flex flex-col items-center space-y-8 py-12">
            <button
              onClick={handleHomeClick}
              className={`text-xl font-medium transition-colors duration-200 no-underline ${
                navbarColors.bg === "#EDEDED" ||
                navbarColors.bg === "rgba(255, 255, 255, 0.9)"
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white hover:text-gray-200"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleSectionClick("services")}
              className={`text-xl font-medium transition-colors duration-200 no-underline ${
                navbarColors.bg === "#EDEDED" ||
                navbarColors.bg === "rgba(255, 255, 255, 0.9)"
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white hover:text-gray-200"
              }`}
            >
              Services
            </button>
            <button
              onClick={() => handleSectionClick("portfolio")}
              className={`text-xl font-medium transition-colors duration-200 no-underline ${
                navbarColors.bg === "#EDEDED" ||
                navbarColors.bg === "rgba(255, 255, 255, 0.9)"
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white hover:text-gray-200"
              }`}
            >
              Portfolio
            </button>
            <button
              onClick={() => handleSectionClick("about")}
              className={`text-xl font-medium transition-colors duration-200 no-underline ${
                navbarColors.bg === "#EDEDED" ||
                navbarColors.bg === "rgba(255, 255, 255, 0.9)"
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white hover:text-gray-200"
              }`}
            >
              About
            </button>
            <button
              onClick={() => handleSectionClick("contact")}
              className={`text-xl font-medium transition-colors duration-200 no-underline ${
                navbarColors.bg === "#EDEDED" ||
                navbarColors.bg === "rgba(255, 255, 255, 0.9)"
                  ? "text-gray-700 hover:text-gray-900"
                  : "text-white hover:text-gray-200"
              }`}
            >
              Contact
            </button>
            <Link to="/get-started" onClick={() => setIsOpen(false)}>
              <button className="inline-flex items-center gap-3 bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 text-white px-8 py-3 rounded-full font-medium transition-all duration-200 transform hover:scale-105 text-lg mt-4 no-underline">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

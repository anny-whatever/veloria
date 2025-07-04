// src/components/Navbar/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();

  // Check if we're on the GetStarted page
  const isGetStartedPage = location.pathname === "/get-started";

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
  const navbarColors = isGetStartedPage
    ? {
        bg: "rgba(0, 0, 0, 0.9)", // Full black for GetStarted page
        text: "text-white",
        hoverText: "hover:text-gray-200",
        shadow: "shadow-xl",
      }
    : getNavbarColors(currentSection);

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
      <div className="container px-4 mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="transition-transform duration-200 transform hover:scale-105">
            <Logo />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {isGetStartedPage ? (
              <>
                <Link
                  to="/"
                  className={`${navbarColors.text} ${navbarColors.hoverText} transition-colors duration-200 font-medium no-underline`}
                >
                  Home
                </Link>
                <Link
                  to="/#services"
                  className={`${navbarColors.text} ${navbarColors.hoverText} transition-colors duration-200 font-medium no-underline`}
                >
                  Services
                </Link>
                <Link
                  to="/#portfolio"
                  className={`${navbarColors.text} ${navbarColors.hoverText} transition-colors duration-200 font-medium no-underline`}
                >
                  Portfolio
                </Link>
                <Link
                  to="/#about"
                  className={`${navbarColors.text} ${navbarColors.hoverText} transition-colors duration-200 font-medium no-underline`}
                >
                  About
                </Link>
                <Link
                  to="/#contact"
                  className={`${navbarColors.text} ${navbarColors.hoverText} transition-colors duration-200 font-medium no-underline`}
                >
                  Contact
                </Link>
              </>
            ) : (
              <>
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
              </>
            )}

            {!isGetStartedPage && (
              <Link to="/get-started">
                <button className="inline-flex gap-2 items-center px-6 py-2 font-medium text-white no-underline bg-gradient-to-r rounded-full transition-all duration-200 transform from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 hover:scale-105">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 ${navbarColors.text} ${navbarColors.hoverText} transition-all duration-200 hover:scale-105 transform`}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Backdrop */}
        <div
          className={`md:hidden fixed inset-0 z-40 transition-all duration-300 ${
            isOpen ? "visible opacity-100" : "invisible opacity-0"
          } ${
            isGetStartedPage ? "bg-gray-900/95" : "bg-gray-900/90"
          } backdrop-blur-xl`}
          onClick={() => setIsOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-6 right-6 z-50 p-2 rounded-full backdrop-blur-sm transition-all duration-200 bg-white/10 hover:bg-white/20"
          >
            <X size={24} className="text-white" />
          </button>

          {/* Mobile Menu Content */}
          <div
            className="flex flex-col justify-center items-center min-h-screen bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Logo */}
            <div className="mb-12">
              <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-400 via-light-400 to-accent-400">
                Veloria Labs
              </h1>
            </div>

            {/* Navigation Items */}
            <div className="flex flex-col items-center space-y-8">
              {isGetStartedPage ? (
                <>
                  <Link
                    to="/"
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-light text-white no-underline transition-all duration-300 transform hover:text-primary-400 hover:scale-105"
                  >
                    Home
                  </Link>
                  <Link
                    to="/#services"
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-light text-white no-underline transition-all duration-300 transform hover:text-primary-400 hover:scale-105"
                  >
                    Services
                  </Link>
                  <Link
                    to="/#portfolio"
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-light text-white no-underline transition-all duration-300 transform hover:text-primary-400 hover:scale-105"
                  >
                    Portfolio
                  </Link>
                  <Link
                    to="/#about"
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-light text-white no-underline transition-all duration-300 transform hover:text-primary-400 hover:scale-105"
                  >
                    About
                  </Link>
                  <Link
                    to="/#contact"
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-light text-white no-underline transition-all duration-300 transform hover:text-primary-400 hover:scale-105"
                  >
                    Contact
                  </Link>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      handleHomeClick();
                      setIsOpen(false);
                    }}
                    className="text-2xl font-light text-white no-underline transition-all duration-300 transform hover:text-primary-400 hover:scale-105"
                  >
                    Home
                  </button>
                  <button
                    onClick={() => {
                      handleSectionClick("services");
                      setIsOpen(false);
                    }}
                    className="text-2xl font-light text-white no-underline transition-all duration-300 transform hover:text-primary-400 hover:scale-105"
                  >
                    Services
                  </button>
                  <button
                    onClick={() => {
                      handleSectionClick("portfolio");
                      setIsOpen(false);
                    }}
                    className="text-2xl font-light text-white no-underline transition-all duration-300 transform hover:text-primary-400 hover:scale-105"
                  >
                    Portfolio
                  </button>
                  <button
                    onClick={() => {
                      handleSectionClick("about");
                      setIsOpen(false);
                    }}
                    className="text-2xl font-light text-white no-underline transition-all duration-300 transform hover:text-primary-400 hover:scale-105"
                  >
                    About
                  </button>
                  <button
                    onClick={() => {
                      handleSectionClick("contact");
                      setIsOpen(false);
                    }}
                    className="text-2xl font-light text-white no-underline transition-all duration-300 transform hover:text-primary-400 hover:scale-105"
                  >
                    Contact
                  </button>

                  {/* Get Started Button */}
                  <div className="mt-12">
                    <Link to="/get-started" onClick={() => setIsOpen(false)}>
                      <button className="inline-flex gap-3 items-center px-10 py-4 text-lg font-medium text-white bg-gradient-to-r rounded-full shadow-lg backdrop-blur-sm transition-all duration-300 transform from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 hover:scale-105 hover:shadow-primary-500/25">
                        Get Started
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </Link>
                  </div>
                </>
              )}
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t to-transparent pointer-events-none from-primary-900/20" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl to-transparent pointer-events-none from-accent-900/20" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

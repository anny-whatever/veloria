// src/components/Navbar/Navbar.jsx
import { useState, useEffect, useRef } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";
import NavLink from "./NavLink";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);

  // Handle scroll effect with smooth transitions
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

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
        scrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
      }`}
      initial="initial"
      animate="animate"
      variants={navbarVariants}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Logo />
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#home" text="Home" />
            <NavLink href="#services" text="Services" />
            <NavLink href="#portfolio" text="Portfolio" />
            <NavLink href="#about" text="About" />
            <NavLink href="#contact" text="Contact" />
            <motion.button
              className="px-6 py-2 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-medium transition-all duration-300 hover:shadow-glow-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Get Started
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="focus:outline-none relative z-50"
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
                    <X size={24} className="text-accent" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ opacity: 0, rotate: 90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0, rotate: -90 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu size={24} className="text-accent" />
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
              className="md:hidden fixed inset-0 bg-white/95 z-40 pt-20"
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
            >
              <div className="flex flex-col items-center space-y-6 py-10">
                <motion.div variants={linkVariants}>
                  <NavLink
                    href="#home"
                    text="Home"
                    mobile
                    onClick={() => setIsOpen(false)}
                  />
                </motion.div>
                <motion.div variants={linkVariants}>
                  <NavLink
                    href="#services"
                    text="Services"
                    mobile
                    onClick={() => setIsOpen(false)}
                  />
                </motion.div>
                <motion.div variants={linkVariants}>
                  <NavLink
                    href="#portfolio"
                    text="Portfolio"
                    mobile
                    onClick={() => setIsOpen(false)}
                  />
                </motion.div>
                <motion.div variants={linkVariants}>
                  <NavLink
                    href="#about"
                    text="About"
                    mobile
                    onClick={() => setIsOpen(false)}
                  />
                </motion.div>
                <motion.div variants={linkVariants}>
                  <NavLink
                    href="#contact"
                    text="Contact"
                    mobile
                    onClick={() => setIsOpen(false)}
                  />
                </motion.div>
                <motion.button
                  className="mt-4 px-8 py-3 rounded-full w-4/5 bg-gradient-to-r from-primary to-secondary text-white font-medium transition-all duration-300 hover:shadow-glow-primary"
                  variants={linkVariants}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;

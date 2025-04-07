// src/pages/GetStarted/GetStarted.jsx
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ProjectForm from "./ProjectForm";
import ProcessTimeline from "./ProcessTimeline";
import PricingCards from "./PricingCards";
import FaqSection from "./FaqSection";
import CalendarBooking from "./CalendarBooking";
import ContactForm from "../../components/Contact/ContactForm";
import {
  ArrowLeft,
  ChevronRight,
  ChevronLeft,
  MessageSquare,
} from "lucide-react";

const GetStarted = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [activeSection, setActiveSection] = useState("contact");
  const tabsContainerRef = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  // Tab data for navigation
  const tabs = [
    { id: "contact", label: "Contact Us" },
    { id: "form", label: "Project Form" },
    { id: "pricing", label: "Pricing" },
    { id: "process", label: "Our Process" },
    { id: "booking", label: "Book a Call" },
    { id: "faq", label: "FAQs" },
  ];

  // Check if the tabs container has overflow
  useEffect(() => {
    const checkOverflow = () => {
      if (tabsContainerRef.current) {
        const { scrollWidth, clientWidth } = tabsContainerRef.current;
        setHasOverflow(scrollWidth > clientWidth);
      }
    };

    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  // Update scroll position when tabs are scrolled
  const handleScroll = () => {
    if (tabsContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsContainerRef.current;
      setScrollPosition(scrollLeft / (scrollWidth - clientWidth));
    }
  };

  // Scroll to active tab
  const scrollTabsToActive = () => {
    const activeTab = document.getElementById(`tab-${activeSection}`);
    if (activeTab) {
      activeTab.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  };

  // Scroll tabs left or right
  const scrollTabs = (direction) => {
    if (tabsContainerRef.current) {
      const { clientWidth } = tabsContainerRef.current;
      const scrollAmount =
        direction === "left" ? -clientWidth / 2 : clientWidth / 2;
      tabsContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Handle contact form submission
  const handleContactFormSubmit = (formData) => {
    console.log("Contact form submitted:", formData);
    // You can add additional handling here if needed
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-50 dark:from-dark-200 dark:to-dark-300">
      <Navbar />

      <div className="container mx-auto px-4 md:px-6 pt-32 pb-20">
        <motion.div
          className="mb-8"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/#contact"
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-400 transition-colors duration-300"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 dark:from-white dark:to-gray-300">
              Let's Start Your Project
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
              Tell us about your project needs and let's create something
              amazing together. We're here to bring your vision to life.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="bg-white dark:bg-dark-200 rounded-2xl shadow-xl dark:shadow-dark-900/30 p-6 md:p-8 mb-16"
          >
            {/* Mobile-friendly tab navigation */}
            <div className="relative mb-8 overflow-hidden">
              {/* Scroll left button */}
              {hasOverflow && scrollPosition > 0.05 && (
                <button
                  onClick={() => scrollTabs("left")}
                  className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-dark-300/80 rounded-full shadow-md p-1"
                  aria-label="Scroll tabs left"
                >
                  <ChevronLeft
                    size={20}
                    className="text-gray-700 dark:text-gray-300"
                  />
                </button>
              )}

              {/* Scrollable tabs container */}
              <div
                ref={tabsContainerRef}
                className="flex overflow-x-auto scrollbar-hide py-2"
                onScroll={handleScroll}
              >
                <div className="flex space-x-4 md:space-x-6 w-max px-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      id={`tab-${tab.id}`}
                      onClick={() => {
                        setActiveSection(tab.id);
                        setTimeout(scrollTabsToActive, 100);
                      }}
                      className={`py-4 px-3 whitespace-nowrap flex-shrink-0 relative ${
                        activeSection === tab.id
                          ? "text-primary dark:text-primary-400 font-semibold"
                          : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                      }`}
                    >
                      {tab.label}
                      {activeSection === tab.id && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary dark:bg-primary-400"
                          layoutId="activeTab"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scroll right button */}
              {hasOverflow && scrollPosition < 0.95 && (
                <button
                  onClick={() => scrollTabs("right")}
                  className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-dark-300/80 rounded-full shadow-md p-1"
                  aria-label="Scroll tabs right"
                >
                  <ChevronRight
                    size={20}
                    className="text-gray-700 dark:text-gray-300"
                  />
                </button>
              )}

              {/* Gradient overlays to indicate scrollable content */}
              {hasOverflow && scrollPosition > 0.05 && (
                <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-white dark:from-dark-100 to-transparent pointer-events-none"></div>
              )}
              {hasOverflow && scrollPosition < 0.95 && (
                <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-white dark:from-dark-100 to-transparent pointer-events-none"></div>
              )}
            </div>

            {/* Dots indicator for scrolling */}
            {hasOverflow && (
              <div className="flex justify-center space-x-1 mb-8">
                {[...Array(tabs.length)].map((_, i) => {
                  const tabPosition = i / (tabs.length - 1);
                  const isActive =
                    (i === 0 && scrollPosition < 0.15) ||
                    (i === tabs.length - 1 && scrollPosition > 0.85) ||
                    (tabPosition - 0.15 <= scrollPosition &&
                      scrollPosition <= tabPosition + 0.15);

                  return (
                    <div
                      key={i}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isActive
                          ? "bg-primary dark:bg-primary-400 scale-125"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    ></div>
                  );
                })}
              </div>
            )}

            <div className="pt-4 ">
              {activeSection === "contact" && (
                <div className="max-w-3xl mx-auto">
                  <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                      Get In Touch
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      Have questions or ready to start? Send us a message and
                      we'll get back to you promptly.
                    </p>
                  </div>
                  <ContactForm onSubmit={handleContactFormSubmit} />
                </div>
              )}
              {activeSection === "form" && (
                <ProjectForm setActiveSection={setActiveSection} />
              )}
              {activeSection === "pricing" && <PricingCards />}
              {activeSection === "process" && (
                <ProcessTimeline setActiveSection={setActiveSection} />
              )}
              {activeSection === "booking" && <CalendarBooking />}
              {activeSection === "faq" && (
                <FaqSection setActiveSection={setActiveSection} />
              )}
            </div>
          </motion.div>

          <Link to="/#contact">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-400 dark:to-secondary-400 text-white rounded-lg shadow-md w-full sm:w-auto"
              onClick={() => {
                window.location.href = "/#contact";
              }}
            >
              <div className="flex items-center justify-center">
                <MessageSquare size={18} className="mr-2" />
                <span>Contact Us</span>
              </div>
            </motion.button>
          </Link>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default GetStarted;

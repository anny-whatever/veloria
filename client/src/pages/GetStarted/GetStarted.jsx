// src/pages/GetStarted/GetStarted.jsx
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import ProjectForm from "./ProjectForm";
import ProcessTimeline from "./ProcessTimeline";
import PricingCards from "./PricingCards";
import FaqSection from "./FaqSection";
import CalendarBooking from "./CalendarBooking";
import ContactForm from "../../components/Contact/ContactForm";
import { SeoHead, PAGE_SEO, getStartedPageSchema } from "../../components/SEO";
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
      <SeoHead
        title={PAGE_SEO.getStarted.title}
        description={PAGE_SEO.getStarted.description}
        keywords={PAGE_SEO.getStarted.keywords}
        pathname="/get-started"
        structuredData={getStartedPageSchema()}
      />

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
              Start Your Custom Web & Software Project Today
            </h1>
            <p className="text-gray-700 dark:text-gray-300 text-lg max-w-3xl mx-auto">
              Transform your business with our expert web design, software
              development, and management systems. Fill out the form below for a{" "}
              <span className="font-semibold text-primary dark:text-primary-400">
                free consultation
              </span>{" "}
              and
              <span className="font-semibold text-primary dark:text-primary-400">
                {" "}
                custom quote
              </span>{" "}
              tailored to your specific needs.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="px-2 py-1 bg-gray-100 dark:bg-dark-300 rounded-full">
                ✓ Free Consultation
              </span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-dark-300 rounded-full">
                ✓ No Obligation Quote
              </span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-dark-300 rounded-full">
                ✓ 24-48 Hour Response
              </span>
              <span className="px-2 py-1 bg-gray-100 dark:bg-dark-300 rounded-full">
                ✓ Expert Solutions
              </span>
            </div>
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

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mt-6">
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

            <a
              href="https://wa.me/9315360595"
              target="_blank"
              rel="noopener noreferrer"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-[#25D366] text-white rounded-lg shadow-md w-full sm:w-auto"
              >
                <div className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-2"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  <span>WhatsApp Us</span>
                </div>
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Footer component removed to prevent duplicate footers */}
    </div>
  );
};

export default GetStarted;

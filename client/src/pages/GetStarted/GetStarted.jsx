// src/pages/GetStarted/GetStarted.jsx
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  MessageSquare,
  Phone,
  Calendar,
  HelpCircle,
} from "lucide-react";
import ProcessTimeline from "./ProcessTimeline";
import FaqSection from "./FaqSection";
import CalendarBooking from "./CalendarBooking";
import ContactForm from "../../components/Contact/ContactForm";
import { SeoHead, PAGE_SEO, getStartedPageSchema } from "../../components/SEO";

const GetStarted = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const [activeSection, setActiveSection] = useState("contact");

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
    },
  };

  const slideFromLeft = {
    hidden: { x: -60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
    },
  };

  const slideFromRight = {
    hidden: { x: 60, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] },
    },
  };

  // Handle contact form submission
  const handleContactFormSubmit = (formData) => {
    console.log("Contact form submitted:", formData);
  };

  // Navigation items
  const navigationItems = [
    { id: "contact", label: "Get In Touch", icon: MessageSquare },
    { id: "process", label: "Our Process", icon: Phone },
    { id: "booking", label: "Book a Call", icon: Calendar },
    { id: "faq", label: "FAQ", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <SeoHead
        title={PAGE_SEO.getStarted.title}
        description={PAGE_SEO.getStarted.description}
        keywords={PAGE_SEO.getStarted.keywords}
        pathname="/get-started"
        structuredData={getStartedPageSchema()}
      />

      {/* Subtle background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-transparent via-gray-600/20 to-transparent transform -rotate-12" />
        <div className="absolute top-1/2 right-1/3 w-px h-24 bg-gradient-to-b from-transparent via-gray-600/20 to-transparent transform rotate-45" />
        <div className="absolute bottom-1/4 left-1/2 w-px h-40 bg-gradient-to-b from-transparent via-gray-600/20 to-transparent transform rotate-12" />
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-6 pt-32 pb-20">
        {/* Back Button */}
        <motion.div
          className="mb-8"
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="flex items-center text-gray-400 hover:text-white transition-colors duration-300"
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
          className="max-w-6xl mx-auto"
        >
          {/* Hero Section */}
          <motion.div
            className="mx-auto mb-24 max-w-4xl text-center"
            variants={itemVariants}
          >
            <div className="mb-8">
              <motion.div
                className="inline-block mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-6xl font-light text-white">
                  Start Your Journey
                </h1>
              </motion.div>
              <motion.div
                className="mx-auto w-20 h-px bg-gradient-to-r from-transparent via-gray-500 to-transparent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </div>
            <motion.p
              className="mx-auto max-w-3xl text-lg md:text-xl font-light leading-relaxed text-gray-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              Ready to transform your digital presence? Let's discuss your
              project and create something{" "}
              <span className="text-gray-300 font-normal">extraordinary</span>{" "}
              together.
            </motion.p>

            {/* Benefits Tags */}
            <motion.div
              className="flex flex-wrap justify-center gap-6 mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-2 h-2 bg-gray-500 rounded-full" />
                <span className="text-sm font-light">Free Consultation</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-2 h-2 bg-gray-500 rounded-full" />
                <span className="text-sm font-light">24-48 Hour Response</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <div className="w-2 h-2 bg-gray-500 rounded-full" />
                <span className="text-sm font-light">Expert Solutions</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Navigation */}
          <motion.div className="mb-16" variants={itemVariants}>
            <div className="flex justify-center">
              <div className="flex gap-1 p-1 border border-gray-800/50">
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`flex items-center gap-2 px-6 py-3 transition-all duration-300 ${
                      activeSection === item.id
                        ? "bg-gray-700/50 text-white border-b-2 border-gray-500"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    <item.icon size={16} />
                    <span className="text-sm font-light">{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Main Content Area */}
          <motion.div variants={itemVariants} className="mb-24">
            <div className="min-h-[600px]">
              {activeSection === "contact" && (
                <div className="max-w-4xl mx-auto">
                  <div className="flex flex-col lg:flex-row gap-16 items-start mb-16">
                    <motion.div
                      className="flex-shrink-0 lg:w-1/3"
                      variants={slideFromLeft}
                    >
                      <div className="sticky top-32">
                        <div className="mb-6 w-12 h-px bg-gradient-to-r from-gray-500 to-transparent" />
                        <h2 className="mb-4 text-2xl md:text-3xl font-light text-white">
                          Get In Touch
                        </h2>
                        <div className="mb-6 w-6 h-px bg-gray-600" />
                        <p className="text-lg font-light leading-relaxed text-gray-400">
                          Ready to bring your vision to life? Send us a message
                          and we'll get back to you promptly with a detailed
                          proposal.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div className="lg:w-2/3" variants={slideFromRight}>
                      <ContactForm onSubmit={handleContactFormSubmit} />
                    </motion.div>
                  </div>
                </div>
              )}

              {activeSection === "process" && (
                <div className="max-w-4xl mx-auto">
                  <div className="flex flex-col lg:flex-row gap-16 items-start mb-16">
                    <motion.div
                      className="flex-shrink-0 lg:w-1/3"
                      variants={slideFromLeft}
                    >
                      <div className="sticky top-32">
                        <div className="mb-6 w-12 h-px bg-gradient-to-r from-gray-500 to-transparent" />
                        <h2 className="mb-4 text-2xl md:text-3xl font-light text-white">
                          Our Process
                        </h2>
                        <div className="mb-6 w-6 h-px bg-gray-600" />
                        <p className="text-lg font-light leading-relaxed text-gray-400">
                          We follow a structured approach to deliver exceptional
                          results on time, every time.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div className="lg:w-2/3" variants={slideFromRight}>
                      <ProcessTimeline setActiveSection={setActiveSection} />
                    </motion.div>
                  </div>
                </div>
              )}

              {activeSection === "booking" && (
                <div className="max-w-4xl mx-auto">
                  <div className="flex flex-col lg:flex-row gap-16 items-start mb-16">
                    <motion.div
                      className="flex-shrink-0 lg:w-1/3"
                      variants={slideFromLeft}
                    >
                      <div className="sticky top-32">
                        <div className="mb-6 w-12 h-px bg-gradient-to-r from-gray-500 to-transparent" />
                        <h2 className="mb-4 text-2xl md:text-3xl font-light text-white">
                          Book a Call
                        </h2>
                        <div className="mb-6 w-6 h-px bg-gray-600" />
                        <p className="text-lg font-light leading-relaxed text-gray-400">
                          Schedule a free consultation to discuss your project
                          in detail and get personalized recommendations.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div className="lg:w-2/3" variants={slideFromRight}>
                      <CalendarBooking />
                    </motion.div>
                  </div>
                </div>
              )}

              {activeSection === "faq" && (
                <div className="max-w-4xl mx-auto">
                  <div className="flex flex-col lg:flex-row gap-16 items-start mb-16">
                    <motion.div
                      className="flex-shrink-0 lg:w-1/3"
                      variants={slideFromLeft}
                    >
                      <div className="sticky top-32">
                        <div className="mb-6 w-12 h-px bg-gradient-to-r from-gray-500 to-transparent" />
                        <h2 className="mb-4 text-2xl md:text-3xl font-light text-white">
                          FAQ
                        </h2>
                        <div className="mb-6 w-6 h-px bg-gray-600" />
                        <p className="text-lg font-light leading-relaxed text-gray-400">
                          Find answers to common questions about our services
                          and process.
                        </p>
                      </div>
                    </motion.div>

                    <motion.div className="lg:w-2/3" variants={slideFromRight}>
                      <FaqSection setActiveSection={setActiveSection} />
                    </motion.div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default GetStarted;

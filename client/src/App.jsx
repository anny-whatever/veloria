// src/App.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import ModernHero from "./components/Hero/ModernHero";
import Portfolio from "./components/Portfolio/Portfolio";
import SpotlightServices from "./components/Services/SpotlightServices";
import GlobalReach from "./components/GlobalReach";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import {
  SeoHead,
  PAGE_SEO,
  getOrganizationSchema,
  BacklinkHelper,
  LinkBuildingStrategy,
} from "./components/SEO";
import GetStarted from "./pages/GetStarted/GetStarted";
import ServicesPage from "./pages/Services/ServicesPage";
import HotelManagementSystem from "./pages/Services/HotelManagementSystem";
import SchoolManagementSystem from "./pages/Services/SchoolManagementSystem";
import HospitalManagementSystem from "./pages/Services/HospitalManagementSystem";
import EcommerceManagementSystem from "./pages/Services/EcommerceManagementSystem";
import ERPSystem from "./pages/Services/ERPSystem";
import UIUXDesign from "./pages/Services/UIUXDesign";
import WebDevelopment from "./pages/Services/WebDevelopment";
import MobileAppDevelopment from "./pages/Services/MobileAppDevelopment";
import CustomSoftwareDevelopment from "./pages/Services/CustomSoftwareDevelopment";
import DatabaseSolutions from "./pages/Services/DatabaseSolutions";
import PayrollManagementSystem from "./pages/Services/PayrollManagementSystem";
import PrivacyPolicy from "./pages/Legal/PrivacyPolicy";
import TermsOfService from "./pages/Legal/TermsOfService";
import NotFound from "./pages/NotFound";

// Main App component with routing
function App() {
  const [isBrowser, setIsBrowser] = useState(false);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const isHomePage = location.pathname === "/";

  // Check if we're in browser environment
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  useEffect(() => {
    // Preload animations and resources
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const loadingVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.5 },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.2,
      },
    },
  };

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  // Animation variants for the loading elements
  const logoVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.2 },
    },
  };

  const taglineVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: 0.6 },
    },
  };

  // Dots animation for the loader
  const dotsContainerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4,
      },
    },
  };

  const dotVariants = {
    initial: { y: 0, opacity: 0 },
    animate: {
      y: [0, -12, 0],
      opacity: 1,
      transition: {
        y: {
          repeat: Infinity,
          duration: 1,
          repeatType: "loop",
          ease: "easeInOut",
        },
        opacity: { duration: 0.2 },
      },
    },
  };

  // Layout component for public routes (with Navbar and Footer)
  const PublicLayout = () => (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      {isBrowser && (
        <motion.button
          onClick={scrollToTop}
          className="flex fixed right-6 bottom-6 z-50 justify-center items-center w-12 h-12 text-white bg-gradient-to-r rounded-full shadow-lg transition-all duration-300 from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 hover:shadow-primary-500/25"
          whileHover={{ y: -5, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </>
  );

  const HomePage = () => (
    <>
      <SeoHead
        title={PAGE_SEO.home.title}
        description={PAGE_SEO.home.description}
        keywords={PAGE_SEO.home.keywords}
        pathname="/"
        structuredData={getOrganizationSchema()}
      />
      <ModernHero />
      <SpotlightServices />
      <GlobalReach />
      <Portfolio />
      <About />
      <Contact />
    </>
  );

  return (
    <div className="min-h-screen text-white bg-black">
      {/* Loading Screen */}
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div
            key="loading"
            variants={loadingVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex fixed inset-0 z-50 flex-col justify-center items-center min-h-screen bg-black"
          >
            {/* Logo */}
            <motion.div
              variants={logoVariants}
              initial="initial"
              animate="animate"
              className="mb-1"
            >
              <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-accent-700">
                Veloria Labs
              </h1>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={taglineVariants}
              initial="initial"
              animate="animate"
              className="mb-1 text-gray-600 dark:text-gray-400"
            >
              Engineering Tomorrow's Products
            </motion.p>

            {/* Animated dots */}
            <motion.div
              variants={dotsContainerVariants}
              initial="initial"
              animate="animate"
              className="flex space-x-2"
            >
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  variants={dotVariants}
                  className="w-3 h-3 bg-gradient-to-r rounded-full from-primary to-secondary"
                />
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      {!loading && (
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
        >
          {/* SEO Backlink Helpers */}
          <BacklinkHelper
            includeAttributes={true}
            authorshipMarkup={true}
            references={[
              {
                title: "Web Development Best Practices",
                url: "https://blog.veloria.in/web-development-best-practices",
              },
              {
                title: "UX Design Principles",
                url: "https://blog.veloria.in/ux-design-principles",
              },
              {
                title: "Mobile App Development",
                url: "https://blog.veloria.in/mobile-app-development",
              },
              {
                title: "Custom Software Solutions",
                url: "https://blog.veloria.in/custom-software-solutions",
              },
            ]}
            citations={[
              {
                title: "SEO for Tech Companies",
                url: "https://moz.com/seo-guide",
                author: "Moz",
              },
              {
                title: "Web Performance",
                url: "https://web.dev/performance",
                author: "Google",
              },
              {
                title: "Accessibility Standards",
                url: "https://www.w3.org/WAI/",
                author: "W3C",
              },
              {
                title: "Responsive Design",
                url: "https://developers.google.com/web/responsive",
                author: "Google Developers",
              },
            ]}
          />

          {isBrowser && (
            <LinkBuildingStrategy
              isHomepage={location.pathname === "/"}
              currentPageUrl={
                isBrowser
                  ? window.location.href
                  : `https://veloria.in${location.pathname}`
              }
              industry="Web Development"
              authorDetails={{
                name: "Veloria Team",
                url: "https://veloria.in/about",
                jobTitle: "Web Development Experts",
              }}
              citations={[
                {
                  title: "Mobile App Development Guide",
                  url: "https://developer.android.com/guide",
                  type: "reference",
                },
              ]}
            />
          )}

          {/* Wrap Routes in AnimatePresence with proper locationKey for page transitions */}
          <AnimatePresence mode="wait" initial={false}>
            <Routes key={location.pathname} location={location}>
              {/* Public routes with Navbar and Footer */}
              <Route element={<PublicLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/get-started" element={<GetStarted />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route
                  path="/services/hotel-management-system"
                  element={<HotelManagementSystem />}
                />
                <Route
                  path="/services/school-management-system"
                  element={<SchoolManagementSystem />}
                />
                <Route
                  path="/services/hospital-management-system"
                  element={<HospitalManagementSystem />}
                />
                <Route
                  path="/services/ecommerce-management-system"
                  element={<EcommerceManagementSystem />}
                />
                <Route path="/services/erp-system" element={<ERPSystem />} />
                <Route path="/services/ui-ux-design" element={<UIUXDesign />} />
                <Route
                  path="/services/web-development"
                  element={<WebDevelopment />}
                />
                <Route
                  path="/services/mobile-app-development"
                  element={<MobileAppDevelopment />}
                />
                <Route
                  path="/services/custom-software-development"
                  element={<CustomSoftwareDevelopment />}
                />
                <Route
                  path="/services/database-solutions"
                  element={<DatabaseSolutions />}
                />
                <Route
                  path="/services/payroll-management-system"
                  element={<PayrollManagementSystem />}
                />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />
                {/* Catch-all route for 404 page */}
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

export default App;

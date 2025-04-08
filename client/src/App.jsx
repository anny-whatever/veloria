// src/App.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Routes, Route, useLocation, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Portfolio from "./components/Portfolio/Portfolio";
import Services from "./components/Services/Services";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import ThemeToggle from "./components/ThemeToggle";
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
import AdminDashboard from "./pages/Admin/AdminDashboard";
import AdminHome from "./pages/Admin/AdminHome";
import BookingsList from "./pages/Admin/BookingsList";
import BookingDetails from "./pages/Admin/BookingDetails";
import ContactsList from "./pages/Admin/ContactsList";
import ContactDetails from "./pages/Admin/ContactDetails";
import ProjectPipeline from "./pages/Admin/ProjectPipeline";
import CreateProjectForm from "./pages/Admin/CreateProjectForm";
import EditProjectForm from "./pages/Admin/EditProjectForm";
import ProjectDetails from "./pages/Admin/ProjectDetails";
import ProjectsCalendar from "./pages/Admin/ProjectsCalendar";
import ProjectsList from "./pages/Admin/ProjectsList";
import BookingsCalendar from "./pages/Admin/BookingsCalendar";
import Finance from "./pages/Admin/Finance";
import AdminBookingForm from "./pages/Admin/AdminBookingForm";

// Import placeholder components for the settings
const AdminSettings = () => (
  <div className="p-6">
    <h1 className="mb-4 text-2xl font-bold">Admin Settings</h1>
    <p>
      This page is under construction. Admin settings will be available soon.
    </p>
  </div>
);

const AdminProfile = () => (
  <div className="p-6">
    <h1 className="mb-4 text-2xl font-bold">Admin Profile</h1>
    <p>
      This page is under construction. Admin profile settings will be available
      soon.
    </p>
  </div>
);

// Main App component with routing
function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const isHomePage = location.pathname === "/";

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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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

  const HomePage = () => (
    <>
      <SeoHead
        title={PAGE_SEO.home.title}
        description={PAGE_SEO.home.description}
        keywords={PAGE_SEO.home.keywords}
        pathname="/"
        structuredData={getOrganizationSchema()}
      />
      <Header />
      <Services />
      <Portfolio />
      <About />
      <Contact />
    </>
  );

  return (
    <div className="min-h-screen text-gray-900 bg-surface-50 dark:bg-dark-200 dark:text-gray-100">
      <AnimatePresence mode="wait">
        <Navbar key="navbar" />

        {/* SEO Backlink Helpers */}
        <BacklinkHelper
          includeAttributes={true}
          authorshipMarkup={true}
          references={[
            {
              title: "Web Development Best Practices",
              url: "https://www.smashingmagazine.com/category/web-development/",
            },
            {
              title: "Mobile App Development Trends",
              url: "https://www.appbrain.com/stats/top-manufacturers",
            },
          ]}
        />

        <LinkBuildingStrategy
          isHomepage={window.location.pathname === "/"}
          currentPageUrl={window.location.href}
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

        <Routes>
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
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<AdminHome />} />
            <Route path="bookings" element={<BookingsList />} />
            <Route path="bookings/new" element={<AdminBookingForm />} />
            <Route path="bookings/:id" element={<BookingDetails />} />
            <Route path="bookings/calendar" element={<BookingsCalendar />} />
            <Route path="contacts" element={<ContactsList />} />
            <Route path="contacts/:id" element={<ContactDetails />} />
            <Route path="projects" element={<ProjectPipeline />} />
            <Route path="projects/list" element={<ProjectsList />} />
            <Route path="projects/new" element={<CreateProjectForm />} />
            <Route path="projects/calendar" element={<ProjectsCalendar />} />
            <Route path="projects/:id/edit" element={<EditProjectForm />} />
            <Route path="projects/:id" element={<ProjectDetails />} />
            <Route path="finance" element={<Finance />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="profile" element={<AdminProfile />} />
          </Route>
        </Routes>

        <Footer />

        <motion.button
          onClick={scrollToTop}
          className="fixed z-50 flex items-center justify-center w-12 h-12 text-white transition-all duration-300 rounded-full shadow-lg bottom-6 right-6 bg-primary-500 dark:bg-primary-600 hover:shadow-glow-primary"
          whileHover={{ y: -5, scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      </AnimatePresence>
    </div>
  );
}

export default App;

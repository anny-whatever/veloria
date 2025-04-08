// src/App.jsx
import { useState, useEffect, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { Routes, Route, useLocation, Outlet, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import ThemeToggle from "./components/ThemeToggle";
import { useAuth } from "./contexts/AuthContext";
import LoadingSpinner from "./components/LoadingSpinner";

// Lazy load all routes to reduce initial bundle size
const Home = lazy(() => import("./pages/Home/Home"));
// Import component directories instead of missing files
const About = lazy(() => import("./components/About/About"));
const Contact = lazy(() => import("./components/Contact/Contact"));
const GetStarted = lazy(() => import("./pages/GetStarted/GetStarted"));

// Services pages - lazily loaded
const ServicesPage = lazy(() => import("./pages/Services/ServicesPage"));
const WebDevelopment = lazy(() => import("./pages/Services/WebDevelopment"));
const MobileAppDevelopment = lazy(() =>
  import("./pages/Services/MobileAppDevelopment")
);
const UIUXDesign = lazy(() => import("./pages/Services/UIUXDesign"));
const CustomSoftwareDevelopment = lazy(() =>
  import("./pages/Services/CustomSoftwareDevelopment")
);
const ERPSystem = lazy(() => import("./pages/Services/ERPSystem"));
const HotelManagementSystem = lazy(() =>
  import("./pages/Services/HotelManagementSystem")
);
const SchoolManagementSystem = lazy(() =>
  import("./pages/Services/SchoolManagementSystem")
);
const HospitalManagementSystem = lazy(() =>
  import("./pages/Services/HospitalManagementSystem")
);
const PayrollManagementSystem = lazy(() =>
  import("./pages/Services/PayrollManagementSystem")
);
const EcommerceManagementSystem = lazy(() =>
  import("./pages/Services/EcommerceManagementSystem")
);
const DatabaseSolutions = lazy(() =>
  import("./pages/Services/DatabaseSolutions")
);

// Portfolio component
const Portfolio = lazy(() => import("./components/Portfolio/Portfolio"));

// Create an inline PortfolioDetail component since the file doesn't exist
const PortfolioDetail = () => (
  <div className="container mx-auto px-4 py-12">
    <h1 className="text-3xl font-bold mb-8">Portfolio Project Details</h1>
    <p className="mb-6">This is a placeholder for portfolio details.</p>
    <button
      onClick={() => window.history.back()}
      className="px-6 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
    >
      Go Back
    </button>
  </div>
);

// Legal pages
const PrivacyPolicy = lazy(() => import("./pages/Legal/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/Legal/TermsOfService"));

// Admin pages - grouped into a separate chunk since they're only for authorized users
const AdminLogin = lazy(() => import("./pages/Admin/AdminLogin"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard"));
const AdminHome = lazy(() => import("./pages/Admin/AdminHome"));
const Finance = lazy(() => import("./pages/Admin/Finance"));
const ProjectsList = lazy(() => import("./pages/Admin/ProjectsList"));
const ProjectsCalendar = lazy(() => import("./pages/Admin/ProjectsCalendar"));
const ProjectDetails = lazy(() => import("./pages/Admin/ProjectDetails"));
const ProjectPipeline = lazy(() => import("./pages/Admin/ProjectPipeline"));
const BookingsList = lazy(() => import("./pages/Admin/BookingsList"));
const BookingsCalendar = lazy(() => import("./pages/Admin/BookingsCalendar"));
const BookingDetails = lazy(() => import("./pages/Admin/BookingDetails"));
const ContactsList = lazy(() => import("./pages/Admin/ContactsList"));
const ContactDetails = lazy(() => import("./pages/Admin/ContactDetails"));
const AdminBookingForm = lazy(() => import("./pages/Admin/AdminBookingForm"));
const CreateProjectForm = lazy(() => import("./pages/Admin/CreateProjectForm"));
const EditProjectForm = lazy(() => import("./pages/Admin/EditProjectForm"));

// Fallback page for 404s
const NotFound = () => (
  <div className="flex flex-col items-center justify-center min-h-screen py-16 px-4">
    <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
    <p className="text-lg text-center mb-8">
      The page you're looking for doesn't exist or has been moved.
    </p>
    <button
      onClick={() => (window.location.href = "/")}
      className="px-6 py-3 bg-primary-500 text-white rounded-md hover:bg-primary-600 transition-colors"
    >
      Return Home
    </button>
  </div>
);

// Loading component that will be displayed while route components are loading
const Loader = () => (
  <div className="flex justify-center items-center min-h-screen">
    <LoadingSpinner />
  </div>
);

// Main App component with routing
function App() {
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const isHomePage = location.pathname === "/";
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Preload animations and resources
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

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

  // Protected route component
  const RequireAuth = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/admin/login" />;
  };

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-dark-200 text-gray-900 dark:text-gray-100">
      <AnimatePresence mode="wait">
        {loading && isHomePage ? (
          <motion.div
            key="loader"
            className="fixed inset-0 flex flex-col items-center justify-center bg-surface-50 dark:bg-dark-100 z-50 p-6"
            variants={loadingVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <motion.div
              className="relative mb-8"
              variants={logoVariants}
              initial="initial"
              animate="animate"
            >
              <h1 className="text-6xl font-bold bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent dark:from-primary-400 dark:via-secondary-400 dark:to-accent-400">
                Veloria
              </h1>
              <motion.div
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 rounded-full"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "80%", opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              />
            </motion.div>

            <motion.p
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 text-center max-w-md"
              variants={taglineVariants}
              initial="initial"
              animate="animate"
            >
              Creating digital experiences that inspire and elevate your brand
            </motion.p>

            <motion.div
              className="flex space-x-3 items-center"
              variants={dotsContainerVariants}
              initial="initial"
              animate="animate"
            >
              <motion.div
                className="w-3 h-3 rounded-full bg-primary-500"
                variants={dotVariants}
              />
              <motion.div
                className="w-3 h-3 rounded-full bg-secondary-500"
                variants={dotVariants}
              />
              <motion.div
                className="w-3 h-3 rounded-full bg-accent-500"
                variants={dotVariants}
              />
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="content"
            variants={contentVariants}
            initial="hidden"
            animate="visible"
          >
            <Navbar />

            <Suspense fallback={<Loader />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/get-started" element={<GetStarted />} />

                {/* Services Routes */}
                <Route path="/services" element={<ServicesPage />} />
                <Route
                  path="/services/web-development"
                  element={<WebDevelopment />}
                />
                <Route
                  path="/services/mobile-app-development"
                  element={<MobileAppDevelopment />}
                />
                <Route path="/services/ui-ux-design" element={<UIUXDesign />} />
                <Route
                  path="/services/custom-software-development"
                  element={<CustomSoftwareDevelopment />}
                />
                <Route path="/services/erp-system" element={<ERPSystem />} />
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
                  path="/services/payroll-management-system"
                  element={<PayrollManagementSystem />}
                />
                <Route
                  path="/services/ecommerce-management-system"
                  element={<EcommerceManagementSystem />}
                />
                <Route
                  path="/services/database-solutions"
                  element={<DatabaseSolutions />}
                />

                {/* Portfolio Routes */}
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/portfolio/:id" element={<PortfolioDetail />} />

                {/* Legal Pages */}
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-of-service" element={<TermsOfService />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* Protected Admin Routes */}
                <Route
                  path="/admin"
                  element={
                    <RequireAuth>
                      <AdminDashboard />
                    </RequireAuth>
                  }
                >
                  <Route index element={<AdminHome />} />
                  <Route path="finance" element={<Finance />} />
                  <Route path="projects" element={<ProjectsList />} />
                  <Route path="projects/new" element={<CreateProjectForm />} />
                  <Route
                    path="projects/:id/edit"
                    element={<EditProjectForm />}
                  />
                  <Route
                    path="projects/calendar"
                    element={<ProjectsCalendar />}
                  />
                  <Route path="projects/:id" element={<ProjectDetails />} />
                  <Route
                    path="projects/pipeline"
                    element={<ProjectPipeline />}
                  />
                  <Route path="bookings" element={<BookingsList />} />
                  <Route
                    path="bookings/calendar"
                    element={<BookingsCalendar />}
                  />
                  <Route path="bookings/:id" element={<BookingDetails />} />
                  <Route path="bookings/new" element={<AdminBookingForm />} />
                  <Route path="contacts" element={<ContactsList />} />
                  <Route path="contacts/:id" element={<ContactDetails />} />
                </Route>

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>

            <Footer />

            <motion.button
              onClick={scrollToTop}
              className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary-500 dark:bg-primary-600 text-white shadow-lg flex items-center justify-center hover:shadow-glow-primary transition-all duration-300"
              whileHover={{ y: -5, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              aria-label="Scroll to top"
            >
              <ArrowUp size={20} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

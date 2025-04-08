import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Mail, Search } from "lucide-react";
import { SeoHead } from "../components/SEO";

const NotFound = () => {
  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  const linkVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <>
      <SeoHead
        title="Page Not Found | Veloria"
        description="We're sorry, but the page you're looking for doesn't exist. Please check the URL or navigate back to our homepage."
        pathname="/404"
        noindex={true}
      />
      <motion.div
        className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-20 text-center"
        initial="initial"
        animate="animate"
        variants={containerVariants}
      >
        <motion.div variants={itemVariants} className="mb-6">
          <h1 className="text-7xl md:text-9xl font-bold text-primary-500">
            404
          </h1>
        </motion.div>
        <motion.h2
          variants={itemVariants}
          className="mb-6 text-2xl md:text-3xl font-semibold text-gray-800 dark:text-gray-200"
        >
          Page Not Found
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className="max-w-xl mb-8 text-lg text-gray-600 dark:text-gray-400"
        >
          We're sorry, but the page you're looking for doesn't exist or has been
          moved.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-md mb-12"
        >
          <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
            <Link
              to="/"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 text-white font-medium bg-primary-500 hover:bg-primary-600 rounded-lg transition-colors"
            >
              <Home size={18} />
              <span>Back to Home</span>
            </Link>
          </motion.div>

          <motion.div variants={linkVariants} whileHover="hover" whileTap="tap">
            <Link
              to="/contact"
              className="flex items-center justify-center gap-2 w-full px-6 py-3 font-medium border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors"
            >
              <Mail size={18} />
              <span>Contact Us</span>
            </Link>
          </motion.div>
        </motion.div>

        <motion.div variants={itemVariants} className="max-w-md w-full">
          <h3 className="mb-4 text-xl font-medium text-gray-800 dark:text-gray-200">
            Popular Pages
          </h3>
          <ul className="grid gap-2">
            <li>
              <Link
                to="/services"
                className="block p-3 text-left text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors"
              >
                Services
              </Link>
            </li>
            <li>
              <Link
                to="/get-started"
                className="block p-3 text-left text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors"
              >
                Get Started
              </Link>
            </li>
            <li>
              <Link
                to="/services/web-development"
                className="block p-3 text-left text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors"
              >
                Web Development
              </Link>
            </li>
            <li>
              <Link
                to="/services/mobile-app-development"
                className="block p-3 text-left text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-300 transition-colors"
              >
                Mobile App Development
              </Link>
            </li>
          </ul>
        </motion.div>
      </motion.div>
    </>
  );
};

export default NotFound;

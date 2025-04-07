// src/App.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Portfolio from "./components/Portfolio/Portfolio";
import Services from "./components/Services/Services";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import Text from "./components/Text";
import ThemeToggle from "./components/ThemeToggle";
import { SeoHead, PAGE_SEO, getOrganizationSchema } from "./components/SEO";

function App() {
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="min-h-screen bg-surface-50 dark:bg-dark-200 text-gray-900 dark:text-gray-100">
      <SeoHead
        title={PAGE_SEO.home.title}
        description={PAGE_SEO.home.description}
        keywords={PAGE_SEO.home.keywords}
        pathname="/"
        structuredData={getOrganizationSchema()}
      />

      <AnimatePresence mode="wait">
        {loading ? (
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
            <Header />
            <Services />
            <Portfolio />
            <About />
            <Contact />
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

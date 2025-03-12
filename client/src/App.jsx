// src/App.jsx
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./components/Navbar/Navbar";
import Header from "./components/Header/Header";
import Portfolio from "./components/Portfolio/Portfolio";
import Services from "./components/Services/Services";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Footer from "./components/Footer/Footer";
import { ArrowUp } from "lucide-react";

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

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loader"
            className="fixed inset-0 flex items-center justify-center bg-white z-50"
            variants={loadingVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="text-center">
              <motion.h1
                className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                Veloria
              </motion.h1>
              <div className="flex space-x-2 justify-center">
                {[
                  "primary",
                  "secondary",
                  "accent",
                  "light",
                  "secondary",
                  "primary",
                  "secondary",
                ].map((color, index) => (
                  <motion.div
                    key={`${color}-${index}`}
                    className={`w-3 h-3 rounded-full bg-${color}`}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{
                      y: [0, -15, 0],
                      opacity: 1,
                    }}
                    transition={{
                      y: {
                        repeat: Infinity,
                        duration: 1,
                        ease: "easeInOut",
                        delay: index * 0.1,
                        repeatDelay: 0.2,
                      },
                      opacity: { duration: 0.3, delay: index * 0.1 },
                    }}
                  />
                ))}
              </div>
            </div>
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
              className="fixed bottom-3 right-0 z-50 mr-3 -mt-6 w-12 h-12 rounded-full bg-gradient-to-r from-primary to-secondary text-white shadow-lg flex items-center justify-center hover:scale-110 transition-all duration-300"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <ArrowUp size={22} />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

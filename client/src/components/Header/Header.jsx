// src/components/Header/Header.jsx
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import Button from "../Button";
import { Heading, default as Text } from "../Text";
import { Link } from "react-router-dom";

const Header = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      // Get the navbar height to offset the scroll position
      const navbar = document.querySelector("nav");
      const navbarHeight = navbar ? navbar.offsetHeight : 0;

      // Calculate the target position (element position - navbar height - extra padding)
      const targetPosition =
        section.getBoundingClientRect().top +
        window.pageYOffset -
        navbarHeight -
        20;

      // Smooth scroll to the calculated position
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  return (
    <header
      id="home"
      ref={ref}
      className="min-h-screen relative flex items-center overflow-hidden bg-surface-50 dark:bg-dark-200 pt-20"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-dot-pattern bg-[length:20px_20px] opacity-[0.03] dark:opacity-[0.05]"></div>

      {/* Abstract shapes/background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 right-0 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-gradient-radial from-primary-200/30 to-transparent rounded-full opacity-60 dark:from-primary-900/20"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        ></motion.div>

        <motion.div
          className="absolute -bottom-20 left-0 w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-gradient-radial from-accent-200/20 to-transparent rounded-full opacity-60 dark:from-accent-900/15"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        ></motion.div>

        <motion.div
          className="absolute top-1/3 left-1/4 w-[20vw] h-[20vw] max-w-[300px] max-h-[300px] bg-gradient-radial from-light-200/20 to-transparent rounded-full opacity-40 dark:from-light-900/10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        ></motion.div>
      </div>

      <div className="container mx-auto z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Text Content */}
          <div className="flex flex-col items-center md:items-start mt-12 md:mt-0 px-4 md:px-0">
            <motion.div variants={itemVariants}>
              <Text
                size="sm"
                className="uppercase tracking-wider"
                color="primary"
                weight="medium"
                align={window.innerWidth < 768 ? "center" : "left"}
              >
                Web Design Studio
              </Text>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <Heading
                level={1}
                align={window.innerWidth < 768 ? "center" : "left"}
                className="leading-tight tracking-tight"
              >
                Beautiful Websites
                <span className="block bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent dark:from-primary-400 dark:via-secondary-400 dark:to-accent-400">
                  That Drive Results
                </span>
              </Heading>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Text
                color="muted"
                size={window.innerWidth < 768 ? "base" : "lg"}
                align={window.innerWidth < 768 ? "center" : "left"}
                className="mb-8 max-w-lg"
              >
                Crafting delightful digital experiences that resonate with your
                audience and bring your vision to life with a focus on clean,
                minimalist design and intuitive user experience.
              </Text>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start w-full md:w-auto"
              variants={itemVariants}
            >
              <Link to="/get-started">
                <motion.button
                  className="btn flex items-center justify-center gap-2 rounded-full px-8 py-3 font-medium text-lg
                  bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-md 
                  hover:shadow-glow-primary transition-all duration-300 w-full sm:w-auto"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Get Started
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </motion.button>
              </Link>

              <motion.button
                onClick={() => scrollToSection("portfolio")}
                className="btn flex items-center justify-center gap-2 rounded-full px-8 py-3 font-medium text-lg
                bg-white dark:bg-dark-100 text-primary-700 dark:text-primary-400 border-2 border-primary-400 dark:border-primary-500
                shadow-sm hover:bg-primary-50 dark:hover:bg-dark-200 hover:shadow-md transition-all duration-300 w-full sm:w-auto"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View Portfolio
              </motion.button>
            </motion.div>
          </div>

          {/* Hero image/illustration area */}
          <div className="relative flex justify-center mt-12 md:mt-0">
            <motion.div
              className="relative w-full max-w-lg aspect-ratio-1/1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Replace these abstract shapes with an appropriate hero image or illustration */}
              <svg
                className="w-full h-full"
                viewBox="0 0 600 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="gradient1"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor="hsl(37, 80%, 60%)"
                      stopOpacity="0.3"
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(340, 45%, 65%)"
                      stopOpacity="0.3"
                    />
                  </linearGradient>
                  <linearGradient
                    id="gradient2"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      stopColor="hsl(245, 35%, 62%)"
                      stopOpacity="0.3"
                    />
                    <stop
                      offset="100%"
                      stopColor="hsl(200, 30%, 63%)"
                      stopOpacity="0.3"
                    />
                  </linearGradient>
                </defs>

                {/* Abstract flowing shapes */}
                <motion.path
                  d="M300,100 C420,100 500,180 500,300 C500,420 420,500 300,500 C180,500 100,420 100,300 C100,180 180,100 300,100 Z"
                  fill="none"
                  stroke="hsl(37, 80%, 60%)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.8 }}
                  transition={{ duration: 2.5, ease: "easeInOut", delay: 0.4 }}
                  className="dark:stroke-primary-400"
                />

                <motion.path
                  d="M300,150 C390,150 450,210 450,300 C450,390 390,450 300,450 C210,450 150,390 150,300 C150,210 210,150 300,150 Z"
                  fill="none"
                  stroke="hsl(340, 45%, 65%)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ duration: 2.2, ease: "easeInOut", delay: 0.7 }}
                  className="dark:stroke-secondary-400"
                />

                <motion.path
                  d="M300,180 C190,240 190,360 300,420 C410,360 410,240 300,180 Z"
                  fill="none"
                  stroke="hsl(245, 35%, 62%)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
                  className="dark:stroke-accent-400"
                />

                <motion.path
                  d="M200,200 C280,280 320,280 400,200 C320,120 280,120 200,200 Z"
                  fill="none"
                  stroke="hsl(200, 30%, 63%)"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ duration: 1.8, ease: "easeInOut", delay: 1.3 }}
                  className="dark:stroke-light-400"
                />

                <motion.path
                  d="M380,250 C450,350 300,450 200,380 C100,310 150,180 250,150 C350,120 380,200 380,250 Z"
                  fill="url(#gradient1)"
                  fillOpacity="0.15"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.8, ease: "easeOut", delay: 1.2 }}
                  className="dark:fill-opacity-10"
                />

                <motion.path
                  d="M350,280 C400,340 330,410 260,380 C190,350 220,270 270,250 C320,230 350,250 350,280 Z"
                  fill="url(#gradient2)"
                  fillOpacity="0.2"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1.8, ease: "easeOut", delay: 1.6 }}
                  className="dark:fill-opacity-10"
                />

                {/* Floating dots and circles */}
                <motion.circle
                  cx="150"
                  cy="150"
                  r="8"
                  fill="hsl(37, 80%, 60%)"
                  initial={{ y: 0 }}
                  animate={{ y: [-10, 10, -10] }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="dark:fill-primary-400"
                />

                <motion.circle
                  cx="450"
                  cy="250"
                  r="6"
                  fill="hsl(340, 45%, 65%)"
                  initial={{ y: 0 }}
                  animate={{ y: [-8, 8, -8] }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.5,
                  }}
                  className="dark:fill-secondary-400"
                />

                <motion.circle
                  cx="380"
                  cy="400"
                  r="10"
                  fill="hsl(245, 35%, 62%)"
                  initial={{ y: 0 }}
                  animate={{ y: [-15, 15, -15] }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="dark:fill-accent-400"
                />

                <motion.circle
                  cx="220"
                  cy="352"
                  r="7"
                  fill="hsl(200, 30%, 63%)"
                  initial={{ y: 0 }}
                  animate={{ y: [-12, 12, -12] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.5,
                  }}
                  className="dark:fill-light-400"
                />
              </svg>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;

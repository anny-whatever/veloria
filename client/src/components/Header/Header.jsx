// src/components/Header/Header.jsx
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

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

  const floatVariants = {
    initial: { y: 0 },
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  };

  const floatSlowVariants = {
    initial: { y: 0 },
    animate: {
      y: [-8, 8, -8],
      transition: {
        duration: 8,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  };

  const floatFastVariants = {
    initial: { y: 0 },
    animate: {
      y: [-6, 6, -6],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
      },
    },
  };

  return (
    <header
      id="home"
      ref={ref}
      className="min-h-screen relative flex items-center overflow-hidden bg-gradient-to-br from-white to-[#f8f3f7] pt-20"
    >
      {/* Artistic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-radial from-primary/10 to-transparent rounded-full opacity-60 -translate-y-1/4 translate-x-1/4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        ></motion.div>

        <motion.div
          className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-radial from-accent/10 to-transparent rounded-full opacity-60 translate-y-1/4 -translate-x-1/4"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        ></motion.div>

        <motion.div
          className="absolute top-1/3 left-1/4 w-[300px] h-[300px] bg-gradient-radial from-light/10 to-transparent rounded-full opacity-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        ></motion.div>
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Text Content */}
          <div className="flex flex-col items-center md:items-start mt-28 md:mt-0">
            <motion.h1
              className="text-4xl md:text-5xl text-center md:text-left lg:text-6xl font-bold mb-6 leading-tight"
              variants={itemVariants}
            >
              <motion.span className="block" variants={itemVariants}>
                Beautiful Websites
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
                variants={itemVariants}
              >
                That Drive Results
              </motion.span>
            </motion.h1>

            <motion.p
              className="text-gray-600 text-md md:text-xl text-center md:text-left mb-8 max-w-lg justify-center md:justify-start"
              variants={itemVariants}
            >
              Crafting delightful digital experiences that resonate with your
              audience and bring your vision to life.
            </motion.p>

            <motion.div
              className="flex sm:flex-row gap-4 justify-center md:justify-start"
              variants={itemVariants}
            >
              <Link to="/get-started">
                <motion.button
                  className="btn-primary px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  Get Started
                </motion.button>
              </Link>

              <motion.button
                className="btn-outline px-8 py-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                onClick={() => scrollToSection("portfolio")}
              >
                View Portfolio
              </motion.button>
            </motion.div>
          </div>

          {/* Artistic Right Side Element */}
          <div className="md:relative h-[500px] w-full mx-auto px-4 md:px-6 z-[-10] opacity-40 md:opacity-100 mt-12 md:mt-0">
            {/* Main swirling shape */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 600 600"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Abstract flowing shapes */}
              <motion.path
                d="M300,100 C420,100 500,180 500,300 C500,420 420,500 300,500 C180,500 100,420 100,300 C100,180 180,100 300,100 Z"
                fill="none"
                stroke="#ecb761"
                strokeWidth="6"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.8 }}
                transition={{ duration: 2.5, ease: "easeInOut", delay: 0.4 }}
              />

              <motion.path
                d="M300,150 C390,150 450,210 450,300 C450,390 390,450 300,450 C210,450 150,390 150,300 C150,210 210,150 300,150 Z"
                fill="none"
                stroke="#deb0bd"
                strokeWidth="4"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 2.2, ease: "easeInOut", delay: 0.7 }}
              />

              <motion.path
                d="M300,180 C190,240 190,360 300,420 C410,360 410,240 300,180 Z"
                fill="none"
                stroke="#8b86be"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 2, ease: "easeInOut", delay: 1 }}
              />

              <motion.path
                d="M200,200 C280,280 320,280 400,200 C320,120 280,120 200,200 Z"
                fill="none"
                stroke="#86abba"
                strokeWidth="3"
                strokeDasharray="6 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.6 }}
                transition={{ duration: 1.8, ease: "easeInOut", delay: 1.3 }}
              />

              <motion.path
                d="M380,250 C450,350 300,450 200,380 C100,310 150,180 250,150 C350,120 380,200 380,250 Z"
                fill="url(#gradient1)"
                fillOpacity="0.15"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.8, ease: "easeOut", delay: 1.2 }}
              />

              <motion.path
                d="M350,280 C400,340 330,410 260,380 C190,350 220,270 270,250 C320,230 350,250 350,280 Z"
                fill="url(#gradient2)"
                fillOpacity="0.2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.6, ease: "easeOut", delay: 1.4 }}
              />

              {/* Gradients definitions */}
              <defs>
                <linearGradient
                  id="gradient1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#ecb761" />
                  <stop offset="100%" stopColor="#deb0bd" />
                </linearGradient>
                <linearGradient
                  id="gradient2"
                  x1="100%"
                  y1="0%"
                  x2="0%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#8b86be" />
                  <stop offset="100%" stopColor="#86abba" />
                </linearGradient>
                <linearGradient
                  id="gradient3"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#cbd690" />
                  <stop offset="100%" stopColor="#ecb761" />
                </linearGradient>
                <radialGradient
                  id="glow1"
                  cx="50%"
                  cy="50%"
                  r="50%"
                  fx="50%"
                  fy="50%"
                >
                  <stop offset="0%" stopColor="#ecb761" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ecb761" stopOpacity="0" />
                </radialGradient>
                <radialGradient
                  id="glow2"
                  cx="50%"
                  cy="50%"
                  r="50%"
                  fx="50%"
                  fy="50%"
                >
                  <stop offset="0%" stopColor="#8b86be" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#8b86be" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>

            {/* Floating circles and decorative elements */}
            <motion.div
              className="absolute top-[15%] right-[25%] w-16 h-16 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 shadow-glow-primary"
              variants={floatVariants}
              initial="initial"
              animate="animate"
            />

            <motion.div
              className="absolute top-[60%] right-[15%] w-12 h-12 rounded-full bg-accent/20 backdrop-blur-sm border border-accent/30 shadow-glow-accent"
              variants={floatSlowVariants}
              initial="initial"
              animate="animate"
            />

            <motion.div
              className="absolute top-[30%] right-[10%] w-20 h-20 rounded-full bg-secondary/20 backdrop-blur-sm border border-secondary/30 shadow-glow-secondary"
              variants={floatFastVariants}
              initial="initial"
              animate="animate"
            />

            <motion.div
              className="absolute top-[70%] right-[30%] w-10 h-10 rounded-full bg-light/20 backdrop-blur-sm border border-light/30"
              variants={floatFastVariants}
              initial="initial"
              animate="animate"
            />

            {/* UI elements */}
            <motion.div
              className="absolute top-[20%] right-[35%] bg-white p-3 rounded-lg shadow-lg z-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              <div className="flex flex-col gap-1.5">
                <div className="h-1.5 w-16 bg-primary rounded-full"></div>
                <div className="h-1.5 w-12 bg-secondary rounded-full"></div>
              </div>
            </motion.div>

            <motion.div
              className="absolute top-[50%] right-[20%] bg-white/70 backdrop-blur-md p-4 rounded-xl shadow-lg z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 2 }}
            >
              <div className="w-16 h-16 flex items-center justify-center">
                <div className="w-10 h-10 bg-accent/30 rounded-full flex items-center justify-center">
                  <div className="w-6 h-6 bg-accent/60 rounded-full"></div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="absolute bottom-[25%] right-[40%] bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg z-10"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 2.2 }}
            >
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-neutral rounded-full"></div>
                <div className="h-px w-12 bg-neutral"></div>
              </div>
            </motion.div>

            {/* Flowing lines */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none"
              viewBox="0 0 600 600"
              fill="none"
            >
              <motion.path
                d="M180,180 C230,230 270,230 320,180"
                stroke="url(#gradient3)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 1.5, delay: 2.4 }}
              />

              <motion.path
                d="M200,350 C250,320 300,320 350,350"
                stroke="#cbd690"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                fill="none"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 1.5, delay: 2.6 }}
              />
            </svg>

            {/* Shimmer effects */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 opacity-30"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: [0, 0.3, 0],
                scale: [0.8, 1.2, 0.8],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              <div className="w-full h-full bg-gradient-radial from-primary to-transparent rounded-full"></div>
            </motion.div>

            <motion.div
              className="absolute top-1/3 right-1/3 w-32 h-32 opacity-40"
              initial={{ opacity: 0 }}
              animate={{
                opacity: [0, 0.4, 0],
                rotate: [0, -180, -360],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
                delay: 2,
              }}
            >
              <div className="w-full h-full bg-gradient-radial from-accent to-transparent rounded-full"></div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-28 md:bottom-4 m-auto left-0 right-0 transform -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.8,
          delay: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
          repeatDelay: 0.5,
        }}
      >
        <div className="flex flex-col items-center">
          <p className="text-gray-500 mb-2 text-sm">Scroll Down</p>
          <div className="w-6 h-10 border-2 border-primary rounded-full flex justify-center p-1">
            <motion.div
              className="w-1.5 h-1.5 bg-primary rounded-full"
              animate={{
                y: [0, 10, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
            />
          </div>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;

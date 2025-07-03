// src/components/Header/Header.jsx
import { useState, useEffect } from "react";
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
  const [isMobile, setIsMobile] = useState(false);
  const [isBrowser, setIsBrowser] = useState(false);

  // Detect if we're in the browser environment and handle mobile detection
  useEffect(() => {
    setIsBrowser(true);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const scrollToSection = (sectionId) => {
    if (typeof window === "undefined") return;

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
      className="min-h-screen relative flex items-center overflow-hidden bg-black pt-20"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-dot-pattern bg-[length:20px_20px] opacity-[0.05]"></div>

      {/* Abstract shapes/background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 right-0 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-gradient-radial from-primary-900/20 to-transparent rounded-full opacity-60"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        ></motion.div>

        <motion.div
          className="absolute -bottom-20 left-0 w-[50vw] h-[50vw] max-w-[800px] max-h-[800px] bg-gradient-radial from-accent-900/15 to-transparent rounded-full opacity-60"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
        ></motion.div>

        <motion.div
          className="absolute top-1/3 left-1/4 w-[20vw] h-[20vw] max-w-[300px] max-h-[300px] bg-gradient-radial from-light-900/10 to-transparent rounded-full opacity-40"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
        ></motion.div>
      </div>

      <div className="container mx-auto relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {/* Text Content - takes more columns on larger screens */}
          <div className="flex flex-col items-center md:items-start mt-12 md:mt-0 px-4 md:px-0 md:col-span-7 lg:col-span-6 relative z-10">
            <motion.div variants={itemVariants}>
              <Text
                size="sm"
                className="uppercase tracking-wider"
                color="primary"
                weight="medium"
                align={isBrowser && isMobile ? "center" : "left"}
              >
                Product Engineering Lab
              </Text>
            </motion.div>

            <motion.div variants={itemVariants} className="mb-6">
              <Heading
                level={1}
                align={isBrowser && isMobile ? "center" : "left"}
                className="leading-tight tracking-tight"
              >
                Engineering Tomorrow's
                <span className="block bg-gradient-to-r from-primary-400 via-accent-400 to-primary-300 bg-clip-text text-transparent">
                  Products
                </span>
              </Heading>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Text
                color="muted"
                size={isBrowser && isMobile ? "base" : "lg"}
                align={isBrowser && isMobile ? "center" : "left"}
                className="mb-8 max-w-lg"
              >
                From MVP to Scale - We build production-ready platforms that
                technical founders trust. Ship in weeks, not months, with
                enterprise-grade architecture and 99.9% uptime.
              </Text>
            </motion.div>

            {/* Two-row button layout */}
            <div className="flex flex-col gap-3 w-full">
              {/* First row: Get Started and Our Services */}
              <motion.div
                className="flex flex-wrap gap-3 justify-center md:justify-start w-full"
                variants={itemVariants}
              >
                <Link
                  to="/get-started"
                  className="flex-1 min-w-[120px] max-w-[200px]"
                >
                  <motion.button
                    className="btn flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-medium
                    bg-gradient-to-r from-primary-600 to-secondary-600 text-white shadow-md 
                    hover:shadow-glow-primary transition-all duration-200 w-full"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98, y: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <span>Get Started</span>
                  </motion.button>
                </Link>

                <div className="flex-1 min-w-[120px] max-w-[200px]">
                  <motion.button
                    onClick={() => scrollToSection("services")}
                    className="btn flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-medium
                    bg-gray-800 text-primary-400 border-2 border-primary-500
                    shadow-sm hover:bg-gray-700 hover:shadow-md transition-all duration-200 w-full"
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98, y: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  >
                    <span>Our Services</span>
                  </motion.button>
                </div>
              </motion.div>

              {/* Second row: WhatsApp button */}
              <motion.div
                className="flex justify-center md:justify-start w-full"
                variants={itemVariants}
              >
                <div className="min-w-[120px] max-w-[200px]">
                  <a
                    href="https://wa.me/9315360595"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full"
                  >
                    <motion.button
                      className="btn flex items-center justify-center gap-2 rounded-full px-5 py-2.5 font-medium
                      bg-[#25D366] text-white shadow-sm hover:bg-[#22c55e] hover:shadow-md transition-all duration-200 w-full"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98, y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 15,
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      <span>WhatsApp</span>
                    </motion.button>
                  </a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Hero image/illustration area - fewer columns, positioned as decorative */}
          <div className="relative md:col-span-5 lg:col-span-6 md:absolute md:right-0 md:top-0 md:h-full md:w-1/2 md:opacity-50 md:pointer-events-none">
            <motion.div
              className="relative w-full h-full flex items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {/* Replace these abstract shapes with an appropriate hero image or illustration */}
              <svg
                className="w-full max-w-lg"
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

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Github, Zap, Shield } from "lucide-react";
import { SparklesCore } from "../ui/sparkles";
import { FlipWords } from "../ui/flip-words";
import { Link } from "react-router-dom";

const ModernHero = () => {
  const [isMobile, setIsMobile] = useState(false);

  const flipWords = [
    "Exceptional",
    "Revolutionary",
    "Game-Changing",
    "Next-Level",
    "Breakthrough",
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="flex overflow-hidden relative flex-col justify-center items-center w-full h-screen bg-black">
      {/* Sparkles Background */}
      <div className="absolute inset-0 w-full h-screen">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.8}
          maxSize={2.8}
          particleDensity={400}
          speed={2}
          className="w-full h-full"
          particleColor="#8b5cf6"
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-primary-500 to-transparent h-[2px] w-3/4 blur-sm" />
      <div className="absolute top-0 inset-x-20 w-3/4 h-px bg-gradient-to-r from-transparent to-transparent via-primary-500" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-accent-500 to-transparent h-[5px] w-1/4 blur-sm" />
      <div className="absolute top-0 inset-x-60 w-1/4 h-px bg-gradient-to-r from-transparent to-transparent via-accent-500" />

      {/* Content */}
      <div className="relative z-20 px-4 mx-auto max-w-6xl text-center">
        {/* Main Headline with FlipWords - Made smaller */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className={`font-bold text-white mb-6 leading-tight ${
            isMobile ? "text-3xl" : "text-4xl md:text-5xl lg:text-6xl"
          }`}
        >
          We Craft{" "}
          <div className="inline-block">
            <FlipWords
              words={flipWords}
              duration={2500}
              className="text-white bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-violet-400"
            />
          </div>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-300 to-violet-400">
            Digital Experiences
          </span>
        </motion.h1>

        {/* Subtitle - Made smaller and more readable */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className={`text-gray-400 mb-12 max-w-3xl mx-auto ${
            isMobile ? "text-base" : "text-lg md:text-xl"
          }`}
        >
          Transform your vision into reality with{" "}
          <span className="font-semibold text-white">
            cutting-edge technology
          </span>{" "}
          and <span className="text-purple-300">innovative design</span>. We
          build products that{" "}
          <span className="font-semibold text-cyan-400">users love</span> and{" "}
          <span className="font-semibold text-violet-300">
            businesses thrive on
          </span>
          .
        </motion.p>

        {/* CTA Buttons - Returned to normal size */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col gap-4 justify-center items-center mb-16 sm:flex-row"
        >
          <Link
            to="/get-started"
            className="inline-flex relative gap-2 items-center px-8 py-4 font-semibold text-white bg-gradient-to-r rounded-full transition-all duration-200 transform hover:no-underline group hover:text-white from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>

          <a
            href="https://github.com/anny-whatever"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex gap-2 items-center px-8 py-4 font-semibold text-gray-300 rounded-full border border-gray-600 transition-all duration-200 group hover:border-gray-500 hover:text-white hover:bg-gray-800/50 hover:no-underline"
          >
            <Github className="w-4 h-4" />
            Explore Our Work
          </a>
        </motion.div>

        {/* Trust Indicators - Returned to normal size */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col gap-8 justify-center items-center text-sm text-gray-500 sm:flex-row"
        >
          <div className="flex gap-2 items-center">
            <Shield className="w-4 h-4 text-green-400" />
            <span>Trusted by 100+ Companies</span>
          </div>
          <div className="hidden w-px h-4 bg-gray-600 sm:block"></div>
          <div className="flex gap-2 items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>24/7 Support</span>
          </div>
          <div className="hidden w-px h-4 bg-gray-600 sm:block"></div>
          <div className="flex gap-2 items-center">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>Lightning Delivery</span>
          </div>
        </motion.div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
    </div>
  );
};

export default ModernHero;

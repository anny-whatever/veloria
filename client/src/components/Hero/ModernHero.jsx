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
    <div className="h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden relative">
      {/* Sparkles Background */}
      <div className="w-full h-screen absolute inset-0">
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
      <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-primary-500 to-transparent h-px w-3/4" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-accent-500 to-transparent h-[5px] w-1/4 blur-sm" />
      <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-accent-500 to-transparent h-px w-1/4" />

      {/* Content */}
      <div className="relative z-20 text-center px-4 max-w-6xl mx-auto">
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
              className="text-white bg-gradient-to-r from-cyan-400 via-purple-300 to-violet-400 bg-clip-text"
            />
          </div>
          <br />
          <span className="bg-gradient-to-r from-cyan-400 via-purple-300 to-violet-400 bg-clip-text text-transparent">
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
          <span className="text-white font-semibold">
            cutting-edge technology
          </span>{" "}
          and <span className="text-purple-300">innovative design</span>. We
          build products that{" "}
          <span className="text-cyan-400 font-semibold">users love</span> and{" "}
          <span className="text-violet-300 font-semibold">
            businesses thrive on
          </span>
          .
        </motion.p>

        {/* CTA Buttons - Returned to normal size */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link
            to="/get-started"
            className="group relative inline-flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 transform hover:scale-105 hover:shadow-lg hover:shadow-primary-500/25"
          >
            Start Your Project
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
          </Link>

          <button className="group inline-flex items-center gap-2 border border-gray-600 hover:border-gray-500 text-gray-300 hover:text-white px-8 py-4 rounded-full font-semibold transition-all duration-200 hover:bg-gray-800/50">
            <Github className="w-4 h-4" />
            Explore Our Work
          </button>
        </motion.div>

        {/* Trust Indicators - Returned to normal size */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-8 text-gray-500 text-sm"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-400" />
            <span>Trusted by 100+ Companies</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-600"></div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>24/7 Support</span>
          </div>
          <div className="hidden sm:block w-px h-4 bg-gray-600"></div>
          <div className="flex items-center gap-2">
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

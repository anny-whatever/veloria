// src/components/Portfolio/PortfolioItem.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ShoppingCart,
  Paintbrush,
  FileText,
  Code,
  Globe,
  MousePointer,
  Settings,
} from "lucide-react";

const PortfolioItem = ({ item, index, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.6, 0.05, 0.01, 0.9],
        delay: index * 0.1,
      },
    },
  };

  // Get category specific styling
  const getCategoryColor = (category) => {
    switch (category) {
      case "ecommerce":
        return "primary";
      case "branding":
        return "secondary";
      case "blog":
        return "accent";
      case "portfolio":
        return "emerald-500";
      case "landing":
        return "amber-500";
      case "custom":
        return "indigo-500";
      default:
        return "neutral";
    }
  };

  const getCategoryName = (category) => {
    switch (category) {
      case "ecommerce":
        return "E-commerce";
      case "branding":
        return "Branding";
      case "blog":
        return "Blog";
      case "portfolio":
        return "Portfolio";
      case "landing":
        return "Landing Page";
      case "custom":
        return "Custom Solution";
      default:
        return category;
    }
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case "ecommerce":
        return <ShoppingCart size={24} />;
      case "branding":
        return <Paintbrush size={24} />;
      case "blog":
        return <FileText size={24} />;
      case "portfolio":
        return <Globe size={24} />;
      case "landing":
        return <MousePointer size={24} />;
      case "custom":
        return <Settings size={24} />;
      default:
        return <Code size={24} />;
    }
  };

  // Using explicit classes instead of template literals for Tailwind to properly detect
  const getCategoryBgClass = (category) => {
    switch (category) {
      case "ecommerce":
        return "bg-primary";
      case "branding":
        return "bg-secondary";
      case "blog":
        return "bg-accent";
      case "portfolio":
        return "bg-emerald-500";
      case "landing":
        return "bg-amber-500";
      case "custom":
        return "bg-indigo-500";
      default:
        return "bg-neutral";
    }
  };

  const getCategoryBgLightClass = (category) => {
    switch (category) {
      case "ecommerce":
        return "bg-primary/20";
      case "branding":
        return "bg-secondary/20";
      case "blog":
        return "bg-accent/20";
      case "portfolio":
        return "bg-emerald-500/20";
      case "landing":
        return "bg-amber-500/20";
      case "custom":
        return "bg-indigo-500/20";
      default:
        return "bg-neutral/20";
    }
  };

  const getCategoryTextClass = (category) => {
    switch (category) {
      case "ecommerce":
        return "text-primary";
      case "branding":
        return "text-secondary";
      case "blog":
        return "text-accent";
      case "portfolio":
        return "text-emerald-500";
      case "landing":
        return "text-amber-500";
      case "custom":
        return "text-indigo-500";
      default:
        return "text-neutral";
    }
  };

  const colorClass = getCategoryColor(item.category);
  const bgClass = getCategoryBgClass(item.category);
  const bgLightClass = getCategoryBgLightClass(item.category);
  const textClass = getCategoryTextClass(item.category);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg"
      variants={itemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      onClick={onClick}
    >
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden h-64 cursor-pointer bg-white">
        {/* Project Thumbnail */}
        {item.thumbnail ? (
          <div className="w-full h-full flex items-center justify-center">
            {/* Loading indicator */}
            {!imageLoaded && (
              <motion.div
                className={`w-16 h-16 rounded-full ${bgLightClass} ${textClass} flex items-center justify-center`}
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                {getCategoryIcon(item.category)}
              </motion.div>
            )}

            <img
              src={item.thumbnail}
              alt={item.title}
              className={`w-auto h-auto max-w-[90%] max-h-[90%] object-contain transition-transform duration-500 group-hover:scale-105 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={handleImageLoad}
            />
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="p-4 text-center">
              <motion.div
                className={`w-16 h-16 mx-auto mb-3 rounded-full ${bgLightClass} ${textClass} flex items-center justify-center`}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.8 }}
              >
                {getCategoryIcon(item.category)}
              </motion.div>
              <p className="text-gray-600">Placeholder for {item.title}</p>
            </div>
          </div>
        )}

        {/* Overlay - only shows on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6 pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <span
              className={`text-xs font-medium py-1 px-3 rounded-full ${bgClass} text-white inline-block mb-3`}
            >
              {getCategoryName(item.category)}
            </span>
            <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="text-white/80 text-sm line-clamp-2">
              {item.description}
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Info Bar */}
      <div className="p-5 flex items-center justify-between">
        <div>
          <h3 className="font-bold">{item.title}</h3>
          <p className="text-gray-500 text-sm">{item.subtitle}</p>
        </div>
      </div>

      {/* View case study button that appears on hover */}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-white to-transparent py-6 px-5 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
        <button
          className={`w-full py-2 px-4 ${bgClass} text-white rounded-lg flex items-center justify-center`}
          onClick={onClick}
        >
          <span>View Case Study</span>
          <ArrowRight size={16} className="ml-2" />
        </button>
      </div>
    </motion.div>
  );
};

export default PortfolioItem;

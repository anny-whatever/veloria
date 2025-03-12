// src/components/Portfolio/PortfolioItem.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Code, ExternalLink } from "lucide-react";

const PortfolioItem = ({ item, index }) => {
  const [isHovered, setIsHovered] = useState(false);

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

  const getCategoryColor = (category) => {
    switch (category) {
      case "ecommerce":
        return "primary";
      case "branding":
        return "secondary";
      case "webapp":
        return "accent";
      case "blog":
        return "light";
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
      case "webapp":
        return "Web App";
      case "blog":
        return "Blog";
      default:
        return category;
    }
  };

  const colorClass = getCategoryColor(item.category);

  return (
    <motion.div
      className="group relative overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg"
      variants={itemVariants}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
    >
      {/* Image Container with Overlay */}
      <div className="relative overflow-hidden h-64">
        {/* Placeholder Image */}
        <div
          className={`w-full h-full bg-${colorClass}/20 flex items-center justify-center`}
        >
          <div className="p-4 text-center">
            <motion.div
              className={`w-16 h-16 mx-auto mb-3 rounded-full bg-${colorClass}/30 flex items-center justify-center text-${colorClass}`}
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
            >
              {item.category === "ecommerce" && <ShoppingCart size={24} />}
              {item.category === "branding" && <Paintbrush size={24} />}
              {item.category === "webapp" && <Code size={24} />}
              {item.category === "blog" && <FileText size={24} />}
            </motion.div>
            <p className="text-gray-600">Placeholder for {item.title}</p>
          </div>
        </div>
        {/* If using actual images uncomment this */}
        {/* <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
        /> */}

        {/* Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-6"
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
              className={`text-xs font-medium py-1 px-3 rounded-full bg-${colorClass} text-white inline-block mb-3`}
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

      {/* Action Buttons */}
      <div className="p-5 flex items-center justify-between">
        <h3 className="font-bold">{item.title}</h3>

        <div className="flex gap-2">
          <motion.button
            className={`p-2 rounded-full bg-${colorClass}/10 text-${colorClass} hover:bg-${colorClass} hover:text-white transition-all duration-300`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Eye size={16} />
          </motion.button>

          <motion.button
            className={`p-2 rounded-full bg-${colorClass}/10 text-${colorClass} hover:bg-${colorClass} hover:text-white transition-all duration-300`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ExternalLink size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

// Don't forget to import necessary icons
import { ShoppingCart, Paintbrush, FileText } from "lucide-react";

export default PortfolioItem;

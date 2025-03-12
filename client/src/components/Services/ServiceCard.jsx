// src/components/Services/ServiceCard.jsx
import { motion } from "framer-motion";
import {
  ArrowRight,
  Layers,
  ShoppingCart,
  Paintbrush,
  Search,
  FileText,
  TrendingUp,
} from "lucide-react";

const ServiceCard = ({ service, isActive, onHover, onLeave }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case "design":
        return <Paintbrush size={24} />;
      case "ecommerce":
        return <ShoppingCart size={24} />;
      case "brand":
        return <Layers size={24} />;
      case "seo":
        return <Search size={24} />;
      case "cms":
        return <FileText size={24} />;
      case "conversion":
        return <TrendingUp size={24} />;
      default:
        return <Paintbrush size={24} />;
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.6, 0.05, 0.01, 0.9] },
    },
  };

  return (
    <motion.div
      className={`bg-white rounded-2xl p-6 md:p-8 transition-all duration-300 ${
        isActive ? `shadow-glow-${service.color}` : "shadow-md hover:shadow-lg"
      }`}
      variants={cardVariants}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      whileHover={{ y: -5 }}
    >
      <div className="mb-6">
        <motion.div
          className={`w-14 h-14 rounded-full flex items-center justify-center bg-${service.color}/20 text-${service.color}`}
          initial={{ scale: 1 }}
          animate={isActive ? { scale: [1, 1.1, 1] } : { scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          {getIcon(service.icon)}
        </motion.div>
      </div>

      <h3 className="text-xl font-bold mb-3">{service.title}</h3>

      <p className="text-gray-600 mb-6">{service.description}</p>

      <motion.a
        href="#"
        className={`flex items-center font-medium text-${service.color} transition-all duration-300`}
        whileHover={{ x: 5 }}
      >
        Learn more
        <ArrowRight size={16} className="ml-1" />
      </motion.a>
    </motion.div>
  );
};

export default ServiceCard;

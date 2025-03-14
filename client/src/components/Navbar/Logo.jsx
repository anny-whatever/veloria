// src/components/Navbar/Logo.jsx
import { motion } from "framer-motion";

const Logo = () => {
  const letters = "Veloria".split("");

  return (
    <a href="#home" className="flex items-center">
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-2xl font-bold text-transparent bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Veloria
          </motion.h1>
        </motion.div>
      </div>
    </a>
  );
};

export default Logo; // src/components/Navbar/Logo.jsx

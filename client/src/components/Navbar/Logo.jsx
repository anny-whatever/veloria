// src/components/Navbar/Logo.jsx
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Logo = () => {
  const letters = "Veloria".split("");

  return (
    <Link to="/" className="flex items-center">
      <div className="overflow-hidden">
        <motion.div
          className="flex"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-2xl font-bold bg-gradient-to-r from-primary-500 via-secondary-500 to-accent-500 bg-clip-text text-transparent dark:from-primary-400 dark:via-secondary-400 dark:to-accent-400"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Veloria
          </motion.h1>
        </motion.div>
      </div>
    </Link>
  );
};

export default Logo; // src/components/Navbar/Logo.jsx

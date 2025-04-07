import { useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../contexts/ThemeContext";

const ThemeToggle = ({ className = "", size = "default" }) => {
  const { isDarkMode, toggleDarkMode } = useTheme();

  // Determine icon size based on the size prop
  const iconSize =
    {
      small: 14,
      default: 18,
      large: 22,
    }[size] || 18;

  // Determine button padding based on size
  const buttonPadding =
    {
      small: "p-1.5",
      default: "p-2",
      large: "p-2.5",
    }[size] || "p-2";

  return (
    <motion.button
      onClick={toggleDarkMode}
      className={`rounded-full bg-surface-200 dark:bg-dark-100 text-primary-600 dark:text-primary-400 ${buttonPadding} ${className}`}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <AnimatePresence mode="wait">
        {isDarkMode ? (
          <motion.div
            key="sun"
            initial={{ opacity: 0, rotate: -90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: 90 }}
            transition={{ duration: 0.2 }}
          >
            <Sun size={iconSize} />
          </motion.div>
        ) : (
          <motion.div
            key="moon"
            initial={{ opacity: 0, rotate: 90 }}
            animate={{ opacity: 1, rotate: 0 }}
            exit={{ opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
          >
            <Moon size={iconSize} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default ThemeToggle;

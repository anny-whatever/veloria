import { useEffect } from "react";
import { Sun, Moon } from "lucide-react";
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
    <button
      onClick={toggleDarkMode}
      className={`rounded-full bg-surface-200 dark:bg-dark-100 text-primary-600 dark:text-primary-400 ${buttonPadding} ${className} theme-toggle-btn`}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? (
        <div className="theme-icon sun-icon">
          <Sun size={iconSize} />
        </div>
      ) : (
        <div className="theme-icon moon-icon">
          <Moon size={iconSize} />
        </div>
      )}
    </button>
  );
};

export default ThemeToggle;

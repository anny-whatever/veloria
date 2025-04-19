// tailwind.config.js
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Add a unique comment to force rebuild
  // FORCE_REBUILD: true,
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // Primary color with HSL variations for better control
        primary: {
          50: "hsl(37, 100%, 97%)",
          100: "hsl(37, 100%, 92%)",
          200: "hsl(37, 95%, 84%)",
          300: "hsl(37, 90%, 76%)",
          400: "hsl(37, 85%, 68%)",
          500: "hsl(37, 80%, 60%)", // Base color: #ecb761
          600: "hsl(37, 75%, 52%)",
          700: "hsl(37, 70%, 44%)",
          800: "hsl(37, 65%, 36%)",
          900: "hsl(37, 60%, 28%)",
        },
        // Secondary color with HSL variations
        secondary: {
          50: "hsl(340, 100%, 97%)",
          100: "hsl(340, 100%, 92%)",
          200: "hsl(340, 60%, 88%)",
          300: "hsl(340, 55%, 80%)",
          400: "hsl(340, 50%, 72%)",
          500: "hsl(340, 45%, 65%)", // Base color: #deb0bd
          600: "hsl(340, 40%, 57%)",
          700: "hsl(340, 35%, 49%)",
          800: "hsl(340, 30%, 41%)",
          900: "hsl(340, 25%, 33%)",
        },
        // Accent color with HSL variations
        accent: {
          50: "hsl(245, 100%, 97%)",
          100: "hsl(245, 100%, 92%)",
          200: "hsl(245, 50%, 86%)",
          300: "hsl(245, 45%, 78%)",
          400: "hsl(245, 40%, 70%)",
          500: "hsl(245, 35%, 62%)", // Base color: #8b86be
          600: "hsl(245, 30%, 54%)",
          700: "hsl(245, 25%, 46%)",
          800: "hsl(245, 20%, 38%)",
          900: "hsl(245, 15%, 30%)",
        },
        // Light color with HSL variations
        light: {
          50: "hsl(200, 100%, 97%)",
          100: "hsl(200, 100%, 92%)",
          200: "hsl(200, 45%, 84%)",
          300: "hsl(200, 40%, 76%)",
          400: "hsl(200, 35%, 68%)",
          500: "hsl(200, 30%, 63%)", // Base color: #86abba
          600: "hsl(200, 25%, 55%)",
          700: "hsl(200, 20%, 47%)",
          800: "hsl(200, 15%, 39%)",
          900: "hsl(200, 10%, 31%)",
        },
        // Neutral color with HSL variations
        neutral: {
          50: "hsl(74, 100%, 97%)",
          100: "hsl(74, 100%, 92%)",
          200: "hsl(74, 70%, 84%)",
          300: "hsl(74, 65%, 76%)",
          400: "hsl(74, 60%, 68%)",
          500: "hsl(74, 55%, 60%)", // Base color: #cbd690
          600: "hsl(74, 50%, 52%)",
          700: "hsl(74, 45%, 44%)",
          800: "hsl(74, 40%, 36%)",
          900: "hsl(74, 35%, 28%)",
        },
        // Surface colors for backgrounds
        surface: {
          50: "hsl(0, 0%, 100%)",
          100: "hsl(0, 0%, 98%)",
          200: "hsl(0, 0%, 96%)",
          300: "hsl(0, 0%, 94%)",
          400: "hsl(0, 0%, 92%)",
          500: "hsl(0, 0%, 90%)",
        },
        dark: {
          50: "hsl(0, 0%, 15%)",
          100: "hsl(0, 0%, 12%)",
          200: "hsl(0, 0%, 10%)",
          300: "hsl(0, 0%, 8%)",
          400: "hsl(0, 0%, 6%)",
          500: "hsl(0, 0%, 4%)",
        },
      },
      // Comprehensive spacing system
      spacing: {
        "4xs": "0.125rem", // 2px
        "3xs": "0.25rem", // 4px
        "2xs": "0.375rem", // 6px
        xs: "0.5rem", // 8px
        sm: "0.75rem", // 12px
        md: "1rem", // 16px
        lg: "1.25rem", // 20px
        xl: "1.5rem", // 24px
        "2xl": "2rem", // 32px
        "3xl": "2.5rem", // 40px
        "4xl": "3rem", // 48px
        "5xl": "4rem", // 64px
        "6xl": "5rem", // 80px
        "7xl": "6rem", // 96px
      },
      fontFamily: {
        sans: ["Poppins", "ui-sans-serif", "system-ui"],
      },
      // Typography system
      fontSize: {
        xs: ["0.75rem", { lineHeight: "1.25rem" }],
        sm: ["0.875rem", { lineHeight: "1.375rem" }],
        base: ["1rem", { lineHeight: "1.5rem" }],
        lg: ["1.125rem", { lineHeight: "1.75rem" }],
        xl: ["1.25rem", { lineHeight: "1.875rem" }],
        "2xl": ["1.5rem", { lineHeight: "2rem" }],
        "3xl": ["1.875rem", { lineHeight: "2.375rem" }],
        "4xl": ["2.25rem", { lineHeight: "2.75rem" }],
        "5xl": ["3rem", { lineHeight: "3.75rem" }],
        "6xl": ["3.75rem", { lineHeight: "4.5rem" }],
      },
      // Consistent box shadows
      boxShadow: {
        xs: "0 1px 2px rgba(0, 0, 0, 0.05)",
        sm: "0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)",
        md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        // Glow shadows for specific colors
        "glow-primary": "0 0 15px hsla(37, 80%, 60%, 0.5)",
        "glow-secondary": "0 0 15px hsla(340, 45%, 65%, 0.5)",
        "glow-accent": "0 0 15px hsla(245, 35%, 62%, 0.5)",
      },
      // Refined animations
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
        fadeIn: "fadeIn 0.7s ease-in-out forwards",
        slideUp: "slideUp 0.8s ease-in-out forwards",
        slideDown: "slideDown 0.8s ease-in-out forwards",
        slideRight: "slideRight 0.8s ease-in-out forwards",
        slideLeft: "slideLeft 0.8s ease-in-out forwards",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        slideRight: {
          "0%": { transform: "translateX(-20px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        slideLeft: {
          "0%": { transform: "translateX(20px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
      },
      // Background patterns and images
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-primary":
          "linear-gradient(to right, hsl(37, 80%, 55%), hsl(340, 45%, 60%))",
        "gradient-accent":
          "linear-gradient(to right, hsl(245, 35%, 62%), hsl(200, 30%, 63%))",
        "gradient-light":
          "linear-gradient(to right, hsl(200, 30%, 63%), hsl(74, 55%, 60%))",
        "dot-pattern":
          "radial-gradient(circle, currentColor 1px, transparent 1px)",
        "grid-pattern":
          "linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)",
      },
      // Aspect ratios for responsive elements
      aspectRatio: {
        "1/1": "1 / 1",
        "4/3": "4 / 3",
        "16/9": "16 / 9",
        "21/9": "21 / 9",
      },
      // Border radius for consistent rounding
      borderRadius: {
        xs: "0.125rem",
        sm: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
    },
  },
  plugins: [
    // Plugin to hide scrollbars while keeping scrolling functionality
    plugin(function ({ addUtilities }) {
      const newUtilities = {
        ".scrollbar-hide": {
          /* For Internet Explorer and Edge */
          "-ms-overflow-style": "none",
          /* For Firefox */
          "scrollbar-width": "none",
          /* For WebKit browsers */
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
      };
      addUtilities(newUtilities);
    }),
    // Add custom utility classes
    plugin(function ({ addUtilities, theme }) {
      // Text underline offset utilities
      const underlineUtilities = {
        ".underline-offset-sm": {
          "text-underline-offset": "2px",
        },
        ".underline-offset-md": {
          "text-underline-offset": "4px",
        },
        ".underline-offset-lg": {
          "text-underline-offset": "8px",
        },
      };

      // Card utilities with consistent styling
      const cardUtilities = {
        ".card": {
          "background-color": theme("colors.surface.50"),
          "border-radius": theme("borderRadius.lg"),
          padding: theme("spacing.md"),
          "box-shadow": theme("boxShadow.md"),
          transition: "all 0.3s ease",
        },
        ".card-hover": {
          "&:hover": {
            transform: "translateY(-5px)",
            "box-shadow": theme("boxShadow.lg"),
          },
        },
        ".card-interactive": {
          cursor: "pointer",
          "&:hover": {
            transform: "translateY(-5px)",
            "box-shadow": theme("boxShadow.lg"),
          },
          "&:active": {
            transform: "translateY(-2px)",
          },
        },
      };

      // Button utilities
      const buttonUtilities = {
        ".btn": {
          display: "inline-flex",
          "align-items": "center",
          "justify-content": "center",
          "border-radius": theme("borderRadius.full"),
          "font-weight": "500",
          transition: "all 0.3s ease",
          padding: `${theme("spacing.xs")} ${theme("spacing.md")}`,
        },
        ".btn-primary": {
          "@apply btn bg-gradient-primary text-white hover:shadow-glow-primary":
            {},
        },
        ".btn-secondary": {
          "@apply btn bg-white text-primary-600 border border-primary-300 hover:border-primary-400 hover:bg-primary-50 dark:text-white dark:border-primary-400":
            {},
        },
        ".btn-accent": {
          "@apply btn bg-gradient-accent text-white hover:shadow-glow-accent":
            {},
        },
      };

      // Text utilities for common styling patterns
      const textUtilities = {
        ".text-gradient-primary": {
          background: theme("backgroundImage.gradient-primary"),
          "background-clip": "text",
          "-webkit-background-clip": "text",
          color: "transparent",
        },
        ".text-gradient-accent": {
          background: theme("backgroundImage.gradient-accent"),
          "background-clip": "text",
          "-webkit-background-clip": "text",
          color: "transparent",
        },
        ".dark .text-gradient-primary": {
          background:
            "linear-gradient(to right, hsl(37, 80%, 55%), hsl(340, 45%, 50%))",
          "background-clip": "text",
          "-webkit-background-clip": "text",
          color: "transparent",
        },
        ".dark .text-gradient-accent": {
          background:
            "linear-gradient(to right, hsl(245, 35%, 52%), hsl(200, 30%, 53%))",
          "background-clip": "text",
          "-webkit-background-clip": "text",
          color: "transparent",
        },
      };

      addUtilities(underlineUtilities);
      addUtilities(cardUtilities);
      addUtilities(buttonUtilities);
      addUtilities(textUtilities);
    }),
  ],
};

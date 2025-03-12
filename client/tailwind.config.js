/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#ecb761",
        secondary: "#deb0bd",
        accent: "#8b86be",
        light: "#86abba",
        neutral: "#cbd690",
      },
      boxShadow: {
        "glow-primary": "0 0 15px rgba(236, 183, 97, 0.5)",
        "glow-secondary": "0 0 15px rgba(222, 176, 189, 0.5)",
        "glow-accent": "0 0 15px rgba(139, 134, 190, 0.5)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-fast": "float 4s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

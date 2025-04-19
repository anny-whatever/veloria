// client/src/pages/Admin/AdminLogin.jsx
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import API from "../../api";
import useAuth from "../../hooks/useAuth";
import { useTheme } from "../../contexts/ThemeContext";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setAuthWithToken } = useAuth(); // Use the new function from context
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await API.post("/auth/login", { email, password });

      // Use the new function to set auth and update API headers
      setAuthWithToken(response.data.token, response.data.user);

      // Add a slight delay to ensure token is set in API headers
      setTimeout(() => {
        navigate("/admin");
      }, 100);
    } catch (err) {
      console.error("Login error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to login. Please check your credentials."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-zinc-100 dark:bg-zinc-950 sm:px-6 lg:px-8">
      <motion.div
        className="w-full max-w-md p-8 space-y-8 bg-zinc-50 dark:bg-zinc-900 shadow-md rounded-xl border border-zinc-200 dark:border-zinc-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="mb-2 text-3xl font-bold text-center text-transparent bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text">
            Veloria
          </h2>
          <h3 className="text-xl font-bold text-center text-zinc-800 dark:text-zinc-200">
            Admin Login
          </h3>
          <p className="mt-2 text-sm text-center text-zinc-600 dark:text-zinc-400">
            Sign in to access the admin dashboard
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-700 dark:text-red-400 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-sm bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                placeholder="admin@example.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-zinc-700 dark:text-zinc-300"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 mt-1 text-sm bg-white dark:bg-zinc-800/50 text-zinc-900 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-colors"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex justify-center w-full px-4 py-2.5 text-sm font-medium text-white border border-transparent rounded-lg shadow-sm bg-gradient-to-r from-primary-600 to-secondary-600 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-50 dark:focus:ring-offset-zinc-900 focus:ring-primary-500 disabled:opacity-70 transition-opacity"
            >
              {isLoading ? (
                <svg
                  className="w-5 h-5 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default AdminLogin;

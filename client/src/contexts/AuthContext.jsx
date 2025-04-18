// client/src/contexts/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import API from "../api";

const AuthContext = createContext({});

// Check if code is running in browser environment
const isBrowser = typeof window !== "undefined";

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Skip on server
    if (!isBrowser) {
      setLoading(false);
      return;
    }

    // Check if user is already logged in
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      // Set auth token for subsequent API requests
      API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      setAuth({
        token,
        user: JSON.parse(user),
      });
    }

    setLoading(false);
  }, []);

  // Set auth with token and update API headers
  const setAuthWithToken = (tokenData, userData) => {
    if (isBrowser) {
      // Store in localStorage
      localStorage.setItem("token", tokenData);
      localStorage.setItem("user", JSON.stringify(userData));

      // Set auth token for API requests
      API.defaults.headers.common["Authorization"] = `Bearer ${tokenData}`;
    }

    // Update auth state
    setAuth({ token: tokenData, user: userData });
  };

  // Logout function
  const logout = () => {
    if (isBrowser) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete API.defaults.headers.common["Authorization"];
    }
    setAuth({});
  };

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, setAuthWithToken, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

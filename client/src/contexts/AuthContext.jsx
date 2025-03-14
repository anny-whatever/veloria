// client/src/contexts/AuthContext.jsx
import { createContext, useState, useEffect } from "react";
import API from "../api";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete API.defaults.headers.common["Authorization"];
    setAuth({});
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

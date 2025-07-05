// client/src/contexts/AdminAuthContext.jsx
import React, { createContext, useState, useContext } from "react";
import { login as apiLogin } from "../api/admin";

const AdminAuthContext = createContext(null);

export const AdminAuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null); // Will store { username, password }
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);
    const result = await apiLogin(username, password);
    if (result.success) {
      setAuth({ username, password });
      setLoading(false);
      return true;
    } else {
      setAuth(null);
      setError(result.error);
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setAuth(null);
  };

  const value = {
    auth,
    isAuthenticated: !!auth,
    loading,
    error,
    login,
    logout,
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};

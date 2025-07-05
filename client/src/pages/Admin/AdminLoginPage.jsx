// client/src/pages/Admin/AdminLoginPage.jsx
import React, { useState } from "react";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import "./Admin.css";

const AdminLoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, loading, error } = useAdminAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="admin-container">
      <form onSubmit={handleSubmit} className="admin-login-form">
        <h1>Admin Login</h1>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default AdminLoginPage;

// client/src/pages/Admin/AdminDashboardPage.jsx
import React, { useState, useEffect } from "react";
import { useAdminAuth } from "../../contexts/AdminAuthContext";
import { getSubmissions } from "../../api/admin";
import "./Admin.css";

const AdminDashboardPage = () => {
  const { auth, logout } = useAdminAuth();
  const [submissions, setSubmissions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [type, setType] = useState("");

  const loadSubmissions = async () => {
    setLoading(true);
    setError(null);
    const result = await getSubmissions(type, auth);
    if (result.success) {
      setSubmissions(result.data);
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadSubmissions();
  }, [type]);

  return (
    <div className="admin-container">
      <div className="admin-dashboard">
        <header>
          <h1>Admin Dashboard</h1>
          <button onClick={logout}>Logout</button>
        </header>

        <div className="admin-dashboard-controls">
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="">All</option>
            <option value="contact_submissions">Contact</option>
            <option value="book_call_submissions">Book Call</option>
            <option value="get_started_submissions">Get Started</option>
          </select>
          <button onClick={loadSubmissions} disabled={loading}>
            {loading ? "Loading..." : "Reload"}
          </button>
        </div>

        {error && <p className="error-message">{error}</p>}

        <pre className="admin-dashboard-output">
          {loading && <p>Loading submissions...</p>}
          {!loading && submissions && JSON.stringify(submissions, null, 2)}
          {!loading && !submissions && !error && (
            <p>No submissions to display.</p>
          )}
        </pre>
      </div>
    </div>
  );
};

export default AdminDashboardPage;

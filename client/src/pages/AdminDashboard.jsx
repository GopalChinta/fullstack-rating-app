import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardStyles.css";

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">🛠️ Admin Dashboard</h1>
      <p className="dashboard-text">
        Welcome, Admin! You can view all user activities, manage roles, and moderate content.
      </p>

      {/* Optional: Add a table or list showing users, analytics, etc. */}

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default AdminDashboard;




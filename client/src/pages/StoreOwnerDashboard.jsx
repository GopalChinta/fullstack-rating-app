import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/DashboardStyles.css";

const StoreOwnerDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-heading">🏪 Store Owner Dashboard</h1>
      <p className="dashboard-text">
        Welcome, Store Owner! You can manage your store ratings and view feedback.
      </p>

      {/* You can integrate a component here later to display submitted ratings or analytics */}

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default StoreOwnerDashboard;




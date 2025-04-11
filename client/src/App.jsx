import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import UserDashboard from "./pages/UserDashboard";
import StoreOwnerDashboard from "./pages/StoreOwnerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute allowedRoles={["User"]}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/store-owner-dashboard"
          element={
            <ProtectedRoute allowedRoles={["StoreOwner"]}>
              <StoreOwnerDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute allowedRoles={["Admin"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;


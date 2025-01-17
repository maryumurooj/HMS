// ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const isAuthorized = () => {
    if (!token || !user) return false;
    if (allowedRoles.length === 0) return true; // If no roles specified, allow all authenticated users
    return allowedRoles.includes(user.role);
  };

  if (!token) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  if (!isAuthorized()) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default ProtectedRoute;

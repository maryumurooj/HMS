import React from "react";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  let user = null;
  const token = localStorage.getItem("token");

  // Safely parse user from localStorage
  try {
    const userString = localStorage.getItem("user");
    if (userString) {
      user = JSON.parse(userString);
    }
  } catch (error) {
    console.error("Error parsing user data:", error);
  }

  const isAuthorized = () => {
    if (!token || !user) return false;
    if (allowedRoles.length === 0) return true;
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

// ProtectedRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token'); // assuming token is stored in local storage
  const location = useLocation();

  const isValidToken = async () => {
    try {
      const response = await axios.post('/api/validate-token', { token });
      return response.data.isValid;
    } catch (error) {
      return false;
    }
  };

  const hasRequiredRole = async () => {
    if (!token) return false;
    const userRole = (await axios.post('/api/get-user-role', { token })).data.role;
    return allowedRoles.includes(userRole);
  };

  const authenticate = async () => {
    const isValid = await isValidToken();
    if (!isValid) return false;
    return hasRequiredRole();
  };

  return authenticate().then((authenticated) => {
    if (authenticated) {
      return children;
    } else {
      return <Navigate to="/signin" replace state={{ from: location }} />;
    }
  });
};

export default ProtectedRoute;


import React from 'react';
import { Navigate } from 'react-router-dom';
import { getUserFromToken } from '../utils/auth';

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly) {
    const user = getUserFromToken();
    const isAdmin = user?.role === 'ADMIN' || user?.role === 'ROLE_ADMIN';
    if (!isAdmin) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
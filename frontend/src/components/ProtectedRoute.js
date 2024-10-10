import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useContextHooks';

const ProtectedRoute = ({ children }) => {
  const { authState } = useAuth();

  if (!authState.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
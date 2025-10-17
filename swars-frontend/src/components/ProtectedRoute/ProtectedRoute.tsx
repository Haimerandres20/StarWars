import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface ProtectedRouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <div>Verificando autenticación...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;

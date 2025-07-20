import React from 'react';
import { Navigate } from 'react-router-dom';
import { useMartAuth } from '../context/MartAuthContext';

interface ProtectedMartRouteProps {
  children: React.ReactNode;
}

const ProtectedMartRoute: React.FC<ProtectedMartRouteProps> = ({ children }) => {
  const { user, isLoading } = useMartAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/mart/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedMartRoute;
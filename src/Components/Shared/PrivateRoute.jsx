import React from "react";

import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-green-50">
        <span className="loading loading-spinner text-success w-12 h-12"></span>
      </div>
    );
  }

  if (user) return children;

  return <Navigate to="/login" state={{ from: location }} replace />;
}

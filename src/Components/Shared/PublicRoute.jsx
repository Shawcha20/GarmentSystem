import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";


export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return null; // or a spinner if you want
  }

  // If user is logged in → redirect to home
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

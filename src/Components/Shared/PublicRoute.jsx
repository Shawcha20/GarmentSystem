import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";


export default function PublicRoute({ children }) {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return null; 
  }

  
  if (user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

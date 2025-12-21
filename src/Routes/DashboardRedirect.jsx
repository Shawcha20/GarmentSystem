import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function DashboardRedirect() {
  const { role, loading } = useAuth();

  if (loading) return null;

  if (role === "admin") {
    return <Navigate to="/dashboard/manage-users" replace />;
  }

  if (role === "manager") {
    return <Navigate to="/dashboard/add-product" replace />;
  }

  // buyer / normal user
  return <Navigate to="/dashboard/my-orders" replace />;
}

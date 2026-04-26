import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  // Wait for the /me check to finish before redirecting — avoids
  // flashing the login page on a valid session during page refresh.
  if (loading) return null;

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
}

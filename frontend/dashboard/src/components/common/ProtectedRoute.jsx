import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ allowedRole }) {
  const { user } = useAuth();

  // No logueado
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Rol incorrecto
  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

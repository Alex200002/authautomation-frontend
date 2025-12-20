import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = ({ allowedRole }) => {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />; // no logueado

  if (allowedRole && user.role !== allowedRole) {
    // logueado pero rol incorrecto
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;

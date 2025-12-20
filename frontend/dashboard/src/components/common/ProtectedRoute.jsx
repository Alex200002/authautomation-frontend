import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ allowedRole }) {
  const auth = useAuth();

  if (!auth || !auth.user) {
    return <h1>CARGANDO AUTH...</h1>;
  }

  const { user } = auth;

  if (allowedRole && user.role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

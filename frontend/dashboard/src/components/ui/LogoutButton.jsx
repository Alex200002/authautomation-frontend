import { useAuth } from "../../context/AuthContext";

const LogoutButton = () => {
  const { logout } = useAuth();

  return <button onClick={logout}>Cerrar sesión</button>;
};

export default LogoutButton;

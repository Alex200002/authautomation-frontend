import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const linkStyle = ({ isActive }) => ({
  padding: "12px 16px",
  display: "block",
  textDecoration: "none",
  color: isActive ? "#fff" : "#ccc",
  background: isActive ? "#2563eb" : "transparent",
});

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside style={{ width: 220, background: "#111", color: "#fff" }}>
      <h3 style={{ padding: 16 }}>Dashboard</h3>

      {user.role !== "admin" && (
        <>
          <NavLink to="/" style={linkStyle}>Inicio</NavLink>
          <NavLink to="/reports" style={linkStyle}>Reportes</NavLink>
          <NavLink to="/analytics" style={linkStyle}>Analítica</NavLink>
        </>
      )}

      {user.role === "admin" && (
        <>
          <NavLink to="/admin" style={linkStyle}>Admin</NavLink>
          <NavLink to="/admin/users" style={linkStyle}>Usuarios</NavLink>
          <NavLink to="/admin/settings" style={linkStyle}>Configuración</NavLink>
        </>
      )}
    </aside>
  );
}

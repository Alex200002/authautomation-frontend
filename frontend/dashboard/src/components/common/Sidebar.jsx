import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Sidebar() {
  const { user } = useAuth();

  return (
    <aside style={{ width: 220, padding: 20, background: "#f4f4f4" }}>
      <h3>Menú</h3>

      {user.role === "business" && (
        <>
          <NavLink to="/" end>Dashboard</NavLink><br />
          <NavLink to="/reports">Reports</NavLink><br />
          <NavLink to="/analytics">Analytics</NavLink>
        </>
      )}

      {user.role === "admin" && (
        <>
          <NavLink to="/admin" end>Admin Dashboard</NavLink><br />
          <NavLink to="/admin/users">Users</NavLink><br />
          <NavLink to="/admin/settings">Settings</NavLink>
        </>
      )}
    </aside>
  );
}

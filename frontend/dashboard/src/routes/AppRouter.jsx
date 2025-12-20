import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ProtectedRoute from "../components/common/ProtectedRoute";

import BusinessLayout from "../layouts/BusinessLayout";
import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/business/Dashboard";
import Reports from "../pages/business/Reports";
import Analytics from "../pages/business/Analytics";

import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import Settings from "../pages/admin/Settings";

/* REDIRECCIÓN INICIAL */
function RoleRedirect() {
  const { user } = useAuth();
  if (!user) return null;

  return user.role === "admin"
    ? <Navigate to="/admin" replace />
    : <Navigate to="/business" replace />;
}

export default function AppRouter() {
  return (
    <Routes>

      {/* ENTRY POINT */}
      <Route path="/" element={<RoleRedirect />} />

      {/* ADMIN */}
      <Route element={<ProtectedRoute allowedRole="admin" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Route>

      {/* BUSINESS */}
      <Route element={<ProtectedRoute allowedRole="business" />}>
        <Route path="/business" element={<BusinessLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="reports" element={<Reports />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>
      </Route>

      <Route path="*" element={<h1>404</h1>} />

    </Routes>
  );
}

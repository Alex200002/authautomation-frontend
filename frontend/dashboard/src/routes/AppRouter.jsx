import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import BusinessLayout from "../layouts/BusinessLayout";
import AdminLayout from "../layouts/AdminLayout";

import Dashboard from "../pages/business/Dashboard";
import Reports from "../pages/business/Reports";
import Analytics from "../pages/business/Analytics";

import AdminDashboard from "../pages/admin/AdminDashboard";
import Users from "../pages/admin/Users";
import Settings from "../pages/admin/Settings";

export default function AppRouter() {
  const { user } = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        {user.role === "admin" ? (
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        ) : (
          <Route path="/" element={<BusinessLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="reports" element={<Reports />} />
            <Route path="analytics" element={<Analytics />} />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
}

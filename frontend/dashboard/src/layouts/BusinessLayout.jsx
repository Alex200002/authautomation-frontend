import Sidebar from "../components/common/Sidebar";
import { Outlet } from "react-router-dom";

export default function BusinessLayout() {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <Sidebar />
      <main style={{ flex: 1, padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}

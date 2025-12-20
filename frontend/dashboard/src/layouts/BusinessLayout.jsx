import Sidebar from "../components/common/Sidebar";
import { Outlet } from "react-router-dom";

export default function BusinessLayout() {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <main style={{ padding: 20 }}>
        <Outlet />
      </main>
    </div>
  );
}

import LogoutButton from "../components/ui/LogoutButton";

const AdminLayout = () => {
  return (
    <>
      <header>
        <h1>Admin Dashboard</h1>
        <LogoutButton />
      </header>

      <main>{/* rutas internas */}</main>
    </>
  );
};

export default AdminLayout;

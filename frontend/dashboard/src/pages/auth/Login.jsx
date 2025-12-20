import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginRequest } from "../../services/authService";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Llamada al backend
      const { token, role } = await loginRequest(form);

      // Guardar token y rol en AuthContext / localStorage
      login(token, role);

      // Redirige al entry point; RoleRedirect se encarga de decidir la ruta según rol
      navigate("/", { replace: true });
    } catch (error) {
      console.error("Error login:", error);
      alert("Credenciales inválidas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "300px", margin: "auto" }}>
      <h2>Iniciar sesión</h2>

      <input
        name="email"
        type="email"
        onChange={handleChange}
        value={form.email}
        placeholder="Email"
        required
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <input
        type="password"
        name="password"
        onChange={handleChange}
        value={form.password}
        placeholder="Contraseña"
        required
        style={{ width: "100%", marginBottom: "10px" }}
      />

      <button type="submit" style={{ width: "100%" }} disabled={loading}>
        {loading ? "Ingresando..." : "Entrar"}
      </button>
    </form>
  );
};

export default Login;

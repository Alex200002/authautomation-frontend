import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { loginRequest } from "../../services/authService";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Intentando login con:", form); // Debug

    try {
      const { token, role } = await loginRequest(form);
      console.log("Respuesta backend:", { token, role }); // Debug
      login(token, role);

      // Redirige según rol
      navigate(role === "admin" ? "/admin" : "/business");
    } catch (error) {
      console.error("Error login:", error);
      alert("Credenciales inválidas");
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

      <button type="submit" style={{ width: "100%" }}>Entrar</button>
    </form>
  );
};

export default Login;

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

    try {
      const { token, role } = await loginRequest(form);
      login(token, role);

      navigate(role === "admin" ? "/admin" : "/business");
    } catch {
      alert("Credenciales inválidas");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>

      <input name="email" onChange={handleChange} placeholder="Email" />
      <input
        type="password"
        name="password"
        onChange={handleChange}
        placeholder="Contraseña"
      />

      <button type="submit">Entrar</button>
    </form>
  );
};

export default Login;

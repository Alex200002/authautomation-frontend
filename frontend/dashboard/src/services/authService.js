import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

/**
 * Hace login con email y password
 * @param {Object} param0 { email, password }
 * @returns {Promise<{token: string, role: string}>}
 */
export const loginRequest = async ({ email, password }) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data; // { token, role }
  } catch (error) {
    console.error("Error en loginRequest:", error.response?.data || error);
    throw new Error("Credenciales inválidas");
  }
};

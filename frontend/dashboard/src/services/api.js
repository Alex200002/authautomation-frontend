const API_URL = import.meta.env.VITE_API_URL;

const USER = import.meta.env.VITE_ADMIN_USER;
const PASS = import.meta.env.VITE_ADMIN_PASSWORD;

const authHeader = "Basic " + btoa(`${USER}:${PASS}`);

export async function getContacts(page = 1) {
  const res = await fetch(`${API_URL}/api/contacts?page=${page}`, {
    headers: {
      Authorization: authHeader
    }
  });

  if (!res.ok) throw new Error("Unauthorized");

  return res.json();
}

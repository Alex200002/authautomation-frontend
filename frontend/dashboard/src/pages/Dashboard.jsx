import { useEffect, useState } from "react";
import { getContacts } from "../services/api";

export default function Dashboard() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getContacts()
      .then(data => setContacts(data.results))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Contacts</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {contacts.map(c => (
            <tr key={c._id}>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.emailStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

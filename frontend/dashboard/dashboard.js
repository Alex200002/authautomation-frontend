const API_URL = "http://localhost:3000/api";

async function loadContacts() {
  const status = document.getElementById("statusFilter").value;

  let url = `${API_URL}/contacts`;
  if (status) url += `?status=${status}`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    const table = document.getElementById("contactsTable");
    table.innerHTML = "";

    data.data.forEach(contact => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
        <td>${new Date(contact.createdAt).toLocaleString()}</td>
        <td>${contact.name}</td>
        <td>${contact.email}</td>
        <td>${contact.website || "-"}</td>
        <td class="status-${contact.emailStatus}">
          ${contact.emailStatus}
        </td>
        <td>
          ${
            contact.emailStatus === "failed"
              ? `<button onclick="resendEmail('${contact._id}')">Resend</button>`
              : "-"
          }
        </td>
      `;

      table.appendChild(tr);
    });

  } catch (err) {
    alert("Error loading contacts");
    console.error(err);
  }
}

async function resendEmail(id) {
  if (!confirm("Resend this email?")) return;

  try {
    const res = await fetch(`${API_URL}/contact/resend/${id}`, {
      method: "POST"
    });

    const data = await res.json();

    alert(data.message || "Done");
    loadContacts();

  } catch (err) {
    alert("Resend failed");
    console.error(err);
  }
}

// Cargar al inicio
loadContacts();

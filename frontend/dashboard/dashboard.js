const API_URL = "/api";

async function loadContacts() {
  const status = document.getElementById("statusFilter").value;

  let url = `${API_URL}/contacts`;
  if (status) url += `?status=${status}`;

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
}

async function resendEmail(id) {
  if (!confirm("Resend this email?")) return;

  const res = await fetch(`/api/contact/resend/${id}`, {
    method: "POST"
  });

  const data = await res.json();
  alert(data.message || "Done");
  loadContacts();
}

loadContacts();

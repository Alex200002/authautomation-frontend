const btnContacto = document.getElementById("btnContacto");
const contacto = document.getElementById("contacto");
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

btnContacto.addEventListener("click", () => {
  contacto.scrollIntoView({ behavior: "smooth" });
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  try {
    const res = await fetch("http://localhost:3000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await res.json();

    status.textContent = result.message;
    status.style.color = "#60a5fa";
    form.reset();

  } catch (error) {
    status.textContent = "Error al enviar el mensaje";
    status.style.color = "red";
  }
});

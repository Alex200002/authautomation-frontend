// Selección de elementos
const form = document.querySelector("#contactForm");
const responseMessage = document.querySelector("#responseMessage");
const submitButton = form.querySelector("[type='submit']");

// Crear spinner
const spinner = document.createElement("span");
spinner.className = "spinner";
spinner.textContent = "⏳";

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Limpiar estilos previos
  Array.from(form.elements).forEach(el => {
    if (el.type !== "submit") el.style.borderColor = "";
  });

  responseMessage.textContent = "Connecting to server...";
  responseMessage.style.color = "#ccc";
  responseMessage.appendChild(spinner);

  submitButton.disabled = true;

  const formData = new FormData(form);
  const serviceValue = formData.get("service")?.trim() || "No seleccionado"; // Ajuste aquí

  const data = {
    name: formData.get("name")?.trim(),
    email: formData.get("email")?.trim(),
    telefono: formData.get("telefono")?.trim() || "",
    service: serviceValue,
    message: formData.get("message")?.trim() || "",
    consentimiento: formData.get("consentimiento") === "on"
  };

  // Validación mínima obligatoria
  let error = false;

  // Name validation
  const nameInput = form.querySelector("[name='name']");
  if (!data.name) {
    if (nameInput) nameInput.style.borderColor = "#f87171";
    error = true;
  } else {
    if (nameInput) nameInput.style.borderColor = "#4ade80";
  }

  // Email validation
  const emailInput = form.querySelector("[name='email']");
  if (!data.email) {
    if (emailInput) emailInput.style.borderColor = "#f87171";
    error = true;
  } else {
    if (emailInput) emailInput.style.borderColor = "#4ade80";
  }

  // Consent validation
  if (!data.consentimiento) {
    error = true;
  }

  if (error) {
    spinner.remove();
    responseMessage.style.color = "#f87171";
    responseMessage.textContent =
      "Please complete the required fields and accept consent.";
    responseMessage.scrollIntoView({ behavior: "smooth" });
    submitButton.disabled = false;
    return;
  }

  // Timeout si el servidor tarda
  const loadingTimeout = setTimeout(() => {
    responseMessage.textContent = "Server is taking long, please wait... ⏳";
    responseMessage.style.color = "#facc15";
    responseMessage.appendChild(spinner);
    responseMessage.scrollIntoView({ behavior: "smooth" });
  }, 5000);

  try {
    const response = await fetch(
      "https://backend-authautomation.onrender.com/api/contact",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    );

    clearTimeout(loadingTimeout);
    spinner.remove();

    let result;
    try {
      result = await response.json();
    } catch (jsonError) {
      throw new Error("Server did not respond with valid JSON");
    }

    if (!response.ok) {
      throw new Error(result.message || "Unknown server error");
    }

    // Success
    responseMessage.style.color = "#4ade80";
    responseMessage.textContent = "Request sent successfully ✔️";
    responseMessage.scrollIntoView({ behavior: "smooth" });
    form.reset();
    Array.from(form.elements).forEach(el => {
      if (el.type !== "submit") el.style.borderColor = "";
    });

    setTimeout(() => responseMessage.textContent = "", 5000);
  } catch (error) {
    clearTimeout(loadingTimeout);
    spinner.remove();
    console.error("Fetch or backend error:", error);

    responseMessage.style.color = "#f87171";
    if (error.message.includes("Failed to fetch")) {
      responseMessage.textContent =
        "Cannot connect to the server. Check your connection ❌";
    } else {
      responseMessage.textContent = `Error: ${error.message}`;
    }
    responseMessage.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => responseMessage.textContent = "", 5000);
  } finally {
    submitButton.disabled = false;
  }
});

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

  responseMessage.textContent = "Conectando con el servidor...";
  responseMessage.style.color = "#ccc";
  responseMessage.appendChild(spinner);

  submitButton.disabled = true; // Deshabilitar botón

  const formData = new FormData(form);
  const data = {
    nombre: formData.get("nombre")?.trim(),
    email: formData.get("email")?.trim(),
    telefono: formData.get("telefono")?.trim() || null,
    message: formData.get("message")?.trim() || null,
    consentimiento: formData.get("consentimiento") === "on"
  };

  // Validación mínima obligatoria
  let error = false;

  if (!data.nombre) {
    const nombreInput = form.querySelector("[name='nombre']");
    nombreInput.style.borderColor = "#f87171";
    error = true;
  } else {
    form.querySelector("[name='nombre']").style.borderColor = "#4ade80";
  }

  if (!data.email) {
    const emailInput = form.querySelector("[name='email']");
    emailInput.style.borderColor = "#f87171";
    error = true;
  } else {
    form.querySelector("[name='email']").style.borderColor = "#4ade80";
  }

  if (!data.consentimiento) {
    error = true;
  }

  if (error) {
    spinner.remove();
    responseMessage.style.color = "#f87171";
    responseMessage.textContent =
      "Por favor completa los campos obligatorios y acepta el consentimiento";
    responseMessage.scrollIntoView({ behavior: "smooth" });
    submitButton.disabled = false;
    return;
  }

  // Timeout si el servidor tarda
  const loadingTimeout = setTimeout(() => {
    responseMessage.textContent =
      "Servidor lento, por favor espera... ⏳";
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
      throw new Error("El servidor no respondió con JSON válido");
    }

    if (!response.ok) {
      throw new Error(result.message || "Error desconocido del servidor");
    }

    // Éxito
    responseMessage.style.color = "#4ade80";
    responseMessage.textContent = "¡Solicitud enviada correctamente ✔️";
    responseMessage.scrollIntoView({ behavior: "smooth" });
    form.reset();
    Array.from(form.elements).forEach(el => {
      if (el.type !== "submit") el.style.borderColor = "";
    });

    setTimeout(() => responseMessage.textContent = "", 5000);
  } catch (error) {
    clearTimeout(loadingTimeout);
    spinner.remove();
    console.error("Error en fetch o backend:", error);

    responseMessage.style.color = "#f87171";
    if (error.message.includes("Failed to fetch")) {
      responseMessage.textContent =
        "No se pudo conectar con el servidor. Revisa tu conexión ❌";
    } else {
      responseMessage.textContent = `Error: ${error.message}`;
    }
    responseMessage.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => responseMessage.textContent = "", 5000);
  } finally {
    submitButton.disabled = false; // Rehabilitar botón
  }
});

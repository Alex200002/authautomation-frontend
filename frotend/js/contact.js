form.addEventListener("submit", async (e) => {
  e.preventDefault();

  responseMessage.textContent = "Conectando con el servidor...";
  responseMessage.style.color = "#ccc";

  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const loadingTimeout = setTimeout(() => {
    responseMessage.textContent =
      "Activando servidor, puede tardar unos segundos ⏳";
  }, 4000);

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

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message);
    }

    responseMessage.style.color = "#4ade80";
    responseMessage.textContent = "Solicitud enviada correctamente ✔️";
    form.reset();

  } catch (error) {
    clearTimeout(loadingTimeout);
    responseMessage.style.color = "#f87171";
    responseMessage.textContent =
      "No se pudo enviar. Intenta nuevamente en unos segundos ❌";
  }
});

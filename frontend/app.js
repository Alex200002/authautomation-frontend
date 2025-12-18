form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const submitBtn = form.querySelector("button");
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  responseMessage.textContent = "Conectando con el servidor...";
  responseMessage.style.color = "#ccc";

  submitBtn.disabled = true;
  submitBtn.innerHTML = "⏳ Enviando...";
  submitBtn.style.opacity = "0.6";

  const loadingTimeout = setTimeout(() => {
    responseMessage.textContent =
      "Activando servidor, puede tardar unos segundos ⏳";
  }, 4000);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(
      "https://backend-authautomation.onrender.com/api/contact",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        signal: controller.signal
      }
    );

    clearTimeout(timeoutId);
    clearTimeout(loadingTimeout);

    const result = await response.json();

    if (!response.ok) {
      if (response.status === 400) {
        throw new Error("Datos inválidos. Verifica el formulario.");
      }
      if (response.status >= 500) {
        throw new Error("Servidor no disponible. Intenta más tarde.");
      }
      throw new Error(result.message || "Error desconocido");
    }

    responseMessage.style.color = "#4ade80";
    responseMessage.textContent = "Solicitud enviada correctamente ✔️";
    form.reset();

  } catch (error) {
    clearTimeout(timeoutId);
    clearTimeout(loadingTimeout);

    responseMessage.style.color = "#f87171";

    if (error.name === "AbortError") {
      responseMessage.textContent =
        "El servidor está despertando. Intenta nuevamente en unos segundos ⏳";
    } else {
      responseMessage.textContent = error.message;
    }
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = "Enviar solicitud";
    submitBtn.style.opacity = "1";
  }
});

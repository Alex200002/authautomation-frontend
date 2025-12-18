const chatInput = document.getElementById("chatInput");
const chatMessages = document.getElementById("chatMessages");

function addMessage(text) {
  const msg = document.createElement("div");
  msg.textContent = text;
  chatMessages.appendChild(msg);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

addMessage("🤖 Hola, ¿en qué puedo ayudarte?");

chatInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter" && chatInput.value.trim() !== "") {
    addMessage("🧑 " + chatInput.value);
    addMessage("🤖 Gracias por escribirnos, pronto te contactaremos.");
    chatInput.value = "";
  }
});

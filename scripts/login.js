import { apiPost } from "./api.js";
const token = localStorage.getItem("token");
if (token) {
    window.location.href = "../pages/home.html";
}
const form = document.getElementById("form-login");
const messageDiv = document.getElementById("message");
function showMessage(text, isError = false) {
    messageDiv.style.display = "block"; // MOSTRAR A MENSAGEM
    messageDiv.textContent = text;
    messageDiv.className = isError ? "erro" : "sucesso"; // USA AS CORES DO CSS
}
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const response = await apiPost("/accounts/login/", { email, password }, false, "POST");
    if (response.ok) {
        const data = await response.json();
        console.log("Login response:", data);
        if (!data.token) {
            showMessage("Backend não retornou token!", true);
            return;
        }
        localStorage.setItem("token", data.token);
        showMessage("Login realizado com sucesso!");
        setTimeout(() => {
            window.location.href = "../pages/home.html";
        }, 800);
    }
    else {
        const data = await response.text();
        console.log("Erro backend:", data);
        showMessage("Erro ao fazer login. Verifique seus dados.", true);
    }
});

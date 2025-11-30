import { apiPost } from "./api.js";
const token = localStorage.getItem("token");
if (token) {
    window.location.href = "../pages/home.html";
}
const form = document.getElementById("register-form");
const msgBox = document.getElementById("message");
function showMessage(text, type) {
    msgBox.textContent = text;
    msgBox.className = type;
    msgBox.style.display = "block";
}
const errorTranslations = {
    "This password is too short. It must contain at least 8 characters.": "A senha é muito curta. Deve conter pelo menos 8 caracteres.",
    "This password is too common.": "A senha é muito comum.",
    "This password is entirely numeric.": "A senha não pode conter apenas números.",
    "Enter a valid email address.": "Digite um endereço de e-mail válido.",
    "This field may not be blank.": "Este campo não pode ficar vazio."
};
function formatErrors(errors) {
    return Object.entries(errors)
        .map(([field, msgs]) => {
        const translatedMsgs = msgs.map(msg => errorTranslations[msg] || msg);
        return `${field}: ${translatedMsgs.join(", ")}`;
    })
        .join("\n");
}
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const last_name = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;
    const response = await apiPost("/accounts/register/", {
        name,
        last_name,
        email,
        password,
        password2
    }, false);
    if (response.status === 201) {
        showMessage("Usuário criado com sucesso! Redirecionando...", "sucesso");
        setTimeout(() => {
            window.location.href = "../pages/login.html";
        }, 1200);
        return;
    }
    const result = await response.json();
    showMessage("Erro:\n" + formatErrors(result), "erro");
});

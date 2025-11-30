var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const last_name = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;
    const response = yield apiPost("/accounts/register/", {
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
    const result = yield response.json();
    showMessage("Erro:\n" + formatErrors(result), "erro");
}));

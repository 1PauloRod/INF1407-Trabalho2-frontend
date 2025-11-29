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
const message = document.getElementById("message");
form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const last_name = document.getElementById("last-name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const response = yield apiPost("/accounts/register/", { name, last_name, email, password }, false);
    if (response.status === 201) {
        alert("Usuário registrado com sucesso!");
        window.location.href = "../pages/login.html";
        return;
    }
    const result = yield response.json();
    alert("Erro: " + JSON.stringify(result));
}));

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
const form = document.getElementById("form-login");
form.addEventListener("submit", (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const response = yield apiPost("/accounts/login/", { email, password }, false);
    if (response.ok) {
        const data = yield response.json();
        console.log("Login response:", data);
        if (!data.token) {
            alert("Backend não retornou token!");
            return;
        }
        localStorage.setItem("token", data.token);
        window.location.href = "../pages/home.html";
    }
    else {
        const data = yield response.text();
        console.log("Erro backend:", data);
        alert("Erro login");
    }
}));

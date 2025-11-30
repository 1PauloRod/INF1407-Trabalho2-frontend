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
const form = document.getElementById("formSenha");
const senhaAtualInput = document.getElementById("senha_atual");
const novaSenhaInput = document.getElementById("nova_senha");
const msgBox = document.getElementById("message");
function showMessage(msg, ok = false) {
    msgBox.innerHTML = msg;
    msgBox.style.display = "block";
    msgBox.className = ok ? "sucesso" : "erro";
}
form.onsubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const payload = {
        senha_atual: senhaAtualInput.value,
        nova_senha: novaSenhaInput.value
    };
    const response = yield apiPost("/accounts/alterar-senha/", payload);
    if (response.ok) {
        showMessage("Senha alterada com sucesso!", true);
        setTimeout(() => window.location.href = "home.html", 1000);
    }
    else {
        if (response.status === 400) {
            showMessage("Erro ao alterar senha: Ambos campos precisam ser preenchidos.");
        }
        else if (response.status === 401) {
            showMessage("Erro ao alterar senha: Senha atual incorreta.");
        }
        else if (response.status === 201) {
            showMessage("Senha alterada com sucesso!", true);
        }
    }
});

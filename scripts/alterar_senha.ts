import { apiPost } from "./api.js";

const form = document.getElementById("formSenha") as HTMLFormElement;
const senhaAtualInput = document.getElementById("senha_atual") as HTMLInputElement;
const novaSenhaInput = document.getElementById("nova_senha") as HTMLInputElement;
const msgBox = document.getElementById("message") as HTMLElement;

function showMessage(msg: string, ok = false) {
    msgBox.innerHTML = msg;
    msgBox.style.display = "block";

    msgBox.className = ok ? "sucesso" : "erro";
}


form.onsubmit = async (e) => {
    e.preventDefault();

    const payload = {
        senha_atual: senhaAtualInput.value,
        nova_senha: novaSenhaInput.value
    };

    const response = await apiPost("/accounts/alterar-senha/", payload);

    if (response.ok) {
        showMessage("Senha alterada com sucesso!", true);
        setTimeout(() => window.location.href = "home.html", 1000);
    } else {
        if (response.status === 400){
            showMessage("Erro ao alterar senha: Ambos campos precisam ser preenchidos.");
        }else if (response.status === 401){
             showMessage("Erro ao alterar senha: Senha atual incorreta.");
        }else if (response.status === 201) {
            showMessage("Senha alterada com sucesso!", true);

        }            
    }
};

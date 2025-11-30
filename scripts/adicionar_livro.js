import { apiPost } from "./api.js";
const form = document.getElementById("formAddLivro");
const tituloInput = document.getElementById("titulo");
const autorInput = document.getElementById("autor");
const anoInput = document.getElementById("ano");
const msgBox = document.getElementById("message");
function showMessage(msg, ok = false) {
    msgBox.innerHTML = msg;
    msgBox.style.display = "block";
    msgBox.className = ok ? "sucesso" : "erro";
}
form.onsubmit = async (e) => {
    e.preventDefault();
    const data = {
        titulo: tituloInput.value,
        autor: autorInput.value,
        ano: anoInput.value,
        disponivel: true
    };
    const response = await apiPost("/livros/adicionar/", data);
    if (response.ok) {
        showMessage("Livro criado com sucesso!", true);
        setTimeout(() => {
            tituloInput.value = "";
            autorInput.value = "";
            anoInput.value = "";
            msgBox.style.display = "none";
        }, 1500);
    }
    else {
        const msg = await response.text();
        showMessage("Erro ao criar livro: " + msg);
    }
};

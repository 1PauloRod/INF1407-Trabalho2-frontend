import { apiPost } from "./api.js";

const form = document.getElementById("formAddLivro") as HTMLFormElement;
const tituloInput = document.getElementById("titulo") as HTMLInputElement;
const autorInput = document.getElementById("autor") as HTMLInputElement;
const anoInput = document.getElementById("ano") as HTMLInputElement;
const msgBox = document.getElementById("message") as HTMLElement;

function showMessage(msg: string, ok = false) {
    msgBox.innerHTML = msg;
    msgBox.style.display = "block";
    msgBox.className = ok ? "sucesso" : "erro";
}

form.onsubmit = async (e: Event) => {
    e.preventDefault();

    const data = {
        titulo: tituloInput.value, 
        autor: autorInput.value, 
        ano: anoInput.value,    
        disponivel: true        
    }

    const response = await apiPost("/livros/adicionar/", data);

    if (response.ok){
        showMessage("Livro criado com sucesso!", true);
        setTimeout(() => {
            tituloInput.value = "";
            autorInput.value = "";
            anoInput.value = "";
            msgBox.style.display = "none";
        }, 1500);
    } else {
        const msg = await response.text();
        showMessage("Erro ao criar livro: " + msg);
    }
};

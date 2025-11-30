import { apiGet, apiPost } from "./api.js";

const form = document.getElementById("formEditarLivro") as HTMLFormElement;
const tituloInput = document.getElementById("titulo") as HTMLInputElement;
const autorInput = document.getElementById("autor") as HTMLInputElement;
const anoInput = document.getElementById("ano") as HTMLInputElement;

const params = new URLSearchParams(window.location.search);
const livroId = params.get("id"); 

if (!livroId){
    alert("ID do livro não informado!");
    window.location.href = "home-admin.html";
}

async function loadLivro(){
    const response = await apiGet(`/livros/?id=${livroId}`);
    const lista = await response.json();

    const livro = lista[0]; 

    tituloInput.value = livro.titulo; 
    autorInput.value = livro.autor;
    anoInput.value = livro.ano;
}

form.onsubmit = async (e: Event) => {
    e.preventDefault();

   const data = {
        titulo: tituloInput.value,
        autor: autorInput.value,
        ano: Number(anoInput.value),
        disponivel: true 
    };

    const response = await apiPost(`/livros/${livroId}/atualizar/`, data, true, "POST");

    if (response.ok) {
        alert("Livro atualizado com sucesso!");
        window.location.href = "home-admin.html";
    } else {
        const msg = await response.text();
        alert("Erro ao atualizar livro:\n" + msg);
    }
}; 


loadLivro();
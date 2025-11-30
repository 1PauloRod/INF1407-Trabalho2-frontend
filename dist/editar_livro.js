var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { apiGet, apiPost } from "./api.js";
const form = document.getElementById("formEditarLivro");
const tituloInput = document.getElementById("titulo");
const autorInput = document.getElementById("autor");
const anoInput = document.getElementById("ano");
const params = new URLSearchParams(window.location.search);
const livroId = params.get("id");
if (!livroId) {
    alert("ID do livro não informado!");
    window.location.href = "home-admin.html";
}
function loadLivro() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield apiGet(`/livros/?id=${livroId}`);
        const lista = yield response.json();
        const livro = lista[0];
        tituloInput.value = livro.titulo;
        autorInput.value = livro.autor;
        anoInput.value = livro.ano;
    });
}
form.onsubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const data = {
        titulo: tituloInput.value,
        autor: autorInput.value,
        ano: Number(anoInput.value),
        disponivel: true
    };
    const response = yield apiPost(`/livros/${livroId}/atualizar/`, data, true, "POST");
    if (response.ok) {
        alert("Livro atualizado com sucesso!");
        window.location.href = "home-admin.html";
    }
    else {
        const msg = yield response.text();
        alert("Erro ao atualizar livro:\n" + msg);
    }
});
loadLivro();

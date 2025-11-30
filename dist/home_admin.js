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
const bookList = document.getElementById("book-list");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search");
const addBtn = document.getElementById("add-btn");
const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "./login.html";
}
// 🚨 Verificar se é bibliotecário
function loadUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield apiGet("/accounts/me/");
        if (!response.ok) {
            localStorage.removeItem("token");
            window.location.href = "./login.html";
            return;
        }
        const data = yield response.json();
        if (!data.bibliotecario) {
            alert("Acesso negado! Apenas bibliotecários podem acessar esta página.");
            window.location.href = "./home.html";
            return;
        }
    });
}
function loadBooks() {
    return __awaiter(this, arguments, void 0, function* (q = "") {
        const endpoint = q ? `/livros/?q=${encodeURIComponent(q)}` : "/livros/";
        const response = yield apiGet(endpoint);
        if (!response.ok) {
            bookList.innerHTML = "<li>Erro ao carregar livros.</li>";
            return;
        }
        const livros = yield response.json();
        if (livros.length === 0) {
            bookList.innerHTML = "<li>Nenhum livro encontrado.</li>";
            return;
        }
        bookList.innerHTML = livros
            .map((l) => `
             <li>
            <div>
                <strong>${l.titulo}</strong> — ${l.autor} (${l.ano})
                <span>Disponível: ${l.disponivel ? "✔" : "❌"}</span>
            </div>
            <div class="buttons">
                <button onclick="editarLivro(${l.id})">Editar</button>
                <button onclick="deletarLivro(${l.id})">Excluir</button>
            </div>
        </li>
        `)
            .join("");
    });
}
searchBtn.onclick = () => {
    const q = searchBtn.value.trim();
    loadBooks(q);
};
// Enter também busca
searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const q = searchInput.value.trim();
        loadBooks(q);
    }
});
// @ts-ignore
window.deletarLivro = function (livroId) {
    return __awaiter(this, void 0, void 0, function* () {
        const confirmado = confirm("Tem certeza que deseja excluir este livro?");
        if (!confirmado)
            return;
        const response = yield apiPost(`/livros/${livroId}/deletar/`, {}, true, "DELETE");
        if (response.ok) {
            alert("Livro excluído com sucesso!");
            loadBooks();
        }
        else {
            alert("Erro ao excluir o livro.");
        }
    });
};
// @ts-ignore
window.editarLivro = function (id) {
    window.location.href = `editar-livro.html?id=${id}`;
};
addBtn.onclick = () => __awaiter(void 0, void 0, void 0, function* () {
    window.location.href = "adicionar-livro.html";
});
loadUser();
loadBooks();

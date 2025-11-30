var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
import { apiGet, apiPost } from "./api.js";
const heading = document.getElementById("name");
const bookList = document.getElementById("book-list");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
const trocarSenhaBtn = document.getElementById("trocar-senha-btn");
const messageDiv = document.getElementById("message");
function showMessage(text, isError = false) {
    messageDiv.style.display = "block";
    messageDiv.textContent = text;
    messageDiv.className = isError ? "erro" : "sucesso";
    setTimeout(() => {
        messageDiv.style.display = "none";
    }, 2000);
}
const token = localStorage.getItem("token");
if (!token) {
    window.location.href = "../pages/login.html";
}
function loadUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield apiGet("/accounts/me/");
        if (!response.ok) {
            localStorage.removeItem("token");
            window.location.href = "../pages/login.html";
            return;
        }
        const data = yield response.json();
        if (data.bibliotecario) {
            window.location.href = "../pages/home-admin.html";
            return;
        }
        heading.innerText = `Olá, ${data.name} \u{1F44B}`;
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
            .map((l) => `<li class="book-item">
                <div class="info">
                    <span class="title">${l.titulo}</span>
                    <span class="author">${l.autor} (${l.ano})</span>
                    <span class="status">${l.disponivel ? "✔ Disponível" : "❌ Indisponível"}</span>
                </div>

                <div class="actions">
                ${l.disponivel
            ? `<button class="btn small" onclick="alugar(${l.id})">Alugar</button>`
            : ""}
                </div>
            </li>`)
            .join("");
    });
}
// @ts-ignore
window.alugar = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield apiPost(`/livros/${id}/alugar/`, {}, true, "POST");
        if (response.ok) {
            showMessage("Livro alugado com sucesso!");
            loadBooks();
        }
        else {
            showMessage("Erro ao alugar o livro.", true);
        }
    });
};
// @ts-ignore
window.devolver = function (id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield apiPost(`/livros/emprestimo/${id}/devolver/`, {}, true, "POST");
        if (response.ok) {
            showMessage("Livro devolvido!");
            loadBooks();
        }
        else {
            showMessage("Erro ao devolver livro.", true);
        }
    });
};
searchBtn.onclick = () => {
    const q = searchInput.value.trim();
    loadBooks(q);
};
searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const q = searchInput.value.trim();
        loadBooks(q);
    }
});
(_a = document.getElementById("meus-emprestimos-btn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
    window.location.href = "meus-livros.html";
});
trocarSenhaBtn.onclick = () => {
    window.location.href = "alterar-senha.html";
};
loadUser();
loadBooks();

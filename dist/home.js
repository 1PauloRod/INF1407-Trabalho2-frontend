var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { apiGet } from "./api.js";
const heading = document.getElementById("name");
const bookList = document.getElementById("book-list");
const searchInput = document.getElementById("search");
const searchBtn = document.getElementById("search-btn");
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
        heading.innerText = `Olá, ${data.name}`;
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
            .map((l) => `<li>${l.titulo} — ${l.autor} (${l.ano}) 
                    <strong>${l.disponivel ? "✔ Disponível" : "❌ Indisponível"}</strong>
                </li>`)
            .join("");
    });
}
searchBtn.onclick = () => {
    const q = searchInput.value.trim();
    loadBooks(q);
};
// Enter também busca
searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        const q = searchInput.value.trim();
        loadBooks(q);
    }
});
loadUser();
loadBooks();

import { apiGet, apiPost } from "./api.js";

const bookList = document.getElementById("book-list") as HTMLElement;
const searchBtn = document.getElementById("search-btn") as HTMLButtonElement;
const searchInput = document.getElementById("search") as HTMLInputElement;
const addBtn = document.getElementById("add-btn") as HTMLButtonElement;

const token = localStorage.getItem("token");

if (!token) {
    window.location.href = "./login.html";
}

// 🚨 Verificar se é bibliotecário
async function loadUser() {
    const response = await apiGet("/accounts/me/");
    if (!response.ok) {
        localStorage.removeItem("token");
        window.location.href = "./login.html";
        return;
    }

    const data = await response.json();

    if (!data.bibliotecario) {
        alert("Acesso negado! Apenas bibliotecários podem acessar esta página.");
        window.location.href = "./home.html";
        return;
    }
}

async function loadBooks(q="") {
     const endpoint = q ? `/livros/?q=${encodeURIComponent(q)}` : "/livros/";
    const response = await apiGet(endpoint);
    if (!response.ok) {
        bookList.innerHTML = "<li>Erro ao carregar livros.</li>";
        return;
    }

    const livros = await response.json();

    if (livros.length === 0) {
        bookList.innerHTML = "<li>Nenhum livro encontrado.</li>";
        return;
    }

    bookList.innerHTML = livros
        .map((l: any) => `
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
window.deletarLivro = async function(livroId: number) {
    const confirmado = confirm("Tem certeza que deseja excluir este livro?");
    if (!confirmado) return;

    const response = await apiPost(`/livros/${livroId}/deletar/`, {}, true, "DELETE");

    if (response.ok) {
        alert("Livro excluído com sucesso!");
        loadBooks();
    } else {
        alert("Erro ao excluir o livro.");
    }
};

// @ts-ignore
window.editarLivro = function(id: number) {
    window.location.href = `editar-livro.html?id=${id}`;
};

addBtn.onclick = async () => {
    window.location.href = "adicionar-livro.html";
}

loadUser();
loadBooks();

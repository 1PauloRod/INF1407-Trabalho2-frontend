import { apiGet, apiPost } from "./api.js";

const heading = document.getElementById("name") as HTMLElement;
const bookList = document.getElementById("book-list") as HTMLElement;
const searchInput = document.getElementById("search") as HTMLInputElement;
const searchBtn = document.getElementById("search-btn") as HTMLButtonElement;

const token = localStorage.getItem("token"); 

if (!token){
    window.location.href ="../pages/login.html";
}


async function loadUser(){
    const response = await apiGet("/accounts/me/");

    if (!response.ok){
        localStorage.removeItem("token");
        window.location.href = "../pages/login.html";
        return ; 
    }

    const data = await response.json();
    heading.innerText = `Olá, ${data.name}`;
}

async function loadBooks(q = "") {
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
        .map(
            (l: any) =>
                `<li>${l.titulo} — ${l.autor} (${l.ano}) 
                    <strong>${l.disponivel ? "✔ Disponível" : "❌ Indisponível"}</strong>
                </li>`
        )
        .join("");
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
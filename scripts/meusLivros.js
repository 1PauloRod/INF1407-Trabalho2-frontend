import { apiGet, apiPost } from "./api.js";
const lista = document.getElementById("emprestimo-list");
const messageDiv = document.getElementById("message");
function showMessage(text, isError = false) {
    messageDiv.style.display = "block";
    messageDiv.textContent = text;
    messageDiv.className = isError ? "erro" : "sucesso";
    setTimeout(() => {
        messageDiv.style.display = "none";
    }, 2500);
}
const token = localStorage.getItem("token");
if (!token)
    window.location.href = "login.html";
async function loadEmprestimos() {
    const response = await apiGet("/livros/meus-emprestimos/");
    if (!response.ok) {
        lista.innerHTML = "<li>Erro ao carregar seus livros.</li>";
        return;
    }
    const emprestimos = await response.json();
    if (emprestimos.length === 0) {
        lista.innerHTML = "<li>Você não possui livros alugados.</li>";
        return;
    }
    lista.innerHTML = emprestimos
        .map((e) => `
        <li class="book-item" id="emprestimo-${e.id}">

            <div class="info">
                <span class="title">${e.livro.titulo}</span>
                <span class="author">${e.livro.autor}</span>
                <span class="status">
                    ${e.data_devolucao
        ? `<span style="color: green;">✔ Devolvido</span>`
        : `<span style="color: #b91c1c;">❗ Pendência</span>`}
                </span>
                <small>Emprestado em: ${new Date(e.data_emprestimo).toLocaleString()}</small>

                <div class="data-devolucao">
                    ${e.data_devolucao
        ? `Devolvido em: ${new Date(e.data_devolucao).toLocaleString()}`
        : ""}
                </div>
            </div>

            <div class="actions">
                ${!e.data_devolucao
        ? `<button class="btn small danger" onclick="devolver(${e.id})">Devolver</button>`
        : ""}
            </div>
        </li>`)
        .join("");
}
// @ts-ignore
window.devolver = async function (id) {
    const response = await apiPost(`/livros/emprestimo/${id}/devolver/`, {}, true, "POST");
    if (!response.ok) {
        showMessage("Erro ao devolver livro.", true);
        return;
    }
    const data = await response.json();
    const item = document.getElementById(`emprestimo-${id}`);
    if (!item)
        return;
    item.querySelector(".status").innerHTML =
        `<span style="color: green; font-weight: bold;">✔ Devolvido</span>`;
    item.querySelector(".data-devolucao").innerHTML =
        `Devolvido em: ${new Date(data.data_devolucao).toLocaleString()}`;
    const btn = item.querySelector("button");
    if (btn)
        btn.remove();
    showMessage("Livro devolvido com sucesso!");
};
loadEmprestimos();

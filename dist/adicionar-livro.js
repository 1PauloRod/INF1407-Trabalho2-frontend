var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { apiPost } from "./api.js";
const form = document.getElementById("formAddLivro");
const tituloInput = document.getElementById("titulo");
const autorInput = document.getElementById("autor");
const anoInput = document.getElementById("ano");
const voltarBtn = document.getElementById("voltar-btn");
form.onsubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
    e.preventDefault();
    const data = {
        titulo: tituloInput.value,
        autor: autorInput.value,
        ano: anoInput.value,
        disponivel: true
    };
    const response = yield apiPost("/livros/criar/", data);
    if (response.ok) {
        alert("Livro criado com sucesso!");
        window.location.href = "adicionar-livro.html";
    }
    else {
        const msg = yield response.text();
        alert("Erro ao criar livro: \n" + msg);
    }
});
voltarBtn.onclick = () => __awaiter(void 0, void 0, void 0, function* () {
    window.location.href = "home-admin.html";
});

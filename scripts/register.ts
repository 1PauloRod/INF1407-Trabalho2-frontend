import { apiPost } from "./api.js"


const token = localStorage.getItem("token");

if (token){
    window.location.href = "../pages/home.html";
}

const form = document.getElementById("register-form") as HTMLFormElement;
const message = document.getElementById("message") as HTMLElement;

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = (document.getElementById("name") as HTMLInputElement).value; 
    const last_name = (document.getElementById("last-name") as HTMLInputElement).value; 
    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    const response = await apiPost("/accounts/register/", { name, last_name, email, password }, false);

    if (response.status === 201){
        alert("Usuário registrado com sucesso!");

        window.location.href = "../pages/login.html";
        return ;
    }

    const result = await response.json(); 
    alert("Erro: " + JSON.stringify(result));
});


 
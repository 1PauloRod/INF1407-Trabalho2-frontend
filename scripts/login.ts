import { apiPost } from "./api.js"


const token = localStorage.getItem("token");

if (token){
    window.location.href = "../pages/home.html"; 
}


const form = document.getElementById("form-login") as HTMLFormElement;

form.addEventListener("submit", async(e) => {
    e.preventDefault();

    const email = (document.getElementById("email") as HTMLInputElement).value;
    const password = (document.getElementById("password") as HTMLInputElement).value;

    const response = await apiPost("/accounts/login/", {email, password}, false);

    if (response.ok){
    const data = await response.json();
    console.log("Login response:", data);

    if (!data.token){
        alert("Backend não retornou token!");
        return;
    }

    localStorage.setItem("token", data.token);
    window.location.href = "../pages/home.html";
} else {
    const data = await response.text();
    console.log("Erro backend:", data);
    alert("Erro login");
}
})
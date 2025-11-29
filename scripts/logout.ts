import { apiPost } from "./api.js";

async function logout() {
    const response = await apiPost("/accounts/logout/", {}, true);

    if (response.ok){
        localStorage.removeItem("token"); 
        window.location.href = "../pages/login.html"; 
    }else{
        alert("Erro ao fazer logout");
    }
}

const btn = document.getElementById("logout-btn") as HTMLButtonElement;

btn.addEventListener("click", () => {
    logout();
})


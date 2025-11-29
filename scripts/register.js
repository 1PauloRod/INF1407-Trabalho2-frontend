"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const api_ts_1 = require("./api.ts");
const form = document.getElementById("register-form");
const message = document.getElementById("message");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const response = await (0, api_ts_1.apiPost)("/accounts/register/", { email, password });
    if (response.ok) {
        message.style.color = "green";
        message.innerText = "Conta criada com sucesso!";
    }
    else {
        const data = await response.json();
        message.innerText = JSON.stringify(data);
    }
});
//# sourceMappingURL=register.js.map
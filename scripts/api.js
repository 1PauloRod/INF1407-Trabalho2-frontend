const API_URL = "http://127.0.0.1:8000";
export async function apiPost(endpoint, data, useAuth = true, method = "POST") {
    const headers = {
        "Content-Type": "application/json"
    };
    if (useAuth) {
        const token = localStorage.getItem("token");
        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
    }
    const response = await fetch(API_URL + endpoint, {
        method: method,
        headers,
        body: method === "DELETE" ? null : JSON.stringify(data)
    });
    return response;
}
export async function apiGet(endpoint) {
    const token = localStorage.getItem("token");
    const response = await fetch(API_URL + endpoint, {
        method: "GET",
        headers: {
            "Authorization": `Token ${token}`
        }
    });
    return response;
}

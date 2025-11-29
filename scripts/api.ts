const API_URL = "http://127.0.0.1:8000";

export async function apiPost(endpoint: string, data: any, useAuth: boolean = true) {
    const headers: any = {
        "Content-Type": "application/json"
    };

    if (useAuth) {
        const token = localStorage.getItem("token");
        if (token) {
            headers["Authorization"] = `Token ${token}`;
        }
    }

    const response = await fetch(API_URL + endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify(data)
    });

    return response;
}


export async function apiGet(endpoint: string){
    const token = localStorage.getItem("token");


    const response = await fetch(API_URL + endpoint, {
        method: "GET", 
        headers: {
            "Authorization": `Token ${token}`
        }
    }); 

    return response; 
}
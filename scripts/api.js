"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_URL = void 0;
exports.apiPost = apiPost;
exports.API_URL = "http://127.0.0.1:8000";
async function apiPost(endpoint, data) {
    const response = await fetch(exports.API_URL + endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    return response;
}
//# sourceMappingURL=api.js.map
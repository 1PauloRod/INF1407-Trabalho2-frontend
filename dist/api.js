var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const API_URL = "http://127.0.0.1:8000";
export function apiPost(endpoint_1, data_1) {
    return __awaiter(this, arguments, void 0, function* (endpoint, data, useAuth = true) {
        const headers = {
            "Content-Type": "application/json"
        };
        if (useAuth) {
            const token = localStorage.getItem("token");
            if (token) {
                headers["Authorization"] = `Token ${token}`;
            }
        }
        const response = yield fetch(API_URL + endpoint, {
            method: "POST",
            headers,
            body: JSON.stringify(data)
        });
        return response;
    });
}
export function apiGet(endpoint) {
    return __awaiter(this, void 0, void 0, function* () {
        const token = localStorage.getItem("token");
        const response = yield fetch(API_URL + endpoint, {
            method: "GET",
            headers: {
                "Authorization": `Token ${token}`
            }
        });
        return response;
    });
}

import { API_BASE } from "./config";
import axios from "axios";

export function loginApi(endpoint, body) {
    return axios.post(`${API_BASE}/${endpoint}`, body);
}
export function signUpApi(endpoint, body) {
    return axios.post(`${API_BASE}/${endpoint}`, body);
}

export function sendEmailApi(endpoint, body) {
    return axios.post(`${API_BASE}/${endpoint}`, body);
}
export function forgotPasswordApi(endpoint, body) {
    return axios.put(`${API_BASE}/${endpoint}`, body);
}
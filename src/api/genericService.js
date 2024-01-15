import { API_BASE } from "./config";
import * as api from './axios';

export function getAllData(endpoint, body) {
    return api.sendGet(`${API_BASE}/${endpoint}`, body);
}
export function getDataSearch(endpoint, body) {
    return api.sendGetSearch(`${API_BASE}/${endpoint}`, body);
}
export function getDataById(endpoint, body) {
    return api.sendGet(`${API_BASE}/${endpoint}`, body);
}
export function createDataAPI(endpoint, body) {
    return api.sendPost(`${API_BASE}/${endpoint}`, body);
}
export function updateDataAPI(endpoint, body) {
    return api.sendPut(`${API_BASE}/${endpoint}`, body);
}
export function deleteDataAPI(endpoint, body) {
    return api.sendDelete(`${API_BASE}/${endpoint}`, body);
}
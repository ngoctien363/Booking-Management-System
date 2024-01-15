import { API_BASE } from "./config";
// import axios from "axios";
import * as api from './axios';

export function getHotelsAPI(endpoint, body) {
    return api.sendPost(`${API_BASE}/${endpoint}`, body);
}
export function getHasAvailableRoomsAPI(endpoint, body) {
    return api.sendPost(`${API_BASE}/${endpoint}`, body);
}
export function getHotelByIdAPI(endpoint, body) {
    return api.sendGet(`${API_BASE}/${endpoint}`, body);
}
export function createHotelsAPI(endpoint, body) {
    return api.sendPost(`${API_BASE}/${endpoint}`, body);
}
export function updateHotelsAPI(endpoint, body) {
    return api.sendPut(`${API_BASE}/${endpoint}`, body);
}
export function getByIdHotelsAPI(endpoint, body) {
    return api.sendGet(`${API_BASE}/${endpoint}`, body);
}
export function deleteHotelsAPI(endpoint, body) {
    return api.sendDelete(`${API_BASE}/${endpoint}`, body);
}
export function getRoomsByIdHotelAPI(endpoint, body) {
    return api.sendPost(`${API_BASE}/${endpoint}`, body);
}

export function paymentAPI(endpoint, body) {
    return api.sendPost(`${API_BASE}/${endpoint}`, body);
}
export function bookingHistoriesAPI(endpoint, body) {
    return api.sendGet(`${API_BASE}/${endpoint}`, body);
}
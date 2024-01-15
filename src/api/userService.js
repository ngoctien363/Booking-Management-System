import { API_BASE } from "./config";
import * as api from './axios';

export function changePasswordAPI(userId, body) {
  return api.sendPut(`${API_BASE}/auth/${userId}/password`, body);
}

export function getUserById(userId) {
  return api.sendGet(`${API_BASE}/user/${userId}`);
}

export function updateUser(userId, body) {
  return api.sendPut(`${API_BASE}/user/${userId}`, body);
}
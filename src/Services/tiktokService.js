import http from "./httpService";
import { apiUrl } from "../config.json";

export async function fetchTiktokData(params) {
  return await http.post(`${apiUrl}/tiktok`, params);
}
export async function fetchTiktokUserName(params) {
  return await http.post(`${apiUrl}/tiktok/username`, params);
}
export async function tiktokNewAcountApi(params) {
  return await http.post(`${apiUrl}/tiktok/new-asset`, params);
}

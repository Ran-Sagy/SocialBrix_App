import http from "./httpService";
import { apiUrl } from "../config.json";

export async function fetchInstagranData(params) {
  return await http.post(`${apiUrl}/instagram`, params);
}
export async function fetchInstagranUserName(params) {
  return await http.post(`${apiUrl}/instagram/username`, params);
}
export async function instagramNewAcountApi(params) {
  return await http.post(`${apiUrl}/instagram/new-asset`, params);
}

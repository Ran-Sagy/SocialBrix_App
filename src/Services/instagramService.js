import http from "./httpService";
import { PROD_SERVER_URL, DEV_SERVER_URL } from "../config.json";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? PROD_SERVER_URL
    : process.env.NODE_ENV === "development"
    ? DEV_SERVER_URL
    : DEV_SERVER_URL;

export async function fetchInstagranData(params) {
  return await http.post(`${apiUrl}/instagram`, params);
}
export async function fetchInstagranUserName(params) {
  return await http.post(`${apiUrl}/instagram/username`, params);
}
export async function instagramNewAcountApi(params) {
  return await http.post(`${apiUrl}/instagram/new-asset`, params);
}

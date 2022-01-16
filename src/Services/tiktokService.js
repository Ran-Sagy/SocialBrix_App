import http from "./httpService";
import { PROD_SERVER_URL, DEV_SERVER_URL } from "../config.json";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? PROD_SERVER_URL
    : process.env.NODE_ENV === "development"
    ? DEV_SERVER_URL
    : DEV_SERVER_URL;

export async function fetchTiktokData(params) {
  return await http.post(`${apiUrl}/tiktok`, params);
}
export async function fetchTiktokUserName(params) {
  return await http.post(`${apiUrl}/tiktok/username`, params);
}
export async function tiktokNewAcountApi(params) {
  return await http.post(`${apiUrl}/tiktok/new-asset`, params);
}

import http from "./httpService";
import { PROD_SERVER_URL, DEV_SERVER_URL } from "../config.json";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? PROD_SERVER_URL
    : process.env.NODE_ENV === "development"
    ? DEV_SERVER_URL
    : DEV_SERVER_URL;

export async function fetchTwitterData(params) {
  return await http.post(`${apiUrl}/twitter`, params);
}
export async function fetchTwitterUserName(params) {
  return await http.post(`${apiUrl}/twitter/username`, params);
}
export async function twitterNewAcountApi(params) {
  return await http.post(`${apiUrl}/twitter/new-asset`, params);
}

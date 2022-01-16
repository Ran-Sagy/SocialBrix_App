import http from "./httpService";
import { PROD_SERVER_URL, DEV_SERVER_URL } from "../config.json";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? PROD_SERVER_URL
    : process.env.NODE_ENV === "development"
    ? DEV_SERVER_URL
    : DEV_SERVER_URL;

export async function fetchYoutubeData(params) {
  return await http.post(`${apiUrl}/youtube`, params);
}
export async function fetchYoutubeChannel(params) {
  return await http.post(`${apiUrl}/youtube/channel`, params);
}
export async function addYoutubeChannel(params) {
  return await http.post(`${apiUrl}/youtube/new-asset`, params);
}

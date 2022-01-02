import http from "./httpService";
import { apiUrl } from "../config.json";

export async function fetchYoutubeData(params) {
  return await http.post(`${apiUrl}/youtube`, params);
}
export async function fetchYoutubeChannel(params) {
  return await http.post(`${apiUrl}/youtube/channel`, params);
}
export async function addYoutubeChannel(params) {
  return await http.post(`${apiUrl}/youtube/new-asset`, params);
}

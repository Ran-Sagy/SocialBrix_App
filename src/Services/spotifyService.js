import http from "./httpService";
import { apiUrl } from "../config.json";

export async function searchSpotify(query) {
  return await http.post(`${apiUrl}/spotify`, query);
}

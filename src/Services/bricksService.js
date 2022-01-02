import http from "./httpService";
import jwtDecode from "jwt-decode";
import { apiUrl } from "../config.json";
import axios from "axios";

export async function getUserBricks(userEmail) {
  return await http.post(`${apiUrl}/bricks/getUserBricks`, userEmail);
}

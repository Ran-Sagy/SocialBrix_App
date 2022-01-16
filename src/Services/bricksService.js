import http from "./httpService";
// import jwtDecode from "jwt-decode";
// import axios from "axios";
import { PROD_SERVER_URL, DEV_SERVER_URL } from "../config.json";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? PROD_SERVER_URL
    : process.env.NODE_ENV === "development"
    ? DEV_SERVER_URL
    : DEV_SERVER_URL;

export async function getUserBricks(userEmail) {
  return await http.post(`${apiUrl}/bricks/getUserBricks`, userEmail);
}

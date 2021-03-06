import http from "./httpService";
import jwtDecode from "jwt-decode";
import { PROD_SERVER_URL, DEV_SERVER_URL } from "../config.json";
import axios from "axios";

const apiUrl =
  process.env.NODE_ENV === "production"
    ? PROD_SERVER_URL
    : process.env.NODE_ENV === "development"
    ? DEV_SERVER_URL
    : DEV_SERVER_URL;

const tokenKey = "user";

export function isUserConnected() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export async function getCurrentUserDataAPI(id) {
  const { data } = await http.get(`${apiUrl}/users/${id}`);
  return data;
}

export function getJwt() {
  const tokenKey = "user";
  let token = localStorage.getItem(tokenKey);
  return `Bearer ${token}`;
}
export function getEmail() {
  let email = localStorage.getItem("whodis");
  return email;
}

export async function login(credentials) {
  axios.defaults.headers.common[
    "authorization"
  ] = `Bearer ${credentials.accessToken}`;
  const { data } = await axios.post(`${apiUrl}/auth`, credentials);
  localStorage.setItem("whodis", data.email);
  localStorage.setItem(tokenKey, data.token);
  return data;
}

export async function signup(credentials) {
  return await http.post(`${apiUrl}/users`, credentials);
}

export function logoutAndRemoveToken() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem("whodis");
}

// export async function updateProfilePic(userId, newPic) {
//   const { data } = await http.put(
//     `${apiUrl}/users/update-profile-picture/${userId}`,
//     newPic
//   );
// }

export async function getUserProfileData(userId) {
  return await http.get(`${apiUrl}/dashboard/getUserProfileData/${userId}`);
}

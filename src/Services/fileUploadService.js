import http from "./httpService";
import { apiUrl } from "../config.json";

export function uploadFileTrack(formData) {
  const headerConfig = { headers: { "Content-Type": "multipart/form-data" } };
  return http.post(
    `${apiUrl}/uploads/submissions/track`,
    formData,
    headerConfig
  );
}

export function uploadFileProfilePic(formData) {
  const headerConfig = { headers: { "Content-Type": "multipart/form-data" } };
  return http.post(`${apiUrl}/uploads/image`, formData, headerConfig);
}

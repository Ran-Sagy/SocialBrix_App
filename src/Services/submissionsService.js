import http from "./httpService";
import { apiUrl } from "../config.json";

export async function newSubmission(submissionData) {
  return await http.post(`${apiUrl}/submissions`, submissionData);
}

export async function getSubmissions(proposalId) {
  return await http.get(`${apiUrl}/submissions/${proposalId}`);
}

export async function getSingleSubmission(id) {
  return await http.get(`${apiUrl}/proposal/${id}`);
}

export async function updateScore(submissionId, score) {
  return await http.put(
    `${apiUrl}/submissions/updateScore/${submissionId}`,
    score
  );
}

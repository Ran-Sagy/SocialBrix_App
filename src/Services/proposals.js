import http from "./httpService";
import { apiUrl } from "../config.json";

export async function getProposals(cred) {
  return await http.get(`${apiUrl}/proposal?page=${cred.page}`);
}

export async function getSingleProposal(id) {
  return await http.get(`${apiUrl}/proposal/${id}`);
}

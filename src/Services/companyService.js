import http from "./httpService";
import { apiUrl } from "../config.json";

export async function createNewProposal(proposalData) {
  return await http.post(`${apiUrl}/company/createNewProposal`, proposalData);
}

export async function getCompanyCampaigns(userId) {
  return await http.get(`${apiUrl}/company/getAllCampaigns/${userId}`);
}

export async function getCompanyProfileData(companyId) {
  return await http.get(`${apiUrl}/company/getCompanyProfileData/${companyId}`);
}

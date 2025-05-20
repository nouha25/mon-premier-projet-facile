
import axios from "axios";
import { BastionDto, ActionRequest } from "../types";

// TODO: Remplacer par l'URL réelle de votre API
const API_URL = "https://votre-api-backend.com/api";

export const api = {
  // Récupérer les bastions en attente pour un utilisateur
  getPendingBastions: async (email: string): Promise<BastionDto[]> => {
    const response = await axios.get(`${API_URL}/Bastions/user/${email}/pending`);
    return response.data;
  },

  // Récupérer l'historique des bastions pour un utilisateur
  getBastionHistory: async (email: string): Promise<BastionDto[]> => {
    const response = await axios.get(`${API_URL}/Bastions/user/${email}/history`);
    return response.data;
  },

  // Récupérer les subscriptions associées à un utilisateur
  getUserSubscriptions: async (email: string): Promise<string[]> => {
    const response = await axios.get(`${API_URL}/Subscriptions/user/${email}`);
    return response.data;
  },

  // Mettre à jour le statut d'un bastion
  updateBastionStatus: async (actionRequest: ActionRequest): Promise<void> => {
    await axios.post(`${API_URL}/Bastions/action`, actionRequest);
  },
};

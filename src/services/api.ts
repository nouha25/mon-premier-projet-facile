import axios from "axios";
import { BastionDto, ActionRequest, BastionAction, Campaign, AdminStats } from "../types";
import { mockPendingBastions, mockBastionHistory, mockColleagueHistory, mockSubscriptions, 
  mockBastionActions, mockConflictingBastions, mockCampaigns, mockCompletedCampaigns } from "./mockData";
import { toast } from "@/hooks/use-toast";

// TODO: Remplacer par l'URL réelle de votre API quand elle sera disponible
const API_URL = "https://votre-api-backend.com/api";

// Flag pour basculer entre données fictives et API réelle
const USE_MOCK_DATA = true;

export const api = {
  // Vérifier si l'email existe (simulation d'authentification)
  authenticateUser: async (email: string): Promise<boolean> => {
    if (USE_MOCK_DATA) {
      // Simule un délai réseau
      await new Promise(resolve => setTimeout(resolve, 800));
      // Accepte tous les emails contenant @ pour les tests
      return email.includes("@");
    } else {
      try {
        await axios.post(`${API_URL}/auth/login`, { email });
        return true;
      } catch (error) {
        return false;
      }
    }
  },

  // Récupérer les bastions en attente pour un utilisateur
  getPendingBastions: async (email: string): Promise<BastionDto[]> => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 600));
      return mockPendingBastions;
    } else {
      const response = await axios.get(`${API_URL}/Bastions/user/${email}/pending`);
      return response.data;
    }
  },

  // Récupérer l'historique personnel des bastions pour un utilisateur
  getPersonalBastionHistory: async (email: string): Promise<BastionDto[]> => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 700));
      return mockBastionHistory.map(bastion => ({
        ...bastion,
        userEmail: email
      }));
    } else {
      const response = await axios.get(`${API_URL}/Bastions/user/${email}/personal-history`);
      return response.data;
    }
  },

  // Récupérer un bastion par son ID
  getBastionById: async (bastionId: string): Promise<BastionDto | null> => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      const allBastions = [...mockPendingBastions, ...mockBastionHistory, ...mockColleagueHistory];
      const bastion = allBastions.find(b => b.bastionId === bastionId);
      return bastion || null;
    } else {
      const response = await axios.get(`${API_URL}/Bastions/${bastionId}`);
      return response.data;
    }
  },

  // Récupérer les actions pour un bastion spécifique
  getBastionActions: async (bastionId: string): Promise<BastionAction[]> => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 600));
      return mockBastionActions.filter(action => action.bastionId === bastionId);
    } else {
      const response = await axios.get(`${API_URL}/Bastions/${bastionId}/actions`);
      return response.data;
    }
  },

  // Récupérer les subscriptions associées à un utilisateur
  getUserSubscriptions: async (email: string): Promise<string[]> => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockSubscriptions;
    } else {
      const response = await axios.get(`${API_URL}/Subscriptions/user/${email}`);
      return response.data;
    }
  },

  // Mettre à jour le statut d'un bastion
  updateBastionStatus: async (actionRequest: ActionRequest): Promise<void> => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log("Action request:", actionRequest);
      toast({
        title: "Simulation",
        description: `Action '${actionRequest.action}' simulée pour le bastion ${actionRequest.bastionId}`,
      });
    } else {
      await axios.post(`${API_URL}/Bastions/action`, actionRequest);
    }
  },

  // Recherche dans l'historique personnel des bastions
  searchPersonalHistory: async (email: string, query: string): Promise<BastionDto[]> => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 600));
      const personalHistory = mockBastionHistory.map(bastion => ({
        ...bastion,
        userEmail: email
      }));
      
      if (!query) return personalHistory;
      
      const lowerQuery = query.toLowerCase();
      return personalHistory.filter(bastion => 
        bastion.name.toLowerCase().includes(lowerQuery) || 
        bastion.bastionId.toLowerCase().includes(lowerQuery) ||
        bastion.subscription.toLowerCase().includes(lowerQuery) ||
        (bastion.ritm && bastion.ritm.toLowerCase().includes(lowerQuery))
      );
    } else {
      const response = await axios.get(`${API_URL}/Bastions/user/${email}/personal-history/search?query=${query}`);
      return response.data;
    }
  },

  // NOUVELLES FONCTIONS POUR L'ADMINISTRATION

  // Récupérer les statistiques admin
  getAdminStats: async (): Promise<AdminStats> => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Statistiques simulées basées sur les campagnes actives
      const activeCampaign = mockCampaigns.find(campaign => campaign.status === "active");
      
      if (activeCampaign) {
        return {
          pendingCount: activeCampaign.pendingBastions,
          conflictCount: activeCampaign.conflictingBastions,
          totalCount: activeCampaign.totalBastions,
          resolvedCount: activeCampaign.resolvedBastions
        };
      }
      
      // Valeurs par défaut si aucune campagne active
      return {
        pendingCount: mockPendingBastions.length,
        conflictCount: mockConflictingBastions.length,
        totalCount: mockPendingBastions.length + mockConflictingBastions.length + 17, // 17 = hypothétiques bastions déjà résolus
        resolvedCount: 17
      };
    } else {
      const response = await axios.get(`${API_URL}/Admin/stats`);
      return response.data;
    }
  },

  // Récupérer la campagne active
  getActiveCampaign: async (): Promise<Campaign> => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 600));
      const activeCampaign = mockCampaigns.find(campaign => campaign.status === "active");
      return activeCampaign || mockCampaigns[0];
    } else {
      const response = await axios.get(`${API_URL}/Admin/campaigns/active`);
      return response.data;
    }
  },

  // Récupérer toutes les campagnes
  getAllCampaigns: async (): Promise<Campaign[]> => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 700));
      return [...mockCampaigns, ...mockCompletedCampaigns];
    } else {
      const response = await axios.get(`${API_URL}/Admin/campaigns`);
      return response.data;
    }
  },

  // Récupérer les bastions en conflit
  getConflictingBastions: async (): Promise<BastionDto[]> => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 500));
      return mockConflictingBastions;
    } else {
      const response = await axios.get(`${API_URL}/Admin/bastions/conflicting`);
      return response.data;
    }
  },

  // Récupérer tous les bastions nécessitant une action admin
  getBastionsNeedingAction: async (): Promise<BastionDto[]> => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 700));
      // Combiner les bastions en attente et en conflit
      return [...mockPendingBastions, ...mockConflictingBastions];
    } else {
      const response = await axios.get(`${API_URL}/Admin/bastions/needing-action`);
      return response.data;
    }
  },

  // Prendre une décision admin sur un bastion
  takeAdminDecision: async (actionRequest: ActionRequest): Promise<void> => {
    if (USE_MOCK_DATA) {
      await new Promise(resolve => setTimeout(resolve, 1200));
      console.log("Admin decision:", actionRequest);
      toast({
        title: "Décision administrative",
        description: `Action '${actionRequest.action === "keep" ? "conserver" : "supprimer"}' appliquée au bastion ${actionRequest.bastionId}`,
      });
    } else {
      await axios.post(`${API_URL}/Admin/bastions/decision`, actionRequest);
    }
  }
};

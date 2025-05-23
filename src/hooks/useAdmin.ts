
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import { BastionDto, ActionRequest, Campaign, AdminStats } from "../types";
import { toast } from "@/hooks/use-toast";

export const useAdmin = () => {
  const queryClient = useQueryClient();
  const [selectedBastionId, setSelectedBastionId] = useState<string | null>(null);
  const [ritmNumber, setRitmNumber] = useState("");

  // Requête pour récupérer les statistiques admin
  const adminStatsQuery = useQuery({
    queryKey: ["adminStats"],
    queryFn: () => api.getAdminStats()
  });

  // Requête pour récupérer la campagne active
  const activeCampaignQuery = useQuery({
    queryKey: ["activeCampaign"],
    queryFn: () => api.getActiveCampaign()
  });

  // Requête pour récupérer toutes les campagnes
  const allCampaignsQuery = useQuery({
    queryKey: ["allCampaigns"],
    queryFn: () => api.getAllCampaigns()
  });

  // Requête pour récupérer les bastions en conflit
  const conflictingBastionsQuery = useQuery({
    queryKey: ["conflictingBastions"],
    queryFn: () => api.getConflictingBastions()
  });

  // Requête pour récupérer les bastions nécessitant une action
  const bastionsNeedingActionQuery = useQuery({
    queryKey: ["bastionsNeedingAction"],
    queryFn: () => api.getBastionsNeedingAction()
  });

  // Mutation pour prendre une décision administrative
  const adminDecisionMutation = useMutation({
    mutationFn: (actionRequest: ActionRequest) => api.takeAdminDecision(actionRequest),
    onSuccess: () => {
      // Réinitialiser l'état et rafraîchir les données
      setSelectedBastionId(null);
      setRitmNumber("");
      
      // Invalider les requêtes pour forcer un rechargement des données
      queryClient.invalidateQueries({ queryKey: ["adminStats"] });
      queryClient.invalidateQueries({ queryKey: ["activeCampaign"] });
      queryClient.invalidateQueries({ queryKey: ["conflictingBastions"] });
      queryClient.invalidateQueries({ queryKey: ["bastionsNeedingAction"] });
      
      toast({
        title: "Décision appliquée",
        description: "Le statut du bastion a été mis à jour avec succès.",
      });
    },
    onError: (error) => {
      console.error("Erreur lors de la prise de décision :", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du bastion.",
        variant: "destructive",
      });
    },
  });

  const handleAdminKeep = (bastion: BastionDto, userEmail: string) => {
    if (!ritmNumber.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un numéro RITM valide.",
        variant: "destructive",
      });
      return;
    }

    const actionRequest: ActionRequest = {
      bastionId: bastion.bastionId,
      action: "keep",
      ritm: ritmNumber.trim(),
      userEmail: userEmail,
      isAdmin: true
    };

    adminDecisionMutation.mutate(actionRequest);
  };

  const handleAdminDelete = (bastion: BastionDto, userEmail: string) => {
    const actionRequest: ActionRequest = {
      bastionId: bastion.bastionId,
      action: "delete",
      userEmail: userEmail,
      isAdmin: true
    };

    adminDecisionMutation.mutate(actionRequest);
  };

  return {
    // Données
    adminStats: adminStatsQuery.data,
    activeCampaign: activeCampaignQuery.data,
    allCampaigns: allCampaignsQuery.data || [],
    conflictingBastions: conflictingBastionsQuery.data || [],
    bastionsNeedingAction: bastionsNeedingActionQuery.data || [],
    
    // États
    isLoading: adminStatsQuery.isLoading || activeCampaignQuery.isLoading || 
               conflictingBastionsQuery.isLoading || bastionsNeedingActionQuery.isLoading,
    isError: adminStatsQuery.isError || activeCampaignQuery.isError || 
             conflictingBastionsQuery.isError || bastionsNeedingActionQuery.isError,
    isUpdating: adminDecisionMutation.isPending,
    
    // Valeurs d'état local
    selectedBastionId,
    setSelectedBastionId,
    ritmNumber,
    setRitmNumber,
    
    // Actions
    handleAdminKeep,
    handleAdminDelete
  };
};


import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../services/api";
import { BastionDto, ActionRequest } from "../types";
import { toast } from "@/hooks/use-toast";

export const useBastions = (email: string | null) => {
  const queryClient = useQueryClient();
  const [selectedBastion, setSelectedBastion] = useState<BastionDto | null>(null);
  const [ritmNumber, setRitmNumber] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Requête pour récupérer les bastions en attente
  const pendingBastionsQuery = useQuery({
    queryKey: ["pendingBastions", email],
    queryFn: () => (email ? api.getPendingBastions(email) : Promise.resolve([])),
    enabled: !!email,
  });

  // Requête pour récupérer l'historique personnel des bastions
  const personalHistoryQuery = useQuery({
    queryKey: ["personalHistory", email, searchQuery],
    queryFn: () => (email ? api.searchPersonalHistory(email, searchQuery) : Promise.resolve([])),
    enabled: !!email,
  });

  // Mutation pour mettre à jour le statut d'un bastion
  const updateBastionMutation = useMutation({
    mutationFn: (actionRequest: ActionRequest) => api.updateBastionStatus(actionRequest),
    onSuccess: () => {
      // Réinitialiser l'état et rafraîchir les données
      setSelectedBastion(null);
      setRitmNumber("");
      queryClient.invalidateQueries({ queryKey: ["pendingBastions"] });
      queryClient.invalidateQueries({ queryKey: ["personalHistory"] });
      toast({
        title: "Action réalisée avec succès",
        description: "Le statut du bastion a été mis à jour.",
      });
    },
    onError: (error) => {
      console.error("Erreur lors de la mise à jour du bastion :", error);
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la mise à jour du bastion.",
        variant: "destructive",
      });
    },
  });

  const handleKeepAction = (bastion: BastionDto) => {
    if (!email || !ritmNumber.trim()) {
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
      userEmail: email,
    };

    updateBastionMutation.mutate(actionRequest);
  };

  const handleDeleteAction = (bastion: BastionDto) => {
    if (!email) return;

    const actionRequest: ActionRequest = {
      bastionId: bastion.bastionId,
      action: "delete",
      userEmail: email,
    };

    updateBastionMutation.mutate(actionRequest);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  return {
    pendingBastions: pendingBastionsQuery.data || [],
    personalHistory: personalHistoryQuery.data || [],
    isLoading: pendingBastionsQuery.isLoading || personalHistoryQuery.isLoading,
    isError: pendingBastionsQuery.isError || personalHistoryQuery.isError,
    selectedBastion,
    setSelectedBastion,
    ritmNumber,
    setRitmNumber,
    handleKeepAction,
    handleDeleteAction,
    isUpdating: updateBastionMutation.isPending,
    handleSearch,
  };
};

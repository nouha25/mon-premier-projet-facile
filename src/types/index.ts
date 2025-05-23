
export interface BastionDto {
  bastionId: string;
  name: string;
  subscription: string;
  status: string;
  platform?: "Azure" | "AWS" | "GCP";
  ritm?: string;
  userEmail?: string;
  actionDate?: string;
  campaignId?: string; // Ajout pour regrouper les bastions par campagne
}

export interface ContactDto {
  userEmail: string;
  subscriptionId: string;
}

export interface ActionRequest {
  bastionId: string;
  action: "keep" | "delete";
  ritm?: string;
  userEmail: string;
  isAdmin?: boolean; // Pour identifier les actions admin
}

export interface User {
  email: string;
  name: string;
  role?: string;
  avatar?: string;
  isAdmin?: boolean; // Ajout d'un flag admin
}

export interface BastionAction {
  actionId: string;
  bastionId: string;
  action: "keep" | "delete";
  ritm?: string;
  userEmail: string;
  userName?: string;
  actionDate: string;
  isAdmin?: boolean; // Pour distinguer les actions admin
}

export interface Campaign {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  status: "active" | "completed" | "planned";
  totalBastions: number;
  pendingBastions: number;
  conflictingBastions: number;
  resolvedBastions: number;
}

// Ajout des états possibles pour un bastion
export type BastionStatus = "Pending" | "Keep" | "Delete" | "Conflict" | "AdminKeep" | "AdminDelete";

// Interface pour les statistiques administrateur
export interface AdminStats {
  pendingCount: number;
  conflictCount: number;
  totalCount: number;
  resolvedCount: number;
}

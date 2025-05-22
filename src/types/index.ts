
export interface BastionDto {
  bastionId: string;
  name: string;
  subscription: string;
  status: string;
  platform?: "Azure" | "AWS" | "GCP"; // Ajout pour identifier la plateforme
  ritm?: string; // Pour stocker le numéro RITM si "keep" est choisi
  userEmail?: string; // Pour identifier qui a effectué l'action
  actionDate?: string; // Date de l'action
}

export interface ContactDto {
  userEmail: string;
  subscriptionId: string;
}

export interface ActionRequest {
  bastionId: string;
  action: "keep" | "delete";
  ritm?: string; // Obligatoire si action = "keep"
  userEmail: string; // Pour associer l'action à un utilisateur
}

export interface User {
  email: string;
  name: string;
  role?: string;
  avatar?: string;
}

// Nouvelle interface pour le suivi des actions sur un bastion
export interface BastionAction {
  actionId: string;
  bastionId: string;
  action: "keep" | "delete";
  ritm?: string;
  userEmail: string;
  userName?: string;
  actionDate: string;
}

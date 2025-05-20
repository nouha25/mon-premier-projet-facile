
export interface BastionDto {
  bastionId: string;
  name: string;
  subscription: string;
  status: string;
  ritm?: string; // Pour stocker le numéro RITM si "keep" est choisi
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

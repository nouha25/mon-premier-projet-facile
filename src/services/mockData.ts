
import { BastionDto, ActionRequest } from "../types";

// Utilisateurs fictifs
export const mockUsers = [
  { email: "alice@example.com", name: "Alice Martin" },
  { email: "bob@example.com", name: "Bob Dupont" },
  { email: "charlie@example.com", name: "Charlie Durand" },
];

// Bastions en attente
export const mockPendingBastions: BastionDto[] = [
  { 
    bastionId: "bastion-001", 
    name: "Bastion-Production-EU", 
    subscription: "Azure-Prod-EU-West", 
    status: "Pending" 
  },
  { 
    bastionId: "bastion-002", 
    name: "Bastion-Dev-EU", 
    subscription: "Azure-Dev-EU-West", 
    status: "Pending" 
  },
  { 
    bastionId: "bastion-003", 
    name: "Bastion-Test-EU", 
    subscription: "Azure-Test-EU-West", 
    status: "Pending" 
  },
];

// Historique des actions
export const mockBastionHistory: BastionDto[] = [
  { 
    bastionId: "bastion-004", 
    name: "Bastion-Prod-US", 
    subscription: "Azure-Prod-US-East", 
    status: "Keep",
    ritm: "RITM000123" 
  },
  { 
    bastionId: "bastion-005", 
    name: "Bastion-Dev-US", 
    subscription: "Azure-Dev-US-East", 
    status: "Delete" 
  },
  { 
    bastionId: "bastion-006", 
    name: "Bastion-Prod-Asia", 
    subscription: "Azure-Prod-Asia", 
    status: "Keep",
    ritm: "RITM000124" 
  },
  { 
    bastionId: "bastion-007", 
    name: "Bastion-Archive", 
    subscription: "Azure-Archive", 
    status: "Delete" 
  },
  { 
    bastionId: "bastion-008", 
    name: "Bastion-Temp", 
    subscription: "Azure-Temp", 
    status: "Keep",
    ritm: "RITM000125" 
  },
  { 
    bastionId: "bastion-009", 
    name: "Bastion-Finance", 
    subscription: "Azure-Finance", 
    status: "Delete" 
  },
  { 
    bastionId: "bastion-010", 
    name: "Bastion-HR", 
    subscription: "Azure-HR", 
    status: "Keep",
    ritm: "RITM000126" 
  },
];

// Actions collègues
export const mockColleagueHistory: BastionDto[] = [
  { 
    bastionId: "bastion-011", 
    name: "Bastion-Marketing", 
    subscription: "Azure-Marketing", 
    status: "Keep",
    ritm: "RITM000127",
    userEmail: "bob@example.com" 
  },
  { 
    bastionId: "bastion-012", 
    name: "Bastion-Sales", 
    subscription: "Azure-Sales", 
    status: "Delete",
    userEmail: "charlie@example.com"  
  },
];

// Souscriptions
export const mockSubscriptions = [
  "Azure-Prod-EU-West",
  "Azure-Dev-EU-West",
  "Azure-Test-EU-West",
  "Azure-Prod-US-East",
  "Azure-Dev-US-East",
  "Azure-Prod-Asia",
  "Azure-Archive",
  "Azure-Temp",
  "Azure-Finance",
  "Azure-HR",
  "Azure-Marketing",
  "Azure-Sales"
];

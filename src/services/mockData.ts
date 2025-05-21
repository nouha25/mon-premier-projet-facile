
import { BastionDto, ActionRequest, BastionAction } from "../types";

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
    ritm: "RITM000123",
    actionDate: "2025-05-15T10:30:00Z"
  },
  { 
    bastionId: "bastion-005", 
    name: "Bastion-Dev-US", 
    subscription: "Azure-Dev-US-East", 
    status: "Delete",
    actionDate: "2025-05-14T14:20:00Z"
  },
  { 
    bastionId: "bastion-006", 
    name: "Bastion-Prod-Asia", 
    subscription: "Azure-Prod-Asia", 
    status: "Keep",
    ritm: "RITM000124",
    actionDate: "2025-05-12T09:15:00Z"
  },
  { 
    bastionId: "bastion-007", 
    name: "Bastion-Archive", 
    subscription: "Azure-Archive", 
    status: "Delete",
    actionDate: "2025-05-10T16:45:00Z"
  },
  { 
    bastionId: "bastion-008", 
    name: "Bastion-Temp", 
    subscription: "Azure-Temp", 
    status: "Keep",
    ritm: "RITM000125",
    actionDate: "2025-05-08T11:30:00Z"
  },
  { 
    bastionId: "bastion-009", 
    name: "Bastion-Finance", 
    subscription: "Azure-Finance", 
    status: "Delete",
    actionDate: "2025-05-05T13:20:00Z"
  },
  { 
    bastionId: "bastion-010", 
    name: "Bastion-HR", 
    subscription: "Azure-HR", 
    status: "Keep",
    ritm: "RITM000126",
    actionDate: "2025-05-03T10:10:00Z"
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
    userEmail: "bob@example.com",
    actionDate: "2025-05-18T14:30:00Z"
  },
  { 
    bastionId: "bastion-012", 
    name: "Bastion-Sales", 
    subscription: "Azure-Sales", 
    status: "Delete",
    userEmail: "charlie@example.com",
    actionDate: "2025-05-17T09:45:00Z"
  },
];

// Actions détaillées pour les bastions (pour le suivi)
export const mockBastionActions: BastionAction[] = [
  {
    actionId: "action-001",
    bastionId: "bastion-004",
    action: "keep",
    ritm: "RITM000123",
    userEmail: "alice@example.com",
    userName: "Alice Martin",
    actionDate: "2025-05-15T10:30:00Z"
  },
  {
    actionId: "action-002",
    bastionId: "bastion-005",
    action: "delete",
    userEmail: "alice@example.com",
    userName: "Alice Martin",
    actionDate: "2025-05-14T14:20:00Z"
  },
  {
    actionId: "action-003",
    bastionId: "bastion-006",
    action: "keep",
    ritm: "RITM000124",
    userEmail: "alice@example.com",
    userName: "Alice Martin",
    actionDate: "2025-05-12T09:15:00Z"
  },
  {
    actionId: "action-004",
    bastionId: "bastion-011",
    action: "keep",
    ritm: "RITM000127",
    userEmail: "bob@example.com",
    userName: "Bob Dupont",
    actionDate: "2025-05-18T14:30:00Z"
  },
  {
    actionId: "action-005",
    bastionId: "bastion-012",
    action: "delete",
    userEmail: "charlie@example.com",
    userName: "Charlie Durand",
    actionDate: "2025-05-17T09:45:00Z"
  },
  // Actions multiples sur le même bastion pour démontrer le suivi
  {
    actionId: "action-006",
    bastionId: "bastion-010",
    action: "keep",
    ritm: "RITM000126",
    userEmail: "alice@example.com",
    userName: "Alice Martin",
    actionDate: "2025-05-03T10:10:00Z"
  },
  {
    actionId: "action-007",
    bastionId: "bastion-010",
    action: "keep",
    ritm: "RITM000128",
    userEmail: "bob@example.com",
    userName: "Bob Dupont",
    actionDate: "2025-04-28T11:20:00Z"
  }
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

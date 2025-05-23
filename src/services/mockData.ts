import { BastionDto, ActionRequest, BastionAction, Campaign, User } from "../types";

// Utilisateurs fictifs avec rôles
export const mockUsers: User[] = [
  { 
    email: "sophie.martin@entreprise.com", 
    name: "Sophie Martin", 
    role: "Administrateur Cloud", 
    avatar: "https://i.pravatar.cc/150?img=32",
    isAdmin: true
  },
  { 
    email: "thomas.dubois@entreprise.com", 
    name: "Thomas Dubois", 
    role: "Développeur DevOps", 
    avatar: "https://i.pravatar.cc/150?img=53" 
  },
  { 
    email: "emma.bernard@entreprise.com", 
    name: "Emma Bernard", 
    role: "Architecte Cloud", 
    avatar: "https://i.pravatar.cc/150?img=47" 
  },
  { 
    email: "lucas.petit@entreprise.com", 
    name: "Lucas Petit", 
    role: "Ingénieur Sécurité", 
    avatar: "https://i.pravatar.cc/150?img=58" 
  },
  { 
    email: "chloe.rousseau@entreprise.com", 
    name: "Chloé Rousseau", 
    role: "Chef de Projet Cloud", 
    avatar: "https://i.pravatar.cc/150?img=29" 
  }
];

// Campagnes fictives
export const mockCampaigns: Campaign[] = [
  {
    id: "campaign-2025-05",
    name: "Revue des ressources Azure - Mai 2025",
    startDate: "2025-05-01T00:00:00Z",
    endDate: "2025-05-31T23:59:59Z",
    status: "active",
    totalBastions: 24,
    pendingBastions: 5,
    conflictingBastions: 2,
    resolvedBastions: 17
  },
  {
    id: "campaign-2025-04",
    name: "Revue des ressources Azure - Avril 2025",
    startDate: "2025-04-01T00:00:00Z",
    endDate: "2025-04-30T23:59:59Z",
    status: "completed",
    totalBastions: 20,
    pendingBastions: 0,
    conflictingBastions: 0,
    resolvedBastions: 20
  },
  {
    id: "campaign-2025-06",
    name: "Revue des ressources Azure - Juin 2025",
    startDate: "2025-06-01T00:00:00Z",
    endDate: "2025-06-30T23:59:59Z",
    status: "planned",
    totalBastions: 18,
    pendingBastions: 18,
    conflictingBastions: 0,
    resolvedBastions: 0
  }
];

// Bastions Azure en attente
export const mockPendingBastions: BastionDto[] = [
  { 
    bastionId: "bastion-001", 
    name: "Azure-Bastion-Production-EU", 
    subscription: "Azure-Prod-EU-West", 
    status: "Pending",
    platform: "Azure",
    campaignId: "campaign-2025-05"
  },
  { 
    bastionId: "bastion-002", 
    name: "Azure-Bastion-Dev-EU", 
    subscription: "Azure-Dev-EU-West", 
    status: "Pending",
    platform: "Azure",
    campaignId: "campaign-2025-05"
  },
  { 
    bastionId: "bastion-003", 
    name: "Azure-Bastion-Test-US", 
    subscription: "Azure-Test-US-East", 
    status: "Pending",
    platform: "Azure",
    campaignId: "campaign-2025-05"
  },
  { 
    bastionId: "bastion-004", 
    name: "Azure-Bastion-Prod-US", 
    subscription: "Azure-Prod-US", 
    status: "Pending",
    platform: "Azure",
    campaignId: "campaign-2025-05"
  },
  { 
    bastionId: "bastion-005", 
    name: "Azure-Bastion-Dev-Asia", 
    subscription: "Azure-Dev-Asia", 
    status: "Pending",
    platform: "Azure",
    campaignId: "campaign-2025-05"
  },
];

// Bastions Azure en conflit (opinions divergentes des utilisateurs)
export const mockConflictingBastions: BastionDto[] = [
  { 
    bastionId: "conflict-001", 
    name: "Azure-Bastion-Finance", 
    subscription: "Azure-Finance", 
    status: "Conflict",
    platform: "Azure",
    campaignId: "campaign-2025-05"
  },
  { 
    bastionId: "conflict-002", 
    name: "Azure-Bastion-Analytics", 
    subscription: "Azure-Analytics", 
    status: "Conflict",
    platform: "Azure",
    campaignId: "campaign-2025-05"
  },
];

// Mise à jour de l'historique des bastions (uniquement Azure)
export const mockBastionHistory: BastionDto[] = [
  { 
    bastionId: "bastion-006", 
    name: "Azure-Bastion-Prod-US", 
    subscription: "Azure-Prod-US-East", 
    status: "Keep",
    platform: "Azure",
    ritm: "RITM000123",
    actionDate: "2025-05-15T10:30:00Z",
    campaignId: "campaign-2025-05"
  },
  { 
    bastionId: "bastion-007", 
    name: "Azure-Bastion-Dev-US", 
    subscription: "Azure-Dev-US-East", 
    status: "Delete",
    platform: "Azure",
    actionDate: "2025-05-14T14:20:00Z"
  },
  { 
    bastionId: "bastion-008", 
    name: "Azure-Bastion-Prod-Asia", 
    subscription: "Azure-Prod-Asia", 
    status: "Keep",
    platform: "Azure",
    ritm: "RITM000124",
    actionDate: "2025-05-12T09:15:00Z"
  },
  { 
    bastionId: "bastion-009", 
    name: "Azure-Bastion-Archive", 
    subscription: "Azure-Archive", 
    status: "Delete",
    platform: "Azure",
    actionDate: "2025-05-10T16:45:00Z"
  },
  { 
    bastionId: "bastion-010", 
    name: "Azure-Bastion-Temp", 
    subscription: "Azure-Temp", 
    status: "Keep",
    platform: "Azure",
    ritm: "RITM000125",
    actionDate: "2025-05-08T11:30:00Z"
  },
  { 
    bastionId: "bastion-011", 
    name: "Azure-Bastion-Finance", 
    subscription: "Azure-Finance", 
    status: "Delete",
    platform: "Azure",
    actionDate: "2025-05-05T13:20:00Z"
  },
  { 
    bastionId: "bastion-012", 
    name: "Azure-Bastion-HR", 
    subscription: "Azure-HR", 
    status: "Keep",
    platform: "Azure",
    ritm: "RITM000126",
    actionDate: "2025-05-03T10:10:00Z"
  },
];

// Actions collègues (uniquement Azure)
export const mockColleagueHistory: BastionDto[] = [
  { 
    bastionId: "bastion-013", 
    name: "Azure-Bastion-Marketing", 
    subscription: "Azure-Marketing", 
    status: "Keep",
    platform: "Azure",
    ritm: "RITM000127",
    userEmail: "bob@example.com",
    actionDate: "2025-05-18T14:30:00Z"
  },
  { 
    bastionId: "bastion-014", 
    name: "Azure-Bastion-Sales", 
    subscription: "Azure-Sales", 
    status: "Delete",
    platform: "Azure",
    userEmail: "charlie@example.com",
    actionDate: "2025-05-17T09:45:00Z"
  },
];

// Actions détaillées pour les bastions (pour le suivi)
export const mockBastionActions: BastionAction[] = [
  // Actions pour bastion en conflit
  {
    actionId: "action-101",
    bastionId: "conflict-001",
    action: "keep",
    ritm: "RITM000130",
    userEmail: "thomas.dubois@entreprise.com",
    userName: "Thomas Dubois",
    actionDate: "2025-05-16T11:30:00Z"
  },
  {
    actionId: "action-102",
    bastionId: "conflict-001",
    action: "delete",
    userEmail: "emma.bernard@entreprise.com",
    userName: "Emma Bernard",
    actionDate: "2025-05-16T14:45:00Z"
  },
  {
    actionId: "action-103",
    bastionId: "conflict-002",
    action: "keep",
    ritm: "RITM000131",
    userEmail: "lucas.petit@entreprise.com",
    userName: "Lucas Petit",
    actionDate: "2025-05-17T09:20:00Z"
  },
  {
    actionId: "action-104",
    bastionId: "conflict-002",
    action: "delete",
    userEmail: "chloe.rousseau@entreprise.com",
    userName: "Chloé Rousseau",
    actionDate: "2025-05-17T10:15:00Z"
  },
  // Actions pour bastions en attente
  {
    actionId: "action-201",
    bastionId: "bastion-001",
    action: "keep",
    ritm: "RITM000140",
    userEmail: "thomas.dubois@entreprise.com",
    userName: "Thomas Dubois",
    actionDate: "2025-05-20T09:30:00Z"
  },
  {
    actionId: "action-202",
    bastionId: "bastion-002",
    action: "delete",
    userEmail: "emma.bernard@entreprise.com",
    userName: "Emma Bernard",
    actionDate: "2025-05-20T11:45:00Z"
  },
  // Actions historiques
  {
    actionId: "action-301",
    bastionId: "bastion-006",
    action: "keep",
    ritm: "RITM000123",
    userEmail: "lucas.petit@entreprise.com",
    userName: "Lucas Petit",
    actionDate: "2025-05-15T10:30:00Z"
  },
  {
    actionId: "action-302",
    bastionId: "bastion-007",
    action: "delete",
    userEmail: "chloe.rousseau@entreprise.com",
    userName: "Chloé Rousseau",
    actionDate: "2025-05-14T14:20:00Z"
  }
];

// Historique des campagnes terminées
export const mockCompletedCampaigns: Campaign[] = [
  {
    id: "campaign-2025-03",
    name: "Revue des ressources Azure - Mars 2025",
    startDate: "2025-03-01T00:00:00Z",
    endDate: "2025-03-31T23:59:59Z",
    status: "completed",
    totalBastions: 22,
    pendingBastions: 0,
    conflictingBastions: 0,
    resolvedBastions: 22
  },
  {
    id: "campaign-2025-02",
    name: "Revue des ressources Azure - Février 2025",
    startDate: "2025-02-01T00:00:00Z",
    endDate: "2025-02-28T23:59:59Z",
    status: "completed",
    totalBastions: 19,
    pendingBastions: 0,
    conflictingBastions: 0,
    resolvedBastions: 19
  }
];

// Souscriptions Azure uniquement
export const mockSubscriptions = [
  "Azure-Prod-EU-West",
  "Azure-Dev-EU-West",
  "Azure-Test-EU-West",
  "Azure-Prod-US-East",
  "Azure-Dev-US-East",
  "Azure-Prod-Asia",
  "Azure-Dev-Asia",
  "Azure-Test-Asia",
  "Azure-Finance",
  "Azure-HR",
  "Azure-Marketing",
  "Azure-Sales",
  "Azure-Analytics",
  "Azure-Archive",
  "Azure-Temp"
];

// Utilisateurs Microsoft AD fictifs
export const mockMicrosoftUsers = [
  {
    email: "sophie.martin@entreprise.com",
    name: "Sophie Martin",
    role: "Administrateur Cloud",
    avatar: "https://i.pravatar.cc/150?img=32",
    isAdmin: true
  },
  {
    email: "thomas.dubois@entreprise.com",
    name: "Thomas Dubois",
    role: "Développeur DevOps",
    avatar: "https://i.pravatar.cc/150?img=53"
  },
  {
    email: "emma.bernard@entreprise.com",
    name: "Emma Bernard",
    role: "Architecte Cloud",
    avatar: "https://i.pravatar.cc/150?img=47"
  },
  {
    email: "lucas.petit@entreprise.com",
    name: "Lucas Petit",
    role: "Ingénieur Sécurité",
    avatar: "https://i.pravatar.cc/150?img=58"
  },
  {
    email: "chloe.rousseau@entreprise.com",
    name: "Chloé Rousseau",
    role: "Chef de Projet Cloud",
    avatar: "https://i.pravatar.cc/150?img=29"
  }
];

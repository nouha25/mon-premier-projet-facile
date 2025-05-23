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
    name: "Revue des ressources - Mai 2025",
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
    name: "Revue des ressources - Avril 2025",
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
    name: "Revue des ressources - Juin 2025",
    startDate: "2025-06-01T00:00:00Z",
    endDate: "2025-06-30T23:59:59Z",
    status: "planned",
    totalBastions: 18,
    pendingBastions: 18,
    conflictingBastions: 0,
    resolvedBastions: 0
  }
];

// Mise à jour des données fictives pour inclure des ressources de différentes plateformes et campagnes
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
    bastionId: "instance-003", 
    name: "AWS-EC2-Test-US", 
    subscription: "AWS-Test-US-East", 
    status: "Pending",
    platform: "AWS",
    campaignId: "campaign-2025-05"
  },
  { 
    bastionId: "vm-004", 
    name: "GCP-VM-Prod-US", 
    subscription: "GCP-Prod-US", 
    status: "Pending",
    platform: "GCP", 
    campaignId: "campaign-2025-05"
  },
  { 
    bastionId: "instance-005", 
    name: "AWS-EC2-Dev-US", 
    subscription: "AWS-Dev-US", 
    status: "Pending",
    platform: "AWS",
    campaignId: "campaign-2025-05"
  },
];

// Bastions en conflit (opinions divergentes des utilisateurs)
export const mockConflictingBastions: BastionDto[] = [
  { 
    bastionId: "conflict-001", 
    name: "Azure-VM-Finance", 
    subscription: "Azure-Finance", 
    status: "Conflict",
    platform: "Azure",
    campaignId: "campaign-2025-05"
  },
  { 
    bastionId: "conflict-002", 
    name: "AWS-RDS-Analytics", 
    subscription: "AWS-Analytics", 
    status: "Conflict",
    platform: "AWS",
    campaignId: "campaign-2025-05"
  },
];

// Mise à jour de l'historique des bastions
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
    bastionId: "instance-007", 
    name: "AWS-EC2-Dev-US", 
    subscription: "AWS-Dev-US-East", 
    status: "Delete",
    platform: "AWS",
    actionDate: "2025-05-14T14:20:00Z"
  },
  { 
    bastionId: "vm-008", 
    name: "GCP-VM-Prod-Asia", 
    subscription: "GCP-Prod-Asia", 
    status: "Keep",
    platform: "GCP",
    ritm: "RITM000124",
    actionDate: "2025-05-12T09:15:00Z"
  },
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
  },
  // Ajout d'actions conflictuelles
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
  // Actions admin pour résolution de conflits
  {
    actionId: "action-201",
    bastionId: "resolved-conflict-001",
    action: "keep",
    ritm: "RITM000140",
    userEmail: "sophie.martin@entreprise.com",
    userName: "Sophie Martin",
    actionDate: "2025-04-22T15:30:00Z",
    isAdmin: true
  },
  {
    actionId: "action-202",
    bastionId: "resolved-conflict-002",
    action: "delete",
    userEmail: "sophie.martin@entreprise.com",
    userName: "Sophie Martin",
    actionDate: "2025-04-23T11:45:00Z",
    isAdmin: true
  }
];

// Historique des campagnes terminées
export const mockCompletedCampaigns: Campaign[] = [
  {
    id: "campaign-2025-03",
    name: "Revue des ressources - Mars 2025",
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
    name: "Revue des ressources - Février 2025",
    startDate: "2025-02-01T00:00:00Z",
    endDate: "2025-02-28T23:59:59Z",
    status: "completed",
    totalBastions: 19,
    pendingBastions: 0,
    conflictingBastions: 0,
    resolvedBastions: 19
  }
];

// Souscriptions
export const mockSubscriptions = [
  // Azure subscriptions
  "Azure-Prod-EU-West",
  "Azure-Dev-EU-West",
  "Azure-Test-EU-West",
  "Azure-Prod-US-East",
  "Azure-Dev-US-East",
  "Azure-Prod-Asia",
  // AWS subscriptions
  "AWS-Prod-EU",
  "AWS-Dev-EU",
  "AWS-Test-EU",
  "AWS-Prod-US-East",
  "AWS-Dev-US",
  "AWS-Prod-Asia",
  // GCP subscriptions
  "GCP-Prod-EU",
  "GCP-Dev-EU",
  "GCP-Test-EU",
  "GCP-Prod-US",
  "GCP-Dev-US",
  "GCP-Prod-Asia",
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


import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api } from "../services/api";
import DashboardHeader from "@/components/DashboardHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, CalendarIcon, FilterIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Campaign, User } from "@/types";
import { mockMicrosoftUsers } from "@/services/mockData";

const AdminCampaigns = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const navigate = useNavigate();
  
  // Simuler un administrateur connecté
  const [admin] = useState<User>(mockMicrosoftUsers.find(user => user.isAdmin) || mockMicrosoftUsers[0]);

  // Requête pour récupérer toutes les campagnes
  const { data: campaigns = [], isLoading } = useQuery({
    queryKey: ["allCampaigns"],
    queryFn: () => api.getAllCampaigns(),
  });

  // Filtrer les campagnes par statut et recherche
  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || campaign.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Naviguer vers la page d'accueil
  const goBack = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader user={admin} onLogout={() => navigate('/')} />
      <main className="container py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Button variant="ghost" onClick={goBack} className="mr-2">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour
            </Button>
            <h1 className="text-2xl font-bold">Gestion des Campagnes</h1>
          </div>
          <Button>Nouvelle campagne</Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste des campagnes</CardTitle>
            <CardDescription>
              Gérez et suivez toutes les campagnes de revue des ressources
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 w-full max-w-sm">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Rechercher une campagne..."
                    className="pl-8 w-full"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Select 
                  value={statusFilter} 
                  onValueChange={setStatusFilter}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filtrer par statut" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tous les statuts</SelectItem>
                    <SelectItem value="active">En cours</SelectItem>
                    <SelectItem value="completed">Terminées</SelectItem>
                    <SelectItem value="planned">Planifiées</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {isLoading ? (
              <div className="flex justify-center items-center py-8">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom de la campagne</TableHead>
                      <TableHead>Période</TableHead>
                      <TableHead>Ressources</TableHead>
                      <TableHead>Statut</TableHead>
                      <TableHead>Progression</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCampaigns.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center py-4">
                          Aucune campagne trouvée
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredCampaigns.map((campaign) => (
                        <TableRow key={campaign.id}>
                          <TableCell className="font-medium">
                            {campaign.name}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <CalendarIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                              <span>
                                {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {campaign.totalBastions} ressources
                          </TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                campaign.status === "completed" ? "bg-green-100 text-green-800" :
                                campaign.status === "active" ? "bg-blue-100 text-blue-800" :
                                "bg-slate-100 text-slate-800"
                              }
                            >
                              {campaign.status === "completed" ? "Terminée" : 
                               campaign.status === "active" ? "En cours" : 
                               "Planifiée"}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <div className="w-full bg-gray-200 rounded-full h-2 mr-2 dark:bg-gray-700">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ 
                                    width: `${(campaign.resolvedBastions / campaign.totalBastions) * 100}%` 
                                  }}
                                ></div>
                              </div>
                              <span className="text-xs whitespace-nowrap">
                                {Math.round((campaign.resolvedBastions / campaign.totalBastions) * 100)}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                Détails
                              </Button>
                              <Button variant="ghost" size="sm">
                                Rapport
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminCampaigns;

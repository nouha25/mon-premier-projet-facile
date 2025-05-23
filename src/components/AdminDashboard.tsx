
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Campaign, BastionDto, AdminStats } from "@/types";
import { ArrowRight, Check, AlertCircle, Clock, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface AdminDashboardProps {
  stats: AdminStats;
  activeCampaign: Campaign;
  recentCampaigns: Campaign[];
  bastionsWithIssues: BastionDto[];
  conflictingBastions: BastionDto[];
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({
  stats,
  activeCampaign,
  recentCampaigns,
  bastionsWithIssues,
  conflictingBastions,
}) => {
  const navigate = useNavigate();

  // Données pour le graphique
  const chartData = [
    {
      name: "En attente",
      valeur: stats.pendingCount,
      fill: "#f59e0b",
    },
    {
      name: "Conflits",
      valeur: stats.conflictCount,
      fill: "#ef4444",
    },
    {
      name: "Résolus",
      valeur: stats.resolvedCount,
      fill: "#10b981",
    },
  ];

  // Fonction pour rediriger vers le détail d'un bastion
  const goToBastionDetail = (bastionId: string) => {
    navigate(`/bastion/${bastionId}`);
  };

  // Fonction pour rediriger vers la page de liste
  const goToCampaignList = () => {
    navigate("/admin/campaigns");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Bastions en attente
            </CardTitle>
            <CardDescription className="text-3xl font-bold">
              {stats.pendingCount}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {stats.pendingCount > 0
                ? `${Math.round((stats.pendingCount / stats.totalCount) * 100)}% des bastions`
                : "Tous les bastions ont été traités"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Conflits à résoudre
            </CardTitle>
            <CardDescription className="text-3xl font-bold">
              {stats.conflictCount}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {stats.conflictCount > 0
                ? `Action requise pour ${stats.conflictCount} ressources`
                : "Aucun conflit à résoudre"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de la campagne
            </CardTitle>
            <CardDescription className="text-3xl font-bold">
              {stats.totalCount}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {stats.resolvedCount} bastions traités ({Math.round((stats.resolvedCount / stats.totalCount) * 100)}%)
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Statut de la campagne en cours</CardTitle>
            <CardDescription>
              {activeCampaign.name} ({new Date(activeCampaign.startDate).toLocaleDateString()} - {new Date(activeCampaign.endDate).toLocaleDateString()})
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="valeur" name="Nombre de bastions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={goToCampaignList}>
              Voir toutes les campagnes
            </Button>
            <Button>
              Exporter les données <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Conflits à résoudre</CardTitle>
            <CardDescription>
              Ressources avec des décisions contradictoires
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {conflictingBastions.length > 0 ? (
                conflictingBastions.map((bastion) => (
                  <div
                    key={bastion.bastionId}
                    className="flex items-center justify-between border-b pb-2"
                    onClick={() => goToBastionDetail(bastion.bastionId)}
                  >
                    <div className="flex items-center">
                      <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
                      <div>
                        <p className="font-medium">{bastion.name}</p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">{bastion.platform}</Badge>
                          <span className="text-xs text-muted-foreground">
                            {bastion.subscription}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">
                      Résoudre
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  Aucun conflit à résoudre actuellement
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Bastions nécessitant une décision</CardTitle>
          <CardDescription>
            Vue d'ensemble des ressources requérant votre attention
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Plateforme</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Souscription</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bastionsWithIssues.map((bastion) => (
                <TableRow key={bastion.bastionId}>
                  <TableCell className="font-medium">{bastion.name}</TableCell>
                  <TableCell>
                    <Badge 
                      className={
                        bastion.platform === "Azure" ? "bg-blue-100 text-blue-800" :
                        bastion.platform === "AWS" ? "bg-amber-100 text-amber-800" :
                        "bg-indigo-100 text-indigo-800"
                      }
                    >
                      {bastion.platform}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {bastion.status === "Pending" ? (
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-amber-500" />
                        <span className="text-sm">En attente</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <AlertCircle className="mr-1 h-4 w-4 text-red-500" />
                        <span className="text-sm">Conflit</span>
                      </div>
                    )}
                  </TableCell>
                  <TableCell>{bastion.subscription}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      onClick={() => goToBastionDetail(bastion.bastionId)}
                      variant="outline"
                      size="sm"
                    >
                      Voir détails
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Campagnes récentes</CardTitle>
          <CardDescription>Historique des campagnes précédentes</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Période</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{campaign.totalBastions} bastions</TableCell>
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
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm">
                      Voir rapport
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;

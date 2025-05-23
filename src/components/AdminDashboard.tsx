
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Campaign, BastionDto, AdminStats, BastionAction } from "@/types";
import { ChevronDown, ChevronRight, Check, X, Clock, AlertTriangle, Shield, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAdmin } from "@/hooks/useAdmin";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/services/api";

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
}) => {
  const navigate = useNavigate();
  const [expandedBastions, setExpandedBastions] = useState<Set<string>>(new Set());
  const {
    selectedBastionId,
    setSelectedBastionId,
    ritmNumber,
    setRitmNumber,
    handleAdminKeep,
    handleAdminDelete,
    isUpdating
  } = useAdmin();

  // Query pour récupérer les actions d'un bastion spécifique
  const { data: bastionActions = [] } = useQuery({
    queryKey: ["bastionActions", selectedBastionId],
    queryFn: () => selectedBastionId ? api.getBastionActions(selectedBastionId) : Promise.resolve([]),
    enabled: !!selectedBastionId
  });

  const toggleBastionExpansion = (bastionId: string) => {
    const newExpanded = new Set(expandedBastions);
    if (newExpanded.has(bastionId)) {
      newExpanded.delete(bastionId);
      if (selectedBastionId === bastionId) {
        setSelectedBastionId(null);
      }
    } else {
      newExpanded.add(bastionId);
      setSelectedBastionId(bastionId);
    }
    setExpandedBastions(newExpanded);
  };

  const handleKeepDecision = (bastion: BastionDto) => {
    handleAdminKeep(bastion, "admin@entreprise.com");
  };

  const handleDeleteDecision = (bastion: BastionDto) => {
    handleAdminDelete(bastion, "admin@entreprise.com");
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Pending":
        return <Clock className="h-4 w-4 text-amber-500" />;
      case "Conflict":
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case "Keep":
        return <Check className="h-4 w-4 text-green-500" />;
      case "Delete":
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return <Shield className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "Pending":
        return "En attente";
      case "Conflict":
        return "Conflit";
      case "Keep":
        return "Conserver";
      case "Delete":
        return "Supprimer";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Statistiques principales */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Total Bastions Azure
            </CardTitle>
            <CardDescription className="text-3xl font-bold">
              {stats.totalCount}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              Campagne : {activeCampaign.name}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Sans réponse
            </CardTitle>
            <CardDescription className="text-3xl font-bold text-amber-600">
              {stats.pendingCount}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {stats.pendingCount > 0
                ? `${Math.round((stats.pendingCount / stats.totalCount) * 100)}% en attente`
                : "Toutes les ressources ont été évaluées"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              Réponses conflictuelles
            </CardTitle>
            <CardDescription className="text-3xl font-bold text-red-600">
              {stats.conflictCount}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              {stats.conflictCount > 0
                ? "Décisions administratives requises"
                : "Aucun conflit à résoudre"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Liste des bastions de la campagne active */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Bastions Azure - {activeCampaign.name}
          </CardTitle>
          <CardDescription>
            Gérez les décisions pour tous les bastions de la campagne active
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {bastionsWithIssues.map((bastion) => (
              <Collapsible
                key={bastion.bastionId}
                open={expandedBastions.has(bastion.bastionId)}
                onOpenChange={() => toggleBastionExpansion(bastion.bastionId)}
              >
                <div className="border rounded-lg p-4">
                  <CollapsibleTrigger asChild>
                    <div className="flex items-center justify-between cursor-pointer hover:bg-muted/50 p-2 rounded">
                      <div className="flex items-center gap-3">
                        {expandedBastions.has(bastion.bastionId) ? (
                          <ChevronDown className="h-4 w-4" />
                        ) : (
                          <ChevronRight className="h-4 w-4" />
                        )}
                        {getStatusIcon(bastion.status)}
                        <div>
                          <h4 className="font-medium">{bastion.name}</h4>
                          <p className="text-sm text-muted-foreground">{bastion.subscription}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-blue-100 text-blue-800">
                          Azure
                        </Badge>
                        <Badge variant={bastion.status === "Conflict" ? "destructive" : "secondary"}>
                          {getStatusText(bastion.status)}
                        </Badge>
                      </div>
                    </div>
                  </CollapsibleTrigger>

                  <CollapsibleContent className="mt-4">
                    {selectedBastionId === bastion.bastionId && (
                      <div className="space-y-4 border-t pt-4">
                        {/* Actions des utilisateurs */}
                        <div>
                          <h5 className="font-medium mb-2">Actions des utilisateurs :</h5>
                          {bastionActions.length > 0 ? (
                            <div className="space-y-2 max-h-32 overflow-y-auto">
                              {bastionActions.map((action) => (
                                <div
                                  key={action.actionId}
                                  className="flex items-center justify-between p-2 bg-muted/30 rounded text-sm"
                                >
                                  <div className="flex items-center gap-2">
                                    {action.action === "keep" ? (
                                      <Check className="h-3 w-3 text-green-500" />
                                    ) : (
                                      <X className="h-3 w-3 text-red-500" />
                                    )}
                                    <span className="font-medium">{action.userName || action.userEmail}</span>
                                    <span>
                                      {action.action === "keep" ? "Conserver" : "Supprimer"}
                                    </span>
                                    {action.ritm && (
                                      <Badge variant="outline" className="text-xs">
                                        {action.ritm}
                                      </Badge>
                                    )}
                                  </div>
                                  <span className="text-xs text-muted-foreground">
                                    {new Date(action.actionDate).toLocaleDateString()}
                                  </span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-muted-foreground">Aucune action utilisateur enregistrée</p>
                          )}
                        </div>

                        {/* Décision administrative */}
                        <div className="border-t pt-4">
                          <h5 className="font-medium mb-3">Décision administrative :</h5>
                          <div className="flex items-center gap-3">
                            {bastion.status === "Conflict" || bastionActions.some(action => action.action === "keep") ? (
                              <div className="flex items-center gap-2">
                                <Input
                                  placeholder="Numéro RITM (requis pour conserver)"
                                  value={ritmNumber}
                                  onChange={(e) => setRitmNumber(e.target.value)}
                                  className="w-64"
                                />
                                <Button
                                  onClick={() => handleKeepDecision(bastion)}
                                  disabled={isUpdating || !ritmNumber.trim()}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <Check className="h-4 w-4 mr-2" />
                                  Conserver
                                </Button>
                              </div>
                            ) : (
                              <Button
                                onClick={() => handleKeepDecision(bastion)}
                                disabled={isUpdating || !ritmNumber.trim()}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="h-4 w-4 mr-2" />
                                Conserver
                              </Button>
                            )}
                            
                            <Button
                              onClick={() => handleDeleteDecision(bastion)}
                              disabled={isUpdating}
                              variant="destructive"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Supprimer
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CollapsibleContent>
                </div>
              </Collapsible>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Historique des campagnes */}
      <Card>
        <CardHeader>
          <CardTitle>Historique des campagnes</CardTitle>
          <CardDescription>Campagnes précédentes et leurs résultats</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom de la campagne</TableHead>
                <TableHead>Période</TableHead>
                <TableHead>Total bastions</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Progression</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentCampaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    {new Date(campaign.startDate).toLocaleDateString()} - {new Date(campaign.endDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{campaign.totalBastions}</TableCell>
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
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ 
                            width: `${(campaign.resolvedBastions / campaign.totalBastions) * 100}%` 
                          }}
                        ></div>
                      </div>
                      <span className="text-xs">
                        {Math.round((campaign.resolvedBastions / campaign.totalBastions) * 100)}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="outline" size="sm">
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

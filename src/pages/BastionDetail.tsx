
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BastionAction, BastionDto } from "@/types";
import { api } from "@/services/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ArrowLeft, History, Users } from "lucide-react";

const BastionDetail = () => {
  const { bastionId } = useParams();
  const navigate = useNavigate();
  const [bastion, setBastion] = useState<BastionDto | null>(null);
  const [actions, setActions] = useState<BastionAction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBastionDetails = async () => {
      if (!bastionId) return;
      
      setLoading(true);
      try {
        const bastionData = await api.getBastionById(bastionId);
        const actionsData = await api.getBastionActions(bastionId);
        
        setBastion(bastionData);
        setActions(actionsData);
      } catch (error) {
        console.error("Erreur lors du chargement des détails du bastion:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBastionDetails();
  }, [bastionId]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
        </div>
        <div className="text-center py-10">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin inline-block"></div>
          <p className="mt-2 text-muted-foreground">Chargement des détails...</p>
        </div>
      </div>
    );
  }

  if (!bastion) {
    return (
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)} 
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Retour
          </Button>
        </div>
        <div className="text-center py-10">
          <p className="text-lg text-muted-foreground">Bastion non trouvé</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-6">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour
        </Button>
      </div>

      <Card className="bg-white shadow-sm border-slate-200 mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <History className="h-5 w-5" />
            Détails du Bastion
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Nom du Bastion</p>
              <p className="font-medium">{bastion.name}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">ID du Bastion</p>
              <p className="font-mono text-xs">{bastion.bastionId}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Subscription</p>
              <p>{bastion.subscription}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">Status</p>
              <span
                className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                  bastion.status === "Keep" || bastion.status === "Kept"
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-red-100 text-red-800 border border-red-200"
                }`}
              >
                {bastion.status}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Users className="h-5 w-5" />
            Historique des actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {actions.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>Aucune action enregistrée pour ce bastion</p>
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/50">
                  <TableRow>
                    <TableHead className="font-medium">Action</TableHead>
                    <TableHead className="font-medium">RITM</TableHead>
                    <TableHead className="font-medium">Par</TableHead>
                    <TableHead className="font-medium">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {actions.map((action) => (
                    <TableRow key={action.actionId} className="hover:bg-muted/30">
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                            action.action === "keep"
                              ? "bg-green-100 text-green-800 border border-green-200"
                              : "bg-red-100 text-red-800 border border-red-200"
                          }`}
                        >
                          {action.action === "keep" ? "Keep" : "Delete"}
                        </span>
                      </TableCell>
                      <TableCell>{action.ritm || "-"}</TableCell>
                      <TableCell>
                        <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                          {action.userName || action.userEmail}
                        </span>
                      </TableCell>
                      <TableCell>{new Date(action.actionDate).toLocaleDateString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BastionDetail;


import { useNavigate } from "react-router-dom";
import { BastionDto } from "../types";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { History } from "lucide-react";
import HistorySearch from "./HistorySearch";
import { ScrollArea } from "@/components/ui/scroll-area";

interface BastionHistoryProps {
  bastions: BastionDto[];
  onSearch: (query: string) => void;
  isLoading: boolean;
}

const BastionHistory: React.FC<BastionHistoryProps> = ({ 
  bastions, 
  onSearch,
  isLoading 
}) => {
  const navigate = useNavigate();

  const handleBastionClick = (bastionId: string) => {
    navigate(`/bastion/${bastionId}`);
  };

  if (isLoading) {
    return (
      <Card className="bg-white shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Mon historique d'actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="inline-block w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-2 text-muted-foreground">Chargement de l'historique...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (bastions.length === 0) {
    return (
      <Card className="bg-white shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Mon historique d'actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <HistorySearch onSearch={onSearch} />
          <div className="text-center py-8 text-muted-foreground">
            <p>Aucun historique disponible</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-sm border-slate-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-primary flex items-center gap-2">
          <History className="h-5 w-5" />
          Mon historique d'actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <HistorySearch onSearch={onSearch} />
        
        <ScrollArea className="h-[400px]">
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/50 sticky top-0">
                <TableRow>
                  <TableHead className="font-medium">Nom du Bastion</TableHead>
                  <TableHead className="font-medium">ID du Bastion</TableHead>
                  <TableHead className="font-medium">Subscription</TableHead>
                  <TableHead className="font-medium">Statut</TableHead>
                  <TableHead className="font-medium">RITM</TableHead>
                  <TableHead className="font-medium">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {bastions.map((bastion) => (
                  <TableRow 
                    key={bastion.bastionId} 
                    className="hover:bg-muted/30 cursor-pointer"
                    onClick={() => handleBastionClick(bastion.bastionId)}
                  >
                    <TableCell className="font-medium">{bastion.name}</TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">{bastion.bastionId}</TableCell>
                    <TableCell>{bastion.subscription}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                          bastion.status === "Keep" || bastion.status === "Kept"
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-red-100 text-red-800 border border-red-200"
                        }`}
                      >
                        {bastion.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {bastion.ritm || "-"}
                    </TableCell>
                    <TableCell>
                      {bastion.actionDate ? new Date(bastion.actionDate).toLocaleDateString() : "-"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default BastionHistory;

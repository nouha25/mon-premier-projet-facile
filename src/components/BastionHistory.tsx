
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

interface BastionHistoryProps {
  bastions: BastionDto[];
}

const BastionHistory: React.FC<BastionHistoryProps> = ({ bastions }) => {
  if (bastions.length === 0) {
    return (
      <Card className="bg-white shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Historique des actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Aucun historique disponible pour cet utilisateur</p>
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
          Historique des actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border overflow-hidden">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="font-medium">Nom du Bastion</TableHead>
                <TableHead className="font-medium">ID du Bastion</TableHead>
                <TableHead className="font-medium">Subscription</TableHead>
                <TableHead className="font-medium">Statut</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bastions.map((bastion) => (
                <TableRow key={bastion.bastionId} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{bastion.name}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{bastion.bastionId}</TableCell>
                  <TableCell>{bastion.subscription}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${
                        bastion.status === "Kept" || bastion.status === "Keep"
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-red-100 text-red-800 border border-red-200"
                      }`}
                    >
                      {bastion.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default BastionHistory;

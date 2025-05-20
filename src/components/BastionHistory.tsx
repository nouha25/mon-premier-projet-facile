
import { BastionDto } from "../types";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";

interface BastionHistoryProps {
  bastions: BastionDto[];
}

const BastionHistory: React.FC<BastionHistoryProps> = ({ bastions }) => {
  if (bastions.length === 0) {
    return (
      <div className="text-center py-10">
        <p>Aucun historique disponible pour cet utilisateur</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Historique des actions</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom du Bastion</TableHead>
            <TableHead>ID du Bastion</TableHead>
            <TableHead>Subscription</TableHead>
            <TableHead>Statut</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bastions.map((bastion) => (
            <TableRow key={bastion.bastionId}>
              <TableCell>{bastion.name}</TableCell>
              <TableCell className="font-mono text-xs">{bastion.bastionId}</TableCell>
              <TableCell>{bastion.subscription}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    bastion.status === "Kept" || bastion.status === "Keep"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
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
  );
};

export default BastionHistory;

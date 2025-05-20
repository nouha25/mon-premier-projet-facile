
import { useState } from "react";
import { BastionDto } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

interface PendingBastionsProps {
  bastions: BastionDto[];
  onKeep: (bastion: BastionDto) => void;
  onDelete: (bastion: BastionDto) => void;
  ritmNumber: string;
  setRitmNumber: (value: string) => void;
  isUpdating: boolean;
}

const PendingBastions: React.FC<PendingBastionsProps> = ({
  bastions,
  onKeep,
  onDelete,
  ritmNumber,
  setRitmNumber,
  isUpdating,
}) => {
  const [selectedBastion, setSelectedBastion] = useState<BastionDto | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleKeepClick = (bastion: BastionDto) => {
    setSelectedBastion(bastion);
    setDialogOpen(true);
  };

  const handleConfirmKeep = () => {
    if (!ritmNumber.trim()) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer un numéro RITM valide",
        variant: "destructive",
      });
      return;
    }

    if (selectedBastion) {
      onKeep(selectedBastion);
      setDialogOpen(false);
    }
  };

  if (bastions.length === 0) {
    return (
      <div className="text-center py-10">
        <p>Aucun bastion en attente pour cet utilisateur</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Bastions en attente</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom du Bastion</TableHead>
            <TableHead>ID du Bastion</TableHead>
            <TableHead>Subscription</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bastions.map((bastion) => (
            <TableRow key={bastion.bastionId}>
              <TableCell>{bastion.name}</TableCell>
              <TableCell className="font-mono text-xs">{bastion.bastionId}</TableCell>
              <TableCell>{bastion.subscription}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handleKeepClick(bastion)}
                    disabled={isUpdating}
                  >
                    Keep
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => onDelete(bastion)}
                    disabled={isUpdating}
                  >
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Entrer le numéro RITM</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="mb-2">
              Bastion: {selectedBastion?.name} ({selectedBastion?.bastionId})
            </p>
            <Input
              placeholder="Numéro RITM"
              value={ritmNumber}
              onChange={(e) => setRitmNumber(e.target.value)}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Annuler
            </Button>
            <Button onClick={handleConfirmKeep} disabled={!ritmNumber.trim() || isUpdating}>
              Confirmer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PendingBastions;

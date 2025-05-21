
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
import { Check, Trash } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
      <Card className="bg-white shadow-sm border-slate-200">
        <CardHeader>
          <CardTitle>Bastions en attente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-muted-foreground">
            <p>Aucun bastion en attente pour cet utilisateur</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-white shadow-sm border-slate-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold text-primary">
          Bastions en attente
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
                <TableHead className="font-medium">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bastions.map((bastion) => (
                <TableRow key={bastion.bastionId} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{bastion.name}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{bastion.bastionId}</TableCell>
                  <TableCell>{bastion.subscription}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleKeepClick(bastion)}
                        disabled={isUpdating}
                        className="flex items-center gap-1 hover:bg-green-50 hover:text-green-600 hover:border-green-200 transition-colors"
                      >
                        <Check className="h-4 w-4" />
                        Keep
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(bastion)}
                        disabled={isUpdating}
                        className="flex items-center gap-1 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors"
                      >
                        <Trash className="h-4 w-4" />
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Entrer le numéro RITM</DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-3">
              <div className="bg-muted/20 p-3 rounded-md">
                <p className="text-sm font-medium mb-1">Bastion:</p>
                <p className="text-sm">{selectedBastion?.name}</p>
                <p className="text-xs text-muted-foreground font-mono mt-1">{selectedBastion?.bastionId}</p>
              </div>
              <Input
                placeholder="Numéro RITM"
                value={ritmNumber}
                onChange={(e) => setRitmNumber(e.target.value)}
                className="focus-visible:ring-primary"
              />
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={handleConfirmKeep} disabled={!ritmNumber.trim() || isUpdating}>
                Confirmer
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default PendingBastions;

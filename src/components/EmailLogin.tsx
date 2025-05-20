
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

interface EmailLoginProps {
  onLogin: (email: string) => void;
}

const EmailLogin: React.FC<EmailLoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation simple de l'email
    if (!email.includes("@")) {
      toast({
        title: "Erreur",
        description: "Veuillez entrer une adresse e-mail valide.",
        variant: "destructive",
      });
      return;
    }
    
    onLogin(email);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-center mb-6">
            Gestion des Bastions
          </h2>
          <p className="text-center text-muted-foreground mb-6">
            Entrez votre adresse e-mail pour voir les bastions associés
          </p>
        </div>
        <Input
          type="email"
          placeholder="Adresse e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full"
          required
        />
        <Button type="submit" className="w-full">
          Accéder
        </Button>
      </form>
    </div>
  );
};

export default EmailLogin;

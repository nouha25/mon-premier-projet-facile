
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { Mail } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface EmailLoginProps {
  onLogin: (email: string) => void;
  isLoading?: boolean;
}

const EmailLogin: React.FC<EmailLoginProps> = ({ onLogin, isLoading = false }) => {
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
    <Card className="w-full max-w-md mx-auto shadow-lg border-slate-200">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Gestion des Bastions
        </CardTitle>
        <CardDescription className="text-center">
          Entrez votre adresse e-mail pour voir les bastions associés
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center border rounded-md focus-within:ring-1 focus-within:ring-primary focus-within:border-primary bg-white overflow-hidden">
            <div className="px-3 py-2 text-muted-foreground">
              <Mail className="h-5 w-5" />
            </div>
            <Input
              type="email"
              placeholder="Adresse e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              required
              disabled={isLoading}
            />
          </div>
          <Button 
            type="submit" 
            className="w-full transition-all hover:shadow-md"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Connexion...
              </>
            ) : (
              "Accéder"
            )}
          </Button>
          
          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>Emails de test: alice@example.com, bob@example.com, charlie@example.com</p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default EmailLogin;

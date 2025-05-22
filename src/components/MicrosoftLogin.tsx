
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { LogIn } from "lucide-react";

interface MicrosoftLoginProps {
  onLogin: (userData: { email: string; name: string; avatar?: string }) => void;
  isLoading?: boolean;
}

const MicrosoftLogin: React.FC<MicrosoftLoginProps> = ({ onLogin, isLoading = false }) => {
  const handleMicrosoftLogin = () => {
    // Simulation d'une connexion Microsoft AD
    setTimeout(() => {
      // Utilisateur fictif Microsoft AD
      const randomUser = mockMicrosoftUsers[Math.floor(Math.random() * mockMicrosoftUsers.length)];
      
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${randomUser.name}`,
      });
      
      onLogin(randomUser);
    }, 1500);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-slate-200">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold text-center">
          Cloud Resources Manager
        </CardTitle>
        <CardDescription className="text-center">
          Connectez-vous avec votre compte Microsoft pour accéder à vos ressources cloud
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-4">
          <Button
            variant="outline"
            onClick={handleMicrosoftLogin}
            disabled={isLoading}
            className="flex items-center justify-center gap-2 h-12 border-2 hover:bg-slate-50 hover:text-primary-foreground hover:border-primary transition-all"
          >
            {isLoading ? (
              <div className="mr-2 h-4 w-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 23 23">
                <path fill="#f3f3f3" d="M0 0h23v23H0z" />
                <path fill="#f35325" d="M1 1h10v10H1z" />
                <path fill="#81bc06" d="M12 1h10v10H12z" />
                <path fill="#05a6f0" d="M1 12h10v10H1z" />
                <path fill="#ffba08" d="M12 12h10v10H12z" />
              </svg>
            )}
            {isLoading ? "Connexion en cours..." : "Se connecter avec Microsoft"}
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Environnement de démonstration
              </span>
            </div>
          </div>
          
          <div className="p-4 bg-slate-50 rounded-lg text-sm text-slate-600">
            <p className="font-medium mb-1">Comptes de démonstration :</p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Sophie Martin (Administrateur)</li>
              <li>Thomas Dubois (Développeur)</li>
              <li>Emma Bernard (Architecte cloud)</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Utilisateurs fictifs Microsoft AD pour la démonstration
const mockMicrosoftUsers = [
  {
    email: "sophie.martin@entreprise.com",
    name: "Sophie Martin",
    role: "Administrateur",
    avatar: "https://i.pravatar.cc/150?img=32"
  },
  {
    email: "thomas.dubois@entreprise.com",
    name: "Thomas Dubois",
    role: "Développeur",
    avatar: "https://i.pravatar.cc/150?img=53"
  },
  {
    email: "emma.bernard@entreprise.com",
    name: "Emma Bernard",
    role: "Architecte cloud",
    avatar: "https://i.pravatar.cc/150?img=47"
  }
];

export default MicrosoftLogin;

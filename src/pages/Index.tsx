
import { useState } from "react";
import MicrosoftLogin from "@/components/MicrosoftLogin";
import { User } from "@/types";
import PendingBastions from "@/components/PendingBastions";
import BastionHistory from "@/components/BastionHistory";
import { useBastions } from "@/hooks/useBastions";
import { ThemeProvider } from "next-themes";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardOverview from "@/components/DashboardOverview";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, History } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const {
    pendingBastions,
    personalHistory,
    isLoading,
    ritmNumber,
    setRitmNumber,
    handleKeepAction,
    handleDeleteAction,
    isUpdating,
    handleSearch
  } = useBastions(user?.email || null);

  const handleLogin = async (userData: User) => {
    setIsAuthenticating(true);
    
    try {
      // Simuler un délai d'authentification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(userData);
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${userData.name}`,
      });
    } catch (error) {
      toast({
        title: "Erreur d'authentification",
        description: "Une erreur est survenue lors de la connexion",
        variant: "destructive",
      });
    } finally {
      setIsAuthenticating(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen bg-background">
        {!user ? (
          <div className="flex min-h-screen items-center justify-center">
            <MicrosoftLogin onLogin={handleLogin} isLoading={isAuthenticating} />
          </div>
        ) : (
          <>
            <DashboardHeader user={user} onLogout={handleLogout} />
            <main className="container py-6">
              <DashboardOverview userName={user.name.split(' ')[0]} />
              
              <div className="mt-8">
                <Tabs defaultValue="pending" className="w-full">
                  <TabsList className="w-full mb-6">
                    <TabsTrigger value="pending" className="flex items-center gap-2 w-1/2">
                      <ClipboardList className="h-4 w-4" />
                      Ressources en attente
                    </TabsTrigger>
                    <TabsTrigger value="history" className="flex items-center gap-2 w-1/2">
                      <History className="h-4 w-4" />
                      Historique
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="pending" className="mt-6">
                    <div className="bg-card p-6 rounded-lg shadow border">
                      {isLoading ? (
                        <div className="text-center py-10 flex flex-col items-center gap-4">
                          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                          <p className="text-muted-foreground">Chargement des données...</p>
                        </div>
                      ) : (
                        <PendingBastions
                          bastions={pendingBastions}
                          onKeep={handleKeepAction}
                          onDelete={handleDeleteAction}
                          ritmNumber={ritmNumber}
                          setRitmNumber={setRitmNumber}
                          isUpdating={isUpdating}
                        />
                      )}
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="history" className="mt-6">
                    <div className="bg-card p-6 rounded-lg shadow border">
                      {isLoading ? (
                        <div className="text-center py-10 flex flex-col items-center gap-4">
                          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                          <p className="text-muted-foreground">Chargement des données...</p>
                        </div>
                      ) : (
                        <BastionHistory 
                          bastions={personalHistory} 
                          onSearch={handleSearch}
                          isLoading={isLoading}
                        />
                      )}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </main>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Index;

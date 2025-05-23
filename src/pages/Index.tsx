
import { useState, useEffect } from "react";
import MicrosoftLogin from "@/components/MicrosoftLogin";
import { User } from "@/types";
import PendingBastions from "@/components/PendingBastions";
import BastionHistory from "@/components/BastionHistory";
import { useBastions } from "@/hooks/useBastions";
import { useAdmin } from "@/hooks/useAdmin";
import { ThemeProvider } from "next-themes";
import DashboardHeader from "@/components/DashboardHeader";
import DashboardOverview from "@/components/DashboardOverview";
import AdminDashboard from "@/components/AdminDashboard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ClipboardList, History } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Index = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  
  // Hook pour les utilisateurs standard
  const {
    pendingBastions,
    personalHistory,
    isLoading: isBastionsLoading,
    ritmNumber,
    setRitmNumber,
    handleKeepAction,
    handleDeleteAction,
    isUpdating,
    handleSearch
  } = useBastions(user?.email || null);

  // Hook pour les administrateurs
  const {
    adminStats,
    activeCampaign,
    allCampaigns,
    conflictingBastions,
    bastionsNeedingAction,
    isLoading: isAdminLoading,
    isUpdating: isAdminUpdating
  } = useAdmin();

  const handleLogin = async (userData: User) => {
    setIsAuthenticating(true);
    
    try {
      // Simuler un délai d'authentification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setUser(userData);
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${userData.name}${userData.isAdmin ? ' (Administrateur)' : ''}`,
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

  const isAdmin = user?.isAdmin === true;
  const isLoading = isAdmin ? isAdminLoading : isBastionsLoading;
  
  // Récupérer les campagnes récentes pour l'admin
  const recentCampaigns = allCampaigns?.filter(c => c.status === "completed").slice(0, 5) || [];

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
              {isAdmin ? (
                // Interface administrateur
                <>
                  <h1 className="text-2xl font-bold mb-6">Tableau de bord administrateur</h1>
                  {isLoading ? (
                    <div className="text-center py-10 flex flex-col items-center gap-4">
                      <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-muted-foreground">Chargement des données administrateur...</p>
                    </div>
                  ) : (
                    adminStats && activeCampaign ? (
                      <AdminDashboard
                        stats={adminStats}
                        activeCampaign={activeCampaign}
                        recentCampaigns={recentCampaigns}
                        bastionsWithIssues={bastionsNeedingAction}
                        conflictingBastions={conflictingBastions}
                      />
                    ) : (
                      <div className="text-center py-10">
                        <p className="text-muted-foreground">Impossible de charger les données administrateur</p>
                      </div>
                    )
                  )}
                </>
              ) : (
                // Interface utilisateur standard
                <>
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
                </>
              )}
            </main>
          </>
        )}
      </div>
    </ThemeProvider>
  );
};

export default Index;

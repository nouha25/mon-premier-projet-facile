
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import EmailLogin from "@/components/EmailLogin";
import PendingBastions from "@/components/PendingBastions";
import BastionHistory from "@/components/BastionHistory";
import { useBastions } from "@/hooks/useBastions";

const Index = () => {
  const [email, setEmail] = useState<string | null>(null);
  const {
    pendingBastions,
    bastionHistory,
    isLoading,
    ritmNumber,
    setRitmNumber,
    handleKeepAction,
    handleDeleteAction,
    isUpdating,
  } = useBastions(email);

  const handleLogout = () => {
    setEmail(null);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Gestion des Bastions Azure
          </h1>
          {email && (
            <div className="flex justify-between items-center mt-2">
              <p className="text-sm text-gray-600">
                Connecté en tant que: <span className="font-semibold">{email}</span>
              </p>
              <button
                onClick={handleLogout}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                Se déconnecter
              </button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {!email ? (
          <div className="py-10">
            <EmailLogin onLogin={setEmail} />
          </div>
        ) : (
          <div className="space-y-8">
            {isLoading ? (
              <div className="text-center py-10">
                <p>Chargement des données...</p>
              </div>
            ) : (
              <>
                <div className="bg-white p-6 rounded-lg shadow">
                  <PendingBastions
                    bastions={pendingBastions}
                    onKeep={handleKeepAction}
                    onDelete={handleDeleteAction}
                    ritmNumber={ritmNumber}
                    setRitmNumber={setRitmNumber}
                    isUpdating={isUpdating}
                  />
                </div>
                
                <div className="bg-white p-6 rounded-lg shadow">
                  <BastionHistory bastions={bastionHistory} />
                </div>
              </>
            )}
          </div>
        )}
      </main>
      
      <footer className="bg-white mt-12 py-6 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © 2025 Gestion des Bastions Azure
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

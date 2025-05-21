
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface HistorySearchProps {
  onSearch: (query: string) => void;
}

const HistorySearch: React.FC<HistorySearchProps> = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
      <div className="flex-1 flex items-center border rounded-md focus-within:ring-1 focus-within:ring-primary focus-within:border-primary bg-white overflow-hidden">
        <div className="px-3 py-2 text-muted-foreground">
          <Search className="h-5 w-5" />
        </div>
        <Input
          type="text"
          placeholder="Rechercher dans l'historique..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      <Button type="submit">Rechercher</Button>
    </form>
  );
};

export default HistorySearch;

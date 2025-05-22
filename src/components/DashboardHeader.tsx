
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "./mode-toggle";

interface DashboardHeaderProps {
  user: {
    name: string;
    email: string;
    role?: string;
    avatar?: string;
  };
  onLogout: () => void;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ user, onLogout }) => {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-primary">
            <path
              fill="currentColor"
              d="M11.5 2a9.5 9.5 0 0 1 9.5 9.5 9.46 9.46 0 0 1-9.5 9.5A9.5 9.5 0 0 1 2 11.5 9.46 9.46 0 0 1 11.5 2M13 5.67v2.67c0 .44.44.67.67.67h2.67A5.9 5.9 0 0 0 13 5.67M10 5.67A5.9 5.9 0 0 0 6.67 9H10V5.67M6.67 12A5.9 5.9 0 0 0 10 15.33V12H6.67M13 12v3.33A5.9 5.9 0 0 0 16.33 12H13Z"
            />
          </svg>
          <span className="text-xl font-bold">Cloud Resources Manager</span>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="relative hidden md:flex">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Rechercher..."
              className="pl-8 w-64 bg-background"
            />
          </div>

          <ModeToggle />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.name}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                  {user.role && (
                    <p className="text-xs text-muted-foreground">{user.role}</p>
                  )}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                Profil
              </DropdownMenuItem>
              <DropdownMenuItem>
                Préférences
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={onLogout}>
                Déconnexion
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;

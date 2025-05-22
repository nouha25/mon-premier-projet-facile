
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ClipboardList, History } from "lucide-react";

// Données fictives pour le graphique
const resourceData = [
  { name: "AWS", Azure: 4, AWS: 8, GCP: 3 },
  { name: "GCP", Azure: 2, AWS: 5, GCP: 6 },
  { name: "Azure", Azure: 7, AWS: 3, GCP: 2 },
];

// Données fictives pour les dernières actions
const recentActions = [
  {
    id: "act-001",
    resourceId: "bastion-001",
    resourceName: "Bastion-Production-EU",
    action: "keep",
    date: "2025-05-21T10:15:00Z",
    platform: "Azure",
  },
  {
    id: "act-002",
    resourceId: "ec2-003",
    resourceName: "EC2-Dev-Instance",
    action: "delete",
    date: "2025-05-20T14:30:00Z",
    platform: "AWS",
  },
  {
    id: "act-003",
    resourceId: "vm-007",
    resourceName: "GCP-VM-Test",
    action: "keep",
    date: "2025-05-19T08:45:00Z",
    platform: "GCP",
  },
];

// Données fictives pour les ressources en attente
const pendingResources = [
  {
    id: "res-001",
    name: "Bastion-Production-EU",
    platform: "Azure",
    type: "Bastion",
  },
  {
    id: "res-002",
    name: "EC2-Dev-Instance",
    platform: "AWS",
    type: "EC2",
  },
  {
    id: "res-003",
    name: "GCP-VM-Test",
    platform: "GCP",
    type: "VM",
  },
];

interface DashboardOverviewProps {
  userName: string;
}

const DashboardOverview: React.FC<DashboardOverviewProps> = ({ userName }) => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
      <Card className="col-span-full lg:col-span-3">
        <CardHeader>
          <CardTitle>Bienvenue, {userName}</CardTitle>
          <CardDescription>
            Voici un aperçu de vos ressources cloud
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={resourceData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 0,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="Azure" fill="#0078D4" />
                <Bar dataKey="AWS" fill="#FF9900" />
                <Bar dataKey="GCP" fill="#4285F4" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full md:col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            En attente
          </CardTitle>
          <CardDescription>Ressources nécessitant une action</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingResources.map((resource) => (
              <div
                key={resource.id}
                className="flex items-center justify-between border-b pb-2"
              >
                <div>
                  <p className="text-sm font-medium">{resource.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge
                      variant="outline"
                      className={
                        resource.platform === "Azure"
                          ? "bg-blue-50 text-blue-700 border-blue-300"
                          : resource.platform === "AWS"
                          ? "bg-amber-50 text-amber-700 border-amber-300"
                          : "bg-indigo-50 text-indigo-700 border-indigo-300"
                      }
                    >
                      {resource.platform}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {resource.type}
                    </span>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  Voir
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-2">
              Voir toutes
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full md:col-span-1 lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Actions récentes
          </CardTitle>
          <CardDescription>Vos dernières actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActions.map((action) => (
              <div
                key={action.id}
                className="flex items-start justify-between border-b pb-2"
              >
                <div>
                  <p className="text-sm font-medium">{action.resourceName}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <Badge
                      className={
                        action.action === "keep"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300"
                          : "bg-rose-50 text-rose-700 border-rose-300"
                      }
                    >
                      {action.action === "keep" ? "Conservé" : "Supprimé"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(action.date).toLocaleDateString("fr-FR", {
                        day: "2-digit",
                        month: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
                <Button size="sm" variant="ghost">
                  Détail
                </Button>
              </div>
            ))}
            <Button variant="outline" size="sm" className="w-full mt-2">
              Voir toutes
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardOverview;

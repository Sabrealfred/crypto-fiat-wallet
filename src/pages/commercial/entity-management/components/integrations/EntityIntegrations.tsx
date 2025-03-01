
import React, { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Building2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Integration, IntegrationFormData, EntityIntegrationsProps } from "./types";
import { IntegrationDialog } from "./IntegrationDialog";
import { EmptyState } from "./EmptyState";
import { IntegrationsList } from "./IntegrationsList";

export const EntityIntegrations = ({ entityId, entityName }: EntityIntegrationsProps) => {
  const { toast } = useToast();
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "1",
      name: "SAP ERP",
      type: "erp",
      status: "active",
      lastSync: "2023-06-15 14:32",
      connectionDetails: {
        url: "https://api.sap.example.com",
        username: "entity_admin",
        authMethod: "api_key",
      },
      apiKey: "***********",
    },
    {
      id: "2",
      name: "Banking API",
      type: "banking",
      status: "error",
      lastSync: "2023-06-14 09:15",
      connectionDetails: {
        url: "https://api.banking.example.com",
        username: "api_user",
        authMethod: "oauth",
      },
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | undefined>(undefined);
  const [isSyncing, setIsSyncing] = useState<Record<string, boolean>>({});

  const handleAddIntegration = () => {
    setSelectedIntegration(undefined);
    setIsDialogOpen(true);
  };

  const handleEditIntegration = (integration: Integration) => {
    setSelectedIntegration(integration);
    setIsDialogOpen(true);
  };

  const handleSaveIntegration = (data: IntegrationFormData) => {
    if (selectedIntegration) {
      // Update existing integration
      setIntegrations(
        integrations.map((item) =>
          item.id === selectedIntegration.id
            ? {
                ...item,
                ...data,
                lastSync: new Date().toLocaleString(),
              }
            : item
        )
      );
      toast({
        title: "Integration updated",
        description: `${data.name} has been updated successfully.`,
      });
    } else {
      // Add new integration
      const newIntegration: Integration = {
        id: Date.now().toString(),
        ...data,
        status: "active",
        lastSync: new Date().toLocaleString(),
      };
      setIntegrations([...integrations, newIntegration]);
      toast({
        title: "Integration added",
        description: `${data.name} has been added successfully.`,
      });
    }
  };

  const handleDeleteIntegration = (id: string) => {
    setIntegrations(integrations.filter((item) => item.id !== id));
    toast({
      title: "Integration removed",
      description: "The integration has been removed successfully.",
    });
  };

  const handleSyncIntegration = (id: string) => {
    setIsSyncing({ ...isSyncing, [id]: true });
    
    // Simulate API call
    setTimeout(() => {
      setIntegrations(
        integrations.map((item) =>
          item.id === id
            ? {
                ...item,
                lastSync: new Date().toLocaleString(),
                status: Math.random() > 0.2 ? "active" : "error", // Simulate occasional errors
              }
            : item
        )
      );
      setIsSyncing({ ...isSyncing, [id]: false });
      
      toast({
        title: "Integration synced",
        description: "Data has been synchronized with the external system.",
      });
    }, 2000);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="space-y-1">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Building2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            External Systems Integration
          </CardTitle>
          <CardDescription>
            Manage connections to external systems for {entityName}
          </CardDescription>
        </div>
        <Button onClick={handleAddIntegration}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Integration
        </Button>
      </CardHeader>
      <CardContent>
        {integrations.length === 0 ? (
          <EmptyState onAddIntegration={handleAddIntegration} />
        ) : (
          <IntegrationsList 
            integrations={integrations}
            onSync={handleSyncIntegration}
            onDelete={handleDeleteIntegration}
            onConfigure={handleEditIntegration}
            isSyncing={isSyncing}
          />
        )}

        <IntegrationDialog
          open={isDialogOpen}
          onOpenChange={setIsDialogOpen}
          onSave={handleSaveIntegration}
          integration={selectedIntegration}
        />
      </CardContent>
    </Card>
  );
};

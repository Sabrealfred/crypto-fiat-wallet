
import React from "react";
import { Integration } from "./types";
import { IntegrationCard } from "./IntegrationCard";

interface IntegrationsListProps {
  integrations: Integration[];
  onSync: (id: string) => void;
  onDelete: (id: string) => void;
  onConfigure: (integration: Integration) => void;
  isSyncing: Record<string, boolean>;
}

export const IntegrationsList = ({ 
  integrations, 
  onSync, 
  onDelete, 
  onConfigure,
  isSyncing 
}: IntegrationsListProps) => {
  return (
    <div className="space-y-4">
      {integrations.map((integration) => (
        <IntegrationCard
          key={integration.id}
          integration={integration}
          onSync={onSync}
          onDelete={onDelete}
          onConfigure={onConfigure}
          isSyncing={isSyncing}
        />
      ))}
    </div>
  );
};


import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Integration } from "./types";
import { 
  Building2, 
  Calculator, 
  FileCode, 
  MoreHorizontal, 
  RefreshCw,
  Trash2, 
  Settings
} from "lucide-react";

interface IntegrationCardProps {
  integration: Integration;
  onSync: (id: string) => void;
  onDelete: (id: string) => void;
  onConfigure: (integration: Integration) => void;
  isSyncing: Record<string, boolean>;
}

export const IntegrationCard = ({ 
  integration, 
  onSync, 
  onDelete, 
  onConfigure,
  isSyncing 
}: IntegrationCardProps) => {
  
  const getIntegrationIcon = (type: Integration["type"]) => {
    switch (type) {
      case "erp":
        return <Building2 className="h-10 w-10 text-blue-500" />;
      case "banking":
        return <Building2 className="h-10 w-10 text-green-500" />;
      case "accounting":
        return <Calculator className="h-10 w-10 text-purple-500" />;
      case "custom":
      case "other":
      default:
        return <FileCode className="h-10 w-10 text-gray-500" />;
    }
  };

  const getStatusBadgeVariant = (status: Integration["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "inactive":
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    }
  };

  return (
    <div className="border rounded-lg p-4 flex items-start gap-4">
      <div className="flex-shrink-0">
        {getIntegrationIcon(integration.type)}
      </div>
      <div className="flex-grow">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-medium">{integration.name}</h3>
            <p className="text-sm text-muted-foreground mb-2">
              Type: {integration.type.toUpperCase()}
            </p>
            <div className="flex items-center gap-2 mb-1">
              <Badge className={getStatusBadgeVariant(integration.status)}>
                {integration.status.charAt(0).toUpperCase() + integration.status.slice(1)}
              </Badge>
              <span className="text-xs text-muted-foreground">
                Last sync: {integration.lastSync}
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onSync(integration.id)}
              disabled={isSyncing[integration.id]}
            >
              {isSyncing[integration.id] ? (
                <RefreshCw className="h-4 w-4 mr-1 animate-spin" />
              ) : (
                <RefreshCw className="h-4 w-4 mr-1" />
              )}
              Sync
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onConfigure(integration)}
            >
              <Settings className="h-4 w-4 mr-1" />
              Configure
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => onDelete(integration.id)}
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </div>
        </div>
        {integration.status === "error" && (
          <div className="mt-2 px-3 py-2 bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 text-xs rounded-md">
            Error: Failed to connect to the integration endpoint. Please check credentials and try again.
          </div>
        )}
      </div>
    </div>
  );
};

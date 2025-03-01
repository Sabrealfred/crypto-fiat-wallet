
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Link2, RefreshCw } from "lucide-react";

interface IntegrationInfo {
  type: string;
  system: string; 
  status: "active" | "inactive" | "error";
  lastSync?: string;
  frequency: string;
  syncCount?: number;
}

interface IntegrationMetadataCardProps {
  integrations: IntegrationInfo[];
}

export function IntegrationMetadataCard({ integrations }: IntegrationMetadataCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "inactive":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };

  const getIntegrationTypeIcon = (type: string) => {
    switch (type) {
      case "erp":
        return <Database className="h-4 w-4 text-blue-600" />;
      case "banking":
        return <Link2 className="h-4 w-4 text-purple-600" />;
      default:
        return <Database className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <Card className="border border-blue-100 dark:border-blue-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Data Integration Sources
        </CardTitle>
      </CardHeader>
      <CardContent>
        {integrations.length > 0 ? (
          <div className="space-y-4">
            {integrations.map((integration, index) => (
              <div key={index} className="flex flex-col space-y-2 p-3 border rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-2">
                    {getIntegrationTypeIcon(integration.type)}
                    <div>
                      <h4 className="font-medium">{integration.system}</h4>
                      <p className="text-xs text-muted-foreground capitalize">{integration.type} Integration</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(integration.status)}>
                    {integration.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                  <div className="flex items-center gap-1">
                    <RefreshCw className="h-3 w-3 text-muted-foreground" />
                    <span className="text-muted-foreground">Update frequency:</span>
                  </div>
                  <div>{integration.frequency}</div>
                  
                  <div className="text-muted-foreground">Last synchronized:</div>
                  <div>{integration.lastSync || "Never"}</div>
                  
                  <div className="text-muted-foreground">Total syncs:</div>
                  <div>{integration.syncCount || 0}</div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Database className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p>No data integrations configured</p>
            <p className="text-sm">Add external data sources to automatically sync data</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

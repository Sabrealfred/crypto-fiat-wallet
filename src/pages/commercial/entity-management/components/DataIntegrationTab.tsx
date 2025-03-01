
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Database, RefreshCw, AlertCircle, CheckCircle2, Clock, ArrowUpDown } from "lucide-react";
import { IntegrationForm } from "./IntegrationForm";

interface DataIntegrationTabProps {
  entityId: number;
  entityName: string;
}

type IntegrationType = "erp" | "banking" | "accounting" | "market" | "custom";
type IntegrationStatus = "active" | "inactive" | "error" | "pending";

interface Integration {
  id: number;
  name: string;
  type: IntegrationType;
  provider: string;
  status: IntegrationStatus;
  lastSync: string;
  syncFrequency: string;
  dataPoints: number;
}

export function DataIntegrationTab({ entityId, entityName }: DataIntegrationTabProps) {
  const [activeTab, setActiveTab] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Example demo integrations
  const integrations: Integration[] = [
    {
      id: 1,
      name: "Financial ERP",
      type: "erp",
      provider: "SAP",
      status: "active",
      lastSync: "10 minutes ago",
      syncFrequency: "Hourly",
      dataPoints: 1243
    },
    {
      id: 2,
      name: "Corporate Banking",
      type: "banking",
      provider: "Plaid API",
      status: "active",
      lastSync: "35 minutes ago",
      syncFrequency: "Real-time",
      dataPoints: 583
    },
    {
      id: 3,
      name: "Accounting System",
      type: "accounting",
      provider: "QuickBooks",
      status: "inactive",
      lastSync: "3 days ago",
      syncFrequency: "Daily",
      dataPoints: 892
    },
    {
      id: 4,
      name: "Market Data Feed",
      type: "market",
      provider: "Bloomberg",
      status: "error",
      lastSync: "Failed 2 hours ago",
      syncFrequency: "Every 15 min",
      dataPoints: 0
    },
    {
      id: 5,
      name: "Custom API Integration",
      type: "custom",
      provider: "Internal System",
      status: "pending",
      lastSync: "Never",
      syncFrequency: "Hourly",
      dataPoints: 0
    }
  ];
  
  const filteredIntegrations = activeTab === "all" 
    ? integrations 
    : integrations.filter(integration => integration.type === activeTab);
  
  const getStatusColor = (status: IntegrationStatus) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "inactive":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "error":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "pending":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400";
    }
  };
  
  const getStatusIcon = (status: IntegrationStatus) => {
    switch (status) {
      case "active":
        return <CheckCircle2 className="h-4 w-4" />;
      case "inactive":
        return <Clock className="h-4 w-4" />;
      case "error":
        return <AlertCircle className="h-4 w-4" />;
      case "pending":
        return <RefreshCw className="h-4 w-4" />;
      default:
        return null;
    }
  };
  
  const getIntegrationTypeIcon = (type: IntegrationType) => {
    switch (type) {
      case "erp":
        return <Database className="h-4 w-4 text-blue-600" />;
      case "banking":
        return <ArrowUpDown className="h-4 w-4 text-purple-600" />;
      default:
        return <Database className="h-4 w-4 text-blue-600" />;
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Data Integrations</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" /> Add Integration
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px] max-h-[90vh] overflow-y-auto">
            <IntegrationForm 
              entityId={entityId} 
              entityName={entityName} 
              onClose={() => setIsDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
      </div>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle>Connected Data Sources</CardTitle>
          <CardDescription>
            External systems integrated with this entity
          </CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="px-6 border-b">
              <TabsList className="w-full justify-start -mb-px">
                <TabsTrigger value="all" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  All
                </TabsTrigger>
                <TabsTrigger value="erp" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  ERP
                </TabsTrigger>
                <TabsTrigger value="banking" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  Banking
                </TabsTrigger>
                <TabsTrigger value="accounting" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  Accounting
                </TabsTrigger>
                <TabsTrigger value="market" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  Market Data
                </TabsTrigger>
                <TabsTrigger value="custom" className="data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none">
                  Custom
                </TabsTrigger>
              </TabsList>
            </div>
            
            <TabsContent value="all" className="m-0">
              <div className="divide-y">
                {filteredIntegrations.length > 0 ? (
                  filteredIntegrations.map((integration) => (
                    <div key={integration.id} className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                          {getIntegrationTypeIcon(integration.type)}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{integration.name}</h3>
                            <Badge className={getStatusColor(integration.status)}>
                              <span className="flex items-center gap-1">
                                {getStatusIcon(integration.status)}
                                {integration.status}
                              </span>
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Provider: {integration.provider}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mt-4 md:mt-0">
                        <div className="text-sm">
                          <p className="text-muted-foreground">Last synchronized</p>
                          <p>{integration.lastSync}</p>
                        </div>
                        <div className="text-sm">
                          <p className="text-muted-foreground">Frequency</p>
                          <p>{integration.syncFrequency}</p>
                        </div>
                        <div className="text-sm">
                          <p className="text-muted-foreground">Data points</p>
                          <p>{integration.dataPoints.toLocaleString()}</p>
                        </div>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <RefreshCw className="h-3 w-3" /> Sync Now
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-muted-foreground px-6">
                    <Database className="h-12 w-12 mx-auto mb-3 opacity-20" />
                    <p>No integrations configured</p>
                    <p className="text-sm mt-1">Add your first integration to start syncing data</p>
                  </div>
                )}
              </div>
            </TabsContent>
            
            {["erp", "banking", "accounting", "market", "custom"].map((tab) => (
              <TabsContent key={tab} value={tab} className="m-0">
                <div className="divide-y">
                  {filteredIntegrations.length > 0 ? (
                    filteredIntegrations.map((integration) => (
                      <div key={integration.id} className="flex flex-col md:flex-row md:items-center justify-between px-6 py-4">
                        <div className="flex items-start gap-3">
                          <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-md">
                            {getIntegrationTypeIcon(integration.type as IntegrationType)}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">{integration.name}</h3>
                              <Badge className={getStatusColor(integration.status)}>
                                <span className="flex items-center gap-1">
                                  {getStatusIcon(integration.status)}
                                  {integration.status}
                                </span>
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Provider: {integration.provider}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mt-4 md:mt-0">
                          <div className="text-sm">
                            <p className="text-muted-foreground">Last synchronized</p>
                            <p>{integration.lastSync}</p>
                          </div>
                          <div className="text-sm">
                            <p className="text-muted-foreground">Frequency</p>
                            <p>{integration.syncFrequency}</p>
                          </div>
                          <div className="text-sm">
                            <p className="text-muted-foreground">Data points</p>
                            <p>{integration.dataPoints.toLocaleString()}</p>
                          </div>
                          <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <RefreshCw className="h-3 w-3" /> Sync Now
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground px-6">
                      <Database className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p>No {tab} integrations configured</p>
                      <p className="text-sm mt-1">Add your first integration to start syncing data</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Share2, Plus, Database, RefreshCw, PlugZap, Building2, Server, CreditCard, Boxes, ChevronRight, X, Check, AlertCircle } from "lucide-react";

interface EntityIntegrationsProps {
  entityId: number;
  entityName: string;
}

type IntegrationType = "erp" | "banking" | "accounting" | "payment" | "custom";

interface Integration {
  id: string;
  name: string;
  type: IntegrationType;
  provider: string;
  status: "active" | "inactive" | "error" | "pending";
  lastSync: string;
  syncFrequency: string;
}

export const EntityIntegrations = ({ entityId, entityName }: EntityIntegrationsProps) => {
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: "1",
      name: "SAP ERP Integration",
      type: "erp",
      provider: "SAP",
      status: "active",
      lastSync: "2023-12-10 14:30",
      syncFrequency: "Every 6 hours"
    },
    {
      id: "2",
      name: "HSBC Banking API",
      type: "banking",
      provider: "HSBC",
      status: "active",
      lastSync: "2023-12-10 12:00",
      syncFrequency: "Hourly"
    },
    {
      id: "3",
      name: "Xero Accounting",
      type: "accounting",
      provider: "Xero",
      status: "error",
      lastSync: "2023-12-09 23:45",
      syncFrequency: "Daily"
    }
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [syncingId, setSyncingId] = useState<string | null>(null);

  const integrationForm = useForm({
    defaultValues: {
      name: "",
      type: "erp" as IntegrationType,
      provider: "",
      apiKey: "",
      endpoint: "",
      syncFrequency: "daily",
      autoSync: true
    }
  });

  const handleAddIntegration = (data: any) => {
    const newIntegration: Integration = {
      id: Date.now().toString(),
      name: data.name,
      type: data.type,
      provider: data.provider,
      status: "pending",
      lastSync: "Never",
      syncFrequency: data.syncFrequency === "hourly" ? "Hourly" : 
                      data.syncFrequency === "daily" ? "Daily" : 
                      data.syncFrequency === "weekly" ? "Weekly" : "Monthly"
    };

    setIntegrations([...integrations, newIntegration]);
    toast.success("Integration added successfully");
    setIsAdding(false);
    integrationForm.reset();
  };

  const handleSync = (id: string) => {
    setSyncingId(id);
    setTimeout(() => {
      setIntegrations(integrations.map(integration => 
        integration.id === id 
          ? {...integration, lastSync: new Date().toLocaleString(), status: "active"} 
          : integration
      ));
      setSyncingId(null);
      toast.success("Integration synced successfully");
    }, 2000);
  };

  const handleDelete = (id: string) => {
    setIntegrations(integrations.filter(integration => integration.id !== id));
    toast.success("Integration removed successfully");
  };

  const getIntegrationIcon = (type: IntegrationType) => {
    switch (type) {
      case "erp":
        return <Boxes className="h-5 w-5" />;
      case "banking":
        return <Building2 className="h-5 w-5" />;
      case "accounting":
        return <CreditCard className="h-5 w-5" />;
      case "payment":
        return <Building2 className="h-5 w-5" />;
      case "custom":
        return <Server className="h-5 w-5" />;
    }
  };

  const getStatusBadge = (status: Integration["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">Active</Badge>;
      case "inactive":
        return <Badge variant="outline">Inactive</Badge>;
      case "error":
        return <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">Error</Badge>;
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Pending</Badge>;
    }
  };

  return (
    <>
      <Card className="mb-6 border border-blue-100 dark:border-blue-800">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Share2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              External Integrations
            </CardTitle>
            <Dialog open={isAdding} onOpenChange={setIsAdding}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" /> Add Integration
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[525px]">
                <DialogHeader>
                  <DialogTitle>Add New Integration</DialogTitle>
                  <DialogDescription>
                    Connect {entityName} to an external system to sync data automatically.
                  </DialogDescription>
                </DialogHeader>
                <Form {...integrationForm}>
                  <form onSubmit={integrationForm.handleSubmit(handleAddIntegration)} className="space-y-4">
                    <FormField
                      control={integrationForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Integration Name</FormLabel>
                          <FormControl>
                            <Input placeholder="E.g. SAP ERP Integration" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={integrationForm.control}
                        name="type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Type</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="erp">ERP System</SelectItem>
                                <SelectItem value="banking">Banking API</SelectItem>
                                <SelectItem value="accounting">Accounting System</SelectItem>
                                <SelectItem value="payment">Payment Processor</SelectItem>
                                <SelectItem value="custom">Custom API</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={integrationForm.control}
                        name="provider"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Provider</FormLabel>
                            <FormControl>
                              <Input placeholder="E.g. SAP, Oracle, HSBC" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={integrationForm.control}
                      name="endpoint"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API Endpoint</FormLabel>
                          <FormControl>
                            <Input placeholder="https://api.example.com/v1" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={integrationForm.control}
                      name="apiKey"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>API Key / Authentication</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="••••••••••••••••" {...field} />
                          </FormControl>
                          <FormDescription>
                            This will be stored securely and never displayed again.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={integrationForm.control}
                        name="syncFrequency"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Sync Frequency</FormLabel>
                            <Select 
                              onValueChange={field.onChange} 
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select frequency" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="hourly">Hourly</SelectItem>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={integrationForm.control}
                        name="autoSync"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-end space-x-3 space-y-0 pt-6">
                            <FormControl>
                              <Switch 
                                checked={field.value} 
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>Auto-sync enabled</FormLabel>
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <DialogFooter className="mt-6">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setIsAdding(false)}
                      >
                        Cancel
                      </Button>
                      <Button type="submit">Add Integration</Button>
                    </DialogFooter>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
          </div>
          <CardDescription>
            Connect {entityName} to external systems for automated data exchange
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {integrations.length === 0 ? (
              <div className="p-8 text-center border border-dashed rounded-lg">
                <Share2 className="h-10 w-10 mx-auto mb-4 text-muted-foreground/60" />
                <h3 className="text-lg font-medium mb-2">No integrations configured</h3>
                <p className="text-muted-foreground mb-4">
                  Connect this entity to external systems to automate data exchange
                </p>
                <Button onClick={() => setIsAdding(true)}>
                  <Plus className="h-4 w-4 mr-2" /> Add Integration
                </Button>
              </div>
            ) : (
              integrations.map((integration) => (
                <div
                  key={integration.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-start gap-4 mb-4 sm:mb-0">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                      {getIntegrationIcon(integration.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-medium">{integration.name}</h3>
                        {getStatusBadge(integration.status)}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Provider: {integration.provider} • Sync: {integration.syncFrequency}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Last synced: {integration.lastSync}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-auto">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleSync(integration.id)}
                      disabled={syncingId === integration.id}
                    >
                      <RefreshCw className={`h-4 w-4 mr-2 ${syncingId === integration.id ? "animate-spin" : ""}`} />
                      {syncingId === integration.id ? "Syncing..." : "Sync Now"}
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleDelete(integration.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium mb-4">Available Integration Templates</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { 
                  name: "SAP ERP", 
                  description: "Connect to SAP ERP for financial data",
                  icon: Boxes,
                  type: "erp"
                },
                { 
                  name: "Oracle NetSuite", 
                  description: "Sync with NetSuite ERP system",
                  icon: Boxes,
                  type: "erp"
                },
                { 
                  name: "HSBC Banking API", 
                  description: "Connect to HSBC corporate banking",
                  icon: Building2,
                  type: "banking"
                },
                { 
                  name: "JP Morgan Treasury API", 
                  description: "Treasury management integration",
                  icon: Building2,
                  type: "banking"
                },
                { 
                  name: "Xero Accounting", 
                  description: "Sync financial data with Xero",
                  icon: CreditCard,
                  type: "accounting"
                },
                { 
                  name: "QuickBooks", 
                  description: "Connect to QuickBooks accounting",
                  icon: CreditCard,
                  type: "accounting"
                },
              ].map((template, idx) => (
                <Button
                  key={idx}
                  variant="outline"
                  className="h-auto flex justify-between items-center p-4 text-left"
                  onClick={() => {
                    setIsAdding(true);
                    integrationForm.setValue("name", template.name);
                    integrationForm.setValue("type", template.type as IntegrationType);
                    integrationForm.setValue("provider", template.name.split(" ")[0]);
                  }}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                      <template.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium">{template.name}</h4>
                      <p className="text-xs text-muted-foreground">{template.description}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

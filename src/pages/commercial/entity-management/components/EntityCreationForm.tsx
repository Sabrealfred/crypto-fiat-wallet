
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Building2, Plus, Database, Link, Server, Globe } from "lucide-react";

// List of supported integration types
const integrationTypes = [
  { id: "erp", name: "Enterprise Resource Planning (ERP)", icon: <Database className="w-4 h-4" /> },
  { id: "banking", name: "Banking API", icon: <Building2 className="w-4 h-4" /> },
  { id: "accounting", name: "Accounting Software", icon: <Server className="w-4 h-4" /> },
  { id: "market", name: "Market Data Provider", icon: <Globe className="w-4 h-4" /> },
  { id: "custom", name: "Custom Data Source", icon: <Database className="w-4 h-4" /> },
];

// List of popular systems for each integration type
const integrationSystems = {
  erp: ["SAP", "Oracle ERP", "Microsoft Dynamics", "NetSuite", "Odoo", "Custom"],
  banking: ["Plaid API", "Open Banking", "SWIFT", "Bank Direct Connect", "Custom"],
  accounting: ["QuickBooks", "Xero", "Sage", "FreshBooks", "Custom"],
  market: ["Bloomberg", "Refinitiv", "S&P Capital IQ", "Morningstar", "Custom"],
  custom: ["Manual Data Feed", "Custom API", "File Import", "Database Connection"],
};

export function EntityCreationForm() {
  const [activeTab, setActiveTab] = useState("basic");
  const [selectedIntegrationType, setSelectedIntegrationType] = useState<string | null>(null);
  const [integrations, setIntegrations] = useState<Array<{type: string, system: string, credentials: any}>>([]);

  const form = useForm({
    defaultValues: {
      name: "",
      type: "corporation",
      registrationNumber: "",
      taxId: "",
      description: "",
      industry: "",
      country: "",
      currency: "USD",
      integrationEnabled: false,
      integrationType: "",
      integrationSystem: "",
      apiKey: "",
      apiEndpoint: "",
      apiUsername: "",
      apiPassword: "",
      dataRefreshInterval: "daily",
    },
  });

  const handleAddIntegration = () => {
    const { integrationType, integrationSystem, apiKey, apiEndpoint, apiUsername, apiPassword } = form.getValues();
    
    if (!integrationType || !integrationSystem) {
      toast.error("Please select integration type and system");
      return;
    }

    const newIntegration = {
      type: integrationType,
      system: integrationSystem,
      credentials: {
        apiKey,
        apiEndpoint,
        apiUsername,
        apiPassword,
      }
    };

    setIntegrations([...integrations, newIntegration]);
    
    // Reset integration form fields
    form.setValue("integrationType", "");
    form.setValue("integrationSystem", "");
    form.setValue("apiKey", "");
    form.setValue("apiEndpoint", "");
    form.setValue("apiUsername", "");
    form.setValue("apiPassword", "");
    
    toast.success(`Added ${integrationSystem} integration`);
  };

  const onSubmit = (data: any) => {
    // Here you would typically submit the entity and integration data to your backend
    const entityData = {
      ...data,
      integrations,
      createdAt: new Date().toISOString(),
    };
    
    console.log("Entity data to submit:", entityData);
    toast.success("Entity created successfully");
    
    // Reset form after submission
    form.reset();
    setIntegrations([]);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-6">
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="integrations">Data Integrations</TabsTrigger>
            <TabsTrigger value="review">Review</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Entity Details</CardTitle>
                <CardDescription>Enter the basic information about the entity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entity Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Acme Corporation" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Entity Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select entity type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="corporation">Corporation</SelectItem>
                            <SelectItem value="llc">LLC</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="subsidiary">Subsidiary</SelectItem>
                            <SelectItem value="branch">Branch</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="registrationNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registration Number</FormLabel>
                        <FormControl>
                          <Input placeholder="123456789" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="taxId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tax ID</FormLabel>
                        <FormControl>
                          <Input placeholder="Tax ID" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="industry"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Industry</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select industry" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="finance">Financial Services</SelectItem>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Country</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="au">Australia</SelectItem>
                            <SelectItem value="mx">Mexico</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="currency"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Primary Currency</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select currency" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                            <SelectItem value="GBP">GBP - British Pound</SelectItem>
                            <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                            <SelectItem value="MXN">MXN - Mexican Peso</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Brief description of the entity" 
                          className="min-h-[100px]" 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end">
                  <Button 
                    type="button" 
                    onClick={() => setActiveTab("integrations")}
                  >
                    Continue to Integrations
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">External Data Integrations</CardTitle>
                <CardDescription>
                  Connect this entity to external systems such as ERP, banking APIs, and more
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="integrationEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 mb-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Enable Data Integration</FormLabel>
                        <FormDescription>
                          Connect to external systems to automatically pull data
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                {form.watch("integrationEnabled") && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="integrationType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Integration Type</FormLabel>
                            <Select 
                              onValueChange={(value) => {
                                field.onChange(value);
                                setSelectedIntegrationType(value);
                                form.setValue("integrationSystem", "");
                              }} 
                              value={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {integrationTypes.map((type) => (
                                  <SelectItem key={type.id} value={type.id}>
                                    <span className="flex items-center gap-2">
                                      {type.icon} {type.name}
                                    </span>
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {selectedIntegrationType && (
                        <FormField
                          control={form.control}
                          name="integrationSystem"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>System</FormLabel>
                              <Select onValueChange={field.onChange} value={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select system" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {integrationSystems[selectedIntegrationType as keyof typeof integrationSystems]?.map((system) => (
                                    <SelectItem key={system} value={system}>
                                      {system}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}

                      <FormField
                        control={form.control}
                        name="apiEndpoint"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>API Endpoint URL</FormLabel>
                            <FormControl>
                              <Input placeholder="https://api.example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="apiKey"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>API Key (if required)</FormLabel>
                            <FormControl>
                              <Input placeholder="API Key" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="apiUsername"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username (if required)</FormLabel>
                            <FormControl>
                              <Input placeholder="Username" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="apiPassword"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password (if required)</FormLabel>
                            <FormControl>
                              <Input placeholder="Password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="dataRefreshInterval"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Data Refresh Interval</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select interval" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="realtime">Real-time</SelectItem>
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
                    </div>
                    
                    <div className="flex justify-end">
                      <Button 
                        type="button" 
                        onClick={handleAddIntegration}
                        className="flex items-center gap-2"
                      >
                        <Plus size={16} /> Add Integration
                      </Button>
                    </div>
                    
                    {integrations.length > 0 && (
                      <div className="mt-6">
                        <h3 className="font-medium mb-2">Added Integrations</h3>
                        <ul className="space-y-2">
                          {integrations.map((integration, index) => (
                            <li key={index} className="flex items-center gap-2 p-2 rounded border">
                              <Link className="h-4 w-4" />
                              <span>{integration.system} ({integration.type})</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setActiveTab("basic")}
                  >
                    Back
                  </Button>
                  <Button 
                    type="button" 
                    onClick={() => setActiveTab("review")}
                  >
                    Continue to Review
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="review" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Review & Create</CardTitle>
                <CardDescription>
                  Review the entity information before creating it
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium">Entity Details</h3>
                    <dl className="space-y-2 mt-2">
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Name:</dt>
                        <dd>{form.watch("name") || "—"}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Type:</dt>
                        <dd className="capitalize">{form.watch("type") || "—"}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Registration Number:</dt>
                        <dd>{form.watch("registrationNumber") || "—"}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Tax ID:</dt>
                        <dd>{form.watch("taxId") || "—"}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Industry:</dt>
                        <dd className="capitalize">{form.watch("industry") || "—"}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Country:</dt>
                        <dd className="uppercase">{form.watch("country") || "—"}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-sm text-muted-foreground">Currency:</dt>
                        <dd>{form.watch("currency") || "—"}</dd>
                      </div>
                    </dl>
                  </div>
                  
                  <div>
                    <h3 className="font-medium">Data Integrations</h3>
                    {integrations.length > 0 ? (
                      <ul className="space-y-2 mt-2">
                        {integrations.map((integration, index) => (
                          <li key={index} className="text-sm border p-2 rounded-md">
                            <div className="flex justify-between">
                              <span className="font-medium">{integration.system}</span>
                              <span className="text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 px-2 py-0.5 rounded">{integration.type}</span>
                            </div>
                            <div className="mt-1 text-muted-foreground">
                              Endpoint: {integration.credentials.apiEndpoint || "—"}
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-sm text-muted-foreground mt-2">No integrations configured</p>
                    )}
                  </div>
                </div>
                
                <div className="border-t pt-4 mt-4">
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-sm">{form.watch("description") || "No description provided."}</p>
                </div>
                
                <div className="flex justify-between mt-6">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setActiveTab("integrations")}
                  >
                    Back
                  </Button>
                  <Button type="submit">
                    Create Entity
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </Form>
  );
}

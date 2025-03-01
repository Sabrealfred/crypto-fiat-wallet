
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Building2, Database, Link2, FileText } from "lucide-react";
import { toast } from "sonner";

interface EntityCreationFormProps {
  onEntityCreated?: (entityData: any) => void;
  onClose?: () => void;
}

export function EntityCreationForm({ onEntityCreated, onClose }: EntityCreationFormProps) {
  const form = useForm({
    defaultValues: {
      name: "",
      type: "subsidiary",
      registrationNumber: "",
      taxId: "",
      industry: "",
      country: "",
      city: "",
      address: "",
      createDataIntegration: false,
      integrationPreference: "erp",
      erpSystem: "",
      setupDataFeeds: false
    },
  });

  const handleSubmit = (data: any) => {
    console.log("Entity creation data:", data);
    toast.success(`Entity "${data.name}" created successfully`);
    if (onEntityCreated) {
      onEntityCreated(data);
    }
    if (onClose) {
      onClose();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5 text-primary" />
          Create New Entity
        </CardTitle>
        <CardDescription>
          Add a new corporate entity to your organization structure
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} id="entity-creation-form">
            <Tabs defaultValue="basic" className="space-y-6">
              <TabsList className="grid grid-cols-3 w-full">
                <TabsTrigger value="basic" className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  Basic Info
                </TabsTrigger>
                <TabsTrigger value="integration" className="flex items-center gap-2">
                  <Database className="h-4 w-4" />
                  Data Integration
                </TabsTrigger>
                <TabsTrigger value="relationships" className="flex items-center gap-2">
                  <Link2 className="h-4 w-4" />
                  Relationships
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="basic">
                <div className="grid gap-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Entity Name</FormLabel>
                          <FormControl>
                            <Input placeholder="ACME Global Ltd" {...field} />
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
                              <SelectItem value="subsidiary">Subsidiary</SelectItem>
                              <SelectItem value="branch">Branch Office</SelectItem>
                              <SelectItem value="division">Division</SelectItem>
                              <SelectItem value="holding">Holding Company</SelectItem>
                              <SelectItem value="partnership">Partnership</SelectItem>
                              <SelectItem value="joint-venture">Joint Venture</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="registrationNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Registration Number</FormLabel>
                          <FormControl>
                            <Input placeholder="12345678" {...field} />
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
                            <Input placeholder="AB123456789" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
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
                            <SelectItem value="financial-services">Financial Services</SelectItem>
                            <SelectItem value="technology">Technology</SelectItem>
                            <SelectItem value="manufacturing">Manufacturing</SelectItem>
                            <SelectItem value="healthcare">Healthcare</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="energy">Energy</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Separator className="my-2" />
                  
                  <h3 className="text-sm font-medium">Location Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                              <SelectItem value="de">Germany</SelectItem>
                              <SelectItem value="fr">France</SelectItem>
                              <SelectItem value="jp">Japan</SelectItem>
                              <SelectItem value="sg">Singapore</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="city"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input placeholder="New York" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Registered Address</FormLabel>
                        <FormControl>
                          <Input placeholder="123 Financial Street" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>
              
              <TabsContent value="integration">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="createDataIntegration"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <div className="flex items-center gap-2">
                            <Database className="h-4 w-4 text-primary" />
                            <FormLabel className="font-medium">Setup Data Integration</FormLabel>
                          </div>
                          <FormDescription>
                            Configure a data source connection for this entity
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
                  
                  {form.watch("createDataIntegration") && (
                    <div className="space-y-4 pl-4 border-l-2 border-blue-200 dark:border-blue-800">
                      <FormField
                        control={form.control}
                        name="integrationPreference"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Integration Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select integration type" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="erp">
                                  <div className="flex items-center gap-2">
                                    <Database className="h-4 w-4" />
                                    <span>ERP System</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="accounting">
                                  <div className="flex items-center gap-2">
                                    <FileText className="h-4 w-4" />
                                    <span>Accounting Software</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="banking">
                                  <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-landmark"><line x1="3" x2="21" y1="22" y2="22"></line><line x1="6" x2="6" y1="18" y2="11"></line><line x1="10" x2="10" y1="18" y2="11"></line><line x1="14" x2="14" y1="18" y2="11"></line><line x1="18" x2="18" y1="18" y2="11"></line><polygon points="12 2 20 7 4 7"></polygon></svg>
                                    <span>Banking System</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="manual">
                                  <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" x2="12" y1="3" y2="15"></line></svg>
                                    <span>Manual File Upload</span>
                                  </div>
                                </SelectItem>
                                <SelectItem value="custom">
                                  <div className="flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-code"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
                                    <span>Custom API</span>
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Choose the type of system to connect to
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      {form.watch("integrationPreference") === "erp" && (
                        <FormField
                          control={form.control}
                          name="erpSystem"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>ERP Provider</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select ERP system" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="sap">SAP</SelectItem>
                                  <SelectItem value="oracle">Oracle ERP</SelectItem>
                                  <SelectItem value="netsuite">NetSuite</SelectItem>
                                  <SelectItem value="dynamics">Microsoft Dynamics</SelectItem>
                                  <SelectItem value="sage">Sage</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                The specific ERP system used by this entity
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      
                      {form.watch("integrationPreference") === "accounting" && (
                        <FormField
                          control={form.control}
                          name="accountingSystem"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Accounting Provider</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select accounting system" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="quickbooks">QuickBooks</SelectItem>
                                  <SelectItem value="xero">Xero</SelectItem>
                                  <SelectItem value="freshbooks">FreshBooks</SelectItem>
                                  <SelectItem value="wave">Wave</SelectItem>
                                  <SelectItem value="sage">Sage</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormDescription>
                                The specific accounting software used by this entity
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      )}
                      
                      <FormField
                        control={form.control}
                        name="setupDataFeeds"
                        render={({ field }) => (
                          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                            <div className="space-y-0.5">
                              <FormLabel>Configure Now</FormLabel>
                              <FormDescription>
                                Setup integration immediately after entity creation
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
                      
                      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
                        <p className="text-sm text-blue-800 dark:text-blue-400">
                          You can configure data integration details after entity creation. The system will guide you through the connection process.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="relationships">
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="parentEntity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Parent Entity</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select parent entity" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="none">None (Top-level Entity)</SelectItem>
                            <SelectItem value="1">ACME Global Holdings</SelectItem>
                            <SelectItem value="2">European Operations Ltd</SelectItem>
                            <SelectItem value="3">North America Division Inc</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          The parent entity in your organizational structure
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="ownershipPercent"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Ownership Percentage</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input type="number" min="0" max="100" {...field} />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                              %
                            </div>
                          </div>
                        </FormControl>
                        <FormDescription>
                          The percentage owned by the parent entity
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <h3 className="text-sm font-medium mt-4">Additional Relationships</h3>
                  
                  <div className="border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      Additional relationships can be configured after entity creation, including bank accounts, vendors, customers, and key personnel.
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={onClose}>Cancel</Button>
        <Button type="submit" form="entity-creation-form">Create Entity</Button>
      </CardFooter>
    </Card>
  );
}

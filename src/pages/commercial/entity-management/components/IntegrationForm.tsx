
import { useState } from "react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Database, FileText, UploadCloud, Lock, RefreshCw, CheckCircle2, Key } from "lucide-react";

interface IntegrationFormProps {
  entityId: number;
  entityName: string;
  onClose?: () => void;
}

export const IntegrationForm = ({ entityId, entityName, onClose }: IntegrationFormProps) => {
  const [activeTab, setActiveTab] = useState("api");
  const [testingConnection, setTestingConnection] = useState(false);
  const [connectionTested, setConnectionTested] = useState(false);
  
  const apiForm = useForm({
    defaultValues: {
      apiEndpoint: "",
      apiKey: "",
      authenticationType: "bearer",
      webhookEnabled: true,
      refreshRate: "hourly"
    }
  });
  
  const fileUploadForm = useForm({
    defaultValues: {
      fileType: "csv",
      delimiter: ",",
      hasHeaders: true
    }
  });
  
  const erpForm = useForm({
    defaultValues: {
      provider: "quickbooks",
      connectionType: "oauth",
      syncEntities: true,
      syncTransactions: true,
      syncContacts: true
    }
  });
  
  const testConnection = () => {
    setTestingConnection(true);
    
    // Simulate API call to test connection
    setTimeout(() => {
      setTestingConnection(false);
      setConnectionTested(true);
      toast.success("Connection test successful!");
    }, 2000);
  };
  
  const onSubmitApi = (data: any) => {
    console.log("API Integration data:", data);
    toast.success(`Integration for ${entityName} created successfully`);
    onClose?.();
  };
  
  const onSubmitFileUpload = (data: any) => {
    console.log("File upload data:", data);
    toast.success(`File upload integration for ${entityName} configured successfully`);
    onClose?.();
  };
  
  const onSubmitErp = (data: any) => {
    console.log("ERP integration data:", data);
    toast.success(`ERP integration for ${entityName} configured successfully`);
    onClose?.();
  };
  
  return (
    <Card className="border border-blue-100 dark:border-blue-800">
      <CardHeader>
        <CardTitle className="text-lg font-medium">
          Configure Data Integration for {entityName}
        </CardTitle>
        <CardDescription>
          Connect to external systems to automatically sync data for this entity
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="api" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="api" className="flex items-center gap-2">
              <Database className="h-4 w-4" />
              API Integration
            </TabsTrigger>
            <TabsTrigger value="file-upload" className="flex items-center gap-2">
              <UploadCloud className="h-4 w-4" />
              File Upload
            </TabsTrigger>
            <TabsTrigger value="erp" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              ERP/Accounting
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="api" className="space-y-4">
            <Form {...apiForm}>
              <form onSubmit={apiForm.handleSubmit(onSubmitApi)} className="space-y-4">
                <FormField
                  control={apiForm.control}
                  name="apiEndpoint"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Endpoint URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://api.example.com/v1" {...field} />
                      </FormControl>
                      <FormDescription>
                        The base URL for the API that provides data for this entity
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={apiForm.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key/Token</FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Input type="password" placeholder="Your API key or token" {...field} />
                          <Lock className="absolute right-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        </div>
                      </FormControl>
                      <FormDescription>
                        Securely stored and used for authentication
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={apiForm.control}
                  name="authenticationType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Authentication Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select authentication type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="bearer">Bearer Token</SelectItem>
                          <SelectItem value="basic">Basic Auth</SelectItem>
                          <SelectItem value="api-key">API Key Header</SelectItem>
                          <SelectItem value="oauth2">OAuth 2.0</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The authentication method required by the API
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={apiForm.control}
                  name="refreshRate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data Refresh Rate</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select refresh frequency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="realtime">Real-time</SelectItem>
                          <SelectItem value="hourly">Hourly</SelectItem>
                          <SelectItem value="daily">Daily</SelectItem>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="manual">Manual Only</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        How frequently data should be synchronized
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={apiForm.control}
                  name="webhookEnabled"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>Enable Webhooks</FormLabel>
                        <FormDescription>
                          Receive notifications when data changes
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
                
                <div className="flex space-x-2 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={testConnection}
                    disabled={testingConnection}
                    className="gap-2"
                  >
                    {testingConnection ? (
                      <>
                        <RefreshCw className="h-4 w-4 animate-spin" /> Testing...
                      </>
                    ) : connectionTested ? (
                      <>
                        <CheckCircle2 className="h-4 w-4 text-green-600" /> Verified
                      </>
                    ) : (
                      <>
                        <Key className="h-4 w-4" /> Test Connection
                      </>
                    )}
                  </Button>
                  <Button type="submit">Save Integration</Button>
                </div>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="file-upload" className="space-y-4">
            <Form {...fileUploadForm}>
              <form onSubmit={fileUploadForm.handleSubmit(onSubmitFileUpload)} className="space-y-4">
                <FormField
                  control={fileUploadForm.control}
                  name="fileType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>File Type</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select file type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="csv">CSV</SelectItem>
                          <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
                          <SelectItem value="json">JSON</SelectItem>
                          <SelectItem value="xml">XML</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The format of the data file you'll be uploading
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                {fileUploadForm.watch("fileType") === "csv" && (
                  <FormField
                    control={fileUploadForm.control}
                    name="delimiter"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>CSV Delimiter</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select delimiter" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value=",">Comma (,)</SelectItem>
                            <SelectItem value=";">Semicolon (;)</SelectItem>
                            <SelectItem value="\t">Tab</SelectItem>
                            <SelectItem value="|">Pipe (|)</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          The character used to separate values in your CSV file
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
                
                <FormField
                  control={fileUploadForm.control}
                  name="hasHeaders"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                      <div className="space-y-0.5">
                        <FormLabel>File Has Headers</FormLabel>
                        <FormDescription>
                          First row contains column names
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
                
                <div className="border-dashed border-2 border-gray-300 p-6 rounded-lg text-center">
                  <UploadCloud className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground mb-2">
                    Drag and drop files here, or click to browse
                  </p>
                  <Button type="button" variant="outline" size="sm">
                    Choose File
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">
                    Supported formats: CSV, XLSX, JSON, XML
                  </p>
                </div>
                
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="submit">Configure Upload</Button>
                </div>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="erp" className="space-y-4">
            <Form {...erpForm}>
              <form onSubmit={erpForm.handleSubmit(onSubmitErp)} className="space-y-4">
                <FormField
                  control={erpForm.control}
                  name="provider"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ERP/Accounting Provider</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select provider" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="quickbooks">QuickBooks</SelectItem>
                          <SelectItem value="xero">Xero</SelectItem>
                          <SelectItem value="sage">Sage</SelectItem>
                          <SelectItem value="netsuite">NetSuite</SelectItem>
                          <SelectItem value="sap">SAP</SelectItem>
                          <SelectItem value="dynamics">Microsoft Dynamics</SelectItem>
                          <SelectItem value="oracle">Oracle ERP</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        The ERP or accounting system this entity uses
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={erpForm.control}
                  name="connectionType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Connection Method</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select connection method" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="oauth">OAuth (Recommended)</SelectItem>
                          <SelectItem value="api-key">API Key</SelectItem>
                          <SelectItem value="credentials">Username/Password</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        How to authenticate with the ERP system
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="space-y-4 border rounded-lg p-4">
                  <h3 className="text-sm font-medium">Data to Synchronize</h3>
                  
                  <FormField
                    control={erpForm.control}
                    name="syncEntities"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel className="text-sm">Entities & Structure</FormLabel>
                          <FormDescription className="text-xs">
                            Company structure, subsidiaries, departments
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
                  
                  <FormField
                    control={erpForm.control}
                    name="syncTransactions"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel className="text-sm">Transactions & Accounts</FormLabel>
                          <FormDescription className="text-xs">
                            Financial transactions, account balances
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
                  
                  <FormField
                    control={erpForm.control}
                    name="syncContacts"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel className="text-sm">Contacts & Relationships</FormLabel>
                          <FormDescription className="text-xs">
                            Vendors, customers, partners
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
                </div>
                
                <div className="pt-4 flex justify-end space-x-2">
                  <Button type="button" variant="outline">
                    Authenticate with Provider
                  </Button>
                  <Button type="submit">Save Configuration</Button>
                </div>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

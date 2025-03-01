
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Database, 
  FileUp, 
  Link2, 
  FileSpreadsheet,
  RefreshCw,
  Calculator,
  Building2,
  ChevronRight,
  Code
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export function OnboardingOptions() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
  const erpForm = useForm({
    defaultValues: {
      apiUrl: "",
      apiKey: "",
      organization: "",
    },
  });

  const databaseForm = useForm({
    defaultValues: {
      host: "",
      port: "",
      database: "",
      username: "",
      password: "",
    },
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      
      // Simulate file upload
      setTimeout(() => {
        toast.success(`${file.name} uploaded successfully. Processing data...`);
        setLoading(false);
        
        // Simulate processing completion
        setTimeout(() => {
          toast.success("Data processing complete. Entities loaded.");
          navigate("/commercial/entity-management");
        }, 2000);
      }, 1500);
    }
  };

  const handleERPConnect = (data: any) => {
    setLoading(true);
    
    // Simulate API connection
    setTimeout(() => {
      toast.success(`Connected to ERP system. Syncing entity data...`);
      setLoading(false);
      
      // Simulate sync completion
      setTimeout(() => {
        toast.success("Entity data synchronized from ERP system.");
        navigate("/commercial/entity-management");
      }, 2000);
    }, 1500);
  };

  const handleDatabaseConnect = (data: any) => {
    setLoading(true);
    
    // Simulate database connection
    setTimeout(() => {
      toast.success(`Connected to database. Importing entity structure...`);
      setLoading(false);
      
      // Simulate import completion
      setTimeout(() => {
        toast.success("Entity structure imported from database.");
        navigate("/commercial/entity-management");
      }, 2000);
    }, 1500);
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">Entity Management Onboarding</CardTitle>
        <CardDescription>
          Choose how you want to set up your corporate entity structure. You can connect to an existing system, upload data, or start fresh.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="erp">
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="erp" className="flex flex-col items-center p-3">
              <Calculator className="h-5 w-5 mb-1" />
              <span>ERP Integration</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="flex flex-col items-center p-3">
              <Database className="h-5 w-5 mb-1" />
              <span>Database</span>
            </TabsTrigger>
            <TabsTrigger value="file" className="flex flex-col items-center p-3">
              <FileSpreadsheet className="h-5 w-5 mb-1" />
              <span>File Upload</span>
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex flex-col items-center p-3">
              <Building2 className="h-5 w-5 mb-1" />
              <span>Manual Setup</span>
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="erp" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div 
                className="border rounded-lg p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-accent/50 transition-colors" 
                onClick={() => erpForm.setValue("organization", "quickbooks")}
              >
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Calculator className="h-6 w-6 text-primary" />
                </div>
                <span className="font-medium">QuickBooks</span>
              </div>
              <div 
                className="border rounded-lg p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-accent/50 transition-colors" 
                onClick={() => erpForm.setValue("organization", "sap")}
              >
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Building2 className="h-6 w-6 text-primary" />
                </div>
                <span className="font-medium">SAP</span>
              </div>
              <div 
                className="border rounded-lg p-4 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-accent/50 transition-colors" 
                onClick={() => erpForm.setValue("organization", "netsuite")}
              >
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Code className="h-6 w-6 text-primary" />
                </div>
                <span className="font-medium">NetSuite</span>
              </div>
            </div>
            
            <Form {...erpForm}>
              <form onSubmit={erpForm.handleSubmit(handleERPConnect)} className="space-y-4">
                <FormField
                  control={erpForm.control}
                  name="apiUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://api.example.com/v1" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your ERP system API endpoint
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={erpForm.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>API Key</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••••••••••" {...field} />
                      </FormControl>
                      <FormDescription>
                        Your API authentication key
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={erpForm.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>ERP System</FormLabel>
                      <FormControl>
                        <Input placeholder="Select an ERP system above" {...field} readOnly />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Link2 className="h-4 w-4 mr-2" />} 
                  Connect to ERP
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="database" className="space-y-4">
            <Form {...databaseForm}>
              <form onSubmit={databaseForm.handleSubmit(handleDatabaseConnect)} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={databaseForm.control}
                    name="host"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Host</FormLabel>
                        <FormControl>
                          <Input placeholder="db.example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={databaseForm.control}
                    name="port"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Port</FormLabel>
                        <FormControl>
                          <Input placeholder="5432" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <FormField
                  control={databaseForm.control}
                  name="database"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Database Name</FormLabel>
                      <FormControl>
                        <Input placeholder="entity_management" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={databaseForm.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input placeholder="dbuser" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={databaseForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="••••••••••••••••" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> : <Database className="h-4 w-4 mr-2" />} 
                  Connect to Database
                </Button>
              </form>
            </Form>
          </TabsContent>
          
          <TabsContent value="file" className="space-y-6">
            <div className="border-2 border-dashed rounded-lg p-10 text-center">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <FileUp className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium">Upload Entity Data</h3>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop your CSV, Excel, or JSON file here, or click to browse
                  </p>
                </div>
                <Input 
                  type="file" 
                  className="max-w-sm"
                  accept=".csv,.xlsx,.json"
                  onChange={handleFileUpload}
                  disabled={loading}
                />
                <p className="text-xs text-muted-foreground">
                  Supported formats: CSV, Excel (.xlsx), JSON
                </p>
              </div>
            </div>
            
            <div className="bg-muted p-4 rounded-lg">
              <h4 className="font-medium mb-2">Template Files</h4>
              <p className="text-sm text-muted-foreground mb-4">
                Download a template file to see the required format for entity data
              </p>
              <div className="flex flex-wrap gap-2">
                <Button variant="outline" size="sm">
                  <FileSpreadsheet className="h-4 w-4 mr-2" /> Excel Template
                </Button>
                <Button variant="outline" size="sm">
                  <FileSpreadsheet className="h-4 w-4 mr-2" /> CSV Template
                </Button>
                <Button variant="outline" size="sm">
                  <Code className="h-4 w-4 mr-2" /> JSON Template
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="manual" className="space-y-4">
            <div className="text-center py-6">
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2 max-w-md mx-auto">
                  <h3 className="font-medium">Start with Manual Setup</h3>
                  <p className="text-sm text-muted-foreground">
                    Begin by adding your parent company and organizational structure manually. 
                    You can add subsidiaries, representatives, and other entity types as needed.
                  </p>
                </div>
                <Button 
                  onClick={() => navigate("/commercial/entity-management")}
                  className="gap-2"
                >
                  Start Manual Setup <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Building2 className="h-4 w-4" /> Step 1
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Create your primary parent organization
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Link2 className="h-4 w-4" /> Step 2
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Add subsidiaries and related entities
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-muted/50">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <FileSpreadsheet className="h-4 w-4" /> Step 3
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Configure entity metadata and relationships
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-6">
        <Button variant="outline" onClick={() => navigate("/commercial")}>
          Cancel
        </Button>
        <Button variant="ghost" onClick={() => toast.info("Help center information displayed")}>
          Need Help?
        </Button>
      </CardFooter>
    </Card>
  );
}

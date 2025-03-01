
import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import {
  DatabaseZap,
  FileSpreadsheet,
  Upload,
  Globe,
  Link,
  Database,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
  Clock,
  BarChart3,
  FileCode,
  CheckCircle,
  XCircle,
  Plus,
  Zap,
  CloudCog,
  BookOpen,
  Shield,
  ServerCog,
  CloudLightning,
  Brain
} from "lucide-react";

// Data source types
const dataSources = [
  {
    id: "market-data",
    name: "Market Data Sources",
    icon: BarChart3,
    description: "Connect to real-time market data providers",
    connectors: [
      { 
        id: "bloomberg", 
        name: "Bloomberg Terminal", 
        logo: "/placeholder.svg", 
        status: "connected",
        lastSync: "2 hours ago"
      },
      { 
        id: "refinitiv", 
        name: "Refinitiv Eikon", 
        logo: "/placeholder.svg", 
        status: "disconnected",
        lastSync: "Never"
      },
      { 
        id: "factset", 
        name: "FactSet", 
        logo: "/placeholder.svg", 
        status: "disconnected",
        lastSync: "Never"
      },
      { 
        id: "alpha-vantage", 
        name: "Alpha Vantage API", 
        logo: "/placeholder.svg", 
        status: "connected",
        lastSync: "1 day ago"
      }
    ]
  },
  {
    id: "accounting",
    name: "Accounting Systems",
    icon: FileSpreadsheet,
    description: "Connect to accounting and ERP systems",
    connectors: [
      { 
        id: "quickbooks", 
        name: "QuickBooks", 
        logo: "/placeholder.svg", 
        status: "connected",
        lastSync: "1 hour ago"
      },
      { 
        id: "sap", 
        name: "SAP", 
        logo: "/placeholder.svg", 
        status: "disconnected",
        lastSync: "Never"
      },
      { 
        id: "oracle", 
        name: "Oracle NetSuite", 
        logo: "/placeholder.svg", 
        status: "disconnected",
        lastSync: "Never"
      },
      { 
        id: "xero", 
        name: "Xero", 
        logo: "/placeholder.svg", 
        status: "pending",
        lastSync: "In progress"
      }
    ]
  },
  {
    id: "custom-data",
    name: "Custom Data Sources",
    icon: Database,
    description: "Connect to your proprietary data sources",
    connectors: [
      { 
        id: "api", 
        name: "REST API", 
        logo: "/placeholder.svg", 
        status: "connected",
        lastSync: "3 hours ago"
      },
      { 
        id: "sftp", 
        name: "SFTP Server", 
        logo: "/placeholder.svg", 
        status: "connected",
        lastSync: "6 hours ago"
      },
      { 
        id: "database", 
        name: "Database Connection", 
        logo: "/placeholder.svg", 
        status: "disconnected",
        lastSync: "Never"
      }
    ]
  },
  {
    id: "ai-models",
    name: "AI & ML Models",
    icon: Brain,
    description: "Connect to AI/ML platforms and models",
    connectors: [
      { 
        id: "openai", 
        name: "OpenAI", 
        logo: "/placeholder.svg", 
        status: "connected",
        lastSync: "5 hours ago"
      },
      { 
        id: "azure-ml", 
        name: "Azure Machine Learning", 
        logo: "/placeholder.svg", 
        status: "disconnected",
        lastSync: "Never"
      },
      { 
        id: "aws-sagemaker", 
        name: "AWS SageMaker", 
        logo: "/placeholder.svg", 
        status: "connected",
        lastSync: "1 day ago"
      }
    ]
  }
];

// Data workflow templates
const workflowTemplates = [
  {
    id: "daily-sync",
    name: "Daily Market Data Sync",
    description: "Automatically sync market data every morning before market open",
    frequency: "Daily at 8:00 AM",
    sources: ["Bloomberg Terminal", "Alpha Vantage API"],
    status: "active"
  },
  {
    id: "accounting-sync",
    name: "Accounting System Sync",
    description: "Sync accounting data from QuickBooks for reconciliation",
    frequency: "Daily at 6:00 PM",
    sources: ["QuickBooks"],
    status: "active"
  },
  {
    id: "portfolio-rebalance",
    name: "Portfolio Rebalancing Check",
    description: "Check portfolios against targets and suggest rebalancing",
    frequency: "Weekly on Monday",
    sources: ["Internal Database", "Bloomberg Terminal"],
    status: "inactive"
  },
  {
    id: "ai-forecast",
    name: "AI Market Forecast",
    description: "Generate market forecasts using machine learning models",
    frequency: "Weekly on Sunday",
    sources: ["OpenAI", "AWS SageMaker", "Market Data"],
    status: "active"
  }
];

// Integration logs
const integrationLogs = [
  {
    id: 1,
    source: "Bloomberg Terminal",
    status: "success",
    message: "Successfully synced market data",
    timestamp: "2023-07-20 08:01:12"
  },
  {
    id: 2,
    source: "QuickBooks",
    status: "success",
    message: "Synced accounting data for 245 transactions",
    timestamp: "2023-07-20 06:00:05"
  },
  {
    id: 3,
    source: "Alpha Vantage API",
    status: "warning",
    message: "API rate limit reached, partial data retrieved",
    timestamp: "2023-07-20 08:05:22"
  },
  {
    id: 4,
    source: "SFTP Server",
    status: "error",
    message: "Connection timeout after 30 seconds",
    timestamp: "2023-07-19 22:15:33"
  },
  {
    id: 5,
    source: "OpenAI",
    status: "success",
    message: "AI model predictions generated successfully",
    timestamp: "2023-07-17 09:30:45"
  }
];

export default function DataIntegrations() {
  const [activeTab, setActiveTab] = useState("sources");
  const [isConnecting, setIsConnecting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showApiForm, setShowApiForm] = useState(false);
  const [apiUrl, setApiUrl] = useState("");
  const [apiKey, setApiKey] = useState("");

  const handleConnect = (connectorId: string) => {
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      toast.success(`Successfully connected to ${connectorId}`);
    }, 1500);
  };

  const handleSyncNow = (dataSourceId: string) => {
    setIsSyncing(true);
    
    // Simulate sync process
    setTimeout(() => {
      setIsSyncing(false);
      toast.success(`Successfully synced data from ${dataSourceId}`);
    }, 2000);
  };

  const handleCreateApiConnection = () => {
    if (!apiUrl) {
      toast.error("API URL is required");
      return;
    }
    
    setIsConnecting(true);
    
    // Simulate connection process
    setTimeout(() => {
      setIsConnecting(false);
      setShowApiForm(false);
      setApiUrl("");
      setApiKey("");
      toast.success("API connection created successfully");
    }, 1500);
  };

  const handleToggleWorkflow = (workflowId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    toast.success(`Workflow ${workflowId} is now ${newStatus}`);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Data Automation & Integrations" 
          description="Connect, synchronize, and automate your data workflows"
          showBack={true}
        />

        <Tabs defaultValue="sources" value={activeTab} onValueChange={setActiveTab} className="mt-6">
          <TabsList className="grid grid-cols-4 w-full max-w-2xl mb-6">
            <TabsTrigger value="sources">Data Sources</TabsTrigger>
            <TabsTrigger value="workflows">Workflows</TabsTrigger>
            <TabsTrigger value="logs">Logs</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Data Sources Tab */}
          <TabsContent value="sources">
            <div className="grid grid-cols-1 gap-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-2">
                <div>
                  <h2 className="text-xl font-semibold">Available Data Sources</h2>
                  <p className="text-muted-foreground">
                    Connect your investment platform to external data sources
                  </p>
                </div>
                <Button 
                  onClick={() => setShowApiForm(true)}
                  className="w-full sm:w-auto"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Custom Connection
                </Button>
              </div>

              {showApiForm && (
                <Card className="mb-6 border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10">
                  <CardHeader>
                    <CardTitle>New API Connection</CardTitle>
                    <CardDescription>Create a new connection to an external API</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label htmlFor="api-url" className="text-sm font-medium">API Endpoint URL</label>
                      <Input 
                        id="api-url" 
                        placeholder="https://api.example.com/v1" 
                        value={apiUrl}
                        onChange={(e) => setApiUrl(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="api-key" className="text-sm font-medium">API Key (Optional)</label>
                      <Input 
                        id="api-key" 
                        placeholder="Enter your API key" 
                        type="password"
                        value={apiKey}
                        onChange={(e) => setApiKey(e.target.value)}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <label htmlFor="data-format" className="text-sm font-medium">Data Format</label>
                        <select id="data-format" className="w-full border rounded-md p-2">
                          <option value="json">JSON</option>
                          <option value="xml">XML</option>
                          <option value="csv">CSV</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="auth-type" className="text-sm font-medium">Authentication Type</label>
                        <select id="auth-type" className="w-full border rounded-md p-2">
                          <option value="apikey">API Key</option>
                          <option value="oauth">OAuth 2.0</option>
                          <option value="basic">Basic Auth</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowApiForm(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      onClick={handleCreateApiConnection}
                      disabled={isConnecting}
                    >
                      {isConnecting ? (
                        <>
                          <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                          Connecting...
                        </>
                      ) : (
                        <>
                          <Link className="mr-2 h-4 w-4" />
                          Create Connection
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {dataSources.map((source) => (
                <Card key={source.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="p-2 bg-primary/10 rounded-full">
                        <source.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>{source.name}</CardTitle>
                    </div>
                    <CardDescription>{source.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {source.connectors.map((connector) => (
                        <div 
                          key={connector.id} 
                          className="border rounded-lg p-4 transition-colors hover:bg-muted/30"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-muted/50 rounded-md flex items-center justify-center">
                                <img 
                                  src={connector.logo} 
                                  alt={connector.name} 
                                  className="w-6 h-6"
                                />
                              </div>
                              <h3 className="font-medium">{connector.name}</h3>
                            </div>
                            <Badge 
                              variant={
                                connector.status === "connected" ? "outline" : 
                                connector.status === "pending" ? "secondary" : "destructive"
                              }
                              className={
                                connector.status === "connected" ? "bg-green-50 text-green-700 border-green-200" : 
                                connector.status === "pending" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                "bg-red-50 text-red-700 border-red-200"
                              }
                            >
                              {connector.status === "connected" ? (
                                <CheckCircle2 className="h-3 w-3 mr-1" />
                              ) : connector.status === "pending" ? (
                                <Clock className="h-3 w-3 mr-1" />
                              ) : (
                                <AlertCircle className="h-3 w-3 mr-1" />
                              )}
                              {connector.status === "connected" ? "Connected" : 
                                connector.status === "pending" ? "Pending" : "Disconnected"}
                            </Badge>
                          </div>
                          
                          <div className="text-xs text-muted-foreground mb-4">
                            Last synced: {connector.lastSync}
                          </div>
                          
                          <div className="flex justify-between">
                            {connector.status === "connected" ? (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleSyncNow(connector.id)}
                                disabled={isSyncing}
                              >
                                {isSyncing ? (
                                  <>
                                    <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                                    Syncing...
                                  </>
                                ) : (
                                  <>
                                    <RefreshCw className="h-3 w-3 mr-1" />
                                    Sync Now
                                  </>
                                )}
                              </Button>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleConnect(connector.id)}
                                disabled={isConnecting}
                              >
                                {isConnecting ? (
                                  <>
                                    <RefreshCw className="h-3 w-3 mr-1 animate-spin" />
                                    Connecting...
                                  </>
                                ) : (
                                  <>
                                    <Link className="h-3 w-3 mr-1" />
                                    Connect
                                  </>
                                )}
                              </Button>
                            )}
                            <Button variant="ghost" size="sm">
                              Configure
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Workflows Tab */}
          <TabsContent value="workflows">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold">Data Automation Workflows</h2>
                <p className="text-muted-foreground">
                  Create and manage automated data workflows
                </p>
              </div>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Workflow
              </Button>
            </div>

            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {workflowTemplates.map((workflow) => (
                <Card key={workflow.id} className="border-muted">
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{workflow.name}</CardTitle>
                      <Switch 
                        checked={workflow.status === "active"}
                        onCheckedChange={() => handleToggleWorkflow(workflow.id, workflow.status)}
                      />
                    </div>
                    <CardDescription>{workflow.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{workflow.frequency}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium mb-1">Data Sources:</p>
                        <div className="flex flex-wrap gap-1">
                          {workflow.sources.map((source) => (
                            <Badge key={source} variant="secondary" className="text-xs">
                              {source}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className={`h-2 w-2 rounded-full mr-2 ${
                          workflow.status === "active" ? "bg-green-500" : "bg-gray-400"
                        }`} />
                        <span className="text-sm capitalize">{workflow.status}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <div className="flex justify-between w-full">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Run Now
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}

              {/* Create new workflow card */}
              <Card className="border-dashed border-2 border-muted flex flex-col items-center justify-center p-6 h-full">
                <div className="p-3 bg-primary/10 rounded-full mb-4">
                  <Plus className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium text-center mb-2">Create Custom Workflow</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Build a custom data automation workflow
                </p>
                <Button variant="outline">
                  Get Started
                </Button>
              </Card>
            </div>
          </TabsContent>

          {/* Logs Tab */}
          <TabsContent value="logs">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-semibold">Integration Logs</h2>
                <p className="text-muted-foreground">
                  View the history of data integration activities
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <FileCode className="h-4 w-4 mr-2" />
                  Export Logs
                </Button>
                <Button variant="outline">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>

            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="px-4 py-3 text-left font-medium">Timestamp</th>
                        <th className="px-4 py-3 text-left font-medium">Source</th>
                        <th className="px-4 py-3 text-left font-medium">Status</th>
                        <th className="px-4 py-3 text-left font-medium">Message</th>
                        <th className="px-4 py-3 text-right font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {integrationLogs.map((log) => (
                        <tr key={log.id} className="border-b">
                          <td className="px-4 py-3 text-sm">{log.timestamp}</td>
                          <td className="px-4 py-3">{log.source}</td>
                          <td className="px-4 py-3">
                            <Badge 
                              variant="outline"
                              className={
                                log.status === "success" ? "bg-green-50 text-green-700 border-green-200" :
                                log.status === "warning" ? "bg-amber-50 text-amber-700 border-amber-200" :
                                "bg-red-50 text-red-700 border-red-200"
                              }
                            >
                              {log.status === "success" ? (
                                <CheckCircle className="h-3 w-3 mr-1" />
                              ) : log.status === "warning" ? (
                                <AlertCircle className="h-3 w-3 mr-1" />
                              ) : (
                                <XCircle className="h-3 w-3 mr-1" />
                              )}
                              {log.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3 text-sm">{log.message}</td>
                          <td className="px-4 py-3 text-right">
                            <Button variant="ghost" size="sm">Details</Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DatabaseZap className="h-5 w-5 text-primary" />
                    Integration Settings
                  </CardTitle>
                  <CardDescription>
                    Configure global settings for all data integrations
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Automatic Data Synchronization</h4>
                      <p className="text-sm text-muted-foreground">Enable automatic syncing of data sources</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Error Notifications</h4>
                      <p className="text-sm text-muted-foreground">Receive alerts for integration errors</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Data Validation</h4>
                      <p className="text-sm text-muted-foreground">Validate data before importing</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Log Retention Period</h4>
                      <p className="text-sm text-muted-foreground">How long to keep integration logs</p>
                    </div>
                    <select className="border rounded p-1">
                      <option>30 days</option>
                      <option>60 days</option>
                      <option>90 days</option>
                      <option>180 days</option>
                    </select>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-primary" />
                    Security Settings
                  </CardTitle>
                  <CardDescription>
                    Configure security settings for data access
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Encrypt Data at Rest</h4>
                      <p className="text-sm text-muted-foreground">Encrypt sensitive data when stored</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">IP Restrictions</h4>
                      <p className="text-sm text-muted-foreground">Limit access to specific IP addresses</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">API Rate Limiting</h4>
                      <p className="text-sm text-muted-foreground">Limit the frequency of API calls</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">Audit Logging</h4>
                      <p className="text-sm text-muted-foreground">Log all data access activities</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CloudLightning className="h-5 w-5 text-primary" />
                    Advanced Features
                  </CardTitle>
                  <CardDescription>
                    Configure advanced integration features
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid sm:grid-cols-3 gap-6">
                    <div className="border rounded-lg p-4">
                      <div className="p-2 bg-primary/10 rounded-full inline-block mb-2">
                        <Brain className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium mb-1">AI Data Processing</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Enable AI-powered data processing and anomaly detection
                      </p>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="p-2 bg-primary/10 rounded-full inline-block mb-2">
                        <ServerCog className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium mb-1">Custom ETL Pipelines</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Create custom ETL data transformation pipelines
                      </p>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="p-2 bg-primary/10 rounded-full inline-block mb-2">
                        <CloudCog className="h-5 w-5 text-primary" />
                      </div>
                      <h3 className="font-medium mb-1">Webhook Integrations</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Set up webhook triggers for real-time data updates
                      </p>
                      <Button variant="outline" size="sm">Configure</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

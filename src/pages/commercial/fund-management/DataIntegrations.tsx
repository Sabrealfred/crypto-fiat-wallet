
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useState } from "react";
import {
  DatabaseZap,
  Download,
  Upload,
  FileText,
  Layers,
  Settings,
  Database,
  CloudUpload,
  ExternalLink,
  RefreshCw,
  PlusCircle,
  CheckCircle2,
  LucideIcon,
  Shield,
  Github,
  Globe,
  FileCog
} from "lucide-react";

interface IntegrationCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  status: 'connected' | 'available' | 'configured';
  lastSync?: string;
}

const IntegrationCard = ({ title, description, icon: Icon, status, lastSync }: IntegrationCardProps) => {
  const handleConnect = () => {
    toast.success(`Connection initiated with ${title}`);
  };

  const handleSync = () => {
    toast.success(`Syncing data from ${title}`);
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/30">
              <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Badge 
            variant={status === 'connected' ? 'default' : status === 'configured' ? 'outline' : 'secondary'}
            className={status === 'connected' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : ''}
          >
            {status === 'connected' ? 'Connected' : status === 'configured' ? 'Configured' : 'Available'}
          </Badge>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {status === 'connected' && lastSync && (
          <p className="text-sm text-muted-foreground mb-4">Last synced: {lastSync}</p>
        )}
        <div className="flex gap-2">
          {status === 'connected' ? (
            <>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
                onClick={handleSync}
              >
                <RefreshCw className="h-4 w-4" />
                Sync Now
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Settings
              </Button>
            </>
          ) : (
            <>
              <Button 
                size="sm" 
                className="flex items-center gap-2"
                onClick={handleConnect}
              >
                <PlusCircle className="h-4 w-4" />
                Connect
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2"
              >
                <ExternalLink className="h-4 w-4" />
                Learn More
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default function DataIntegrationsPage() {
  const [activeTab, setActiveTab] = useState("market-data");
  const [apiKey, setApiKey] = useState("");
  const [webhookUrl, setWebhookUrl] = useState("");

  const handleSaveApiConfig = () => {
    toast.success("API configuration saved successfully");
  };

  const handleTestConnection = () => {
    toast.success("Connection test successful");
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Data Automation & Integrations" 
          description="Connect and automate your investment data sources"
          showBack={true}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="market-data">Market Data</TabsTrigger>
            <TabsTrigger value="erp">ERP & Accounting</TabsTrigger>
            <TabsTrigger value="ai">AI Services</TabsTrigger>
            <TabsTrigger value="api">API Configuration</TabsTrigger>
            <TabsTrigger value="import-export">Data Import/Export</TabsTrigger>
          </TabsList>

          <TabsContent value="market-data" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <IntegrationCard
                title="Bloomberg Terminal"
                description="Connect to Bloomberg Terminal API for market data, news, and analytics"
                icon={Globe}
                status="connected"
                lastSync="Today, 09:45 AM"
              />
              
              <IntegrationCard
                title="Reuters Data Feed"
                description="Real-time and historical market data from Reuters"
                icon={Database}
                status="available"
              />
              
              <IntegrationCard
                title="Yahoo Finance"
                description="Stock quotes, financial news, currency conversions"
                icon={DatabaseZap}
                status="connected"
                lastSync="Yesterday, 05:30 PM"
              />
              
              <IntegrationCard
                title="Alpha Vantage"
                description="APIs for stocks, forex, and cryptocurrencies"
                icon={Globe}
                status="configured"
              />
              
              <IntegrationCard
                title="Financial Modeling Prep"
                description="Financial statements, ratios, and market analysis"
                icon={FileText}
                status="available"
              />
              
              <IntegrationCard
                title="Custom Data Feed"
                description="Upload and integrate your custom market data sources"
                icon={CloudUpload}
                status="available"
              />
            </div>
          </TabsContent>

          <TabsContent value="erp" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <IntegrationCard
                title="QuickBooks"
                description="Sync financial data with QuickBooks accounting software"
                icon={FileCog}
                status="connected"
                lastSync="Today, 08:15 AM"
              />
              
              <IntegrationCard
                title="SAP"
                description="Enterprise resource planning integration with SAP"
                icon={Layers}
                status="available"
              />
              
              <IntegrationCard
                title="Oracle NetSuite"
                description="Cloud business management suite integration"
                icon={CloudUpload}
                status="available"
              />
              
              <IntegrationCard
                title="Xero"
                description="Small business accounting software integration"
                icon={DatabaseZap}
                status="configured"
              />
              
              <IntegrationCard
                title="Sage"
                description="Business management and accounting software integration"
                icon={Database}
                status="available"
              />
              
              <IntegrationCard
                title="Custom ERP"
                description="Connect your proprietary ERP system via API"
                icon={ExternalLink}
                status="available"
              />
            </div>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              <IntegrationCard
                title="OpenAI"
                description="AI-powered market analysis and natural language processing"
                icon={Shield}
                status="connected"
                lastSync="Today, 10:30 AM"
              />
              
              <IntegrationCard
                title="TensorFlow Models"
                description="Custom TensorFlow models for predictive analytics"
                icon={Github}
                status="available"
              />
              
              <IntegrationCard
                title="HuggingFace Transformers"
                description="NLP models for financial news and sentiment analysis"
                icon={Globe}
                status="available"
              />
              
              <IntegrationCard
                title="PyTorch Models"
                description="Custom PyTorch models for portfolio optimization"
                icon={FileCog}
                status="configured"
              />
            </div>
          </TabsContent>

          <TabsContent value="api" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>API Configuration</CardTitle>
                <CardDescription>
                  Configure API credentials and webhook endpoints for data integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="api-key">API Key</Label>
                  <Input 
                    id="api-key" 
                    placeholder="Enter your API key" 
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="webhook-url">Webhook URL</Label>
                  <Input 
                    id="webhook-url" 
                    placeholder="https://your-webhook-endpoint.com" 
                    value={webhookUrl}
                    onChange={(e) => setWebhookUrl(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handleTestConnection}>Test Connection</Button>
                <Button onClick={handleSaveApiConfig}>Save Configuration</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>API Documentation</CardTitle>
                <CardDescription>
                  Access documentation for available APIs and integration points
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <h3 className="text-sm font-medium mb-2">Available Endpoints</h3>
                  <ul className="space-y-2 text-sm">
                    <li>
                      <code className="bg-muted-foreground/20 px-1 py-0.5 rounded">/api/v1/market-data</code>
                      <span className="ml-2">Access market data feeds</span>
                    </li>
                    <li>
                      <code className="bg-muted-foreground/20 px-1 py-0.5 rounded">/api/v1/portfolio</code>
                      <span className="ml-2">Portfolio management endpoints</span>
                    </li>
                    <li>
                      <code className="bg-muted-foreground/20 px-1 py-0.5 rounded">/api/v1/transactions</code>
                      <span className="ml-2">Transaction data endpoints</span>
                    </li>
                    <li>
                      <code className="bg-muted-foreground/20 px-1 py-0.5 rounded">/api/v1/analytics</code>
                      <span className="ml-2">Analytics and reporting endpoints</span>
                    </li>
                  </ul>
                </div>
                
                <Button variant="outline" className="w-full">
                  <FileText className="h-4 w-4 mr-2" />
                  View Full API Documentation
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="import-export" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Upload className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Import Data
                  </CardTitle>
                  <CardDescription>
                    Upload and import data from external systems
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-8 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-center">
                    <CloudUpload className="h-10 w-10 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Drag files here or click to browse</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Supports CSV, Excel, JSON formats
                    </p>
                    <Button className="mt-4" size="sm">
                      Browse Files
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Import Templates</h4>
                    <div className="space-y-2">
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Portfolio Data Template
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Transaction Data Template
                      </Button>
                      <Button variant="outline" size="sm" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Market Data Template
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Export Data
                  </CardTitle>
                  <CardDescription>
                    Export data for use in external systems
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">Export Options</h4>
                    <div className="space-y-2">
                      <Button size="sm" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Export Portfolio Data
                      </Button>
                      <Button size="sm" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Export Transactions
                      </Button>
                      <Button size="sm" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Export Performance Reports
                      </Button>
                      <Button size="sm" className="w-full justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Export Tax Documents
                      </Button>
                    </div>
                  </div>
                  
                  <Card className="bg-muted/50">
                    <CardHeader className="p-4 pb-2">
                      <CardTitle className="text-sm">Automated Exports</CardTitle>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Daily Portfolio Snapshot</span>
                        </div>
                        <Badge variant="outline" className="text-xs">Active</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-sm">Weekly Performance Report</span>
                        </div>
                        <Badge variant="outline" className="text-xs">Active</Badge>
                      </div>
                      <Button variant="outline" size="sm" className="w-full mt-4">
                        <Settings className="h-4 w-4 mr-2" />
                        Configure Schedules
                      </Button>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

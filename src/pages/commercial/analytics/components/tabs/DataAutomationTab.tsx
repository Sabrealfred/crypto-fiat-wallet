
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Database, 
  RefreshCw, 
  Zap, 
  Clock, 
  PlayCircle, 
  PauseCircle,
  CheckCircle2, 
  XCircle, 
  Settings,
  Plus,
  FileSpreadsheet,
  BarChart3,
  Share2,
  CloudCog
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";

// Data source connections
const connections = [
  { id: 1, name: "CRM System", type: "API", status: "active", lastSync: "10 minutes ago", recordsProcessed: 24891 },
  { id: 2, name: "Financial Database", type: "SQL", status: "active", lastSync: "25 minutes ago", recordsProcessed: 15420 },
  { id: 3, name: "Marketing Analytics", type: "REST API", status: "issue", lastSync: "1 hour ago", recordsProcessed: 8750 },
  { id: 4, name: "ERP System", type: "SFTP", status: "active", lastSync: "30 minutes ago", recordsProcessed: 12650 },
  { id: 5, name: "Customer Support", type: "Webhook", status: "paused", lastSync: "1 day ago", recordsProcessed: 3210 },
];

// Integration workflows
const workflows = [
  { id: 1, name: "Daily Financial Reporting", schedule: "Daily at 6:00 AM", status: "running", lastRun: "Today, 6:00 AM", nextRun: "Tomorrow, 6:00 AM", progress: 100 },
  { id: 2, name: "Customer Data Synchronization", schedule: "Every 30 minutes", status: "running", lastRun: "Today, 11:30 AM", nextRun: "Today, 12:00 PM", progress: 100 },
  { id: 3, name: "Market Risk Assessment", schedule: "Weekly on Monday", status: "scheduled", lastRun: "May 6, 2023", nextRun: "May 13, 2023", progress: 100 },
  { id: 4, name: "AI Model Training", schedule: "Monthly on 1st", status: "failed", lastRun: "May 1, 2023", nextRun: "June 1, 2023", progress: 67 },
];

export function DataAutomationTab() {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Database className="h-4 w-4 text-blue-500" />
              Connected Sources
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">12</span>
              <Badge variant="outline" className="text-blue-600 border-blue-600 ml-2">+2 new</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Active data integration sources</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <RefreshCw className="h-4 w-4 text-green-500" />
              Automations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">8</span>
              <Badge variant="outline" className="text-green-600 border-green-600 ml-2">5 active</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Running automation workflows</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              Processing Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">42.8K</span>
              <Badge variant="outline" className="text-amber-600 border-amber-600 ml-2">+12.4%</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Records processed daily</p>
          </CardContent>
        </Card>
      </div>

      {/* Data connections */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-500" />
              Data Connections
            </CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              New Connection
            </Button>
          </div>
          <CardDescription>Integrated data sources and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Source</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Last Sync</TableHead>
                <TableHead>Records</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {connections.map((connection) => (
                <TableRow key={connection.id}>
                  <TableCell className="font-medium">{connection.name}</TableCell>
                  <TableCell>{connection.type}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <span className={`h-2 w-2 rounded-full ${
                        connection.status === "active" ? "bg-green-500" :
                        connection.status === "issue" ? "bg-amber-500" : "bg-gray-400"
                      }`} />
                      <span className="capitalize">{connection.status}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>{connection.lastSync}</span>
                    </div>
                  </TableCell>
                  <TableCell>{connection.recordsProcessed.toLocaleString()}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <RefreshCw className="h-4 w-4" />
                        <span className="sr-only">Sync</span>
                      </Button>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <Settings className="h-4 w-4" />
                        <span className="sr-only">Settings</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="border-t px-6 py-4 flex justify-between">
          <Button variant="outline" size="sm">
            Connection Manager
          </Button>
          <Button variant="outline" size="sm">
            View All Connections
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>

      {/* Automation workflows */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <RefreshCw className="h-5 w-5 text-green-500" />
              Automation Workflows
            </CardTitle>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Create Workflow
            </Button>
          </div>
          <CardDescription>Scheduled data processing and integrations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium flex items-center gap-2">
                      {workflow.name}
                      <Badge
                        variant={
                          workflow.status === "running" ? "default" :
                          workflow.status === "scheduled" ? "secondary" : "destructive"
                        }
                      >
                        {workflow.status}
                      </Badge>
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      <Clock className="h-3 w-3 inline mr-1" />
                      {workflow.schedule}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {workflow.status === "running" ? (
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <PauseCircle className="h-4 w-4" />
                        <span className="sr-only">Pause</span>
                      </Button>
                    ) : (
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <PlayCircle className="h-4 w-4" />
                        <span className="sr-only">Start</span>
                      </Button>
                    )}
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <Settings className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                  </div>
                </div>
                
                {workflow.status === "failed" && (
                  <div className="mb-2">
                    <Progress value={workflow.progress} className="h-2" />
                    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                      <XCircle className="h-3 w-3" />
                      Failed at 67% - Error connecting to data source
                    </p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Last Run</p>
                    <p className="font-medium">{workflow.lastRun}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Next Run</p>
                    <p className="font-medium">{workflow.nextRun}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4 flex justify-between">
          <Button variant="outline" size="sm">
            Workflow Builder
          </Button>
          <Button variant="outline" size="sm">
            View All Workflows
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
      
      {/* Integration capabilities */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CloudCog className="h-5 w-5 text-blue-600" />
              Data Automation Features
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: FileSpreadsheet, title: "Data Extraction" },
                { icon: RefreshCw, title: "Automated Sync" },
                { icon: Database, title: "Data Warehousing" },
                { icon: Share2, title: "API Integration" },
                { icon: BarChart3, title: "Transform & Analyze" },
                { icon: CheckCircle2, title: "Data Validation" },
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2 p-2 rounded-md bg-white dark:bg-background/80 shadow-sm">
                  <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-800/50">
                    <feature.icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <span className="text-sm font-medium">{feature.title}</span>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t border-blue-100 dark:border-blue-800/50">
            <Button className="w-full" variant="outline">
              Learn More About Data Automation
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-amber-500" />
              Integration Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">System Uptime</span>
                  <span className="text-sm font-medium">99.8%</span>
                </div>
                <Progress value={99.8} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">API Performance</span>
                  <span className="text-sm font-medium">92%</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Data Processing</span>
                  <span className="text-sm font-medium">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Workflow Success Rate</span>
                  <span className="text-sm font-medium">96.5%</span>
                </div>
                <Progress value={96.5} className="h-2" />
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
              <div className="border rounded-md p-3">
                <p className="text-xs text-muted-foreground">Daily API Calls</p>
                <p className="text-xl font-bold">524.8K</p>
              </div>
              <div className="border rounded-md p-3">
                <p className="text-xs text-muted-foreground">Average Response</p>
                <p className="text-xl font-bold">286ms</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

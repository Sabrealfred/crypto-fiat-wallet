
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Download, 
  FileText, 
  Filter, 
  Plus, 
  Refresh, 
  Search,
  Settings,
  BarChart,
  Activity,
  Brain,
  ListFilter
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";

// Sample data for model risk management
const modelsList = [
  {
    id: "MDL-001",
    name: "Credit Scoring Model",
    type: "Statistical",
    category: "Credit Risk",
    lastValidated: "2024-02-15",
    nextValidation: "2024-08-15",
    status: "Active",
    riskRating: "Medium",
    validationScore: 85,
    owner: "Credit Risk Department",
    version: "3.2.1",
    dependencies: ["Customer Data", "Credit Bureau API", "Payment History"],
  },
  {
    id: "MDL-002",
    name: "Market VaR Model",
    type: "Quantitative",
    category: "Market Risk",
    lastValidated: "2024-01-10",
    nextValidation: "2024-07-10",
    status: "Active",
    riskRating: "High",
    validationScore: 78,
    owner: "Treasury Department",
    version: "2.4.5",
    dependencies: ["Market Data", "Historical Price Feed", "Volatility Index"],
  },
  {
    id: "MDL-003",
    name: "AML Detection Model",
    type: "Machine Learning",
    category: "Compliance",
    lastValidated: "2024-03-05",
    nextValidation: "2024-09-05",
    status: "Active",
    riskRating: "Critical",
    validationScore: 92,
    owner: "Compliance Department",
    version: "1.8.3",
    dependencies: ["Transaction Data", "Customer Profiles", "External Watchlists"],
  },
  {
    id: "MDL-004",
    name: "Liquidity Forecasting Model",
    type: "Statistical",
    category: "Liquidity Risk",
    lastValidated: "2023-12-20",
    nextValidation: "2024-06-20",
    status: "Under Review",
    riskRating: "Medium",
    validationScore: 65,
    owner: "Treasury Department",
    version: "2.1.0",
    dependencies: ["Cash Flow Data", "Market Liquidity Data", "Deposit Behavior"],
  },
  {
    id: "MDL-005",
    name: "Operational Loss Prediction",
    type: "Machine Learning",
    category: "Operational Risk",
    lastValidated: "2024-03-01",
    nextValidation: "2024-09-01",
    status: "Active",
    riskRating: "Medium",
    validationScore: 88,
    owner: "Operational Risk Department",
    version: "1.2.7",
    dependencies: ["Historical Loss Data", "Process Metrics", "Control Effectiveness"],
  },
  {
    id: "MDL-006",
    name: "IFRS 9 Impairment Model",
    type: "Statistical",
    category: "Credit Risk",
    lastValidated: "2024-01-25",
    nextValidation: "2024-07-25",
    status: "Under Development",
    riskRating: "High",
    validationScore: 0,
    owner: "Finance Department",
    version: "1.0.0-beta",
    dependencies: ["Loan Data", "Macroeconomic Factors", "Historical Default Rates"],
  },
  {
    id: "MDL-007",
    name: "Fraud Detection System",
    type: "Machine Learning",
    category: "Fraud Risk",
    lastValidated: "2024-02-10",
    nextValidation: "2024-08-10",
    status: "Active",
    riskRating: "Critical",
    validationScore: 94,
    owner: "Security Department",
    version: "4.5.2",
    dependencies: ["Transaction Data", "Customer Behavior", "Device Information"],
  },
];

const validationIssues = [
  {
    id: "VI-001",
    modelId: "MDL-004",
    modelName: "Liquidity Forecasting Model",
    issue: "Model underestimates liquidity requirements in stress scenarios",
    severity: "High",
    dateIdentified: "2024-02-25",
    status: "Open",
    assignedTo: "Maria Rodriguez",
    remediation: "Recalibrate stress factors and validate with historical data",
    dueDate: "2024-04-15",
  },
  {
    id: "VI-002",
    modelId: "MDL-002",
    modelName: "Market VaR Model",
    issue: "Tail risk inadequately captured in current specification",
    severity: "Medium",
    dateIdentified: "2024-01-15",
    status: "In Progress",
    assignedTo: "John Chen",
    remediation: "Implement expected shortfall methodology alongside VaR",
    dueDate: "2024-04-10",
  },
  {
    id: "VI-003",
    modelId: "MDL-001",
    modelName: "Credit Scoring Model",
    issue: "Model performance degradation observed in recent back-testing",
    severity: "Medium",
    dateIdentified: "2024-03-01",
    status: "In Progress",
    assignedTo: "Sarah Johnson",
    remediation: "Update model with recent default data and retrain",
    dueDate: "2024-04-20",
  },
];

const modelValidationSchedule = [
  {
    id: "VS-001",
    modelId: "MDL-004",
    modelName: "Liquidity Forecasting Model",
    type: "Full Validation",
    scheduledDate: "2024-04-10",
    validator: "External - PwC",
    status: "Scheduled",
  },
  {
    id: "VS-002",
    modelId: "MDL-002",
    modelName: "Market VaR Model",
    type: "Annual Review",
    scheduledDate: "2024-05-15",
    validator: "Model Validation Team",
    status: "Scheduled",
  },
  {
    id: "VS-003",
    modelId: "MDL-006",
    modelName: "IFRS 9 Impairment Model",
    type: "Pre-Implementation Validation",
    scheduledDate: "2024-04-25",
    validator: "Model Validation Team",
    status: "Scheduled",
  },
  {
    id: "VS-004",
    modelId: "MDL-003",
    modelName: "AML Detection Model",
    type: "Performance Assessment",
    scheduledDate: "2024-04-05",
    validator: "Compliance & Model Validation",
    status: "In Progress",
  },
];

export default function ModelRiskPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // Filter models based on search term and filters
  const filteredModels = modelsList.filter(model => {
    const matchesSearch = 
      model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      model.category.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = filterCategory === "all" || model.category === filterCategory;
    const matchesStatus = filterStatus === "all" || model.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Extract unique categories for filter dropdown
  const categories = [...new Set(modelsList.map(model => model.category))];
  
  // Extract unique statuses for filter dropdown
  const statuses = [...new Set(modelsList.map(model => model.status))];

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Model Risk Management" 
          description="Validate and monitor risk models across the enterprise"
          showBack={true}
        />

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Models</p>
                  <h3 className="text-2xl font-bold mt-1">{modelsList.length}</h3>
                  <p className="text-xs mt-1">Across all categories</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-800/50 p-2 rounded-full">
                  <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Models</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {modelsList.filter(m => m.status === "Active").length}
                  </h3>
                  <p className="text-xs text-green-600 mt-1">
                    <CheckCircle2 className="h-3 w-3 inline mr-1" />
                    In production use
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-800/50 p-2 rounded-full">
                  <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Open Issues</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {validationIssues.filter(i => i.status === "Open").length}
                  </h3>
                  <p className="text-xs text-amber-600 mt-1">
                    <AlertTriangle className="h-3 w-3 inline mr-1" />
                    Requires attention
                  </p>
                </div>
                <div className="bg-amber-100 dark:bg-amber-800/50 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming Validations</p>
                  <h3 className="text-2xl font-bold mt-1">
                    {modelValidationSchedule.filter(v => v.status === "Scheduled").length}
                  </h3>
                  <p className="text-xs mt-1">
                    <Clock className="h-3 w-3 inline mr-1" />
                    Next 30 days
                  </p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-800/50 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="models" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="models">Models Inventory</TabsTrigger>
            <TabsTrigger value="issues">Validation Issues</TabsTrigger>
            <TabsTrigger value="schedule">Validation Schedule</TabsTrigger>
            <TabsTrigger value="settings">Model Settings</TabsTrigger>
          </TabsList>
          
          {/* Models Inventory Tab */}
          <TabsContent value="models">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Models Inventory</CardTitle>
                    <CardDescription>View and manage all risk models</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Model
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search models..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex gap-2 flex-1">
                    <Select value={filterCategory} onValueChange={setFilterCategory}>
                      <SelectTrigger className="w-full md:w-[180px]">
                        <ListFilter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter by category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map(category => (
                          <SelectItem key={category} value={category}>{category}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-full md:w-[180px]">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        {statuses.map(status => (
                          <SelectItem key={status} value={status}>{status}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Button variant="outline" className="ml-auto" size="sm">
                      <Refresh className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </div>
                
                <div className="rounded-md border overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/30">
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Model Name</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Category</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Type</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Risk Rating</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Validation Score</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Last Validated</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredModels.map((model) => (
                        <tr key={model.id} className="border-b hover:bg-muted/20">
                          <td className="p-2 align-middle font-mono text-xs">{model.id}</td>
                          <td className="p-2 align-middle font-medium">{model.name}</td>
                          <td className="p-2 align-middle">{model.category}</td>
                          <td className="p-2 align-middle">{model.type}</td>
                          <td className="p-2 align-middle">
                            <Badge className={
                              model.status === "Active" ? "bg-green-100 text-green-800 hover:bg-green-200" :
                              model.status === "Under Review" ? "bg-amber-100 text-amber-800 hover:bg-amber-200" :
                              "bg-blue-100 text-blue-800 hover:bg-blue-200"
                            }>
                              {model.status}
                            </Badge>
                          </td>
                          <td className="p-2 align-middle">
                            <Badge className={
                              model.riskRating === "Low" ? "bg-green-100 text-green-800" :
                              model.riskRating === "Medium" ? "bg-amber-100 text-amber-800" :
                              model.riskRating === "High" ? "bg-orange-100 text-orange-800" :
                              "bg-red-100 text-red-800"
                            }>
                              {model.riskRating}
                            </Badge>
                          </td>
                          <td className="p-2 align-middle">
                            {model.validationScore > 0 ? (
                              <div className="flex items-center gap-2">
                                <Progress 
                                  value={model.validationScore} 
                                  className="w-16 h-2"
                                  indicatorClassName={
                                    model.validationScore >= 90 ? "bg-green-500" :
                                    model.validationScore >= 70 ? "bg-amber-500" :
                                    "bg-red-500"
                                  }
                                />
                                <span className="text-sm">{model.validationScore}%</span>
                              </div>
                            ) : (
                              <span className="text-sm text-muted-foreground">N/A</span>
                            )}
                          </td>
                          <td className="p-2 align-middle text-sm">
                            {model.lastValidated || "Not validated"}
                          </td>
                          <td className="p-2 align-middle">
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm">View</Button>
                              <Button variant="ghost" size="sm">Edit</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredModels.length} of {modelsList.length} models
                </div>
                <div className="space-x-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" disabled>Next</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Validation Issues Tab */}
          <TabsContent value="issues">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Validation Issues</CardTitle>
                    <CardDescription>Track and resolve model validation issues</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Report Issue
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/30">
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Model</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Issue</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Severity</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Assigned To</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Due Date</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {validationIssues.map((issue) => (
                        <tr key={issue.id} className="border-b">
                          <td className="p-2 align-middle font-mono text-xs">{issue.id}</td>
                          <td className="p-2 align-middle">
                            <div className="font-medium">{issue.modelName}</div>
                            <div className="text-xs text-muted-foreground">{issue.modelId}</div>
                          </td>
                          <td className="p-2 align-middle max-w-xs truncate" title={issue.issue}>
                            {issue.issue}
                          </td>
                          <td className="p-2 align-middle">
                            <Badge className={
                              issue.severity === "Low" ? "bg-blue-100 text-blue-800" :
                              issue.severity === "Medium" ? "bg-amber-100 text-amber-800" :
                              "bg-red-100 text-red-800"
                            }>
                              {issue.severity}
                            </Badge>
                          </td>
                          <td className="p-2 align-middle">
                            <Badge className={
                              issue.status === "Open" ? "bg-red-100 text-red-800" :
                              issue.status === "In Progress" ? "bg-amber-100 text-amber-800" :
                              "bg-green-100 text-green-800"
                            }>
                              {issue.status}
                            </Badge>
                          </td>
                          <td className="p-2 align-middle">{issue.assignedTo}</td>
                          <td className="p-2 align-middle text-sm">
                            {issue.dueDate}
                          </td>
                          <td className="p-2 align-middle">
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm">View</Button>
                              <Button variant="ghost" size="sm">Update</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Validation Schedule Tab */}
          <TabsContent value="schedule">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Validation Schedule</CardTitle>
                    <CardDescription>Upcoming model validations</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Calendar View
                    </Button>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Schedule Validation
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/30">
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Model</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Validation Type</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Scheduled Date</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Validator</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {modelValidationSchedule.map((schedule) => (
                        <tr key={schedule.id} className="border-b">
                          <td className="p-2 align-middle font-mono text-xs">{schedule.id}</td>
                          <td className="p-2 align-middle">
                            <div className="font-medium">{schedule.modelName}</div>
                            <div className="text-xs text-muted-foreground">{schedule.modelId}</div>
                          </td>
                          <td className="p-2 align-middle">{schedule.type}</td>
                          <td className="p-2 align-middle text-sm">{schedule.scheduledDate}</td>
                          <td className="p-2 align-middle">{schedule.validator}</td>
                          <td className="p-2 align-middle">
                            <Badge className={
                              schedule.status === "Scheduled" ? "bg-blue-100 text-blue-800" :
                              schedule.status === "In Progress" ? "bg-amber-100 text-amber-800" :
                              "bg-green-100 text-green-800"
                            }>
                              {schedule.status}
                            </Badge>
                          </td>
                          <td className="p-2 align-middle">
                            <div className="flex space-x-1">
                              <Button variant="ghost" size="sm">View</Button>
                              <Button variant="ghost" size="sm">Reschedule</Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Model Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Model Risk Settings</CardTitle>
                <CardDescription>Configure model risk management settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Validation Framework</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">Validation Thresholds</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">High Risk Models</span>
                              <span className="text-sm font-medium">Semi-Annual</span>
                            </div>
                            <Separator />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Medium Risk Models</span>
                              <span className="text-sm font-medium">Annual</span>
                            </div>
                            <Separator />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Low Risk Models</span>
                              <span className="text-sm font-medium">Bi-Annual</span>
                            </div>
                            <Separator />
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-4">
                          <Settings className="h-4 w-4 mr-2" />
                          Adjust Thresholds
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">Performance Metrics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Validation Score Threshold</span>
                              <span className="text-sm font-medium">75%</span>
                            </div>
                            <Separator />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Back-testing Period</span>
                              <span className="text-sm font-medium">12 Months</span>
                            </div>
                            <Separator />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Minimum Data Sample</span>
                              <span className="text-sm font-medium">1000 Observations</span>
                            </div>
                            <Separator />
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-4">
                          <Activity className="h-4 w-4 mr-2" />
                          Configure Metrics
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Governance</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">Approval Workflows</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">New Model Approval</span>
                              <Badge>4 Levels</Badge>
                            </div>
                            <Separator />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Major Changes</span>
                              <Badge>3 Levels</Badge>
                            </div>
                            <Separator />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Minor Changes</span>
                              <Badge>2 Levels</Badge>
                            </div>
                            <Separator />
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-4">
                          <FileText className="h-4 w-4 mr-2" />
                          Edit Workflows
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-md">Model Documentation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Documentation Template</span>
                              <Badge variant="outline">v2.3</Badge>
                            </div>
                            <Separator />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Required Sections</span>
                              <span className="text-sm font-medium">12</span>
                            </div>
                            <Separator />
                          </div>
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Validation Report Template</span>
                              <Badge variant="outline">v1.8</Badge>
                            </div>
                            <Separator />
                          </div>
                        </div>
                        <Button variant="outline" size="sm" className="mt-4">
                          <Download className="h-4 w-4 mr-2" />
                          Download Templates
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">AI & Machine Learning Models</h3>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-md">Additional Controls</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Explainability Requirements</span>
                                <Badge className="bg-amber-100 text-amber-800">Enhanced</Badge>
                              </div>
                              <Separator />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Bias Testing</span>
                                <Badge className="bg-green-100 text-green-800">Mandatory</Badge>
                              </div>
                              <Separator />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Monitoring Frequency</span>
                                <span className="text-sm font-medium">Weekly</span>
                              </div>
                              <Separator />
                            </div>
                          </div>
                        </div>
                        <div>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Model Drift Threshold</span>
                                <span className="text-sm font-medium">5%</span>
                              </div>
                              <Separator />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Data Quality Checks</span>
                                <Badge className="bg-green-100 text-green-800">Automated</Badge>
                              </div>
                              <Separator />
                            </div>
                            <div>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm">Independent Validation</span>
                                <Badge className="bg-green-100 text-green-800">Required</Badge>
                              </div>
                              <Separator />
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button className="mt-6">
                        <Brain className="h-4 w-4 mr-2" />
                        AI Model Controls Configuration
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

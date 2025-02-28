
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  RefreshCw, 
  Calendar as CalendarIcon, 
  Filter, 
  Download,
  ChevronUp,
  ChevronDown,
  XCircle,
  CheckCircle,
  AlertTriangle,
  Brain,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  Book,
  Code,
  Settings,
  FileText
} from "lucide-react";
import { useState } from "react";

const modelCategories = [
  {
    name: "Credit Risk Models",
    models: [
      { 
        id: "CR-001", 
        name: "Corporate Default Probability", 
        type: "Statistical", 
        status: "Active", 
        accuracy: 87,
        lastReview: "2024-01-15",
        nextReview: "2024-07-15",
        owner: "Risk Analytics Team",
        riskLevel: "Medium"
      },
      { 
        id: "CR-002", 
        name: "Retail Credit Scoring", 
        type: "Machine Learning", 
        status: "Active", 
        accuracy: 91,
        lastReview: "2024-02-10",
        nextReview: "2024-08-10",
        owner: "Consumer Credit Team",
        riskLevel: "Low"
      },
      { 
        id: "CR-003", 
        name: "SME Credit Assessment", 
        type: "Hybrid", 
        status: "Under Review", 
        accuracy: 76,
        lastReview: "2023-11-20",
        nextReview: "2024-05-20",
        owner: "Commercial Banking Team",
        riskLevel: "High"
      }
    ]
  },
  {
    name: "Market Risk Models",
    models: [
      { 
        id: "MR-001", 
        name: "Value at Risk (VaR)", 
        type: "Statistical", 
        status: "Active", 
        accuracy: 83,
        lastReview: "2024-02-05",
        nextReview: "2024-08-05",
        owner: "Market Risk Team",
        riskLevel: "Medium"
      },
      { 
        id: "MR-002", 
        name: "Expected Shortfall", 
        type: "Statistical", 
        status: "Active", 
        accuracy: 85,
        lastReview: "2024-01-25",
        nextReview: "2024-07-25",
        owner: "Market Risk Team",
        riskLevel: "Medium"
      },
      { 
        id: "MR-003", 
        name: "Interest Rate Sensitivity", 
        type: "Algorithmic", 
        status: "Under Review", 
        accuracy: 79,
        lastReview: "2023-12-10",
        nextReview: "2024-06-10",
        owner: "Treasury Team",
        riskLevel: "High"
      }
    ]
  },
  {
    name: "Operational Risk Models",
    models: [
      { 
        id: "OR-001", 
        name: "Fraud Detection System", 
        type: "Machine Learning", 
        status: "Active", 
        accuracy: 94,
        lastReview: "2024-03-01",
        nextReview: "2024-09-01",
        owner: "Fraud & Security Team",
        riskLevel: "Low"
      },
      { 
        id: "OR-002", 
        name: "Transaction Anomaly Detection", 
        type: "Machine Learning", 
        status: "Active", 
        accuracy: 92,
        lastReview: "2024-02-15",
        nextReview: "2024-08-15",
        owner: "Operations Team",
        riskLevel: "Low"
      }
    ]
  },
  {
    name: "Liquidity Risk Models",
    models: [
      { 
        id: "LR-001", 
        name: "Liquidity Coverage Ratio", 
        type: "Statistical", 
        status: "Active", 
        accuracy: 88,
        lastReview: "2024-01-20",
        nextReview: "2024-07-20",
        owner: "Treasury Team",
        riskLevel: "Medium"
      },
      { 
        id: "LR-002", 
        name: "Net Stable Funding Ratio", 
        type: "Statistical", 
        status: "Active", 
        accuracy: 89,
        lastReview: "2024-01-20",
        nextReview: "2024-07-20",
        owner: "Treasury Team",
        riskLevel: "Medium"
      }
    ]
  }
];

const modelPerformanceData = [
  { month: "Jan", accuracy: 86.2, prediction: 84.5, baseline: 80.0 },
  { month: "Feb", accuracy: 87.5, prediction: 85.0, baseline: 80.0 },
  { month: "Mar", accuracy: 85.8, prediction: 85.5, baseline: 80.0 },
  { month: "Apr", accuracy: 88.2, prediction: 86.0, baseline: 80.0 },
  { month: "May", accuracy: 87.9, prediction: 86.5, baseline: 80.0 },
  { month: "Jun", accuracy: 89.1, prediction: 87.0, baseline: 80.0 },
  { month: "Jul", accuracy: 88.5, prediction: 87.5, baseline: 80.0 },
  { month: "Aug", accuracy: 90.2, prediction: 88.0, baseline: 80.0 },
  { month: "Sep", accuracy: 89.8, prediction: 88.5, baseline: 80.0 },
  { month: "Oct", accuracy: 91.3, prediction: 89.0, baseline: 80.0 },
  { month: "Nov", accuracy: 90.7, prediction: 89.5, baseline: 80.0 },
  { month: "Dec", accuracy: 92.1, prediction: 90.0, baseline: 80.0 },
];

const recentValidationResults = [
  {
    modelId: "CR-001",
    modelName: "Corporate Default Probability",
    date: "2024-03-10",
    result: "Pass",
    validatedBy: "John Smith",
    accuracy: 87.2,
    comments: "Model performance within acceptable parameters. Minor calibration suggested for industry sector weights."
  },
  {
    modelId: "MR-001",
    modelName: "Value at Risk (VaR)",
    date: "2024-03-05",
    result: "Pass",
    validatedBy: "Sarah Johnson",
    accuracy: 83.5,
    comments: "Model passes back-testing. Recommend increasing stress testing scenarios for extreme market events."
  },
  {
    modelId: "OR-001",
    modelName: "Fraud Detection System",
    date: "2024-03-01",
    result: "Pass",
    validatedBy: "Michael Wong",
    accuracy: 94.3,
    comments: "Excellent performance. False positive rate reduced by 2.5% since last review."
  },
  {
    modelId: "CR-003",
    modelName: "SME Credit Assessment",
    date: "2024-02-20",
    result: "Fail",
    validatedBy: "Jessica Lee",
    accuracy: 76.4,
    comments: "Model underperforming for mid-sized manufacturers. Complete recalibration required."
  },
  {
    modelId: "MR-003",
    modelName: "Interest Rate Sensitivity",
    date: "2024-02-15",
    result: "Conditional Pass",
    validatedBy: "Robert Chen",
    accuracy: 79.8,
    comments: "Acceptable for current use but requires enhancement to improve accuracy for inverted yield curves."
  }
];

const modelRiskMetrics = {
  totalModels: 125,
  activeModels: 112,
  underReview: 10,
  inactive: 3,
  highRisk: 15,
  mediumRisk: 67,
  lowRisk: 43,
  validationCompliance: 94,
  accuracyAverage: 86.5,
  failedValidations: 7
};

export default function ModelRiskPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedModel, setSelectedModel] = useState(null);
  
  const getStatusColor = (status) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Under Review": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case "Inactive": return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const getRiskLevelColor = (level) => {
    switch (level) {
      case "Low": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "Medium": return "bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400";
      case "High": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getValidationResultColor = (result) => {
    switch (result) {
      case "Pass": return "text-green-600";
      case "Conditional Pass": return "text-amber-600";
      case "Fail": return "text-red-600";
      default: return "text-gray-600";
    }
  };
  
  const getValidationResultIcon = (result) => {
    switch (result) {
      case "Pass": return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "Conditional Pass": return <AlertTriangle className="h-5 w-5 text-amber-600" />;
      case "Fail": return <XCircle className="h-5 w-5 text-red-600" />;
      default: return null;
    }
  };
  
  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  const filteredModels = modelCategories.flatMap(category => 
    category.models.filter(model => {
      const matchesSearch = searchTerm === "" || 
        model.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        model.id.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === "all" || model.status === statusFilter;
      const matchesType = typeFilter === "all" || model.type === typeFilter;
      
      return matchesSearch && matchesStatus && matchesType;
    })
  );

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Model Risk Management" 
          description="Validate and monitor financial risk models"
          showBack={true}
        />

        {/* Summary Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Model Inventory</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <h3 className="text-2xl font-bold">{modelRiskMetrics.totalModels}</h3>
                    <span className="text-xs text-muted-foreground">total models</span>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                      <span className="text-xs">{modelRiskMetrics.activeModels} active</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mr-1"></div>
                      <span className="text-xs">{modelRiskMetrics.underReview} review</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-gray-500 mr-1"></div>
                      <span className="text-xs">{modelRiskMetrics.inactive} inactive</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-primary/10">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Risk Distribution</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <h3 className="text-2xl font-bold">{modelRiskMetrics.highRisk}</h3>
                    <span className="text-xs text-muted-foreground">high risk models</span>
                  </div>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-red-500 mr-1"></div>
                      <span className="text-xs">High: {modelRiskMetrics.highRisk}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mr-1"></div>
                      <span className="text-xs">Med: {modelRiskMetrics.mediumRisk}</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 rounded-full bg-green-500 mr-1"></div>
                      <span className="text-xs">Low: {modelRiskMetrics.lowRisk}</span>
                    </div>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900/20">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Validation Compliance</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <h3 className="text-2xl font-bold">{modelRiskMetrics.validationCompliance}%</h3>
                    <span className="text-xs text-muted-foreground">compliant</span>
                  </div>
                  <div className="mt-3">
                    <Progress 
                      value={modelRiskMetrics.validationCompliance} 
                      className="h-2 bg-gray-200 dark:bg-gray-700"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {modelRiskMetrics.failedValidations} failed validations
                    </p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900/20">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Average Accuracy</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <h3 className="text-2xl font-bold">{modelRiskMetrics.accuracyAverage}%</h3>
                    <span className="text-xs flex items-center text-green-600">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      +2.3%
                    </span>
                  </div>
                  <div className="mt-3">
                    <Progress 
                      value={modelRiskMetrics.accuracyAverage} 
                      className="h-2 bg-gray-200 dark:bg-gray-700"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Target: 85%
                    </p>
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/20">
                  <LineChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="models" className="space-y-4">
          <TabsList>
            <TabsTrigger value="models">Model Inventory</TabsTrigger>
            <TabsTrigger value="validation">Validation Results</TabsTrigger>
            <TabsTrigger value="performance">Performance Monitoring</TabsTrigger>
            <TabsTrigger value="documentation">Documentation</TabsTrigger>
          </TabsList>
          
          <TabsContent value="models">
            <div className="flex items-center space-x-2 mb-4">
              <Input
                placeholder="Search models..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Under Review">Under Review</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Statistical">Statistical</SelectItem>
                  <SelectItem value="Machine Learning">Machine Learning</SelectItem>
                  <SelectItem value="Algorithmic">Algorithmic</SelectItem>
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
            
            {/* Models Table */}
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/30">
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Model Name</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Type</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Status</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Risk Level</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Accuracy</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Last Review</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Next Review</th>
                        <th className="h-10 px-4 text-left align-middle font-medium text-muted-foreground">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredModels.map((model) => (
                        <tr 
                          key={model.id} 
                          className="border-b cursor-pointer hover:bg-muted/50 transition-colors"
                          onClick={() => handleModelSelect(model)}
                        >
                          <td className="p-3 align-middle font-mono text-xs">{model.id}</td>
                          <td className="p-3 align-middle font-medium">{model.name}</td>
                          <td className="p-3 align-middle">{model.type}</td>
                          <td className="p-3 align-middle">
                            <Badge variant="outline" className={getStatusColor(model.status)}>
                              {model.status}
                            </Badge>
                          </td>
                          <td className="p-3 align-middle">
                            <Badge variant="outline" className={getRiskLevelColor(model.riskLevel)}>
                              {model.riskLevel}
                            </Badge>
                          </td>
                          <td className="p-3 align-middle">
                            <div className="flex items-center gap-2">
                              <Progress 
                                value={model.accuracy}
                                className="w-16 h-2"
                              />
                              <span>{model.accuracy}%</span>
                            </div>
                          </td>
                          <td className="p-3 align-middle text-sm">{model.lastReview}</td>
                          <td className="p-3 align-middle text-sm">{model.nextReview}</td>
                          <td className="p-3 align-middle">
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredModels.length} of {modelCategories.reduce((acc, cat) => acc + cat.models.length, 0)} models
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Refresh
                  </Button>
                  <Button size="sm">
                    Add New Model
                  </Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="validation">
            <Card>
              <CardHeader>
                <CardTitle>Recent Validation Results</CardTitle>
                <CardDescription>
                  Results from the latest model validation exercises
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {recentValidationResults.map((result) => (
                    <div key={result.modelId + result.date} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            {getValidationResultIcon(result.result)}
                            <h3 className="font-semibold text-lg">{result.modelName}</h3>
                            <Badge variant="outline" className={getValidationResultColor(result.result)}>
                              {result.result}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                            <div>ID: {result.modelId}</div>
                            <div>Date: {result.date}</div>
                            <div>Validated by: {result.validatedBy}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-sm font-medium">Accuracy:</div>
                          <div className="flex items-center gap-2">
                            <Progress 
                              value={result.accuracy}
                              className="w-16 h-2"
                            />
                            <span>{result.accuracy}%</span>
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 text-sm">
                        <div className="font-medium">Comments:</div>
                        <p className="text-muted-foreground">{result.comments}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">View All Validation Reports</Button>
                <Button>Schedule New Validation</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="performance">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Model Performance Trends</CardTitle>
                  <CardDescription>
                    Monitoring model accuracy and predictive performance
                  </CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <Select defaultValue="1y">
                    <SelectTrigger className="w-[120px]">
                      <SelectValue placeholder="Time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3m">3 Months</SelectItem>
                      <SelectItem value="6m">6 Months</SelectItem>
                      <SelectItem value="1y">1 Year</SelectItem>
                      <SelectItem value="2y">2 Years</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="icon">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  {/* Chart would go here */}
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Accuracy Trend</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="space-y-1">
                          <p className="text-3xl font-bold">+1.8%</p>
                          <p className="text-xs text-muted-foreground">Year-over-year improvement</p>
                        </div>
                        <div className="p-2 bg-green-100 rounded-full dark:bg-green-900/20">
                          <ArrowUpRight className="h-5 w-5 text-green-600" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Top Performing Model</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Fraud Detection System</p>
                          <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            94.3%
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Consistently high accuracy with minimal false positives</p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Underperforming Model</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">SME Credit Assessment</p>
                          <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                            76.4%
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">Requires recalibration for mid-sized manufacturers</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="documentation">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5 text-blue-600" />
                    Model Documentation
                  </CardTitle>
                  <CardDescription>
                    Access comprehensive documentation for all models
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <Button variant="link" className="p-0 h-auto text-blue-600">Model Development Guidelines</Button>
                    </li>
                    <li>
                      <Button variant="link" className="p-0 h-auto text-blue-600">Risk Model Inventory</Button>
                    </li>
                    <li>
                      <Button variant="link" className="p-0 h-auto text-blue-600">Model Validation Standards</Button>
                    </li>
                    <li>
                      <Button variant="link" className="p-0 h-auto text-blue-600">Model Risk Framework</Button>
                    </li>
                    <li>
                      <Button variant="link" className="p-0 h-auto text-blue-600">Documentation Templates</Button>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    View All Documents
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-purple-600" />
                    Technical Resources
                  </CardTitle>
                  <CardDescription>
                    Code repositories and technical specifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <Button variant="link" className="p-0 h-auto text-purple-600">Model Code Repositories</Button>
                    </li>
                    <li>
                      <Button variant="link" className="p-0 h-auto text-purple-600">Data Dictionary</Button>
                    </li>
                    <li>
                      <Button variant="link" className="p-0 h-auto text-purple-600">Technical Specifications</Button>
                    </li>
                    <li>
                      <Button variant="link" className="p-0 h-auto text-purple-600">Development Environment</Button>
                    </li>
                    <li>
                      <Button variant="link" className="p-0 h-auto text-purple-600">API Documentation</Button>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <Code className="h-4 w-4 mr-2" />
                    Access Technical Hub
                  </Button>
                </CardFooter>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-gray-600" />
                    Regulatory Compliance
                  </CardTitle>
                  <CardDescription>
                    Regulatory requirements and compliance reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>
                      <Button variant="link" className="p-0 h-auto text-gray-600">Regulatory Guidelines</Button>
                    </li>
                    <li>
                      <Button variant="link" className="p-0 h-auto text-gray-600">Compliance Status Reports</Button>
                    </li>
                    <li>
                      <Button variant="link" className="p-0 h-auto text-gray-600">Audit Trail</Button>
                    </li>
                    <li>
                      <Button variant="link" className="p-0 h-auto text-gray-600">Validation History</Button>
                    </li>
                    <li>
                      <Button variant="link" className="p-0 h-auto text-gray-600">Regulatory Submissions</Button>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <CalendarIcon className="h-4 w-4 mr-2" />
                    View Compliance Calendar
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Model Detail Modal would be implemented here */}
      </div>
    </AppLayout>
  );
}

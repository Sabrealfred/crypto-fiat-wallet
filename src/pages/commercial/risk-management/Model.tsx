
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  LineChart, 
  BarChart, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  CircleSlash, 
  ArrowUpRight, 
  ArrowDownRight,
  FileText,
  AlertTriangle,
  BarChart4,
  ArrowRight
} from "lucide-react";

// Mock data for model risk dashboard
const modelPerformanceData = [
  { month: 'Jan', actual: 76, predicted: 70, variance: 6 },
  { month: 'Feb', actual: 82, predicted: 85, variance: -3 },
  { month: 'Mar', actual: 89, predicted: 87, variance: 2 },
  { month: 'Apr', actual: 94, predicted: 92, variance: 2 },
  { month: 'May', actual: 87, predicted: 90, variance: -3 },
  { month: 'Jun', actual: 92, predicted: 91, variance: 1 },
  { month: 'Jul', actual: 95, predicted: 94, variance: 1 },
  { month: 'Aug', actual: 88, predicted: 89, variance: -1 },
];

const modelInventory = [
  { 
    id: "MDL-001", 
    name: "Credit Scoring Model", 
    type: "Statistical", 
    lastValidated: "2023-10-15", 
    status: "Validated", 
    useCase: "Consumer Lending",
    riskScore: "Low",
    accuracy: 95
  },
  { 
    id: "MDL-002", 
    name: "Market Risk VaR", 
    type: "Monte Carlo", 
    lastValidated: "2023-09-22", 
    status: "Under Review", 
    useCase: "Trading Risk",
    riskScore: "Medium",
    accuracy: 87
  },
  { 
    id: "MDL-003", 
    name: "Loan Default Prediction", 
    type: "Machine Learning", 
    lastValidated: "2023-11-01", 
    status: "Validated", 
    useCase: "Commercial Lending",
    riskScore: "Low",
    accuracy: 92
  },
  { 
    id: "MDL-004", 
    name: "ALM Interest Rate Model", 
    type: "Stochastic", 
    lastValidated: "2023-08-10", 
    status: "Needs Validation", 
    useCase: "Asset Liability Management",
    riskScore: "High",
    accuracy: 78
  },
  { 
    id: "MDL-005", 
    name: "Anti-Fraud Detection", 
    type: "Neural Network", 
    lastValidated: "2023-10-28", 
    status: "Validated", 
    useCase: "Transaction Monitoring",
    riskScore: "Medium",
    accuracy: 91
  },
];

const validationActivity = [
  { 
    id: "VAL-001", 
    model: "Credit Scoring Model", 
    date: "2023-10-15",
    validator: "Sarah Johnson",
    outcome: "Passed",
    findings: "Minor recalibration needed for high-income segment"
  },
  { 
    id: "VAL-002", 
    model: "Market Risk VaR",
    date: "2023-09-22",
    validator: "Michael Chen",
    outcome: "Issues Found",
    findings: "Stress test scenarios need updating to reflect current market conditions"
  },
  { 
    id: "VAL-003", 
    model: "Loan Default Prediction",
    date: "2023-11-01",
    validator: "Robert Williams",
    outcome: "Passed",
    findings: "No material issues found"
  },
];

// Status badge component
const StatusBadge = ({ status }: { status: string }) => {
  let variant: "default" | "outline" | "secondary" | "destructive" | null = null;
  let icon = null;

  switch(status) {
    case "Validated":
      variant = "outline";
      icon = <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1" />;
      break;
    case "Under Review":
      variant = "secondary";
      icon = <Clock className="h-3.5 w-3.5 text-amber-500 mr-1" />;
      break;
    case "Needs Validation":
      variant = "destructive";
      icon = <AlertCircle className="h-3.5 w-3.5 text-red-500 mr-1" />;
      break;
    case "Deprecated":
      variant = "outline";
      icon = <CircleSlash className="h-3.5 w-3.5 text-gray-500 mr-1" />;
      break;
  }

  return (
    <Badge variant={variant} className="flex items-center">
      {icon}
      {status}
    </Badge>
  );
};

export default function ModelRiskPage() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Model Risk Management" 
          description="Validate and monitor risk models across the enterprise"
          showBack={true}
        />

        {/* Dashboard Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Total Models</p>
                  <h3 className="text-2xl font-bold mt-1">27</h3>
                </div>
                <div className="bg-blue-100 dark:bg-blue-800/50 p-2 rounded-full">
                  <BarChart4 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Validated</p>
                  <h3 className="text-2xl font-bold mt-1">19</h3>
                  <p className="text-xs flex items-center text-green-600 mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    70.4% of total
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-800/50 p-2 rounded-full">
                  <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Under Review</p>
                  <h3 className="text-2xl font-bold mt-1">5</h3>
                  <p className="text-xs flex items-center text-amber-600 mt-1">
                    <Clock className="h-3 w-3 mr-1" />
                    18.5% of total
                  </p>
                </div>
                <div className="bg-amber-100 dark:bg-amber-800/50 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Needs Validation</p>
                  <h3 className="text-2xl font-bold mt-1">3</h3>
                  <p className="text-xs flex items-center text-red-600 mt-1">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    11.1% of total
                  </p>
                </div>
                <div className="bg-red-100 dark:bg-red-800/50 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="inventory" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="inventory">Model Inventory</TabsTrigger>
            <TabsTrigger value="performance">Model Performance</TabsTrigger>
            <TabsTrigger value="validation">Validation History</TabsTrigger>
          </TabsList>
          
          {/* Model Inventory Tab */}
          <TabsContent value="inventory">
            <Card>
              <CardHeader>
                <CardTitle>Model Inventory</CardTitle>
                <CardDescription>Complete listing of all risk models in the system</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Model Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Use Case</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Risk Score</TableHead>
                        <TableHead>Accuracy</TableHead>
                        <TableHead>Last Validated</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {modelInventory.map((model) => (
                        <TableRow key={model.id}>
                          <TableCell className="font-mono text-xs">{model.id}</TableCell>
                          <TableCell className="font-medium">{model.name}</TableCell>
                          <TableCell>{model.type}</TableCell>
                          <TableCell>{model.useCase}</TableCell>
                          <TableCell>
                            <StatusBadge status={model.status} />
                          </TableCell>
                          <TableCell>
                            <Badge variant={
                              model.riskScore === "Low" ? "outline" : 
                              model.riskScore === "Medium" ? "secondary" : 
                              "destructive"
                            }>
                              {model.riskScore}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Progress value={model.accuracy} className="h-2 w-20" />
                              <span className="text-xs">{model.accuracy}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-xs">{model.lastValidated}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              Details
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Model Performance Tab */}
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Model Performance Analysis</CardTitle>
                <CardDescription>Tracking accuracy and variance of select models over time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart 
                      data={modelPerformanceData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="actual" 
                        stroke="#3b82f6" 
                        strokeWidth={2} 
                        name="Actual Values" 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="predicted" 
                        stroke="#10b981" 
                        strokeWidth={2} 
                        name="Predicted Values" 
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-semibold mb-3">Model Variance Analysis</h4>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={modelPerformanceData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="variance" fill="#f59e0b" name="Variance (Actual - Predicted)" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Validation History Tab */}
          <TabsContent value="validation">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Validation Activities</CardTitle>
                  <CardDescription>Recent model validation results and findings</CardDescription>
                </div>
                <Button>
                  Schedule Validation
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Model</TableHead>
                        <TableHead>Validation Date</TableHead>
                        <TableHead>Validator</TableHead>
                        <TableHead>Outcome</TableHead>
                        <TableHead>Findings</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {validationActivity.map((activity) => (
                        <TableRow key={activity.id}>
                          <TableCell className="font-mono text-xs">{activity.id}</TableCell>
                          <TableCell className="font-medium">{activity.model}</TableCell>
                          <TableCell>{activity.date}</TableCell>
                          <TableCell>{activity.validator}</TableCell>
                          <TableCell>
                            <Badge variant={activity.outcome === "Passed" ? "outline" : "secondary"}>
                              {activity.outcome === "Passed" ? (
                                <CheckCircle className="h-3.5 w-3.5 text-green-500 mr-1" />
                              ) : (
                                <AlertCircle className="h-3.5 w-3.5 text-amber-500 mr-1" />
                              )}
                              {activity.outcome}
                            </Badge>
                          </TableCell>
                          <TableCell className="max-w-md truncate">
                            {activity.findings}
                          </TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4 mr-2" />
                              Report
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

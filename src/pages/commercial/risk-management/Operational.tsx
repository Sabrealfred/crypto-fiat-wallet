
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  AlertTriangle, 
  FileCheck, 
  ArrowUpRight, 
  ArrowDownRight, 
  Activity, 
  RefreshCw,
  ShieldAlert,
  CheckCircle,
  Plus
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

export default function OperationalRiskPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Operational risk metrics updated successfully");
    }, 1500);
  };

  // Sample data for charts
  const incidentsByCategory = [
    { name: 'Process Failures', value: 14 },
    { name: 'Human Errors', value: 9 },
    { name: 'System Issues', value: 11 },
    { name: 'External Events', value: 4 },
    { name: 'Compliance Breaches', value: 3 },
  ];

  const incidentTrend = [
    { month: 'Jan', incidents: 5 },
    { month: 'Feb', incidents: 8 },
    { month: 'Mar', incidents: 7 },
    { month: 'Apr', incidents: 11 },
    { month: 'May', incidents: 9 },
    { month: 'Jun', incidents: 14 },
    { month: 'Jul', incidents: 10 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Operational Risk Management" 
          description="Identify, assess, and mitigate risks related to operations and processes"
          showBack={true}
        />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Operational Risk Dashboard</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button 
              variant="default" 
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              New Risk Assessment
            </Button>
          </div>
        </div>

        {/* Key Operational Risk Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Active Risks</p>
                  <h3 className="text-2xl font-bold mt-2">41</h3>
                  <p className="text-sm text-red-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +5 since last month
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Recent Incidents</p>
                  <h3 className="text-2xl font-bold mt-2">10</h3>
                  <p className="text-sm text-yellow-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +2 since last month
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Controls Effectiveness</p>
                  <h3 className="text-2xl font-bold mt-2">87%</h3>
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +3% since last assessment
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <ShieldAlert className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Risk Assessments</p>
                  <h3 className="text-2xl font-bold mt-2">6</h3>
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completed this quarter
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <FileCheck className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Risk Incident Charts */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Operational Risk Incidents by Category
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={incidentsByCategory}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({
                        cx,
                        cy,
                        midAngle,
                        innerRadius,
                        outerRadius,
                        percent,
                        name,
                      }) => {
                        const radius = innerRadius + (outerRadius - innerRadius) * 1.1;
                        const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
                        const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);
                        
                        return (
                          <text
                            x={x}
                            y={y}
                            fill="#888888"
                            textAnchor={x > cx ? 'start' : 'end'}
                            dominantBaseline="central"
                            className="text-xs"
                          >
                            {`${name} (${(percent * 100).toFixed(0)}%)`}
                          </text>
                        );
                      }}
                    >
                      {incidentsByCategory.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Incident Trend (Last 6 Months)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={incidentTrend}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="incidents" name="Incidents" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Active Operational Risks */}
        <Card className="mb-6 border-blue-100 dark:border-blue-800">
          <CardHeader>
            <CardTitle>Active Operational Risks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium">Risk ID</th>
                    <th className="text-left py-3 px-4 font-medium">Description</th>
                    <th className="text-left py-3 px-4 font-medium">Category</th>
                    <th className="text-left py-3 px-4 font-medium">Severity</th>
                    <th className="text-left py-3 px-4 font-medium">Likelihood</th>
                    <th className="text-left py-3 px-4 font-medium">Controls</th>
                    <th className="text-left py-3 px-4 font-medium">Status</th>
                    <th className="text-left py-3 px-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { 
                      id: "OR-2024-001", 
                      description: "System outage risks in trading platform", 
                      category: "Technology", 
                      severity: "High", 
                      likelihood: "Medium",
                      controls: "5/7",
                      status: "Monitoring"
                    },
                    { 
                      id: "OR-2024-002", 
                      description: "KYC/AML compliance process failures", 
                      category: "Compliance", 
                      severity: "Critical", 
                      likelihood: "Low",
                      controls: "4/5",
                      status: "Review"
                    },
                    { 
                      id: "OR-2024-003", 
                      description: "Manual processing errors in settlements", 
                      category: "Process", 
                      severity: "Medium", 
                      likelihood: "High",
                      controls: "3/6",
                      status: "Mitigating"
                    },
                    { 
                      id: "OR-2024-004", 
                      description: "Vendor service disruptions", 
                      category: "External", 
                      severity: "Medium", 
                      likelihood: "Medium",
                      controls: "7/8",
                      status: "Monitoring"
                    },
                    { 
                      id: "OR-2024-005", 
                      description: "Unauthorized system access", 
                      category: "Security", 
                      severity: "High", 
                      likelihood: "Low",
                      controls: "10/10",
                      status: "Controlled"
                    },
                  ].map((risk, index) => (
                    <tr key={index} className="border-b">
                      <td className="py-3 px-4">{risk.id}</td>
                      <td className="py-3 px-4 font-medium">{risk.description}</td>
                      <td className="py-3 px-4">{risk.category}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          className={
                            risk.severity === "Critical" 
                              ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400" 
                              : risk.severity === "High"
                                ? "bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                          }
                        >
                          {risk.severity}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Badge 
                          className={
                            risk.likelihood === "High" 
                              ? "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400" 
                              : risk.likelihood === "Medium"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                                : "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          }
                        >
                          {risk.likelihood}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">{risk.controls}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          className={
                            risk.status === "Controlled" 
                              ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" 
                              : risk.status === "Monitoring"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                                : risk.status === "Mitigating"
                                  ? "bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400"
                                  : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                          }
                        >
                          {risk.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <Button variant="outline" size="sm">Review</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Control Framework */}
        <Card className="mb-6 border-blue-100 dark:border-blue-800">
          <CardHeader>
            <CardTitle>Operational Risk Control Framework</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  area: "Technology & Systems",
                  controlCount: 27,
                  effectiveness: 92,
                  lastReview: "2024-03-15",
                  status: "Strong"
                },
                {
                  area: "Financial Processes",
                  controlCount: 18,
                  effectiveness: 86,
                  lastReview: "2024-02-22",
                  status: "Adequate"
                },
                {
                  area: "Regulatory Compliance",
                  controlCount: 15,
                  effectiveness: 94,
                  lastReview: "2024-04-01",
                  status: "Strong"
                },
                {
                  area: "Human Resources",
                  controlCount: 12,
                  effectiveness: 78,
                  lastReview: "2024-01-30",
                  status: "Needs Improvement"
                },
                {
                  area: "Third-Party Management",
                  controlCount: 9,
                  effectiveness: 83,
                  lastReview: "2024-03-05",
                  status: "Adequate"
                },
              ].map((area, index) => (
                <div key={index} className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-lg">
                  <div>
                    <h3 className="font-medium">{area.area}</h3>
                    <div className="text-sm text-muted-foreground">
                      {area.controlCount} controls | Last reviewed: {area.lastReview}
                    </div>
                  </div>
                  <div className="flex items-center mt-2 md:mt-0">
                    <div className="flex flex-col items-end mr-4">
                      <span className="font-medium">{area.effectiveness}%</span>
                      <span className="text-sm text-muted-foreground">Effectiveness</span>
                    </div>
                    <Badge 
                      className={
                        area.status === "Strong" 
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400" 
                          : area.status === "Adequate"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                      }
                    >
                      {area.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

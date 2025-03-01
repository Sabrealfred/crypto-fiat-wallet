
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RiskCategory } from "./types";
import { AlertCircle, Download, Filter } from "lucide-react";
import { useState } from "react";

// Sample historical data for charts
const historicalData = [
  { month: 'Jan', risk: 65, benchmark: 60 },
  { month: 'Feb', risk: 60, benchmark: 60 },
  { month: 'Mar', risk: 70, benchmark: 61 },
  { month: 'Apr', risk: 68, benchmark: 62 },
  { month: 'May', risk: 72, benchmark: 63 },
  { month: 'Jun', risk: 75, benchmark: 64 },
];

const contributionData = [
  { factor: 'Factor A', value: 35 },
  { factor: 'Factor B', value: 25 },
  { factor: 'Factor C', value: 15 },
  { factor: 'Factor D', value: 15 },
  { factor: 'Other', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

interface DetailedRiskAnalysisProps {
  category: RiskCategory;
}

export function DetailedRiskAnalysis({ category }: DetailedRiskAnalysisProps) {
  const [timeFrame, setTimeFrame] = useState("6m");
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{category.title} Analysis</h2>
          <p className="text-muted-foreground">{category.description}</p>
        </div>
        <div className="flex items-center gap-2">
          <Select defaultValue={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Time frame" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1m">Last month</SelectItem>
              <SelectItem value="3m">Last 3 months</SelectItem>
              <SelectItem value="6m">Last 6 months</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {category.metrics.map((metric, index) => (
          <Card key={index} className="border-l-4" style={{ borderLeftColor: getMetricColor(metric.status) }}>
            <CardContent className="pt-6">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-medium text-muted-foreground">{metric.name}</h3>
                <Badge variant={getBadgeVariant(metric.status)}>{metric.status}</Badge>
              </div>
              <p className="text-2xl font-bold mt-2">{metric.value}</p>
              <p className={`text-sm mt-2 ${getChangeColor(metric.change)}`}>{metric.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="trends">
        <TabsList>
          <TabsTrigger value="trends">Trends</TabsTrigger>
          <TabsTrigger value="contributions">Risk Contributions</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trends" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Historical Trend Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={historicalData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="risk" 
                      stroke="#8884d8" 
                      activeDot={{ r: 8 }} 
                      name={`${category.title} Risk Score`}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="benchmark" 
                      stroke="#82ca9d" 
                      name="Industry Benchmark"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contributions" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Factor Contributions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={contributionData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {contributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={contributionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="factor" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Contribution %" fill="#8884d8">
                        {contributionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="alerts" className="pt-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Alerts</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((_, index) => (
                  <div key={index} className="flex items-start gap-4 p-4 border rounded-lg">
                    <AlertCircle className="h-5 w-5 text-yellow-500 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Alert {index + 1}: {category.title} Threshold Exceeded</h4>
                      <p className="text-muted-foreground">The {category.metrics[index % category.metrics.length].name} metric has exceeded the defined threshold by 15%.</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge variant="outline">Auto-detected</Badge>
                        <Badge variant="outline">Medium Priority</Badge>
                        <span className="text-xs text-muted-foreground">2 days ago</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Helper functions
function getMetricColor(status: string): string {
  switch (status) {
    case 'good': return '#22c55e'; // green
    case 'warning': return '#f59e0b'; // yellow
    case 'critical': return '#ef4444'; // red
    default: return '#64748b'; // slate
  }
}

function getBadgeVariant(status: string): 'default' | 'destructive' | 'outline' | 'secondary' {
  switch (status) {
    case 'good': return 'default';
    case 'warning': return 'secondary';
    case 'critical': return 'destructive';
    default: return 'outline';
  }
}

function getChangeColor(change: string): string {
  if (change.includes('+')) return 'text-green-600';
  if (change.includes('-')) return 'text-red-600';
  return 'text-muted-foreground';
}

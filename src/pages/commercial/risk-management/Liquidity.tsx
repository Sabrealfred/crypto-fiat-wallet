
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Droplet, AlertTriangle, TrendingUp, Clock, ArrowUpRight, ArrowDownRight, Download, Calendar } from "lucide-react";
import { useState } from "react";

// Sample data for charts
const liquidityTrendData = [
  { date: '1/1', ratio: 1.8, target: 1.5 },
  { date: '1/2', ratio: 1.7, target: 1.5 },
  { date: '1/3', ratio: 1.6, target: 1.5 },
  { date: '1/4', ratio: 1.5, target: 1.5 },
  { date: '1/5', ratio: 1.45, target: 1.5 },
  { date: '1/6', ratio: 1.48, target: 1.5 },
  { date: '1/7', ratio: 1.52, target: 1.5 },
];

const cashFlowForecastData = [
  { month: 'Jan', inflow: 4500, outflow: 3800 },
  { month: 'Feb', inflow: 5200, outflow: 4200 },
  { month: 'Mar', inflow: 4800, outflow: 4600 },
  { month: 'Apr', inflow: 5500, outflow: 4900 },
  { month: 'May', inflow: 6000, outflow: 5200 },
  { month: 'Jun', inflow: 5800, outflow: 5400 },
];

const stressTestData = [
  { scenario: 'Base', ratio: 1.52 },
  { scenario: 'Mild', ratio: 1.35 },
  { scenario: 'Moderate', ratio: 1.18 },
  { scenario: 'Severe', ratio: 0.92 },
  { scenario: 'Extreme', ratio: 0.78 },
];

export default function LiquidityRiskPage() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Liquidity Risk Management"
          description="Monitor and manage liquidity positions and ratios"
          showBack={true}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {/* Current Liquidity Ratio */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-muted-foreground">Current Liquidity Ratio</p>
                <Droplet className="h-5 w-5 text-blue-500" />
              </div>
              <h3 className="text-2xl font-bold mt-2">1.52</h3>
              <p className="text-sm mt-2 flex items-center text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                +0.04 from yesterday
              </p>
              <div className="mt-4">
                <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                  Above Target
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Current Risk Level */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-muted-foreground">Current Risk Level</p>
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
              </div>
              <h3 className="text-2xl font-bold mt-2">Moderate</h3>
              <p className="text-sm mt-2 flex items-center text-yellow-600">
                Unchanged from last week
              </p>
              <div className="mt-4">
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400">
                  Monitoring
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Liquidity Forecast */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <p className="text-sm font-medium text-muted-foreground">30-Day Forecast</p>
                <TrendingUp className="h-5 w-5 text-green-500" />
              </div>
              <h3 className="text-2xl font-bold mt-2">Improving</h3>
              <p className="text-sm mt-2 flex items-center text-green-600">
                <ArrowUpRight className="h-4 w-4 mr-1" />
                Expected to reach 1.65
              </p>
              <div className="mt-4">
                <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                  <Clock className="h-3 w-3 mr-1" />
                  Updated 2h ago
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="forecast">Cash Flow Forecast</TabsTrigger>
            <TabsTrigger value="stress">Stress Testing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Liquidity Ratio Trend</CardTitle>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={liquidityTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0.5, 2.0]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="ratio" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        name="Liquidity Ratio"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="target" 
                        stroke="#10b981" 
                        strokeDasharray="5 5"
                        name="Target Ratio"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Risk Factors</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Cash Conversion Cycle", status: "good", value: "24 days" },
                      { name: "Short-term Funding Access", status: "warning", value: "Moderate" },
                      { name: "Liquidity Buffer", status: "good", value: "8.2% of assets" },
                      { name: "Counterparty Exposure", status: "critical", value: "High" }
                    ].map((factor, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{factor.name}</p>
                          <p className="text-sm text-muted-foreground">Current: {factor.value}</p>
                        </div>
                        <Badge variant={getBadgeVariant(factor.status)}>
                          {factor.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { 
                        title: "Credit Line Utilization Increased", 
                        date: "2 days ago",
                        description: "Utilization rose from 45% to 62% due to seasonal capital expenditures.",
                        impact: "moderate"
                      },
                      { 
                        title: "New Term Deposit Secured", 
                        date: "1 week ago",
                        description: "Successfully secured $2.5M in 3-month term deposits at 4.2% rate.",
                        impact: "positive"
                      },
                      { 
                        title: "Counterparty Payment Delayed", 
                        date: "10 days ago",
                        description: "Major client requested 15-day extension on $1.8M payment.",
                        impact: "negative"
                      },
                    ].map((event, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{event.title}</h4>
                          <span className="text-xs text-muted-foreground">{event.date}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{event.description}</p>
                        <Badge 
                          variant="outline" 
                          className={`mt-2 ${
                            event.impact === 'positive' ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' : 
                            event.impact === 'negative' ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400' :
                            'bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400'
                          }`}
                        >
                          {event.impact === 'positive' ? 'Positive Impact' : 
                           event.impact === 'negative' ? 'Negative Impact' : 
                           'Moderate Impact'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="forecast" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>6-Month Cash Flow Forecast</CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Change Period
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={cashFlowForecastData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="inflow" 
                        stackId="1" 
                        stroke="#4ade80" 
                        fill="#4ade80" 
                        fillOpacity={0.6}
                        name="Cash Inflows"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="outflow" 
                        stackId="2" 
                        stroke="#f87171" 
                        fill="#f87171" 
                        fillOpacity={0.6}
                        name="Cash Outflows"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium text-sm">Net Position</h4>
                      <p className="text-2xl font-bold text-green-600">+$4,100K</p>
                      <p className="text-xs text-muted-foreground mt-1">Projected 6-month surplus</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium text-sm">Minimum Balance</h4>
                      <p className="text-2xl font-bold">$2,850K</p>
                      <p className="text-xs text-muted-foreground mt-1">Expected in March</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium text-sm">Confidence Level</h4>
                      <p className="text-2xl font-bold">85%</p>
                      <p className="text-xs text-muted-foreground mt-1">Based on historical accuracy</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stress" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Liquidity Stress Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={stressTestData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="scenario" />
                      <YAxis domain={[0, 2]} />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="ratio" 
                        name="Liquidity Ratio" 
                        fill="#3b82f6"
                        barSize={60}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 border rounded-lg p-4 bg-muted/20">
                  <h4 className="font-medium mb-2">Stress Test Scenarios:</h4>
                  <ul className="space-y-2 text-sm">
                    <li><strong>Base:</strong> Normal market conditions, no significant changes.</li>
                    <li><strong>Mild:</strong> 10% reduction in inflows, 5% increase in outflows.</li>
                    <li><strong>Moderate:</strong> 20% reduction in inflows, 15% increase in outflows, 50% credit line reduction.</li>
                    <li><strong>Severe:</strong> 40% reduction in inflows, 25% increase in outflows, 75% credit line reduction.</li>
                    <li><strong>Extreme:</strong> 60% reduction in inflows, 35% increase in outflows, no credit line access.</li>
                  </ul>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium mb-2">Analysis & Recommendations:</h4>
                  <div className="space-y-2 text-sm">
                    <p>The organization maintains adequate liquidity under base and mild stress conditions. Moderate stress conditions are manageable but require close monitoring.</p>
                    <p>Under severe and extreme scenarios, liquidity ratios fall below the regulatory minimum of 1.0, indicating potential liquidity issues.</p>
                    <div className="mt-4 p-3 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
                      <strong>Recommendation:</strong> Increase liquidity buffer by 15% to better withstand severe stress scenarios. Establish additional backup credit facilities with different counterparties.
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

// Helper function
function getBadgeVariant(status: string): 'default' | 'destructive' | 'outline' | 'secondary' {
  switch (status) {
    case 'good': return 'default';
    case 'warning': return 'secondary';
    case 'critical': return 'destructive';
    default: return 'outline';
  }
}

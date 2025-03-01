
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { Droplet, AlertTriangle, TrendingUp, Clock, ArrowUpRight, ArrowDownRight, Download, Calendar, FileText, BarChart as BarChartIcon, Info, Check, XCircle, FileBarChart, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

// Sample data for charts
const liquidityTrendData = [
  { date: 'Jan 1', ratio: 1.8, target: 1.5 },
  { date: 'Jan 8', ratio: 1.7, target: 1.5 },
  { date: 'Jan 15', ratio: 1.6, target: 1.5 },
  { date: 'Jan 22', ratio: 1.5, target: 1.5 },
  { date: 'Jan 29', ratio: 1.45, target: 1.5 },
  { date: 'Feb 5', ratio: 1.48, target: 1.5 },
  { date: 'Feb 12', ratio: 1.52, target: 1.5 },
  { date: 'Feb 19', ratio: 1.55, target: 1.5 },
  { date: 'Feb 26', ratio: 1.57, target: 1.5 },
];

const cashFlowForecastData = [
  { month: 'Mar', inflow: 4500, outflow: 3800 },
  { month: 'Apr', inflow: 5200, outflow: 4200 },
  { month: 'May', inflow: 4800, outflow: 4600 },
  { month: 'Jun', inflow: 5500, outflow: 4900 },
  { month: 'Jul', inflow: 6000, outflow: 5200 },
  { month: 'Aug', inflow: 5800, outflow: 5400 },
];

const stressTestData = [
  { scenario: 'Base', ratio: 1.52 },
  { scenario: 'Mild', ratio: 1.35 },
  { scenario: 'Moderate', ratio: 1.18 },
  { scenario: 'Severe', ratio: 0.92 },
  { scenario: 'Extreme', ratio: 0.78 },
];

const liquidityMetricsData = [
  { 
    metric: "Current Ratio", 
    value: 1.52, 
    change: "+0.04", 
    status: "positive", 
    description: "Current assets divided by current liabilities" 
  },
  { 
    metric: "Quick Ratio", 
    value: 1.27, 
    change: "+0.03", 
    status: "positive", 
    description: "Liquid assets divided by current liabilities" 
  },
  { 
    metric: "Cash Ratio", 
    value: 0.85, 
    change: "+0.02", 
    status: "positive", 
    description: "Cash and equivalents divided by current liabilities" 
  },
  { 
    metric: "Operating Cash Flow Ratio", 
    value: 1.18, 
    change: "-0.05", 
    status: "negative", 
    description: "Operating cash flow divided by current liabilities" 
  },
  { 
    metric: "Defensive Interval", 
    value: 98, 
    change: "+3", 
    status: "positive", 
    description: "Days company can operate with current assets" 
  },
  { 
    metric: "Cash Conversion Cycle", 
    value: 24, 
    change: "-2", 
    status: "positive", 
    description: "Days between cash outflow and inflow from operations" 
  },
];

export default function LiquidityRiskPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showAIRecommendations, setShowAIRecommendations] = useState(false);
  const navigate = useNavigate();
  
  const handleDownloadReport = () => {
    toast.success("Liquidity risk report downloaded successfully");
  };
  
  const handleShowAIRecommendations = () => {
    setShowAIRecommendations(!showAIRecommendations);
    if (!showAIRecommendations) {
      toast.success("AI recommendations generated");
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Liquidity Risk Management"
          description="Monitor and manage liquidity positions and ratios"
          showBack={true}
        />

        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400">
              Risk Level: Moderate
            </Badge>
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400">
              <Clock className="h-3 w-3 mr-1" />
              Updated 2h ago
            </Badge>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleShowAIRecommendations} className="flex items-center gap-2">
              <Info className="h-4 w-4" />
              {showAIRecommendations ? "Hide AI Insights" : "AI Insights"}
            </Button>
            <Button variant="outline" size="sm" onClick={handleDownloadReport} className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Download Report
            </Button>
          </div>
        </div>

        {showAIRecommendations && (
          <Card className="mb-6 border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Info className="h-5 w-5 text-blue-600" />
                AI-Generated Liquidity Risk Insights
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Potential liquidity pressure in Q3</p>
                    <p className="text-sm text-muted-foreground">
                      Our AI model predicts a 26% probability of liquidity pressure in Q3 due to scheduled debt maturities 
                      and projected seasonal decrease in operating cash flows.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Recommended action: Refinance near-term debt</p>
                    <p className="text-sm text-muted-foreground">
                      Consider refinancing $1.8M in debt maturing in July to extend maturity. Current market conditions are favorable with ~50bps lower rates compared to original issuance.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium">Forecasted improvement in Liquidity Coverage Ratio</p>
                    <p className="text-sm text-muted-foreground">
                      Analysis of cash flow patterns indicates your LCR will likely improve to 1.68 within 60 days based on projected receivables and improved collection efficiency.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

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
                +0.04 from last week
              </p>
              <div className="mt-4">
                <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                  Above Target (1.5)
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
              <p className="text-sm mt-2 text-muted-foreground">
                2 warning indicators active
              </p>
              <div className="mt-4">
                <Badge variant="outline" className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400">
                  Monitoring Required
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
                  AI Forecast: 92% Confidence
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
            <TabsTrigger value="forecast">Cash Flow Forecast</TabsTrigger>
            <TabsTrigger value="stress">Stress Testing</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Liquidity Ratio Trend</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => toast.success("Date range updated")}>
                      <Calendar className="h-4 w-4 mr-2" />
                      Last 60 Days
                    </Button>
                    <Button variant="outline" size="sm" onClick={handleDownloadReport}>
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={liquidityTrendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[0.7, 2.0]} />
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
                      { name: "Cash Conversion Cycle", status: "good", value: "24 days", description: "Time between cash outflow for resources and inflow from sales" },
                      { name: "Short-term Funding Access", status: "warning", value: "Moderate", description: "Ability to access additional funding when needed" },
                      { name: "Liquidity Buffer", status: "good", value: "8.2% of assets", description: "Portion of assets held as highly liquid instruments" },
                      { name: "Counterparty Exposure", status: "critical", value: "High", description: "Concentration risk with key counterparties" },
                      { name: "Maturity Mismatch", status: "warning", value: "Moderate", description: "Gap between maturity of assets and liabilities" }
                    ].map((factor, index) => (
                      <div key={index} className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/10 transition-colors">
                        <div>
                          <p className="font-medium">{factor.name}</p>
                          <p className="text-sm text-muted-foreground">Current: {factor.value}</p>
                          <p className="text-xs text-muted-foreground mt-1">{factor.description}</p>
                        </div>
                        <Badge variant={getBadgeVariant(factor.status)}>
                          {factor.status === "good" ? (
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                          ) : factor.status === "warning" ? (
                            <AlertTriangle className="h-3.5 w-3.5 mr-1" />
                          ) : (
                            <XCircle className="h-3.5 w-3.5 mr-1" />
                          )}
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
                      { 
                        title: "Budget Review Completed", 
                        date: "2 weeks ago",
                        description: "Q2 budget review identified $750K in unnecessary expenses to be eliminated.",
                        impact: "positive"
                      },
                    ].map((event, index) => (
                      <div key={index} className="p-3 border rounded-lg hover:bg-muted/10 transition-colors">
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

          <TabsContent value="metrics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileBarChart className="h-5 w-5 text-blue-600" />
                  Key Liquidity Metrics
                </CardTitle>
                <CardDescription>
                  Comprehensive analysis of liquidity position across multiple metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {liquidityMetricsData.map((metric, index) => (
                    <Card key={index} className="overflow-hidden border-muted">
                      <div className="flex border-b p-4">
                        <div className="flex-1">
                          <h4 className="font-medium">{metric.metric}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold">{metric.value}</div>
                          <div className={`text-sm flex items-center justify-end ${
                            metric.status === "positive" ? "text-green-600" : "text-red-600"
                          }`}>
                            {metric.status === "positive" ? 
                              <ArrowUpRight className="h-3.5 w-3.5 mr-1" /> : 
                              <ArrowDownRight className="h-3.5 w-3.5 mr-1" />
                            }
                            {metric.change}
                          </div>
                        </div>
                      </div>
                      <div className="px-4 py-3 bg-muted/5">
                        <div className="flex justify-between items-center text-xs text-muted-foreground">
                          <span>0</span>
                          <span>Benchmark</span>
                          <span>3.0</span>
                        </div>
                        <div className="mt-2 w-full bg-muted h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              metric.status === "positive" ? "bg-green-500" : "bg-red-500"
                            }`}
                            style={{ width: `${Math.min(100, (metric.value / 3) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600" />
                  Liquidity Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="p-4 border rounded-lg bg-muted/10">
                    <h3 className="text-lg font-medium mb-2">Executive Summary</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      The organization maintains an adequate liquidity position with key ratios above industry benchmarks. 
                      However, there are some warning indicators that require monitoring, particularly around counterparty 
                      concentration and potential maturity mismatches in Q3.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="p-3 border rounded-lg bg-green-50 dark:bg-green-900/20">
                        <h4 className="font-medium text-green-800 dark:text-green-400">Strengths</h4>
                        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                          <li>• Strong current and quick ratios</li>
                          <li>• Diversified funding sources</li>
                          <li>• Adequate cash reserves</li>
                          <li>• Improving cash conversion cycle</li>
                        </ul>
                      </div>
                      <div className="p-3 border rounded-lg bg-yellow-50 dark:bg-yellow-900/20">
                        <h4 className="font-medium text-yellow-800 dark:text-yellow-400">Warnings</h4>
                        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                          <li>• Increased credit line utilization</li>
                          <li>• Some concentration in funding sources</li>
                          <li>• Moderate maturity mismatch in Q3</li>
                          <li>• Operating cash flow ratio declining</li>
                        </ul>
                      </div>
                      <div className="p-3 border rounded-lg bg-red-50 dark:bg-red-900/20">
                        <h4 className="font-medium text-red-800 dark:text-red-400">Vulnerabilities</h4>
                        <ul className="mt-2 space-y-1 text-sm text-muted-foreground">
                          <li>• High counterparty exposure</li>
                          <li>• Vulnerability to market liquidity shocks</li>
                          <li>• Limited uncommitted credit facilities</li>
                          <li>• Seasonal cash flow variations</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Key Recommendations</h3>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-0.5" />
                          <span>Diversify counterparty exposure to reduce concentration risk</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-0.5" />
                          <span>Increase committed credit facilities by at least $1.5M</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-0.5" />
                          <span>Review maturity profile and extend debt maturities where possible</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <Check className="h-4 w-4 text-green-600 mt-0.5" />
                          <span>Develop contingency funding plan for possible market disruptions</span>
                        </li>
                      </ul>
                    </div>
                    <div className="flex-1 p-4 border rounded-lg">
                      <h3 className="font-medium mb-2">Next Steps</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Update Q3 liquidity forecast</span>
                          </div>
                          <Badge variant="outline">Due in 7 days</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Review counterparty limits</span>
                          </div>
                          <Badge variant="outline">Due in 14 days</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Negotiate additional credit facilities</span>
                          </div>
                          <Badge variant="outline">Due in 30 days</Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Check className="h-4 w-4 text-green-600" />
                            <span className="text-sm">Update liquidity risk policy</span>
                          </div>
                          <Badge variant="outline">Due in 45 days</Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forecast" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>6-Month Cash Flow Forecast</CardTitle>
                    <CardDescription>AI-powered forecast based on historical data and market trends</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => toast.success("Forecast recalculated with updated parameters")}>
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Recalculate
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

                <div className="mt-6 border rounded-lg p-4">
                  <h3 className="font-medium mb-2">AI Forecast Insights</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start gap-3">
                      <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Seasonal Pattern Detected</p>
                        <p className="text-muted-foreground">
                          The AI model has detected a seasonal pattern in your cash flows, with increased inflows during Q2 and Q4.
                          This pattern has been factored into the forecast with 89% confidence.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Anomaly Detection</p>
                        <p className="text-muted-foreground">
                          The model has identified and adjusted for 3 anomalous transactions in historical data that would otherwise
                          skew the forecast. Removing these outliers improved forecast accuracy by 11%.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Info className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Economic Factors</p>
                        <p className="text-muted-foreground">
                          This forecast incorporates macroeconomic indicators including projected interest rates, sector growth trends,
                          and foreign exchange movements based on consensus forecasts from major financial institutions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stress" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Liquidity Stress Test Results</CardTitle>
                    <CardDescription>
                      Analysis of liquidity position under various stress scenarios
                    </CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => toast.success("New stress test scenario added")}>
                    Create Custom Scenario
                  </Button>
                </div>
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
                      >
                        {stressTestData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.ratio >= 1 ? '#3b82f6' : entry.ratio >= 0.9 ? '#f59e0b' : '#ef4444'} 
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 border rounded-lg p-4 bg-muted/10">
                  <h4 className="font-medium mb-3">Stress Test Scenarios:</h4>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-blue-700 dark:text-blue-400 flex items-center gap-2">
                          <BarChartIcon className="h-4 w-4" />
                          Base Scenario
                        </h5>
                        <p className="text-sm text-muted-foreground mt-1">
                          Normal market conditions, no significant changes. Current liquidity ratio: 1.52
                        </p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-blue-700 dark:text-blue-400 flex items-center gap-2">
                          <BarChartIcon className="h-4 w-4" />
                          Mild Stress
                        </h5>
                        <p className="text-sm text-muted-foreground mt-1">
                          10% reduction in inflows, 5% increase in outflows. Liquidity ratio drops to 1.35
                        </p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-yellow-700 dark:text-yellow-400 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Moderate Stress
                        </h5>
                        <p className="text-sm text-muted-foreground mt-1">
                          20% reduction in inflows, 15% increase in outflows, 50% credit line reduction. Ratio: 1.18
                        </p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-red-700 dark:text-red-400 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Severe Stress
                        </h5>
                        <p className="text-sm text-muted-foreground mt-1">
                          40% reduction in inflows, 25% increase in outflows, 75% credit line reduction. Ratio: 0.92
                        </p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h5 className="font-medium text-red-700 dark:text-red-400 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          Extreme Stress
                        </h5>
                        <p className="text-sm text-muted-foreground mt-1">
                          60% reduction in inflows, 35% increase in outflows, no credit line access. Ratio: 0.78
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium mb-2">Analysis & Recommendations:</h4>
                  <div className="space-y-3 text-sm">
                    <p>
                      The organization maintains adequate liquidity under base and mild stress conditions. Moderate stress conditions are manageable but require close monitoring.
                    </p>
                    <p>
                      Under severe and extreme scenarios, liquidity ratios fall below the regulatory minimum of 1.0, indicating potential liquidity issues.
                    </p>
                    <div className="mt-4 p-3 border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20">
                      <p className="font-medium mb-1">Recommendations:</p>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Increase liquidity buffer by 15% to better withstand severe stress scenarios</li>
                        <li>• Establish additional backup credit facilities with different counterparties</li>
                        <li>• Implement early warning system for key liquidity indicators</li>
                        <li>• Develop detailed contingency funding plan for severe stress scenarios</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-6">
                  <Button onClick={() => navigate("/commercial/risk-management/reports")} className="flex items-center gap-2">
                    View Full Stress Test Report
                    <ArrowUpRight className="h-4 w-4" />
                  </Button>
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

export default LiquidityRiskPage;

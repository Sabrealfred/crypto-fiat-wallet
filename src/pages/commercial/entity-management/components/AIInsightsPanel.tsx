
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  Zap, 
  TrendingUp, 
  AlertTriangle, 
  Brain, 
  ArrowUpRight, 
  ArrowDownRight, 
  RefreshCw, 
  AlertCircle, 
  DollarSign, 
  BarChart3,
  Wallet,
  PieChart as PieChartIcon,
  History,
  MessagesSquare,
  Lightbulb,
  TimerReset,
  Filter,
  Download
} from "lucide-react";

interface AIInsightsPanelProps {
  entityId: number;
  entityName: string;
}

// Sample data for charts and visualizations
const cashFlowForecastData = [
  { date: 'Week 1', actual: 850000, forecast: 900000 },
  { date: 'Week 2', actual: 920000, forecast: 950000 },
  { date: 'Week 3', actual: 880000, forecast: 920000 },
  { date: 'Week 4', actual: 950000, forecast: 980000 },
  { date: 'Week 5', actual: null, forecast: 1000000 },
  { date: 'Week 6', actual: null, forecast: 1050000 },
  { date: 'Week 7', actual: null, forecast: 990000 },
  { date: 'Week 8', actual: null, forecast: 1100000 },
];

const liquidityForecastData = [
  { date: 'Jan', actual: 4.2, forecast: 4.2 },
  { date: 'Feb', actual: 3.8, forecast: 3.7 },
  { date: 'Mar', actual: 4.1, forecast: 4.0 },
  { date: 'Apr', actual: 3.9, forecast: 4.2 },
  { date: 'May', actual: 4.5, forecast: 4.3 },
  { date: 'Jun', actual: null, forecast: 4.6 },
  { date: 'Jul', actual: null, forecast: 4.8 },
  { date: 'Aug', actual: null, forecast: 5.0 },
];

const anomalyDetectionData = [
  { date: '06/01', value: 520000, isAnomaly: false },
  { date: '06/02', value: 490000, isAnomaly: false },
  { date: '06/03', value: 570000, isAnomaly: false },
  { date: '06/04', value: 610000, isAnomaly: false },
  { date: '06/05', value: 950000, isAnomaly: true }, // Anomaly
  { date: '06/06', value: 480000, isAnomaly: false },
  { date: '06/07', value: 420000, isAnomaly: false },
  { date: '06/08', value: 350000, isAnomaly: true }, // Anomaly
  { date: '06/09', value: 560000, isAnomaly: false },
  { date: '06/10', value: 610000, isAnomaly: false }
];

const riskExposureData = [
  { name: 'Market Risk', value: 30 },
  { name: 'Credit Risk', value: 25 },
  { name: 'Operational Risk', value: 15 },
  { name: 'Liquidity Risk', value: 20 },
  { name: 'Compliance Risk', value: 10 }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export const AIInsightsPanel = ({ entityId, entityName }: AIInsightsPanelProps) => {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [askAIInput, setAskAIInput] = useState("");
  const [aiResponses, setAIResponses] = useState([
    {
      question: "What are the main cash flow risks for this entity?",
      answer: "Based on historical data, the main cash flow risks for Acme Global Holdings are seasonal fluctuations in Q3 and accounts receivable delays from Asian market operations. I recommend increasing your cash reserves by 15% before Q3 and implementing stricter payment terms for specific clients in the Asian market.",
      timestamp: "2 hours ago"
    }
  ]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("AI insights refreshed successfully");
    }, 2000);
  };

  const handleAIQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!askAIInput.trim()) return;
    
    // Simulate AI processing
    toast.success("Processing your question...");
    
    setTimeout(() => {
      const newResponse = {
        question: askAIInput,
        answer: "Based on my analysis of the entity's financial data, I recommend optimizing your cash management strategy by pooling resources across your European subsidiaries. This could improve overall liquidity by approximately 12% and reduce financing costs.",
        timestamp: "Just now"
      };
      
      setAIResponses([newResponse, ...aiResponses]);
      setAskAIInput("");
    }, 2000);
  };

  return (
    <Card className="mb-6 border border-blue-100 dark:border-blue-800">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            AI-Powered Insights
          </CardTitle>
          <Button
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            {isRefreshing ? "Refreshing..." : "Refresh Insights"}
          </Button>
        </div>
        <CardDescription>
          Machine learning insights and predictions for {entityName}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="cashflow">
          <div className="flex justify-between items-center mb-4">
            <TabsList>
              <TabsTrigger value="cashflow" className="gap-1">
                <TrendingUp className="h-4 w-4" /> Cash Flow
              </TabsTrigger>
              <TabsTrigger value="liquidity" className="gap-1">
                <Wallet className="h-4 w-4" /> Liquidity
              </TabsTrigger>
              <TabsTrigger value="anomalies" className="gap-1">
                <AlertTriangle className="h-4 w-4" /> Anomalies
              </TabsTrigger>
              <TabsTrigger value="risk" className="gap-1">
                <PieChartIcon className="h-4 w-4" /> Risk Analysis
              </TabsTrigger>
              <TabsTrigger value="assistant" className="gap-1">
                <Brain className="h-4 w-4" /> AI Assistant
              </TabsTrigger>
            </TabsList>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" /> Export Analysis
            </Button>
          </div>
          
          <TabsContent value="cashflow">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Forecast Accuracy</p>
                      <h3 className="text-2xl font-bold mt-2">94.3%</h3>
                      <p className="text-sm text-green-500 mt-1 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        +2.1% vs. last quarter
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                      <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Predicted Q3 Cash Flow</p>
                      <h3 className="text-2xl font-bold mt-2">$4.2M</h3>
                      <p className="text-sm text-green-500 mt-1 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        +12.7% vs. Q2
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                      <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Cash Burn Rate</p>
                      <h3 className="text-2xl font-bold mt-2">$950K</h3>
                      <p className="text-sm text-red-500 mt-1 flex items-center">
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                        -5.2% efficiency
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                      <TimerReset className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">8-Week Cash Flow Forecast</CardTitle>
                <CardDescription>AI-predicted cash flow trends based on historical data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={cashFlowForecastData}>
                      <defs>
                        <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorForecast" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                      <XAxis dataKey="date" />
                      <YAxis 
                        tickFormatter={(value) => 
                          value >= 1000000 
                            ? `$${(value / 1000000).toFixed(1)}M` 
                            : `$${(value / 1000).toFixed(0)}K`
                        } 
                      />
                      <Tooltip />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="actual" 
                        name="Actual Cash Flow" 
                        stroke="#3b82f6" 
                        fillOpacity={1} 
                        fill="url(#colorActual)" 
                        strokeWidth={2}
                        connectNulls
                      />
                      <Area 
                        type="monotone" 
                        dataKey="forecast" 
                        name="Forecast" 
                        stroke="#10b981" 
                        fillOpacity={1} 
                        fill="url(#colorForecast)"
                        strokeWidth={2}
                        strokeDasharray="5 5"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">AI Insights & Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">Cash Flow Optimization</h4>
                        <p className="text-sm">
                          Based on historical patterns and market conditions, we predict a 12.7% increase in Q3 cash flow. 
                          Consider allocating additional resources to your European expansion to maximize ROI during this period.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">Potential Cash Gap</h4>
                        <p className="text-sm">
                          There's a 78% probability of a temporary cash gap in Week 7 due to expected payment delays 
                          from key accounts. Consider adjusting payment terms or securing temporary financing options.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="liquidity">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Current Ratio</p>
                      <h3 className="text-2xl font-bold mt-2">4.5</h3>
                      <p className="text-sm text-green-500 mt-1 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        +0.3 vs. industry avg
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                      <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Liquidity Buffer</p>
                      <h3 className="text-2xl font-bold mt-2">$2.8M</h3>
                      <p className="text-sm text-green-500 mt-1 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        +18% vs. required
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                      <Wallet className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Forecast Confidence</p>
                      <h3 className="text-2xl font-bold mt-2">92.8%</h3>
                      <p className="text-sm text-green-500 mt-1 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        +3.6% model accuracy
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                      <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Liquidity Ratio Forecast</CardTitle>
                <CardDescription>AI-predicted liquidity trends based on financial data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={liquidityForecastData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                      <XAxis dataKey="date" />
                      <YAxis domain={[3, 5.5]} />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="actual" 
                        name="Actual Ratio" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                        connectNulls
                      />
                      <Line 
                        type="monotone" 
                        dataKey="forecast" 
                        name="Forecast" 
                        stroke="#10b981" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line 
                        dataKey={() => 3.5} 
                        name="Minimum Target" 
                        stroke="#f43f5e" 
                        strokeWidth={1}
                        strokeDasharray="3 3"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">AI Insights & Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">Liquidity Optimization</h4>
                        <p className="text-sm">
                          Your current liquidity ratio of 4.5 exceeds industry benchmarks (3.5). Consider deploying 
                          excess capital toward strategic investments to improve returns while maintaining sufficient 
                          liquidity buffer.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">Positive Trend Detected</h4>
                        <p className="text-sm">
                          Our AI models project sustained improvement in your liquidity position over the next quarter.
                          This provides an opportunity to negotiate better terms with suppliers or consider strategic acquisitions.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="anomalies">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Recent Anomalies</p>
                      <h3 className="text-2xl font-bold mt-2">2</h3>
                      <p className="text-sm text-green-500 mt-1 flex items-center">
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                        -3 vs. previous period
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                      <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Detection Accuracy</p>
                      <h3 className="text-2xl font-bold mt-2">96.3%</h3>
                      <p className="text-sm text-green-500 mt-1 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        +2.1% model precision
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                      <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Impact Reduction</p>
                      <h3 className="text-2xl font-bold mt-2">78%</h3>
                      <p className="text-sm text-green-500 mt-1 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        +12% prevention rate
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                      <Filter className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Transaction Anomaly Detection</CardTitle>
                <CardDescription>AI-detected unusual patterns in financial transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={anomalyDetectionData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                      <XAxis dataKey="date" />
                      <YAxis 
                        tickFormatter={(value) => 
                          value >= 1000000 
                            ? `$${(value / 1000000).toFixed(1)}M` 
                            : `$${(value / 1000).toFixed(0)}K`
                        } 
                      />
                      <Tooltip />
                      <Legend />
                      <Bar 
                        dataKey="value" 
                        name="Transaction Volume" 
                        fill="#3b82f6"
                      >
                        {anomalyDetectionData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.isAnomaly ? "#f43f5e" : "#3b82f6"} 
                            strokeWidth={entry.isAnomaly ? 2 : 0}
                            stroke="#f43f5e"
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Detected Anomalies</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">Unusual Transaction Volume (06/05)</h4>
                        <p className="text-sm">
                          Transaction volume spike of $950K (83% above normal). AI identifies this as likely related to 
                          the quarterly payment from Enterprise Client XYZ, received earlier than usual. 
                          <span className="block mt-1">
                            <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                              Not Fraudulent
                            </Badge>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">Unusual Transaction Drop (06/08)</h4>
                        <p className="text-sm">
                          Transaction volume drop to $350K (42% below normal). AI analysis suggests this coincides with 
                          system maintenance at your payment processor. No action required.
                          <span className="block mt-1">
                            <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                              Monitoring
                            </Badge>
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="risk">
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Overall Risk Score</p>
                      <h3 className="text-2xl font-bold mt-2">Medium</h3>
                      <p className="text-sm text-green-500 mt-1 flex items-center">
                        <ArrowDownRight className="h-3 w-3 mr-1" />
                        -12 points vs last assessment
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                      <AlertTriangle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Highest Risk Factor</p>
                      <h3 className="text-2xl font-bold mt-2">Market Risk</h3>
                      <p className="text-sm text-yellow-500 mt-1 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        Stable
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                      <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">AI Risk Confidence</p>
                      <h3 className="text-2xl font-bold mt-2">89.7%</h3>
                      <p className="text-sm text-green-500 mt-1 flex items-center">
                        <ArrowUpRight className="h-3 w-3 mr-1" />
                        +3.2% prediction accuracy
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                      <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">Risk Exposure Distribution</CardTitle>
                  <CardDescription>AI-analyzed risk patterns across risk categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={riskExposureData}
                          cx="50%"
                          cy="50%"
                          innerRadius={70}
                          outerRadius={100}
                          fill="#8884d8"
                          paddingAngle={4}
                          dataKey="value"
                          label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          labelLine={false}
                        >
                          {riskExposureData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value}%`, 'Risk Exposure']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base font-medium">AI Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">Risk Factors Analysis</h4>
                          <p className="text-sm">
                            Our AI models have identified market volatility in Asia-Pacific markets as your primary 
                            risk factor. Consider implementing additional hedging strategies to mitigate this exposure.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">Emerging Risk: Regulatory Changes</h4>
                          <p className="text-sm">
                            AI analysis of regulatory trends indicates a 72% probability of new compliance requirements 
                            in European markets within the next 6-9 months. Proactive preparation is recommended.
                          </p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-400 mt-0.5" />
                        <div>
                          <h4 className="font-medium mb-1">Improved Operational Risk</h4>
                          <p className="text-sm">
                            Your operational risk score has improved by 18% following the implementation of new 
                            digital workflow systems. Continue the digital transformation initiatives.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Risk Mitigation Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4 pb-4 border-b">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                      <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Market Risk Hedging</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Implement forward contracts to hedge against currency fluctuations in Asian markets.
                      </p>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        High Impact (83% confidence)
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4 pb-4 border-b">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                      <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Credit Risk Diversification</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Distribute credit exposure across a wider range of counterparties to reduce concentration risk.
                      </p>
                      <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                        Medium Impact (76% confidence)
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                      <History className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-medium mb-1">Liquidity Risk Management</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Implement a dynamic cash flow forecasting model to better anticipate and manage liquidity needs.
                      </p>
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                        High Impact (91% confidence)
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="assistant">
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Ask AI Assistant</CardTitle>
                <CardDescription>Get instant AI-powered insights and answers about this entity</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAIQuestion} className="flex gap-2 mb-6">
                  <input
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Ask about financial insights, risks, or recommendations..."
                    value={askAIInput}
                    onChange={(e) => setAskAIInput(e.target.value)}
                  />
                  <Button type="submit">Ask AI</Button>
                </form>
                
                <div className="space-y-4">
                  {aiResponses.map((response, index) => (
                    <div key={index} className="p-4 bg-muted rounded-lg">
                      <div className="flex items-start gap-3 mb-2">
                        <div className="bg-primary/10 p-2 rounded-full">
                          <Brain className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <h4 className="font-medium text-sm mb-1">You asked:</h4>
                          <p className="text-sm">{response.question}</p>
                        </div>
                      </div>
                      <div className="ml-10 pl-2 border-l-2 border-primary/20">
                        <p className="text-sm mb-2">{response.answer}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <div className="flex items-center">
                            <MessagesSquare className="h-3 w-3 mr-1" />
                            AI Assistant
                          </div>
                          <span>•</span>
                          <div>{response.timestamp}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base font-medium">Suggested Questions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-3 text-left"
                    onClick={() => {
                      setAskAIInput("What are the main financial risks for this entity in the next quarter?");
                      handleAIQuestion(new Event('submit') as any);
                    }}
                  >
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    What are the main financial risks for this entity in the next quarter?
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-3 text-left"
                    onClick={() => {
                      setAskAIInput("How can we optimize our cash management strategy?");
                      handleAIQuestion(new Event('submit') as any);
                    }}
                  >
                    <DollarSign className="h-4 w-4 mr-2" />
                    How can we optimize our cash management strategy?
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-3 text-left"
                    onClick={() => {
                      setAskAIInput("What trends do you see in our liquidity position?");
                      handleAIQuestion(new Event('submit') as any);
                    }}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    What trends do you see in our liquidity position?
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    className="justify-start h-auto py-3 text-left"
                    onClick={() => {
                      setAskAIInput("Suggest hedging strategies for our currency exposure");
                      handleAIQuestion(new Event('submit') as any);
                    }}
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Suggest hedging strategies for our currency exposure
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

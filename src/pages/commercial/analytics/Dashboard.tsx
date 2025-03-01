
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import {
  BarChart2,
  TrendingUp,
  PieChart,
  Brain,
  AlertTriangle,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';

const performanceData = [
  { month: 'Jan', actual: 420, forecast: 380 },
  { month: 'Feb', actual: 350, forecast: 300 },
  { month: 'Mar', actual: 480, forecast: 450 },
  { month: 'Apr', actual: 520, forecast: 500 },
  { month: 'May', actual: 600, forecast: 550 },
  { month: 'Jun', actual: 650, forecast: 620 }
];

const riskData = [
  { category: 'Market', score: 78, change: 2.4, trend: 'up' },
  { category: 'Credit', score: 65, change: -1.8, trend: 'down' },
  { category: 'Liquidity', score: 82, change: 3.2, trend: 'up' },
  { category: 'Operational', score: 70, change: 0.5, trend: 'up' }
];

const anomalyData = [
  { date: '05/03', value: 84, isAnomaly: false },
  { date: '06/03', value: 82, isAnomaly: false },
  { date: '07/03', value: 86, isAnomaly: false },
  { date: '08/03', value: 95, isAnomaly: true },
  { date: '09/03', value: 88, isAnomaly: false },
  { date: '10/03', value: 85, isAnomaly: false }
];

export default function AnalyticsDashboard() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Analytics & Insights"
          description="Advanced analytics and business intelligence platform"
          showBack={true}
        />

        {/* Key Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-purple-100 dark:border-purple-800">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Performance Score</p>
                  <h3 className="text-2xl font-bold mt-1">86.4</h3>
                  <p className="text-xs flex items-center text-green-600 mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +4.2% vs last month
                  </p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-800/50 p-2 rounded-full">
                  <BarChart2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 dark:border-purple-800">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Forecast Accuracy</p>
                  <h3 className="text-2xl font-bold mt-1">92%</h3>
                  <p className="text-xs flex items-center text-green-600 mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +3.1% improvement
                  </p>
                </div>
                <div className="bg-green-100 dark:bg-green-800/50 p-2 rounded-full">
                  <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 dark:border-purple-800">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">AI Predictions</p>
                  <h3 className="text-2xl font-bold mt-1">14</h3>
                  <p className="text-xs flex items-center text-purple-600 mt-1">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    8 high confidence
                  </p>
                </div>
                <div className="bg-purple-100 dark:bg-purple-800/50 p-2 rounded-full">
                  <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-100 dark:border-purple-800">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Anomalies Detected</p>
                  <h3 className="text-2xl font-bold mt-1">3</h3>
                  <p className="text-xs flex items-center text-amber-600 mt-1">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    1 requires attention
                  </p>
                </div>
                <div className="bg-amber-100 dark:bg-amber-800/50 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="performance" className="space-y-4">
          <TabsList>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="anomalies">Anomaly Detection</TabsTrigger>
            <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-4">
            <Card className="border-purple-100 dark:border-purple-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  Performance vs Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="actual" name="Actual" fill="#8B5CF6" />
                      <Bar dataKey="forecast" name="Forecast" fill="#C4B5FD" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid lg:grid-cols-2 gap-4">
              <Card className="border-purple-100 dark:border-purple-800">
                <CardHeader>
                  <CardTitle>Key Performance Indicators</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Revenue Growth', 'Cost Efficiency', 'Margin Improvement', 'Cash Flow'].map((metric) => (
                      <div key={metric}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{metric}</span>
                          <span className="text-sm text-green-600">
                            +{Math.floor(Math.random() * 10) + 1}%
                          </span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                          <div 
                            className="h-2 rounded-full bg-purple-500" 
                            style={{ width: `${Math.floor(Math.random() * 40) + 60}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-100 dark:border-purple-800">
                <CardHeader>
                  <CardTitle>Regional Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['North America', 'Europe', 'Asia Pacific', 'Latin America'].map((region) => (
                      <div key={region}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{region}</span>
                          <span className="text-sm text-muted-foreground">
                            ${Math.floor(Math.random() * 900) + 100}K
                          </span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                          <div 
                            className="h-2 rounded-full bg-purple-500" 
                            style={{ width: `${Math.floor(Math.random() * 50) + 50}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="risk" className="space-y-4">
            <Card className="border-purple-100 dark:border-purple-800">
              <CardHeader>
                <CardTitle>Risk Assessment Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {riskData.map((item) => (
                    <div key={item.category} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{item.category} Risk</span>
                        <span className={`flex items-center ${
                          item.trend === 'up' ? 'text-amber-600' : 'text-green-600'
                        }`}>
                          {item.trend === 'up' ? (
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                          )}
                          {item.trend === 'up' ? '+' : ''}{item.change}%
                        </span>
                      </div>
                      <div className="w-full bg-secondary h-3 rounded-full">
                        <div 
                          className={`h-3 rounded-full ${
                            item.score > 80 ? 'bg-amber-500' : 
                            item.score > 70 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Low Risk</span>
                        <span>Score: {item.score}/100</span>
                        <span>High Risk</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-purple-100 dark:border-purple-800">
                <CardHeader>
                  <CardTitle>Risk Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Tooltip />
                        <pie
                          data={riskData}
                          dataKey="score"
                          nameKey="category"
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          fill="#8884d8"
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-100 dark:border-purple-800">
                <CardHeader>
                  <CardTitle>Risk Mitigation Actions</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="h-6 w-6 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
                        <span className="text-amber-600 text-xs font-medium">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Increase Liquidity Reserves</p>
                        <p className="text-sm text-muted-foreground">Due 05/15/2024</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5">
                        <span className="text-purple-600 text-xs font-medium">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Hedge Currency Exposure</p>
                        <p className="text-sm text-muted-foreground">Due 05/20/2024</p>
                      </div>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="h-6 w-6 rounded-full bg-purple-100 flex items-center justify-center mt-0.5">
                        <span className="text-purple-600 text-xs font-medium">3</span>
                      </div>
                      <div>
                        <p className="font-medium">Update Risk Models</p>
                        <p className="text-sm text-muted-foreground">Due 05/30/2024</p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="anomalies" className="space-y-4">
            <Card className="border-purple-100 dark:border-purple-800">
              <CardHeader>
                <CardTitle>Anomaly Detection</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={anomalyData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#8B5CF6" 
                        strokeWidth={2}
                      />
                      {anomalyData.filter(d => d.isAnomaly).map((point, index) => (
                        <g key={index}>
                          <circle
                            cx={0} // This will be positioned by recharts
                            cy={0} // This will be positioned by recharts
                            r={8}
                            fill="red"
                            fillOpacity={0.3}
                          />
                        </g>
                      ))}
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-purple-100 dark:border-purple-800 col-span-2 md:col-span-1">
                <CardHeader>
                  <CardTitle>Detected Anomalies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <p className="font-semibold text-red-700 dark:text-red-400">Critical Anomaly</p>
                      </div>
                      <p className="text-sm mb-2">Unusual spike in transaction volume detected on March 8th.</p>
                      <Button size="sm" variant="outline" className="border-red-300 text-red-700">
                        Investigate
                      </Button>
                    </div>

                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        <p className="font-semibold text-amber-700 dark:text-amber-400">Warning</p>
                      </div>
                      <p className="text-sm mb-2">Irregular pattern in foreign exchange transactions.</p>
                      <Button size="sm" variant="outline" className="border-amber-300 text-amber-700">
                        Review
                      </Button>
                    </div>

                    <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
                      <div className="flex items-center gap-2 mb-1">
                        <AlertTriangle className="h-4 w-4 text-amber-600" />
                        <p className="font-semibold text-amber-700 dark:text-amber-400">Warning</p>
                      </div>
                      <p className="text-sm mb-2">Unusual login activity from new location.</p>
                      <Button size="sm" variant="outline" className="border-amber-300 text-amber-700">
                        Review
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-100 dark:border-purple-800 col-span-2 md:col-span-1">
                <CardHeader>
                  <CardTitle>Anomaly Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium mb-2">Time Series Decomposition</h3>
                      <div className="h-[100px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={anomalyData}>
                            <defs>
                              <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Area
                              type="monotone"
                              dataKey="value"
                              stroke="#8B5CF6"
                              fillOpacity={1}
                              fill="url(#colorValue)"
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium mb-2">Machine Learning Detection</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Using LSTM neural networks to detect anomalies in time-series data.
                      </p>
                      <div className="flex gap-2">
                        <div className="bg-purple-100 dark:bg-purple-900/20 px-2 py-1 rounded text-xs text-purple-700 dark:text-purple-300">
                          Algorithm: Isolation Forest
                        </div>
                        <div className="bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded text-xs text-green-700 dark:text-green-300">
                          Confidence: 92%
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="forecasting" className="space-y-4">
            <Card className="border-purple-100 dark:border-purple-800">
              <CardHeader>
                <CardTitle>AI-Powered Forecasting</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={[...performanceData, 
                      { month: 'Jul', actual: null, forecast: 680 },
                      { month: 'Aug', actual: null, forecast: 700 },
                      { month: 'Sep', actual: null, forecast: 750 }
                    ]}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="actual" 
                        stroke="#8B5CF6" 
                        strokeWidth={2}
                        name="Actual"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="forecast" 
                        stroke="#C4B5FD" 
                        strokeWidth={2}
                        strokeDasharray="5 5"
                        name="Forecast"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-purple-100 dark:border-purple-800">
                <CardHeader>
                  <CardTitle>Forecast Accuracy</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['1-Month', '3-Month', '6-Month', '12-Month'].map((period) => (
                      <div key={period}>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{period} Horizon</span>
                          <span className="text-sm text-muted-foreground">
                            {Math.floor(Math.random() * 7) + 90}% Accuracy
                          </span>
                        </div>
                        <div className="w-full bg-secondary h-2 rounded-full">
                          <div 
                            className="h-2 rounded-full bg-purple-500" 
                            style={{ width: `${Math.floor(Math.random() * 10) + 90}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-100 dark:border-purple-800">
                <CardHeader>
                  <CardTitle>Forecasting Models</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">LSTM Neural Network</span>
                        <div className="bg-green-100 dark:bg-green-900/20 px-2 py-0.5 rounded text-xs text-green-700 dark:text-green-300">
                          Active
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Deep learning model for time series forecasting
                      </p>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">Prophet</span>
                        <div className="bg-purple-100 dark:bg-purple-900/20 px-2 py-0.5 rounded text-xs text-purple-700 dark:text-purple-300">
                          Secondary
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Additive model for forecasting with seasonality
                      </p>
                    </div>
                    
                    <div className="border rounded-md p-3">
                      <div className="flex justify-between mb-1">
                        <span className="font-medium">ARIMA</span>
                        <div className="bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded text-xs text-gray-700 dark:text-gray-300">
                          Standby
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Statistical model for time series analysis
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          <Button 
            variant="outline" 
            className="flex-col h-auto py-4 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
            onClick={() => navigate("/commercial/analytics/ml-models")}
          >
            <Brain className="h-5 w-5 mb-2" />
            <span>ML Models</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex-col h-auto py-4 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
            onClick={() => navigate("/commercial/analytics/predictive")}
          >
            <TrendingUp className="h-5 w-5 mb-2" />
            <span>Predictive Analysis</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex-col h-auto py-4 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
            onClick={() => navigate("/commercial/analytics/trends")}
          >
            <BarChart2 className="h-5 w-5 mb-2" />
            <span>Trend Visualization</span>
          </Button>
          <Button 
            variant="outline" 
            className="flex-col h-auto py-4 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800"
            onClick={() => navigate("/commercial/risk-management")}
          >
            <AlertTriangle className="h-5 w-5 mb-2" />
            <span>Risk Analysis</span>
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}

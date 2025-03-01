
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  LineChart, 
  Line, 
  Area,
  AreaChart,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts';
import { 
  Brain, 
  TrendingUp, 
  ArrowRight,
  Calendar,
  Shuffle,
  RefreshCw,
  Layers,
  Zap,
  BarChart3,
  AlertTriangle,
  CheckCircle2,
  HelpCircle
} from "lucide-react";

// Historical and forecasted data
const forecastData = [
  // Historical data
  { month: 'Jan', actual: 8500, forecast: null, lower: null, upper: null, isHistorical: true },
  { month: 'Feb', actual: 9200, forecast: null, lower: null, upper: null, isHistorical: true },
  { month: 'Mar', actual: 9800, forecast: null, lower: null, upper: null, isHistorical: true },
  { month: 'Apr', actual: 10500, forecast: null, lower: null, upper: null, isHistorical: true },
  { month: 'May', actual: 11200, forecast: null, lower: null, upper: null, isHistorical: true },
  { month: 'Jun', actual: 10800, forecast: null, lower: null, upper: null, isHistorical: true },
  // Forecast data
  { month: 'Jul', actual: null, forecast: 11500, lower: 10800, upper: 12200, isHistorical: false },
  { month: 'Aug', actual: null, forecast: 12200, lower: 11300, upper: 13100, isHistorical: false },
  { month: 'Sep', actual: null, forecast: 13000, lower: 11900, upper: 14100, isHistorical: false },
  { month: 'Oct', actual: null, forecast: 13800, lower: 12500, upper: 15100, isHistorical: false },
  { month: 'Nov', actual: null, forecast: 14600, lower: 13100, upper: 16100, isHistorical: false },
  { month: 'Dec', actual: null, forecast: 15400, lower: 13700, upper: 17100, isHistorical: false },
];

// Forecast accuracy by model
const modelAccuracyData = [
  { name: 'ARIMA', accuracy: 92.5, improvement: '+1.2%', status: 'improving' },
  { name: 'Prophet', accuracy: 94.1, improvement: '+2.3%', status: 'improving' },
  { name: 'LSTM', accuracy: 95.8, improvement: '+3.5%', status: 'improving' },
  { name: 'XGBoost', accuracy: 91.2, improvement: '-0.5%', status: 'declining' },
  { name: 'Ensemble', accuracy: 96.2, improvement: '+0.8%', status: 'improving' },
];

// Scenario analysis data
const scenarioData = [
  { month: 'Jul', baseline: 11500, optimistic: 12800, pessimistic: 10200 },
  { month: 'Aug', baseline: 12200, optimistic: 13600, pessimistic: 10700 },
  { month: 'Sep', baseline: 13000, optimistic: 14500, pessimistic: 11400 },
  { month: 'Oct', baseline: 13800, optimistic: 15400, pessimistic: 12000 },
  { month: 'Nov', baseline: 14600, optimistic: 16300, pessimistic: 12700 },
  { month: 'Dec', baseline: 15400, optimistic: 17200, pessimistic: 13500 },
];

// AI insights
const aiInsights = [
  {
    title: "Seasonal Pattern Detected",
    description: "The model has identified a strong seasonal pattern in Q4, suggesting increased economic activity.",
    impact: "Expect 15-18% higher revenue in Q4 compared to Q3.",
    confidence: 92
  },
  {
    title: "Anomaly Warning",
    description: "Recent volatility in market conditions suggests potential disruption in August.",
    impact: "Prepare contingency plans for a possible 5-10% fluctuation in projected revenue.",
    confidence: 78
  },
  {
    title: "Growth Trend",
    description: "The underlying trend shows consistent month-over-month growth of 4.5%.",
    impact: "Current growth rate is sustainable with existing resources through Q3.",
    confidence: 95
  }
];

export function ForecastingTab() {
  const [forecastPeriod, setForecastPeriod] = useState<string>("6months");
  const [forecastView, setForecastView] = useState<string>("baseline");
  
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Brain className="h-4 w-4 text-blue-500" />
              Forecast Accuracy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">96.2%</span>
              <Badge variant="outline" className="text-green-600 border-green-600 ml-2">+2.3%</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Current ML model ensemble accuracy</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Layers className="h-4 w-4 text-purple-500" />
              AI Models Active
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">5</span>
              <Badge variant="outline" className="text-purple-600 border-purple-600 ml-2">+2 new</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Machine learning models in production</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base flex items-center gap-2">
              <Zap className="h-4 w-4 text-amber-500" />
              Prediction Horizon
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <span className="text-3xl font-bold">12 mo</span>
              <Badge variant="outline" className="text-amber-600 border-amber-600 ml-2">+4 months</Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Extended forecasting period</p>
          </CardContent>
        </Card>
      </div>

      {/* Main forecast chart */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                AI-Powered Forecast
              </CardTitle>
              <CardDescription>Predicted financial performance with confidence intervals</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button 
                variant={forecastPeriod === "3months" ? "secondary" : "outline"} 
                size="sm"
                onClick={() => setForecastPeriod("3months")}
              >
                3 Months
              </Button>
              <Button 
                variant={forecastPeriod === "6months" ? "secondary" : "outline"}
                size="sm"
                onClick={() => setForecastPeriod("6months")}
              >
                6 Months
              </Button>
              <Button 
                variant={forecastPeriod === "12months" ? "secondary" : "outline"}
                size="sm"
                onClick={() => setForecastPeriod("12months")}
              >
                12 Months
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={forecastData}>
                <defs>
                  <linearGradient id="colorUpper" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                <XAxis dataKey="month" />
                <YAxis domain={['dataMin - 1000', 'dataMax + 1000']} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-background/95 p-3 rounded-lg shadow-lg border">
                          <p className="font-medium">{label}</p>
                          {data.isHistorical ? (
                            <p className="text-sm text-blue-600">
                              Actual: ${data.actual?.toLocaleString()}
                            </p>
                          ) : (
                            <>
                              <p className="text-sm text-purple-600">
                                Forecast: ${data.forecast?.toLocaleString()}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Range: ${data.lower?.toLocaleString()} - ${data.upper?.toLocaleString()}
                              </p>
                            </>
                          )}
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="upper"
                  stroke="none"
                  fill="url(#colorUpper)"
                  fillOpacity={0.5}
                />
                <Area
                  type="monotone"
                  dataKey="lower"
                  stroke="none"
                  fillOpacity={0}
                />
                <Line
                  type="monotone"
                  dataKey="actual"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                  name="Historical"
                />
                <Line
                  type="monotone"
                  dataKey="forecast"
                  stroke="#8b5cf6"
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  dot={{ r: 5 }}
                  name="Forecast"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="flex items-center justify-between mt-6 text-sm px-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span>Historical Data</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span>Forecast</span>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-3 bg-blue-100 border border-blue-200"></div>
                <span>Confidence Interval (90%)</span>
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-xs h-8 px-2">
              <Calendar className="h-3 w-3 mr-1" />
              Custom Date Range
            </Button>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Recalibrate Model
          </Button>
          <Button variant="outline" size="sm" className="ml-2">
            <Shuffle className="h-4 w-4 mr-2" />
            Run Simulations
          </Button>
          <Button size="sm" className="ml-auto">
            Export Forecast Data
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>

      {/* Model accuracy cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Scenario analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-amber-500" />
              Scenario Analysis
            </CardTitle>
            <CardDescription>Comparing baseline forecast with optimistic and pessimistic scenarios</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 mb-4">
              <Button 
                variant={forecastView === "baseline" ? "secondary" : "outline"} 
                size="sm"
                onClick={() => setForecastView("baseline")}
              >
                Baseline
              </Button>
              <Button 
                variant={forecastView === "optimistic" ? "secondary" : "outline"}
                size="sm"
                onClick={() => setForecastView("optimistic")}
                className="text-green-600 border-green-200 hover:border-green-300"
              >
                Optimistic
              </Button>
              <Button 
                variant={forecastView === "pessimistic" ? "secondary" : "outline"}
                size="sm"
                onClick={() => setForecastView("pessimistic")}
                className="text-red-600 border-red-200 hover:border-red-300"
              >
                Pessimistic
              </Button>
              <Button 
                variant={forecastView === "all" ? "secondary" : "outline"}
                size="sm"
                onClick={() => setForecastView("all")}
              >
                All
              </Button>
            </div>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={scenarioData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  {(forecastView === "baseline" || forecastView === "all") && (
                    <Line
                      type="monotone"
                      dataKey="baseline"
                      stroke="#3b82f6"
                      name="Baseline"
                      strokeWidth={2}
                    />
                  )}
                  {(forecastView === "optimistic" || forecastView === "all") && (
                    <Line
                      type="monotone"
                      dataKey="optimistic"
                      stroke="#10b981"
                      name="Optimistic"
                      strokeWidth={2}
                    />
                  )}
                  {(forecastView === "pessimistic" || forecastView === "all") && (
                    <Line
                      type="monotone"
                      dataKey="pessimistic"
                      stroke="#ef4444"
                      name="Pessimistic"
                      strokeWidth={2}
                    />
                  )}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 border-blue-100 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-blue-600" />
              AI Insights & Recommendations
            </CardTitle>
            <CardDescription>Machine learning generated business intelligence</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {aiInsights.map((insight, index) => (
                <div 
                  key={index} 
                  className="p-3 bg-white dark:bg-background rounded-lg border border-blue-100 dark:border-blue-800"
                >
                  <div className="flex items-start gap-2">
                    {insight.confidence > 90 ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5" />
                    ) : insight.confidence > 80 ? (
                      <HelpCircle className="h-5 w-5 text-blue-500 mt-0.5" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                    )}
                    <div>
                      <h4 className="font-medium text-sm">{insight.title}</h4>
                      <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-xs font-medium text-blue-600 dark:text-blue-400">
                          Impact: {insight.impact}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {insight.confidence}% confidence
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t border-blue-100 dark:border-blue-800 px-6 py-4">
            <Button className="w-full" variant="outline">
              Generate Detailed AI Analysis
            </Button>
          </CardFooter>
        </Card>
      </div>
      
      {/* Model performance card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-purple-500" />
            Model Performance
          </CardTitle>
          <CardDescription>Accuracy and performance metrics of active prediction models</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {modelAccuracyData.map((model, index) => (
              <div key={index} className="border rounded-lg p-3">
                <h4 className="text-sm font-medium text-center">{model.name}</h4>
                <div className="flex justify-center my-2">
                  <div className="h-16 w-16 rounded-full flex items-center justify-center border-4 border-blue-500">
                    <span className="text-lg font-bold">{model.accuracy}%</span>
                  </div>
                </div>
                <div className="flex justify-center">
                  <Badge
                    variant={model.status === 'improving' ? "outline" : "destructive"}
                    className={
                      model.status === 'improving' 
                        ? "text-green-600 border-green-600" 
                        : ""
                    }
                  >
                    {model.improvement}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

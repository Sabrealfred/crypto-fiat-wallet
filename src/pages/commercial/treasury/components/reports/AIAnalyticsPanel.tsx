
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ComposedChart, 
  Area, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  ZAxis,
  LineChart,
  BarChart,
  Bar,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';
import { 
  BrainCircuit, 
  TrendingUp, 
  Brain, 
  AlertTriangle, 
  Zap 
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AIAnalyticsPanelProps {
  forecastData: any[];
  riskCorrelationData: any[];
  anomalyDetectionData: any[];
  riskRadarData: any[];
  formatCurrency: (value: number | string) => string;
}

export const AIAnalyticsPanel: React.FC<AIAnalyticsPanelProps> = ({ 
  forecastData,
  riskCorrelationData,
  anomalyDetectionData,
  riskRadarData,
  formatCurrency
}) => {
  const [predictionView, setPredictionView] = useState("forecast");

  const handleGenerateAIInsights = () => {
    toast.success("AI insights generated successfully");
  };

  return (
    <Card className="border-blue-100 dark:border-blue-800">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-blue-600" />
              AI-Powered Predictive Analysis
            </CardTitle>
            <CardDescription>Machine learning forecasts and anomaly detection</CardDescription>
          </div>
          <div className="flex mt-2 md:mt-0">
            <Button 
              onClick={handleGenerateAIInsights}
              variant="default" 
              size="sm"
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Zap className="h-4 w-4" />
              Generate AI Insights
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="forecast" className="w-full" onValueChange={setPredictionView}>
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="forecast" className="gap-1">
              <TrendingUp className="h-4 w-4" />
              Financial Forecasting
            </TabsTrigger>
            <TabsTrigger value="risk" className="gap-1">
              <Brain className="h-4 w-4" />
              Risk Correlation
            </TabsTrigger>
            <TabsTrigger value="anomaly" className="gap-1">
              <AlertTriangle className="h-4 w-4" />
              Anomaly Detection
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="forecast">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart
                  data={forecastData}
                  margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                  <XAxis dataKey="name" />
                  <YAxis tickFormatter={(value) => `$${value/1000}K`} />
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                  <defs>
                    <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgba(0, 136, 254, 0.3)" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="rgba(0, 136, 254, 0.1)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="monotone" 
                    dataKey="ci_upper" 
                    fillOpacity={0.2} 
                    stroke="transparent" 
                    fill="url(#splitColor)" 
                    name="Confidence Interval (Upper)"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="ci_lower" 
                    fillOpacity={0.2} 
                    stroke="transparent" 
                    fill="transparent" 
                    name="Confidence Interval (Lower)"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#22c55e" 
                    strokeWidth={2} 
                    dot={{ r: 5 }} 
                    name="Actual Performance" 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="forecast" 
                    stroke="#0088FE" 
                    strokeDasharray="5 5" 
                    strokeWidth={2} 
                    dot={{ r: 5 }} 
                    name="AI Forecast" 
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <p className="text-sm flex items-start gap-2">
                <BrainCircuit className="h-5 w-5 text-blue-600 mt-0.5" />
                <span>
                  <strong>AI Insight:</strong> Based on historical trends and current market conditions, 
                  the model predicts a 15% growth in cash flow over the next two quarters with 85% confidence. 
                  Consider increasing short-term investments to capitalize on this positive trend.
                </span>
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="risk">
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart
                  margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                  <XAxis type="number" dataKey="x" name="Risk Level" unit="%" />
                  <YAxis type="number" dataKey="y" name="Correlation" unit="%" />
                  <ZAxis type="number" dataKey="z" range={[100, 1000]} name="Impact" unit="k" />
                  <Tooltip 
                    cursor={{ strokeDasharray: '3 3' }}
                    formatter={(value, name, props) => {
                      if (props.name === 'Impact') return [`$${value}k`, name];
                      return [`${value}%`, name];
                    }} 
                  />
                  <Legend />
                  <Scatter name="Risk Factors" data={riskCorrelationData} fill="#8884d8" />
                </ScatterChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <p className="text-sm flex items-start gap-2">
                <BrainCircuit className="h-5 w-5 text-blue-600 mt-0.5" />
                <span>
                  <strong>AI Risk Assessment:</strong> The analysis indicates that Market Volatility and FX Exposure 
                  present the highest combination of risk level and correlation to your portfolio. 
                  Consider implementing additional hedging strategies for these specific risk factors.
                </span>
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="anomaly">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={anomalyDetectionData}
                    margin={{ top: 10, right: 30, left: 10, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#8884d8" 
                      dot={(props) => {
                        const { cx, cy, payload } = props;
                        if (payload.isAnomaly) {
                          return (
                            <circle 
                              cx={cx} 
                              cy={cy} 
                              r={6} 
                              fill="#ef4444" 
                              stroke="none" 
                            />
                          );
                        }
                        return (
                          <circle 
                            cx={cx} 
                            cy={cy} 
                            r={4} 
                            fill="#8884d8" 
                            stroke="none" 
                          />
                        );
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="threshold" 
                      stroke="#ff7300" 
                      strokeDasharray="5 5" 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Anomaly Detection Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 bg-red-50 dark:bg-red-900/30 rounded-lg">
                        <p className="font-medium text-red-800 dark:text-red-300 mb-1">Detected Anomalies:</p>
                        <ul className="list-disc list-inside text-sm space-y-2">
                          <li>
                            <span className="font-medium">Jan 6:</span> Transaction value 53% above normal threshold
                          </li>
                          <li>
                            <span className="font-medium">Jan 7:</span> Continued elevated activity, 40% above threshold
                          </li>
                          <li>
                            <span className="font-medium">Jan 14:</span> Spike of 100% above normal activity
                          </li>
                        </ul>
                      </div>
                      <div className="p-3 bg-amber-50 dark:bg-amber-900/30 rounded-lg">
                        <p className="font-medium text-amber-800 dark:text-amber-300 mb-1">Potential Causes:</p>
                        <ul className="list-disc list-inside text-sm">
                          <li>Unusual large transaction patterns</li>
                          <li>Potential duplicate transactions</li>
                          <li>Inconsistent recording procedures</li>
                          <li>Possible unauthorized activity</li>
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
              <p className="text-sm flex items-start gap-2">
                <BrainCircuit className="h-5 w-5 text-blue-600 mt-0.5" />
                <span>
                  <strong>AI Anomaly Analysis:</strong> The system has detected three significant anomalies in the transaction 
                  patterns. The most severe occurred on January 14th with a 100% deviation from normal patterns. 
                  Recommended action: Review transactions from Jan 6-7 and Jan 14 for potential irregularities.
                </span>
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

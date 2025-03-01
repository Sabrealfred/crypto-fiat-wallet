
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { TrendingUp, AlertCircle, Lightbulb } from "lucide-react";

const mockForecastData = [
  { month: "Jan", actual: 125000, forecast: 125000, lowerBound: 125000, upperBound: 125000 },
  { month: "Feb", actual: 165000, forecast: 165000, lowerBound: 165000, upperBound: 165000 },
  { month: "Mar", actual: 142000, forecast: 142000, lowerBound: 142000, upperBound: 142000 },
  { month: "Apr", actual: 189000, forecast: 189000, lowerBound: 189000, upperBound: 189000 },
  { month: "May", actual: 212000, forecast: 212000, lowerBound: 212000, upperBound: 212000 },
  { month: "Jun", actual: 195000, forecast: 195000, lowerBound: 195000, upperBound: 195000 },
  { month: "Jul", actual: 205000, forecast: null, lowerBound: null, upperBound: null },
  { month: "Aug", actual: null, forecast: 225000, lowerBound: 210000, upperBound: 240000 },
  { month: "Sep", actual: null, forecast: 248000, lowerBound: 228000, upperBound: 268000 },
  { month: "Oct", actual: null, forecast: 235000, lowerBound: 210000, upperBound: 260000 },
  { month: "Nov", actual: null, forecast: 220000, lowerBound: 190000, upperBound: 250000 },
  { month: "Dec", actual: null, forecast: 260000, lowerBound: 230000, upperBound: 290000 },
];

export function ForecastingCard() {
  const currentForecast = mockForecastData.find(d => d.month === "Aug");
  const previousActual = mockForecastData.find(d => d.month === "Jul");
  
  const forecastChange = currentForecast && previousActual
    ? ((currentForecast.forecast! - previousActual.actual!) / previousActual.actual! * 100).toFixed(1)
    : "0";
    
  return (
    <Card className="border border-blue-100 dark:border-blue-800">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Cash Flow Forecast
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
              <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">Current Month Forecast</div>
              <div className="text-2xl font-semibold">${currentForecast?.forecast?.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                <span className={Number(forecastChange) >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                  {forecastChange}% {Number(forecastChange) >= 0 ? "increase" : "decrease"}
                </span> 
                <span>from last month</span>
              </div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg">
              <div className="text-sm text-blue-600 dark:text-blue-400 mb-1">Confidence Interval</div>
              <div className="flex items-center gap-1">
                <div className="text-xl font-semibold">${currentForecast?.lowerBound?.toLocaleString()}</div>
                <div className="text-muted-foreground">to</div>
                <div className="text-xl font-semibold">${currentForecast?.upperBound?.toLocaleString()}</div>
              </div>
              <div className="text-sm text-muted-foreground mt-1">95% confidence level</div>
            </div>
          </div>
          
          <div className="h-[250px] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={mockForecastData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip 
                  formatter={(value: any) => [`$${Number(value).toLocaleString()}`, ""]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#3b82f6" 
                  activeDot={{ r: 8 }} 
                  name="Actual"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="forecast" 
                  stroke="#10b981" 
                  activeDot={{ r: 8 }} 
                  name="Forecast"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="upperBound" 
                  stroke="#d1d5db" 
                  name="Upper Bound"
                  strokeDasharray="3 3"
                  strokeWidth={1}
                />
                <Line 
                  type="monotone" 
                  dataKey="lowerBound" 
                  stroke="#d1d5db" 
                  name="Lower Bound"
                  strokeDasharray="3 3"
                  strokeWidth={1}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 flex gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800 dark:text-yellow-300">Cash Flow Alert</h4>
              <p className="text-sm text-yellow-800/80 dark:text-yellow-300/80">
                The model predicts a potential cash flow constraint in November. Consider adjusting your accounts payable schedule or drawing from your credit line to maintain optimal liquidity.
              </p>
            </div>
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg border border-blue-200 dark:border-blue-800 flex gap-3">
            <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800 dark:text-blue-300">AI Insight</h4>
              <p className="text-sm text-blue-800/80 dark:text-blue-300/80">
                The forecasting model has detected a seasonal pattern in your cash flows. December typically shows a 15-20% increase from November. The model has incorporated this pattern into the forecast.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

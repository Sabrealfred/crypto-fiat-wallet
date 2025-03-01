
import { 
  ComposedChart, 
  Area, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from 'recharts';
import { BrainCircuit } from "lucide-react";

interface ForecastPanelProps {
  forecastData: any[];
  formatCurrency: (value: number | string) => string;
}

export const ForecastPanel: React.FC<ForecastPanelProps> = ({ 
  forecastData,
  formatCurrency
}) => {
  return (
    <div className="space-y-4">
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
    </div>
  );
};

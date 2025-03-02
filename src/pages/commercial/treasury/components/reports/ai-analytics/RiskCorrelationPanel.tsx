
import { 
  ScatterChart, 
  Scatter, 
  XAxis, 
  YAxis, 
  ZAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer
} from 'recharts';
import { BrainCircuit } from "lucide-react";

interface RiskCorrelationPanelProps {
  riskCorrelationData: Array<{
    x: number;
    y: number;
    z: number;
    name: string;
  }>;
}

export const RiskCorrelationPanel: React.FC<RiskCorrelationPanelProps> = ({ riskCorrelationData }) => {
  return (
    <div className="space-y-4">
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
            <XAxis 
              type="number" 
              dataKey="x" 
              name="Risk Level" 
              unit="%" 
            />
            <YAxis 
              type="number" 
              dataKey="y" 
              name="Correlation" 
              unit="%" 
            />
            <ZAxis 
              type="number" 
              dataKey="z" 
              range={[100, 1000]} 
              name="Impact" 
              unit="k" 
            />
            <Tooltip 
              cursor={{ strokeDasharray: '3 3' }}
              formatter={(value, name, props) => {
                if (name === 'Impact') return [`$${value}k`, name];
                return [`${value}%`, name];
              }} 
            />
            <Legend />
            <Scatter 
              name="Risk Factors" 
              data={riskCorrelationData} 
              fill="#8884d8" 
            />
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
    </div>
  );
};


import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TagStats } from '../types';

interface TagAmountChartProps {
  statsArray: TagStats[];
  anomalies: Record<string, number[]>;
}

export function TagAmountChart({ statsArray, anomalies }: TagAmountChartProps) {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Total Amount by Tag</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={statsArray}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tag" />
            <YAxis />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload as TagStats;
                  const hasAnomaly = anomalies[data.tag]?.some(v => v > 0);
                  
                  return (
                    <div className="bg-white p-3 border rounded-lg shadow">
                      <p className="font-medium">{data.tag}</p>
                      <p>Total: ${data.totalAmount.toLocaleString()}</p>
                      <p>Count: {data.count}</p>
                      <p>Average: ${data.averageAmount.toLocaleString()}</p>
                      {data.monthlyGrowth && (
                        <p className={data.monthlyGrowth > 0 ? 'text-green-600' : 'text-red-600'}>
                          Growth: {data.monthlyGrowth}%
                        </p>
                      )}
                      {hasAnomaly && (
                        <p className="text-yellow-600 font-medium">
                          ⚠️ Anomalías detectadas
                        </p>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="totalAmount" fill="#6366f1" name="Total Amount" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

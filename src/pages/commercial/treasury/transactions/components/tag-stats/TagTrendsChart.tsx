
import { Card } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Brush } from 'recharts';
import { MonthlyTagStats } from '../types';

interface TagTrendsChartProps {
  combinedData: MonthlyTagStats[];
  top5Tags: string[];
  anomalies: Record<string, number[]>;
}

export function TagTrendsChart({ combinedData, top5Tags, anomalies }: TagTrendsChartProps) {
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Monthly Trends & Predictions (Top 5 Tags)</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={combinedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-3 border rounded-lg shadow">
                    <p className="font-medium">{label}</p>
                    {payload.map((entry) => {
                      const tag = entry.dataKey as string;
                      const value = entry.value as number;
                      const isAnomaly = anomalies[tag]?.includes(value);
                      
                      return (
                        <p 
                          key={tag} 
                          style={{ color: entry.color }}
                          className={isAnomaly ? 'font-bold' : ''}
                        >
                          {tag}: ${value?.toLocaleString()}
                          {isAnomaly && ' ⚠️'}
                        </p>
                      );
                    })}
                  </div>
                );
              }
              return null;
            }} />
            <Legend />
            <Brush dataKey="month" height={30} stroke="#8884d8" />
            {top5Tags.map((tag, index) => (
              <Line
                key={tag}
                type="monotone"
                dataKey={tag}
                stroke={`hsl(${index * 60}, 70%, 50%)`}
                strokeWidth={2}
                dot={({ payload }) => {
                  const value = payload[tag];
                  const isAnomaly = anomalies[tag]?.includes(value);
                  return (
                    <circle
                      cx={0}
                      cy={0}
                      r={isAnomaly ? 6 : 4}
                      fill={isAnomaly ? "#fbbf24" : `hsl(${index * 60}, 70%, 50%)`}
                      stroke={isAnomaly ? "#f59e0b" : "none"}
                      strokeWidth={2}
                    />
                  );
                }}
                activeDot={{ r: 6 }}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        ⚠️ Puntos amarillos indican anomalías | Líneas punteadas muestran predicciones
      </p>
    </Card>
  );
}

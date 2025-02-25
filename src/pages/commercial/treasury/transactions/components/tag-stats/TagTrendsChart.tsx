
import { Card } from "@/components/ui/card";
import { MonthlyTagStats } from "../types";
import { TreasuryTransaction } from "@/types/treasury";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export interface TagTrendsChartProps {
  combinedData: MonthlyTagStats[];
  top5Tags: string[];
  anomalies: Record<string, number[]>;
  comparisonData?: TreasuryTransaction[];
}

export function TagTrendsChart({ 
  combinedData, 
  top5Tags, 
  anomalies,
  comparisonData = []
}: TagTrendsChartProps) {
  const colors = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#0088fe'];

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Tendencias por Tag</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={combinedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            {top5Tags.map((tag, index) => (
              <Line
                key={tag}
                type="monotone"
                dataKey={tag}
                stroke={colors[index % colors.length]}
                name={tag}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

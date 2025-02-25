
import { Card } from "@/components/ui/card";
import { TagStats } from "../types";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export interface TagAmountChartProps {
  statsArray: TagStats[];
  anomalies: Record<string, number[]>;
  showPercentages?: boolean;
}

export function TagAmountChart({ statsArray, anomalies, showPercentages = false }: TagAmountChartProps) {
  const data = statsArray.slice(0, 10).map(stat => ({
    tag: stat.tag,
    amount: stat.totalAmount,
    percentageChange: stat.percentageChange
  }));

  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold mb-4">Top 10 Tags por Monto</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tag" />
            <YAxis />
            <Tooltip />
            <Bar 
              dataKey={showPercentages ? "percentageChange" : "amount"} 
              fill="#8884d8" 
              name={showPercentages ? "Variación %" : "Monto"} 
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

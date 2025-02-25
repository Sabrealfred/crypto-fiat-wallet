
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Sep', value: 1200 },
  { name: 'Oct', value: 1400 },
  { name: 'Nov', value: 1600 },
  { name: 'Dec', value: 1450 },
  { name: 'Jan', value: 1800 },
  { name: 'Feb', value: 2000 },
];

export function FinancialHighlights() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Financial Performance</CardTitle>
        <CardDescription>
          Six-month financial metrics overview
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#8b5cf6"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

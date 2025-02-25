
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
  {
    name: 'North',
    revenue: 4000,
    profit: 2400,
  },
  {
    name: 'South',
    revenue: 3000,
    profit: 1398,
  },
  {
    name: 'East',
    revenue: 2000,
    profit: 9800,
  },
  {
    name: 'West',
    revenue: 2780,
    profit: 3908,
  },
];

export function AreaMetrics() {
  return (
    <div className="h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip 
            content={({ active, payload, label }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-background/95 p-3 rounded-lg shadow-lg border">
                    <p className="font-medium">{label} Region</p>
                    <p className="text-sm text-purple-500">
                      Revenue: ${payload[0].value.toLocaleString()}
                    </p>
                    <p className="text-sm text-blue-500">
                      Profit: ${payload[1].value.toLocaleString()}
                    </p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
          <Bar dataKey="profit" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

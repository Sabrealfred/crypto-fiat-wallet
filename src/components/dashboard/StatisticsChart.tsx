
import { Button } from "@/components/ui/button";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MonthlyData {
  month: string;
  earning?: number;
  spending?: number;
  revenue?: number;
  expenses?: number;
}

interface StatisticsChartProps {
  monthlyData: MonthlyData[];
}

export function StatisticsChart({ monthlyData }: StatisticsChartProps) {
  // Transform data if needed - handle both revenue/expenses and earning/spending formats
  const transformedData = monthlyData.map(item => ({
    month: item.month,
    earning: item.earning || item.revenue || 0,
    spending: item.spending || item.expenses || 0
  }));

  return (
    <div className="relative bg-background/95 p-6 rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Statistics</h2>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="bg-purple-500 text-white hover:bg-purple-600">
            Weekly
          </Button>
          <Button variant="outline" size="sm">
            Monthly
          </Button>
          <Button variant="outline" size="sm">
            Yearly
          </Button>
        </div>
      </div>
      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={transformedData}>
            <defs>
              <linearGradient id="earning" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="spending" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
            <XAxis 
              dataKey="month" 
              tickFormatter={(value) => value.slice(0, 3)}
              className="text-xs text-muted-foreground"
            />
            <YAxis 
              tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
              className="text-xs text-muted-foreground"
            />
            <Tooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-background/95 p-3 rounded-lg shadow-lg border">
                      <p className="text-sm font-medium">{payload[0].payload.month}</p>
                      <p className="text-sm text-purple-500">
                        Earnings: ${payload[0].value.toLocaleString()}
                      </p>
                      <p className="text-sm text-red-500">
                        Spending: ${payload[1].value.toLocaleString()}
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="earning"
              stroke="#8b5cf6"
              fillOpacity={1}
              fill="url(#earning)"
            />
            <Area
              type="monotone"
              dataKey="spending"
              stroke="#ef4444"
              fillOpacity={1}
              fill="url(#spending)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}


import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Wallet, ArrowDown, ArrowUp } from "lucide-react";

const cashFlowData = [
  { date: '2024-01', inflow: 2500000, outflow: 1800000 },
  { date: '2024-02', inflow: 2800000, outflow: 2100000 },
  { date: '2024-03', inflow: 3200000, outflow: 2300000 },
  { date: '2024-04', inflow: 2900000, outflow: 2500000 },
  { date: '2024-05', inflow: 3500000, outflow: 2400000 },
  { date: '2024-06', inflow: 3800000, outflow: 2600000 },
];

const metrics = [
  {
    title: "Net Cash Flow",
    value: "$1.2M",
    change: "+12.5%",
    trend: "up",
    icon: Wallet,
    description: "vs. last month"
  },
  {
    title: "Cash Inflow",
    value: "$3.8M",
    change: "+8.2%",
    trend: "up",
    icon: ArrowDown,
    description: "Current month"
  },
  {
    title: "Cash Outflow",
    value: "$2.6M",
    change: "+4.1%",
    trend: "up",
    icon: ArrowUp,
    description: "Current month"
  },
  {
    title: "Forecasted Balance",
    value: "$4.2M",
    change: "+15.3%",
    trend: "up",
    icon: TrendingUp,
    description: "Next month"
  }
];

export default function CashFlowAnalysis() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Cash Flow Analysis" 
          description="Monitor and analyze your cash flow patterns"
        />

        <div className="grid gap-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{metric.title}</p>
                      <h3 className="text-2xl font-bold mt-2">{metric.value}</h3>
                      <div className="flex items-center mt-2">
                        {metric.trend === 'up' ? (
                          <ArrowUpRight className="h-4 w-4 text-green-500" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4 text-red-500" />
                        )}
                        <span className={`text-sm ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                          {metric.change}
                        </span>
                        <span className="text-sm text-muted-foreground ml-2">
                          {metric.description}
                        </span>
                      </div>
                    </div>
                    <metric.icon className="h-5 w-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Cash Flow Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={cashFlowData}>
                    <defs>
                      <linearGradient id="inflow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="outflow" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString('default', { month: 'short' });
                      }}
                    />
                    <YAxis 
                      tickFormatter={(value) => `$${(value / 1000000).toFixed(1)}M`}
                    />
                    <Tooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <div className="bg-background/95 p-3 rounded-lg shadow-lg border">
                              <p className="text-sm font-medium">
                                {new Date(payload[0].payload.date).toLocaleDateString('default', { month: 'long', year: 'numeric' })}
                              </p>
                              <p className="text-sm text-green-500">
                                Inflow: ${payload[0].value.toLocaleString()}
                              </p>
                              <p className="text-sm text-red-500">
                                Outflow: ${payload[1].value.toLocaleString()}
                              </p>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="inflow"
                      stroke="#22c55e"
                      fillOpacity={1}
                      fill="url(#inflow)"
                    />
                    <Area
                      type="monotone"
                      dataKey="outflow"
                      stroke="#ef4444"
                      fillOpacity={1}
                      fill="url(#outflow)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

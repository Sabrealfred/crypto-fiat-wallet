
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { DollarSign, TrendingUp, Percent, Users, ArrowUpRight, ArrowDownRight } from "lucide-react";

const data = [
  { name: 'Jan', value: 2400, investors: 156 },
  { name: 'Feb', value: 2800, investors: 165 },
  { name: 'Mar', value: 3200, investors: 180 },
  { name: 'Apr', value: 3600, investors: 190 },
  { name: 'May', value: 3900, investors: 205 },
  { name: 'Jun', value: 4200, investors: 220 },
];

interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: any;
}

function MetricCard({ title, value, change, icon: Icon }: MetricCardProps) {
  const isPositive = change > 0;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center mt-1">
          {isPositive ? (
            <ArrowUpRight className="h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownRight className="h-4 w-4 text-red-500" />
          )}
          <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
            {Math.abs(change)}%
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default function FundManagement() {
  const metrics = [
    {
      title: "Total AUM",
      value: "$845M",
      change: 12.5,
      icon: DollarSign
    },
    {
      title: "YTD Return",
      value: "18.2%",
      change: 5.3,
      icon: TrendingUp
    },
    {
      title: "Active Investors",
      value: "220",
      change: 8.4,
      icon: Users
    },
    {
      title: "Avg Portfolio Beta",
      value: "0.92",
      change: -2.1,
      icon: Percent
    }
  ];

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Fund Management" 
          description="Overview of fund performance and management"
        />

        <div className="grid gap-6">
          {/* Metrics */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {metrics.map((metric) => (
              <MetricCard key={metric.title} {...metric} />
            ))}
          </div>

          {/* Charts */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <CardHeader>
                <CardTitle>AUM Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#8884d8" 
                        fill="#8884d8" 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="p-6">
              <CardHeader>
                <CardTitle>Investor Growth</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="investors" 
                        stroke="#82ca9d" 
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

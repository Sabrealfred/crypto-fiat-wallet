
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import {
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  RefreshCw,
  CreditCard,
  Globe,
  Building2
} from "lucide-react";

const cashFlowData = [
  { month: 'Jan', inflow: 4000, outflow: 2400 },
  { month: 'Feb', inflow: 3000, outflow: 1398 },
  { month: 'Mar', inflow: 2000, outflow: 9800 },
  { month: 'Apr', inflow: 2780, outflow: 3908 },
  { month: 'May', inflow: 1890, outflow: 4800 },
  { month: 'Jun', inflow: 2390, outflow: 3800 }
];

const liquidityData = [
  { name: 'Week 1', value: 4000 },
  { name: 'Week 2', value: 3000 },
  { name: 'Week 3', value: 5000 },
  { name: 'Week 4', value: 2780 },
  { name: 'Week 5', value: 1890 },
  { name: 'Week 6', value: 2390 }
];

const quickActions = [
  {
    title: "FX Operations",
    icon: Globe,
    path: "/commercial/treasury/fx"
  },
  {
    title: "Payment Processing",
    icon: CreditCard,
    path: "/commercial/payment-processor"
  },
  {
    title: "Cash Pooling",
    icon: RefreshCw,
    path: "/commercial/treasury/cash-flow"
  },
  {
    title: "Transaction Management",
    icon: TrendingUp,
    path: "/commercial/treasury/transactions"
  }
];

const MetricCard = ({ title, value, change, icon: Icon, trend }: {
  title: string;
  value: string;
  change: string;
  icon: any;
  trend: 'up' | 'down';
}) => (
  <Card className="border-blue-100 dark:border-blue-800">
    <CardContent className="pt-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          <p className={`text-sm mt-2 flex items-center ${
            trend === 'up' ? 'text-green-500' : 'text-red-500'
          }`}>
            {trend === 'up' ? (
              <ArrowUpRight className="h-4 w-4 mr-1" />
            ) : (
              <ArrowDownRight className="h-4 w-4 mr-1" />
            )}
            {change}
          </p>
        </div>
        <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function TreasuryDashboard() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Treasury & Cash Management"
          description="Overview of your organization's treasury operations and financial position"
          showBack={true}
        />

        <div className="grid gap-6">
          {/* Key Metrics */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Total Treasury Balance"
              value="$2.4M"
              change="+14.2% vs last month"
              icon={Wallet}
              trend="up"
            />
            <MetricCard
              title="Working Capital"
              value="$890K"
              change="-5.1% vs last month"
              icon={RefreshCw}
              trend="down"
            />
            <MetricCard
              title="FX Exposure"
              value="$340K"
              change="+2.3% vs last month"
              icon={Globe}
              trend="up"
            />
            <MetricCard
              title="Credit Utilization"
              value="65%"
              change="+3.5% vs last month"
              icon={CreditCard}
              trend="up"
            />
          </div>

          {/* Charts Section */}
          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="border-blue-100 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Cash Flow Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={cashFlowData}>
                      <defs>
                        <linearGradient id="inflow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="outflow" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1e40af" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#1e40af" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area
                        type="monotone"
                        dataKey="inflow"
                        stroke="#3b82f6"
                        fillOpacity={1}
                        fill="url(#inflow)"
                      />
                      <Area
                        type="monotone"
                        dataKey="outflow"
                        stroke="#1e40af"
                        fillOpacity={1}
                        fill="url(#outflow)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-100 dark:border-blue-800">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Liquidity Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={liquidityData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#3b82f6"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Button
                key={action.title}
                variant="outline"
                className="h-auto py-4 flex flex-col items-center gap-2 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={() => navigate(action.path)}
              >
                <action.icon className="h-5 w-5" />
                <span>{action.title}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

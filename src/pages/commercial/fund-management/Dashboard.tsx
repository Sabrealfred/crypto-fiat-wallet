
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import {
  TrendingUp,
  ChevronRight,
  DollarSign,
  ChartPie,
  ArrowUpRight,
  ArrowDownRight,
  Brain
} from "lucide-react";

const performanceData = [
  { month: 'Jan', return: 2.5 },
  { month: 'Feb', return: 3.2 },
  { month: 'Mar', return: 2.8 },
  { month: 'Apr', return: 3.5 },
  { month: 'May', return: 4.2 },
  { month: 'Jun', return: 3.8 }
];

const allocationData = [
  { name: 'Equity', value: 45 },
  { name: 'Fixed Income', value: 30 },
  { name: 'Cash', value: 15 },
  { name: 'Alternative', value: 10 }
];

const COLORS = ['#3b82f6', '#1e40af', '#0ea5e9', '#0369a1'];

const quickActions = [
  {
    title: "Portfolio Analysis",
    icon: ChartPie,
    path: "/commercial/fund-management/portfolios"
  },
  {
    title: "AI Portfolios",
    icon: Brain,
    path: "/commercial/fund-management/portfolios/ai"
  },
  {
    title: "Investment Reports",
    icon: DollarSign,
    path: "/commercial/fund-management/reports"
  },
  {
    title: "Trade Securities",
    icon: TrendingUp,
    path: "/commercial/fund-management/trade"
  }
];

const MetricCard = ({ title, value, change, trend }: {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
}) => (
  <Card className="border-blue-100 dark:border-blue-800">
    <CardContent className="pt-6">
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
    </CardContent>
  </Card>
);

export default function FundManagement() {
  const navigate = useNavigate();

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Investment Management" 
          description="Manage and monitor your investment portfolio"
          showBack={true}
        />

        {/* Key Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total Portfolio Value"
            value="$4.2M"
            change="+5.8% vs last month"
            trend="up"
          />
          <MetricCard
            title="YTD Return"
            value="12.4%"
            change="+2.1% vs benchmark"
            trend="up"
          />
          <MetricCard
            title="Risk Score"
            value="Medium"
            change="No change"
            trend="up"
          />
          <MetricCard
            title="Cash Position"
            value="$620K"
            change="-8.3% vs target"
            trend="down"
          />
        </div>

        {/* Performance Chart */}
        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Portfolio Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="return" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ChartPie className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Asset Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={allocationData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-4">
                  {allocationData.map((item, index) => (
                    <div key={item.name} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: COLORS[index] }}
                      />
                      <span className="text-sm">{item.name}</span>
                    </div>
                  ))}
                </div>
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
    </AppLayout>
  );
}


import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
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
  Cell,
  AreaChart,
  Area,
  BarChart,
  Bar,
  Legend
} from 'recharts';
import {
  TrendingUp,
  ChevronRight,
  DollarSign,
  ChartPie,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  AlertCircle,
  Zap,
  Clock,
  ExternalLink,
  FileText,
  FileBarChart,
  RefreshCw,
  ArrowRight,
  Briefcase,
  Bell,
  Percent,
  Ban,
  AlertTriangle,
  BarChart3,
  CircleDollarSign,
  Eye
} from "lucide-react";
import { useState } from "react";

// Sample performance data
const performanceData = [
  { month: 'Jan', return: 2.5, benchmark: 1.8 },
  { month: 'Feb', return: 3.2, benchmark: 2.7 },
  { month: 'Mar', return: 2.8, benchmark: 2.5 },
  { month: 'Apr', return: 3.5, benchmark: 2.9 },
  { month: 'May', return: 4.2, benchmark: 3.2 },
  { month: 'Jun', return: 3.8, benchmark: 3.1 },
  { month: 'Jul', return: 4.5, benchmark: 3.6 },
  { month: 'Aug', return: 4.8, benchmark: 3.4 }
];

// Allocation data
const allocationData = [
  { name: 'Equity', value: 45, change: '+2.3%' },
  { name: 'Fixed Income', value: 30, change: '-1.5%' },
  { name: 'Cash', value: 15, change: '+0.8%' },
  { name: 'Alternative', value: 10, change: '+3.2%' }
];

const COLORS = ['#3b82f6', '#1e40af', '#0ea5e9', '#0369a1'];

// Historical volatility data
const volatilityData = [
  { date: 'Week 1', portfolio: 12, market: 15 },
  { date: 'Week 2', portfolio: 14, market: 18 },
  { date: 'Week 3', portfolio: 11, market: 16 },
  { date: 'Week 4', portfolio: 13, market: 14 },
  { date: 'Week 5', portfolio: 10, market: 13 },
  { date: 'Week 6', portfolio: 9, market: 11 },
  { date: 'Week 7', portfolio: 8, market: 10 },
  { date: 'Week 8', portfolio: 7, market: 9 }
];

// Sector performance
const sectorPerformanceData = [
  { name: 'Technology', value: 8.2 },
  { name: 'Healthcare', value: 5.7 },
  { name: 'Finance', value: 3.4 },
  { name: 'Energy', value: -2.1 },
  { name: 'Utilities', value: 1.8 },
  { name: 'Consumer', value: 4.3 }
];

// Recent alerts data
const recentAlerts = [
  {
    id: 1,
    title: "Portfolio Rebalancing Needed",
    description: "Equity allocation exceeded target range by 3.5%",
    time: "2 hours ago",
    severity: "medium",
    icon: AlertTriangle
  },
  {
    id: 2,
    title: "Liquidity Alert",
    description: "Cash reserves below target threshold",
    time: "5 hours ago",
    severity: "high", 
    icon: AlertCircle
  },
  {
    id: 3,
    title: "Sector Overexposure",
    description: "Technology sector allocation above risk limits",
    time: "1 day ago",
    severity: "medium",
    icon: Ban
  },
  {
    id: 4,
    title: "Dividend Payment",
    description: "Dividend payment of $12,500 received",
    time: "2 days ago",
    severity: "low",
    icon: CircleDollarSign
  }
];

// Quick action items
const quickActions = [
  {
    title: "Portfolio Analysis",
    description: "Review detailed portfolio metrics",
    icon: ChartPie,
    path: "/commercial/fund-management/portfolios"
  },
  {
    title: "AI Portfolios",
    description: "AI-optimized investment strategies",
    icon: Brain,
    path: "/commercial/fund-management/portfolios/ai"
  },
  {
    title: "Investment Reports",
    description: "Generate and export investment reports",
    icon: FileBarChart,
    path: "/commercial/fund-management/reports"
  },
  {
    title: "Trade Securities",
    description: "Execute trades across markets",
    icon: TrendingUp,
    path: "/commercial/fund-management/trade"
  },
  {
    title: "AI Insights",
    description: "AI-powered market intelligence",
    icon: Zap,
    path: "/commercial/fund-management/ai-insights"
  },
  {
    title: "Data Integrations",
    description: "Connect external data sources",
    icon: ExternalLink,
    path: "/commercial/fund-management/data-integrations"
  }
];

// Metric card component
const MetricCard = ({ title, value, change, trend, icon: Icon }: {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down' | 'neutral';
  icon: React.ElementType;
}) => (
  <Card className="border-blue-100 dark:border-blue-800 overflow-hidden">
    <div className="absolute top-0 right-0 pt-3 pr-3">
      <div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-full">
        <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
      </div>
    </div>
    <CardContent className="pt-6">
      <p className="text-sm text-muted-foreground">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
      <p className={`text-sm mt-2 flex items-center ${
        trend === 'up' ? 'text-green-500' : 
        trend === 'down' ? 'text-red-500' : 
        'text-yellow-500'
      }`}>
        {trend === 'up' ? (
          <ArrowUpRight className="h-4 w-4 mr-1" />
        ) : trend === 'down' ? (
          <ArrowDownRight className="h-4 w-4 mr-1" />
        ) : (
          <ArrowRight className="h-4 w-4 mr-1" />
        )}
        {change}
      </p>
    </CardContent>
  </Card>
);

export default function FundManagement() {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Dashboard data refreshed successfully");
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
          <CommercialHeader 
            title="Investment Management" 
            description="Manage and monitor your investment portfolio"
            showBack={true}
          />
          <div className="flex gap-2 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={handleRefresh}
              disabled={isRefreshing}
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              {isRefreshing ? "Refreshing..." : "Refresh Data"}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={() => navigate("/commercial/fund-management/reports")}
            >
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total Portfolio Value"
            value="$4.28M"
            change="+5.8% vs last month"
            trend="up"
            icon={Briefcase}
          />
          <MetricCard
            title="YTD Return"
            value="12.4%"
            change="+2.1% vs benchmark"
            trend="up"
            icon={Percent}
          />
          <MetricCard
            title="Risk Score"
            value="Medium"
            change="No change"
            trend="neutral"
            icon={AlertTriangle}
          />
          <MetricCard
            title="Cash Position"
            value="$620K"
            change="-8.3% vs target"
            trend="down"
            icon={DollarSign}
          />
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Left Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Performance Chart */}
            <Card className="border-blue-100 dark:border-blue-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Portfolio Performance
                  </CardTitle>
                  <CardDescription>
                    Historical returns compared to benchmark
                  </CardDescription>
                </div>
                <Badge variant="outline" className="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                  Last 8 months
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={performanceData}>
                      <defs>
                        <linearGradient id="colorReturn" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorBenchmark" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#64748b" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#64748b" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => [`${value}%`, null]} />
                      <Legend />
                      <Area 
                        type="monotone" 
                        dataKey="return" 
                        name="Portfolio Return"
                        stroke="#3b82f6" 
                        fillOpacity={1}
                        fill="url(#colorReturn)"
                        strokeWidth={2}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="benchmark" 
                        name="Benchmark"
                        stroke="#64748b" 
                        fillOpacity={1}
                        fill="url(#colorBenchmark)"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Volatility & Risk Analysis */}
            <Card className="border-blue-100 dark:border-blue-800">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Volatility Analysis
                  </CardTitle>
                  <CardDescription>
                    Portfolio volatility compared to market
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" onClick={() => navigate('/commercial/fund-management/risk')}>
                  Detailed Analysis
                </Button>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={volatilityData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line 
                        type="monotone" 
                        dataKey="portfolio" 
                        name="Portfolio Volatility" 
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="market" 
                        name="Market Volatility" 
                        stroke="#94a3b8"
                        strokeWidth={2}
                        dot={{ r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Sector Performance */}
            <Card className="border-blue-100 dark:border-blue-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <ChartPie className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Sector Performance (%)
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={sectorPerformanceData}>
                      <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                      <XAxis dataKey="name" />
                      <YAxis tickFormatter={(value) => `${value}%`} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Return']} />
                      <Bar 
                        dataKey="value" 
                        name="Return" 
                        fill={(entry) => entry.value >= 0 ? "#3b82f6" : "#ef4444"}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column (1/3 width) */}
          <div className="space-y-6">
            {/* Asset Allocation */}
            <Card className="border-blue-100 dark:border-blue-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <ChartPie className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Asset Allocation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={allocationData}
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {allocationData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => [`${value}%`, 'Allocation']} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="mt-2 space-y-2">
                  {allocationData.map((item, index) => (
                    <div key={item.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: COLORS[index] }}
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <div className="text-sm flex items-center">
                        {item.change.startsWith('+') ? (
                          <ArrowUpRight className="h-3 w-3 text-green-500 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 text-red-500 mr-1" />
                        )}
                        <span className={item.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}>
                          {item.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card className="border-blue-100 dark:border-blue-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                      <div className={`p-2 rounded-full flex-shrink-0 ${
                        alert.severity === 'high' ? 'bg-red-100 text-red-600 dark:bg-red-900/20 dark:text-red-400' :
                        alert.severity === 'medium' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' :
                        'bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                      }`}>
                        <alert.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium">{alert.title}</h4>
                        <p className="text-xs text-muted-foreground mt-1">{alert.description}</p>
                        <div className="flex items-center gap-1 mt-2">
                          <Clock className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{alert.time}</span>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm" className="flex-shrink-0">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="outline" className="w-full mt-2">View All Alerts</Button>
                </div>
              </CardContent>
            </Card>

            {/* Quick Access Card */}
            <Card className="border-blue-100 dark:border-blue-800">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {quickActions.map((action) => (
                    <Button
                      key={action.title}
                      variant="outline"
                      className="h-auto py-4 px-3 flex flex-col items-center justify-center gap-2 border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                      onClick={() => navigate(action.path)}
                    >
                      <action.icon className="h-5 w-5" />
                      <span className="text-sm text-center">{action.title}</span>
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Data Integration Section */}
        <Card className="border-blue-100 dark:border-blue-800 mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Data Automation & Integrations
            </CardTitle>
            <CardDescription>
              Connect external data sources and automate your investment workflows
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-start text-left gap-2"
                onClick={() => navigate("/commercial/fund-management/data-integrations")}
              >
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                  <FileBarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium">Market Data Sources</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Connect to Bloomberg, Reuters, or custom market data feeds
                  </p>
                </div>
                <div className="mt-2 flex items-center text-blue-600 dark:text-blue-400 text-sm">
                  Configure <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-start text-left gap-2"
                onClick={() => navigate("/commercial/fund-management/data-integrations")}
              >
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                  <Brain className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium">AI Modeling</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Set up AI models for market prediction and portfolio optimization
                  </p>
                </div>
                <div className="mt-2 flex items-center text-blue-600 dark:text-blue-400 text-sm">
                  Configure <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </Button>

              <Button
                variant="outline"
                className="h-auto p-4 flex flex-col items-start text-left gap-2"
                onClick={() => navigate("/commercial/fund-management/data-integrations")}
              >
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
                  <ExternalLink className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-medium">ERP & Accounting</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Integrate with QuickBooks, SAP, or custom financial systems
                  </p>
                </div>
                <div className="mt-2 flex items-center text-blue-600 dark:text-blue-400 text-sm">
                  Configure <ChevronRight className="h-4 w-4 ml-1" />
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

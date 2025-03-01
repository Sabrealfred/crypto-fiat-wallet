
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  BarChart,
  Bar,
  Legend,
  AreaChart,
  Area
} from 'recharts';
import {
  TrendingUp,
  ChevronRight,
  DollarSign,
  ChartPie,
  ArrowUpRight,
  ArrowDownRight,
  Brain,
  BarChart3,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
  Clock,
  Globe,
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Mock data
const performanceData = [
  { month: 'Jan', return: 2.5 },
  { month: 'Feb', return: 3.2 },
  { month: 'Mar', return: 2.8 },
  { month: 'Apr', return: 3.5 },
  { month: 'May', return: 4.2 },
  { month: 'Jun', return: 3.8 },
  { month: 'Jul', return: 4.5 },
  { month: 'Aug', return: 3.9 },
  { month: 'Sep', return: 4.3 }
];

const allocationData = [
  { name: 'Equity', value: 45 },
  { name: 'Fixed Income', value: 30 },
  { name: 'Cash', value: 15 },
  { name: 'Alternative', value: 10 }
];

const sectorAllocationData = [
  { name: 'Technology', value: 22 },
  { name: 'Healthcare', value: 18 },
  { name: 'Financial', value: 16 },
  { name: 'Consumer', value: 14 },
  { name: 'Industrial', value: 12 },
  { name: 'Energy', value: 10 },
  { name: 'Others', value: 8 }
];

const geographicData = [
  { name: 'North America', value: 55 },
  { name: 'Europe', value: 25 },
  { name: 'Asia Pacific', value: 15 },
  { name: 'Other Regions', value: 5 }
];

const portfolioBreakdownData = [
  { name: 'Large Cap', value: 45 },
  { name: 'Mid Cap', value: 30 },
  { name: 'Small Cap', value: 15 },
  { name: 'Micro Cap', value: 10 }
];

const riskReturnData = [
  { name: 'Portfolio A', risk: 12, return: 15, size: 800 },
  { name: 'Portfolio B', risk: 18, return: 20, size: 1200 },
  { name: 'Portfolio C', risk: 8, return: 10, size: 500 },
  { name: 'Portfolio D', risk: 22, return: 22, size: 1000 },
  { name: 'Portfolio E', risk: 15, return: 18, size: 900 },
  { name: 'Portfolio F', risk: 5, return: 8, size: 400 },
  { name: 'Portfolio G', risk: 25, return: 24, size: 1100 }
];

const historicalReturnsData = [
  { year: '2018', return: 7.2 },
  { year: '2019', return: 12.5 },
  { year: '2020', return: 9.8 },
  { year: '2021', return: 18.3 },
  { year: '2022', return: -5.2 },
  { year: '2023', return: 14.7 },
  { year: 'YTD', return: 8.4 }
];

const marketMoversData = [
  { name: 'TECH Corp', change: 5.2, price: 142.75, sector: 'Technology' },
  { name: 'HEALTH Inc', change: 3.8, price: 98.31, sector: 'Healthcare' },
  { name: 'FIN Group', change: -2.1, price: 67.45, sector: 'Financial' },
  { name: 'ENERGY Ltd', change: 7.9, price: 41.22, sector: 'Energy' },
  { name: 'CONSUMER Brands', change: -1.8, price: 112.36, sector: 'Consumer' }
];

// Chart color schemes
const COLORS = ['#3b82f6', '#1e40af', '#0ea5e9', '#0369a1'];
const SECTOR_COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#dbeafe', '#f0f9ff', '#e0f2fe'];
const REGION_COLORS = ['#2563eb', '#4f46e5', '#7c3aed', '#9333ea'];
const SIZE_COLORS = ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];

// Quick action buttons
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

// Component for metric cards
const MetricCard = ({ title, value, change, trend, icon: Icon }: {
  title: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon?: React.ComponentType<{ className?: string }>;
}) => (
  <Card className="border-blue-100 dark:border-blue-800">
    <CardContent className="pt-6">
      <div className="flex justify-between items-start mb-2">
        <p className="text-sm text-muted-foreground">{title}</p>
        {Icon && <Icon className="h-5 w-5 text-blue-500" />}
      </div>
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

// Component for market movers table
const MarketMoversTable = ({ data }: { data: any[] }) => (
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead>
        <tr className="border-b border-border">
          <th className="text-left py-2 px-3 text-sm font-medium text-muted-foreground">Security</th>
          <th className="text-left py-2 px-3 text-sm font-medium text-muted-foreground">Sector</th>
          <th className="text-right py-2 px-3 text-sm font-medium text-muted-foreground">Price</th>
          <th className="text-right py-2 px-3 text-sm font-medium text-muted-foreground">Change</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index} className="border-b border-border/50 hover:bg-muted/30">
            <td className="py-2 px-3 text-sm font-medium">{item.name}</td>
            <td className="py-2 px-3 text-sm text-muted-foreground">{item.sector}</td>
            <td className="py-2 px-3 text-sm text-right">${item.price}</td>
            <td className={`py-2 px-3 text-sm text-right font-medium ${
              item.change > 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              {item.change > 0 ? '+' : ''}{item.change}%
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

// Component for investment opportunities
const InvestmentOpportunity = ({ title, description, tag, type }: {
  title: string;
  description: string;
  tag: string;
  type: 'high' | 'medium' | 'low';
}) => {
  const getBgColor = () => {
    switch (type) {
      case 'high': return 'bg-blue-100 dark:bg-blue-900/30';
      case 'medium': return 'bg-purple-100 dark:bg-purple-900/30';
      case 'low': return 'bg-green-100 dark:bg-green-900/30';
      default: return 'bg-gray-100 dark:bg-gray-900/30';
    }
  };
  
  const getTextColor = () => {
    switch (type) {
      case 'high': return 'text-blue-700 dark:text-blue-400';
      case 'medium': return 'text-purple-700 dark:text-purple-400';
      case 'low': return 'text-green-700 dark:text-green-400';
      default: return 'text-gray-700 dark:text-gray-400';
    }
  };
  
  return (
    <Card className={`border-0 ${getBgColor()}`}>
      <CardContent className="p-4">
        <Badge variant="outline" className={`mb-2 ${getTextColor()} border-current`}>
          {tag}
        </Badge>
        <h4 className="font-medium text-base mb-1">{title}</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

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
            icon={DollarSign}
          />
          <MetricCard
            title="YTD Return"
            value="12.4%"
            change="+2.1% vs benchmark"
            trend="up"
            icon={TrendingUp}
          />
          <MetricCard
            title="Risk Score"
            value="Medium"
            change="No change"
            trend="up"
            icon={ShieldCheck}
          />
          <MetricCard
            title="Cash Position"
            value="$620K"
            change="-8.3% vs target"
            trend="down"
            icon={DollarSign}
          />
        </div>

        {/* Main content with tabs */}
        <Tabs defaultValue="overview" className="mb-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="allocation">Allocation</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="market">Market Data</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="mt-4 space-y-6">
            <div className="grid lg:grid-cols-2 gap-6">
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
                <CardFooter className="border-t pt-4 flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Monthly performance trend</p>
                  <Button variant="outline" size="sm" className="text-xs h-8">
                    View Details <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardFooter>
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
                <CardFooter className="border-t pt-4 flex justify-between items-center">
                  <p className="text-sm text-muted-foreground">Current asset allocation</p>
                  <Button variant="outline" size="sm" className="text-xs h-8">
                    Rebalance <ChevronRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            {/* AI Insights Section */}
            <Card className="border-blue-100 dark:border-blue-800 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    AI-Powered Insights
                  </CardTitle>
                  <Badge variant="outline" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    New
                  </Badge>
                </div>
                <CardDescription>
                  Recommendations and insights based on your portfolio performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <InvestmentOpportunity 
                    title="Tech Sector Overweight"
                    description="Consider reducing exposure to technology stocks to rebalance portfolio risk."
                    tag="Rebalancing"
                    type="high"
                  />
                  <InvestmentOpportunity 
                    title="ESG Opportunity"
                    description="Add sustainable energy assets to improve ESG profile and diversification."
                    tag="Diversification"
                    type="medium"
                  />
                  <InvestmentOpportunity 
                    title="Cash Deployment"
                    description="Excess cash could be deployed in short-term treasuries for higher yields."
                    tag="Optimization"
                    type="low"
                  />
                </div>
              </CardContent>
              <CardFooter className="border-t pt-4">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  onClick={() => navigate('/commercial/fund-management/ai-insights')}
                >
                  <Brain className="mr-2 h-4 w-4" />
                  View All AI Insights
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* Allocation Tab */}
          <TabsContent value="allocation" className="mt-4 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sector Allocation</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sectorAllocationData}
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {sectorAllocationData.map((entry, index) => (
                            <Cell key={`sector-${index}`} fill={SECTOR_COLORS[index % SECTOR_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Geographic Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={geographicData}
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {geographicData.map((entry, index) => (
                            <Cell key={`geo-${index}`} fill={REGION_COLORS[index % REGION_COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Breakdown by Market Cap</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={portfolioBreakdownData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#3b82f6" name="% of Portfolio" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Performance Tab */}
          <TabsContent value="performance" className="mt-4 space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Risk vs Return Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={riskReturnData}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="risk" fill="#ef4444" name="Risk %" />
                        <Bar dataKey="return" fill="#22c55e" name="Return %" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Historical Returns</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={historicalReturnsData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" />
                        <YAxis />
                        <Tooltip />
                        <Area 
                          type="monotone" 
                          dataKey="return" 
                          stroke="#3b82f6" 
                          fill="#3b82f680" 
                          name="Return %"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  Performance Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Sharpe Ratio</p>
                    <p className="text-2xl font-bold mt-1">1.8</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Above average</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Alpha</p>
                    <p className="text-2xl font-bold mt-1">2.4%</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Outperforming benchmark</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Beta</p>
                    <p className="text-2xl font-bold mt-1">0.85</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Lower volatility</p>
                  </div>
                  <div className="bg-blue-50 dark:bg-blue-900/10 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">Max Drawdown</p>
                    <p className="text-2xl font-bold mt-1">-12.3%</p>
                    <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">Within risk parameters</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Market Tab */}
          <TabsContent value="market" className="mt-4 space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-blue-600" />
                      Market Movers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <MarketMoversTable data={marketMoversData} />
                  </CardContent>
                  <CardFooter className="border-t pt-4">
                    <Button variant="outline" size="sm" className="ml-auto">
                      View All <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="h-5 w-5 text-blue-600" />
                      Market Indices
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center pb-2 border-b">
                        <div>
                          <p className="font-medium">S&P 500</p>
                          <p className="text-sm text-muted-foreground">US</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">4,782.82</p>
                          <p className="text-sm text-green-500">+0.38%</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <div>
                          <p className="font-medium">NASDAQ</p>
                          <p className="text-sm text-muted-foreground">US</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">16,742.39</p>
                          <p className="text-sm text-green-500">+0.51%</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <div>
                          <p className="font-medium">FTSE 100</p>
                          <p className="text-sm text-muted-foreground">UK</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">7,652.49</p>
                          <p className="text-sm text-red-500">-0.22%</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center pb-2 border-b">
                        <div>
                          <p className="font-medium">NIKKEI 225</p>
                          <p className="text-sm text-muted-foreground">Japan</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">38,024.68</p>
                          <p className="text-sm text-green-500">+0.17%</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">DAX</p>
                          <p className="text-sm text-muted-foreground">Germany</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">18,384.35</p>
                          <p className="text-sm text-red-500">-0.15%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            <Card className="border-amber-100 dark:border-amber-800/50 bg-amber-50/50 dark:bg-amber-900/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                    Market Alerts
                  </CardTitle>
                  <Badge variant="outline" className="bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400">
                    3 New
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-white dark:bg-background rounded-lg border border-amber-200 dark:border-amber-800">
                    <p className="font-medium">Federal Reserve Interest Rate Decision</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Fed expected to announce rate decision tomorrow at 2:00 PM ET
                    </p>
                    <div className="flex justify-between mt-2">
                      <p className="text-xs text-muted-foreground">High Impact</p>
                      <p className="text-xs text-amber-600">10/12/2023</p>
                    </div>
                  </div>
                  <div className="p-3 bg-white dark:bg-background rounded-lg border border-amber-200 dark:border-amber-800">
                    <p className="font-medium">Earnings Season Impact</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Major tech companies reporting earnings next week may impact market
                    </p>
                    <div className="flex justify-between mt-2">
                      <p className="text-xs text-muted-foreground">Medium Impact</p>
                      <p className="text-xs text-amber-600">10/15/2023</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
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

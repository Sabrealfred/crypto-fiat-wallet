
import { AppLayout } from "@/components/layout/app-layout";
import { StatisticsCards } from "@/components/dashboard/StatisticsCards";
import { StatisticsChart } from "@/components/dashboard/StatisticsChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Globe2, 
  Briefcase, 
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight 
} from "lucide-react";
import { Link } from "react-router-dom";

export default function PrivateBankingDashboard() {
  const monthlyData = [
    { month: "September", earning: 4820000, spending: 380000 },
    { month: "October", earning: 4950000, spending: 410000 },
    { month: "November", earning: 5210000, spending: 430000 },
    { month: "December", earning: 5450000, spending: 439200 },
    { month: "January", earning: 5680000, spending: 445000 },
    { month: "February", earning: 5910000, spending: 460000 },
  ];

  const portfolioMetrics = [
    {
      title: "Portfolio Value",
      value: "$5.8M",
      subtitle: "Total Assets",
      icon: Briefcase,
      change: "+8.5%",
      color: "bg-blue-500"
    },
    {
      title: "International Assets",
      value: "45%",
      subtitle: "Of total portfolio",
      icon: Globe2,
      color: "bg-purple-500"
    },
    {
      title: "Annual Returns",
      value: "21.4%",
      subtitle: "Year to date",
      icon: ArrowUpRight,
      change: "+2.3%",
      color: "bg-green-500"
    },
    {
      title: "Active Investments",
      value: "12",
      subtitle: "Investment vehicles",
      icon: DollarSign,
      color: "bg-orange-500"
    }
  ];

  const wealthInsights = [
    {
      title: "Equity Performance",
      value: "+18.5%",
      trend: "up",
      description: "Strong market growth"
    },
    {
      title: "Fixed Income",
      value: "+5.2%",
      trend: "up",
      description: "Stable returns"
    },
    {
      title: "Real Estate",
      value: "+9.4%",
      trend: "up",
      description: "Property appreciation"
    },
    {
      title: "Alternative Investments",
      value: "-2.1%",
      trend: "down",
      description: "Market volatility"
    }
  ];

  const currentEarning = monthlyData[monthlyData.length - 1].earning;
  const previousEarning = monthlyData[monthlyData.length - 2].earning;
  const currentSpending = monthlyData[monthlyData.length - 1].spending;
  const previousSpending = monthlyData[monthlyData.length - 2].spending;

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Private Banking</h1>
          <p className="text-muted-foreground">
            Your personalized wealth management overview
          </p>
        </div>

        <div className="grid gap-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {portfolioMetrics.map((metric, index) => (
              <div key={index} className="glass-card p-6">
                <div className="flex justify-between items-start mb-4">
                  <div className={`${metric.color} p-2 rounded-lg text-white`}>
                    <metric.icon className="h-5 w-5" />
                  </div>
                  {metric.change && (
                    <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      {metric.change}
                    </span>
                  )}
                </div>
                <h3 className="text-sm text-muted-foreground mb-1">{metric.title}</h3>
                <p className="text-2xl font-semibold mb-1">{metric.value}</p>
                <p className="text-sm text-muted-foreground">{metric.subtitle}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            {wealthInsights.map((insight, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {insight.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{insight.value}</span>
                    {insight.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {insight.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <StatisticsCards 
            currentEarning={currentEarning}
            previousEarning={previousEarning}
            currentSpending={currentSpending}
            previousSpending={previousSpending}
          />

          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass-card p-6">
              <StatisticsChart monthlyData={monthlyData} />
            </div>
            
            <div className="glass-card p-6">
              <h2 className="text-lg font-semibold mb-4">Wealth Services</h2>
              <div className="space-y-3">
                <Link to="/wealth-planning" className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Wealth Planning</h3>
                      <p className="text-sm text-muted-foreground">Long-term strategy</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>

                <Link to="/portfolio-advisory" className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Globe2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Portfolio Advisory</h3>
                      <p className="text-sm text-muted-foreground">Investment guidance</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>

                <Link to="/tax-planning" className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Tax Planning</h3>
                      <p className="text-sm text-muted-foreground">Tax optimization</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

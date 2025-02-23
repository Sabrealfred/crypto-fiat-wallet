
import { AppLayout } from "@/components/layout/app-layout";
import { StatisticsCards } from "@/components/dashboard/StatisticsCards";
import { StatisticsChart } from "@/components/dashboard/StatisticsChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Building2, 
  Users, 
  Globe2, 
  Briefcase, 
  ChevronRight, 
  ArrowUpRight,
  ArrowDownRight,
  DollarSign
} from "lucide-react";
import { Link } from "react-router-dom";

export default function CommercialDashboard() {
  const monthlyData = [
    { month: "September", earning: 1820000, spending: 480000 },
    { month: "October", earning: 1950000, spending: 510000 },
    { month: "November", earning: 2010000, spending: 530000 },
    { month: "December", earning: 2150000, spending: 539200 },
    { month: "January", earning: 2280000, spending: 545000 },
    { month: "February", earning: 2410000, spending: 560000 },
  ];

  const commercialMetrics = [
    {
      title: "Global Operations",
      value: "12",
      subtitle: "Countries",
      icon: Globe2,
      change: "+2",
      color: "bg-blue-500"
    },
    {
      title: "Business Units",
      value: "8",
      subtitle: "Active divisions",
      icon: Building2,
      color: "bg-purple-500"
    },
    {
      title: "Total Workforce",
      value: "1,234",
      subtitle: "Employees",
      icon: Users,
      change: "+45",
      color: "bg-green-500"
    },
    {
      title: "Active Projects",
      value: "86",
      subtitle: "Across divisions",
      icon: Briefcase,
      change: "+12",
      color: "bg-orange-500"
    }
  ];

  const financialHighlights = [
    {
      title: "Revenue Growth",
      value: "+24.5%",
      trend: "up",
      description: "vs. previous quarter"
    },
    {
      title: "Operating Margin",
      value: "32.8%",
      trend: "up",
      description: "Above target"
    },
    {
      title: "Cash Flow",
      value: "-12.4%",
      trend: "down",
      description: "Below expectations"
    },
    {
      title: "Market Share",
      value: "+2.3%",
      trend: "up",
      description: "Growing steadily"
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
          <h1 className="text-2xl font-semibold mb-2">Commercial Banking Portal</h1>
          <p className="text-muted-foreground">
            Comprehensive overview of your enterprise operations
          </p>
        </div>

        <div className="grid gap-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {commercialMetrics.map((metric, index) => (
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
            {financialHighlights.map((highlight, index) => (
              <Card key={index}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {highlight.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{highlight.value}</span>
                    {highlight.trend === 'up' ? (
                      <ArrowUpRight className="h-4 w-4 text-green-500" />
                    ) : (
                      <ArrowDownRight className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {highlight.description}
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
              <h2 className="text-lg font-semibold mb-4">Enterprise Services</h2>
              <div className="space-y-3">
                <Link to="/treasury" className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <DollarSign className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Treasury Management</h3>
                      <p className="text-sm text-muted-foreground">Cash flow and liquidity</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>

                <Link to="/trade-finance" className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Globe2 className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Trade Finance</h3>
                      <p className="text-sm text-muted-foreground">International operations</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>

                <Link to="/risk-management" className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Risk Management</h3>
                      <p className="text-sm text-muted-foreground">Hedging and analysis</p>
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

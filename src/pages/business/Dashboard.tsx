
import { AppLayout } from "@/components/layout/app-layout";
import { StatisticsCards } from "@/components/dashboard/StatisticsCards";
import { StatisticsChart } from "@/components/dashboard/StatisticsChart";
import { Button } from "@/components/ui/button";
import { Users, FileText, Briefcase, Building2, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function BusinessDashboard() {
  // Sample data - In a real app this would come from your backend
  const monthlyData = [
    { month: "September", earning: 182000, spending: 48000 },
    { month: "October", earning: 195000, spending: 51000 },
    { month: "November", earning: 201000, spending: 53000 },
    { month: "December", earning: 215000, spending: 53920 },
    { month: "January", earning: 228000, spending: 54500 },
    { month: "February", earning: 241000, spending: 56000 },
  ];

  const businessMetrics = [
    {
      title: "Employees",
      value: "125",
      change: "+12%",
      icon: Users,
      color: "bg-blue-500"
    },
    {
      title: "Invoices",
      value: "1,234",
      change: "+8%",
      icon: FileText,
      color: "bg-green-500"
    },
    {
      title: "Projects",
      value: "25",
      change: "+2",
      icon: Briefcase,
      color: "bg-purple-500"
    },
    {
      title: "Departments",
      value: "8",
      icon: Building2,
      color: "bg-orange-500"
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
          <h1 className="text-2xl font-semibold mb-2">Business Overview</h1>
          <p className="text-muted-foreground">
            Welcome back to your business dashboard
          </p>
        </div>

        <div className="grid gap-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {businessMetrics.map((metric, index) => (
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
                <p className="text-2xl font-semibold">{metric.value}</p>
              </div>
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
              <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <Link to="/payroll" className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Payroll Management</h3>
                      <p className="text-sm text-muted-foreground">Process employee payments</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>

                <Link to="/invoices" className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Invoice Management</h3>
                      <p className="text-sm text-muted-foreground">Create and manage invoices</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>

                <Link to="/expenses" className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Briefcase className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Expense Tracking</h3>
                      <p className="text-sm text-muted-foreground">Monitor business expenses</p>
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

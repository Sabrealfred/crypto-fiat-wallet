
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, DollarSign, TrendingUp, BarChart, Calendar, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";

export default function ExpensesPage() {
  const expenseMetrics = [
    {
      title: "Total Expenses",
      value: "$84,320",
      trend: "up",
      change: "+3.8%",
      icon: TrendingUp
    },
    {
      title: "Operating Costs",
      value: "$45,150",
      trend: "down",
      change: "-2.1%",
      icon: BarChart
    },
    {
      title: "Pending Approvals",
      value: "$12,840",
      trend: "up",
      change: "+5 requests",
      icon: Calendar
    }
  ];

  const expenseServices = [
    {
      title: "Expense Reports",
      description: "Submit and manage expense reports",
      icon: FileText,
      status: "8 pending reports"
    },
    {
      title: "Budget Tracking",
      description: "Monitor departmental budgets and spending",
      icon: DollarSign,
      status: "On target"
    },
    {
      title: "Approval Workflow",
      description: "Review and approve expense requests",
      icon: Calendar,
      status: "5 items need review"
    },
    {
      title: "Expense Analytics",
      description: "Analyze spending patterns and trends",
      icon: BarChart,
      status: "Updated daily"
    }
  ];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-6">
        <CommercialHeader 
          title="Expense Management"
          description="Track, manage, and analyze business expenses efficiently"
          showBack={true}
        />

        {/* Métricas de Gastos */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {expenseMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <metric.icon 
                  className={
                    metric.trend === "up" === (metric.title !== "Operating Costs")
                      ? "h-4 w-4 text-green-500" 
                      : "h-4 w-4 text-red-500"
                  } 
                />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={`text-xs mt-1 ${
                  metric.trend === "up" === (metric.title !== "Operating Costs")
                    ? "text-green-500" 
                    : "text-red-500"
                }`}>
                  {metric.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Servicios de Gastos */}
        <div className="grid md:grid-cols-2 gap-6">
          {expenseServices.map((service, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                  {service.title}
                </CardTitle>
                <service.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-2">
                  {service.description}
                </p>
                <p className="text-sm text-primary mb-4">
                  {service.status}
                </p>
                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/expenses/${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    Access
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

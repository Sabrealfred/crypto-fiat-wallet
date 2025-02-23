
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Calendar, DollarSign, FileText, User, TrendingUp, TrendingDown, BarChart } from "lucide-react";

export default function PayrollPage() {
  const payrollServices = [
    {
      title: "Payroll Processing",
      description: "Process employee salaries and compensation",
      icon: DollarSign,
      status: "Next run: 25th May"
    },
    {
      title: "Employee Management",
      description: "Manage employee records and information",
      icon: User,
      status: "150 active employees"
    },
    {
      title: "Tax Management",
      description: "Handle payroll taxes and deductions",
      icon: FileText,
      status: "Up to date"
    },
    {
      title: "Payment Schedule",
      description: "Configure and manage payment schedules",
      icon: Calendar,
      status: "Monthly"
    }
  ];

  const payrollMetrics = [
    {
      title: "Monthly Payroll",
      value: "$245,500",
      trend: "up",
      change: "+2.5%",
      icon: TrendingUp
    },
    {
      title: "Benefits Cost",
      value: "$52,300",
      trend: "down",
      change: "-1.2%",
      icon: TrendingDown
    },
    {
      title: "Tax Withholding",
      value: "$38,900",
      trend: "up",
      change: "+1.8%",
      icon: BarChart
    }
  ];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Payroll Management</h1>
          <p className="text-muted-foreground">
            Streamline your payroll processing and employee compensation
          </p>
        </div>

        {/* Métricas de Nómina */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {payrollMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <metric.icon 
                  className={
                    metric.trend === "up" 
                      ? "h-4 w-4 text-green-500" 
                      : "h-4 w-4 text-red-500"
                  } 
                />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={`text-xs mt-1 ${
                  metric.trend === "up" 
                    ? "text-green-500" 
                    : "text-red-500"
                }`}>
                  {metric.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Servicios de Nómina */}
        <div className="grid md:grid-cols-2 gap-6">
          {payrollServices.map((service, index) => (
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
                <Button variant="outline" className="w-full">
                  Manage
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

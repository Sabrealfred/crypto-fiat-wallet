
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, FileText, TrendingUp, BarChart, Calendar, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

export default function InvoicesPage() {
  const invoiceMetrics = [
    {
      title: "Total Outstanding",
      value: "$128,450",
      trend: "up",
      change: "+5.2%",
      icon: TrendingUp
    },
    {
      title: "Overdue Invoices",
      value: "$34,200",
      trend: "down",
      change: "-2.8%",
      icon: BarChart
    },
    {
      title: "Average Payment Time",
      value: "15 days",
      trend: "up",
      change: "+1 day",
      icon: Calendar
    }
  ];

  const invoiceServices = [
    {
      title: "Create Invoice",
      description: "Generate new invoices for your clients",
      icon: FileText,
      status: "Last created: Today"
    },
    {
      title: "Payment Processing",
      description: "Track and process invoice payments",
      icon: DollarSign,
      status: "5 pending payments"
    },
    {
      title: "Due Invoices",
      description: "Monitor upcoming and overdue invoices",
      icon: Calendar,
      status: "3 due this week"
    },
    {
      title: "Invoice Analytics",
      description: "View detailed invoice analytics and reports",
      icon: BarChart,
      status: "Updated hourly"
    }
  ];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Invoice Management</h1>
          <p className="text-muted-foreground">
            Create, track, and manage your business invoices efficiently
          </p>
        </div>

        {/* Métricas de Facturas */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {invoiceMetrics.map((metric, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {metric.title}
                </CardTitle>
                <metric.icon 
                  className={`h-4 w-4 ${
                    metric.trend === "up" === (metric.title !== "Overdue Invoices")
                      ? "text-green-500" 
                      : "text-red-500"
                  }`}
                />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{metric.value}</div>
                <p className={`text-xs mt-1 ${
                  metric.trend === "up" === (metric.title !== "Overdue Invoices")
                    ? "text-green-500" 
                    : "text-red-500"
                }`}>
                  {metric.change} from last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Servicios de Facturación */}
        <div className="grid md:grid-cols-2 gap-6">
          {invoiceServices.map((service, index) => (
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
                  <Link to={`/invoices/${service.title.toLowerCase().replace(/\s+/g, '-')}`}>
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

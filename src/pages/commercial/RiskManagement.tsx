
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ChevronRight, 
  Shield, 
  LineChart, 
  AlertTriangle, 
  Lock, 
  TrendingUp, 
  DollarSign, 
  Users,
  Building2,
  Scale,
  FileWarning
} from "lucide-react";

const riskCategories = [
  {
    title: "Market Risk Analysis",
    description: "Monitor and analyze market risk exposure",
    icon: LineChart,
    metrics: [
      { name: "VaR (Value at Risk)", value: "2.3M", change: "+0.5%" },
      { name: "Position Limit Usage", value: "67%", change: "-3%" },
      { name: "Market Volatility Index", value: "18.4", change: "+2.1" }
    ]
  },
  {
    title: "Credit Risk Assessment",
    description: "Evaluate and manage counterparty risks",
    icon: Shield,
    metrics: [
      { name: "Total Exposure", value: "12.8M", change: "+1.2%" },
      { name: "Default Probability", value: "0.8%", change: "-0.1%" },
      { name: "Credit Rating Distribution", value: "A+", change: "stable" }
    ]
  },
  {
    title: "Operational Risk",
    description: "Identify and mitigate operational risks",
    icon: AlertTriangle,
    metrics: [
      { name: "Incident Rate", value: "0.05%", change: "-0.02%" },
      { name: "System Uptime", value: "99.9%", change: "+0.1%" },
      { name: "Control Effectiveness", value: "94%", change: "+2%" }
    ]
  },
  {
    title: "Compliance Management",
    description: "Ensure regulatory compliance and reporting",
    icon: Lock,
    metrics: [
      { name: "Compliance Score", value: "96%", change: "+1%" },
      { name: "Open Findings", value: "3", change: "-2" },
      { name: "Regulatory Reports", value: "100%", change: "stable" }
    ]
  }
];

const additionalRisks = [
  {
    title: "Liquidity Risk",
    description: "Monitor and manage liquidity positions",
    icon: DollarSign,
  },
  {
    title: "Counterparty Risk",
    description: "Track and assess trading partner risks",
    icon: Users,
  },
  {
    title: "Country Risk",
    description: "Evaluate geographical exposure risks",
    icon: Building2,
  },
  {
    title: "Legal & Regulatory Risk",
    description: "Monitor compliance and legal exposure",
    icon: Scale,
  },
  {
    title: "Model Risk",
    description: "Validate and monitor risk models",
    icon: FileWarning,
  },
  {
    title: "Trading Risk",
    description: "Monitor trading activities and limits",
    icon: TrendingUp,
  }
];

export default function RiskManagementPage() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Risk Management Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive risk analysis and management tools
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {riskCategories.map((category, index) => (
            <Card key={index} className="relative overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                  {category.title}
                </CardTitle>
                <category.icon className="h-5 w-5 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {category.description}
                </p>
                <div className="space-y-4">
                  {category.metrics.map((metric, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{metric.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{metric.value}</span>
                        <span className={`text-xs ${
                          metric.change.includes('+') 
                            ? 'text-green-500' 
                            : metric.change.includes('-') 
                            ? 'text-red-500' 
                            : 'text-muted-foreground'
                        }`}>
                          {metric.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full mt-4">
                  Ver Detalles
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <h2 className="text-xl font-semibold mb-4">Additional Risk Categories</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {additionalRisks.map((risk, index) => (
            <Card key={index} className="hover:bg-accent/50 transition-colors cursor-pointer">
              <CardHeader className="flex flex-row items-center space-y-0 pb-2">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <risk.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-sm font-semibold">
                      {risk.title}
                    </CardTitle>
                    <p className="text-xs text-muted-foreground">
                      {risk.description}
                    </p>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

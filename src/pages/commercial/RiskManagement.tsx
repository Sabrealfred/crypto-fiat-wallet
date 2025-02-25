import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  FileWarning,
  RefreshCw
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

type RiskMetric = {
  name: string;
  value: string;
  change: string;
  status: 'good' | 'warning' | 'critical' | 'neutral';
};

type RiskCategory = {
  title: string;
  description: string;
  icon: any;
  metrics: RiskMetric[];
  lastUpdate?: string;
};

const riskCategories: RiskCategory[] = [
  {
    title: "Market Risk Analysis",
    description: "Monitor and analyze market risk exposure",
    icon: LineChart,
    lastUpdate: "2024-03-15T14:30:00",
    metrics: [
      { name: "VaR (Value at Risk)", value: "2.3M", change: "+0.5%", status: 'warning' },
      { name: "Position Limit Usage", value: "67%", change: "-3%", status: 'good' },
      { name: "Market Volatility Index", value: "18.4", change: "+2.1", status: 'warning' }
    ]
  },
  {
    title: "Credit Risk Assessment",
    description: "Evaluate and manage counterparty risks",
    icon: Shield,
    lastUpdate: "2024-03-15T14:30:00",
    metrics: [
      { name: "Total Exposure", value: "12.8M", change: "+1.2%", status: 'warning' },
      { name: "Default Probability", value: "0.8%", change: "-0.1%", status: 'good' },
      { name: "Credit Rating Distribution", value: "A+", change: "stable", status: 'good' }
    ]
  },
  {
    title: "Operational Risk",
    description: "Identify and mitigate operational risks",
    icon: AlertTriangle,
    lastUpdate: "2024-03-15T14:30:00",
    metrics: [
      { name: "Incident Rate", value: "0.05%", change: "-0.02%", status: 'good' },
      { name: "System Uptime", value: "99.9%", change: "+0.1%", status: 'good' },
      { name: "Control Effectiveness", value: "94%", change: "+2%", status: 'good' }
    ]
  },
  {
    title: "Compliance Management",
    description: "Ensure regulatory compliance and reporting",
    icon: Lock,
    lastUpdate: "2024-03-15T14:30:00",
    metrics: [
      { name: "Compliance Score", value: "96%", change: "+1%", status: 'good' },
      { name: "Open Findings", value: "3", change: "-2", status: 'warning' },
      { name: "Regulatory Reports", value: "100%", change: "stable", status: 'good' }
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
  const [activeTab, setActiveTab] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const navigate = useNavigate();

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Risk metrics updated successfully");
    }, 1500);
  };

  const getStatusColor = (status: RiskMetric['status']) => {
    switch (status) {
      case 'good':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'critical':
        return 'text-red-500';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Risk Management</h1>
            <p className="text-muted-foreground">
              Comprehensive risk analysis and management tools
            </p>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={() => navigate("/commercial/dashboard")}
            >
              Back to Dashboard
            </Button>
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="animate-in fade-in duration-300"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh Metrics
            </Button>
          </div>
        </div>

        <Card className="mb-8 bg-muted/50">
          <CardHeader>
            <CardTitle className="text-lg">Quick Access - Commercial Banking</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <Link to="/commercial/treasury">
                <Button variant="outline" className="w-full justify-start">
                  <LineChart className="w-4 h-4 mr-2" />
                  Treasury Dashboard
                </Button>
              </Link>
              <Link to="/commercial/treasury/cash-flow">
                <Button variant="outline" className="w-full justify-start">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Cash Flow Analysis
                </Button>
              </Link>
              <Link to="/commercial/treasury/transactions">
                <Button variant="outline" className="w-full justify-start">
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Transaction Management
                </Button>
              </Link>
              <Link to="/commercial/payroll">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="w-4 h-4 mr-2" />
                  Payroll
                </Button>
              </Link>
              <Link to="/commercial/invoices">
                <Button variant="outline" className="w-full justify-start">
                  <FileWarning className="w-4 h-4 mr-2" />
                  Invoices
                </Button>
              </Link>
              <Link to="/commercial/expenses">
                <Button variant="outline" className="w-full justify-start">
                  <Building2 className="w-4 h-4 mr-2" />
                  Expenses
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
            <TabsTrigger value="reports">Risk Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-6">
              {riskCategories.map((category, index) => (
                <Card key={index} className="relative overflow-hidden group hover:shadow-lg transition-all">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-semibold flex items-center gap-2">
                      <category.icon className="h-5 w-5 text-primary" />
                      {category.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {category.description}
                    </p>
                    <div className="space-y-4">
                      {category.metrics.map((metric, idx) => (
                        <div key={idx} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                          <span className="text-sm text-muted-foreground">{metric.name}</span>
                          <div className="flex items-center gap-2">
                            <span className={`font-medium ${getStatusColor(metric.status)}`}>
                              {metric.value}
                            </span>
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
                    <div className="mt-4 pt-4 border-t flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        Last updated: {new Date(category.lastUpdate || '').toLocaleTimeString()}
                      </span>
                      <Button variant="outline" size="sm" className="opacity-0 group-hover:opacity-100 transition-opacity">
                        View Details
                        <ChevronRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Additional Risk Categories</h2>
              <div className="grid md:grid-cols-3 gap-4">
                {additionalRisks.map((risk, index) => (
                  <Card 
                    key={index} 
                    className="hover:bg-accent/50 transition-all cursor-pointer hover:shadow-md"
                  >
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
          </TabsContent>

          <TabsContent value="details">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Detailed Risk Analysis</h3>
              <p className="text-muted-foreground">
                Select a risk category above to view detailed analysis and metrics.
              </p>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Risk Reports</h3>
              <p className="text-muted-foreground">
                Generate and view detailed risk reports and assessments.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

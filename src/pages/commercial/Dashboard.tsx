
import { AppLayout } from "@/components/layout/app-layout";
import { StatisticsCards } from "@/components/dashboard/StatisticsCards";
import { StatisticsChart } from "@/components/dashboard/StatisticsChart";
import { CommercialMetrics } from "./components/CommercialMetrics";
import { FinancialHighlights } from "./components/FinancialHighlights";
import { AreaMetrics } from "./components/AreaMetrics";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Info, 
  ChartBar, 
  Database, 
  FileText, 
  ChartPie, 
  Brain, 
  LineChart, 
  Wallet, 
  Globe, 
  ShieldCheck, 
  FileBarChart, 
  Landmark,
  History,
  CreditCard,
  DollarSign,
  ArrowRight,
  BriefcaseBusiness,
  BarChart,
  Code
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function CommercialDashboard() {
  const navigate = useNavigate();
  const monthlyData = [
    { month: "September", earning: 1820000, spending: 480000 },
    { month: "October", earning: 1950000, spending: 510000 },
    { month: "November", earning: 2010000, spending: 530000 },
    { month: "December", earning: 2150000, spending: 539200 },
    { month: "January", earning: 2280000, spending: 545000 },
    { month: "February", earning: 2410000, spending: 560000 },
  ];

  const currentEarning = monthlyData[monthlyData.length - 1].earning;
  const previousEarning = monthlyData[monthlyData.length - 2].earning;
  const currentSpending = monthlyData[monthlyData.length - 1].spending;
  const previousSpending = monthlyData[monthlyData.length - 2].spending;

  const enterpriseFeatures = [
    {
      title: "Treasury & Cash Management",
      icon: Wallet,
      description: "Control integral de liquidez, FX y análisis de cash flow",
      features: ["Cash Flow Analysis", "Transaction Management", "FX Operations"],
      path: "/commercial/treasury"
    },
    {
      title: "Analysis & Forecasting",
      icon: ChartBar,
      description: "Forecasting predictivo y análisis de tendencias en tiempo real",
      features: ["Machine Learning Models", "Predictive Analysis", "Trend Visualization"],
      path: "/commercial/analytics"
    },
    {
      title: "Data Automation & Integration",
      icon: Database,
      description: "Integración multi-banco y actualización automática de datos",
      features: ["Multi-bank Integration", "Real-time Updates", "Data Normalization"],
      path: "/commercial/operations"
    },
    {
      title: "Investment Management",
      icon: Landmark,
      description: "Gestión y análisis de portafolios de inversión",
      features: ["Portfolio Analysis", "Investment Opportunities", "Performance Tracking"],
      path: "/commercial/fund-management"
    },
    {
      title: "Risk Management",
      icon: ShieldCheck,
      description: "Evaluación y gestión integral de riesgos financieros",
      features: ["Risk Assessment", "Compliance Reporting", "Market Risk Analysis"],
      path: "/commercial/risk-management"
    },
    {
      title: "Payment Processing",
      icon: Globe,
      description: "Gestión de pagos ACH, wire y RTP con nuestra API",
      features: ["Real-time Payments", "ACH Processing", "Cross-border Transfers"],
      path: "/commercial/payment-processor"
    },
    {
      title: "Entity Management",
      icon: FileBarChart,
      description: "Consolidación de datos financieros por subsidiarias",
      features: ["Subsidiary Management", "Custom Metadata", "Relationship Mapping"],
      path: "/commercial/operations/accounts"
    },
    {
      title: "AI Insights",
      icon: Brain,
      description: "Análisis de cash flow e inversiones con inteligencia artificial",
      features: ["Natural Language Processing", "Cash Insights", "AI Recommendations"],
      path: "/commercial/fund-management/ai-insights"
    }
  ];

  const quickAccessLinks = [
    {
      title: "Transaction History",
      icon: History,
      path: "/commercial/history",
      description: "View and manage all transactions"
    },
    {
      title: "Cash Flow Analysis",
      icon: LineChart,
      path: "/commercial/treasury/cash-flow",
      description: "Monitor and analyze your cash flow"
    },
    {
      title: "Portfolio Analysis",
      icon: DollarSign,
      path: "/commercial/fund-management/portfolios",
      description: "Manage investment portfolios"
    },
    {
      title: "Payment Processing",
      icon: CreditCard,
      path: "/commercial/payment-processor",
      description: "Process payments and transfers"
    },
    {
      title: "Risk Assessment",
      icon: ShieldCheck,
      path: "/commercial/risk-management/assessment",
      description: "View and manage risk assessments"
    },
    {
      title: "Machine Learning Models",
      icon: Brain,
      path: "/commercial/analytics/ml-models",
      description: "Access ML models and predictions"
    },
    {
      title: "Multi-bank Integration",
      icon: Database,
      path: "/commercial/operations/integration",
      description: "Manage bank connections"
    },
    {
      title: "Developer Portal",
      icon: Code,
      path: "/developer/dashboard",
      description: "Access developer tools and APIs"
    }
  ];

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-3xl font-bold">Commercial Banking Portal</h1>
            <Badge variant="outline" className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">Enterprise Portal</Badge>
          </div>
          <p className="text-muted-foreground text-lg">
            Comprehensive overview of your enterprise operations
          </p>
        </div>

        <div className="grid gap-6">
          <section className="fade-in">
            <div className="flex items-center gap-2 mb-4">
              <ChartPie className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-semibold">Key Performance Indicators</h2>
            </div>
            <div className="grid gap-4">
              <CommercialMetrics />
            </div>
          </section>

          <section className="grid lg:grid-cols-2 gap-6">
            <div className="space-y-6">
              <div className="fade-in animation-delay-100">
                <div className="flex items-center gap-2 mb-4">
                  <LineChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-xl font-semibold">Financial Analytics</h2>
                </div>
                <Card className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-900/20 border-none shadow-lg">
                  <StatisticsCards 
                    currentEarning={currentEarning}
                    previousEarning={previousEarning}
                    currentSpending={currentSpending}
                    previousSpending={previousSpending}
                  />
                </Card>
              </div>

              <div className="fade-in animation-delay-200">
                <div className="flex items-center gap-2 mb-4">
                  <ChartPie className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-xl font-semibold">Area Performance</h2>
                </div>
                <Card className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-900/20 border-none shadow-lg p-6">
                  <AreaMetrics />
                </Card>
              </div>
            </div>

            <div className="space-y-6">
              <div className="fade-in animation-delay-150">
                <div className="flex items-center gap-2 mb-4">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-xl font-semibold">Financial Highlights</h2>
                </div>
                <FinancialHighlights />
              </div>

              <div className="fade-in animation-delay-250">
                <div className="flex items-center gap-2 mb-4">
                  <ChartBar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  <h2 className="text-xl font-semibold">Monthly Trends</h2>
                </div>
                <Card className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-900 dark:to-blue-900/20 border-none shadow-lg">
                  <StatisticsChart monthlyData={monthlyData} />
                </Card>
              </div>
            </div>
          </section>

          <section className="fade-in animation-delay-300">
            <div className="flex items-center gap-2 mb-4">
              <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-semibold">Enterprise Solutions & Services</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {enterpriseFeatures.map((feature, index) => (
                <Card 
                  key={index} 
                  className="hover:shadow-md transition-all border-blue-100 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer"
                  onClick={() => navigate(feature.path)}
                >
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                        <feature.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <Badge 
                        variant="outline" 
                        className="bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                      >
                        Enterprise
                      </Badge>
                    </div>
                    <CardTitle className="text-lg mt-3 text-blue-900 dark:text-blue-100">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-1 mb-4">
                      {feature.features.map((featureItem, i) => (
                        <li key={i} className="text-sm flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-blue-600/70 dark:bg-blue-400/70"></div>
                          {featureItem}
                        </li>
                      ))}
                    </ul>
                    <Button 
                      variant="outline" 
                      className="w-full border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50"
                      onClick={() => navigate(feature.path)}
                    >
                      Explore
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Easy Access Links */}
          <section className="mt-8 fade-in animation-delay-300">
            <div className="flex items-center gap-2 mb-4">
              <ArrowRight className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <h2 className="text-xl font-semibold">Quick Access</h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {quickAccessLinks.map((link, index) => (
                <Card 
                  key={index} 
                  className="hover:shadow-md transition-all border-blue-100 dark:border-blue-800 hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer"
                  onClick={() => navigate(link.path)}
                >
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/40 mb-3">
                      <link.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-medium text-blue-900 dark:text-blue-100">{link.title}</h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{link.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AppLayout>
  );
}

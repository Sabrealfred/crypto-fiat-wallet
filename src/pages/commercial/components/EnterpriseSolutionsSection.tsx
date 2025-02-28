
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { LucideIcon, Globe } from "lucide-react";

interface EnterpriseFeature {
  title: string;
  icon: LucideIcon;
  description: string;
  features: string[];
  path: string;
}

export function EnterpriseSolutionsSection() {
  const navigate = useNavigate();
  
  const enterpriseFeatures: EnterpriseFeature[] = [
    {
      title: "Treasury & Cash Management",
      icon: Globe,
      description: "Control integral de liquidez, FX y análisis de cash flow",
      features: ["Cash Flow Analysis", "Transaction Management", "FX Operations"],
      path: "/commercial/treasury"
    },
    {
      title: "Analysis & Forecasting",
      icon: Globe,
      description: "Forecasting predictivo y análisis de tendencias en tiempo real",
      features: ["Machine Learning Models", "Predictive Analysis", "Trend Visualization"],
      path: "/commercial/analytics"
    },
    {
      title: "Data Automation & Integration",
      icon: Globe,
      description: "Integración multi-banco y actualización automática de datos",
      features: ["Multi-bank Integration", "Real-time Updates", "Data Normalization"],
      path: "/commercial/operations"
    },
    {
      title: "Investment Management",
      icon: Globe,
      description: "Gestión y análisis de portafolios de inversión",
      features: ["Portfolio Analysis", "Investment Opportunities", "Performance Tracking"],
      path: "/commercial/fund-management"
    },
    {
      title: "Risk Management",
      icon: Globe,
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
      icon: Globe,
      description: "Consolidación de datos financieros por subsidiarias",
      features: ["Subsidiary Management", "Custom Metadata", "Relationship Mapping"],
      path: "/commercial/operations/accounts"
    },
    {
      title: "AI Insights",
      icon: Globe,
      description: "Análisis de cash flow e inversiones con inteligencia artificial",
      features: ["Natural Language Processing", "Cash Insights", "AI Recommendations"],
      path: "/commercial/fund-management/ai-insights"
    }
  ];

  return (
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
  );
}

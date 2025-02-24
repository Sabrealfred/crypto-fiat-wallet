
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, TrendingUp, ShieldCheck, Users, LineChart, BadgeDollarSign } from "lucide-react";

export default function PortfolioAdvisoryPage() {
  const services = [
    {
      title: "Investment Strategy",
      description: "Personalized investment strategies aligned with your goals",
      icon: TrendingUp,
    },
    {
      title: "Portfolio Analysis",
      description: "In-depth analysis of your current portfolio performance",
      icon: LineChart,
    },
    {
      title: "Risk Assessment",
      description: "Comprehensive risk evaluation and management",
      icon: ShieldCheck,
    },
    {
      title: "Wealth Planning",
      description: "Long-term wealth planning and preservation strategies",
      icon: Briefcase,
    },
    {
      title: "Family Office",
      description: "Dedicated family office services and coordination",
      icon: Users,
    },
    {
      title: "Tax Optimization",
      description: "Strategic tax planning and optimization",
      icon: BadgeDollarSign,
    }
  ];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Portfolio Advisory Services</h1>
          <p className="text-muted-foreground">
            Comprehensive wealth management and investment advisory services tailored to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold">
                  {service.title}
                </CardTitle>
                <service.icon className="h-5 w-5 text-primary" />
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {service.description}
                </p>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

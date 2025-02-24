
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Diamond, Briefcase, LineChart, ShieldCheck, Clock, Coins } from "lucide-react";
import { Link } from "react-router-dom";

const wealthServices = [
  {
    icon: Diamond,
    title: "Portfolio Advisory",
    description: "Personalized investment strategies and portfolio management",
    path: "/private/portfolio-advisory"
  },
  {
    icon: Briefcase,
    title: "Estate Planning",
    description: "Comprehensive estate and succession planning services",
    path: "/private/estate-planning"
  },
  {
    icon: LineChart,
    title: "Investment Management",
    description: "Professional management of investment portfolios",
    path: "/private/investments"
  },
  {
    icon: ShieldCheck,
    title: "Trust Services",
    description: "Trust establishment and administration",
    path: "/private/trust-services"
  },
  {
    icon: Clock,
    title: "Legacy Planning",
    description: "Multi-generational wealth transfer strategies",
    path: "/private/legacy-planning"
  },
  {
    icon: Coins,
    title: "Tax Advisory",
    description: "Tax optimization and planning services",
    path: "/private/tax-advisory"
  }
];

export function WealthManagement() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {wealthServices.map((service, index) => {
        const Icon = service.icon;
        return (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Icon className="h-5 w-5 text-primary" />
                <CardTitle className="text-lg">{service.title}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4">{service.description}</CardDescription>
              <Link to={service.path}>
                <Button className="w-full">Learn More</Button>
              </Link>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}


import { Building2, Users, Globe2, Briefcase } from "lucide-react";

interface MetricProps {
  title: string;
  value: string;
  subtitle?: string;
  icon: any;
  change?: string;
  color: string;
}

export const commercialMetrics: MetricProps[] = [
  {
    title: "Global Operations",
    value: "12",
    subtitle: "Countries",
    icon: Globe2,
    change: "+2",
    color: "bg-blue-500"
  },
  {
    title: "Business Units",
    value: "8",
    subtitle: "Active divisions",
    icon: Building2,
    color: "bg-purple-500"
  },
  {
    title: "Total Workforce",
    value: "1,234",
    subtitle: "Employees",
    icon: Users,
    change: "+45",
    color: "bg-green-500"
  },
  {
    title: "Active Projects",
    value: "86",
    subtitle: "Across divisions",
    icon: Briefcase,
    change: "+12",
    color: "bg-orange-500"
  }
];

export function CommercialMetrics() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {commercialMetrics.map((metric, index) => (
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
          <p className="text-2xl font-semibold mb-1">{metric.value}</p>
          <p className="text-sm text-muted-foreground">{metric.subtitle}</p>
        </div>
      ))}
    </div>
  );
}

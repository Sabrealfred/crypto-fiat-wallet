
import { Building2, Users, FileText, Briefcase } from "lucide-react";

interface MetricProps {
  title: string;
  value: string;
  change?: string;
  icon: any;
  color: string;
}

export const businessMetrics: MetricProps[] = [
  {
    title: "Employees",
    value: "125",
    change: "+12%",
    icon: Users,
    color: "bg-blue-500"
  },
  {
    title: "Invoices",
    value: "1,234",
    change: "+8%",
    icon: FileText,
    color: "bg-green-500"
  },
  {
    title: "Projects",
    value: "25",
    change: "+2",
    icon: Briefcase,
    color: "bg-purple-500"
  },
  {
    title: "Departments",
    value: "8",
    icon: Building2,
    color: "bg-orange-500"
  }
];

export function BusinessMetrics() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {businessMetrics.map((metric, index) => (
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
          <p className="text-2xl font-semibold">{metric.value}</p>
        </div>
      ))}
    </div>
  );
}

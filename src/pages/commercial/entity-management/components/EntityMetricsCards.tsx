
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Globe, FileCheck, UsersRound } from "lucide-react";

export function EntityMetricsCards() {
  // Sample metrics data for entities
  const metrics = [
    {
      title: "Total Entities",
      value: "16",
      icon: Building2,
      change: "+2 this month",
      changeType: "positive",
    },
    {
      title: "Active Jurisdictions",
      value: "8",
      icon: Globe,
      change: "+1 this quarter",
      changeType: "positive",
    },
    {
      title: "Compliance Status",
      value: "94%",
      icon: FileCheck,
      change: "+3% from last review",
      changeType: "positive",
    },
    {
      title: "Key Representatives",
      value: "42",
      icon: UsersRound,
      change: "No change",
      changeType: "neutral",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {metrics.map((metric, index) => (
        <Card key={index} className="border-blue-100 dark:border-blue-800">
          <CardContent className="pt-6">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-muted-foreground">{metric.title}</p>
                <h3 className="text-2xl font-bold mt-2">{metric.value}</h3>
                <p className={`text-sm mt-1 ${
                  metric.changeType === "positive" 
                    ? "text-green-500" 
                    : metric.changeType === "negative"
                      ? "text-red-500"
                      : "text-gray-500"
                }`}>
                  {metric.change}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                <metric.icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

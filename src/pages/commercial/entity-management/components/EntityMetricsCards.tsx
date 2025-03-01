
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building2, Users, Network, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  change?: string;
  trend?: 'up' | 'down' | null;
  status?: 'default' | 'outline' | 'destructive' | 'secondary' | 'enterprise';
}

const MetricCard = ({ title, value, icon, change, trend, status = 'default' }: MetricCardProps) => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>
          {change && (
            <p className={`text-sm mt-2 flex items-center ${
              trend === 'up' ? 'text-green-500' : trend === 'down' ? 'text-red-500' : ''
            }`}>
              {trend === 'up' ? (
                <ArrowUpRight className="h-4 w-4 mr-1" />
              ) : trend === 'down' ? (
                <ArrowDownRight className="h-4 w-4 mr-1" />
              ) : null}
              {change}
            </p>
          )}
        </div>
        <div className="bg-primary/10 p-2 rounded-full">
          {icon}
        </div>
      </div>
    </CardContent>
  </Card>
);

export const EntityMetricsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <MetricCard
        title="Total Entities"
        value="47"
        icon={<Building2 className="h-5 w-5 text-primary" />}
        change="+3 this month"
        trend="up"
      />
      <MetricCard
        title="Entity Relationships"
        value="63"
        icon={<Network className="h-5 w-5 text-primary" />}
        change="+5 this month"
        trend="up"
      />
      <MetricCard
        title="Registered Representatives"
        value="112"
        icon={<Users className="h-5 w-5 text-primary" />}
        change="No change"
        trend={null}
      />
      <MetricCard
        title="Pending Registrations"
        value="3"
        icon={<Building2 className="h-5 w-5 text-primary" />}
        change="-2 this month"
        trend="down"
      />
    </div>
  );
};

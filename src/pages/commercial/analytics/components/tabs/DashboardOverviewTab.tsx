
import { MetricsGrid } from "../MetricsGrid";
import { ChartCard } from "../ChartCard";
import { ProjectsProgressCard } from "../ProjectsProgressCard";
import { DollarSign, Users, Activity } from "lucide-react";
import { projects } from "../../data/dashboardData";
import { calculateProgressWidth, calculateTaskPercentage } from "../../utils/calculationUtils";

export function DashboardOverviewTab() {
  const metrics = [
    { 
      title: "Revenue", 
      value: "$45,231.89", 
      change: "+20.1% from last month", 
      icon: DollarSign, 
      progressWidth: calculateProgressWidth(45231.89, 100000) 
    },
    { 
      title: "Customers", 
      value: "+2350", 
      change: "+10.1% from last month", 
      icon: Users,
      progressWidth: calculateProgressWidth(2350, 5000)
    },
    { 
      title: "Active Projects", 
      value: "12/23", 
      change: "+2 new projects this week", 
      icon: Activity,
      progressWidth: calculateProgressWidth(12, 23)
    }
  ];

  return (
    <>
      <MetricsGrid metrics={metrics} />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ChartCard title="Revenue Overview">
          <div className="text-center text-muted-foreground pt-20">
            Line chart visualization would go here
          </div>
        </ChartCard>
        
        <ChartCard title="User Demographics">
          <div className="text-center text-muted-foreground pt-20">
            Pie chart visualization would go here
          </div>
        </ChartCard>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <ProjectsProgressCard 
          projects={projects}
          calculateTaskPercentage={calculateTaskPercentage}
        />
      </div>
    </>
  );
}

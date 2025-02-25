
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, RefreshCw, Settings } from "lucide-react";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Legend
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const allocationData = [
  { name: 'US Equities', value: 45 },
  { name: 'International', value: 25 },
  { name: 'Fixed Income', value: 20 },
  { name: 'Alternative', value: 10 },
];

const recommendations = [
  {
    title: "Increase Tech Exposure",
    description: "Market analysis suggests undervaluation in tech sector",
    impact: "+2.4% Expected Return"
  },
  {
    title: "Reduce Fixed Income",
    description: "Rising interest rate environment suggests tactical shift",
    impact: "-15% Duration Risk"
  },
  {
    title: "Add ESG Assets",
    description: "Strong momentum in sustainable investments",
    impact: "+1.8% Alpha Potential"
  }
];

export default function AIPortfolios() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="AI Portfolio Management" 
          description="AI-driven portfolio analysis and rebalancing"
        />

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Current Allocation */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI-Recommended Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={allocationData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {allocationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                AI Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((rec, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <h3 className="font-semibold text-lg">{rec.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                    <p className="text-sm font-medium text-primary mt-2">{rec.impact}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end gap-4">
          <Button variant="outline">
            <Settings className="mr-2 h-4 w-4" />
            Configure AI Parameters
          </Button>
          <Button>
            <RefreshCw className="mr-2 h-4 w-4" />
            Run AI Analysis
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}

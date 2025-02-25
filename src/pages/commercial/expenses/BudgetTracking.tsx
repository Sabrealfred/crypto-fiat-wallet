
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';
import { 
  DollarSign,
  Download,
  Filter,
  TrendingUp,
  AlertTriangle
} from "lucide-react";

const departmentBudgets = [
  { name: 'Sales', budget: 50000, actual: 48000, variance: -4 },
  { name: 'Marketing', budget: 30000, actual: 32000, variance: 6.7 },
  { name: 'Operations', budget: 80000, actual: 75000, variance: -6.25 },
  { name: 'IT', budget: 45000, actual: 47000, variance: 4.4 },
  { name: 'HR', budget: 25000, actual: 24000, variance: -4 }
];

const monthlyTrend = [
  { month: 'Jan', planned: 45000, actual: 43000 },
  { month: 'Feb', planned: 48000, actual: 45000 },
  { month: 'Mar', planned: 52000, actual: 54000 },
  { month: 'Apr', planned: 50000, actual: 48000 },
  { month: 'May', planned: 55000, actual: 57000 },
  { month: 'Jun', planned: 58000, actual: 56000 }
];

export default function BudgetTrackingPage() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Budget Tracking" 
          description="Monitor and analyze departmental budgets and spending"
          showBack={true}
        />

        {/* Budget Overview */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Budget</p>
              <h3 className="text-2xl font-bold mt-2">$230,000</h3>
              <p className="text-sm text-green-500 mt-2 flex items-center">
                <TrendingUp className="h-4 w-4 mr-1" />
                On Track
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Spent to Date</p>
              <h3 className="text-2xl font-bold mt-2">$226,000</h3>
              <p className="text-sm text-yellow-500 mt-2">98.3% of budget</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Remaining</p>
              <h3 className="text-2xl font-bold mt-2">$4,000</h3>
              <p className="text-sm text-muted-foreground mt-2">1.7% remaining</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Departments Over Budget</p>
              <h3 className="text-2xl font-bold mt-2">2</h3>
              <p className="text-sm text-red-500 mt-2">Requires attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Department Budget Analysis */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                Department Budget Analysis
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={departmentBudgets}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="budget" name="Budget" fill="#8b5cf6" />
                  <Bar dataKey="actual" name="Actual" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Monthly Spending Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyTrend}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="planned" 
                    stroke="#8b5cf6" 
                    name="Planned"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#3b82f6" 
                    name="Actual"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Budget Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Budget Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'warning', message: 'Marketing department over budget by 6.7%' },
                { type: 'warning', message: 'IT department approaching budget limit (95% used)' },
                { type: 'info', message: 'Operations department under budget by 6.25%' }
              ].map((alert, index) => (
                <div key={index} className={`p-4 rounded-lg flex items-start gap-3 ${
                  alert.type === 'warning' ? 'bg-yellow-50 text-yellow-700' :
                  'bg-blue-50 text-blue-700'
                }`}>
                  <AlertTriangle className="h-5 w-5 mt-0.5" />
                  <span>{alert.message}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

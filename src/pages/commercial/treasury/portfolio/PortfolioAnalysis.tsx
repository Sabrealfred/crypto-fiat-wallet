
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Download,
  FileText,
  AlertTriangle,
  ChevronRight
} from "lucide-react";

const performanceData = [
  { month: 'Jan', actual: 2.5, benchmark: 2.3 },
  { month: 'Feb', actual: 3.2, benchmark: 2.8 },
  { month: 'Mar', actual: 2.8, benchmark: 2.6 },
  { month: 'Apr', actual: 3.5, benchmark: 3.0 },
  { month: 'May', actual: 4.2, benchmark: 3.5 },
  { month: 'Jun', actual: 3.8, benchmark: 3.2 }
];

const riskMetrics = [
  {
    title: "Beta",
    value: "1.15",
    status: "high",
    description: "Higher volatility vs market"
  },
  {
    title: "Sharpe Ratio",
    value: "1.8",
    status: "good",
    description: "Good risk-adjusted returns"
  },
  {
    title: "Alpha",
    value: "2.4%",
    status: "good",
    description: "Outperforming benchmark"
  },
  {
    title: "Max Drawdown",
    value: "-12.5%",
    status: "warning",
    description: "Monitor risk levels"
  }
];

export default function PortfolioAnalysisPage() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Portfolio Analysis" 
          description="Detailed analysis of portfolio performance and risk metrics"
          showBack={true}
        />

        {/* Performance vs Benchmark */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Performance vs Benchmark
              </CardTitle>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted/20" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="actual" 
                    stroke="#8b5cf6" 
                    fill="#8b5cf680"
                    name="Portfolio"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="benchmark" 
                    stroke="#94a3b8" 
                    fill="#94a3b880"
                    name="Benchmark"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Risk Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {riskMetrics.map((metric, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start mb-2">
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <div className={`px-2 py-1 rounded-full text-xs ${
                    metric.status === 'good' ? 'bg-green-100 text-green-700' :
                    metric.status === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {metric.status.toUpperCase()}
                  </div>
                </div>
                <h3 className="text-2xl font-bold">{metric.value}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {metric.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Investment Alerts */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Investment Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { type: 'warning', message: 'Technology sector exposure above target range' },
                { type: 'info', message: 'Fixed income duration below benchmark' },
                { type: 'success', message: 'ESG score improved vs last quarter' }
              ].map((alert, index) => (
                <div key={index} className={`p-4 rounded-lg flex items-start gap-3 ${
                  alert.type === 'warning' ? 'bg-yellow-50 text-yellow-700' :
                  alert.type === 'info' ? 'bg-blue-50 text-blue-700' :
                  'bg-green-50 text-green-700'
                }`}>
                  <AlertTriangle className="h-5 w-5 mt-0.5" />
                  <span>{alert.message}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Recommendations */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              title: "Rebalance Portfolio",
              description: "Sector weights need adjustment",
              action: "Review Now"
            },
            {
              title: "Risk Assessment",
              description: "Complete quarterly review",
              action: "Start Assessment"
            },
            {
              title: "Investment Report",
              description: "Q1 2024 report available",
              action: "Download Report"
            }
          ].map((item, index) => (
            <Card key={index}>
              <CardContent className="pt-6">
                <FileText className="h-8 w-8 text-primary mb-4" />
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {item.description}
                </p>
                <Button className="w-full" variant="outline">
                  {item.action}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

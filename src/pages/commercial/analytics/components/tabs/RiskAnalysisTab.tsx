
import { useState } from "react";
import { DashboardSection } from "../DashboardSection";
import { MetricCard } from "../MetricCard";
import { RiskAllocationCard } from "../RiskAllocationCard";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Activity, 
  ShieldAlert, 
  AlertTriangle, 
  TrendingDown, 
  ArrowRight, 
  BarChart2, 
  PieChart,
  Shield, 
  AlertCircle,
  Gauge,
  Building2
} from "lucide-react";
import { riskAllocations } from "../../data/dashboardData";
import { calculateAllocationPercentage } from "../../utils/calculationUtils";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart as ReChartsPieChart,
  Pie,
  Cell
} from 'recharts';

// Risk trend data
const riskTrendData = [
  { month: 'Jan', marketRisk: 65, creditRisk: 48, operationalRisk: 25 },
  { month: 'Feb', marketRisk: 70, creditRisk: 50, operationalRisk: 28 },
  { month: 'Mar', marketRisk: 68, creditRisk: 55, operationalRisk: 32 },
  { month: 'Apr', marketRisk: 75, creditRisk: 52, operationalRisk: 35 },
  { month: 'May', marketRisk: 80, creditRisk: 58, operationalRisk: 38 },
  { month: 'Jun', marketRisk: 78, creditRisk: 60, operationalRisk: 40 },
  { month: 'Jul', marketRisk: 82, creditRisk: 63, operationalRisk: 42 },
  { month: 'Aug', marketRisk: 85, creditRisk: 65, operationalRisk: 45 },
  { month: 'Sep', marketRisk: 72, creditRisk: 62, operationalRisk: 38 },
];

// Risk categories
const riskCategories = [
  { name: 'Market Risk', value: 42, color: '#3b82f6' },
  { name: 'Credit Risk', value: 28, color: '#f59e0b' },
  { name: 'Operational Risk', value: 18, color: '#10b981' },
  { name: 'Liquidity Risk', value: 8, color: '#8b5cf6' },
  { name: 'Legal Risk', value: 4, color: '#ef4444' }
];

// Risk factors
const riskFactors = [
  { name: 'Interest Rate Volatility', score: 82, threshold: 75, status: 'exceeded' },
  { name: 'Credit Default Probability', score: 65, threshold: 70, status: 'normal' },
  { name: 'Operational Errors', score: 42, threshold: 50, status: 'normal' },
  { name: 'Cybersecurity Threats', score: 78, threshold: 65, status: 'exceeded' },
  { name: 'Regulatory Compliance', score: 68, threshold: 80, status: 'normal' },
  { name: 'Currency Exchange Rate', score: 76, threshold: 70, status: 'exceeded' },
];

// Counterparty risk data
const counterpartyRiskData = [
  { name: 'Financial Institution A', exposure: 1250000, rating: 'AA', score: 85 },
  { name: 'Corporation B', exposure: 980000, rating: 'BBB', score: 62 },
  { name: 'Financial Institution C', exposure: 1850000, rating: 'A', score: 78 },
  { name: 'Corporation D', exposure: 720000, rating: 'BB', score: 55 },
  { name: 'Financial Institution E', exposure: 2100000, rating: 'AA-', score: 82 },
];

export function RiskAnalysisTab() {
  const [selectedRiskView, setSelectedRiskView] = useState<string>("overview");
  
  // COLORS for the pie chart
  const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#8b5cf6', '#ef4444'];
  
  return (
    <div className="space-y-6">
      {/* Risk overview metrics */}
      <DashboardSection>
        <MetricCard
          title="Risk Score"
          value="72/100"
          change="+3 points from last assessment"
          icon={Activity}
        />
        <MetricCard
          title="Compliance Rating"
          value="A+"
          change="No change from last assessment"
          icon={Shield}
        />
        <MetricCard
          title="Risk Alerts"
          value="5"
          change="+2 alerts from last week"
          icon={AlertTriangle}
        />
        <MetricCard
          title="Risk Exposure"
          value="$3.4M"
          change="+12% from last month"
          icon={TrendingDown}
        />
      </DashboardSection>

      {/* Risk analysis views */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-amber-500" />
              Risk Analysis Dashboard
            </CardTitle>
            <div className="flex gap-2">
              <Button 
                variant={selectedRiskView === "overview" ? "secondary" : "outline"} 
                size="sm"
                onClick={() => setSelectedRiskView("overview")}
              >
                Overview
              </Button>
              <Button 
                variant={selectedRiskView === "trends" ? "secondary" : "outline"}
                size="sm"
                onClick={() => setSelectedRiskView("trends")}
              >
                Trends
              </Button>
              <Button 
                variant={selectedRiskView === "factors" ? "secondary" : "outline"}
                size="sm"
                onClick={() => setSelectedRiskView("factors")}
              >
                Risk Factors
              </Button>
            </div>
          </div>
          <CardDescription>Comprehensive analysis of risk exposure and management</CardDescription>
        </CardHeader>
        <CardContent>
          {selectedRiskView === "overview" && (
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-base font-medium mb-4">Risk Distribution</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <ReChartsPieChart>
                      <Pie
                        data={riskCategories}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={2}
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {riskCategories.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </ReChartsPieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div>
                <h3 className="text-base font-medium mb-4">Counterparty Risk</h3>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={counterpartyRiskData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 50 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45} 
                        textAnchor="end" 
                        tick={{ fontSize: 12 }}
                        height={70}
                      />
                      <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                      <YAxis yAxisId="right" orientation="right" stroke="#f59e0b" />
                      <Tooltip />
                      <Legend />
                      <Bar yAxisId="left" dataKey="exposure" name="Exposure ($)" fill="#3b82f6" />
                      <Bar yAxisId="right" dataKey="score" name="Risk Score" fill="#f59e0b" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}
          
          {selectedRiskView === "trends" && (
            <div>
              <h3 className="text-base font-medium mb-4">Risk Trends (Last 9 Months)</h3>
              <div className="h-[350px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={riskTrendData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="marketRisk" 
                      stroke="#3b82f6" 
                      name="Market Risk"
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="creditRisk" 
                      stroke="#f59e0b" 
                      name="Credit Risk"
                      strokeWidth={2}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="operationalRisk" 
                      stroke="#10b981" 
                      name="Operational Risk"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                      <h4 className="text-sm font-medium">Market Risk</h4>
                    </div>
                    <Badge variant={riskTrendData[riskTrendData.length - 1].marketRisk > riskTrendData[0].marketRisk ? "destructive" : "outline"}>
                      {riskTrendData[riskTrendData.length - 1].marketRisk > riskTrendData[0].marketRisk ? "Increasing" : "Stable"}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <p className="text-2xl font-bold">{riskTrendData[riskTrendData.length - 1].marketRisk}</p>
                    <p className="text-xs text-muted-foreground">Current risk score</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <h4 className="text-sm font-medium">Credit Risk</h4>
                    </div>
                    <Badge variant={riskTrendData[riskTrendData.length - 1].creditRisk > riskTrendData[0].creditRisk ? "destructive" : "outline"}>
                      {riskTrendData[riskTrendData.length - 1].creditRisk > riskTrendData[0].creditRisk ? "Increasing" : "Stable"}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <p className="text-2xl font-bold">{riskTrendData[riskTrendData.length - 1].creditRisk}</p>
                    <p className="text-xs text-muted-foreground">Current risk score</p>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <h4 className="text-sm font-medium">Operational Risk</h4>
                    </div>
                    <Badge variant={riskTrendData[riskTrendData.length - 1].operationalRisk > riskTrendData[0].operationalRisk ? "destructive" : "outline"}>
                      {riskTrendData[riskTrendData.length - 1].operationalRisk > riskTrendData[0].operationalRisk ? "Increasing" : "Stable"}
                    </Badge>
                  </div>
                  <div className="mt-2">
                    <p className="text-2xl font-bold">{riskTrendData[riskTrendData.length - 1].operationalRisk}</p>
                    <p className="text-xs text-muted-foreground">Current risk score</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {selectedRiskView === "factors" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {riskFactors.map((factor, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-medium">{factor.name}</h4>
                      <Badge variant={factor.status === 'exceeded' ? 'destructive' : 'outline'}>
                        {factor.status === 'exceeded' ? 'Above Threshold' : 'Within Limits'}
                      </Badge>
                    </div>
                    <div className="mt-4">
                      <div className="flex justify-between mb-1">
                        <span className="text-xs text-muted-foreground">Risk Score</span>
                        <span className="text-xs font-medium">{factor.score} / 100</span>
                      </div>
                      <div className="relative">
                        <Progress value={factor.score} className="h-2" />
                        <div 
                          className="absolute top-0 h-2 w-0.5 bg-red-500" 
                          style={{ left: `${factor.threshold}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-end mt-1">
                        <span className="text-xs text-muted-foreground">Threshold: {factor.threshold}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Card className="bg-amber-50 dark:bg-amber-900/10 border-amber-100 dark:border-amber-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-amber-500" />
                    Risk Management Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30 mt-0.5">
                        <Gauge className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Adjust Interest Rate Risk Controls</h4>
                        <p className="text-xs text-muted-foreground">
                          Current interest rate volatility exceeds threshold by 7 points. Consider increasing hedging positions.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30 mt-0.5">
                        <Shield className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Enhance Cybersecurity Measures</h4>
                        <p className="text-xs text-muted-foreground">
                          Cybersecurity threat level has increased by 13% in the last month. Review and strengthen security protocols.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-full bg-amber-100 dark:bg-amber-900/30 mt-0.5">
                        <Building2 className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium">Review Counterparty Exposure</h4>
                        <p className="text-xs text-muted-foreground">
                          Concentration risk with Financial Institution C has increased. Consider diversifying exposure.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
        <CardFooter className="border-t px-6 py-4 flex justify-between">
          <Button variant="outline" size="sm">
            Risk Management Policy
          </Button>
          <Button size="sm" className="gap-2">
            Generate Risk Report
            <ArrowRight className="h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
      
      {/* Risk allocation visualization */}
      <div className="grid grid-cols-1 gap-6">
        <RiskAllocationCard 
          allocations={riskAllocations}
          calculateAllocationPercentage={calculateAllocationPercentage}
        />
      </div>
    </div>
  );
}


import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AreaChart, BarChart, LineChart, PieChart } from "@/components/ui/chart";
import { 
  BarChart2, 
  TrendingUp, 
  AlertTriangle, 
  BrainCircuit, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon,
  ChevronDown,
  ArrowUpRight,
  ArrowDownRight,
  Info,
  Download
} from "lucide-react";
import { riskCategories, additionalRisks } from "../components/risk-management/data";
import { RiskMetricCard } from "../components/risk-management/RiskMetricCard";
import { AdditionalRiskCard } from "../components/risk-management/AdditionalRiskCard";
import { useState } from "react";
import { DetailedRiskAnalysis } from "../components/risk-management/DetailedRiskAnalysis";
import { RiskMetric } from "../components/risk-management/types";
import { useNavigate } from "react-router-dom";

export default function AnalyticsDashboard() {
  const [selectedRiskCategory, setSelectedRiskCategory] = useState(null);
  const navigate = useNavigate();

  const getStatusColor = (status: RiskMetric['status']) => {
    switch (status) {
      case 'good':
        return 'text-green-600';
      case 'warning':
        return 'text-yellow-600';
      case 'critical':
        return 'text-red-600';
      default:
        return 'text-muted-foreground';
    }
  };

  const handleRiskCardClick = (index: number) => {
    setSelectedRiskCategory(riskCategories[index]);
  };

  const handleAdditionalRiskClick = (title: string) => {
    // Map additional risk titles to routes
    const riskRoutes: Record<string, string> = {
      'Liquidity Risk': '/commercial/risk-management/liquidity',
      'Counterparty Risk': '/commercial/risk-management/counterparty',
      'Country Risk': '/commercial/risk-management/country',
      'Legal & Regulatory Risk': '/commercial/risk-management/legal',
      'Model Risk': '/commercial/risk-management/model',
      'Trading Risk': '/commercial/risk-management/trading',
    };
    
    navigate(riskRoutes[title]);
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-8">
        <CommercialHeader 
          title="Analytics & Forecasting"
          description="Comprehensive analysis tools and predictive models for financial data"
        />

        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="mb-4">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="forecasting">Forecasting</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div className="space-y-1">
                    <CardTitle>Financial Performance</CardTitle>
                    <CardDescription>Monthly revenue and expense trends</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">+12.5% YoY</Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="h-[300px]">
                    <LineChart 
                      data={[
                        { name: 'Jan', revenue: 2400000, expenses: 1800000 },
                        { name: 'Feb', revenue: 1980000, expenses: 1600000 },
                        { name: 'Mar', revenue: 2800000, expenses: 2000000 },
                        { name: 'Apr', revenue: 3080000, expenses: 2200000 },
                        { name: 'May', revenue: 2780000, expenses: 2100000 },
                        { name: 'Jun', revenue: 3300000, expenses: 2400000 },
                        { name: 'Jul', revenue: 3580000, expenses: 2600000 },
                      ]} 
                      index="name"
                      categories={['revenue', 'expenses']}
                      colors={['blue', 'red']}
                      valueFormatter={(value) => `$${(value/1000000).toFixed(1)}M`}
                      showLegend={true}
                      showXAxis={true}
                      showYAxis={true}
                      showGridLines={true}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Current financial KPIs</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Revenue Growth</span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold">18.2%</span>
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '76%' }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Profit Margin</span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold">23.5%</span>
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '68%' }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Expense Ratio</span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold">14.2%</span>
                        <ArrowDownRight className="h-4 w-4 text-red-500" />
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '42%' }} />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Liquidity Ratio</span>
                      <div className="flex items-center gap-1">
                        <span className="text-sm font-bold">1.82</span>
                        <ArrowUpRight className="h-4 w-4 text-green-500" />
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '84%' }} />
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      <Download className="h-4 w-4 mr-2" /> Export Report
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle>Revenue Distribution</CardTitle>
                  <CardDescription>By product line</CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="h-[250px]">
                    <PieChart 
                      data={[
                        { name: 'Treasury', value: 35 },
                        { name: 'Cards', value: 25 },
                        { name: 'Loans', value: 20 },
                        { name: 'Investments', value: 15 },
                        { name: 'Other', value: 5 },
                      ]}
                      index="name"
                      category="value"
                      valueFormatter={(value) => `${value}%`}
                      showLabel={true}
                      showLegend={true}
                      colors={['blue', 'green', 'orange', 'purple', 'gray']}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="lg:col-span-2">
                <CardHeader className="pb-2">
                  <CardTitle>Segment Growth Analysis</CardTitle>
                  <CardDescription>Quarter-over-quarter comparison</CardDescription>
                </CardHeader>
                <CardContent className="pb-4">
                  <div className="h-[250px]">
                    <BarChart
                      data={[
                        { segment: 'Corporate', current: 3200000, previous: 2800000 },
                        { segment: 'SME', current: 2100000, previous: 1700000 },
                        { segment: 'Institutional', current: 4300000, previous: 3900000 },
                        { segment: 'Government', current: 1800000, previous: 1600000 },
                        { segment: 'International', current: 2600000, previous: 2100000 },
                      ]}
                      index="segment"
                      categories={['previous', 'current']}
                      colors={['gray', 'blue']}
                      valueFormatter={(value) => `$${(value/1000000).toFixed(1)}M`}
                      showLegend={true}
                      showXAxis={true}
                      showYAxis={true}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="risk">
            {!selectedRiskCategory ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                  {riskCategories.map((category, index) => (
                    <div key={index} onClick={() => handleRiskCardClick(index)} className="cursor-pointer">
                      <RiskMetricCard category={category} getStatusColor={getStatusColor} />
                    </div>
                  ))}
                </div>
                
                <Separator className="my-8" />
                
                <div>
                  <h2 className="text-xl font-semibold mb-4">Additional Risk Categories</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {additionalRisks.map((risk, index) => (
                      <AdditionalRiskCard 
                        key={index} 
                        risk={risk} 
                        onClick={() => handleAdditionalRiskClick(risk.title)} 
                      />
                    ))}
                  </div>
                </div>
                
                <div className="bg-muted/50 p-8 rounded-lg mt-8 text-center space-y-4">
                  <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto" />
                  <h3 className="text-lg font-medium">Detailed Risk Analysis</h3>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Select a risk category above to view detailed analysis and metrics.
                  </p>
                  <div className="pt-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                      <Info className="h-3.5 w-3.5 mr-1" />
                      Enterprise Feature
                    </Badge>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <Button 
                  variant="outline" 
                  className="mb-6" 
                  onClick={() => setSelectedRiskCategory(null)}
                >
                  Back to Risk Categories
                </Button>
                
                <DetailedRiskAnalysis category={selectedRiskCategory} />
              </div>
            )}
          </TabsContent>

          <TabsContent value="forecasting">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600" />
                    Predictive Analysis
                  </CardTitle>
                  <CardDescription>
                    AI-powered financial forecasting models
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px]">
                    <AreaChart 
                      data={[
                        { month: 'Aug', actual: 3400000, forecast: 3400000, range_lower: 3400000, range_upper: 3400000 },
                        { month: 'Sep', actual: 3600000, forecast: 3600000, range_lower: 3600000, range_upper: 3600000 },
                        { month: 'Oct', actual: 3300000, forecast: 3300000, range_lower: 3300000, range_upper: 3300000 },
                        { month: 'Nov', actual: 3700000, forecast: 3700000, range_lower: 3700000, range_upper: 3700000 },
                        { month: 'Dec', actual: 4100000, forecast: 4100000, range_lower: 4100000, range_upper: 4100000 },
                        { month: 'Jan', actual: null, forecast: 4300000, range_lower: 4100000, range_upper: 4500000 },
                        { month: 'Feb', actual: null, forecast: 4500000, range_lower: 4200000, range_upper: 4800000 },
                        { month: 'Mar', actual: null, forecast: 4800000, range_lower: 4400000, range_upper: 5200000 },
                      ]} 
                      index="month"
                      categories={['actual', 'forecast', 'range_lower', 'range_upper']}
                      colors={['blue', 'green', 'transparent', 'transparent']}
                      valueFormatter={(value) => `$${(value/1000000).toFixed(1)}M`}
                      showLegend={true}
                      showXAxis={true}
                      showYAxis={true}
                      showGridLines={true}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BrainCircuit className="h-5 w-5 text-purple-600" />
                    AI Model Performance
                  </CardTitle>
                  <CardDescription>
                    Forecast accuracy metrics
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">MAPE (Revenue)</span>
                      <span className="text-sm font-bold">3.2%</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }} />
                    </div>
                    <p className="text-xs text-muted-foreground">Mean Absolute Percentage Error</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">MAE (Cash Flow)</span>
                      <span className="text-sm font-bold">$124K</span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }} />
                    </div>
                    <p className="text-xs text-muted-foreground">Mean Absolute Error</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium">Forecast Horizon</span>
                      <span className="text-sm font-bold">12 months</span>
                    </div>
                    <div className="grid grid-cols-4 gap-1">
                      <div className="h-2 bg-green-500 rounded-full"></div>
                      <div className="h-2 bg-green-500 rounded-full"></div>
                      <div className="h-2 bg-yellow-500 rounded-full"></div>
                      <div className="h-2 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                    </div>
                    <p className="text-xs text-muted-foreground">3-month accuracy: 94%</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-full">
                <CardHeader>
                  <CardTitle>Analytics Reports</CardTitle>
                  <CardDescription>
                    Generate and access customized reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {[
                      { title: 'Financial Performance', icon: BarChart2, date: '15 Mar 2024', type: 'Monthly' },
                      { title: 'Risk Assessment', icon: AlertTriangle, date: '28 Feb 2024', type: 'Quarterly' },
                      { title: 'Market Trends', icon: TrendingUp, date: '10 Mar 2024', type: 'Weekly' },
                      { title: 'Forecast Accuracy', icon: LineChartIcon, date: '01 Mar 2024', type: 'Monthly' },
                      { title: 'Revenue Distribution', icon: PieChartIcon, date: '22 Feb 2024', type: 'Monthly' },
                      { title: 'Executive Summary', icon: BarChart2, date: '28 Feb 2024', type: 'Monthly' },
                    ].map((report, index) => (
                      <Card key={index} className="hover:bg-accent/50 cursor-pointer transition-colors">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="p-2 rounded-lg bg-primary/10">
                              <report.icon className="h-5 w-5 text-primary" />
                            </div>
                            <Badge variant="outline" className="font-normal">{report.type}</Badge>
                          </div>
                          <h3 className="font-medium">{report.title}</h3>
                          <p className="text-sm text-muted-foreground mt-1">Last updated: {report.date}</p>
                          <div className="flex items-center justify-between mt-4">
                            <Button variant="ghost" size="sm" className="gap-1 text-xs">
                              <Download className="h-3 w-3" /> PDF
                            </Button>
                            <Button variant="ghost" size="sm" className="gap-1 text-xs">
                              <Download className="h-3 w-3" /> Excel
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

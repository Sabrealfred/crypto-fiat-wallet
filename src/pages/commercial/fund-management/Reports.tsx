
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Filter, 
  LineChart, 
  BarChart4, 
  PieChart,
  Clock, 
  Calendar,
  RefreshCw,
  Share2
} from "lucide-react";
import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function FundReportsPage() {
  const [activeTab, setActiveTab] = useState('performance');

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Investment Reports" 
          description="Comprehensive reporting on investment performance"
          showBack={true}
        />

        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-4">
            <Select defaultValue="current">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Report Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="current">Current Quarter</SelectItem>
                <SelectItem value="previous">Previous Quarter</SelectItem>
                <SelectItem value="ytd">Year-to-Date</SelectItem>
                <SelectItem value="12m">Last 12 Months</SelectItem>
                <SelectItem value="custom">Custom Period</SelectItem>
              </SelectContent>
            </Select>
            
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Portfolio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Portfolios</SelectItem>
                <SelectItem value="equity">Equity Portfolio</SelectItem>
                <SelectItem value="fixed">Fixed Income</SelectItem>
                <SelectItem value="mixed">Mixed Allocation</SelectItem>
                <SelectItem value="alternative">Alternative Investments</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Button size="sm">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="allocation">Asset Allocation</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="transactions">Transaction History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance">
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Portfolio Performance</CardTitle>
                      <CardDescription>Performance metrics compared to benchmarks</CardDescription>
                    </div>
                    <Button variant="outline" size="sm">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-[350px] flex items-center justify-center bg-muted rounded-lg">
                    <div className="text-center p-6">
                      <LineChart className="h-10 w-10 mx-auto mb-4 text-muted-foreground" />
                      <h3 className="text-lg font-medium mb-2">Performance Chart</h3>
                      <p className="text-sm text-muted-foreground">
                        Performance data visualization will be displayed here, showing portfolio returns over time compared to relevant benchmarks.
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-4 gap-4 mt-6">
                    <div className="p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">YTD Return</p>
                      <p className="text-2xl font-bold mt-1">+8.4%</p>
                      <p className="text-xs text-green-500 mt-1">+1.2% vs benchmark</p>
                    </div>
                    <div className="p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">1Y Return</p>
                      <p className="text-2xl font-bold mt-1">+12.6%</p>
                      <p className="text-xs text-green-500 mt-1">+2.3% vs benchmark</p>
                    </div>
                    <div className="p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">3Y Return (Ann.)</p>
                      <p className="text-2xl font-bold mt-1">+10.8%</p>
                      <p className="text-xs text-green-500 mt-1">+1.7% vs benchmark</p>
                    </div>
                    <div className="p-4 rounded-lg border">
                      <p className="text-sm text-muted-foreground">5Y Return (Ann.)</p>
                      <p className="text-2xl font-bold mt-1">+9.4%</p>
                      <p className="text-xs text-green-500 mt-1">+1.4% vs benchmark</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <div className="grid sm:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Attribution</CardTitle>
                    <CardDescription>Contribution to return by factors</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] flex items-center justify-center bg-muted rounded-lg">
                      <div className="text-center p-6">
                        <BarChart4 className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Performance attribution chart will be displayed here, showing contribution by sector, style, and security selection.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Rolling Returns</CardTitle>
                    <CardDescription>Historical performance over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px] flex items-center justify-center bg-muted rounded-lg">
                      <div className="text-center p-6">
                        <LineChart className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Rolling returns chart will be displayed here, showing performance consistency over multiple time periods.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="allocation">
            <Card>
              <CardHeader>
                <CardTitle>Asset Allocation</CardTitle>
                <CardDescription>Current allocation by asset class, sector, and geography</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">By Asset Class</h3>
                    <div className="h-[250px] flex items-center justify-center bg-muted rounded-lg">
                      <div className="text-center p-6">
                        <PieChart className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Asset class allocation will be displayed here.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">By Sector</h3>
                    <div className="h-[250px] flex items-center justify-center bg-muted rounded-lg">
                      <div className="text-center p-6">
                        <PieChart className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Sector allocation will be displayed here.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">By Geography</h3>
                    <div className="h-[250px] flex items-center justify-center bg-muted rounded-lg">
                      <div className="text-center p-6">
                        <PieChart className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Geographic allocation will be displayed here.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="risk">
            <Card>
              <CardHeader>
                <CardTitle>Risk Analysis</CardTitle>
                <CardDescription>Risk metrics and exposure analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Risk analysis content will go here.</p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="transactions">
            <Card>
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Record of investment transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Transaction history content will go here.</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

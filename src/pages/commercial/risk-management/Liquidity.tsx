
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DollarSign, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Calendar,
  RefreshCw,
  Download
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function LiquidityRiskPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Liquidity metrics updated successfully");
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Liquidity Risk Management" 
          description="Monitor and manage your organization's liquidity positions and risk exposure"
          showBack={true}
        />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Liquidity Risk Dashboard</h2>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Liquidity Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Liquidity Coverage Ratio</p>
                  <h3 className="text-2xl font-bold mt-2">118%</h3>
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +3.5% vs last month
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Net Stable Funding Ratio</p>
                  <h3 className="text-2xl font-bold mt-2">105%</h3>
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +1.2% vs last month
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Liquidity Buffer</p>
                  <h3 className="text-2xl font-bold mt-2">$342M</h3>
                  <p className="text-sm text-red-500 mt-1 flex items-center">
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                    -2.1% vs last month
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Survival Period</p>
                  <h3 className="text-2xl font-bold mt-2">63 days</h3>
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +5 days vs last month
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <Calendar className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liquidity Stress Tests */}
        <Card className="mb-6 border-blue-100 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Liquidity Stress Test Results
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4 pb-2 border-b">
                <div className="font-medium">Scenario</div>
                <div className="font-medium">Severity</div>
                <div className="font-medium">Impact</div>
                <div className="font-medium">Survival Period</div>
              </div>
              
              {[
                { 
                  scenario: "Market-wide liquidity crisis", 
                  severity: "High", 
                  impact: "Significant", 
                  survivalPeriod: "21 days",
                  severityColor: "text-red-500",
                  impactColor: "text-red-500"
                },
                { 
                  scenario: "Idiosyncratic funding stress", 
                  severity: "Medium", 
                  impact: "Moderate", 
                  survivalPeriod: "45 days",
                  severityColor: "text-yellow-500",
                  impactColor: "text-yellow-500" 
                },
                { 
                  scenario: "Combined scenario", 
                  severity: "High", 
                  impact: "Severe", 
                  survivalPeriod: "18 days",
                  severityColor: "text-red-500",
                  impactColor: "text-red-500" 
                },
                { 
                  scenario: "Operational disruption", 
                  severity: "Low", 
                  impact: "Limited", 
                  survivalPeriod: "52 days",
                  severityColor: "text-green-500",
                  impactColor: "text-green-500" 
                },
              ].map((test, i) => (
                <div key={i} className="grid grid-cols-4 gap-4 py-3 border-b">
                  <div>{test.scenario}</div>
                  <div className={test.severityColor}>{test.severity}</div>
                  <div className={test.impactColor}>{test.impact}</div>
                  <div className="font-medium">{test.survivalPeriod}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Liquidity Risk Categories */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader>
              <CardTitle>Funding Liquidity Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Wholesale Funding Dependency</span>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">32%</span>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400">
                      Medium
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Funding Concentration</span>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">28%</span>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400">
                      Medium
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Funding Maturity Mismatch</span>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">15%</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                      Low
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Contingent Funding Obligations</span>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">42%</span>
                    <Badge variant="outline" className="bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400">
                      High
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader>
              <CardTitle>Market Liquidity Risk</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Asset Liquidation Haircuts</span>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">8%</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                      Low
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Market Depth</span>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Adequate</span>
                    <Badge variant="outline" className="bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400">
                      Low
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Bid-Ask Spreads</span>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">Widening</span>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400">
                      Medium
                    </Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Price Impact of Liquidation</span>
                  <div className="flex items-center">
                    <span className="font-semibold mr-2">12%</span>
                    <Badge variant="outline" className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400">
                      Medium
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Liquidity Contingency Plan */}
        <Card className="border-blue-100 dark:border-blue-800">
          <CardHeader>
            <CardTitle>Liquidity Contingency Planning</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-4 pb-2 border-b">
                <div className="font-medium">Trigger Level</div>
                <div className="font-medium">Action Required</div>
                <div className="font-medium">Responsible Team</div>
                <div className="font-medium">Current Status</div>
              </div>
              
              {[
                { 
                  level: "Level 1 - Early Warning", 
                  action: "Enhance monitoring, prepare contingency assets", 
                  team: "Treasury", 
                  status: "Not Triggered",
                  statusColor: "text-green-500"
                },
                { 
                  level: "Level 2 - Heightened Risk", 
                  action: "Activate additional funding lines, reduce non-essential outflows", 
                  team: "Treasury & Risk", 
                  status: "Not Triggered",
                  statusColor: "text-green-500"
                },
                { 
                  level: "Level 3 - Stressed", 
                  action: "Implement asset sales program, draw down facilities", 
                  team: "Crisis Committee", 
                  status: "Not Triggered",
                  statusColor: "text-green-500"
                },
                { 
                  level: "Level 4 - Severe Stress", 
                  action: "Execute emergency funding plan, engage regulators", 
                  team: "Executive Committee", 
                  status: "Not Triggered",
                  statusColor: "text-green-500"
                },
              ].map((level, i) => (
                <div key={i} className="grid grid-cols-4 gap-4 py-3 border-b">
                  <div className="font-medium">{level.level}</div>
                  <div>{level.action}</div>
                  <div>{level.team}</div>
                  <div className={level.statusColor}>{level.status}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 flex justify-end">
          <Button className="flex items-center gap-2">
            View Detailed Liquidity Analysis
            <ArrowUpRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}

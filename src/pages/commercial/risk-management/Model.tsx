
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileWarning, ArrowRight, CheckCircle, AlertTriangle, XCircle, LineChart, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function ModelRiskPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("Risk models refreshed successfully");
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Model Risk Management" 
          description="Validate and monitor risk models to ensure accuracy and compliance"
          showBack={true}
        />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Model Validation Dashboard</h2>
          <Button 
            variant="outline" 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            Refresh Models
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg font-medium">Risk Models Overview</CardTitle>
                <Badge variant="enterprise">Enterprise</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Models</span>
                  <span className="font-semibold">36</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Validated Models</span>
                  <span className="font-semibold text-green-600">28</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Models Under Review</span>
                  <span className="font-semibold text-yellow-600">5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Failed Validation</span>
                  <span className="font-semibold text-red-600">3</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Recent Validations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Market Risk VaR</span>
                  </div>
                  <span className="text-xs text-muted-foreground">2 days ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span>Credit Scoring Model</span>
                  </div>
                  <span className="text-xs text-muted-foreground">4 days ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <span>Liquidity Stress Test</span>
                  </div>
                  <span className="text-xs text-muted-foreground">1 week ago</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span>Operational Risk Model</span>
                  </div>
                  <span className="text-xs text-muted-foreground">2 weeks ago</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Scheduled Validations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Counterparty Risk Model</span>
                  <Badge variant="outline">Tomorrow</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Country Risk Assessment</span>
                  <Badge variant="outline">3 days</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Trading Portfolio VaR</span>
                  <Badge variant="outline">1 week</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span>Regulatory Capital Model</span>
                  <Badge variant="outline">2 weeks</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <FileWarning className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Model Risk Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { name: "Credit Risk Models", validated: 8, total: 10 },
                  { name: "Market Risk Models", validated: 7, total: 8 },
                  { name: "Operational Risk Models", validated: 3, total: 5 },
                  { name: "Liquidity Risk Models", validated: 4, total: 5 },
                  { name: "Compliance Models", validated: 3, total: 4 },
                  { name: "Fraud Detection Models", validated: 3, total: 4 }
                ].map((category, index) => (
                  <Card key={index} className="border border-blue-50 dark:border-blue-900">
                    <CardContent className="pt-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{category.name}</span>
                          <span className="text-sm text-muted-foreground">{category.validated}/{category.total}</span>
                        </div>
                        <div className="w-full bg-blue-100 dark:bg-blue-950 h-2 rounded-full">
                          <div 
                            className="bg-blue-600 dark:bg-blue-400 h-2 rounded-full"
                            style={{ width: `${(category.validated / category.total) * 100}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                Model Performance Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Card className="border border-blue-50 dark:border-blue-900">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">Backtesting</h3>
                        <Badge variant="enterprise">Daily</Badge>
                      </div>
                      <p className="mt-2 text-2xl font-bold">96.8%</p>
                      <p className="text-xs text-muted-foreground">Accuracy rate</p>
                    </CardContent>
                  </Card>
                  <Card className="border border-blue-50 dark:border-blue-900">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">Model Drift</h3>
                        <Badge variant="enterprise">Weekly</Badge>
                      </div>
                      <p className="mt-2 text-2xl font-bold">1.2%</p>
                      <p className="text-xs text-muted-foreground">Average drift rate</p>
                    </CardContent>
                  </Card>
                  <Card className="border border-blue-50 dark:border-blue-900">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">Exception Rate</h3>
                        <Badge variant="enterprise">Monthly</Badge>
                      </div>
                      <p className="mt-2 text-2xl font-bold">0.5%</p>
                      <p className="text-xs text-muted-foreground">Below threshold</p>
                    </CardContent>
                  </Card>
                  <Card className="border border-blue-50 dark:border-blue-900">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-sm font-medium">Recalibration</h3>
                        <Badge variant="enterprise">Quarterly</Badge>
                      </div>
                      <p className="mt-2 text-2xl font-bold">Last: 15d</p>
                      <p className="text-xs text-muted-foreground">Days since last update</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-6 flex justify-end">
          <Button className="flex items-center gap-2">
            View Complete Model Inventory
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}


import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { TrendingUp, ChevronDown } from "lucide-react";

export function RiskExposureCard() {
  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          FX Risk Exposure
        </CardTitle>
        <CardDescription>Current currency exposure breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">EUR Exposure</span>
              <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">Medium Risk</span>
            </div>
            <div className="text-2xl font-bold mb-1">€4.5M</div>
            <div className="flex items-center text-sm">
              <ChevronDown className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">12% from last month</span>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">GBP Exposure</span>
              <span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">High Risk</span>
            </div>
            <div className="text-2xl font-bold mb-1">£2.8M</div>
            <div className="flex items-center text-sm">
              <ChevronDown className="h-4 w-4 text-red-500 mr-1" />
              <span className="text-red-600">8% from last month</span>
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm font-medium">JPY Exposure</span>
              <span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">Low Risk</span>
            </div>
            <div className="text-2xl font-bold mb-1">¥350M</div>
            <div className="flex items-center text-sm">
              <ChevronDown className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-green-600">5% from last month</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}


import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, ChevronRight, ArrowUpRight, ArrowDownRight } from "lucide-react";

export const MarketSummaryCard = () => {
  return (
    <Card className="border-blue-100 dark:border-blue-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Global Market Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="border rounded-lg p-4">
              <div className="text-sm font-medium mb-1">USD Index</div>
              <div className="text-2xl font-bold">104.2</div>
              <div className="text-sm text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +0.8%
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-sm font-medium mb-1">US 10Y Yield</div>
              <div className="text-2xl font-bold">4.42%</div>
              <div className="text-sm text-red-500 flex items-center">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                -0.05%
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-sm font-medium mb-1">Libor 3M</div>
              <div className="text-2xl font-bold">4.72%</div>
              <div className="text-sm text-green-500 flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +0.01%
              </div>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-sm font-medium mb-1">SOFR</div>
              <div className="text-2xl font-bold">4.30%</div>
              <div className="text-sm text-gray-500">Unchanged</div>
            </div>
          </div>
          
          <Button variant="outline" className="w-full justify-between">
            <span>View Full Market Data</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

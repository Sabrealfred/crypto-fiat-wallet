
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, ChevronRight } from "lucide-react";

export const MarketAlertsCard = () => {
  return (
    <Card className="border-blue-100 dark:border-blue-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Market Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border-l-4 border-amber-500 pl-3 py-2">
            <div className="text-sm font-medium">EUR/USD approaching 6-month high</div>
            <div className="text-xs text-muted-foreground">25 Nov 2023, 08:15 AM</div>
          </div>
          <div className="border-l-4 border-red-500 pl-3 py-2">
            <div className="text-sm font-medium">US Treasury yield curve flattening</div>
            <div className="text-xs text-muted-foreground">25 Nov 2023, 07:30 AM</div>
          </div>
          <div className="border-l-4 border-blue-500 pl-3 py-2">
            <div className="text-sm font-medium">Federal Reserve meeting minutes released</div>
            <div className="text-xs text-muted-foreground">24 Nov 2023, 04:45 PM</div>
          </div>
          <div className="border-l-4 border-green-500 pl-3 py-2">
            <div className="text-sm font-medium">GBP volatility increasing ahead of BoE decision</div>
            <div className="text-xs text-muted-foreground">24 Nov 2023, 11:20 AM</div>
          </div>
          
          <Button variant="outline" className="w-full justify-between">
            <span>Manage Market Alerts</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

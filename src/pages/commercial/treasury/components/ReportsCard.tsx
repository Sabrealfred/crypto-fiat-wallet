
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, TrendingUp, Globe, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const ReportsCard = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="lg:col-span-3 border-blue-100 dark:border-blue-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Reports & Analytics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid md:grid-cols-3 gap-4">
          <Button
            variant="outline"
            className="h-auto p-4 flex flex-col items-start text-left gap-2 border-blue-200 dark:border-blue-800"
            onClick={() => navigate("/commercial/treasury/reports")}
          >
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
              <Download className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium">Cash Position Reports</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Daily cash position by currency and account
              </p>
            </div>
            <div className="mt-2 flex items-center text-blue-600 dark:text-blue-400 text-sm">
              Generate Report <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="h-auto p-4 flex flex-col items-start text-left gap-2 border-blue-200 dark:border-blue-800"
            onClick={() => navigate("/commercial/treasury/reports")}
          >
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
              <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium">Forecast Reports</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Cash flow forecasts for the next 30/60/90 days
              </p>
            </div>
            <div className="mt-2 flex items-center text-blue-600 dark:text-blue-400 text-sm">
              Generate Report <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </Button>
          
          <Button
            variant="outline"
            className="h-auto p-4 flex flex-col items-start text-left gap-2 border-blue-200 dark:border-blue-800"
            onClick={() => navigate("/commercial/treasury/reports")}
          >
            <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded-full">
              <Globe className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-medium">FX Exposure Reports</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Foreign exchange exposure and hedging activities
              </p>
            </div>
            <div className="mt-2 flex items-center text-blue-600 dark:text-blue-400 text-sm">
              Generate Report <ChevronRight className="h-4 w-4 ml-1" />
            </div>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

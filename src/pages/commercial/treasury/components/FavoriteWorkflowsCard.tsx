
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import { WorkflowTableRow } from "./WorkflowTableRow";

// Favorite Workflows for quick access
const favoriteWorkflows = [
  { name: "JPY Forecast", description: "JPY Position Report", date: "Daily" },
  { name: "CASH_POSITION_EOD", description: "Cash Position End-of-Day", date: "Daily" },
  { name: "CASH_FORECAST", description: "15-day Forecast", date: "Weekly" },
  { name: "CASH_FORECAST_1M", description: "1-Week Forecast", date: "Daily" },
  { name: "CASH_RECON_EOD_SUM", description: "Cash Recon End-of-Day", date: "Daily" }
];

export const FavoriteWorkflowsCard = () => {
  return (
    <Card className="mb-6 border-blue-100 dark:border-blue-800">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium">Favorite Workflows</CardTitle>
          <PlusIcon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left font-medium text-sm py-2">Name</th>
                <th className="text-left font-medium text-sm py-2">Description</th>
                <th className="text-left font-medium text-sm py-2">Frequency</th>
                <th className="text-right font-medium text-sm py-2"></th>
              </tr>
            </thead>
            <tbody>
              {favoriteWorkflows.map((workflow, i) => (
                <WorkflowTableRow 
                  key={i}
                  name={workflow.name} 
                  description={workflow.description} 
                  date={workflow.date} 
                />
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

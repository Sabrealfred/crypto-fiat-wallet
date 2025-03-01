
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, PieChart } from "lucide-react";

export const ScheduledReportsPanel = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Scheduled Reports</CardTitle>
        <CardDescription>Automated reports scheduled for delivery</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Daily Cash Position</h4>
              <p className="text-sm text-muted-foreground mt-1">
                <Calendar className="h-3 w-3 inline mr-1" />
                Every weekday at 8:00 AM
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="ghost" size="sm" className="text-red-600 dark:text-red-400">Disable</Button>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Weekly Treasury Summary</h4>
              <p className="text-sm text-muted-foreground mt-1">
                <Calendar className="h-3 w-3 inline mr-1" />
                Every Monday at 9:00 AM
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="ghost" size="sm" className="text-red-600 dark:text-red-400">Disable</Button>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-4 border rounded-lg">
            <div>
              <h4 className="font-medium">Monthly Performance Report</h4>
              <p className="text-sm text-muted-foreground mt-1">
                <Calendar className="h-3 w-3 inline mr-1" />
                1st of each month at 7:00 AM
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">Edit</Button>
              <Button variant="ghost" size="sm" className="text-red-600 dark:text-red-400">Disable</Button>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t p-4 flex justify-center">
        <Button className="gap-2">
          <PieChart className="h-4 w-4" />
          Schedule New Report
        </Button>
      </CardFooter>
    </Card>
  );
};


import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  CardFooter
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Clock, Settings } from "lucide-react";

interface RecentReportsTableProps {
  reports: {
    id: number; 
    name: string; 
    type: string; 
    date: string; 
    status: string;
  }[];
}

export const RecentReportsTable: React.FC<RecentReportsTableProps> = ({ reports }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <CardTitle>Recent Reports</CardTitle>
          <Button className="mt-2 md:mt-0 gap-2">
            <FileText className="h-4 w-4" />
            Generate New Report
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left p-3 font-medium">Report Name</th>
                <th className="text-left p-3 font-medium">Type</th>
                <th className="text-left p-3 font-medium">Date</th>
                <th className="text-left p-3 font-medium">Status</th>
                <th className="text-right p-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id} className="border-b hover:bg-muted/20">
                  <td className="p-3">
                    <div className="font-medium">{report.name}</div>
                  </td>
                  <td className="p-3 text-muted-foreground">{report.type}</td>
                  <td className="p-3 text-muted-foreground">{report.date}</td>
                  <td className="p-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      report.status === 'Final' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300'
                    }`}>
                      {report.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">View</Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
      <CardFooter className="border-t flex items-center justify-between p-4">
        <div className="text-sm text-muted-foreground">
          <Clock className="h-4 w-4 inline mr-1" />
          Last updated: Aug 10, 2023 at 09:45 AM
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <Settings className="h-4 w-4" />
          Report Settings
        </Button>
      </CardFooter>
    </Card>
  );
};

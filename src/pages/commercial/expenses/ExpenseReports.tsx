
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FileText, Download, Eye, Check, X, Filter } from "lucide-react";

interface ExpenseReport {
  id: string;
  date: string;
  employee: string;
  amount: number;
  status: "pending" | "approved" | "rejected";
  category: string;
  description: string;
}

const recentReports: ExpenseReport[] = [
  {
    id: "EXP-001",
    date: "2024-03-15",
    employee: "John Smith",
    amount: 1250.00,
    status: "pending",
    category: "Travel",
    description: "Business trip to New York"
  },
  {
    id: "EXP-002",
    date: "2024-03-14",
    employee: "Sarah Johnson",
    amount: 450.75,
    status: "approved",
    category: "Office Supplies",
    description: "Quarterly office supplies"
  },
  {
    id: "EXP-003",
    date: "2024-03-13",
    employee: "Michael Brown",
    amount: 890.50,
    status: "rejected",
    category: "Entertainment",
    description: "Client dinner meeting"
  },
];

export default function ExpenseReportsPage() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-6">
        <CommercialHeader
          title="Expense Reports"
          description="Review and manage expense reports"
          showBack={true}
        />

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 text-primary" />
                Pending Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground mt-1">
                Requires review
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                Approved This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground mt-1">
                Total $12,450
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <X className="h-4 w-4 text-red-500" />
                Rejected This Month
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground mt-1">
                Total $1,890
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mb-6">
          <Button className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            New Report
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Reports Table */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Report ID</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell className="font-medium">{report.id}</TableCell>
                    <TableCell>{report.date}</TableCell>
                    <TableCell>{report.employee}</TableCell>
                    <TableCell>{report.category}</TableCell>
                    <TableCell>${report.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        report.status === 'approved' ? 'bg-green-100 text-green-700' :
                        report.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-yellow-100 text-yellow-700'
                      }`}>
                        {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

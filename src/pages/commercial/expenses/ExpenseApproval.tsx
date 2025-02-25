
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DollarSign,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  UserCheck,
  AlertTriangle,
} from "lucide-react";

const pendingExpenses = [
  {
    id: "EXP001",
    description: "Business Travel - NYC Conference",
    amount: 2500,
    department: "Sales",
    submittedBy: "John Smith",
    status: "pending",
    date: "2024-03-15"
  },
  {
    id: "EXP002",
    description: "Office Supplies Q1",
    amount: 1200,
    department: "Operations",
    submittedBy: "Sarah Johnson",
    status: "pending",
    date: "2024-03-14"
  }
];

const recentApprovals = [
  {
    id: "EXP003",
    description: "Marketing Campaign",
    amount: 5000,
    department: "Marketing",
    approvedBy: "Michael Brown",
    status: "approved",
    date: "2024-03-13"
  },
  {
    id: "EXP004",
    description: "Software Licenses",
    amount: 3500,
    department: "IT",
    approvedBy: "Lisa Chen",
    status: "rejected",
    date: "2024-03-12"
  }
];

export default function ExpenseApprovalPage() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Expense Approval System" 
          description="Review and approve expense requests"
          showBack={true}
        />

        {/* Summary Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Pending Approvals</p>
              <h3 className="text-2xl font-bold mt-2">8</h3>
              <p className="text-sm text-yellow-500 mt-2 flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Awaiting Review
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Value</p>
              <h3 className="text-2xl font-bold mt-2">$15,200</h3>
              <p className="text-sm text-muted-foreground mt-2">Pending requests</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Approved Today</p>
              <h3 className="text-2xl font-bold mt-2">5</h3>
              <p className="text-sm text-green-500 mt-2 flex items-center">
                <CheckCircle className="h-4 w-4 mr-1" />
                Processed
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Average Response Time</p>
              <h3 className="text-2xl font-bold mt-2">4.2h</h3>
              <p className="text-sm text-blue-500 mt-2">Within SLA</p>
            </CardContent>
          </Card>
        </div>

        {/* Pending Approvals */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Pending Approvals
              </CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Bulk Approve
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Submitted By</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingExpenses.map((expense) => (
                  <TableRow key={expense.id}>
                    <TableCell>{expense.id}</TableCell>
                    <TableCell>{expense.description}</TableCell>
                    <TableCell>${expense.amount}</TableCell>
                    <TableCell>{expense.department}</TableCell>
                    <TableCell>{expense.submittedBy}</TableCell>
                    <TableCell>{expense.date}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" className="text-green-600">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-600">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <UserCheck className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Approved By</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentApprovals.map((approval) => (
                  <TableRow key={approval.id}>
                    <TableCell>{approval.id}</TableCell>
                    <TableCell>{approval.description}</TableCell>
                    <TableCell>${approval.amount}</TableCell>
                    <TableCell>{approval.department}</TableCell>
                    <TableCell>{approval.approvedBy}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        approval.status === 'approved' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-red-100 text-red-700'
                      }`}>
                        {approval.status.toUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell>{approval.date}</TableCell>
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

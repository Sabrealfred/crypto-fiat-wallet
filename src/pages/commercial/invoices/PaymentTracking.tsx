
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
  Calendar,
  Download,
  Filter,
  AlertCircle,
  CheckCircle2,
  Clock,
  DollarSign
} from "lucide-react";

const payments = [
  {
    id: "INV001",
    client: "Acme Corp",
    amount: 5000,
    dueDate: "2024-03-20",
    status: "paid",
    paymentDate: "2024-03-15"
  },
  {
    id: "INV002",
    client: "Tech Solutions",
    amount: 3500,
    dueDate: "2024-03-25",
    status: "pending",
    paymentDate: null
  },
  {
    id: "INV003",
    client: "Global Services",
    amount: 7800,
    dueDate: "2024-03-18",
    status: "overdue",
    paymentDate: null
  }
];

export default function PaymentTrackingPage() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Payment Tracking" 
          description="Monitor and manage invoice payments"
          showBack={true}
        />

        {/* Payment Metrics */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Total Outstanding</p>
              <h3 className="text-2xl font-bold mt-2">$42,500</h3>
              <p className="text-sm text-yellow-500 mt-2">8 invoices pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Overdue Payments</p>
              <h3 className="text-2xl font-bold mt-2">$12,800</h3>
              <p className="text-sm text-red-500 mt-2">3 invoices overdue</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Paid This Month</p>
              <h3 className="text-2xl font-bold mt-2">$85,200</h3>
              <p className="text-sm text-green-500 mt-2">15 invoices paid</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">Average Payment Time</p>
              <h3 className="text-2xl font-bold mt-2">12 days</h3>
              <p className="text-sm text-blue-500 mt-2">Within target</p>
            </CardContent>
          </Card>
        </div>

        {/* Payment Table */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>Payment Status</CardTitle>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Date Range
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Payment Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.id}</TableCell>
                    <TableCell>{payment.client}</TableCell>
                    <TableCell>${payment.amount}</TableCell>
                    <TableCell>{payment.dueDate}</TableCell>
                    <TableCell>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        payment.status === 'paid' 
                          ? 'bg-green-100 text-green-700'
                          : payment.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      }`}>
                        {payment.status.toUpperCase()}
                      </span>
                    </TableCell>
                    <TableCell>{payment.paymentDate || "-"}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <DollarSign className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          {payment.status === 'paid' ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : payment.status === 'pending' ? (
                            <Clock className="h-4 w-4 text-yellow-500" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          )}
                        </Button>
                      </div>
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

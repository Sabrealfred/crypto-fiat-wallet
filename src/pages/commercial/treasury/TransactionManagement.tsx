
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  DollarSign,
  Download,
  Filter,
  Plus,
  Search,
  FileText,
  ArrowUpRight,
  ArrowDownRight
} from "lucide-react";

interface Transaction {
  id: string;
  date: string;
  description: string;
  amount: number;
  type: 'credit' | 'debit';
  category: string;
  status: 'completed' | 'pending' | 'failed';
}

const transactions: Transaction[] = [
  {
    id: "1",
    date: "2024-02-20",
    description: "International Wire Transfer",
    amount: 50000,
    type: "debit",
    category: "Wire Transfer",
    status: "completed"
  },
  {
    id: "2",
    date: "2024-02-19",
    description: "Corporate Payment",
    amount: 75000,
    type: "credit",
    category: "Payment",
    status: "completed"
  },
  {
    id: "3",
    date: "2024-02-18",
    description: "Supplier Invoice",
    amount: 25000,
    type: "debit",
    category: "Invoice",
    status: "pending"
  },
  {
    id: "4",
    date: "2024-02-17",
    description: "Client Payment",
    amount: 100000,
    type: "credit",
    category: "Payment",
    status: "completed"
  },
  {
    id: "5",
    date: "2024-02-16",
    description: "Payroll Processing",
    amount: 200000,
    type: "debit",
    category: "Payroll",
    status: "pending"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-600 dark:bg-green-500/20';
    case 'pending':
      return 'bg-yellow-100 text-yellow-600 dark:bg-yellow-500/20';
    case 'failed':
      return 'bg-red-100 text-red-600 dark:bg-red-500/20';
    default:
      return 'bg-gray-100 text-gray-600 dark:bg-gray-500/20';
  }
};

export default function TransactionManagement() {
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Transaction Management" 
          description="Monitor and manage your treasury transactions"
        />
        
        <div className="grid gap-6">
          {/* Quick Stats */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Total Volume</p>
                    <h3 className="text-2xl font-bold mt-1">$450,000</h3>
                    <p className="text-sm text-green-500 flex items-center mt-1">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      +12.5%
                    </p>
                  </div>
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <DollarSign className="h-6 w-6 text-blue-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Pending</p>
                    <h3 className="text-2xl font-bold mt-1">$225,000</h3>
                    <p className="text-sm text-yellow-500 flex items-center mt-1">
                      2 transactions
                    </p>
                  </div>
                  <div className="bg-yellow-50 p-3 rounded-lg">
                    <FileText className="h-6 w-6 text-yellow-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Completed</p>
                    <h3 className="text-2xl font-bold mt-1">$225,000</h3>
                    <p className="text-sm text-green-500 flex items-center mt-1">
                      3 transactions
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <FileText className="h-6 w-6 text-green-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                    <h3 className="text-2xl font-bold mt-1">94.5%</h3>
                    <p className="text-sm text-green-500 flex items-center mt-1">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      +2.5%
                    </p>
                  </div>
                  <div className="bg-purple-50 p-3 rounded-lg">
                    <FileText className="h-6 w-6 text-purple-500" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transactions Table */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Recent Transactions</CardTitle>
                <div className="flex gap-4">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Transaction
                  </Button>
                </div>
              </div>

              <div className="flex gap-4 mt-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search transactions..." className="pl-8" />
                  </div>
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
                <Select defaultValue="all">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="wire">Wire Transfer</SelectItem>
                    <SelectItem value="payment">Payment</SelectItem>
                    <SelectItem value="invoice">Invoice</SelectItem>
                    <SelectItem value="payroll">Payroll</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell className={transaction.type === 'credit' ? 'text-green-500' : 'text-red-500'}>
                        {transaction.type === 'credit' ? '+' : '-'}${transaction.amount.toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          {transaction.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}


import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Alert,
  AlertDescription,
  AlertTitle
} from "@/components/ui/alert";
import { 
  CreditCard,
  Clock,
  Check,
  AlertTriangle,
  Filter,
  Search,
  Download,
  Plus,
  FileText,
  ArrowUpDown,
  Calendar
} from "lucide-react";
import { useState } from "react";

// Sample ACH transfer data
const achTransfers = [
  {
    id: "ACH-10045",
    amount: "$15,750.00",
    company: "Acme Corporation",
    accountNumber: "****4567",
    type: "Credit",
    status: "Completed",
    date: "2023-11-10",
    effectiveDate: "2023-11-12"
  },
  {
    id: "ACH-10044",
    amount: "$8,320.50",
    company: "Global Industries",
    accountNumber: "****7890",
    type: "Debit",
    status: "Completed",
    date: "2023-11-09",
    effectiveDate: "2023-11-11"
  },
  {
    id: "ACH-10043",
    amount: "$32,450.00",
    company: "Tech Solutions Inc.",
    accountNumber: "****2345",
    type: "Credit",
    status: "Pending",
    date: "2023-11-09",
    effectiveDate: "2023-11-13"
  },
  {
    id: "ACH-10042",
    amount: "$5,125.75",
    company: "Alpha Services",
    accountNumber: "****6789",
    type: "Credit",
    status: "Pending",
    date: "2023-11-08",
    effectiveDate: "2023-11-12"
  },
  {
    id: "ACH-10041",
    amount: "$18,900.00",
    company: "Omega Manufacturers",
    accountNumber: "****1234",
    type: "Debit",
    status: "Failed",
    date: "2023-11-08",
    effectiveDate: "2023-11-10"
  },
  {
    id: "ACH-10040",
    amount: "$7,632.40",
    company: "Delta Logistics",
    accountNumber: "****5678",
    type: "Credit",
    status: "Completed",
    date: "2023-11-07",
    effectiveDate: "2023-11-09"
  },
];

const achBatches = [
  {
    id: "BATCH-2023",
    description: "November Vendor Payments",
    count: 24,
    totalAmount: "$127,845.50",
    status: "Processed",
    date: "2023-11-08",
    company: "Main Account"
  },
  {
    id: "BATCH-2022",
    description: "Payroll - November 1st",
    count: 156,
    totalAmount: "$342,890.75",
    status: "Processed",
    date: "2023-11-01",
    company: "Payroll Account"
  },
  {
    id: "BATCH-2021",
    description: "Tax Payments - Q3",
    count: 5,
    totalAmount: "$86,250.00",
    status: "Pending",
    date: "2023-11-12",
    company: "Tax Account"
  },
];

export default function ACHProcessingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  
  // Filter transfers based on search term
  const filteredTransfers = achTransfers.filter(transfer => 
    transfer.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transfer.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    transfer.amount.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="ACH Processing" 
          description="Manage Automated Clearing House (ACH) payment operations"
          showBack={true}
        />

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Processed</p>
                  <h3 className="text-2xl font-bold mt-1">$245,876.25</h3>
                  <p className="text-xs text-muted-foreground mt-1">Last 30 days</p>
                </div>
                <div className="bg-green-100 dark:bg-green-800/50 p-2 rounded-full">
                  <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <h3 className="text-2xl font-bold mt-1">$56,325.75</h3>
                  <p className="text-xs text-muted-foreground mt-1">3 transactions</p>
                </div>
                <div className="bg-blue-100 dark:bg-blue-800/50 p-2 rounded-full">
                  <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Completed</p>
                  <h3 className="text-2xl font-bold mt-1">$164,427.65</h3>
                  <p className="text-xs text-muted-foreground mt-1">15 transactions</p>
                </div>
                <div className="bg-green-100 dark:bg-green-800/50 p-2 rounded-full">
                  <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Failed</p>
                  <h3 className="text-2xl font-bold mt-1">$25,122.85</h3>
                  <p className="text-xs text-muted-foreground mt-1">2 transactions</p>
                </div>
                <div className="bg-red-100 dark:bg-red-800/50 p-2 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notification */}
        <Alert className="mb-6 border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-900/20">
          <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          <AlertTitle className="text-amber-800 dark:text-amber-400">Upcoming Maintenance</AlertTitle>
          <AlertDescription className="text-amber-700 dark:text-amber-500">
            ACH processing will be unavailable on November 15th from 2:00 AM to 4:00 AM ET for scheduled maintenance.
          </AlertDescription>
        </Alert>

        {/* ACH Management Tabs */}
        <Tabs defaultValue="transfers" className="w-full mb-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="transfers">Individual Transfers</TabsTrigger>
            <TabsTrigger value="batches">Batch Processing</TabsTrigger>
          </TabsList>
          
          {/* Individual Transfers Tab */}
          <TabsContent value="transfers">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>ACH Transfers</CardTitle>
                  <CardDescription>View and manage individual ACH transfers</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Transfer
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row justify-between mb-4 gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder="Search transfers..."
                      className="pl-8 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring w-full sm:w-[300px]"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Date Range
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
                
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>
                          <div className="flex items-center">
                            Amount
                            <ArrowUpDown className="ml-1 h-3 w-3" />
                          </div>
                        </TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Account</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Effective Date</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransfers.map((transfer) => (
                        <TableRow key={transfer.id}>
                          <TableCell className="font-mono text-xs">{transfer.id}</TableCell>
                          <TableCell className="font-medium">{transfer.amount}</TableCell>
                          <TableCell>{transfer.company}</TableCell>
                          <TableCell className="font-mono text-xs">{transfer.accountNumber}</TableCell>
                          <TableCell>
                            <Badge variant={transfer.type === "Credit" ? "outline" : "secondary"}>
                              {transfer.type}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {transfer.status === "Completed" ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                                <Check className="h-3 w-3 mr-1" />
                                {transfer.status}
                              </Badge>
                            ) : transfer.status === "Pending" ? (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
                                <Clock className="h-3 w-3 mr-1" />
                                {transfer.status}
                              </Badge>
                            ) : (
                              <Badge variant="destructive">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                {transfer.status}
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>{transfer.date}</TableCell>
                          <TableCell>{transfer.effectiveDate}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">Details</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Batch Processing Tab */}
          <TabsContent value="batches">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div>
                  <CardTitle>ACH Batch Processing</CardTitle>
                  <CardDescription>Manage batch ACH file processing</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    New Batch
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Batch ID</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Company</TableHead>
                        <TableHead>Items</TableHead>
                        <TableHead>Total Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {achBatches.map((batch) => (
                        <TableRow key={batch.id}>
                          <TableCell className="font-mono text-xs">{batch.id}</TableCell>
                          <TableCell className="font-medium">{batch.description}</TableCell>
                          <TableCell>{batch.company}</TableCell>
                          <TableCell>{batch.count}</TableCell>
                          <TableCell className="font-medium">{batch.totalAmount}</TableCell>
                          <TableCell>
                            {batch.status === "Processed" ? (
                              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800">
                                <Check className="h-3 w-3 mr-1" />
                                {batch.status}
                              </Badge>
                            ) : (
                              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800">
                                <Clock className="h-3 w-3 mr-1" />
                                {batch.status}
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell>{batch.date}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="sm">
                              <FileText className="h-4 w-4" />
                              <span className="sr-only">Details</span>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

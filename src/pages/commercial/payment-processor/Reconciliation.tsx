
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileSpreadsheet, 
  ArrowDown, 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  SearchIcon,
  Download,
  UploadCloud,
  RefreshCw
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

interface ReconciliationItem {
  id: string;
  date: string;
  reference: string;
  transactionId: string;
  amount: number;
  currency: string;
  counterparty: string;
  status: "matched" | "unmatched" | "exception";
  internalReference?: string;
  bankReference?: string;
  reason?: string;
}

const sampleReconciliationItems: ReconciliationItem[] = [
  {
    id: "1",
    date: "2024-03-18",
    reference: "Invoice #123",
    transactionId: "TRX123456789",
    amount: 5000,
    currency: "USD",
    counterparty: "Global Supplies Inc.",
    status: "matched",
    internalReference: "INV-123-2024",
    bankReference: "WIRE-5678"
  },
  {
    id: "2",
    date: "2024-03-17",
    reference: "Supplier Payment",
    transactionId: "TRX987654321",
    amount: 7500,
    currency: "USD",
    counterparty: "Tech Solutions Ltd.",
    status: "matched",
    internalReference: "SUPP-456-2024",
    bankReference: "WIRE-1234"
  },
  {
    id: "3",
    date: "2024-03-16",
    reference: "Services",
    transactionId: "TRX456789123",
    amount: 3200,
    currency: "USD",
    counterparty: "Consultant Group LLC",
    status: "unmatched",
    internalReference: "SERV-789-2024",
    reason: "Missing bank transaction"
  },
  {
    id: "4",
    date: "2024-03-15",
    reference: "Monthly Rent",
    transactionId: "TRX789123456",
    amount: 9800,
    currency: "USD",
    counterparty: "Property Management Inc.",
    status: "exception",
    bankReference: "WIRE-9876",
    reason: "Amount discrepancy"
  },
  {
    id: "5",
    date: "2024-03-14",
    reference: "Utility Payment",
    transactionId: "TRX321654987",
    amount: 1250,
    currency: "USD",
    counterparty: "City Utilities",
    status: "matched",
    internalReference: "UTIL-012-2024",
    bankReference: "WIRE-5432"
  }
];

export default function ReconciliationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [items, setItems] = useState<ReconciliationItem[]>(sampleReconciliationItems);
  const [isUploading, setIsUploading] = useState(false);
  const [isReconciling, setIsReconciling] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const handleUploadStatement = () => {
    setIsUploading(true);
    // Simulate file processing
    setTimeout(() => {
      setIsUploading(false);
      toast.success("Bank statement processed successfully");
    }, 1500);
  };

  const handleReconcile = () => {
    setIsReconciling(true);
    // Simulate reconciliation process
    setTimeout(() => {
      setIsReconciling(false);
      toast.success("Reconciliation completed");
      // Update some items to be matched
      const updatedItems = [...items];
      updatedItems[2].status = "matched";
      updatedItems[2].bankReference = "WIRE-3456";
      delete updatedItems[2].reason;
      setItems(updatedItems);
    }, 2000);
  };

  const filteredItems = activeTab === "all" 
    ? items 
    : items.filter(item => item.status === activeTab);

  const searchedItems = searchQuery
    ? filteredItems.filter(
        item =>
          item.reference.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.counterparty.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : filteredItems;

  const summary = {
    total: items.length,
    matched: items.filter(item => item.status === "matched").length,
    unmatched: items.filter(item => item.status === "unmatched").length,
    exception: items.filter(item => item.status === "exception").length
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader
          title="Payment Reconciliation"
          description="Match and reconcile payment transactions"
          showBack={true}
        />

        <div className="grid gap-6">
          <div className="grid lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSpreadsheet className="h-5 w-5 text-primary" />
                  Bank Statement Import
                </CardTitle>
                <CardDescription>
                  Upload your bank statement file to reconcile with system transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                      <UploadCloud className="h-8 w-8 text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">Upload a bank statement file (CSV, OFX, MT940)</p>
                      <Button variant="outline" disabled={isUploading} onClick={handleUploadStatement}>
                        {isUploading ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <ArrowDown className="h-4 w-4 mr-2" />
                            Import Statement
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium">Account</label>
                        <Select defaultValue="operating">
                          <SelectTrigger>
                            <SelectValue placeholder="Select account" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="operating">Operating Account</SelectItem>
                            <SelectItem value="reserve">Reserve Account</SelectItem>
                            <SelectItem value="payroll">Payroll Account</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Date Range</label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input type="date" defaultValue="2024-03-01" />
                          <Input type="date" defaultValue="2024-03-31" />
                        </div>
                      </div>
                      <Button className="w-full" disabled={isReconciling} onClick={handleReconcile}>
                        {isReconciling ? (
                          <>
                            <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                            Reconciling...
                          </>
                        ) : (
                          "Reconcile"
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reconciliation Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-200 p-2 rounded-full">
                        <FileSpreadsheet className="h-4 w-4 text-gray-700" />
                      </div>
                      <span>Total Transactions</span>
                    </div>
                    <span className="font-bold">{summary.total}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="bg-green-200 p-2 rounded-full">
                        <CheckCircle2 className="h-4 w-4 text-green-700" />
                      </div>
                      <span className="text-green-700">Matched</span>
                    </div>
                    <span className="font-bold text-green-700">{summary.matched}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="bg-yellow-200 p-2 rounded-full">
                        <AlertCircle className="h-4 w-4 text-yellow-700" />
                      </div>
                      <span className="text-yellow-700">Unmatched</span>
                    </div>
                    <span className="font-bold text-yellow-700">{summary.unmatched}</span>
                  </div>
                  
                  <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="bg-red-200 p-2 rounded-full">
                        <XCircle className="h-4 w-4 text-red-700" />
                      </div>
                      <span className="text-red-700">Exceptions</span>
                    </div>
                    <span className="font-bold text-red-700">{summary.exception}</span>
                  </div>

                  <Button variant="outline" className="w-full mt-4">
                    <Download className="h-4 w-4 mr-2" />
                    Export Report
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Reconciliation Items</CardTitle>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full sm:max-w-md">
                  <TabsList className="grid grid-cols-4">
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="matched">Matched</TabsTrigger>
                    <TabsTrigger value="unmatched">Unmatched</TabsTrigger>
                    <TabsTrigger value="exception">Exceptions</TabsTrigger>
                  </TabsList>
                </Tabs>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search transactions..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Counterparty</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Internal Ref</TableHead>
                      <TableHead>Bank Ref</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Reason</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {searchedItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.date}</TableCell>
                        <TableCell>{item.reference}</TableCell>
                        <TableCell>{item.counterparty}</TableCell>
                        <TableCell>{item.currency} {item.amount.toLocaleString()}</TableCell>
                        <TableCell>{item.internalReference || "-"}</TableCell>
                        <TableCell>{item.bankReference || "-"}</TableCell>
                        <TableCell>
                          {item.status === "matched" ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Matched
                            </Badge>
                          ) : item.status === "unmatched" ? (
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Unmatched
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              <XCircle className="h-3 w-3 mr-1" />
                              Exception
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{item.reason || "-"}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

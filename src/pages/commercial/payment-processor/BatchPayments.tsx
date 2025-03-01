
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { 
  FileText, 
  Upload, 
  AlertCircle, 
  Check, 
  Trash, 
  DownloadCloud,
  RefreshCw,
  Plus
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

interface BatchPayment {
  id: string;
  accountNumber: string;
  bankName: string;
  amount: number;
  currency: string;
  reference: string;
  status: "valid" | "error";
  errorMessage?: string;
}

const sampleBatchPayments: BatchPayment[] = [
  {
    id: "1",
    accountNumber: "1234567890",
    bankName: "First National Bank",
    amount: 5000,
    currency: "USD",
    reference: "Invoice #12345",
    status: "valid"
  },
  {
    id: "2",
    accountNumber: "2345678901",
    bankName: "Metro Bank",
    amount: 7500,
    currency: "USD",
    reference: "Supplier Payment",
    status: "valid"
  },
  {
    id: "3",
    accountNumber: "INVALID",
    bankName: "City Credit Union",
    amount: 3200,
    currency: "USD",
    reference: "Services",
    status: "error",
    errorMessage: "Invalid account number format"
  },
  {
    id: "4",
    accountNumber: "4567890123",
    bankName: "People's Bank",
    amount: 9800,
    currency: "USD",
    reference: "Monthly Rent",
    status: "valid"
  },
  {
    id: "5",
    accountNumber: "5678901234",
    bankName: "Commerce Bank",
    amount: 1250,
    currency: "USD",
    reference: "Utility Payment",
    status: "valid"
  }
];

export default function BatchPaymentsPage() {
  const [batchPayments, setBatchPayments] = useState<BatchPayment[]>(sampleBatchPayments);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = () => {
    setIsUploading(true);
    // Simulate file processing
    setTimeout(() => {
      setIsUploading(false);
      toast.success("File processed successfully");
    }, 1500);
  };

  const handleProcessBatch = () => {
    if (batchPayments.some(payment => payment.status === "error")) {
      toast.error("Please fix all errors before processing");
      return;
    }

    setIsProcessing(true);
    // Simulate batch processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Batch payment initiated successfully");
      navigate("/commercial/payment-processor");
    }, 2000);
  };

  const handleRemovePayment = (id: string) => {
    setBatchPayments(batchPayments.filter(payment => payment.id !== id));
    toast.success("Payment removed from batch");
  };

  const validPaymentsCount = batchPayments.filter(payment => payment.status === "valid").length;
  const totalAmount = batchPayments
    .filter(payment => payment.status === "valid")
    .reduce((sum, payment) => sum + payment.amount, 0);

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader
          title="Batch Payments"
          description="Process multiple payments at once"
          showBack={true}
        />

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Import Payment Data
              </CardTitle>
              <CardDescription>
                Upload a CSV file with payment details or add payments manually
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground mb-2">Drag and drop your CSV file here</p>
                    <Button variant="outline" disabled={isUploading} onClick={handleFileUpload}>
                      {isUploading ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <DownloadCloud className="h-4 w-4 mr-2" />
                          Select File
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                <div className="w-full sm:w-64 flex flex-col gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-medium mb-2">Batch Summary</h3>
                    <p className="text-sm text-muted-foreground mb-1">
                      Total Payments: {batchPayments.length}
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">
                      Valid Payments: {validPaymentsCount}
                    </p>
                    <p className="text-sm text-muted-foreground mb-1">
                      Total Amount: ${totalAmount.toLocaleString()}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Errors: {batchPayments.length - validPaymentsCount}
                    </p>
                  </div>
                  <Button variant="default" onClick={() => navigate("/commercial/payment-processor/new-payment")}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Individual Payment
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Payment Entries
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Account Number</TableHead>
                      <TableHead>Bank</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Reference</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {batchPayments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.accountNumber}</TableCell>
                        <TableCell>{payment.bankName}</TableCell>
                        <TableCell>{payment.currency} {payment.amount.toLocaleString()}</TableCell>
                        <TableCell>{payment.reference}</TableCell>
                        <TableCell>
                          {payment.status === "valid" ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              <Check className="h-3 w-3 mr-1" />
                              Valid
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Error
                            </Badge>
                          )}
                          {payment.errorMessage && (
                            <p className="text-xs text-red-600 mt-1">{payment.errorMessage}</p>
                          )}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="sm" onClick={() => handleRemovePayment(payment.id)}>
                            <Trash className="h-4 w-4 text-red-500" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline" onClick={() => navigate("/commercial/payment-processor")}>
                  Cancel
                </Button>
                <Button 
                  disabled={isProcessing || batchPayments.length === 0 || validPaymentsCount === 0} 
                  onClick={handleProcessBatch}
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Process Batch"
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}


import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  RefreshCw,
  ExternalLink,
  Copy
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface PaymentStatusDetails {
  id: string;
  amount: number;
  currency: string;
  date: string;
  recipient: string;
  recipientAccount: string;
  recipientBank: string;
  status: "completed" | "pending" | "processing" | "failed";
  reference: string;
  transactionId: string;
  trackingId: string;
  timeline: {
    time: string;
    status: string;
    description: string;
  }[];
}

export default function PaymentStatusPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<PaymentStatusDetails | null>(null);
  const [activeTab, setActiveTab] = useState("details");

  const handleSearch = () => {
    if (!searchQuery.trim()) {
      toast.error("Please enter a payment reference or ID");
      return;
    }

    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      // Mock response for demo purposes
      const mockPayment: PaymentStatusDetails = {
        id: "PAY123456789",
        amount: 5000,
        currency: "USD",
        date: "2024-03-15",
        recipient: "Global Supplies Inc.",
        recipientAccount: "GB98MIDL07009312345678",
        recipientBank: "First National Bank",
        status: "processing",
        reference: "Invoice #87654",
        transactionId: "TRX987654321",
        trackingId: "TRACK34567890",
        timeline: [
          {
            time: "2024-03-15 09:12:45",
            status: "Initiated",
            description: "Payment request received and validated"
          },
          {
            time: "2024-03-15 09:15:22",
            status: "Processing",
            description: "Payment sent to clearing network"
          },
          {
            time: "2024-03-15 10:30:18",
            status: "Pending",
            description: "Awaiting confirmation from recipient bank"
          }
        ]
      };
      
      setPaymentDetails(mockPayment);
      setIsSearching(false);
    }, 1500);
  };

  const copyToClipboard = (text: string, description: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${description} copied to clipboard`);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader
          title="Payment Status"
          description="Track and check payment status"
          showBack={true}
        />

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="h-5 w-5 text-primary" />
              Search Payment
            </CardTitle>
            <CardDescription>
              Enter payment reference, ID, or transaction number
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3">
              <Input 
                placeholder="Enter payment reference or ID" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleSearch} disabled={isSearching}>
                {isSearching ? (
                  <>
                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                    Searching...
                  </>
                ) : (
                  "Search"
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {paymentDetails && (
          <Card>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>Payment {paymentDetails.id}</CardTitle>
                  <CardDescription>
                    {paymentDetails.date} • {paymentDetails.reference}
                  </CardDescription>
                </div>
                <Badge
                  className={
                    paymentDetails.status === "completed"
                      ? "bg-green-100 text-green-800 hover:bg-green-100"
                      : paymentDetails.status === "failed"
                      ? "bg-red-100 text-red-800 hover:bg-red-100"
                      : paymentDetails.status === "processing"
                      ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                      : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                  }
                >
                  {paymentDetails.status === "completed" && <CheckCircle2 className="h-3 w-3 mr-1" />}
                  {paymentDetails.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
                  {paymentDetails.status === "processing" && <RefreshCw className="h-3 w-3 mr-1" />}
                  {paymentDetails.status === "failed" && <AlertCircle className="h-3 w-3 mr-1" />}
                  {paymentDetails.status.charAt(0).toUpperCase() + paymentDetails.status.slice(1)}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Payment Details</TabsTrigger>
                  <TabsTrigger value="timeline">Timeline</TabsTrigger>
                </TabsList>
                
                <TabsContent value="details" className="space-y-4 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Amount</h3>
                      <p className="text-lg font-semibold">{paymentDetails.currency} {paymentDetails.amount.toLocaleString()}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Date</h3>
                      <p className="text-base">{paymentDetails.date}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Recipient</h3>
                      <p className="text-base">{paymentDetails.recipient}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Recipient Bank</h3>
                      <p className="text-base">{paymentDetails.recipientBank}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Recipient Account</h3>
                      <div className="flex items-center gap-1">
                        <p className="text-base">{paymentDetails.recipientAccount}</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 p-1"
                          onClick={() => copyToClipboard(paymentDetails.recipientAccount, "Account number")}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Reference</h3>
                      <p className="text-base">{paymentDetails.reference}</p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Transaction ID</h3>
                      <div className="flex items-center gap-1">
                        <p className="text-base">{paymentDetails.transactionId}</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 p-1"
                          onClick={() => copyToClipboard(paymentDetails.transactionId, "Transaction ID")}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Tracking ID</h3>
                      <div className="flex items-center gap-1">
                        <p className="text-base">{paymentDetails.trackingId}</p>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-6 p-1"
                          onClick={() => copyToClipboard(paymentDetails.trackingId, "Tracking ID")}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <Separator className="my-6" />
                  
                  <div className="flex justify-between">
                    <Button variant="outline">Download Receipt</Button>
                    <Button variant="outline" className="flex items-center gap-2">
                      <ExternalLink className="h-4 w-4" />
                      View in Network
                    </Button>
                  </div>
                </TabsContent>
                
                <TabsContent value="timeline" className="mt-4">
                  <div className="space-y-4">
                    {paymentDetails.timeline.map((event, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="relative">
                          <div className="absolute top-0 left-2.5 bottom-0 w-px bg-muted-foreground/20" />
                          <div className={`rounded-full p-1 border ${
                            event.status === "Initiated" ? "bg-blue-100 border-blue-500" :
                            event.status === "Processing" ? "bg-yellow-100 border-yellow-500" :
                            event.status === "Pending" ? "bg-purple-100 border-purple-500" :
                            event.status === "Completed" ? "bg-green-100 border-green-500" :
                            "bg-red-100 border-red-500"
                          }`}>
                            {event.status === "Initiated" && <FileText className="h-4 w-4 text-blue-600" />}
                            {event.status === "Processing" && <RefreshCw className="h-4 w-4 text-yellow-600" />}
                            {event.status === "Pending" && <Clock className="h-4 w-4 text-purple-600" />}
                            {event.status === "Completed" && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                            {event.status === "Failed" && <AlertCircle className="h-4 w-4 text-red-600" />}
                          </div>
                        </div>
                        <div className="flex-1 pb-4">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">{event.status}</h3>
                            <p className="text-sm text-muted-foreground">{event.time}</p>
                          </div>
                          <p className="text-sm text-muted-foreground">{event.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
        
        {!paymentDetails && !isSearching && searchQuery && (
          <div className="flex flex-col items-center justify-center p-12 text-center bg-muted/20 rounded-lg border border-dashed">
            <AlertCircle className="h-10 w-10 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No payment found</h3>
            <p className="text-muted-foreground max-w-md">
              We couldn't find any payment with the reference ID "{searchQuery}". 
              Please check the ID and try again.
            </p>
          </div>
        )}
      </div>
    </AppLayout>
  );
}

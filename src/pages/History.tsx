
import { Button } from "@/components/ui/button";
import { 
  Download, 
  Calendar,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { AppLayout } from "@/components/layout/app-layout";

export default function HistoryPage() {
  const transactions = [
    {
      id: 1,
      type: "incoming",
      description: "Received from John Doe",
      amount: 1250.00,
      date: "2024-02-15 14:35",
      status: "completed",
      reference: "REF001"
    },
    {
      id: 2,
      type: "outgoing",
      description: "Payment to Sarah Smith",
      amount: -850.00,
      date: "2024-02-15 12:20",
      status: "completed",
      reference: "REF002"
    },
    {
      id: 3,
      type: "incoming",
      description: "PayPal transfer",
      amount: 3200.00,
      date: "2024-02-14 16:45",
      status: "completed",
      reference: "REF003"
    },
    {
      id: 4,
      type: "outgoing",
      description: "Amazon purchase",
      amount: -156.00,
      date: "2024-02-14 10:15",
      status: "completed",
      reference: "REF004"
    },
    {
      id: 5,
      type: "outgoing",
      description: "Netflix subscription",
      amount: -15.99,
      date: "2024-02-13 09:00",
      status: "completed",
      reference: "REF005"
    }
  ];

  return (
    <AppLayout>
      <div className="flex-1 p-4 sm:p-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold mb-2">Transaction History</h1>
            <p className="text-sm sm:text-base text-muted-foreground">View and manage your transactions</p>
          </div>
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" className="flex-1 md:flex-none">
              <Calendar className="h-4 w-4 mr-2" />
              Filter by Date
            </Button>
            <Button variant="outline" className="flex-1 md:flex-none">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
            <Input 
              className="pl-10" 
              placeholder="Search transactions..." 
            />
          </div>
          <Button variant="outline" className="w-full md:w-auto">
            <Filter className="h-4 w-4 mr-2" />
            Filters
          </Button>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 border-b text-sm font-medium text-muted-foreground">
            <div>Date</div>
            <div className="md:col-span-2">Description</div>
            <div className="hidden md:block">Reference</div>
            <div className="text-right">Amount</div>
          </div>
          <div className="divide-y">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="grid grid-cols-2 md:grid-cols-5 gap-4 p-4 items-center hover:bg-black/5">
                <div className="text-sm text-muted-foreground">
                  {new Date(transaction.date).toLocaleDateString()}
                </div>
                <div className="md:col-span-2 flex items-center">
                  {transaction.type === "incoming" ? (
                    <ArrowDownRight className="h-4 w-4 mr-2 text-green-500 shrink-0" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 mr-2 text-red-500 shrink-0" />
                  )}
                  <span className="truncate">{transaction.description}</span>
                </div>
                <div className="hidden md:block text-sm text-muted-foreground">
                  {transaction.reference}
                </div>
                <div className={`text-right font-medium ${
                  transaction.type === "incoming" ? "text-green-600" : "text-red-500"
                }`}>
                  {transaction.type === "incoming" ? "+" : ""}
                  ${Math.abs(transaction.amount).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}


import { Button } from "@/components/ui/button";
import { 
  Download, 
  Calendar,
  Search,
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  ChevronDown,
  ChevronUp,
  Link2,
  ExternalLink
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export default function HistoryPage() {
  const [isFooterMenuOpen, setIsFooterMenuOpen] = useState({
    company: true,
    legal: true,
    support: true,
  });

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

  const toggleFooterSection = (section: keyof typeof isFooterMenuOpen) => {
    setIsFooterMenuOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Transaction History</h1>
            <p className="text-muted-foreground">View and manage your transactions</p>
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
          <Button variant="outline" className="md:w-auto">
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

      {/* Footer */}
      <footer className="mt-auto bg-white/80 backdrop-blur-md border-t">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">WYMU</h2>
              <p className="text-sm text-muted-foreground">
                Simplifying your financial journey with secure and innovative digital banking solutions.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Link2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Company Section */}
            <div>
              <Button
                variant="ghost"
                className="flex items-center justify-between w-full mb-2 md:mb-4"
                onClick={() => toggleFooterSection('company')}
              >
                <span className="font-semibold">Company</span>
                {isFooterMenuOpen.company ? (
                  <ChevronUp className="h-4 w-4 md:hidden" />
                ) : (
                  <ChevronDown className="h-4 w-4 md:hidden" />
                )}
              </Button>
              <div className={`space-y-2 ${isFooterMenuOpen.company ? 'block' : 'hidden md:block'}`}>
                <Button variant="link" className="text-muted-foreground hover:text-primary">About Us</Button>
                <Button variant="link" className="text-muted-foreground hover:text-primary">Careers</Button>
                <Button variant="link" className="text-muted-foreground hover:text-primary">Press</Button>
                <Button variant="link" className="text-muted-foreground hover:text-primary">Blog</Button>
              </div>
            </div>

            {/* Legal Section */}
            <div>
              <Button
                variant="ghost"
                className="flex items-center justify-between w-full mb-2 md:mb-4"
                onClick={() => toggleFooterSection('legal')}
              >
                <span className="font-semibold">Legal</span>
                {isFooterMenuOpen.legal ? (
                  <ChevronUp className="h-4 w-4 md:hidden" />
                ) : (
                  <ChevronDown className="h-4 w-4 md:hidden" />
                )}
              </Button>
              <div className={`space-y-2 ${isFooterMenuOpen.legal ? 'block' : 'hidden md:block'}`}>
                <Button variant="link" className="text-muted-foreground hover:text-primary">Privacy Policy</Button>
                <Button variant="link" className="text-muted-foreground hover:text-primary">Terms of Service</Button>
                <Button variant="link" className="text-muted-foreground hover:text-primary">Cookie Policy</Button>
                <Button variant="link" className="text-muted-foreground hover:text-primary">Licenses</Button>
              </div>
            </div>

            {/* Support Section */}
            <div>
              <Button
                variant="ghost"
                className="flex items-center justify-between w-full mb-2 md:mb-4"
                onClick={() => toggleFooterSection('support')}
              >
                <span className="font-semibold">Support</span>
                {isFooterMenuOpen.support ? (
                  <ChevronUp className="h-4 w-4 md:hidden" />
                ) : (
                  <ChevronDown className="h-4 w-4 md:hidden" />
                )}
              </Button>
              <div className={`space-y-2 ${isFooterMenuOpen.support ? 'block' : 'hidden md:block'}`}>
                <Button variant="link" className="text-muted-foreground hover:text-primary">Help Center</Button>
                <Button variant="link" className="text-muted-foreground hover:text-primary">Contact Us</Button>
                <Button variant="link" className="text-muted-foreground hover:text-primary">Security</Button>
                <Button variant="link" className="text-muted-foreground hover:text-primary">Status</Button>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center md:text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <p>© 2024 Wymu. All rights reserved. NMLS ID: 123456</p>
              <p className="md:text-right">
                Deposits are FDIC insured up to $250,000 per depositor
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

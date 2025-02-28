
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, Plus, Download, Filter, Building2, CreditCard, Landmark, 
  Globe, DollarSign, Eye, Settings, MoreHorizontal, RefreshCw 
} from "lucide-react";
import { useState } from "react";

const mockAccounts = [
  { 
    id: "ACC-12345", 
    name: "Main Operating Account", 
    type: "Business Checking", 
    bank: "Global Banking Corp", 
    balance: 1250000.45, 
    currency: "USD", 
    status: "Active",
    lastActivity: "Today, 10:23 AM"
  },
  { 
    id: "ACC-12346", 
    name: "Payroll Account", 
    type: "Business Checking", 
    bank: "National Financial Services", 
    balance: 450000.12, 
    currency: "USD", 
    status: "Active",
    lastActivity: "Yesterday, 4:15 PM"
  },
  { 
    id: "ACC-12347", 
    name: "Tax Reserve", 
    type: "Business Savings", 
    bank: "Global Banking Corp", 
    balance: 875000.00, 
    currency: "USD", 
    status: "Active",
    lastActivity: "Feb 12, 2024"
  },
  { 
    id: "ACC-12348", 
    name: "International Operations", 
    type: "Business Checking", 
    bank: "Eastern Trust Bank", 
    balance: 625000.88, 
    currency: "EUR", 
    status: "Active",
    lastActivity: "Feb 14, 2024"
  },
  { 
    id: "ACC-12349", 
    name: "Investment Account", 
    type: "Investment", 
    bank: "Global Investment Services", 
    balance: 3450000.00, 
    currency: "USD", 
    status: "Active",
    lastActivity: "Feb 10, 2024"
  },
  { 
    id: "ACC-12350", 
    name: "Strategic Reserve", 
    type: "Business Savings", 
    bank: "National Financial Services", 
    balance: 1750000.00, 
    currency: "USD", 
    status: "Active",
    lastActivity: "Jan 28, 2024"
  },
  { 
    id: "ACC-12351", 
    name: "Marketing Fund", 
    type: "Business Checking", 
    bank: "Eastern Trust Bank", 
    balance: 325000.45, 
    currency: "USD", 
    status: "Active",
    lastActivity: "Feb 15, 2024"
  },
  { 
    id: "ACC-12352", 
    name: "Asian Subsidiary", 
    type: "Business Checking", 
    bank: "International Finance", 
    balance: 780000.90, 
    currency: "JPY", 
    status: "Active",
    lastActivity: "Feb 08, 2024"
  }
];

const accountsSummary = {
  total: mockAccounts.reduce((sum, acc) => sum + acc.balance, 0),
  count: mockAccounts.length,
  banks: new Set(mockAccounts.map(acc => acc.bank)).size,
  currencies: new Set(mockAccounts.map(acc => acc.currency)).size
};

export default function OpAccountsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("accounts");

  // Filter accounts based on search term
  const filteredAccounts = mockAccounts.filter(account => 
    account.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    account.bank.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Account Management"
          description="Manage all your commercial accounts in one place"
          showBack={true}
        />

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="border-blue-100 dark:border-blue-900">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Balance</p>
                  <h3 className="text-2xl font-bold mt-1">${(accountsSummary.total / 1000000).toFixed(2)}M</h3>
                  <p className="text-xs text-muted-foreground mt-1">Across all accounts</p>
                </div>
                <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900/30">
                  <DollarSign className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-900">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Accounts</p>
                  <h3 className="text-2xl font-bold mt-1">{accountsSummary.count}</h3>
                  <p className="text-xs text-muted-foreground mt-1">All accounts active</p>
                </div>
                <div className="p-3 rounded-full bg-green-100 dark:bg-green-900/30">
                  <CreditCard className="h-5 w-5 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-900">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Banking Partners</p>
                  <h3 className="text-2xl font-bold mt-1">{accountsSummary.banks}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Connected institutions</p>
                </div>
                <div className="p-3 rounded-full bg-purple-100 dark:bg-purple-900/30">
                  <Landmark className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-900">
            <CardContent className="pt-6">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Currencies</p>
                  <h3 className="text-2xl font-bold mt-1">{accountsSummary.currencies}</h3>
                  <p className="text-xs text-muted-foreground mt-1">Multi-currency enabled</p>
                </div>
                <div className="p-3 rounded-full bg-amber-100 dark:bg-amber-900/30">
                  <Globe className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full md:w-auto grid grid-cols-2 md:flex md:space-x-2">
            <TabsTrigger value="accounts" className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              <span>All Accounts</span>
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              <span>Account Settings</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="accounts">
            <Card className="border-blue-100 dark:border-blue-900">
              <CardHeader>
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                  <div>
                    <CardTitle>Accounts Overview</CardTitle>
                    <CardDescription>Manage and monitor all connected financial accounts</CardDescription>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <RefreshCw className="h-4 w-4" />
                      <span>Refresh</span>
                    </Button>
                    <Button size="sm" className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      <span>Add Account</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search accounts..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" />
                      <span>Filter</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-2">
                      <Download className="h-4 w-4" />
                      <span>Export</span>
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Account Name</TableHead>
                        <TableHead>ID</TableHead>
                        <TableHead>Bank</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead className="text-right">Balance</TableHead>
                        <TableHead>Currency</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Activity</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredAccounts.map((account) => (
                        <TableRow key={account.id}>
                          <TableCell className="font-medium">{account.name}</TableCell>
                          <TableCell className="font-mono text-xs">{account.id}</TableCell>
                          <TableCell>{account.bank}</TableCell>
                          <TableCell>{account.type}</TableCell>
                          <TableCell className="text-right font-medium">
                            ${account.balance.toLocaleString()}
                          </TableCell>
                          <TableCell>{account.currency}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-100 text-green-800 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800">
                              {account.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground">
                            {account.lastActivity}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredAccounts.length} of {mockAccounts.length} accounts
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>Previous</Button>
                  <Button variant="outline" size="sm" disabled>Next</Button>
                </div>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Configure settings for all your accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  For detailed account settings, please visit the Operations Settings page.
                </p>
                <div className="mt-4">
                  <Button 
                    className="flex items-center gap-2"
                    onClick={() => window.location.href = "/commercial/operations/settings"}
                  >
                    <Settings className="h-4 w-4" />
                    <span>Go to Operations Settings</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

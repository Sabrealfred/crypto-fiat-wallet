
import { OperationsCard } from "../OperationsCard";
import { BankConnectionsCard } from "../BankConnectionsCard";
import { bankIntegrations } from "../../data/marketData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Clock, Package, RefreshCw } from "lucide-react";

const pendingTransactions = [
  { id: 1, description: "International wire transfer", amount: "$24,500.00", status: "pending" },
  { id: 2, description: "Vendor payment", amount: "$12,750.00", status: "pending" },
  { id: 3, description: "Intercompany transfer", amount: "$45,000.00", status: "pending" }
];

const cashPoolingData = [
  { entity: "UK Subsidiary", balance: "$1.2M", contribution: 25 },
  { entity: "EU Operations", balance: "$1.8M", contribution: 37 },
  { entity: "US Headquarters", balance: "$0.9M", contribution: 19 },
  { entity: "APAC Division", balance: "$0.7M", contribution: 14 }
];

export const OperationsTabContent = () => {
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <OperationsCard />
      <BankConnectionsCard bankIntegrations={bankIntegrations} />
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Package className="h-5 w-5 text-blue-600" />
            Cash Pooling Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {cashPoolingData.map((item, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{item.entity}</span>
                  <span className="text-sm font-medium">{item.balance}</span>
                </div>
                <Progress value={item.contribution} className="h-2" />
                <p className="text-xs text-muted-foreground">{item.contribution}% of total pool</p>
                {index < cashPoolingData.length - 1 && <Separator className="my-2" />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="lg:col-span-2">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Clock className="h-5 w-5 text-amber-600" />
            Pending Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingTransactions.map((transaction, index) => (
              <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{transaction.description}</p>
                  <p className="text-sm text-muted-foreground">Awaiting approval</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{transaction.amount}</p>
                  <div className="flex items-center text-amber-600 text-sm">
                    <RefreshCw className="h-3 w-3 mr-1" />
                    <span>Pending</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            Reconciliation Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Today's transactions</span>
              <span className="text-sm font-medium text-green-600">98% matched</span>
            </div>
            <Progress value={98} className="h-2 bg-gray-100" />
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Week-to-date</span>
              <span className="text-sm font-medium text-green-600">95% matched</span>
            </div>
            <Progress value={95} className="h-2 bg-gray-100" />
            
            <div className="flex justify-between items-center">
              <span className="text-sm">Month-to-date</span>
              <span className="text-sm font-medium text-green-600">92% matched</span>
            </div>
            <Progress value={92} className="h-2 bg-gray-100" />
            
            <div className="mt-4 pt-4 border-t">
              <p className="text-sm font-medium">8 items require attention</p>
              <p className="text-xs text-muted-foreground">View reconciliation dashboard</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

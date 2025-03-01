
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RefreshCw } from "lucide-react";

export const OperationsCard = () => {
  return (
    <Card className="lg:col-span-2 border-blue-100 dark:border-blue-800">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <RefreshCw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          Today's Operations
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="grid grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Pending Transactions</div>
              <div className="text-2xl font-bold mt-1">12</div>
              <Button variant="ghost" size="sm" className="mt-2 h-8 px-2 text-xs">View All</Button>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Approvals Needed</div>
              <div className="text-2xl font-bold mt-1">5</div>
              <Button variant="ghost" size="sm" className="mt-2 h-8 px-2 text-xs">View All</Button>
            </div>
            <div className="border rounded-lg p-4">
              <div className="text-sm text-muted-foreground">Reconciliation Items</div>
              <div className="text-2xl font-bold mt-1">8</div>
              <Button variant="ghost" size="sm" className="mt-2 h-8 px-2 text-xs">View All</Button>
            </div>
          </div>
          
          <div>
            <h4 className="text-sm font-medium mb-3">Recent Transactions</h4>
            <div className="overflow-auto max-h-[300px]">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left font-medium text-sm py-2">Reference</th>
                    <th className="text-left font-medium text-sm py-2">Description</th>
                    <th className="text-left font-medium text-sm py-2">Amount</th>
                    <th className="text-left font-medium text-sm py-2">Status</th>
                    <th className="text-left font-medium text-sm py-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { ref: 'TX-7829', desc: 'Invoice Payment - Acme Inc', amount: '$42,500.00', status: 'completed', date: '25 Nov 2023' },
                    { ref: 'TX-7830', desc: 'FX Swap Settlement', amount: '€35,000.00', status: 'pending', date: '25 Nov 2023' },
                    { ref: 'TX-7831', desc: 'Internal Transfer', amount: '$125,000.00', status: 'processing', date: '25 Nov 2023' },
                    { ref: 'TX-7832', desc: 'Supplier Payment - XYZ Corp', amount: '$18,750.00', status: 'completed', date: '24 Nov 2023' },
                    { ref: 'TX-7833', desc: 'Payroll Processing', amount: '$89,450.00', status: 'scheduled', date: '26 Nov 2023' },
                  ].map((tx, i) => (
                    <tr key={i} className="border-b last:border-0">
                      <td className="py-3 text-sm">{tx.ref}</td>
                      <td className="py-3 text-sm">{tx.desc}</td>
                      <td className="py-3 text-sm">{tx.amount}</td>
                      <td className="py-3 text-sm">
                        <Badge variant={
                          tx.status === 'completed' ? 'default' :
                          tx.status === 'pending' ? 'secondary' :
                          tx.status === 'processing' ? 'outline' :
                          'secondary'
                        }>
                          {tx.status}
                        </Badge>
                      </td>
                      <td className="py-3 text-sm">{tx.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

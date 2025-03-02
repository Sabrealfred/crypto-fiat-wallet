
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Operation {
  id: number;
  date: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  rate: number;
  status: string;
}

interface RecentOperationsTableProps {
  operations: Operation[];
  formatCurrency: (value: number) => string;
}

export function RecentOperationsTable({ operations, formatCurrency }: RecentOperationsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Operations</CardTitle>
      </CardHeader>
      <CardContent>
        {operations.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium">Date</th>
                  <th className="text-left py-3 px-4 font-medium">From</th>
                  <th className="text-left py-3 px-4 font-medium">To</th>
                  <th className="text-right py-3 px-4 font-medium">Amount</th>
                  <th className="text-right py-3 px-4 font-medium">Rate</th>
                  <th className="text-right py-3 px-4 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {operations.map((op) => (
                  <tr key={op.id} className="border-b hover:bg-muted/50">
                    <td className="py-3 px-4">{op.date}</td>
                    <td className="py-3 px-4">{op.fromCurrency}</td>
                    <td className="py-3 px-4">{op.toCurrency}</td>
                    <td className="py-3 px-4 text-right">{formatCurrency(op.amount)}</td>
                    <td className="py-3 px-4 text-right">{op.rate}</td>
                    <td className="py-3 px-4 text-right">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                        ${op.status === 'completed' 
                          ? 'bg-green-100 text-green-800 dark:bg-green-800/20 dark:text-green-400' 
                          : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800/20 dark:text-yellow-400'
                        }`}>
                        {op.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            No recent operations to display
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-end border-t p-4">
        <Button variant="outline" size="sm">
          View All Transactions
        </Button>
      </CardFooter>
    </Card>
  );
}

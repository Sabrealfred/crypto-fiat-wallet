
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, DollarSign, SendHorizontal } from "lucide-react";
import { Payment } from "../types/payments";

interface PaymentsListProps {
  payments: Payment[];
}

export function PaymentsList({ payments }: PaymentsListProps) {
  return (
    <Card className="border-blue-100 dark:border-blue-900">
      <CardHeader className="bg-blue-50 dark:bg-blue-900/20 border-b border-blue-100 dark:border-blue-900">
        <CardTitle className="text-blue-900 dark:text-blue-100">Recent Payments</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-blue-100 dark:divide-blue-900">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-4 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                {payment.type === 'wire' && 
                  <div className="bg-blue-100 dark:bg-blue-900/40 p-2 rounded-full">
                    <SendHorizontal className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                }
                {payment.type === 'ach' && 
                  <div className="bg-green-100 dark:bg-green-900/40 p-2 rounded-full">
                    <DollarSign className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                }
                {payment.type === 'swift' && 
                  <div className="bg-purple-100 dark:bg-purple-900/40 p-2 rounded-full">
                    <CreditCard className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                }
                <div>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{payment.recipient}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{payment.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900 dark:text-gray-100">
                  {payment.currency} {payment.amount.toLocaleString()}
                </p>
                <p className={`text-sm rounded-full px-2 py-0.5 inline-block ${
                  payment.status === 'completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
                  payment.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
                  payment.status === 'processing' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300' :
                  'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

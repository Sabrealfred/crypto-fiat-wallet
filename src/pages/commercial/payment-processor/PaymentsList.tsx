
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreditCard, DollarSign, SendHorizontal } from "lucide-react";
import { Payment } from "../types/payments";

interface PaymentsListProps {
  payments: Payment[];
}

export function PaymentsList({ payments }: PaymentsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {payments.map((payment) => (
            <div
              key={payment.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center gap-4">
                {payment.type === 'wire' && <SendHorizontal className="h-5 w-5 text-blue-500" />}
                {payment.type === 'ach' && <DollarSign className="h-5 w-5 text-green-500" />}
                {payment.type === 'swift' && <CreditCard className="h-5 w-5 text-purple-500" />}
                <div>
                  <p className="font-medium">{payment.recipient}</p>
                  <p className="text-sm text-muted-foreground">{payment.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium">
                  {payment.currency} {payment.amount.toLocaleString()}
                </p>
                <p className={`text-sm ${
                  payment.status === 'completed' ? 'text-green-500' :
                  payment.status === 'pending' ? 'text-yellow-500' :
                  'text-blue-500'
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

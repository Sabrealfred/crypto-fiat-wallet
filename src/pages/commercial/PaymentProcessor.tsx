
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CreditCard,
  DollarSign,
  SendHorizontal,
  RefreshCw,
  FileCheck,
  Clock,
  List,
  FileSearch
} from "lucide-react";
import { useState } from "react";

interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: string;
  type: string;
  date: string;
  recipient: string;
}

const recentPayments: Payment[] = [
  {
    id: "PAY001",
    amount: 5000,
    currency: "USD",
    status: "completed",
    type: "wire",
    date: "2024-03-15",
    recipient: "Global Supplies Inc."
  },
  {
    id: "PAY002",
    amount: 2500,
    currency: "EUR",
    status: "pending",
    type: "ach",
    date: "2024-03-16",
    recipient: "Tech Solutions Ltd."
  },
  {
    id: "PAY003",
    amount: 7500,
    currency: "GBP",
    status: "processing",
    type: "swift",
    date: "2024-03-16",
    recipient: "European Services Co."
  }
];

export default function PaymentProcessorPage() {
  const [selectedTab, setSelectedTab] = useState("payments");

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Payment Processor"
          description="Process and manage commercial payments"
          showBack={true}
        />

        <div className="grid gap-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <QuickActionCard
              title="New Payment"
              icon={SendHorizontal}
              description="Create a new payment"
            />
            <QuickActionCard
              title="Batch Payments"
              icon={List}
              description="Process multiple payments"
            />
            <QuickActionCard
              title="Payment Status"
              icon={FileSearch}
              description="Check payment status"
            />
            <QuickActionCard
              title="Reconciliation"
              icon={RefreshCw}
              description="Reconcile payments"
            />
          </div>

          {/* Main Content */}
          <Tabs defaultValue="payments" className="space-y-4">
            <TabsList>
              <TabsTrigger value="payments">Payments</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="recurring">Recurring</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="payments" className="space-y-4">
              <PaymentsList payments={recentPayments} />
            </TabsContent>

            <TabsContent value="scheduled">
              <Card>
                <CardHeader>
                  <CardTitle>Scheduled Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <Clock className="mx-auto h-12 w-12 mb-4" />
                    <p>No scheduled payments found</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recurring">
              <Card>
                <CardHeader>
                  <CardTitle>Recurring Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <RefreshCw className="mx-auto h-12 w-12 mb-4" />
                    <p>No recurring payments configured</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-muted-foreground">
                    <FileCheck className="mx-auto h-12 w-12 mb-4" />
                    <p>No reports available</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}

function QuickActionCard({ 
  title, 
  icon: Icon, 
  description 
}: { 
  title: string; 
  icon: any; 
  description: string;
}) {
  return (
    <Card className="hover:bg-accent transition-colors cursor-pointer">
      <CardContent className="pt-6">
        <div className="text-center">
          <Icon className="h-8 w-8 mx-auto mb-2 text-primary" />
          <h3 className="font-semibold mb-1">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function PaymentsList({ payments }: { payments: Payment[] }) {
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


import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  SendHorizontal,
  RefreshCw,
  FileCheck,
  Clock,
  List,
  FileSearch
} from "lucide-react";
import { useState } from "react";
import { QuickActionCard } from "./payment-processor/QuickActionCard";
import { PaymentsList } from "./payment-processor/PaymentsList";
import { EmptyTabContent } from "./payment-processor/EmptyTabContent";
import { Payment } from "./types/payments";
import { useNavigate } from "react-router-dom";

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
  },
  {
    id: "PAY004",
    amount: 3200,
    currency: "USD",
    status: "completed",
    type: "wire",
    date: "2024-03-14",
    recipient: "Office Supplies Corp."
  },
  {
    id: "PAY005",
    amount: 9500,
    currency: "USD",
    status: "failed",
    type: "ach",
    date: "2024-03-13",
    recipient: "Global Logistics Inc."
  }
];

const scheduledPayments: Payment[] = [
  {
    id: "SCHD001",
    amount: 8500,
    currency: "USD",
    status: "pending",
    type: "wire",
    date: "2024-03-25",
    recipient: "Vendor Services LLC"
  },
  {
    id: "SCHD002",
    amount: 4200,
    currency: "EUR",
    status: "pending",
    type: "sepa",
    date: "2024-03-28",
    recipient: "European Distributor SA"
  }
];

export default function PaymentProcessorPage() {
  const [selectedTab, setSelectedTab] = useState("payments");
  const navigate = useNavigate();

  const handleActionClick = (path: string) => {
    navigate(path);
  };

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
              onClick={() => handleActionClick("/commercial/payment-processor/new-payment")}
            />
            <QuickActionCard
              title="Batch Payments"
              icon={List}
              description="Process multiple payments"
              onClick={() => handleActionClick("/commercial/payment-processor/batch")}
            />
            <QuickActionCard
              title="Payment Status"
              icon={FileSearch}
              description="Check payment status"
              onClick={() => handleActionClick("/commercial/payment-processor/status")}
            />
            <QuickActionCard
              title="Reconciliation"
              icon={RefreshCw}
              description="Reconcile payments"
              onClick={() => handleActionClick("/commercial/payment-processor/reconciliation")}
            />
          </div>

          {/* Main Content */}
          <Tabs defaultValue="payments" className="space-y-4">
            <TabsList>
              <TabsTrigger value="payments">Recent Payments</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
              <TabsTrigger value="recurring">Recurring</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="payments" className="space-y-4">
              <PaymentsList payments={recentPayments} />
            </TabsContent>

            <TabsContent value="scheduled">
              {scheduledPayments.length > 0 ? (
                <PaymentsList payments={scheduledPayments} />
              ) : (
                <EmptyTabContent
                  title="Scheduled Payments"
                  icon={Clock}
                  message="No scheduled payments found"
                />
              )}
            </TabsContent>

            <TabsContent value="recurring">
              <EmptyTabContent
                title="Recurring Payments"
                icon={RefreshCw}
                message="No recurring payments configured"
              />
            </TabsContent>

            <TabsContent value="reports">
              <EmptyTabContent
                title="Payment Reports"
                icon={FileCheck}
                message="No reports available"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}


import { Route } from "react-router-dom";
import PaymentProcessorPage from "@/pages/commercial/PaymentProcessor";
import RealtimePaymentsPage from "@/pages/commercial/payment-processor/Realtime";
import ACHProcessingPage from "@/pages/commercial/payment-processor/ACH";
import CrossBorderPage from "@/pages/commercial/payment-processor/CrossBorder";
import NewPaymentPage from "@/pages/commercial/payment-processor/NewPayment";
import BatchPaymentsPage from "@/pages/commercial/payment-processor/BatchPayments";
import PaymentStatusPage from "@/pages/commercial/payment-processor/Status";
import ReconciliationPage from "@/pages/commercial/payment-processor/Reconciliation";

export const PaymentProcessorRoutes = () => {
  return (
    <Route path="payment-processor">
      <Route path="" element={<PaymentProcessorPage />} />
      <Route path="real-time" element={<RealtimePaymentsPage />} />
      <Route path="ach" element={<ACHProcessingPage />} />
      <Route path="cross-border" element={<CrossBorderPage />} />
      <Route path="new-payment" element={<NewPaymentPage />} />
      <Route path="batch" element={<BatchPaymentsPage />} />
      <Route path="status" element={<PaymentStatusPage />} />
      <Route path="reconciliation" element={<ReconciliationPage />} />
    </Route>
  );
};

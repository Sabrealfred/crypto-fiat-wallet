
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

import { PaymentFormFields } from "./PaymentFormFields";
import { PaymentFormActions } from "./PaymentFormActions";
import { DomesticPaymentHeader, InternationalPaymentHeader } from "./PaymentFormHeader";
import { PaymentFormValues, paymentSchema } from "../schemas/paymentSchema";

interface PaymentFormProps {
  isInternational?: boolean;
  initialValues: Record<string, any>;
  onSubmitSuccess?: () => void;
}

export function PaymentForm({ 
  isInternational = false, 
  initialValues,
  onSubmitSuccess
}: PaymentFormProps) {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const navigate = useNavigate();
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: initialValues,
  });

  const onSubmit = (values: PaymentFormValues) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Payment submitted:", values);
      setIsSubmitting(false);
      toast.success("Payment initiated successfully");
      
      if (onSubmitSuccess) {
        onSubmitSuccess();
      } else {
        navigate("/commercial/payment-processor");
      }
    }, 1500);
  };

  return (
    <>
      {isInternational ? <InternationalPaymentHeader /> : <DomesticPaymentHeader />}
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <PaymentFormFields form={form} isInternational={isInternational} />
            <PaymentFormActions isSubmitting={isSubmitting} />
          </form>
        </Form>
      </CardContent>
    </>
  );
}

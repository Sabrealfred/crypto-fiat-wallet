
import React from "react";
import { Button } from "@/components/ui/button";
import { ChevronsRight, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface PaymentFormActionsProps {
  isSubmitting: boolean;
  cancelRoute?: string;
}

export function PaymentFormActions({ isSubmitting, cancelRoute = "/commercial/payment-processor" }: PaymentFormActionsProps) {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-end gap-3">
      <Button variant="outline" type="button" onClick={() => navigate(cancelRoute)}>
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting} className="gap-2">
        {isSubmitting ? (
          <>
            <RefreshCw className="h-4 w-4 animate-spin" />
            Processing
          </>
        ) : (
          <>
            <ChevronsRight className="h-4 w-4" />
            Initiate Payment
          </>
        )}
      </Button>
    </div>
  );
}


import * as z from "zod";

export const paymentSchema = z.object({
  paymentType: z.string(),
  amount: z.string().min(1, "Amount is required"),
  currency: z.string().min(1, "Currency is required"),
  destinationAccount: z.string().min(1, "Destination account is required"),
  destinationBank: z.string().min(1, "Destination bank is required"),
  reference: z.string().optional(),
  paymentDate: z.string().min(1, "Payment date is required"),
  swiftCode: z.string().optional(),
});

export const domesticInitialValues = {
  paymentType: "wire",
  amount: "",
  currency: "USD",
  destinationAccount: "",
  destinationBank: "",
  reference: "",
  paymentDate: new Date().toISOString().split('T')[0],
};

export const internationalInitialValues = {
  ...domesticInitialValues,
  paymentType: "swift",
  swiftCode: "",
};

export type PaymentFormValues = z.infer<typeof paymentSchema>;

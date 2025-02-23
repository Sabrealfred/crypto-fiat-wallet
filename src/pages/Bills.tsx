
import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

type BillPayment = {
  id: string;
  provider_name: string;
  service_type: string;
  amount: number;
  due_date: string;
  status: string;
  currency: string;
  account_number: string;
};

export default function BillsPage() {
  const [selectedProvider, setSelectedProvider] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [amount, setAmount] = useState("");

  const { data: billPayments } = useQuery({
    queryKey: ["billPayments"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("bill_payments")
        .select("*")
        .order("due_date", { ascending: true });

      if (error) throw error;
      return data as BillPayment[];
    }
  });

  const handlePayBill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from("bill_payments")
        .insert([
          {
            provider_name: selectedProvider,
            account_number: accountNumber,
            amount: Number(amount),
            service_type: "utility",
            currency: "USD"
          }
        ]);

      if (error) throw error;
      toast.success("Bill payment scheduled successfully");
      setSelectedProvider("");
      setAccountNumber("");
      setAmount("");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <AppLayout>
      <div className="p-4 sm:p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-semibold mb-2">Pay Bills</h1>
          <p className="text-sm sm:text-base text-muted-foreground">Manage and pay your utility bills</p>
        </div>

        <div className="grid md:grid-cols-[1fr,1fr] gap-6">
          <Card>
            <CardHeader>
              <CardTitle>New Payment</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePayBill} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Service Provider</label>
                  <Select value={selectedProvider} onValueChange={setSelectedProvider}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent className="min-w-[200px]">
                      <SelectItem value="electricity">Electricity Company</SelectItem>
                      <SelectItem value="water">Water Service</SelectItem>
                      <SelectItem value="gas">Gas Company</SelectItem>
                      <SelectItem value="internet">Internet Provider</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Account Number</label>
                  <Input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Enter account number"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Amount</label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>

                <Button type="submit" className="w-full">
                  Schedule Payment
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Bills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {billPayments?.map((bill) => (
                  <div
                    key={bill.id}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border gap-2"
                  >
                    <div>
                      <p className="font-medium">
                        ${Number(bill.amount).toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Account: {bill.account_number}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Due: {new Date(bill.due_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm capitalize">{bill.status}</span>
                    </div>
                  </div>
                ))}

                {billPayments?.length === 0 && (
                  <div className="text-center py-6 text-muted-foreground">
                    No bills yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

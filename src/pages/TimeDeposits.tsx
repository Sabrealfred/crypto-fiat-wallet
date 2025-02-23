
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

type TimeDeposit = {
  id: string;
  amount: number;
  currency: string;
  term_months: number;
  interest_rate: number;
  start_date: string;
  maturity_date: string;
  status: string;
};

export default function TimeDepositsPage() {
  const [amount, setAmount] = useState("");
  const [term, setTerm] = useState("");
  const [currency, setCurrency] = useState("USD");

  const { data: timeDeposits } = useQuery({
    queryKey: ["timeDeposits"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("time_deposits")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as TimeDeposit[];
    }
  });

  const calculateInterestRate = (termMonths: number) => {
    // Simple interest rate calculation based on term
    return 2 + (termMonths / 12);
  };

  const handleCreateDeposit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const termMonths = parseInt(term);
      const interestRate = calculateInterestRate(termMonths);
      const maturityDate = new Date();
      maturityDate.setMonth(maturityDate.getMonth() + termMonths);

      const { error } = await supabase
        .from("time_deposits")
        .insert([
          {
            amount: Number(amount),
            currency,
            term_months: termMonths,
            interest_rate: interestRate,
            maturity_date: maturityDate.toISOString(),
          }
        ]);

      if (error) throw error;
      toast.success("Time deposit created successfully");
      setAmount("");
      setTerm("");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Time Deposits</h1>
          <p className="text-muted-foreground">Earn interest with fixed-term deposits</p>
        </div>

        <div className="grid md:grid-cols-[1fr,1fr] gap-6">
          <Card>
            <CardHeader>
              <CardTitle>New Time Deposit</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateDeposit} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Amount</label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter deposit amount"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Term (months)</label>
                  <Select value={term} onValueChange={setTerm}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select term" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="3">3 months</SelectItem>
                      <SelectItem value="6">6 months</SelectItem>
                      <SelectItem value="12">12 months</SelectItem>
                      <SelectItem value="24">24 months</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Currency</label>
                  <Select value={currency} onValueChange={setCurrency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                      <SelectItem value="GBP">GBP - British Pound</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {term && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground">Interest Rate</p>
                    <p className="text-lg font-semibold">
                      {calculateInterestRate(parseInt(term))}% APR
                    </p>
                  </div>
                )}

                <Button type="submit" className="w-full">
                  Create Time Deposit
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Time Deposits</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {timeDeposits?.map((deposit) => (
                  <div
                    key={deposit.id}
                    className="flex items-center justify-between p-4 rounded-lg border"
                  >
                    <div>
                      <p className="font-medium">
                        {deposit.amount} {deposit.currency}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {deposit.term_months} months @ {deposit.interest_rate}%
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Matures: {new Date(deposit.maturity_date).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium capitalize">{deposit.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

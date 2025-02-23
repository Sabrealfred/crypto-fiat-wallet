
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

type ScheduledSaving = {
  id: string;
  name: string;
  amount_per_frequency: number;
  frequency: string;
  current_amount: number;
  target_amount: number;
  currency: string;
  start_date: string;
  end_date: string;
  status: string;
};

export default function SavingsPage() {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState("");
  const [target, setTarget] = useState("");
  const [currency, setCurrency] = useState("USD");

  const { data: scheduledSavings } = useQuery({
    queryKey: ["scheduledSavings"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("scheduled_savings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ScheduledSaving[];
    }
  });

  const handleCreateSavingsPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from("scheduled_savings")
        .insert([
          {
            name,
            amount_per_frequency: Number(amount),
            frequency,
            target_amount: Number(target),
            currency,
            current_amount: 0
          }
        ]);

      if (error) throw error;
      toast.success("Savings plan created successfully");
      setName("");
      setAmount("");
      setTarget("");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const calculateProgress = (current: number, target: number) => {
    return Math.min((current / target) * 100, 100);
  };

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Scheduled Savings</h1>
          <p className="text-muted-foreground">Set up automatic savings plans</p>
        </div>

        <div className="grid md:grid-cols-[1fr,1fr] gap-6">
          <Card>
            <CardHeader>
              <CardTitle>New Savings Plan</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateSavingsPlan} className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Plan Name</label>
                  <Input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Vacation Fund"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Amount per Period</label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Frequency</label>
                  <Select value={frequency} onValueChange={setFrequency}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="biweekly">Bi-weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Target Amount</label>
                  <Input
                    type="number"
                    value={target}
                    onChange={(e) => setTarget(e.target.value)}
                    placeholder="Enter target amount"
                  />
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

                <Button type="submit" className="w-full">
                  Create Savings Plan
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Savings Plans</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledSavings?.map((plan) => (
                  <div
                    key={plan.id}
                    className="p-4 rounded-lg border space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium">{plan.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {plan.amount_per_frequency} {plan.currency} {plan.frequency}
                        </p>
                      </div>
                      <p className="text-sm font-medium capitalize">{plan.status}</p>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span>{plan.current_amount} {plan.currency}</span>
                        <span>{plan.target_amount} {plan.currency}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all"
                          style={{
                            width: `${calculateProgress(plan.current_amount, plan.target_amount)}%`
                          }}
                        />
                      </div>
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


import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { TabsList, TabsTrigger, Tabs, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, Upload, FileCheck, AlertCircle, Check } from "lucide-react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";

export default function DepositsPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [checkNumber, setCheckNumber] = useState("");
  const [frontImage, setFrontImage] = useState<File | null>(null);
  const [backImage, setBackImage] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const { data: deposits, refetch: refetchDeposits } = useQuery({
    queryKey: ["check-deposits"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("check_deposits")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  const handleImageUpload = async (file: File, type: 'front' | 'back') => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error("No user found");

    const fileName = `${user.id}/${Date.now()}-${type}.${file.name.split('.').pop()}`;
    const { error: uploadError } = await supabase.storage
      .from("check-images")
      .upload(fileName, file);

    if (uploadError) throw uploadError;
    return fileName;
  };

  const depositMutation = useMutation({
    mutationFn: async () => {
      if (!frontImage || !backImage || !amount) {
        throw new Error("Please complete all required fields");
      }

      setIsUploading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      try {
        const frontImageUrl = await handleImageUpload(frontImage, 'front');
        const backImageUrl = await handleImageUpload(backImage, 'back');

        const { error } = await supabase.from("check_deposits").insert({
          user_id: user.id,
          amount: Number(amount),
          check_number: checkNumber,
          front_image_url: frontImageUrl,
          back_image_url: backImageUrl,
          currency: 'USD',
          status: 'pending'
        });

        if (error) throw error;

        // Reset form
        setAmount("");
        setCheckNumber("");
        setFrontImage(null);
        setBackImage(null);
        setCurrentStep(1);
        await refetchDeposits();

      } finally {
        setIsUploading(false);
      }
    },
    onSuccess: () => {
      toast.success("Check deposit submitted successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    }
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <Check className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      default:
        return <FileCheck className="h-5 w-5 text-yellow-500" />;
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Check Deposits</h1>
          <p className="text-muted-foreground">
            Deposit checks securely by taking photos of the front and back
          </p>
        </div>

        <div className="grid lg:grid-cols-[2fr,1fr] gap-6">
          <Card>
            <CardHeader>
              <CardTitle>New Deposit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Amount
                      </label>
                      <div className="relative">
                        <Input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="Enter check amount"
                          className="pl-8"
                        />
                        <span className="absolute left-3 top-3 text-muted-foreground">
                          $
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">
                        Check Number (Optional)
                      </label>
                      <Input
                        type="text"
                        value={checkNumber}
                        onChange={(e) => setCheckNumber(e.target.value)}
                        placeholder="Enter check number"
                      />
                    </div>
                    <Button 
                      onClick={() => setCurrentStep(2)} 
                      disabled={!amount}
                      className="w-full"
                    >
                      Continue
                    </Button>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Front of Check
                        </label>
                        <div className="border-2 border-dashed rounded-lg p-4 text-center">
                          <label className="cursor-pointer block">
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              capture="environment"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) setFrontImage(file);
                              }}
                            />
                            {frontImage ? (
                              <div className="relative">
                                <img
                                  src={URL.createObjectURL(frontImage)}
                                  alt="Front of check"
                                  className="max-h-48 mx-auto rounded"
                                />
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  className="absolute top-2 right-2"
                                  onClick={() => setFrontImage(null)}
                                >
                                  Change
                                </Button>
                              </div>
                            ) : (
                              <div className="py-4">
                                <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  Take photo of front
                                </span>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">
                          Back of Check
                        </label>
                        <div className="border-2 border-dashed rounded-lg p-4 text-center">
                          <label className="cursor-pointer block">
                            <input
                              type="file"
                              className="hidden"
                              accept="image/*"
                              capture="environment"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) setBackImage(file);
                              }}
                            />
                            {backImage ? (
                              <div className="relative">
                                <img
                                  src={URL.createObjectURL(backImage)}
                                  alt="Back of check"
                                  className="max-h-48 mx-auto rounded"
                                />
                                <Button
                                  variant="secondary"
                                  size="sm"
                                  className="absolute top-2 right-2"
                                  onClick={() => setBackImage(null)}
                                >
                                  Change
                                </Button>
                              </div>
                            ) : (
                              <div className="py-4">
                                <Camera className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">
                                  Take photo of back
                                </span>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        onClick={() => depositMutation.mutate()}
                        disabled={!frontImage || !backImage || isUploading}
                        className="flex-1"
                      >
                        {isUploading ? "Uploading..." : "Submit Deposit"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Deposits</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deposits?.map((deposit) => (
                    <div
                      key={deposit.id}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="space-y-1">
                        <div className="font-medium">
                          ${Number(deposit.amount).toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {new Date(deposit.created_at).toLocaleDateString()}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(deposit.status)}
                        <span className="text-sm capitalize">{deposit.status}</span>
                      </div>
                    </div>
                  ))}

                  {deposits?.length === 0 && (
                    <div className="text-center py-6 text-muted-foreground">
                      No deposits yet
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

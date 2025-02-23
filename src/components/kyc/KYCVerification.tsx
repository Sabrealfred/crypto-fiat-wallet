
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Shield, Upload, Check, AlertCircle, Clock } from "lucide-react";

interface KYCDocument {
  id: string;
  document_type: string;
  document_status: string;
  created_at: string;
}

export function KYCVerification() {
  const [isUploading, setIsUploading] = useState(false);

  const { data: documents, refetch: refetchDocuments } = useQuery({
    queryKey: ["kyc-documents"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("kyc_documents")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as KYCDocument[];
    },
  });

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) throw error;
      return data;
    },
  });

  const handleFileUpload = async (documentType: string, file: File) => {
    try {
      setIsUploading(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No user found");

      // Upload to KYC documents bucket
      const fileName = `${user.id}/${documentType}-${Date.now()}.${file.name.split('.').pop()}`;
      const { error: uploadError } = await supabase.storage
        .from("kyc-documents")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Create document record
      const { error: dbError } = await supabase
        .from("kyc_documents")
        .insert({
          user_id: user.id,
          document_type: documentType,
          document_url: fileName,
          document_status: "pending"
        });

      if (dbError) throw dbError;

      await refetchDocuments();
      toast.success("Document uploaded successfully");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <Check className="h-5 w-5 text-green-500" />;
      case "rejected":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "pending":
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const requiredDocuments = [
    {
      type: "id",
      name: "Government ID",
      description: "Upload a valid government-issued photo ID"
    },
    {
      type: "proof_of_address",
      name: "Proof of Address",
      description: "Recent utility bill or bank statement (last 3 months)"
    },
    {
      type: "selfie",
      name: "Selfie Verification",
      description: "Take a clear photo of yourself holding your ID"
    }
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <Shield className="h-8 w-8 text-primary" />
            <div>
              <CardTitle>Identity Verification</CardTitle>
              <p className="text-sm text-muted-foreground mt-1">
                Complete your KYC verification to unlock all features
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            {requiredDocuments.map((doc) => {
              const uploadedDoc = documents?.find(d => d.document_type === doc.type);
              return (
                <div
                  key={doc.type}
                  className="flex items-center justify-between p-4 rounded-lg border bg-card"
                >
                  <div className="space-y-1">
                    <h4 className="font-medium">{doc.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {doc.description}
                    </p>
                    {uploadedDoc && (
                      <div className="flex items-center gap-2 text-sm">
                        {getStatusIcon(uploadedDoc.document_status)}
                        <span className="capitalize">{uploadedDoc.document_status}</span>
                      </div>
                    )}
                  </div>
                  <label>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(doc.type, file);
                      }}
                      disabled={isUploading || uploadedDoc?.document_status === "approved"}
                    />
                    <Button
                      variant={uploadedDoc?.document_status === "approved" ? "secondary" : "default"}
                      disabled={isUploading || uploadedDoc?.document_status === "approved"}
                    >
                      {uploadedDoc?.document_status === "approved" ? (
                        <Check className="h-4 w-4 mr-2" />
                      ) : (
                        <Upload className="h-4 w-4 mr-2" />
                      )}
                      {uploadedDoc?.document_status === "approved"
                        ? "Verified"
                        : uploadedDoc?.document_status === "pending"
                        ? "Pending Review"
                        : "Upload"}
                    </Button>
                  </label>
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 p-4 rounded-lg bg-muted/50">
            <p className="text-sm text-muted-foreground">
              Your documents will be reviewed within 24-48 hours. You'll be notified once the verification is complete.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

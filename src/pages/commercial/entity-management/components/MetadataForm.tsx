
import { useState } from "react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Edit, Save, X } from "lucide-react";
import { useForm } from "react-hook-form";

interface MetadataFormProps {
  entityId: number;
  entityName: string;
}

export const MetadataForm = ({ entityId, entityName }: MetadataFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const metadataForm = useForm({
    defaultValues: {
      entityType: "Corporation",
      registrationNumber: "UK1234567",
      taxIdentifier: "GB987654321",
      incorporationDate: "2010-06-15",
      fiscalYearEnd: "12-31",
      industry: "Financial Services",
      naicsCode: "522110",
      sicCode: "6021",
      companyWebsite: "https://acme-global.example.com",
      registeredAddress: "123 Financial Street, London, UK",
      operatingAddress: "123 Financial Street, London, UK",
    }
  });

  const onSubmit = (data: any) => {
    console.log("Metadata updated:", data);
    setIsEditing(false);
  };

  return (
    <Card className="mb-6">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            Entity Metadata: {entityName}
          </CardTitle>
          {!isEditing ? (
            <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" /> Edit Metadata
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsEditing(false)}
              >
                <X className="h-4 w-4 mr-2" /> Cancel
              </Button>
              <Button 
                variant="default" 
                size="sm"
                onClick={metadataForm.handleSubmit(onSubmit)}
              >
                <Save className="h-4 w-4 mr-2" /> Save
              </Button>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <Form {...metadataForm}>
          <form onSubmit={metadataForm.handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={metadataForm.control}
                name="entityType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Entity Type</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={metadataForm.control}
                name="registrationNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Number</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={metadataForm.control}
                name="taxIdentifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Identifier</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={metadataForm.control}
                name="incorporationDate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Incorporation Date</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={metadataForm.control}
                name="fiscalYearEnd"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fiscal Year End</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={metadataForm.control}
                name="industry"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Industry</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={metadataForm.control}
                name="naicsCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>NAICS Code</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={metadataForm.control}
                name="sicCode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SIC Code</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={metadataForm.control}
                name="companyWebsite"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Company Website</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={metadataForm.control}
                name="registeredAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registered Address</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={metadataForm.control}
                name="operatingAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Operating Address</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly={!isEditing} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

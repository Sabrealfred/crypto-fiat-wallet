
import { useState } from "react";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Database, Edit, Save, X, Building2, Archive, ArchiveRestore, Link } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { IntegrationMetadataCard } from "./IntegrationMetadataCard";

// Define the field type for better organization
type MetadataField = {
  name: string;
  label: string;
  defaultValue: string;
  placeholder?: string;
};

// Group fields for better organization
const fieldGroups: Record<string, MetadataField[]> = {
  primary: [
    { name: "entityType", label: "Entity Type", defaultValue: "Corporation" },
    { name: "registrationNumber", label: "Registration Number", defaultValue: "UK1234567" },
    { name: "taxIdentifier", label: "Tax Identifier", defaultValue: "GB987654321" },
    { name: "incorporationDate", label: "Incorporation Date", defaultValue: "2010-06-15" },
  ],
  classification: [
    { name: "fiscalYearEnd", label: "Fiscal Year End", defaultValue: "12-31" },
    { name: "industry", label: "Industry", defaultValue: "Financial Services" },
    { name: "naicsCode", label: "NAICS Code", defaultValue: "522110" },
    { name: "sicCode", label: "SIC Code", defaultValue: "6021" },
  ],
  contact: [
    { name: "companyWebsite", label: "Company Website", defaultValue: "https://acme-global.example.com" },
    { name: "registeredAddress", label: "Registered Address", defaultValue: "123 Financial Street, London, UK" },
    { name: "operatingAddress", label: "Operating Address", defaultValue: "123 Financial Street, London, UK" },
  ],
};

// Mock data integrations
const mockIntegrations = [
  {
    type: "erp",
    system: "SAP ERP",
    status: "active" as const,
    lastSync: "2023-11-15 14:30:22",
    frequency: "Daily at midnight",
    syncCount: 128
  },
  {
    type: "banking",
    system: "Plaid API",
    status: "active" as const,
    lastSync: "2023-11-15 08:15:10",
    frequency: "Every 6 hours",
    syncCount: 245
  },
  {
    type: "accounting",
    system: "QuickBooks",
    status: "inactive" as const,
    lastSync: "2023-10-30 10:45:33",
    frequency: "Manual",
    syncCount: 56
  }
];

interface MetadataFormProps {
  entityId: number;
  entityName: string;
}

export const MetadataForm = ({ entityId, entityName }: MetadataFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  
  const metadataForm = useForm({
    defaultValues: Object.values(fieldGroups).reduce((acc, group) => {
      group.forEach(field => {
        acc[field.name] = field.defaultValue;
      });
      return acc;
    }, {} as Record<string, string>)
  });

  const onSubmit = (data: Record<string, string>) => {
    console.log("Metadata updated:", data);
    toast.success("Entity metadata updated successfully");
    setIsEditing(false);
  };

  const renderFormFields = (fields: MetadataField[]) => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {fields.map((field) => (
        <FormField
          key={field.name}
          control={metadataForm.control}
          name={field.name}
          render={({ field: formField }) => (
            <FormItem>
              <FormLabel>{field.label}</FormLabel>
              <FormControl>
                <Input 
                  {...formField} 
                  readOnly={!isEditing} 
                  placeholder={field.placeholder}
                  className={!isEditing ? "bg-muted" : ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );

  return (
    <div className="space-y-6">
      <Card className="mb-6 border border-blue-100 dark:border-blue-800">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg font-medium flex items-center gap-2">
              <Database className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              <div className="flex flex-col">
                <span>Entity Metadata</span>
                <span className="text-sm font-normal text-muted-foreground">{entityName}</span>
              </div>
            </CardTitle>
            {!isEditing ? (
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setIsEditing(true)}
                className="gap-2"
              >
                <Edit className="h-4 w-4" /> Edit Metadata
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setIsEditing(false)}
                  className="gap-2"
                >
                  <X className="h-4 w-4" /> Cancel
                </Button>
                <Button 
                  variant="default" 
                  size="sm"
                  onClick={metadataForm.handleSubmit(onSubmit)}
                  className="gap-2"
                >
                  <Save className="h-4 w-4" /> Save
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Form {...metadataForm}>
            <form onSubmit={metadataForm.handleSubmit(onSubmit)} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-blue-600" />
                    Primary Information
                  </h3>
                  {renderFormFields(fieldGroups.primary)}
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <Archive className="h-4 w-4 text-blue-600" />
                    Classification
                  </h3>
                  {renderFormFields(fieldGroups.classification)}
                </div>
                
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                    <ArchiveRestore className="h-4 w-4 text-blue-600" />
                    Contact Information
                  </h3>
                  {renderFormFields(fieldGroups.contact)}
                </div>
              </div>
              
              {isEditing && (
                <div className="flex justify-end">
                  <Button 
                    type="submit"
                    className="gap-2"
                  >
                    <Save className="h-4 w-4" /> Save All Changes
                  </Button>
                </div>
              )}
            </form>
          </Form>
        </CardContent>
      </Card>

      <IntegrationMetadataCard integrations={mockIntegrations} />
    </div>
  );
};

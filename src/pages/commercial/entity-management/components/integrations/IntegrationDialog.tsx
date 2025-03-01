
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Integration, IntegrationFormData } from "./types";

interface IntegrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: IntegrationFormData) => void;
  integration?: Integration;
}

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  type: z.enum(["erp", "banking", "accounting", "custom", "other"]),
  connectionDetails: z.object({
    url: z.string().url("Must be a valid URL"),
    username: z.string().min(1, "Username is required"),
    authMethod: z.enum(["api_key", "oauth", "basic", "custom"]),
    apiKey: z.string().optional(),
    customFields: z.record(z.string()).optional(),
  }),
});

export const IntegrationDialog = ({ 
  open, 
  onOpenChange, 
  onSave, 
  integration 
}: IntegrationDialogProps) => {
  const form = useForm<IntegrationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: integration ? {
      name: integration.name,
      type: integration.type,
      connectionDetails: {
        url: integration.connectionDetails.url || "",
        username: integration.connectionDetails.username || "",
        authMethod: integration.connectionDetails.authMethod,
        apiKey: integration.apiKey,
        customFields: integration.connectionDetails.customFields,
      },
    } : {
      name: "",
      type: "erp",
      connectionDetails: {
        url: "",
        username: "",
        authMethod: "api_key",
        apiKey: "",
        customFields: {},
      },
    },
  });

  const handleSubmit = (data: IntegrationFormData) => {
    onSave(data);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {integration ? "Edit Integration" : "Add New Integration"}
          </DialogTitle>
          <DialogDescription>
            {integration
              ? "Update the integration details for this entity."
              : "Configure a new external system integration for this entity."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Integration Name</FormLabel>
                  <FormControl>
                    <Input placeholder="ERP System" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Integration Type</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select integration type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="erp">ERP System</SelectItem>
                      <SelectItem value="banking">Banking API</SelectItem>
                      <SelectItem value="accounting">Accounting Software</SelectItem>
                      <SelectItem value="custom">Custom Integration</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="connectionDetails.url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>API URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://api.example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="connectionDetails.username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username/Client ID</FormLabel>
                  <FormControl>
                    <Input placeholder="username or client_id" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="connectionDetails.authMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Authentication Method</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select auth method" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="api_key">API Key</SelectItem>
                      <SelectItem value="oauth">OAuth 2.0</SelectItem>
                      <SelectItem value="basic">Basic Auth</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("connectionDetails.authMethod") === "api_key" && (
              <FormField
                control={form.control}
                name="connectionDetails.apiKey"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>API Key</FormLabel>
                    <FormControl>
                      <Input type="password" placeholder="Your API key" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <DialogFooter>
              <Button type="submit">Save Integration</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

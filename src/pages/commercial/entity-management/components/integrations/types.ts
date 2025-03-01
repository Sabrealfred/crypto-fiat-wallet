
export interface Integration {
  id: string;
  name: string;
  type: "erp" | "banking" | "accounting" | "custom" | "other";
  status: "active" | "inactive" | "pending" | "error";
  lastSync: string;
  apiKey?: string;
  connectionDetails: {
    url?: string;
    username?: string;
    authMethod: "api_key" | "oauth" | "basic" | "custom";
    customFields?: Record<string, string>;
  };
}

export interface IntegrationFormData {
  name: string;
  type: "erp" | "banking" | "accounting" | "custom" | "other";
  connectionDetails: {
    url: string;
    username: string;
    authMethod: "api_key" | "oauth" | "basic" | "custom";
    apiKey?: string;
    customFields?: Record<string, string>;
  };
}

export interface EntityIntegrationsProps {
  entityId: number;
  entityName: string;
}

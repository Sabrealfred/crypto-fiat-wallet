
export interface BusinessRule {
  id: string;
  module_name: string;
  rule_code: string;
  rule_name: string;
  description?: string;
  conditions: Record<string, any>;
  actions: Record<string, any>;
  parameters: Record<string, any>;
  is_active: boolean;
  priority: number;
  created_at: string;
  updated_at: string;
}

export interface SystemModule {
  id: string;
  module_code: string;
  name: string;
  description?: string;
  category: string;
  is_active: boolean;
  settings: Record<string, any>;
  dependencies: string[];
  created_at: string;
  updated_at: string;
}

export interface ImplementationProgress {
  id: string;
  module_id: string;
  phase: string;
  status: string;
  progress_percentage: number;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export type ModuleCategory = 
  | "personal_banking"
  | "business_banking"
  | "commercial_banking"
  | "private_banking"
  | "broker"
  | "admin";

export type ModulePhase = 
  | "planning"
  | "development"
  | "testing"
  | "deployed";

export type ModuleStatus = 
  | "not_started"
  | "in_progress"
  | "completed"
  | "on_hold"
  | "cancelled";

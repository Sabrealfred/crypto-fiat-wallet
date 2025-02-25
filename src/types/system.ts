
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
  category: ModuleCategory;
  is_active: boolean;
  settings: Record<string, any>;
  dependencies: string[];
  features: ModuleFeature[];
  permissions: ModulePermission[];
  created_at: string;
  updated_at: string;
}

export interface ModuleFeature {
  id: string;
  name: string;
  description: string;
  status: FeatureStatus;
  priority: number;
  dependencies?: string[];
}

export interface ModulePermission {
  id: string;
  name: string;
  description: string;
  roles: string[];
  actions: string[];
}

export interface ImplementationProgress {
  id: string;
  module_id: string;
  phase: ModulePhase;
  status: ModuleStatus;
  progress_percentage: number;
  milestones: ImplementationMilestone[];
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface ImplementationMilestone {
  id: string;
  title: string;
  description: string;
  due_date: string;
  completed: boolean;
  dependencies?: string[];
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

export type FeatureStatus =
  | "planned"
  | "in_development"
  | "ready"
  | "deprecated";

export interface CommercialModuleConfig {
  invoicing: {
    enabled: boolean;
    templates: InvoiceTemplate[];
    workflows: WorkflowConfig[];
  };
  expenses: {
    enabled: boolean;
    categories: ExpenseCategory[];
    approvalLevels: ApprovalLevel[];
  };
  payroll: {
    enabled: boolean;
    cycles: PayrollCycle[];
    taxRules: TaxRule[];
  };
}

export interface InvoiceTemplate {
  id: string;
  name: string;
  description: string;
  fields: TemplateField[];
  isDefault: boolean;
}

export interface WorkflowConfig {
  id: string;
  name: string;
  steps: WorkflowStep[];
  conditions: Record<string, any>;
}

export interface ExpenseCategory {
  id: string;
  name: string;
  description: string;
  budget?: number;
  parent_id?: string;
}

export interface ApprovalLevel {
  id: string;
  name: string;
  threshold: number;
  approvers: string[];
}

export interface PayrollCycle {
  id: string;
  name: string;
  frequency: "weekly" | "biweekly" | "monthly";
  startDay: number;
  cutoffDay: number;
}

export interface TaxRule {
  id: string;
  name: string;
  country: string;
  rate: number;
  conditions: Record<string, any>;
}

export interface TemplateField {
  id: string;
  name: string;
  type: "text" | "number" | "date" | "select";
  required: boolean;
  default?: any;
  options?: string[];
}

export interface WorkflowStep {
  id: string;
  name: string;
  type: "approval" | "notification" | "action";
  assignee?: string[];
  timeout?: number;
  actions: Record<string, any>;
}


export interface Insight {
  id: string;
  title: string;
  description: string;
  type: "positive" | "negative" | "neutral";
  relevanceScore: number;
  generatedDate: string;
}

export interface Report {
  id: string;
  title: string;
  description: string;
  generatedDate: string;
  status: "complete" | "pending" | "error";
}

export interface Model {
  id: string;
  name: string;
  type: string;
  accuracy: number;
  status: "active" | "inactive";
}

export interface AIInsightsPanelProps {
  entityId: number;
  entityName: string;
}


import React from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

interface EmptyStateProps {
  onAddIntegration: () => void;
}

export const EmptyState = ({ onAddIntegration }: EmptyStateProps) => {
  return (
    <div className="border border-dashed rounded-lg p-8 text-center">
      <div className="flex flex-col items-center">
        <svg
          className="mb-4 h-12 w-12 text-gray-400 dark:text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"
          />
        </svg>
        <h3 className="mb-2 text-lg font-medium">No integrations configured</h3>
        <p className="mb-6 text-sm text-muted-foreground max-w-md">
          Connect this entity to external systems like ERP, banking APIs, accounting
          software, and more to automate data flow.
        </p>
        <Button onClick={onAddIntegration}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Integration
        </Button>
      </div>
    </div>
  );
};

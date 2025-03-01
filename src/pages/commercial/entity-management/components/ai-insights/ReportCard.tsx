
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { Report } from "./types";

interface ReportCardProps {
  report: Report;
}

export const ReportCard = ({ report }: ReportCardProps) => {
  return (
    <div key={report.id} className="p-4 border rounded-lg">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium">{report.title}</h3>
          <p className="text-sm text-muted-foreground">{report.description}</p>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="secondary">
              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
            </Badge>
            <span className="text-xs text-muted-foreground">
              Generated on {report.generatedDate}
            </span>
          </div>
        </div>
        <Button variant="ghost">
          <ArrowUpRight className="h-4 w-4 mr-2" />
          View Report
        </Button>
      </div>
    </div>
  );
};


import React from "react";
import { Button } from "@/components/ui/button";
import { Calendar, RefreshCw } from "lucide-react";
import { Report } from "./types";
import { ReportCard } from "./ReportCard";

interface ReportsTabProps {
  reports: Report[];
  entityName: string;
  isGeneratingReport: boolean;
  handleGenerateReport: () => void;
}

export const ReportsTab = ({ 
  reports, 
  entityName, 
  isGeneratingReport, 
  handleGenerateReport 
}: ReportsTabProps) => {
  return (
    <>
      <div className="flex justify-end">
        <Button onClick={handleGenerateReport} disabled={isGeneratingReport}>
          {isGeneratingReport ? (
            <>
              <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Calendar className="mr-2 h-4 w-4" />
              Generate New Report
            </>
          )}
        </Button>
      </div>
      {reports.length === 0 ? (
        <div className="p-8 text-center border border-dashed rounded-lg">
          <Calendar className="h-10 w-10 mx-auto mb-4 text-muted-foreground/60" />
          <h3 className="text-lg font-medium mb-2">No reports generated</h3>
          <p className="text-muted-foreground mb-4">
            Generate AI-driven reports for in-depth analysis of {entityName}.
          </p>
          <Button onClick={handleGenerateReport} disabled={isGeneratingReport}>
            {isGeneratingReport ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Calendar className="mr-2 h-4 w-4" />
                Generate New Report
              </>
            )}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {reports.map((report) => (
            <ReportCard key={report.id} report={report} />
          ))}
        </div>
      )}
    </>
  );
};

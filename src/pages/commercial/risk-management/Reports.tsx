
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  FileText, 
  Download, 
  Search, 
  Calendar, 
  Filter, 
  RefreshCw,
  BarChart,
  PieChart,
  FileDown,
  Clock
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function RiskReportsPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("available");

  const handleGenerateReport = (reportType: string) => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      toast.success(`${reportType} report generated successfully`);
    }, 2000);
  };

  // Sample report data
  const availableReports = [
    {
      id: "RR-001",
      name: "Market Risk Summary",
      type: "Weekly",
      date: "2024-04-25",
      description: "Weekly summary of market risk exposures and limit utilizations.",
      format: "PDF"
    },
    {
      id: "RR-002",
      name: "Credit Risk Analysis",
      type: "Monthly",
      date: "2024-04-01",
      description: "Monthly analysis of credit risk exposures by counterparty and industry.",
      format: "Excel"
    },
    {
      id: "RR-003",
      name: "Liquidity Risk Dashboard",
      type: "Daily",
      date: "2024-04-28",
      description: "Daily monitoring of liquidity metrics and cash flow projections.",
      format: "PDF"
    },
    {
      id: "RR-004",
      name: "Operational Risk Incidents",
      type: "Monthly",
      date: "2024-04-01",
      description: "Monthly summary of operational risk incidents and resolution status.",
      format: "PDF"
    },
    {
      id: "RR-005",
      name: "Regulatory Compliance Status",
      type: "Quarterly",
      date: "2024-04-01",
      description: "Quarterly review of regulatory compliance status and issues.",
      format: "Excel"
    }
  ];

  const scheduledReports = [
    {
      id: "SR-001",
      name: "VaR Analysis",
      frequency: "Daily",
      nextRun: "2024-04-29 08:00",
      recipients: "Risk Management Team",
      format: "PDF"
    },
    {
      id: "SR-002",
      name: "Monthly Risk Committee Report",
      frequency: "Monthly",
      nextRun: "2024-05-01 09:00",
      recipients: "Risk Committee",
      format: "PDF"
    },
    {
      id: "SR-003",
      name: "Counterparty Exposure Report",
      frequency: "Weekly",
      nextRun: "2024-05-02 10:00",
      recipients: "Credit Risk Team",
      format: "Excel"
    },
    {
      id: "SR-004",
      name: "Board Risk Summary",
      frequency: "Quarterly",
      nextRun: "2024-06-30 15:00",
      recipients: "Board of Directors",
      format: "PDF"
    }
  ];

  // Filter reports based on search term
  const filteredAvailableReports = availableReports.filter(
    report => 
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      report.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredScheduledReports = scheduledReports.filter(
    report => 
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      report.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="Risk Reports" 
          description="Generate and access comprehensive risk assessment reports"
          showBack={true}
        />

        <Card className="mb-6 border-blue-100 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Generate New Report
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="border-blue-50 dark:border-blue-900/50">
                <CardContent className="p-4">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40 self-start">
                      <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-medium mb-2">Market Risk Report</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      Comprehensive analysis of market risk exposures and trends.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleGenerateReport("Market Risk")}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <FileDown className="h-4 w-4 mr-2" />
                          Generate
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-50 dark:border-blue-900/50">
                <CardContent className="p-4">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40 self-start">
                      <PieChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-medium mb-2">Credit Risk Report</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      Analysis of credit exposures by counterparty and industry.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleGenerateReport("Credit Risk")}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <FileDown className="h-4 w-4 mr-2" />
                          Generate
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-50 dark:border-blue-900/50">
                <CardContent className="p-4">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40 self-start">
                      <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-medium mb-2">Operational Risk Report</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      Summary of operational risk incidents and their resolution.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleGenerateReport("Operational Risk")}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <FileDown className="h-4 w-4 mr-2" />
                          Generate
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-50 dark:border-blue-900/50">
                <CardContent className="p-4">
                  <div className="flex flex-col h-full">
                    <div className="mb-4 p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40 self-start">
                      <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="font-medium mb-2">Custom Risk Report</h3>
                    <p className="text-sm text-muted-foreground mb-4 flex-grow">
                      Generate a custom report with selected risk metrics.
                    </p>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="w-full"
                      onClick={() => handleGenerateReport("Custom Risk")}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <>
                          <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <FileDown className="h-4 w-4 mr-2" />
                          Generate
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <div className="flex items-center justify-between mb-4">
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search reports..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-2 ml-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Date Range
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <Tabs 
          defaultValue="available" 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mb-6"
        >
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="available">Available Reports</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
          </TabsList>
          
          <TabsContent value="available" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">ID</th>
                        <th className="text-left py-3 px-4 font-medium">Report Name</th>
                        <th className="text-left py-3 px-4 font-medium">Type</th>
                        <th className="text-left py-3 px-4 font-medium">Date</th>
                        <th className="text-left py-3 px-4 font-medium">Description</th>
                        <th className="text-left py-3 px-4 font-medium">Format</th>
                        <th className="text-left py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredAvailableReports.length > 0 ? (
                        filteredAvailableReports.map((report) => (
                          <tr key={report.id} className="border-b">
                            <td className="py-3 px-4">{report.id}</td>
                            <td className="py-3 px-4 font-medium">{report.name}</td>
                            <td className="py-3 px-4">{report.type}</td>
                            <td className="py-3 px-4">{report.date}</td>
                            <td className="py-3 px-4 max-w-xs truncate">{report.description}</td>
                            <td className="py-3 px-4">{report.format}</td>
                            <td className="py-3 px-4">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download</span>
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="py-6 text-center text-muted-foreground">
                            No reports found matching your search criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="scheduled" className="mt-4">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">ID</th>
                        <th className="text-left py-3 px-4 font-medium">Report Name</th>
                        <th className="text-left py-3 px-4 font-medium">Frequency</th>
                        <th className="text-left py-3 px-4 font-medium">Next Run</th>
                        <th className="text-left py-3 px-4 font-medium">Recipients</th>
                        <th className="text-left py-3 px-4 font-medium">Format</th>
                        <th className="text-left py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredScheduledReports.length > 0 ? (
                        filteredScheduledReports.map((report) => (
                          <tr key={report.id} className="border-b">
                            <td className="py-3 px-4">{report.id}</td>
                            <td className="py-3 px-4 font-medium">{report.name}</td>
                            <td className="py-3 px-4">{report.frequency}</td>
                            <td className="py-3 px-4 flex items-center gap-1">
                              <Clock className="h-3 w-3 text-blue-500" />
                              {report.nextRun}
                            </td>
                            <td className="py-3 px-4">{report.recipients}</td>
                            <td className="py-3 px-4">{report.format}</td>
                            <td className="py-3 px-4 flex gap-1">
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Clock className="h-4 w-4" />
                                <span className="sr-only">Edit Schedule</span>
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                <Download className="h-4 w-4" />
                                <span className="sr-only">Download Last Report</span>
                              </Button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="py-6 text-center text-muted-foreground">
                            No scheduled reports found matching your search criteria.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

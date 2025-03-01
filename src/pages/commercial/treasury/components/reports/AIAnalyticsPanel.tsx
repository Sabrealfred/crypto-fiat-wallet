
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BrainCircuit, 
  TrendingUp, 
  Brain, 
  AlertTriangle, 
  Zap 
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ForecastPanel } from "./ai-analytics/ForecastPanel";
import { RiskCorrelationPanel } from "./ai-analytics/RiskCorrelationPanel";
import { AnomalyDetectionPanel } from "./ai-analytics/AnomalyDetectionPanel";

interface AIAnalyticsPanelProps {
  forecastData: any[];
  riskCorrelationData: any[];
  anomalyDetectionData: any[];
  riskRadarData: any[];
  formatCurrency: (value: number | string) => string;
}

export const AIAnalyticsPanel: React.FC<AIAnalyticsPanelProps> = ({ 
  forecastData,
  riskCorrelationData,
  anomalyDetectionData,
  riskRadarData,
  formatCurrency
}) => {
  const [predictionView, setPredictionView] = useState("forecast");

  const handleGenerateAIInsights = () => {
    toast.success("AI insights generated successfully");
  };

  return (
    <Card className="border-blue-100 dark:border-blue-800">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-blue-600" />
              AI-Powered Predictive Analysis
            </CardTitle>
            <CardDescription>Machine learning forecasts and anomaly detection</CardDescription>
          </div>
          <div className="flex mt-2 md:mt-0">
            <Button 
              onClick={handleGenerateAIInsights}
              variant="default" 
              size="sm"
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Zap className="h-4 w-4" />
              Generate AI Insights
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="forecast" className="w-full" onValueChange={setPredictionView}>
          <TabsList className="mb-4 w-full justify-start">
            <TabsTrigger value="forecast" className="gap-1">
              <TrendingUp className="h-4 w-4" />
              Financial Forecasting
            </TabsTrigger>
            <TabsTrigger value="risk" className="gap-1">
              <Brain className="h-4 w-4" />
              Risk Correlation
            </TabsTrigger>
            <TabsTrigger value="anomaly" className="gap-1">
              <AlertTriangle className="h-4 w-4" />
              Anomaly Detection
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="forecast">
            <ForecastPanel 
              forecastData={forecastData} 
              formatCurrency={formatCurrency} 
            />
          </TabsContent>
          
          <TabsContent value="risk">
            <RiskCorrelationPanel riskCorrelationData={riskCorrelationData} />
          </TabsContent>
          
          <TabsContent value="anomaly">
            <AnomalyDetectionPanel anomalyDetectionData={anomalyDetectionData} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};


import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Legend, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Brain, BrainCircuit } from "lucide-react";

interface RiskAssessmentDashboardProps {
  riskRadarData: any[];
}

export const RiskAssessmentDashboard: React.FC<RiskAssessmentDashboardProps> = ({ riskRadarData }) => {
  return (
    <Card className="border-blue-100 dark:border-blue-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5 text-blue-600" />
          Risk Assessment Dashboard
        </CardTitle>
        <CardDescription>
          Comprehensive risk profile analysis with industry benchmarking
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart outerRadius={130} data={riskRadarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar 
                  name="Your Organization" 
                  dataKey="current" 
                  stroke="#8884d8" 
                  fill="#8884d8" 
                  fillOpacity={0.6} 
                />
                <Radar 
                  name="Industry Average" 
                  dataKey="industry" 
                  stroke="#82ca9d" 
                  fill="#82ca9d" 
                  fillOpacity={0.6} 
                />
                <Legend />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <div>
            <div className="space-y-4">
              <Card className="border-blue-50 dark:border-blue-900">
                <CardContent className="p-4">
                  <h3 className="font-medium mb-2">Key Risk Indicators</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Market Risk (VaR)</span>
                        <span className="font-medium text-amber-600">Medium-High</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: "80%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Credit Risk</span>
                        <span className="font-medium text-amber-600">Medium</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Liquidity Risk</span>
                        <span className="font-medium text-green-600">Medium-Low</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "45%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Operational Risk</span>
                        <span className="font-medium text-green-600">Low</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: "30%" }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Compliance Risk</span>
                        <span className="font-medium text-amber-600">Medium-High</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div className="bg-amber-500 h-2 rounded-full" style={{ width: "70%" }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="p-3 bg-blue-50 dark:bg-blue-950 rounded-lg">
                <p className="text-sm flex items-start gap-2">
                  <BrainCircuit className="h-5 w-5 text-blue-600 mt-0.5" />
                  <span>
                    <strong>AI Risk Analysis:</strong> Your organization shows elevated market risk compared to industry averages. 
                    Consider diversifying your investment portfolio to reduce concentration risk. 
                    Your operational risk management is exemplary, showing best-in-class controls.
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

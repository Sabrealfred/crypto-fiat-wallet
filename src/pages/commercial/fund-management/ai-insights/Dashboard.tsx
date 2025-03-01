
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import {
  Brain,
  ChartPie,
  TrendingUp,
  Zap,
  BarChart,
  Lightbulb,
  LineChart,
  AlarmClock,
  BookOpen
} from "lucide-react";

export default function AIInsightsDashboard() {
  const navigate = useNavigate();
  
  const insightCategories = [
    {
      title: "Market Trend Analysis",
      icon: TrendingUp,
      description: "AI-powered market trend detection and forecasting",
      path: "/commercial/fund-management/ai-insights/nlp"
    },
    {
      title: "Portfolio Recommendations",
      icon: ChartPie,
      description: "Smart portfolio allocation and rebalancing suggestions",
      path: "/commercial/fund-management/ai-insights/recommendations"
    },
    {
      title: "Cash Flow Predictions",
      icon: Zap,
      description: "Predictive analysis of future cash positions",
      path: "/commercial/fund-management/ai-insights/cash"
    },
    {
      title: "Risk Assessment",
      icon: BarChart,
      description: "Advanced risk modeling and scenario analysis",
      path: "/commercial/analytics"
    }
  ];

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="AI Insights Dashboard"
          description="Advanced analytics and AI-powered insights for financial decision making"
          showBack={true}
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {insightCategories.map((category) => (
            <Card 
              key={category.title}
              className="cursor-pointer hover:bg-accent transition-colors"
              onClick={() => navigate(category.path)}
            >
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-primary/10 rounded-full mb-4">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium mb-2">{category.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-5 w-5 text-primary" />
              AI Assistant Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-yellow-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Market Volatility Alert</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Our AI has detected increased volatility in emerging markets. Consider reviewing your exposure in these regions.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                <div className="flex items-start gap-3">
                  <LineChart className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Investment Opportunity</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      Based on recent market trends, AI suggests increasing allocation to renewable energy sector by 3-5%.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/10">
                <div className="flex items-start gap-3">
                  <AlarmClock className="h-5 w-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium">Cash Flow Optimization</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      AI analysis suggests restructuring payment schedules to improve liquidity by approximately 8% next quarter.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="trending">
          <TabsList className="mb-4">
            <TabsTrigger value="trending">Trending Analysis</TabsTrigger>
            <TabsTrigger value="portfolios">Portfolio Insights</TabsTrigger>
            <TabsTrigger value="scenarios">Scenario Analysis</TabsTrigger>
          </TabsList>
          
          <TabsContent value="trending">
            <Card>
              <CardHeader>
                <CardTitle>Market Trends Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center">
                    <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">AI Trend Analysis</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mt-2">
                      Our AI constantly analyzes market data to identify emerging trends and opportunities.
                    </p>
                    <Button className="mt-4" onClick={() => navigate("/commercial/fund-management/ai-insights/nlp")}>
                      View Detailed Analysis
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="portfolios">
            <Card>
              <CardHeader>
                <CardTitle>AI Portfolio Recommendations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center">
                    <ChartPie className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Portfolio Optimization</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mt-2">
                      AI-driven recommendations to optimize your portfolio based on your risk preferences and market conditions.
                    </p>
                    <Button className="mt-4" onClick={() => navigate("/commercial/fund-management/ai-insights/recommendations")}>
                      View Recommendations
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="scenarios">
            <Card>
              <CardHeader>
                <CardTitle>What-If Scenario Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80 flex items-center justify-center">
                  <div className="text-center">
                    <Brain className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Scenario Simulations</h3>
                    <p className="text-muted-foreground max-w-md mx-auto mt-2">
                      Run AI-powered simulations to understand how different market scenarios might impact your investments.
                    </p>
                    <Button className="mt-4" onClick={() => navigate("/commercial/fund-management/ai-insights/cash")}>
                      Run Scenario Analysis
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

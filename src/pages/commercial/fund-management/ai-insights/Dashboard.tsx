
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import { 
  BarChart3, 
  BookOpen, 
  BrainCircuit, 
  Lightbulb, 
  LineChart as LineChartIcon, 
  Newspaper, 
  PieChart, 
  RefreshCw, 
  RotateCw, 
  TrendingUp,
  Download,
  ArrowUpRight,
  ArrowDownRight,
  MessageSquareText
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

// Sample data for charts
const marketTrendsData = [
  { name: 'Jan', market: 4000, prediction: 4100 },
  { name: 'Feb', market: 3000, prediction: 3200 },
  { name: 'Mar', market: 2000, prediction: 1900 },
  { name: 'Apr', market: 2780, prediction: 2750 },
  { name: 'May', market: 1890, prediction: 2100 },
  { name: 'Jun', market: 2390, prediction: 2450 },
  { name: 'Jul', market: 3490, prediction: 3400 },
];

const sentimentData = [
  { name: 'Tech', positive: 65, negative: 35 },
  { name: 'Finance', positive: 45, negative: 55 },
  { name: 'Energy', positive: 30, negative: 70 },
  { name: 'Healthcare', positive: 80, negative: 20 },
  { name: 'Consumer', positive: 50, negative: 50 },
];

const riskAnalysisData = [
  { category: 'Market Risk', score: 75, threshold: 70 },
  { category: 'Credit Risk', score: 45, threshold: 60 },
  { category: 'Operational', score: 30, threshold: 50 },
  { category: 'Liquidity', score: 60, threshold: 65 },
  { category: 'Legal', score: 40, threshold: 55 },
];

export default function AIInsightsDashboardPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("AI insights refreshed successfully");
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader
          title="AI Insights Dashboard"
          description="AI-powered analysis of your financial data"
          showBack={true}
        />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Financial Intelligence</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh Insights
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Insights Summary */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Market Sentiment</p>
                  <h3 className="text-2xl font-bold mt-2">Bullish</h3>
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +5.2% confidence
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Risk Assessment</p>
                  <h3 className="text-2xl font-bold mt-2">Moderate</h3>
                  <p className="text-sm text-red-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +2.1% from last week
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <PieChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Cash Flow Forecast</p>
                  <h3 className="text-2xl font-bold mt-2">+8.3%</h3>
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    Better than expected
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <LineChartIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Investment Opportunities</p>
                  <h3 className="text-2xl font-bold mt-2">12</h3>
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    New recommendations
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="market">Market Analysis</TabsTrigger>
            <TabsTrigger value="nlp">NLP Insights</TabsTrigger>
            <TabsTrigger value="risk">Risk Analysis</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2">
                    <BrainCircuit className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    AI-Generated Market Summary
                  </CardTitle>
                  <Badge variant="outline" className="bg-blue-50 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                    Updated 2 hours ago
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    Our AI analysis indicates a positive outlook for the next quarter with moderate 
                    volatility expected in key sectors. Technology and healthcare continue to show 
                    strong fundamentals, while financial services are experiencing headwinds due to 
                    regulatory pressure.
                  </p>
                  <p>
                    Key findings from our algorithmic analysis:
                  </p>
                  <ul className="list-disc pl-6 space-y-1 mt-2">
                    <li>Market sentiment has improved by 5.2% compared to last month</li>
                    <li>Liquidity conditions remain favorable across major markets</li>
                    <li>Earnings forecasts have been revised upward for 62% of companies in your portfolio</li>
                    <li>Emerging risks identified in supply chain disruptions affecting manufacturing sector</li>
                  </ul>
                  <p className="mt-4">
                    <strong>AI Recommendation:</strong> Consider rebalancing your portfolio with a 5% 
                    increase in healthcare sector allocation and reducing exposure to financial services 
                    by a similar amount.
                  </p>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChartIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Market Trends & Predictions
                  </CardTitle>
                  <CardDescription>
                    AI-predicted market movements vs. actual performance
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={marketTrendsData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="market" 
                          stroke="#3b82f6" 
                          name="Actual Market" 
                          strokeWidth={2}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="prediction" 
                          stroke="#10b981" 
                          name="AI Prediction" 
                          strokeWidth={2}
                          strokeDasharray="5 5" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Newspaper className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    News Sentiment Analysis
                  </CardTitle>
                  <CardDescription>
                    AI analysis of news sentiment across key sectors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={sentimentData}
                        layout="vertical"
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" domain={[0, 100]} />
                        <YAxis dataKey="name" type="category" />
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                        <Bar dataKey="positive" name="Positive Sentiment" stackId="a" fill="#10b981" />
                        <Bar dataKey="negative" name="Negative Sentiment" stackId="a" fill="#ef4444" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Recent AI Discoveries</CardTitle>
                <CardDescription>
                  Important insights identified by our AI systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Potential Liquidity Issues at Major Bank",
                      description: "Our NLP system has detected unusual patterns in quarterly reports from FirstBank indicating potential liquidity concerns.",
                      source: "Quarterly filings analysis",
                      confidence: "72%",
                      impact: "High",
                      date: "1 day ago"
                    },
                    {
                      title: "Semiconductor Supply Chain Improvement",
                      description: "Analysis of logistics data shows significant improvement in semiconductor supply chains that will benefit tech manufacturers.",
                      source: "Supply chain data",
                      confidence: "89%",
                      impact: "Medium",
                      date: "3 days ago"
                    },
                    {
                      title: "Healthcare Policy Shift",
                      description: "AI detected early signals of regulatory change in healthcare reimbursement models based on legislative discussions.",
                      source: "Legislative text analysis",
                      confidence: "65%",
                      impact: "Medium",
                      date: "5 days ago"
                    },
                    {
                      title: "Consumer Spending Trend Change",
                      description: "Pattern analysis indicates shift in consumer spending from discretionary to essential goods starting to emerge.",
                      source: "Transaction data analysis",
                      confidence: "83%",
                      impact: "High",
                      date: "1 week ago"
                    }
                  ].map((insight, i) => (
                    <Card key={i} className="border border-blue-50 dark:border-blue-900">
                      <CardContent className="p-4">
                        <div className="flex flex-col space-y-2">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{insight.title}</h4>
                            <span className="text-xs text-muted-foreground">{insight.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{insight.description}</p>
                          <div className="flex flex-wrap gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">Source: {insight.source}</Badge>
                            <Badge variant="outline" className="text-xs">Confidence: {insight.confidence}</Badge>
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${
                                insight.impact === 'High' 
                                  ? 'bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400' 
                                  : 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400'
                              }`}
                            >
                              Impact: {insight.impact}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="market" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Market Analysis</CardTitle>
                <CardDescription>
                  AI-powered market analysis and forecasting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    Our advanced market analysis uses machine learning algorithms to analyze patterns,
                    trends, and correlations across global financial markets. This tab provides in-depth
                    market analysis powered by our AI engine.
                  </p>
                </div>
                
                <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <RotateCw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    AI Market Analysis Dashboard
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This feature is currently being enhanced. Our AI team is implementing advanced
                    algorithmic trading pattern detection and macroeconomic forecast modeling.
                  </p>
                  <Button>
                    <BookOpen className="mr-2 h-4 w-4" />
                    View Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="nlp" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Natural Language Processing Insights</CardTitle>
                <CardDescription>
                  AI analysis of news, reports, and financial documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    Our NLP system continuously analyzes thousands of financial documents, news articles,
                    social media, and other text sources to extract valuable insights and sentiment patterns.
                  </p>
                </div>
                
                <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <RotateCw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    NLP Insights Dashboard
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This feature is currently being enhanced. Our AI team is implementing improved
                    sentiment analysis and entity recognition models.
                  </p>
                  <Button>
                    <BookOpen className="mr-2 h-4 w-4" />
                    View Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  AI Risk Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={riskAnalysisData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" domain={[0, 100]} />
                      <YAxis dataKey="category" type="category" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="score" name="Risk Score" fill="#3b82f6" />
                      <Bar dataKey="threshold" name="Risk Threshold" fill="#d1d5db" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-6 space-y-4">
                  {[
                    {
                      category: "Market Risk",
                      analysis: "Market volatility is above expected thresholds, particularly in technology sector stocks. Recommend implementing additional hedging strategies.",
                      trend: "Increasing",
                      recommendations: "Increase diversification across uncorrelated assets"
                    },
                    {
                      category: "Credit Risk",
                      analysis: "Credit exposure is within acceptable limits. Some concentration risk in financial sector counterparties noted.",
                      trend: "Stable",
                      recommendations: "Monitor banking sector developments closely"
                    },
                    {
                      category: "Operational Risk",
                      analysis: "Operational efficiency metrics are strong with no significant vulnerabilities detected.",
                      trend: "Decreasing",
                      recommendations: "Continue current operational risk management practices"
                    }
                  ].map((risk, index) => (
                    <Card key={index} className="border border-blue-50 dark:border-blue-900">
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">{risk.category}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{risk.analysis}</p>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline" className="text-xs">Trend: {risk.trend}</Badge>
                          <Badge variant="outline" className="text-xs">AI Recommendation: {risk.recommendations}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Recommendations</CardTitle>
                <CardDescription>
                  Strategic recommendations based on comprehensive data analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      title: "Portfolio Rebalancing",
                      description: "Based on market sentiment and trend analysis, our AI recommends the following portfolio adjustments:",
                      actions: [
                        "Increase healthcare sector allocation by 5%",
                        "Reduce exposure to financial services by 5%",
                        "Consider adding emerging market bonds for diversification",
                        "Implement sector rotation strategy to capitalize on economic cycle position"
                      ],
                      confidence: "High",
                      timeframe: "Next 3 months"
                    },
                    {
                      title: "Risk Management",
                      description: "To mitigate identified risks, our AI recommends these risk management strategies:",
                      actions: [
                        "Increase hedging against currency volatility",
                        "Review counterparty exposure limits with major financial institutions",
                        "Implement stress testing for potential supply chain disruptions",
                        "Consider purchasing additional cybersecurity insurance"
                      ],
                      confidence: "Medium",
                      timeframe: "Immediate"
                    },
                    {
                      title: "Cash Management",
                      description: "To optimize cash positions, our AI recommends:",
                      actions: [
                        "Consolidate cash reserves in higher-yielding accounts",
                        "Implement automated cash sweeping between subsidiaries",
                        "Negotiate improved terms with primary banking partners",
                        "Consider ultra-short-term bond funds for excess liquidity"
                      ],
                      confidence: "High",
                      timeframe: "Next month"
                    }
                  ].map((rec, index) => (
                    <Card key={index} className="border border-blue-50 dark:border-blue-900">
                      <CardContent className="p-6">
                        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                          <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          {rec.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4">{rec.description}</p>
                        <ul className="list-disc pl-6 space-y-1 mb-4">
                          {rec.actions.map((action, i) => (
                            <li key={i} className="text-sm">{action}</li>
                          ))}
                        </ul>
                        <div className="flex flex-wrap gap-2">
                          <Badge variant="outline">Confidence: {rec.confidence}</Badge>
                          <Badge variant="outline">Timeframe: {rec.timeframe}</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* AI Assistant */}
        <Card className="mt-6 border-blue-100 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              AI Financial Assistant
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                <MessageSquareText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-2">
                  Ask our AI assistant about market trends, portfolio optimization, or risk assessment
                </p>
                <Button className="w-full justify-start text-left">Ask a question about your financial data...</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

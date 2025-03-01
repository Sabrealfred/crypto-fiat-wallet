
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  BrainCircuit,
  FileText,
  Newspaper,
  RefreshCw,
  RotateCw,
  Share2,
  Wand2,
  LineChart,
  BarChart3,
  ChevronRight,
  Download,
  Filter,
  Search,
  Plus,
  MessageSquareText,
  PieChart,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  AlertCircle,
  BarChart as BarChartIcon
} from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ResponsiveContainer, LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell } from "recharts";

// Sample data for charts and visualizations
const sentimentTrendData = [
  { date: 'Jan', positive: 65, negative: 35, neutral: 15 },
  { date: 'Feb', positive: 50, negative: 40, neutral: 25 },
  { date: 'Mar', positive: 45, negative: 50, neutral: 20 },
  { date: 'Apr', positive: 70, negative: 30, neutral: 15 },
  { date: 'May', positive: 60, negative: 35, neutral: 20 },
  { date: 'Jun', positive: 80, negative: 20, neutral: 15 },
];

const entityMentionsData = [
  { entity: 'Federal Reserve', mentions: 342, sentiment: 65 },
  { entity: 'Treasury Dept', mentions: 245, sentiment: 40 },
  { entity: 'ECB', mentions: 189, sentiment: 55 },
  { entity: 'PBOC', mentions: 142, sentiment: 30 },
  { entity: 'Bank of Japan', mentions: 105, sentiment: 45 },
];

const topicDistributionData = [
  { name: 'Inflation', value: 35 },
  { name: 'Interest Rates', value: 25 },
  { name: 'Fiscal Policy', value: 15 },
  { name: 'Trade', value: 10 },
  { name: 'Regulation', value: 15 },
];

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

const documentAnalysisData = [
  { type: 'Annual Reports', analyzed: 128, insights: 436 },
  { type: 'Quarterly Reports', analyzed: 243, insights: 582 },
  { type: 'Press Releases', analyzed: 512, insights: 895 },
  { type: 'Research Papers', analyzed: 89, insights: 312 },
  { type: 'Regulatory Filings', analyzed: 156, insights: 405 },
];

export default function NLPPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [activeTab, setActiveTab] = useState("news");
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState("30days");
  const [isRefreshingInsights, setIsRefreshingInsights] = useState(false);

  const handleProcessDocuments = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Documents processed successfully");
    }, 2000);
  };

  const handleRefreshInsights = () => {
    setIsRefreshingInsights(true);
    setTimeout(() => {
      setIsRefreshingInsights(false);
      toast.success("NLP insights refreshed with latest data");
    }, 1500);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setIsLoadingMore(false);
      toast.success("Additional insights loaded");
    }, 1200);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader
          title="NLP Insights"
          description="AI-powered natural language processing of financial documents and news"
          showBack={true}
        />

        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-medium">Financial NLP Analysis</h2>
            <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
              AI-Powered
            </Badge>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search insights..."
                className="pl-8 w-full sm:w-[200px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-full sm:w-[150px]">
                <SelectValue placeholder="Date range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7days">Last 7 days</SelectItem>
                <SelectItem value="30days">Last 30 days</SelectItem>
                <SelectItem value="90days">Last 90 days</SelectItem>
                <SelectItem value="year">Last 12 months</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={handleProcessDocuments}
              disabled={isProcessing}
              className="flex items-center gap-2"
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4" />
                  Process Documents
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Key Metrics Dashboard */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Documents Analyzed</p>
                  <h3 className="text-2xl font-bold mt-2">1,128</h3>
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +24% this month
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">News Sentiment</p>
                  <h3 className="text-2xl font-bold mt-2">Positive</h3>
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +7.2% confidence
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <Newspaper className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-100 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm text-muted-foreground">Top Trending Topic</p>
                  <h3 className="text-2xl font-bold mt-2">Inflation</h3>
                  <p className="text-sm text-red-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +12.4% mentions
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
                  <p className="text-sm text-muted-foreground">Analysis Accuracy</p>
                  <h3 className="text-2xl font-bold mt-2">94.3%</h3>
                  <p className="text-sm text-green-500 mt-1 flex items-center">
                    <ArrowUpRight className="h-3 w-3 mr-1" />
                    +1.2% improvement
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900/40">
                  <BrainCircuit className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="news">News Analysis</TabsTrigger>
            <TabsTrigger value="reports">Financial Reports</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="topics">Topic Trends</TabsTrigger>
            <TabsTrigger value="insights">AI Insights</TabsTrigger>
          </TabsList>

          <TabsContent value="news" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Financial News Sentiment Analysis</h3>
              <Button variant="outline" size="sm" onClick={handleRefreshInsights} disabled={isRefreshingInsights}>
                {isRefreshingInsights ? (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                    Refreshing...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Refresh Insights
                  </>
                )}
              </Button>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Sentiment Trend Analysis
                  </CardTitle>
                  <CardDescription>Sentiment analysis over time from news sources</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsLineChart data={sentimentTrendData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip formatter={(value) => `${value}%`} />
                        <Legend />
                        <Line type="monotone" dataKey="positive" stroke="#10b981" name="Positive" strokeWidth={2} />
                        <Line type="monotone" dataKey="negative" stroke="#ef4444" name="Negative" strokeWidth={2} />
                        <Line type="monotone" dataKey="neutral" stroke="#f59e0b" name="Neutral" strokeWidth={2} />
                      </RechartsLineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <PieChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Topic Distribution
                  </CardTitle>
                  <CardDescription>Distribution of topics in analyzed news</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={topicDistributionData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name} ${(Number(percent) * 100).toFixed(0)}%`}
                        >
                          {topicDistributionData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => `${value}%`} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChartIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Entity Mentions and Sentiment
                </CardTitle>
                <CardDescription>Key financial entities mentioned in recent news</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={entityMentionsData}
                      layout="vertical"
                      margin={{ top: 5, right: 30, left: 90, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="entity" type="category" width={100} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="mentions" fill="#3b82f6" name="Mentions" />
                      <Bar dataKey="sentiment" fill="#10b981" name="Positive Sentiment %" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-100 dark:border-blue-800">
              <CardHeader>
                <CardTitle>Recent News Sentiment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      headline: "Federal Reserve Hints at Possible Rate Cuts",
                      source: "Financial Times",
                      sentiment: "Positive",
                      confidence: "87%",
                      time: "2 hours ago",
                      excerpt: "In a recent statement, Federal Reserve officials hinted at potential interest rate cuts in the coming months, citing improved inflation outlook and stabilizing economic indicators."
                    },
                    {
                      headline: "Tech Sector Faces Regulatory Scrutiny in EU",
                      source: "Bloomberg",
                      sentiment: "Negative",
                      confidence: "73%",
                      time: "5 hours ago",
                      excerpt: "European Union regulators announced new investigations into major tech companies' market practices, potentially leading to significant fines and operational restrictions."
                    },
                    {
                      headline: "Manufacturing Output Exceeds Expectations",
                      source: "Reuters",
                      sentiment: "Positive",
                      confidence: "92%",
                      time: "Yesterday",
                      excerpt: "The latest manufacturing index shows output has exceeded analyst expectations for the third consecutive month, indicating strong economic recovery in the sector."
                    },
                    {
                      headline: "Oil Prices Surge Amid Supply Concerns",
                      source: "Wall Street Journal",
                      sentiment: "Mixed",
                      confidence: "65%",
                      time: "Yesterday",
                      excerpt: "Crude oil prices jumped 3% following reports of production disruptions in key oil-producing regions, raising concerns about potential inflationary pressures."
                    }
                  ].map((news, i) => (
                    <div key={i} className="flex justify-between border-b pb-4 last:border-b-0 last:pb-0">
                      <div className="flex-1 pr-4">
                        <h4 className="font-medium">{news.headline}</h4>
                        <p className="text-sm text-muted-foreground mt-1">{news.excerpt}</p>
                        <div className="flex items-center text-sm text-muted-foreground mt-2">
                          <span>{news.source}</span>
                          <span className="mx-2">•</span>
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{news.time}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <Badge
                          className={
                            news.sentiment === "Positive"
                              ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400"
                              : news.sentiment === "Negative"
                              ? "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400"
                              : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-800/20 dark:text-yellow-400"
                          }
                        >
                          {news.sentiment}
                        </Badge>
                        <p className="text-xs mt-1">Confidence: {news.confidence}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button 
                  variant="outline" 
                  className="w-full mt-4" 
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                >
                  {isLoadingMore ? (
                    <>
                      <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                      Loading...
                    </>
                  ) : (
                    "Load More News"
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Financial Reports Analysis</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="mr-2 h-4 w-4" />
                  Filter Reports
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export Analysis
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Document Analysis Performance
                </CardTitle>
                <CardDescription>
                  Analysis of different document types and insights generated
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={documentAnalysisData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="type" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="analyzed" fill="#3b82f6" name="Documents Analyzed" />
                      <Bar dataKey="insights" fill="#8b5cf6" name="Insights Generated" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Key Findings in Financial Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Revenue Growth Patterns",
                        description: "AI detected consistent patterns of revenue growth language in Q2 tech sector reports, with 72% of analyzed companies showing optimistic forecasts.",
                        source: "10-Q Analysis",
                        confidence: "High (85%)"
                      },
                      {
                        title: "Supply Chain Disruptions",
                        description: "Manufacturing sector reports increasingly mention supply chain challenges, with 40% more references in Q2 compared to Q1.",
                        source: "Earnings Calls",
                        confidence: "Medium (76%)"
                      },
                      {
                        title: "ESG Investment Trends",
                        description: "Financial services reports show 28% increase in ESG-related commitments and investments compared to previous year.",
                        source: "Annual Reports",
                        confidence: "High (88%)"
                      }
                    ].map((finding, i) => (
                      <div key={i} className="border-b pb-4 last:border-b-0 last:pb-0">
                        <h4 className="font-medium text-blue-600 dark:text-blue-400">{finding.title}</h4>
                        <p className="text-sm mt-1">{finding.description}</p>
                        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                          <span>Source: {finding.source}</span>
                          <span>Confidence: {finding.confidence}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Risk Factors Analysis</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        risk: "Regulatory Compliance",
                        trend: "Increasing",
                        change: "+18%",
                        impact: "High",
                        sectors: "Finance, Healthcare, Energy"
                      },
                      {
                        risk: "Cybersecurity Threats",
                        trend: "Increasing",
                        change: "+35%",
                        impact: "Severe",
                        sectors: "Technology, Finance, Healthcare"
                      },
                      {
                        risk: "Inflation Concerns",
                        trend: "Stable",
                        change: "+2%",
                        impact: "Moderate",
                        sectors: "Consumer Goods, Retail"
                      },
                      {
                        risk: "Labor Market Pressures",
                        trend: "Decreasing",
                        change: "-8%",
                        impact: "Low",
                        sectors: "Manufacturing, Services"
                      }
                    ].map((risk, i) => (
                      <div key={i} className="flex items-start justify-between border-b pb-4 last:border-b-0 last:pb-0">
                        <div>
                          <h4 className="font-medium">{risk.risk}</h4>
                          <p className="text-sm text-muted-foreground mt-1">Sectors: {risk.sectors}</p>
                          <p className="text-sm text-muted-foreground">Impact: {risk.impact}</p>
                        </div>
                        <div className="text-right">
                          <Badge
                            className={
                              risk.trend === "Decreasing"
                                ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400"
                                : risk.trend === "Increasing"
                                ? "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400"
                                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-800/20 dark:text-yellow-400"
                            }
                          >
                            {risk.trend} {risk.change}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Button variant="outline" className="w-full" onClick={handleLoadMore} disabled={isLoadingMore}>
              {isLoadingMore ? "Loading more reports..." : "Load More Report Analyses"}
            </Button>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Social Media Sentiment Analysis</h3>
              <Button variant="outline" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Data Source
              </Button>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Social Media Sentiment Analysis
                </CardTitle>
                <CardDescription>
                  AI-powered analysis of social media discussions about financial markets
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    Our AI engine analyzes social media platforms for discussions about financial markets,
                    specific companies, and economic trends to gauge public sentiment.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Top Social Media Topics</h3>
                      {[
                        { topic: "Inflation Concerns", volume: 23452, sentiment: "Negative", change: "+15%" },
                        { topic: "AI Investments", volume: 18975, sentiment: "Positive", change: "+42%" },
                        { topic: "Housing Market", volume: 15321, sentiment: "Mixed", change: "-3%" },
                        { topic: "Crypto Regulations", volume: 12854, sentiment: "Negative", change: "+8%" },
                        { topic: "Green Energy Stocks", volume: 9876, sentiment: "Positive", change: "+27%" }
                      ].map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-muted/40 rounded-lg">
                          <div>
                            <h4 className="font-medium">{item.topic}</h4>
                            <p className="text-sm text-muted-foreground">
                              {item.volume.toLocaleString()} mentions
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge
                              className={
                                item.sentiment === "Positive"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-800/20 dark:text-green-400"
                                  : item.sentiment === "Negative"
                                  ? "bg-red-100 text-red-800 hover:bg-red-100 dark:bg-red-800/20 dark:text-red-400"
                                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100 dark:bg-yellow-800/20 dark:text-yellow-400"
                              }
                            >
                              {item.sentiment}
                            </Badge>
                            <p className="text-xs mt-1">{item.change} vs last week</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">Platform Analysis</h3>
                      {[
                        { platform: "Twitter/X", users: "Finance Professionals", insight: "Most bearish on tech stocks, bullish on healthcare" },
                        { platform: "Reddit", users: "Retail Investors", insight: "Increasingly interested in dividend stocks" },
                        { platform: "LinkedIn", users: "Executives", insight: "Concerned about regulatory changes and compliance" },
                        { platform: "TikTok", users: "Gen Z Investors", insight: "Strong interest in ESG and sustainable investments" },
                        { platform: "YouTube", users: "Mixed Audience", insight: "Seeking education on market fundamentals" }
                      ].map((item, index) => (
                        <div key={index} className="p-3 bg-muted/40 rounded-lg">
                          <div className="flex justify-between">
                            <h4 className="font-medium">{item.platform}</h4>
                            <span className="text-sm text-muted-foreground">{item.users}</span>
                          </div>
                          <p className="text-sm mt-1">{item.insight}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    AI-Detected Social Sentiment Shift
                  </h3>
                  <p className="mb-4">
                    Our AI has detected a significant shift in retail investor sentiment toward financial technology stocks in the past 72 hours, moving from neutral to strongly positive. This correlates with recent product announcements and may indicate potential market movement.
                  </p>
                  <div className="flex gap-2">
                    <Button>
                      <Search className="mr-2 h-4 w-4" />
                      Explore Trend
                    </Button>
                    <Button variant="outline">
                      <BookOpen className="mr-2 h-4 w-4" />
                      View Detailed Analysis
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="topics" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Topic Trend Analysis</h3>
              <div className="flex gap-2">
                <Select defaultValue="relevance">
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Sort by Relevance</SelectItem>
                    <SelectItem value="trending">Sort by Trending</SelectItem>
                    <SelectItem value="newest">Sort by Newest</SelectItem>
                    <SelectItem value="impact">Sort by Impact</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm">
                  <Download className="mr-2 h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Topic Trend Analysis
                </CardTitle>
                <CardDescription>
                  AI-identified emerging trends and topics across all text sources
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      title: "Central Bank Digital Currencies",
                      description: "Discussions around CBDCs have increased by 215% in the past quarter, with most major economies now actively developing or piloting their own digital currencies.",
                      trend: "Rapidly Rising",
                      sources: ["Policy Documents", "Financial News", "Central Bank Statements"],
                      impact: "High",
                      confidence: "92%"
                    },
                    {
                      title: "Climate Finance Innovation",
                      description: "New financial instruments designed to address climate change and sustainability goals are gaining significant traction in market discussions and regulatory frameworks.",
                      trend: "Steady Growth",
                      sources: ["Corporate Reports", "Regulatory Filings", "Financial News"],
                      impact: "Medium",
                      confidence: "87%"
                    },
                    {
                      title: "Algorithmic Trading Regulation",
                      description: "Increasing concerns about market manipulation and volatility have led to growing discussions about new regulatory frameworks for algorithmic and high-frequency trading.",
                      trend: "Emerging",
                      sources: ["Regulatory Filings", "Academic Papers", "Financial News"],
                      impact: "Medium",
                      confidence: "79%"
                    },
                    {
                      title: "Decentralized Finance Integration",
                      description: "Traditional financial institutions are increasingly discussing integration strategies with decentralized finance protocols and infrastructure.",
                      trend: "Accelerating",
                      sources: ["Corporate Strategy", "Financial News", "Earnings Calls"],
                      impact: "High",
                      confidence: "84%"
                    }
                  ].map((topic, index) => (
                    <Card key={index} className="border border-blue-50 dark:border-blue-900">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start">
                          <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">{topic.title}</h3>
                          <Badge
                            className={
                              topic.trend === "Rapidly Rising" || topic.trend === "Accelerating"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                                : topic.trend === "Steady Growth"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                                : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400"
                            }
                          >
                            {topic.trend}
                          </Badge>
                        </div>
                        <p className="mt-2">{topic.description}</p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {topic.sources.map((source, i) => (
                            <Badge key={i} variant="outline" className="bg-muted/40">
                              {source}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-4 flex justify-between text-sm">
                          <div>
                            <span className="text-muted-foreground">Impact: </span>
                            <span className={
                              topic.impact === "High" 
                                ? "text-red-600 dark:text-red-400 font-medium" 
                                : "text-yellow-600 dark:text-yellow-400 font-medium"
                            }>
                              {topic.impact}
                            </span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Confidence: </span>
                            <span className="font-medium">{topic.confidence}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="mt-6 flex justify-center">
                  <Button variant="outline" className="min-w-[200px]" onClick={handleLoadMore} disabled={isLoadingMore}>
                    {isLoadingMore ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Load More Topics"
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">AI-Generated Insights</h3>
              <Button variant="default" size="sm">
                <BrainCircuit className="mr-2 h-4 w-4" />
                Generate New Insights
              </Button>
            </div>
            
            <div className="grid gap-6 lg:grid-cols-3">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Executive Summary</CardTitle>
                  <CardDescription>AI-generated summary of key financial trends and insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="prose dark:prose-invert max-w-none">
                    <p>
                      Our AI analysis of over 25,000 financial documents, news articles, and social media posts from the past 30 days reveals several significant trends and potential market movements:
                    </p>
                    
                    <h4 className="text-blue-700 dark:text-blue-400 font-medium mt-4">Key Macroeconomic Trends</h4>
                    <ul className="mt-2 space-y-2">
                      <li>Central banks globally are showing increasing alignment toward monetary easing, with 68% of statements indicating potential rate cuts in the next 6 months.</li>
                      <li>Inflationary pressures appear to be moderating across developed markets, with core inflation metrics trending downward for the third consecutive month.</li>
                      <li>Consumer spending remains resilient despite economic headwinds, particularly in digital services and subscription-based business models.</li>
                    </ul>
                    
                    <h4 className="text-blue-700 dark:text-blue-400 font-medium mt-4">Sector-Specific Insights</h4>
                    <ul className="mt-2 space-y-2">
                      <li>Technology sector sentiment has improved substantially (+18%) following better-than-expected earnings and reduced regulatory concerns.</li>
                      <li>Financial services firms are increasingly focusing on AI integration, with mentions up 215% in quarterly reports compared to the previous year.</li>
                      <li>Healthcare innovation, particularly in precision medicine and digital health, continues to attract significant investment despite market volatility.</li>
                    </ul>
                    
                    <h4 className="text-blue-700 dark:text-blue-400 font-medium mt-4">Emerging Risks</h4>
                    <ul className="mt-2 space-y-2">
                      <li>Geopolitical tensions affecting supply chains have been mentioned in 42% of manufacturing sector reports, a 15% increase quarter-over-quarter.</li>
                      <li>Regulatory scrutiny of digital assets and cryptocurrencies is intensifying globally, with potential impacts on financial technology valuations.</li>
                      <li>Climate-related financial risks are receiving increased attention from both regulators and investors, particularly regarding disclosure requirements.</li>
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Financial Market Predictions</CardTitle>
                  <CardDescription>AI-generated forecasts based on NLP analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Interest Rates",
                        prediction: "25-50 bps reduction by Q4",
                        confidence: "High (83%)",
                        impact: "Positive for equities",
                        trend: "up"
                      },
                      {
                        title: "Tech Sector",
                        prediction: "Continued outperformance",
                        confidence: "Medium (76%)",
                        impact: "Strong earnings growth",
                        trend: "up"
                      },
                      {
                        title: "Financial Sector",
                        prediction: "Margin pressure increasing",
                        confidence: "Medium (72%)",
                        impact: "Potential earnings miss",
                        trend: "down"
                      },
                      {
                        title: "Energy Markets",
                        prediction: "Heightened volatility",
                        confidence: "Medium (68%)",
                        impact: "Neutral to negative",
                        trend: "down"
                      },
                      {
                        title: "Consumer Spending",
                        prediction: "Resilient through Q3",
                        confidence: "High (85%)",
                        impact: "Positive for retail",
                        trend: "up"
                      }
                    ].map((prediction, i) => (
                      <div key={i} className="p-4 bg-muted/30 rounded-lg">
                        <div className="flex justify-between items-start">
                          <h4 className="font-medium">{prediction.title}</h4>
                          <span className={`flex items-center ${
                            prediction.trend === 'up' ? 'text-green-500' : 'text-red-500'
                          }`}>
                            {prediction.trend === 'up' ? (
                              <ArrowUpRight className="h-4 w-4" />
                            ) : (
                              <ArrowDownRight className="h-4 w-4" />
                            )}
                          </span>
                        </div>
                        <p className="text-sm font-medium mt-1">{prediction.prediction}</p>
                        <div className="text-xs text-muted-foreground mt-2 flex flex-col gap-1">
                          <div>Confidence: {prediction.confidence}</div>
                          <div>Impact: {prediction.impact}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Investment Recommendations</CardTitle>
                <CardDescription>Strategic recommendations based on NLP analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      category: "Asset Allocation",
                      recommendation: "Consider increasing allocation to quality growth stocks in technology and healthcare sectors while maintaining defensive positions in consumer staples.",
                      rationale: "NLP analysis indicates improving sentiment and earnings outlook for tech and healthcare, while economic uncertainty supports maintaining defensive positions.",
                      confidence: "High (84%)"
                    },
                    {
                      category: "Fixed Income",
                      recommendation: "Consider reducing duration in fixed income portfolios and exploring floating rate instruments.",
                      rationale: "While our analysis suggests interest rate cuts are likely, timing remains uncertain and yield curve volatility may persist through year-end.",
                      confidence: "Medium (76%)"
                    },
                    {
                      category: "Geographic Exposure",
                      recommendation: "Maintain U.S. overweight while selectively increasing exposure to emerging markets, particularly in Asia.",
                      rationale: "Text analysis of central bank communications and economic indicators suggests improving conditions for select emerging markets.",
                      confidence: "Medium (72%)"
                    }
                  ].map((rec, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                      <h3 className="text-lg font-medium text-blue-700 dark:text-blue-400">{rec.category}</h3>
                      <p className="mt-2 font-medium">{rec.recommendation}</p>
                      <p className="text-sm text-muted-foreground mt-2">{rec.rationale}</p>
                      <div className="mt-2 text-sm">
                        <span className="text-muted-foreground">Confidence: </span>
                        <span>{rec.confidence}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-700 dark:text-blue-400 font-medium mb-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>Important Disclaimer</span>
                  </div>
                  <p className="text-sm">
                    These AI-generated insights and recommendations are based on natural language processing of financial documents and should not be considered as personalized investment advice. All investments involve risk and past performance is not indicative of future results.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* AI Assistant Chat Interface */}
        <Card className="mt-6 border-blue-100 dark:border-blue-800">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2">
              <MessageSquareText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Financial NLP Assistant
            </CardTitle>
            <CardDescription>Ask questions about financial documents, news, and sentiment analysis</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <Input 
                placeholder="Ask about financial news analysis, sentiment trends, or specific entities..." 
                className="flex-1"
              />
              <Button>
                <BrainCircuit className="mr-2 h-4 w-4" />
                Ask AI
              </Button>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              Example questions: "Summarize recent Fed sentiment", "Analyze market reaction to recent tech earnings", "Identify emerging risks in financial sector"
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}

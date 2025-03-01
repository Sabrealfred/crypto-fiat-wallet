
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Wand2 
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function NLPPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [activeTab, setActiveTab] = useState("news");

  const handleProcessDocuments = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      toast.success("Documents processed successfully");
    }, 2000);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader
          title="NLP Insights"
          description="AI-powered natural language processing of financial documents and news"
          showBack={true}
        />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Financial NLP Analysis</h2>
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
                Process New Documents
              </>
            )}
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="news">News Analysis</TabsTrigger>
            <TabsTrigger value="reports">Financial Reports</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="trends">Topic Trends</TabsTrigger>
          </TabsList>

          <TabsContent value="news" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Financial News Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    Our NLP engine continuously analyzes financial news from thousands of sources
                    to identify sentiment, trends, and market-moving events.
                  </p>
                </div>
                
                <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <RotateCw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    News Analysis Dashboard
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This feature is currently being enhanced. Our AI team is implementing improved
                    news sentiment analysis algorithms.
                  </p>
                  <Button>
                    <BookOpen className="mr-2 h-4 w-4" />
                    View Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>

            <div className="grid gap-6 md:grid-cols-2">
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
                        time: "2 hours ago"
                      },
                      {
                        headline: "Tech Sector Faces Regulatory Scrutiny in EU",
                        source: "Bloomberg",
                        sentiment: "Negative",
                        confidence: "73%",
                        time: "5 hours ago"
                      },
                      {
                        headline: "Manufacturing Output Exceeds Expectations",
                        source: "Reuters",
                        sentiment: "Positive",
                        confidence: "92%",
                        time: "Yesterday"
                      },
                      {
                        headline: "Oil Prices Surge Amid Supply Concerns",
                        source: "Wall Street Journal",
                        sentiment: "Mixed",
                        confidence: "65%",
                        time: "Yesterday"
                      }
                    ].map((news, i) => (
                      <div key={i} className="flex justify-between border-b pb-3 last:border-b-0 last:pb-0">
                        <div>
                          <h4 className="font-medium">{news.headline}</h4>
                          <p className="text-sm text-muted-foreground">{news.source} · {news.time}</p>
                        </div>
                        <div>
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
                          <p className="text-xs text-right mt-1">{news.confidence}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-100 dark:border-blue-800">
                <CardHeader>
                  <CardTitle>Key Entities Mentioned</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      {
                        entity: "Federal Reserve",
                        type: "Organization",
                        mentions: 342,
                        sentiment: "Neutral"
                      },
                      {
                        entity: "Apple Inc.",
                        type: "Company",
                        mentions: 215,
                        sentiment: "Positive"
                      },
                      {
                        entity: "Jerome Powell",
                        type: "Person",
                        mentions: 189,
                        sentiment: "Mixed"
                      },
                      {
                        entity: "TSMC",
                        type: "Company",
                        mentions: 156,
                        sentiment: "Positive"
                      },
                      {
                        entity: "European Union",
                        type: "Organization",
                        mentions: 147,
                        sentiment: "Negative"
                      }
                    ].map((entity, i) => (
                      <div key={i} className="flex justify-between border-b pb-3 last:border-b-0 last:pb-0">
                        <div>
                          <h4 className="font-medium">{entity.entity}</h4>
                          <p className="text-sm text-muted-foreground">{entity.type}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{entity.mentions} mentions</p>
                          <Badge
                            variant="outline"
                            className={
                              entity.sentiment === "Positive"
                                ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                : entity.sentiment === "Negative"
                                ? "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                                : "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                            }
                          >
                            {entity.sentiment}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Financial Reports Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    Our AI system can automatically analyze financial reports, earnings calls transcripts,
                    and other official documents to extract key insights and detect subtle patterns.
                  </p>
                </div>
                
                <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <RotateCw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Reports Analysis Dashboard
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This feature is currently being enhanced. Our AI team is implementing improved
                    document analysis capabilities.
                  </p>
                  <Button>
                    <BookOpen className="mr-2 h-4 w-4" />
                    View Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="social" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Social Media Sentiment Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    Our AI engine analyzes social media platforms for discussions about financial markets,
                    specific companies, and economic trends to gauge public sentiment.
                  </p>
                </div>
                
                <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <RotateCw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Social Sentiment Dashboard
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This feature is currently being enhanced. Our AI team is implementing improved
                    social media analysis algorithms.
                  </p>
                  <Button>
                    <BookOpen className="mr-2 h-4 w-4" />
                    View Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BrainCircuit className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Topic Trend Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose dark:prose-invert max-w-none">
                  <p>
                    Our AI identifies emerging topics and trends across all text sources, helping you
                    spot emerging opportunities or risks before they become widely recognized.
                  </p>
                </div>
                
                <div className="mt-6 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <RotateCw className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Topic Trends Dashboard
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    This feature is currently being enhanced. Our AI team is implementing improved
                    topic modeling and trend detection.
                  </p>
                  <Button>
                    <BookOpen className="mr-2 h-4 w-4" />
                    View Documentation
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

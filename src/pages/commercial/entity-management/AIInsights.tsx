
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState } from "react";
import { Sparkles, Brain, LineChart, AlertCircle, Lightbulb, Bot, BarChart, TrendingUp } from "lucide-react";
import { ForecastingCard } from "./components/ai-insights/ForecastingCard";
import { AnomalyDetectionCard } from "./components/ai-insights/AnomalyDetectionCard";
import { AIAssistantCard } from "./components/ai-insights/AIAssistantCard";

export default function AIInsightsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  
  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader 
          title="AI Insights & Analysis" 
          description="AI-powered financial insights and intelligence for your entities"
          showBack={true}
        />
        
        <div className="mb-6">
          <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6 w-full md:w-auto">
              <TabsTrigger value="overview" className="gap-2">
                <Sparkles className="h-4 w-4" /> Overview
              </TabsTrigger>
              <TabsTrigger value="forecasting" className="gap-2">
                <LineChart className="h-4 w-4" /> Forecasting
              </TabsTrigger>
              <TabsTrigger value="anomalies" className="gap-2">
                <AlertCircle className="h-4 w-4" /> Anomaly Detection
              </TabsTrigger>
              <TabsTrigger value="assistant" className="gap-2">
                <Bot className="h-4 w-4" /> AI Assistant
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border border-blue-100 dark:border-blue-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      AI Financial Intelligence
                    </CardTitle>
                    <CardDescription>
                      How our AI models help optimize your financial operations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-3 p-3 border rounded-lg">
                        <LineChart className="h-8 w-8 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium">Cash Flow Forecasting</h3>
                          <p className="text-sm text-muted-foreground">
                            Advanced time-series modeling using LSTM networks to predict future cash flows with up to
                            95% accuracy. Our models analyze your historical transactions, seasonality patterns, and
                            external economic indicators.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 p-3 border rounded-lg">
                        <AlertCircle className="h-8 w-8 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium">Anomaly Detection</h3>
                          <p className="text-sm text-muted-foreground">
                            Isolation Forest algorithms identify unusual patterns in your financial transactions that
                            may indicate errors, fraud, or opportunities. Our models establish a baseline from your
                            normal operations and flag deviations.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 p-3 border rounded-lg">
                        <BarChart className="h-8 w-8 text-green-600 dark:text-green-400 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium">Optimization Recommendations</h3>
                          <p className="text-sm text-muted-foreground">
                            ML-driven analysis of your financial structure to recommend optimizations for tax
                            efficiency, cash management, and working capital. Our models benchmark against industry
                            standards and identify improvement areas.
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex gap-3 p-3 border rounded-lg">
                        <Bot className="h-8 w-8 text-violet-600 dark:text-violet-400 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium">AI Financial Assistant</h3>
                          <p className="text-sm text-muted-foreground">
                            Natural Language Processing models analyze your financial data and provide insights through
                            a conversational interface. Ask questions in plain language and receive detailed analysis
                            and recommendations.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="border border-blue-100 dark:border-blue-800">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-medium flex items-center gap-2">
                      <Lightbulb className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                      Recent Insights
                    </CardTitle>
                    <CardDescription>
                      AI-generated observations about your financial operations
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-blue-700 dark:text-blue-400">Cash Flow Optimization</h3>
                          <span className="text-xs text-muted-foreground">1 day ago</span>
                        </div>
                        <p className="text-sm mt-1">
                          Your entity is maintaining 23% more cash reserves than industry average. Consider investing 
                          excess cash in short-term instruments for a potential annual yield of 3.5-4.2%.
                        </p>
                      </div>
                      
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-amber-700 dark:text-amber-400">Payment Pattern Anomaly</h3>
                          <span className="text-xs text-muted-foreground">3 days ago</span>
                        </div>
                        <p className="text-sm mt-1">
                          Detected unusual increase (42%) in payments to vendor "TechSupplies Inc" compared to 
                          historical patterns. Verify these transactions and validate invoice accuracy.
                        </p>
                      </div>
                      
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-purple-700 dark:text-purple-400">Regulatory Compliance</h3>
                          <span className="text-xs text-muted-foreground">1 week ago</span>
                        </div>
                        <p className="text-sm mt-1">
                          Based on your transaction patterns and entity structure, you may qualify for 
                          simplified regulatory reporting under the updated financial services framework.
                        </p>
                      </div>
                      
                      <div className="p-3 border rounded-lg">
                        <div className="flex justify-between">
                          <h3 className="font-medium text-green-700 dark:text-green-400">Tax Optimization</h3>
                          <span className="text-xs text-muted-foreground">2 weeks ago</span>
                        </div>
                        <p className="text-sm mt-1">
                          Analysis of your cross-border transactions suggests potential for 8-12% tax efficiency 
                          improvement through restructured transfer pricing methodology.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <ForecastingCard />
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <AnomalyDetectionCard />
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <AIAssistantCard />
              </div>
            </TabsContent>
            
            <TabsContent value="forecasting" className="space-y-6">
              <ForecastingCard />
              
              <Card className="border border-blue-100 dark:border-blue-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                    Forecasting Models
                  </CardTitle>
                  <CardDescription>
                    Advanced machine learning models powering our financial forecasts
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium text-lg mb-2">LSTM Neural Networks</h3>
                      <p className="text-sm">
                        Long Short-Term Memory networks excel at learning patterns in time-series data. Our LSTM models are trained on your historical financial data to recognize complex patterns, seasonality, and long-term dependencies that simple statistical methods might miss.
                      </p>
                      <div className="mt-3 text-sm">
                        <div className="font-medium">Key capabilities:</div>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Captures temporal dependencies in cash flow patterns</li>
                          <li>Identifies seasonal variations in revenue and expenses</li>
                          <li>Adaptive learning from recent financial performance</li>
                          <li>Confidence intervals calibrated to historical accuracy</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium text-lg mb-2">Prophet Time Series Model</h3>
                      <p className="text-sm">
                        For longer-term forecasting, we employ Facebook's Prophet model, which excels at capturing yearly, quarterly, and monthly seasonality. This model incorporates business growth curves and adjusts for holidays and special events relevant to your industry.
                      </p>
                      <div className="mt-3 text-sm">
                        <div className="font-medium">Key capabilities:</div>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Automated detection of seasonal patterns</li>
                          <li>Growth trend modeling with changepoint detection</li>
                          <li>Holiday effect incorporation for accurate forecasting</li>
                          <li>Robust to missing data and outliers</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium text-lg mb-2">Ensemble Methods</h3>
                      <p className="text-sm">
                        Our final forecasts blend multiple models through ensemble techniques, combining the strengths of different forecasting approaches. This improves accuracy and provides more reliable confidence intervals for financial planning.
                      </p>
                      <div className="mt-3 text-sm">
                        <div className="font-medium">Key capabilities:</div>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Combines predictions from multiple models for improved accuracy</li>
                          <li>Weighted averaging based on historical model performance</li>
                          <li>Reduced variance in forecasts through diversification</li>
                          <li>More reliable confidence intervals for risk assessment</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="anomalies" className="space-y-6">
              <AnomalyDetectionCard />
              
              <Card className="border border-blue-100 dark:border-blue-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                    Anomaly Detection Technology
                  </CardTitle>
                  <CardDescription>
                    How our AI identifies unusual patterns in your financial data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium text-lg mb-2">Isolation Forest Algorithm</h3>
                      <p className="text-sm">
                        Our primary anomaly detection model uses Isolation Forest algorithms, which excel at identifying outliers by explicitly isolating them in the feature space. This approach is particularly effective for financial data where anomalies can take many forms.
                      </p>
                      <div className="mt-3 text-sm">
                        <div className="font-medium">Detection capabilities:</div>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Unusual transaction amounts compared to historical patterns</li>
                          <li>Irregular timing or frequency of financial activities</li>
                          <li>Unexpected recipient or source of funds</li>
                          <li>Transactions outside normal business hours or locations</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium text-lg mb-2">Multivariate Pattern Analysis</h3>
                      <p className="text-sm">
                        Beyond simple outlier detection, our models analyze combinations of features to identify anomalies that might appear normal when looking at individual dimensions but are unusual in combination.
                      </p>
                      <div className="mt-3 text-sm">
                        <div className="font-medium">Advanced detection features:</div>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Relationship analysis between transaction amount, frequency, and recipients</li>
                          <li>Temporal pattern detection across multiple variables</li>
                          <li>Entity relationship mapping to identify unusual network patterns</li>
                          <li>Contextual anomaly detection based on business cycles</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium text-lg mb-2">Continuous Learning</h3>
                      <p className="text-sm">
                        Our anomaly detection models continuously improve through both supervised and unsupervised learning from your feedback on detected anomalies.
                      </p>
                      <div className="mt-3 text-sm">
                        <div className="font-medium">Learning capabilities:</div>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Feedback incorporation from resolved anomaly investigations</li>
                          <li>Threshold adjustment based on false positive/negative rates</li>
                          <li>Seasonal pattern adaptation to reduce false alerts</li>
                          <li>New pattern detection as business operations evolve</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="assistant" className="space-y-6">
              <AIAssistantCard />
              
              <Card className="border border-blue-100 dark:border-blue-800">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center gap-2">
                    <Bot className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                    AI Assistant Capabilities
                  </CardTitle>
                  <CardDescription>
                    How our AI assistant helps you manage your financial entities
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium text-lg mb-2">Natural Language Understanding</h3>
                      <p className="text-sm">
                        Our AI assistant leverages advanced NLP models to understand complex financial queries in natural language. It can interpret questions about your entity's performance, compliance, and operations without requiring specialized query language.
                      </p>
                      <div className="mt-3 text-sm">
                        <div className="font-medium">Example queries:</div>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>"How has our cash position changed over the last quarter?"</li>
                          <li>"What are our top expense categories compared to last year?"</li>
                          <li>"Are there any regulatory deadlines coming up for this entity?"</li>
                          <li>"What tax optimization opportunities do we have based on recent transactions?"</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium text-lg mb-2">Multi-source Data Analysis</h3>
                      <p className="text-sm">
                        The assistant integrates data from all your connected sources—ERP systems, banking APIs, accounting software, and market data—to provide comprehensive answers that consider the full financial picture.
                      </p>
                      <div className="mt-3 text-sm">
                        <div className="font-medium">Integrated data sources:</div>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Transaction data from banking integrations</li>
                          <li>Financial statements and reporting from ERP systems</li>
                          <li>Compliance and regulatory information from integrated databases</li>
                          <li>Market benchmarks and industry comparisons</li>
                        </ul>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <h3 className="font-medium text-lg mb-2">Proactive Insights</h3>
                      <p className="text-sm">
                        Beyond answering questions, the assistant proactively identifies opportunities and risks based on your entity's financial patterns and market conditions.
                      </p>
                      <div className="mt-3 text-sm">
                        <div className="font-medium">Proactive capabilities:</div>
                        <ul className="list-disc pl-5 mt-1 space-y-1">
                          <li>Cash flow optimization recommendations</li>
                          <li>Early warning for potential liquidity issues</li>
                          <li>Tax planning suggestions ahead of reporting deadlines</li>
                          <li>Regulatory compliance alerts for changing requirements</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </AppLayout>
  );
}

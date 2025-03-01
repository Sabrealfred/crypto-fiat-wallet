
import { AppLayout } from "@/components/layout/app-layout";
import { CommercialHeader } from "@/components/commercial/CommercialHeader";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  ArrowRight, 
  BarChart, 
  Check, 
  FileText, 
  Filter, 
  Lightbulb, 
  Plus, 
  RefreshCw, 
  SlidersHorizontal, 
  Star, 
  TrendingUp, 
  X 
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function AIRecommendationsPage() {
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState("portfolio");

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      toast.success("AI recommendations refreshed successfully");
    }, 1500);
  };

  return (
    <AppLayout>
      <div className="container mx-auto p-6">
        <CommercialHeader
          title="AI Recommendations"
          description="Actionable investment insights powered by artificial intelligence"
          showBack={true}
        />

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium">Investment Recommendations</h2>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
              Refresh Recommendations
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Preferences
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="portfolio">Portfolio Optimization</TabsTrigger>
            <TabsTrigger value="opportunities">New Opportunities</TabsTrigger>
            <TabsTrigger value="risk">Risk Mitigation</TabsTrigger>
            <TabsTrigger value="strategies">Investment Strategies</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Portfolio Optimization Recommendations
                </CardTitle>
                <CardDescription>
                  AI-generated recommendations to improve your current portfolio performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <h3 className="font-medium">AI Portfolio Summary</h3>
                        <p className="text-sm text-muted-foreground">Current portfolio analysis:</p>
                      </div>
                      <Badge variant="outline">Updated today</Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Performance</p>
                        <p className="text-xl font-semibold">+8.2%</p>
                        <p className="text-xs text-muted-foreground">YTD return</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Diversification</p>
                        <p className="text-xl font-semibold">Moderate</p>
                        <p className="text-xs text-muted-foreground">Could improve</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Risk Level</p>
                        <p className="text-xl font-semibold">Medium</p>
                        <p className="text-xs text-muted-foreground">Within target</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        title: "Rebalance Sector Allocation",
                        description: "Your portfolio is overweight in technology (32% vs. target 25%) and underweight in healthcare (10% vs. target 18%).",
                        recommendation: "Reduce technology exposure by 7% and increase healthcare allocation by 8%.",
                        impact: "Medium",
                        expectedOutcome: "Improved diversification and potential for 0.7% higher risk-adjusted returns.",
                        confidenceScore: 87
                      },
                      {
                        title: "Adjust Fixed Income Duration",
                        description: "Current fixed income allocation has an average duration of 8.2 years, which increases interest rate risk.",
                        recommendation: "Shift 40% of long-term bonds to intermediate duration (3-5 years) given the current yield curve.",
                        impact: "High",
                        expectedOutcome: "Reduced volatility with minimal yield sacrifice (est. 0.15% yield reduction).",
                        confidenceScore: 93
                      },
                      {
                        title: "Optimize Cash Allocation",
                        description: "Cash holdings at 12% exceed target cash allocation of 5% for your risk profile.",
                        recommendation: "Deploy 7% of cash to a mix of short-term bonds (4%) and dividend stocks (3%).",
                        impact: "Medium",
                        expectedOutcome: "Potential for additional 0.5% portfolio yield with minimal risk increase.",
                        confidenceScore: 89
                      },
                      {
                        title: "Tax-Loss Harvesting Opportunity",
                        description: "Identified 5 securities with unrealized losses totaling approximately $37,500.",
                        recommendation: "Execute tax-loss harvesting and replace with similar but not substantially identical securities.",
                        impact: "Medium",
                        expectedOutcome: "Estimated tax benefit of $9,000 while maintaining similar market exposure.",
                        confidenceScore: 95
                      }
                    ].map((rec, index) => (
                      <Card key={index} className="border border-blue-50 dark:border-blue-900">
                        <CardContent className="p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div className="flex items-start gap-2">
                              <Lightbulb className="h-5 w-5 text-amber-500 flex-shrink-0 mt-1" />
                              <div>
                                <h3 className="font-medium text-lg">{rec.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{rec.description}</p>
                              </div>
                            </div>
                            <Badge 
                              variant="outline" 
                              className={rec.impact === "High" 
                                ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400" 
                                : "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"}
                            >
                              {rec.impact} Impact
                            </Badge>
                          </div>
                          
                          <div className="ml-7 space-y-3">
                            <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md">
                              <p className="font-medium text-sm">AI Recommendation:</p>
                              <p className="text-sm">{rec.recommendation}</p>
                            </div>
                            
                            <div>
                              <p className="text-sm font-medium">Expected Outcome:</p>
                              <p className="text-sm text-muted-foreground">{rec.expectedOutcome}</p>
                            </div>
                            
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <Star className="h-4 w-4 text-amber-500" />
                                <span className="text-sm font-medium">AI Confidence: {rec.confidenceScore}%</span>
                              </div>
                              <div className="space-x-2">
                                <Button variant="outline" size="sm">
                                  <X className="h-4 w-4 mr-1" />
                                  Dismiss
                                </Button>
                                <Button size="sm">
                                  <Check className="h-4 w-4 mr-1" />
                                  Apply
                                </Button>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Investment Opportunities
                </CardTitle>
                <CardDescription>
                  New investment opportunities identified by our AI
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      name: "Global Clean Energy ETF",
                      ticker: "ICLN",
                      type: "ETF",
                      sector: "Energy",
                      reasoning: "Policy tailwinds and improving economics for renewable energy. Recent price correction creates favorable entry point.",
                      expectedReturn: "12-15% annualized over 3-5 years",
                      riskLevel: "Moderate",
                      aiScore: 87
                    },
                    {
                      name: "Healthcare Innovation Fund",
                      ticker: "ARKG",
                      type: "ETF",
                      sector: "Healthcare",
                      reasoning: "Genomic revolution and precision medicine advancements creating multi-year growth opportunities in biotech subsector.",
                      expectedReturn: "15-20% annualized over 5+ years",
                      riskLevel: "High",
                      aiScore: 84
                    },
                    {
                      name: "Treasury Inflation-Protected Securities",
                      ticker: "TIPS",
                      type: "Fixed Income",
                      sector: "Government",
                      reasoning: "Provides inflation protection in an environment of sustained fiscal stimulus and accommodative monetary policy.",
                      expectedReturn: "Real return of 1-2% plus inflation adjustment",
                      riskLevel: "Low",
                      aiScore: 92
                    },
                    {
                      name: "Emerging Markets Value Index",
                      ticker: "EMVL",
                      type: "ETF",
                      sector: "International",
                      reasoning: "Significant valuation discount relative to developed markets with comparable growth prospects.",
                      expectedReturn: "10-13% annualized over 3-5 years",
                      riskLevel: "Moderate-High",
                      aiScore: 85
                    }
                  ].map((opportunity, index) => (
                    <Card key={index} className="border border-blue-50 dark:border-blue-900">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h4 className="font-medium">{opportunity.name}</h4>
                            <p className="text-sm text-muted-foreground">{opportunity.ticker} • {opportunity.type} • {opportunity.sector}</p>
                          </div>
                          <Badge variant="outline" className="bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400">
                            AI Score: {opportunity.aiScore}/100
                          </Badge>
                        </div>
                        <p className="text-sm mb-3">{opportunity.reasoning}</p>
                        <div className="flex flex-wrap gap-2 text-xs">
                          <Badge variant="outline">Expected Return: {opportunity.expectedReturn}</Badge>
                          <Badge variant="outline">Risk Level: {opportunity.riskLevel}</Badge>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <Button size="sm">
                            Research Further
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="risk" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Risk Mitigation Recommendations
                </CardTitle>
                <CardDescription>
                  AI-identified risks and recommended mitigation strategies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      riskType: "Interest Rate Risk",
                      description: "Your fixed income allocation has high duration sensitivity in a rising rate environment.",
                      severity: "High",
                      recommendation: "Consider shifting 40% of fixed income holdings to floating rate notes and shorter duration bonds.",
                      potentialImpact: "Reduce potential drawdown by up to 3.5% in a rising rate scenario."
                    },
                    {
                      riskType: "Concentration Risk",
                      description: "Five technology holdings represent 28% of your equity allocation, creating sector concentration.",
                      severity: "Medium",
                      recommendation: "Reduce position sizes in top technology holdings and redistribute to underweight sectors.",
                      potentialImpact: "Improve diversification with minimal impact on expected returns."
                    },
                    {
                      riskType: "Liquidity Risk",
                      description: "12% of portfolio is allocated to investments with limited liquidity or redemption restrictions.",
                      severity: "Medium",
                      recommendation: "Ensure liquidity needs are covered by maintaining appropriate cash reserves and liquid investments.",
                      potentialImpact: "Prevent forced selling of illiquid assets at unfavorable prices."
                    },
                    {
                      riskType: "Currency Risk",
                      description: "Unhedged international exposure creates vulnerability to dollar strength.",
                      severity: "Low",
                      recommendation: "Consider currency hedging for 40-50% of international equity and fixed income exposure.",
                      potentialImpact: "Reduce volatility from currency fluctuations by approximately 2.5%."
                    }
                  ].map((risk, index) => (
                    <Card key={index} className="border border-blue-50 dark:border-blue-900">
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{risk.riskType}</h4>
                          <Badge 
                            variant="outline" 
                            className={
                              risk.severity === "High"
                                ? "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                                : risk.severity === "Medium"
                                ? "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                                : "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                            }
                          >
                            {risk.severity} Severity
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{risk.description}</p>
                        <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-md mb-3">
                          <p className="font-medium text-sm">AI Recommendation:</p>
                          <p className="text-sm">{risk.recommendation}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">Potential Impact:</p>
                          <p className="text-sm text-muted-foreground">{risk.potentialImpact}</p>
                        </div>
                        <div className="mt-3 flex justify-end">
                          <Button size="sm">
                            Address Risk
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="strategies" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  Investment Strategies
                </CardTitle>
                <CardDescription>
                  AI-recommended investment strategies based on your goals and risk profile
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {[
                    {
                      name: "Strategic Tax Optimization",
                      description: "A comprehensive approach to optimize after-tax returns across your investment accounts.",
                      details: "This strategy involves strategic placement of tax-efficient and tax-inefficient investments across taxable and tax-advantaged accounts, systematic tax-loss harvesting, and strategic Roth conversion planning.",
                      suitability: "High",
                      timeline: "Ongoing",
                      keyBenefits: ["Potential 0.3-0.7% improvement in after-tax returns", "Reduced tax drag on portfolio growth", "Optimized retirement withdrawals"]
                    },
                    {
                      name: "Factor-Based Core Satellite",
                      description: "Combine a core portfolio of factor-based ETFs with satellite tactical positions.",
                      details: "The core allocation (70-80%) uses low-cost factor ETFs targeting value, quality, momentum, and low volatility. The satellite allocation (20-30%) pursues tactical opportunities in specific sectors, themes, or asset classes identified by our AI as having high potential.",
                      suitability: "Medium",
                      timeline: "3-5 years",
                      keyBenefits: ["Potential outperformance vs. market-cap weighted indices", "Systematic approach to capturing factor premiums", "Flexible structure allowing tactical tilts"]
                    },
                    {
                      name: "Income Maximization",
                      description: "A multi-asset approach designed to generate consistent income in a low-yield environment.",
                      details: "This strategy diversifies across dividend stocks, REITs, preferred securities, corporate bonds, municipal bonds, and alternative income sources. Asset allocation is dynamically adjusted based on relative value opportunities identified by our AI.",
                      suitability: "Medium",
                      timeline: "1-3 years",
                      keyBenefits: ["Target income yield of 4-5% with moderate volatility", "Diversified income sources reducing sector-specific risks", "Inflation protection component through dividend growers"]
                    }
                  ].map((strategy, index) => (
                    <Card key={index} className="border border-blue-50 dark:border-blue-900">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-3">
                          <h3 className="text-lg font-medium">{strategy.name}</h3>
                          <Badge 
                            variant="outline" 
                            className={
                              strategy.suitability === "High"
                                ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                : "bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400"
                            }
                          >
                            {strategy.suitability} Suitability
                          </Badge>
                        </div>
                        <p className="text-sm font-medium mb-2">{strategy.description}</p>
                        <p className="text-sm text-muted-foreground mb-4">{strategy.details}</p>
                        
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">Key Benefits:</h4>
                          <ul className="list-disc pl-5 text-sm space-y-1">
                            {strategy.keyBenefits.map((benefit, i) => (
                              <li key={i} className="text-muted-foreground">{benefit}</li>
                            ))}
                          </ul>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="outline">Recommended Timeline: {strategy.timeline}</Badge>
                          <Button>
                            Implement Strategy
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

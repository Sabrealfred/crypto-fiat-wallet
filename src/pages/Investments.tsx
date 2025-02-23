
import { useState } from "react";
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  LineChart,
  PiggyBank,
  Briefcase,
  Building,
  Trophy,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const investmentProducts = [
  {
    id: "stocks",
    name: "Stock Investing",
    icon: LineChart,
    description: "Invest in the stock market with our curated portfolio of companies",
    minAmount: 100,
    expectedReturn: "8-12%",
    riskLevel: "Medium-High",
  },
  {
    id: "savings",
    name: "High-Yield Savings",
    icon: PiggyBank,
    description: "Earn more with our high-interest savings account",
    minAmount: 50,
    expectedReturn: "3-4%",
    riskLevel: "Low",
  },
  {
    id: "funds",
    name: "Mutual Funds",
    icon: Briefcase,
    description: "Professionally managed investment funds for diversified portfolios",
    minAmount: 500,
    expectedReturn: "6-10%",
    riskLevel: "Medium",
  },
  {
    id: "reits",
    name: "Real Estate",
    icon: Building,
    description: "Invest in real estate through REITs and property funds",
    minAmount: 1000,
    expectedReturn: "7-9%",
    riskLevel: "Medium",
  },
  {
    id: "metals",
    name: "Precious Metals",
    icon: Trophy,
    description: "Diversify with gold, silver, and other precious metals",
    minAmount: 250,
    expectedReturn: "5-8%",
    riskLevel: "Medium-Low",
  },
  {
    id: "crypto",
    name: "Crypto Assets",
    icon: Sparkles,
    description: "Invest in carefully selected cryptocurrency assets",
    minAmount: 100,
    expectedReturn: "10-20%",
    riskLevel: "High",
  },
];

export default function InvestmentsPage() {
  const [selectedTab, setSelectedTab] = useState("explore");

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Investment Portal</h1>
          <p className="text-muted-foreground">Explore investment opportunities and manage your portfolio</p>
        </div>

        <Tabs defaultValue="explore" className="space-y-6" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList>
            <TabsTrigger value="explore">Explore Products</TabsTrigger>
            <TabsTrigger value="portfolio">My Portfolio</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="explore" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {investmentProducts.map((product) => {
                const Icon = product.icon;
                return (
                  <Card key={product.id} className="overflow-hidden">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between">
                        <Icon className="h-8 w-8 text-primary" />
                        <div className="px-2 py-1 bg-primary/10 text-primary rounded text-sm">
                          {product.riskLevel}
                        </div>
                      </div>
                      <CardTitle className="text-xl mt-4">{product.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">
                        {product.description}
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Min. Investment</span>
                          <span className="font-medium">${product.minAmount}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Expected Return</span>
                          <span className="font-medium">{product.expectedReturn}</span>
                        </div>
                      </div>
                      <Button className="w-full flex items-center justify-center gap-2">
                        Start Investing <ArrowRight className="h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="portfolio">
            <Card>
              <CardHeader>
                <CardTitle>Your Investment Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Start investing to build your portfolio. Choose from our wide range of investment products.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Track your investment performance and analytics here. Start investing to see your returns.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

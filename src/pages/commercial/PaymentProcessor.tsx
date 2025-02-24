
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  CreditCard,
  Building2,
  ArrowRight,
  Globe,
  ShieldCheck,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentProcessorPage() {
  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Payment Processor</h1>
          <p className="text-muted-foreground">Manage your business payments and transactions efficiently</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <div className="h-8 w-8 mb-4">
                <Globe className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Global Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Accept payments from customers worldwide with multiple currency support</p>
              <Button className="w-full">
                Setup Global Payments <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-8 w-8 mb-4">
                <CreditCard className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Payment Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Configure various payment methods including cards, bank transfers, and digital wallets</p>
              <Button className="w-full">
                Manage Methods <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-8 w-8 mb-4">
                <ShieldCheck className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Security Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Configure security settings, fraud prevention, and transaction limits</p>
              <Button className="w-full">
                Security Setup <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-8 w-8 mb-4">
                <Building2 className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Business Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Integrate payment processing with your existing business systems and workflows</p>
              <Button className="w-full">
                Configure Integration <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="h-8 w-8 mb-4">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <CardTitle>Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">Track and analyze payment trends, success rates, and business metrics</p>
              <Button className="w-full">
                View Analytics <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

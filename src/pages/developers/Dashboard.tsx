
import { AppLayout } from "@/components/layout/app-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Code2, 
  Key, 
  Package, 
  FileJson, 
  Book, 
  Webhook,
  ChevronRight,
  Copy
} from "lucide-react";
import { Link } from "react-router-dom";

export default function DeveloperPortal() {
  const apiKeys = [
    {
      name: "Production API Key",
      key: "pk_live_51NxXXXXXXXXXXXXX",
      type: "Production",
      status: "Active"
    },
    {
      name: "Test API Key",
      key: "pk_test_51NxXXXXXXXXXXXXX",
      type: "Test",
      status: "Active"
    }
  ];

  const quickStartGuides = [
    {
      title: "Authentication",
      description: "Learn how to authenticate your API requests",
      icon: Key,
      link: "/developers/guides/auth"
    },
    {
      title: "Payments Integration",
      description: "Process payments through our API",
      icon: FileJson,
      link: "/developers/guides/payments"
    },
    {
      title: "Webhooks",
      description: "Configure and manage webhook endpoints",
      icon: Webhook,
      link: "/developers/guides/webhooks"
    }
  ];

  return (
    <AppLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Developer Portal</h1>
          <p className="text-muted-foreground">
            Access tools and documentation to integrate with our banking services
          </p>
        </div>

        <div className="grid gap-6">
          {/* API Keys Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5" />
                API Keys
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {apiKeys.map((apiKey, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <h3 className="font-medium">{apiKey.name}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="bg-muted px-2 py-1 rounded text-sm">
                          {apiKey.key}
                        </code>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                          onClick={() => navigator.clipboard.writeText(apiKey.key)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-sm text-muted-foreground">{apiKey.type}</span>
                      <p className="text-sm font-medium text-green-600">{apiKey.status}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Start Guides */}
          <div className="grid md:grid-cols-3 gap-4">
            {quickStartGuides.map((guide, index) => (
              <Link 
                key={index} 
                to={guide.link}
                className="block p-6 rounded-lg border hover:border-primary transition-colors"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <guide.icon className="h-5 w-5 text-primary" />
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-2">{guide.title}</h3>
                <p className="text-sm text-muted-foreground">{guide.description}</p>
              </Link>
            ))}
          </div>

          {/* API Reference Section */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code2 className="h-5 w-5" />
                  API Reference
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Book className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">Complete API Documentation</h3>
                      <p className="text-sm text-muted-foreground">
                        Explore our comprehensive API reference
                      </p>
                    </div>
                    <Button className="ml-auto" variant="outline">
                      View Docs
                    </Button>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-primary/10">
                      <Package className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-medium">SDKs & Libraries</h3>
                      <p className="text-sm text-muted-foreground">
                        Official SDKs for popular languages
                      </p>
                    </div>
                    <Button className="ml-auto" variant="outline">
                      View SDKs
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Code Sample */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileJson className="h-5 w-5" />
                  Quick Example
                </CardTitle>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
                  <code>{`
const banking = require('@banking/sdk');
const client = new banking.Client('YOUR_API_KEY');

// Initialize a payment
const payment = await client.payments.create({
  amount: 1000,
  currency: 'USD',
  description: 'Test payment'
});

// Handle the response
console.log(payment.id);
                  `.trim()}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>
  );
}

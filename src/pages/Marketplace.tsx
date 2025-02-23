
import { Button } from "@/components/ui/button";
import { Search, Filter, ArrowUpRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { AppLayout } from "@/components/layout/app-layout";

export default function MarketplacePage() {
  const services = [
    // Accounting & Finance
    {
      id: 1,
      name: "QuickBooks Integration",
      provider: "Intuit",
      description: "Connect your accounts with QuickBooks for automated bookkeeping",
      category: "Accounting",
      icon: "briefcase",
      price: "From $25/month"
    },
    {
      id: 2,
      name: "Xero Connection",
      provider: "Xero",
      description: "Sync transactions and accounts with Xero accounting software",
      category: "Accounting",
      icon: "database",
      price: "From $20/month"
    },
    {
      id: 3,
      name: "FreshBooks Sync",
      provider: "FreshBooks",
      description: "Automate your invoicing and expense tracking",
      category: "Accounting",
      icon: "receipt",
      price: "From $15/month"
    },
    // Payment Solutions
    {
      id: 4,
      name: "Stripe Connect",
      provider: "Stripe",
      description: "Process payments and manage subscriptions",
      category: "Payments",
      icon: "credit-card",
      price: "Per transaction"
    },
    {
      id: 5,
      name: "PayPal Business",
      provider: "PayPal",
      description: "Accept PayPal payments and cross-border transactions",
      category: "Payments",
      icon: "wallet",
      price: "Per transaction"
    },
    {
      id: 6,
      name: "Square Integration",
      provider: "Square",
      description: "Point of sale and payment processing solution",
      category: "Payments",
      icon: "shopping-cart",
      price: "Per transaction"
    },
    // Banking Services
    {
      id: 7,
      name: "Wise Business",
      provider: "Wise",
      description: "International payments and multi-currency accounts",
      category: "Banking",
      icon: "globe",
      price: "Per transfer"
    },
    {
      id: 8,
      name: "Revolut Business",
      provider: "Revolut",
      description: "Digital banking and international payments",
      category: "Banking",
      icon: "wallet-cards",
      price: "From $30/month"
    },
    // E-commerce
    {
      id: 9,
      name: "Shopify Connection",
      provider: "Shopify",
      description: "Integrate your online store payments",
      category: "E-commerce",
      icon: "shopping-bag",
      price: "From $29/month"
    },
    {
      id: 10,
      name: "WooCommerce Sync",
      provider: "WooCommerce",
      description: "Connect your WordPress store transactions",
      category: "E-commerce",
      icon: "store",
      price: "From $10/month"
    },
    // Business Services
    {
      id: 11,
      name: "Salesforce Integration",
      provider: "Salesforce",
      description: "CRM and sales pipeline management",
      category: "Business",
      icon: "briefcase",
      price: "From $50/month"
    },
    {
      id: 12,
      name: "HubSpot Connect",
      provider: "HubSpot",
      description: "Marketing and CRM integration",
      category: "Business",
      icon: "network",
      price: "From $45/month"
    },
    // Expense Management
    {
      id: 13,
      name: "Expensify",
      provider: "Expensify",
      description: "Automated expense reporting and tracking",
      category: "Expenses",
      icon: "receipt",
      price: "From $5/user/month"
    },
    {
      id: 14,
      name: "SAP Concur",
      provider: "SAP",
      description: "Travel and expense management solution",
      category: "Expenses",
      icon: "file",
      price: "Custom pricing"
    },
    // Payroll Services
    {
      id: 15,
      name: "ADP Workforce",
      provider: "ADP",
      description: "Payroll and HR management integration",
      category: "Payroll",
      icon: "dollar-sign",
      price: "Custom pricing"
    },
    {
      id: 16,
      name: "Gusto Integration",
      provider: "Gusto",
      description: "Modern payroll, benefits, and HR platform",
      category: "Payroll",
      icon: "users",
      price: "From $39/month"
    },
    // Investment Services
    {
      id: 17,
      name: "Plaid Connection",
      provider: "Plaid",
      description: "Connect with investment accounts and banks",
      category: "Investments",
      icon: "link",
      price: "Custom pricing"
    },
    {
      id: 18,
      name: "Acorns Business",
      provider: "Acorns",
      description: "Round-up investments for your business",
      category: "Investments",
      icon: "trending-up",
      price: "From $3/month"
    },
    // Cryptocurrency
    {
      id: 19,
      name: "Coinbase Commerce",
      provider: "Coinbase",
      description: "Accept cryptocurrency payments",
      category: "Crypto",
      icon: "bitcoin",
      price: "Per transaction"
    },
    {
      id: 20,
      name: "BitPay Integration",
      provider: "BitPay",
      description: "Cryptocurrency payment processing",
      category: "Crypto",
      icon: "dollar-sign",
      price: "1% per transaction"
    },
    // Insurance
    {
      id: 21,
      name: "Next Insurance",
      provider: "Next Insurance",
      description: "Small business insurance integration",
      category: "Insurance",
      icon: "shield",
      price: "Custom pricing"
    },
    // Tax Services
    {
      id: 22,
      name: "TaxJar",
      provider: "TaxJar",
      description: "Automated sales tax calculations",
      category: "Tax",
      icon: "calculator",
      price: "From $19/month"
    },
    // Inventory Management
    {
      id: 23,
      name: "TradeGecko",
      provider: "TradeGecko",
      description: "Inventory and order management",
      category: "Inventory",
      icon: "package",
      price: "From $39/month"
    },
    // Point of Sale
    {
      id: 24,
      name: "Clover POS",
      provider: "Clover",
      description: "Point of sale system integration",
      category: "POS",
      icon: "terminal",
      price: "Custom pricing"
    },
    // Financial Planning
    {
      id: 25,
      name: "Sage Integration",
      provider: "Sage",
      description: "Business and financial management",
      category: "Finance",
      icon: "landmark",
      price: "From $25/month"
    },
  ];

  const categories = [
    "All Services",
    "Accounting",
    "Payments",
    "Banking",
    "E-commerce",
    "Business",
    "Expenses",
    "Payroll",
    "Investments",
    "Crypto",
    "Insurance",
    "Tax",
    "Inventory",
    "POS",
    "Finance"
  ];

  return (
    <AppLayout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-semibold mb-2">Business Integrations</h1>
            <p className="text-muted-foreground">Connect your business with powerful third-party services</p>
          </div>
          <Button>
            <ArrowUpRight className="h-4 w-4 mr-2" />
            View Connected Apps
          </Button>
        </div>

        <div className="mb-6">
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="h-4 w-4 absolute left-3 top-3 text-muted-foreground" />
              <Input 
                className="pl-10" 
                placeholder="Search integrations..." 
              />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filters
            </Button>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant="outline"
                className="whitespace-nowrap"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <ArrowUpRight className="h-6 w-6 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {service.price}
                  </span>
                </div>
                <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">by {service.provider}</p>
                <p className="text-sm text-muted-foreground mb-4">
                  {service.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm px-2 py-1 bg-secondary rounded-full">
                    {service.category}
                  </span>
                  <Button size="sm">
                    Connect
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

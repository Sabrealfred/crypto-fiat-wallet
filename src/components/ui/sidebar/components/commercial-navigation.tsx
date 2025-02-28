
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Wallet,
  CreditCard,
  LineChart,
  Receipt,
  FileText,
  History,
  DollarSign,
  BriefcaseBusiness,
  BarChart,
  Code,
  ShieldCheck,
  Globe,
  Database,
  Brain
} from "lucide-react";

interface CommercialNavigationProps {
  isCollapsed: boolean;
}

export function CommercialNavigation({ isCollapsed }: CommercialNavigationProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="space-y-1">
      <Link to="/commercial/dashboard">
        <Button variant={isActive('/commercial/dashboard') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <Building2 className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Commercial Dashboard
          </span>
        </Button>
      </Link>

      {/* Treasury & Cash Management Section */}
      <Link to="/commercial/treasury">
        <Button variant={isActive('/commercial/treasury') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <Wallet className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Treasury & Cash Management
          </span>
        </Button>
      </Link>
      <Link to="/commercial/treasury/cash-flow">
        <Button variant={isActive('/commercial/treasury/cash-flow') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <LineChart className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Cash Flow Analysis
          </span>
        </Button>
      </Link>
      <Link to="/commercial/treasury/transactions">
        <Button variant={isActive('/commercial/treasury/transactions') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <Receipt className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Transaction Management
          </span>
        </Button>
      </Link>
      <Link to="/commercial/treasury/fx">
        <Button variant={isActive('/commercial/treasury/fx') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <Globe className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            FX Operations
          </span>
        </Button>
      </Link>

      {/* Analysis & Forecasting */}
      <Link to="/commercial/analytics">
        <Button variant={isActive('/commercial/analytics') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <BarChart className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Analysis & Forecasting
          </span>
        </Button>
      </Link>
      <Link to="/commercial/analytics/ml-models">
        <Button variant={isActive('/commercial/analytics/ml-models') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <Brain className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Machine Learning Models
          </span>
        </Button>
      </Link>
      <Link to="/commercial/analytics/predictive">
        <Button variant={isActive('/commercial/analytics/predictive') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <LineChart className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Predictive Analysis
          </span>
        </Button>
      </Link>
      <Link to="/commercial/analytics/trends">
        <Button variant={isActive('/commercial/analytics/trends') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <BarChart className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Trend Visualization
          </span>
        </Button>
      </Link>

      {/* Data Automation & Integration */}
      <Link to="/commercial/operations">
        <Button variant={isActive('/commercial/operations') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <Database className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Data Automation & Integration
          </span>
        </Button>
      </Link>
      <Link to="/commercial/operations/integration">
        <Button variant={isActive('/commercial/operations/integration') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <Database className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Multi-bank Integration
          </span>
        </Button>
      </Link>
      <Link to="/commercial/operations/real-time">
        <Button variant={isActive('/commercial/operations/real-time') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <Receipt className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Real-time Updates
          </span>
        </Button>
      </Link>
      <Link to="/commercial/operations/normalization">
        <Button variant={isActive('/commercial/operations/normalization') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <FileText className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Data Normalization
          </span>
        </Button>
      </Link>

      {/* Investment Management Section */}
      <Link to="/commercial/fund-management">
        <Button variant={isActive('/commercial/fund-management') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <DollarSign className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Investment Management
          </span>
        </Button>
      </Link>
      <Link to="/commercial/fund-management/portfolios">
        <Button variant={isActive('/commercial/fund-management/portfolios') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <LineChart className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Portfolio Analysis
          </span>
        </Button>
      </Link>
      <Link to="/commercial/fund-management/opportunities">
        <Button variant={isActive('/commercial/fund-management/opportunities') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <DollarSign className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Investment Opportunities
          </span>
        </Button>
      </Link>
      <Link to="/commercial/fund-management/performance">
        <Button variant={isActive('/commercial/fund-management/performance') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <BarChart className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Performance Tracking
          </span>
        </Button>
      </Link>

      {/* Risk Management */}
      <Link to="/commercial/risk-management">
        <Button variant={isActive('/commercial/risk-management') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <ShieldCheck className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Risk Management
          </span>
        </Button>
      </Link>
      <Link to="/commercial/risk-management/assessment">
        <Button variant={isActive('/commercial/risk-management/assessment') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <ShieldCheck className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Risk Assessment
          </span>
        </Button>
      </Link>
      <Link to="/commercial/risk-management/compliance">
        <Button variant={isActive('/commercial/risk-management/compliance') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <FileText className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Compliance Reporting
          </span>
        </Button>
      </Link>
      <Link to="/commercial/risk-management/market">
        <Button variant={isActive('/commercial/risk-management/market') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <LineChart className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Market Risk Analysis
          </span>
        </Button>
      </Link>

      {/* Payment Processing */}
      <Link to="/commercial/payment-processor">
        <Button variant={isActive('/commercial/payment-processor') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <CreditCard className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Payment Processing
          </span>
        </Button>
      </Link>
      <Link to="/commercial/payment-processor/real-time">
        <Button variant={isActive('/commercial/payment-processor/real-time') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <CreditCard className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Real-time Payments
          </span>
        </Button>
      </Link>
      <Link to="/commercial/payment-processor/ach">
        <Button variant={isActive('/commercial/payment-processor/ach') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <Receipt className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            ACH Processing
          </span>
        </Button>
      </Link>
      <Link to="/commercial/payment-processor/cross-border">
        <Button variant={isActive('/commercial/payment-processor/cross-border') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <Globe className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Cross-border Transfers
          </span>
        </Button>
      </Link>

      {/* Entity Management */}
      <Link to="/commercial/operations/accounts">
        <Button variant={isActive('/commercial/operations/accounts') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <Building2 className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Entity Management
          </span>
        </Button>
      </Link>
      <Link to="/commercial/operations/accounts/subsidiaries">
        <Button variant={isActive('/commercial/operations/accounts/subsidiaries') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <Building2 className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Subsidiary Management
          </span>
        </Button>
      </Link>
      <Link to="/commercial/operations/accounts/metadata">
        <Button variant={isActive('/commercial/operations/accounts/metadata') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <Database className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Custom Metadata
          </span>
        </Button>
      </Link>
      <Link to="/commercial/operations/accounts/relationships">
        <Button variant={isActive('/commercial/operations/accounts/relationships') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <BriefcaseBusiness className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Relationship Mapping
          </span>
        </Button>
      </Link>

      {/* AI Insights */}
      <Link to="/commercial/fund-management/ai-insights">
        <Button variant={isActive('/commercial/fund-management/ai-insights') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <Brain className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            AI Insights
          </span>
        </Button>
      </Link>
      <Link to="/commercial/fund-management/ai-insights/nlp">
        <Button variant={isActive('/commercial/fund-management/ai-insights/nlp') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <Brain className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Natural Language Processing
          </span>
        </Button>
      </Link>
      <Link to="/commercial/fund-management/ai-insights/cash">
        <Button variant={isActive('/commercial/fund-management/ai-insights/cash') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <Wallet className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Cash Insights
          </span>
        </Button>
      </Link>
      <Link to="/commercial/fund-management/ai-insights/recommendations">
        <Button variant={isActive('/commercial/fund-management/ai-insights/recommendations') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <LineChart className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            AI Recommendations
          </span>
        </Button>
      </Link>

      {/* Shared Services */}
      <Link to="/commercial/history">
        <Button variant={isActive('/commercial/history') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <History className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Transaction History
          </span>
        </Button>
      </Link>

      {/* Developer Portal */}
      <Link to="/developer/dashboard">
        <Button variant={isActive('/developer/dashboard') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <Code className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Developer Portal
          </span>
        </Button>
      </Link>
    </nav>
  );
}

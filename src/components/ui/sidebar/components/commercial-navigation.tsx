
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

      {/* Data Automation & Integration */}
      <Link to="/commercial/operations">
        <Button variant={isActive('/commercial/operations') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <Database className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Data Automation & Integration
          </span>
        </Button>
      </Link>
      <Link to="/commercial/payroll">
        <Button variant={isActive('/commercial/payroll') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <Receipt className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Payroll
          </span>
        </Button>
      </Link>
      <Link to="/commercial/invoices">
        <Button variant={isActive('/commercial/invoices') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <FileText className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Invoicing
          </span>
        </Button>
      </Link>
      <Link to="/commercial/trade-finance">
        <Button variant={isActive('/commercial/trade-finance') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <BriefcaseBusiness className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Trade Finance
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
      <Link to="/commercial/fund-management/portfolios/ai">
        <Button variant={isActive('/commercial/fund-management/portfolios/ai') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <Brain className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            AI Portfolios
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

      {/* Payment Processing */}
      <Link to="/commercial/payment-processor">
        <Button variant={isActive('/commercial/payment-processor') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <CreditCard className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Payment Processing
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

      {/* AI Insights */}
      <Link to="/commercial/fund-management/ai-insights">
        <Button variant={isActive('/commercial/fund-management/ai-insights') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <Brain className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            AI Insights
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

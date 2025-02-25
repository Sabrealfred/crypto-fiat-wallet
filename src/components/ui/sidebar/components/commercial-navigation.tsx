
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

      {/* Treasury Section */}
      <Link to="/commercial/treasury">
        <Button variant={isActive('/commercial/treasury') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <DollarSign className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Treasury Management
          </span>
        </Button>
      </Link>
      <Link to="/commercial/treasury/cash-flow">
        <Button variant={isActive('/commercial/treasury/cash-flow') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <LineChart className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Cash Flow
          </span>
        </Button>
      </Link>
      <Link to="/commercial/treasury/fx">
        <Button variant={isActive('/commercial/treasury/fx') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <BarChart className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            FX Operations
          </span>
        </Button>
      </Link>

      {/* Operations Section */}
      <Link to="/commercial/operations">
        <Button variant={isActive('/commercial/operations') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <Building2 className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Operations
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

      {/* Fund Management Section */}
      <Link to="/commercial/fund-management">
        <Button variant={isActive('/commercial/fund-management') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <Wallet className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Fund Management
          </span>
        </Button>
      </Link>
      <Link to="/commercial/fund-management/portfolios">
        <Button variant={isActive('/commercial/fund-management/portfolios') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <LineChart className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Portfolios
          </span>
        </Button>
      </Link>
      <Link to="/commercial/fund-management/portfolios/ai">
        <Button variant={isActive('/commercial/fund-management/portfolios/ai') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''} pl-8`}>
          <BarChart className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            AI Portfolios
          </span>
        </Button>
      </Link>

      {/* Shared Services */}
      <Link to="/commercial/cards">
        <Button variant={isActive('/commercial/cards') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <CreditCard className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Corporate Cards
          </span>
        </Button>
      </Link>

      <Link to="/commercial/history">
        <Button variant={isActive('/commercial/history') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <History className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Transaction History
          </span>
        </Button>
      </Link>
    </nav>
  );
}

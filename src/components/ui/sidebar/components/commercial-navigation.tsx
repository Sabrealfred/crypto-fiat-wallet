
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

      <Link to="/commercial/accounts">
        <Button variant={isActive('/commercial/accounts') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <Wallet className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Business Accounts
          </span>
        </Button>
      </Link>

      <Link to="/commercial/treasury">
        <Button variant={isActive('/commercial/treasury') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <DollarSign className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Treasury Management
          </span>
        </Button>
      </Link>

      <Link to="/commercial/trade-finance">
        <Button variant={isActive('/commercial/trade-finance') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <BriefcaseBusiness className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Trade Finance
          </span>
        </Button>
      </Link>

      <Link to="/commercial/payroll">
        <Button variant={isActive('/commercial/payroll') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <Receipt className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Payroll
          </span>
        </Button>
      </Link>

      <Link to="/commercial/invoices">
        <Button variant={isActive('/commercial/invoices') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <FileText className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Invoicing
          </span>
        </Button>
      </Link>

      <Link to="/commercial/analytics">
        <Button variant={isActive('/commercial/analytics') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <BarChart className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Analytics
          </span>
        </Button>
      </Link>

      <Link to="/commercial/cards">
        <Button variant={isActive('/commercial/cards') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <CreditCard className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Corporate Cards
          </span>
        </Button>
      </Link>

      <Link to="/commercial/investments">
        <Button variant={isActive('/commercial/investments') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <LineChart className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Investments
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

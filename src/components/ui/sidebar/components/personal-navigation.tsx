
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Wallet,
  CreditCard,
  LineChart,
  Building,
  Receipt,
  History,
  Settings,
  DollarSign,
  Home,
  ShoppingBag
} from "lucide-react";

interface PersonalNavigationProps {
  isCollapsed: boolean;
}

export function PersonalNavigation({ isCollapsed }: PersonalNavigationProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="space-y-1">
      <Link to="/personal">
        <Button variant={isActive('/personal') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <Home className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Dashboard
          </span>
        </Button>
      </Link>

      <Link to="/business/dashboard">
        <Button variant={isActive('/business/dashboard') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <Building className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Business Dashboard
          </span>
        </Button>
      </Link>

      <Link to="/private/dashboard">
        <Button variant={isActive('/private/dashboard') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <Settings className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Private Banking
          </span>
        </Button>
      </Link>

      <Link to="/developer/dashboard">
        <Button variant={isActive('/developer/dashboard') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <Settings className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Developer Dashboard
          </span>
        </Button>
      </Link>

      <Link to="/wallet">
        <Button variant={isActive('/wallet') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <Wallet className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            My Wallet
          </span>
        </Button>
      </Link>

      <Link to="/cards">
        <Button variant={isActive('/cards') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <CreditCard className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Cards
          </span>
        </Button>
      </Link>
      
      <Link to="/investments">
        <Button variant={isActive('/investments') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <LineChart className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Investments
          </span>
        </Button>
      </Link>

      <Link to="/transfer">
        <Button variant={isActive('/transfer') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <Building2 className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Transfer
          </span>
        </Button>
      </Link>

      <Link to="/bills">
        <Button variant={isActive('/bills') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <Receipt className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Bill Pay
          </span>
        </Button>
      </Link>

      <Link to="/deposits">
        <Button variant={isActive('/deposits') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <DollarSign className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Check Deposit
          </span>
        </Button>
      </Link>

      <Link to="/history">
        <Button variant={isActive('/history') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <History className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            History
          </span>
        </Button>
      </Link>

      <Link to="/marketplace">
        <Button variant={isActive('/marketplace') ? 'secondary' : 'ghost'} className={`w-full justify-start ${isCollapsed ? 'px-2' : ''}`}>
          <ShoppingBag className="h-4 w-4" />
          <span className={`ml-2 transition-opacity duration-300 ${isCollapsed ? 'opacity-0 w-0' : 'opacity-100'}`}>
            Marketplace
          </span>
        </Button>
      </Link>
    </nav>
  );
}


import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Wallet,
  CreditCard,
  LineChart,
  Building,
  Receipt,
  FileText,
  History,
  Settings,
  DollarSign,
  BriefcaseBusiness,
  BarChart,
  Home,
  Store,
  ShoppingBag
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface NavigationItemsProps {
  isCollapsed: boolean;
}

export function NavigationItems({ isCollapsed }: NavigationItemsProps) {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  const { data: currentOrg } = useQuery({
    queryKey: ['current-organization'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data: userOrgs, error } = await supabase
        .from('user_organizations')
        .select(`
          organization:organizations (
            id,
            name,
            type
          )
        `)
        .eq('user_id', user.id)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      return userOrgs?.organization;
    },
  });

  // Menú para organizaciones comerciales
  if (currentOrg?.type === 'commercial') {
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

  // Menú para banca personal
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

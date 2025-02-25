
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, DollarSign, TrendingUp, Users, FileWarning, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

export function QuickAccessGrid() {
  return (
    <Card className="mb-8 bg-muted/50">
      <CardHeader>
        <CardTitle className="text-lg">Quick Access - Commercial Banking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Link to="/commercial/treasury">
            <Button variant="outline" className="w-full justify-start">
              <LineChart className="w-4 h-4 mr-2" />
              Treasury Dashboard
            </Button>
          </Link>
          <Link to="/commercial/treasury/cash-flow">
            <Button variant="outline" className="w-full justify-start">
              <DollarSign className="w-4 h-4 mr-2" />
              Cash Flow Analysis
            </Button>
          </Link>
          <Link to="/commercial/treasury/transactions">
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="w-4 h-4 mr-2" />
              Transaction Management
            </Button>
          </Link>
          <Link to="/commercial/payroll">
            <Button variant="outline" className="w-full justify-start">
              <Users className="w-4 h-4 mr-2" />
              Payroll
            </Button>
          </Link>
          <Link to="/commercial/invoices">
            <Button variant="outline" className="w-full justify-start">
              <FileWarning className="w-4 h-4 mr-2" />
              Invoices
            </Button>
          </Link>
          <Link to="/commercial/expenses">
            <Button variant="outline" className="w-full justify-start">
              <Building2 className="w-4 h-4 mr-2" />
              Expenses
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}


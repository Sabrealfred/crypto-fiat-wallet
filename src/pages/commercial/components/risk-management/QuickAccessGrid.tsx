
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, DollarSign, TrendingUp, Users, FileWarning, Building2 } from "lucide-react";
import { Link } from "react-router-dom";

export function QuickAccessGrid() {
  return (
    <Card className="mb-8 bg-muted/50">
      <CardHeader>
        <CardTitle className="text-lg">Quick Access - Risk Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Link to="/commercial/risk-management">
            <Button variant="outline" className="w-full justify-start">
              <LineChart className="w-4 h-4 mr-2" />
              Risk Overview
            </Button>
          </Link>
          <Link to="/commercial/risk-management/market">
            <Button variant="outline" className="w-full justify-start">
              <DollarSign className="w-4 h-4 mr-2" />
              Market Risk
            </Button>
          </Link>
          <Link to="/commercial/risk-management/operational">
            <Button variant="outline" className="w-full justify-start">
              <TrendingUp className="w-4 h-4 mr-2" />
              Operational Risk
            </Button>
          </Link>
          <Link to="/commercial/risk-management/compliance">
            <Button variant="outline" className="w-full justify-start">
              <Users className="w-4 h-4 mr-2" />
              Compliance
            </Button>
          </Link>
          <Link to="/commercial/risk-management/reports">
            <Button variant="outline" className="w-full justify-start">
              <FileWarning className="w-4 h-4 mr-2" />
              Risk Reports
            </Button>
          </Link>
          <Link to="/commercial/risk-management/settings">
            <Button variant="outline" className="w-full justify-start">
              <Building2 className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

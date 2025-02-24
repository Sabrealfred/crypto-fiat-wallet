
import { Link } from "react-router-dom";
import { 
  Users, 
  FileText, 
  Briefcase, 
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Receipt,
  Wallet
} from "lucide-react";
import { Button } from "@/components/ui/button";

export function QuickActions() {
  const quickTransferActions = [
    {
      icon: ArrowUpRight,
      label: "Enviar dinero",
      to: "/transfer",
      variant: "default" as const
    },
    {
      icon: ArrowDownLeft,
      label: "Recibir pago",
      to: "/transfer?type=receive",
      variant: "outline" as const
    },
    {
      icon: CreditCard,
      label: "Pagar factura",
      to: "/bills",
      variant: "outline" as const
    },
    {
      icon: Receipt,
      label: "Generar factura",
      to: "/commercial/invoices",
      variant: "outline" as const
    }
  ];

  return (
    <div className="glass-card p-6">
      <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-3">
          {quickTransferActions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              asChild
              className="w-full"
            >
              <Link to={action.to}>
                <action.icon className="mr-2 h-4 w-4" />
                {action.label}
              </Link>
            </Button>
          ))}
        </div>

        <div className="space-y-3">
          <Link to="/commercial/payroll" className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Payroll Management</h3>
                <p className="text-sm text-muted-foreground">Process employee payments</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>

          <Link to="/commercial/invoices" className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Invoice Management</h3>
                <p className="text-sm text-muted-foreground">Create and manage invoices</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>

          <Link to="/commercial/expenses" className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Expense Tracking</h3>
                <p className="text-sm text-muted-foreground">Monitor business expenses</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>

          <Link to="/commercial/payment-processor" className="flex items-center justify-between p-3 hover:bg-accent rounded-lg transition-colors">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Payment Processor</h3>
                <p className="text-sm text-muted-foreground">Manage business payments</p>
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground" />
          </Link>
        </div>
      </div>
    </div>
  );
}


import { FC, PropsWithChildren, useState } from "react";
import { AppFooter } from "./app-footer";
import { UserMenu } from "./user-menu";
import { DarkModeToggle } from "./dark-mode-toggle";
import { AIAssistant } from "./ai-assistant";
import { Separator } from "@/components/ui/separator";
import { 
  Sidebar, 
  SidebarContent, 
  SidebarMenu, 
  SidebarMenuItem, 
  SidebarMenuButton,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { 
  Home, 
  BarChart, 
  Database, 
  DollarSign, 
  ShieldCheck, 
  CreditCard, 
  Building2,
  Brain,
  Globe
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Toggle dark mode function
  const handleToggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };
  
  // Mock logout function
  const handleLogout = async () => {
    console.log("Logging out...");
    // Actual logout logic would go here
    return Promise.resolve();
  };
  
  // Footer sections data
  const footerSections = [
    {
      title: "Company",
      links: [
        { label: "About Us", url: "/about" },
        { label: "Careers", url: "/careers" },
        { label: "Press", url: "/press" },
        { label: "Contact", url: "/contact" }
      ]
    },
    {
      title: "Legal",
      links: [
        { label: "Terms of Service", url: "/terms" },
        { label: "Privacy Policy", url: "/privacy" },
        { label: "Cookie Policy", url: "/cookies" },
        { label: "Security", url: "/security" }
      ]
    },
    {
      title: "Support",
      links: [
        { label: "Help Center", url: "/help" },
        { label: "FAQs", url: "/faqs" },
        { label: "Contact Support", url: "/support" }
      ]
    }
  ];
  
  // Handle toggle section in footer
  const handleToggleSection = (index: number) => {
    console.log(`Toggled section ${index}`);
    // Implementation would update state to toggle sections
  };

  // Menu items with navigation
  const menuItems = [
    { 
      title: "Dashboard", 
      path: "/commercial/dashboard", 
      icon: Home 
    },
    { 
      title: "Treasury & Cash", 
      path: "/commercial/treasury", 
      icon: Globe 
    },
    { 
      title: "Analytics", 
      path: "/commercial/analytics", 
      icon: BarChart 
    },
    { 
      title: "Operations", 
      path: "/commercial/operations", 
      icon: Database 
    },
    { 
      title: "Fund Management", 
      path: "/commercial/fund-management", 
      icon: DollarSign 
    },
    { 
      title: "Risk Management", 
      path: "/commercial/risk-management", 
      icon: ShieldCheck 
    },
    { 
      title: "Payment Processing", 
      path: "/commercial/payment-processor", 
      icon: CreditCard 
    },
    { 
      title: "Entity Management", 
      path: "/commercial/entity-management", 
      icon: Building2 
    },
    { 
      title: "AI Insights", 
      path: "/commercial/fund-management/ai-insights", 
      icon: Brain 
    }
  ];

  // Check if a menu item is active
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col">
        <header className="border-b z-10">
          <div className="container flex justify-between items-center py-3">
            <div>
              <SidebarTrigger />
            </div>
            <div className="flex items-center gap-4">
              <DarkModeToggle 
                isDarkMode={isDarkMode} 
                onToggle={handleToggleDarkMode} 
              />
              <UserMenu 
                onLogout={handleLogout} 
              />
            </div>
          </div>
        </header>

        <div className="flex-1 flex">
          <Sidebar side="left" variant="sidebar">
            <SidebarHeader className="p-4">
              <h3 className="text-xl font-bold">Commercial Banking</h3>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {menuItems.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      onClick={() => navigate(item.path)}
                      isActive={isActive(item.path)}
                      tooltip={item.title}
                    >
                      <item.icon className="mr-2" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
          <main className="flex-1 pb-12 pt-4">{children}</main>
          <AIAssistant />
        </div>

        <Separator />
        <AppFooter 
          company={true}
          legal={true}
          support={true}
          footerSections={footerSections}
          onToggleSection={handleToggleSection}
        />
      </div>
    </SidebarProvider>
  );
};

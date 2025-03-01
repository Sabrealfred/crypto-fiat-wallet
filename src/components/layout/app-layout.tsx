
import { FC, PropsWithChildren, useState, useEffect } from "react";
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
  SidebarTrigger,
  SidebarFooter,
  SidebarSeparator
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
  Globe,
  Settings,
  Code
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Toggle dark mode function
  const handleToggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
    // Aplicar clase dark al elemento HTML
    document.documentElement.classList.toggle('dark');
  };
  
  // Verificar el tema preferido del usuario al cargar
  useEffect(() => {
    const isDark = localStorage.getItem('theme') === 'dark' || 
      (localStorage.getItem('theme') !== 'light' && 
      window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);
  
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

  // Menu items con navegación
  const mainMenuItems = [
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

  // Items adicionales para el menú inferior
  const bottomMenuItems = [
    {
      title: "Marketplace",
      path: "/marketplace",
      icon: Globe
    },
    {
      title: "Developer Portal",
      path: "/developer/dashboard",
      icon: Code
    },
    {
      title: "Settings",
      path: "/settings",
      icon: Settings
    }
  ];

  // Check if a menu item is active
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex flex-col">
        <header className="border-b z-10 bg-background">
          <div className="container flex justify-between items-center py-3">
            <div className="flex items-center gap-2">
              <SidebarTrigger />
              <h2 className="text-lg font-semibold hidden sm:block">WYMU Banking</h2>
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
                {mainMenuItems.map((item) => (
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
              
              <SidebarSeparator className="my-4" />
              
              <SidebarMenu>
                {bottomMenuItems.map((item) => (
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
            
            <SidebarFooter className="p-4">
              <div className="text-sm text-muted-foreground">
                <p>Commercial Banking v1.2.4</p>
                <p className="mt-1">© 2024 WYMU Banking</p>
              </div>
            </SidebarFooter>
          </Sidebar>
          <main className="flex-1 pb-12 pt-4 overflow-auto">{children}</main>
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

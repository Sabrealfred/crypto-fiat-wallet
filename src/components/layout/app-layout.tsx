
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
  Code,
  Cpu,
  Sparkles
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Toggle dark mode function
  const handleToggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
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
      icon: Building2,
      className: "text-blue-600 dark:text-blue-400 font-medium" 
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
                      className={item.className}
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
          
          {/* DATACLOUD AI area */}
          <div className="hidden lg:block w-72 border-l p-4 bg-gradient-to-b from-background to-background/90 dark:from-background/90 dark:to-background/80">
            <div className="flex items-center gap-2 mb-4">
              <Cpu className="h-5 w-5 text-blue-500" />
              <h3 className="font-semibold">DATACLOUD AI</h3>
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 text-xs px-2 py-0.5 rounded-full">New</span>
            </div>
            
            <div className="space-y-4">
              <Card className="border-blue-100 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="h-4 w-4 text-blue-600" />
                    <h4 className="font-medium text-sm">AI Insights</h4>
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">
                    Custom insights for your current activities and financial trends.
                  </p>
                  <Button size="sm" variant="outline" className="w-full text-xs bg-blue-100/80 dark:bg-blue-900/30 border-blue-200 dark:border-blue-800 hover:bg-blue-200 dark:hover:bg-blue-900/50">
                    View Insights
                  </Button>
                </CardContent>
              </Card>
              
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Recent Activities</h4>
                <div className="text-xs space-y-3">
                  <div className="flex items-start gap-2">
                    <div className="p-1.5 rounded-full bg-green-100 dark:bg-green-900/30">
                      <DollarSign className="h-3 w-3 text-green-700 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="font-medium">Fund transfer completed</p>
                      <p className="text-muted-foreground">$45,000 to Account #4872</p>
                      <p className="text-muted-foreground mt-0.5">10 minutes ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <div className="p-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30">
                      <BarChart className="h-3 w-3 text-blue-700 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="font-medium">Risk analysis completed</p>
                      <p className="text-muted-foreground">Q3 risk report is ready</p>
                      <p className="text-muted-foreground mt-0.5">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
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

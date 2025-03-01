
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useMobile } from "@/hooks/use-mobile";
import { Sidebar } from "@/components/ui/sidebar";
import { UserMenu } from "@/components/layout/user-menu";
import { AppFooter } from "@/components/layout/app-footer";
import { AIAssistant } from "@/components/layout/ai-assistant";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, ChevronRight } from "lucide-react";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [showAI, setShowAI] = useState(false);
  
  const location = useLocation();
  const isMobile = useMobile();
  
  useEffect(() => {
    function updateSidebarState() {
      if (window.innerWidth < 1024) {
        setSidebarCollapsed(true);
      } else {
        setSidebarCollapsed(false);
      }
    }
    
    updateSidebarState();
    window.addEventListener('resize', updateSidebarState);
    
    return () => {
      window.removeEventListener('resize', updateSidebarState);
    };
  }, []);
  
  // Parse route to determine the current section
  const isCommercial = location.pathname.includes("/commercial");
  const isAdmin = location.pathname.includes("/admin");
  const isPrivate = location.pathname.includes("/private");
  
  // Reset AI state when changing routes
  useEffect(() => {
    setShowAI(false);
  }, [location.pathname]);
  
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar 
        collapsed={sidebarCollapsed} 
        onCollapsedChange={setSidebarCollapsed}
        section={isCommercial ? "commercial" : isAdmin ? "admin" : isPrivate ? "private" : "personal"}
      />
      <main className="flex-1 flex flex-col">
        <header className="h-14 border-b flex items-center justify-between px-4 lg:px-6">
          <div></div>
          <UserMenu />
        </header>
        <div className="flex-1 overflow-auto">
          {children}
        </div>
        
        {/* AI Assistant toggle button */}
        <div className="fixed bottom-4 right-4 z-50">
          <Button
            onClick={() => setShowAI(prev => !prev)}
            variant="default"
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-3 h-12 w-12 shadow-lg"
          >
            <Sparkles className="h-5 w-5" />
            <span className="sr-only">Toggle AI Assistant</span>
          </Button>
        </div>
        
        {/* AI Assistant sidebar */}
        {showAI && (
          <div className="fixed top-0 right-0 bottom-0 w-full sm:w-96 bg-background border-l shadow-xl z-40 overflow-auto">
            <AIAssistant onClose={() => setShowAI(false)} />
          </div>
        )}
        
        {/* DATACLOUD AI Banner */}
        <div className="fixed bottom-20 right-4 z-40 w-64 sm:w-80">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 border-0 text-white shadow-lg">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="h-5 w-5" />
                <h3 className="font-semibold">DATACLOUD AI</h3>
              </div>
              <p className="text-sm mb-3">Unlock advanced insights with our AI-powered analytics platform</p>
              <Button size="sm" variant="secondary" className="w-full text-blue-700 hover:text-blue-800">
                Explore Features <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>
        
        <AppFooter />
      </main>
    </div>
  );
}


import { useState } from "react";
import { SidebarNav } from "@/components/ui/sidebar-nav";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Settings, LogOut, CircleUser, ChevronDown, Menu, ExternalLink, Link2, ChevronUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function AppLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isFooterMenuOpen, setIsFooterMenuOpen] = useState({
    company: true,
    legal: true,
    support: true,
  });

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("Sesión cerrada exitosamente");
      navigate("/auth");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const toggleFooterSection = (section: keyof typeof isFooterMenuOpen) => {
    setIsFooterMenuOpen(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-white to-blue-50">
      <div className="flex-1 flex">
        {/* Sidebar Toggle Button for Mobile */}
        <Button
          variant="ghost"
          size="icon"
          className="fixed top-4 left-4 z-50 md:hidden"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Sidebar with overlay for mobile */}
        <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} fixed inset-0 z-40 md:relative md:translate-x-0 transition-transform duration-200 ease-in-out`}>
          <div className="absolute inset-0 bg-black/50 md:hidden" onClick={() => setIsSidebarOpen(false)} />
          <SidebarNav className="relative z-50" />
        </div>

        <div className="flex-1">
          <div className="p-4 flex justify-end">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <div>
                    <h2 className="text-xl font-semibold text-left">Leonardo C</h2>
                    <p className="text-sm text-muted-foreground text-left">leonardo@gmail.com</p>
                  </div>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <CircleUser className="mr-2 h-4 w-4" />
                    <span>Perfil</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configuración</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Cerrar sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-auto bg-white/80 backdrop-blur-md border-t">
        <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-primary">WYMU</h2>
              <p className="text-sm text-muted-foreground">
                Simplifying your financial journey with secure and innovative digital banking solutions.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="sm">
                  <ExternalLink className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Link2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Company Section */}
            <div>
              <Button
                variant="ghost"
                className="flex items-center justify-between w-full mb-2 md:mb-4"
                onClick={() => toggleFooterSection('company')}
              >
                <span className="font-semibold">Company</span>
                {isFooterMenuOpen.company ? (
                  <ChevronUp className="h-4 w-4 md:hidden" />
                ) : (
                  <ChevronDown className="h-4 w-4 md:hidden" />
                )}
              </Button>
              <div className={`space-y-2 ${isFooterMenuOpen.company ? 'block' : 'hidden md:block'}`}>
                <Button variant="link" className="text-muted-foreground hover:text-primary">About Us</Button>
                <Button variant="link" className="text-muted-foreground hover:text-primary">Careers</Button>
                <Button variant="link" className="text-muted-foreground hover:text-primary">Press</Button>
                <Button variant="link" className="text-muted-foreground hover:text-primary">Blog</Button>
              </div>
            </div>

            {/* Legal Section */}
            <div>
              <Button
                variant="ghost"
                className="flex items-center justify-between w-full mb-2 md:mb-4"
                onClick={() => toggleFooterSection('legal')}
              >
                <span className="font-semibold">Legal</span>
                {isFooterMenuOpen.legal ? (
                  <ChevronUp className="h-4 w-4 md:hidden" />
                ) : (
                  <ChevronDown className="h-4 w-4 md:hidden" />
                )}
              </Button>
              <div className={`space-y-2 ${isFooterMenuOpen.legal ? 'block' : 'hidden md:block'}`}>
                <Button variant="link" className="text-muted-foreground hover:text-primary">Privacy Policy</Button>
                <Button variant="link" className="text-muted-foreground hover:text-primary">Terms of Service</Button>
                <Button variant="link" className="text-muted-foreground hover:text-primary">Cookie Policy</Button>
                <Button variant="link" className="text-muted-foreground hover:text-primary">Licenses</Button>
              </div>
            </div>

            {/* Support Section */}
            <div>
              <Button
                variant="ghost"
                className="flex items-center justify-between w-full mb-2 md:mb-4"
                onClick={() => toggleFooterSection('support')}
              >
                <span className="font-semibold">Support</span>
                {isFooterMenuOpen.support ? (
                  <ChevronUp className="h-4 w-4 md:hidden" />
                ) : (
                  <ChevronDown className="h-4 w-4 md:hidden" />
                )}
              </Button>
              <div className={`space-y-2 ${isFooterMenuOpen.support ? 'block' : 'hidden md:block'}`}>
                <Button variant="link" className="text-muted-foreground hover:text-primary">Help Center</Button>
                <Button variant="link" className="text-muted-foreground hover:text-primary">Contact Us</Button>
                <Button variant="link" className="text-muted-foreground hover:text-primary">Security</Button>
                <Button variant="link" className="text-muted-foreground hover:text-primary">Status</Button>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center md:text-left">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <p>© 2024 Wymu. All rights reserved. NMLS ID: 123456</p>
              <p className="md:text-right">
                Deposits are FDIC insured up to $250,000 per depositor
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

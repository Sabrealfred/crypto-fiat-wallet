
import { FC, PropsWithChildren, useState } from "react";
import { AppFooter } from "./app-footer";
import { UserMenu } from "./user-menu";
import { DarkModeToggle } from "./dark-mode-toggle";
import { AIAssistant } from "./ai-assistant";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  
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

  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col">
        <header className="border-b z-10">
          <div className="container flex justify-between items-center py-3">
            <div></div>
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

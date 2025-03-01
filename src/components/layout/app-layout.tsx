
import { ReactNode } from "react";
import { Sidebar } from "@/components/ui/sidebar";
import { AppFooter } from "@/components/layout/app-footer";
import { AIAssistant } from "@/components/layout/ai-assistant";

interface AppLayoutProps {
  children: ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col antialiased">
      <div className="flex flex-1 flex-col md:flex-row">
        <Sidebar />
        <main className="flex-1 relative">
          {children}
          <AppFooter 
            company={true}
            legal={true}
            support={true}
            footerSections={[
              { title: "Quick Links", links: [
                { label: "Dashboard", url: "/commercial" },
                { label: "Analytics", url: "/commercial/analytics" },
                { label: "Risk Management", url: "/commercial/risk-management" },
                { label: "Entity Management", url: "/commercial/entity-management" }
              ]},
              { title: "Resources", links: [
                { label: "Documentation", url: "#" },
                { label: "API", url: "#" },
                { label: "Support", url: "#" }
              ]},
              { title: "Legal", links: [
                { label: "Privacy Policy", url: "#" },
                { label: "Terms of Service", url: "#" }
              ]}
            ]}
            onToggleSection={(index) => console.log(`Toggled section ${index}`)}
          />
        </main>
        <AIAssistant />
      </div>
    </div>
  );
}

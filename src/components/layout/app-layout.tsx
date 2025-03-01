
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
          <AppFooter />
        </main>
        <AIAssistant />
      </div>
    </div>
  );
}

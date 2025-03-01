
import { FC, PropsWithChildren } from "react";
import { AppFooter } from "./app-footer";
import { UserMenu } from "./user-menu";
import { DarkModeToggle } from "./dark-mode-toggle";
import { AIAssistant } from "./ai-assistant";
import { Separator } from "@/components/ui/separator";
import { SidebarProvider } from "@/components/ui/sidebar";

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex flex-col">
        <header className="border-b z-10">
          <div className="container flex justify-between items-center py-3">
            <div></div>
            <div className="flex items-center gap-4">
              <DarkModeToggle />
              <UserMenu />
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
        />
      </div>
    </SidebarProvider>
  );
};

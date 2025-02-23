
import { AppLayout } from "@/components/layout/app-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { KYCVerification } from "@/components/kyc/KYCVerification";
import { User, Shield, Bell, Key, Wallet } from "lucide-react";

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="p-4 sm:p-6 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-xl sm:text-2xl font-semibold mb-2">Settings</h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <TabsList className="bg-background w-full sm:w-auto inline-flex">
              <TabsTrigger value="profile" className="flex items-center gap-2 whitespace-nowrap">
                <User className="h-4 w-4" />
                Profile
              </TabsTrigger>
              <TabsTrigger value="verification" className="flex items-center gap-2 whitespace-nowrap">
                <Shield className="h-4 w-4" />
                Verification
              </TabsTrigger>
              <TabsTrigger value="notifications" className="flex items-center gap-2 whitespace-nowrap">
                <Bell className="h-4 w-4" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2 whitespace-nowrap">
                <Key className="h-4 w-4" />
                Security
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center gap-2 whitespace-nowrap">
                <Wallet className="h-4 w-4" />
                Payment
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="profile">
            <Card className="p-4 sm:p-6">
              {/* Profile settings content */}
            </Card>
          </TabsContent>

          <TabsContent value="verification">
            <KYCVerification />
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="p-4 sm:p-6">
              {/* Notifications settings content */}
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="p-4 sm:p-6">
              {/* Security settings content */}
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card className="p-4 sm:p-6">
              {/* Payment settings content */}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

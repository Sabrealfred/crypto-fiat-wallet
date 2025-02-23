import { AppLayout } from "@/components/layout/app-layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { KYCVerification } from "@/components/kyc/KYCVerification";
import { User, Shield, Bell, Key, Wallet } from "lucide-react";

export default function SettingsPage() {
  return (
    <AppLayout>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="bg-background">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="verification" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Verification
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Key className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="payment" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Payment
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              {/* Profile settings content */}
            </Card>
          </TabsContent>

          <TabsContent value="verification">
            <KYCVerification />
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              {/* Notifications settings content */}
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card>
              {/* Security settings content */}
            </Card>
          </TabsContent>

          <TabsContent value="payment">
            <Card>
              {/* Payment settings content */}
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}

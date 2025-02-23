
import { Button } from "@/components/ui/button";
import { 
  User, 
  Shield, 
  CreditCard, 
  Bell, 
  Globe,
  ChevronRight
} from "lucide-react";

export default function SettingsPage() {
  const settingsSections = [
    {
      title: "Profile Settings",
      icon: User,
      items: [
        { name: "Personal Information", description: "Update your personal details" },
        { name: "Email & Phone", description: "Manage your contact information" },
        { name: "Location", description: "Set your preferred location" }
      ]
    },
    {
      title: "Security",
      icon: Shield,
      items: [
        { name: "Password", description: "Change your password" },
        { name: "Two-Factor Authentication", description: "Add extra security to your account" },
        { name: "Security Questions", description: "Manage your security questions" }
      ]
    },
    {
      title: "Payment Methods",
      icon: CreditCard,
      items: [
        { name: "Cards", description: "Manage your cards" },
        { name: "Bank Accounts", description: "Link your bank accounts" },
        { name: "Payment Preferences", description: "Set your default payment method" }
      ]
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        { name: "Push Notifications", description: "Manage your mobile notifications" },
        { name: "Email Notifications", description: "Choose what emails you receive" },
        { name: "Transaction Alerts", description: "Set up transaction notifications" }
      ]
    },
    {
      title: "Preferences",
      icon: Globe,
      items: [
        { name: "Language", description: "Choose your preferred language" },
        { name: "Currency", description: "Set your default currency" },
        { name: "Time Zone", description: "Update your time zone" }
      ]
    }
  ];

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <div className="space-y-6">
        {settingsSections.map((section) => (
          <div key={section.title} className="bg-white/70 backdrop-blur-sm rounded-xl overflow-hidden">
            <div className="p-4 border-b flex items-center gap-2">
              <section.icon className="h-5 w-5 text-muted-foreground" />
              <h2 className="font-semibold">{section.title}</h2>
            </div>
            <div className="divide-y">
              {section.items.map((item) => (
                <Button
                  key={item.name}
                  variant="ghost"
                  className="w-full justify-between p-4 h-auto"
                >
                  <div className="text-left">
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

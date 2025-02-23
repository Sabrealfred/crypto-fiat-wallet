
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  User, 
  Shield, 
  CreditCard, 
  Bell, 
  Globe,
  ChevronRight,
  Check,
  X
} from "lucide-react";
import { AppLayout } from "@/components/layout/app-layout";
import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SettingsPage() {
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    preferredLanguage: "",
    preferredCurrency: "",
  });

  // Fetch user profile
  const { data: profile, refetch: refetchProfile } = useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setFormData({
        firstName: data.first_name || '',
        lastName: data.last_name || '',
        phoneNumber: data.phone_number || '',
        preferredLanguage: data.preferred_language || 'en',
        preferredCurrency: data.preferred_currency || 'USD',
      });
      return data;
    }
  });

  // Fetch available currencies
  const { data: currencies } = useQuery({
    queryKey: ['currencies'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('currencies')
        .select('*')
        .eq('is_active', true);
      
      if (error) throw error;
      return data;
    }
  });

  // Update profile mutation
  const updateProfile = useMutation({
    mutationFn: async (updates: Partial<typeof formData>) => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;
      return true;
    },
    onSuccess: () => {
      toast.success('Settings updated successfully');
      refetchProfile();
      setIsEditing(null);
    },
    onError: (error) => {
      toast.error(error.message);
    }
  });

  const handleSave = (field: string) => {
    const updates: any = {};
    switch (field) {
      case 'name':
        updates.first_name = formData.firstName;
        updates.last_name = formData.lastName;
        break;
      case 'phone':
        updates.phone_number = formData.phoneNumber;
        break;
      case 'language':
        updates.preferred_language = formData.preferredLanguage;
        break;
      case 'currency':
        updates.preferred_currency = formData.preferredCurrency;
        break;
    }
    updateProfile.mutate(updates);
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
    { code: 'de', name: 'Deutsch' },
  ];

  const settingsSections = [
    {
      title: "Profile Settings",
      icon: User,
      items: [
        {
          name: "Personal Information",
          description: "Update your personal details",
          content: (
            <div className="space-y-4 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">First Name</label>
                  <Input
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    disabled={isEditing !== 'name'}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Last Name</label>
                  <Input
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    disabled={isEditing !== 'name'}
                  />
                </div>
              </div>
              {isEditing === 'name' && (
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(null)}
                  >
                    <X className="w-4 h-4 mr-1" /> Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleSave('name')}
                  >
                    <Check className="w-4 h-4 mr-1" /> Save
                  </Button>
                </div>
              )}
            </div>
          )
        },
        {
          name: "Phone Number",
          description: "Manage your contact information",
          content: (
            <div className="space-y-4 p-4">
              <div>
                <label className="text-sm font-medium">Phone Number</label>
                <Input
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  disabled={isEditing !== 'phone'}
                  placeholder="+1 (555) 000-0000"
                />
              </div>
              {isEditing === 'phone' && (
                <div className="flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(null)}
                  >
                    <X className="w-4 h-4 mr-1" /> Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleSave('phone')}
                  >
                    <Check className="w-4 h-4 mr-1" /> Save
                  </Button>
                </div>
              )}
            </div>
          )
        }
      ]
    },
    {
      title: "Security",
      icon: Shield,
      items: [
        {
          name: "Two-Factor Authentication",
          description: "Add extra security to your account",
          content: (
            <div className="p-4">
              <Button variant="outline" className="w-full" onClick={() => toast.info("2FA setup coming soon")}>
                Enable 2FA
              </Button>
            </div>
          )
        }
      ]
    },
    {
      title: "Payment Methods",
      icon: CreditCard,
      items: [
        {
          name: "Cards",
          description: "Manage your cards",
          content: (
            <div className="p-4">
              <Button variant="outline" className="w-full" onClick={() => window.location.href = '/cards'}>
                View Cards
              </Button>
            </div>
          )
        }
      ]
    },
    {
      title: "Notifications",
      icon: Bell,
      items: [
        {
          name: "Email Notifications",
          description: "Choose what emails you receive",
          content: (
            <div className="p-4">
              <Button variant="outline" className="w-full" onClick={() => toast.info("Email preferences coming soon")}>
                Configure Email Preferences
              </Button>
            </div>
          )
        }
      ]
    },
    {
      title: "Preferences",
      icon: Globe,
      items: [
        {
          name: "Language",
          description: "Choose your preferred language",
          content: (
            <div className="space-y-4 p-4">
              <Select
                value={formData.preferredLanguage}
                onValueChange={(value) => {
                  setFormData(prev => ({ ...prev, preferredLanguage: value }));
                  handleSave('language');
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )
        },
        {
          name: "Currency",
          description: "Set your default currency",
          content: (
            <div className="space-y-4 p-4">
              <Select
                value={formData.preferredCurrency}
                onValueChange={(value) => {
                  setFormData(prev => ({ ...prev, preferredCurrency: value }));
                  handleSave('currency');
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies?.map((currency) => (
                    <SelectItem key={currency.code} value={currency.code}>
                      {currency.code} - {currency.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )
        }
      ]
    }
  ];

  return (
    <AppLayout>
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
                  <Dialog key={item.name}>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        className="w-full justify-between p-4 h-auto"
                      >
                        <div className="text-left">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">{item.description}</p>
                        </div>
                        <ChevronRight className="h-5 w-5 text-muted-foreground" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{item.name}</DialogTitle>
                      </DialogHeader>
                      {item.content}
                    </DialogContent>
                  </Dialog>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

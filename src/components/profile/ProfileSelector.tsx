
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { supabase } from '@/integrations/supabase/client';

interface ProfileType {
  id: string;
  code: string;
  name: string;
}

export function ProfileSelector() {
  const [open, setOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<ProfileType | null>(null);
  const [profiles, setProfiles] = useState<ProfileType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserProfiles();
  }, []);

  const fetchUserProfiles = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('user_profile_types')
      .select(`
        profile_type_id,
        profile_types (
          id,
          code,
          name
        )
      `)
      .eq('user_id', user.id)
      .eq('is_active', true);

    if (error) {
      console.error('Error fetching profiles:', error);
      return;
    }

    const availableProfiles = data
      .map(item => item.profile_types)
      .filter(profile => profile) as ProfileType[];

    setProfiles(availableProfiles);
  };

  const handleProfileSelect = (profile: ProfileType) => {
    setSelectedProfile(profile);
    setOpen(false);

    switch (profile.code) {
      case 'personal':
        navigate('/');
        break;
      case 'business':
        navigate('/business/dashboard');
        break;
      case 'commercial':
        navigate('/commercial/dashboard');
        break;
      case 'private_banking':
        navigate('/private/dashboard');
        break;
      case 'developer':
        navigate('/developer/dashboard');
        break;
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedProfile ? selectedProfile.name : "Seleccionar perfil"}
          <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar perfil..." className="h-9" />
          <CommandEmpty>No se encontraron perfiles.</CommandEmpty>
          <CommandGroup>
            {profiles.map((profile) => (
              <CommandItem
                key={profile.id}
                value={profile.code}
                onSelect={() => handleProfileSelect(profile)}
              >
                {profile.name}
                <Check
                  className={cn(
                    "ml-auto h-4 w-4",
                    selectedProfile?.id === profile.id ? "opacity-100" : "opacity-0"
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

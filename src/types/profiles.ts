
export type ProfileType = 'personal' | 'business' | 'commercial' | 'private_banking' | 'developer';

export interface UserProfile {
  id: string;
  user_id: string;
  profile_type: ProfileType;
  business_name?: string;
  tax_id?: string;
  industry?: string;
  company_size?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

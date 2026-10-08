import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || 'https://fimxtttwucdrqptkhknm.supabase.co';
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || 'sb_publishable__sKmXYcNjUdjplSDUpWieQ_5OaUKzR1';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ProjectItem {
  id?: number | string;
  category: string;
  image: string;
  title: string;
  description?: string;
  specs?: string;
  created_at?: string;
}

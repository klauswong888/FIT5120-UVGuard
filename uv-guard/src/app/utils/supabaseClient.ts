import { createClient, SupabaseClient } from '@supabase/supabase-js';

const SUPABASE_URL: string = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY: string = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// ✅ create Supabase server side instance
export const supabase: SupabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

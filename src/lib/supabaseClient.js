import { createClient } from '@supabase/supabase-js'

// These values are loaded from Vite environment variables: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY
// Create a Supabase project and copy the URL + anon key into a .env file in the project root.

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export function hasSupabaseConfig() {
  return Boolean(supabaseUrl && supabaseAnonKey)
}

import AsyncStorage from '@react-native-async-storage/async-storage'
import { SupabaseClientOptions } from '@supabase/supabase-js'

export const supabaseConfig: SupabaseClientOptions<'public'> = {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
}

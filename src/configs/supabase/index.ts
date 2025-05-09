import AsyncStorage from '@react-native-async-storage/async-storage'

export const supabaseConfig = {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  global: {
    headers: {
      'X-Client-Info': 'moodlog-app',
    },
  },
  db: {
    schema: 'public',
  },
}

import AsyncStorage from '@react-native-async-storage/async-storage'
import { Session } from '@supabase/supabase-js'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthState {
  session: Session | null
  userName: string
  setSession: (session: Session | null) => void
  setUserName: (userName: string) => void
  clearAuth: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    set => ({
      session: null,
      userName: '',
      setSession: session => set({ session }),
      setUserName: userName => set({ userName }),
      clearAuth: () => set({ session: null, userName: '' }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)

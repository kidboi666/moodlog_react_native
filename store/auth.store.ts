import { STORAGE_KEY } from '@/constants'
import { ExceptionState } from '@/types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Session } from '@supabase/supabase-js'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthState extends ExceptionState {
  session: Session | null
  userName: string
  setSession: (session: Session | null) => void
  setUserName: (userName: string) => void
  clearSession: () => void
  clearAuth: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      session: null,
      userName: '',
      isLoading: false,
      error: null,
      setSession: session => set({ session }),
      setUserName: userName => set({ userName }),
      clearSession: () => set({ session: null }),
      clearAuth: () => set({ session: null, userName: '' }),
    }),
    {
      name: STORAGE_KEY.AUTH,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        session: state.session,
        userName: state.userName,
      }),
    },
  ),
)

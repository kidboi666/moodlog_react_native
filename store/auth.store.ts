import AsyncStorage from '@react-native-async-storage/async-storage'
import { Session } from '@supabase/supabase-js'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { STORAGE_KEY } from '@/constants'

interface StoreState {
  session: Session | null
  userName: string

  setSession: (session: Session | null) => void
  setUserName: (userName: string) => void
  clearSession: () => void
  clearAuth: () => void
}

export const useAuth = create<StoreState>()(
  persist(
    set => ({
      session: null,
      userName: '',

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

import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface UserInfo {
  id: number
  username: string
}

interface AuthState {
  user: UserInfo | null
  token: string | null
  isAuthenticated: boolean
  setUser: (userInfo: UserInfo | null) => void
  setToken: (token: string | null) => void
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    set => ({
      user: null,
      token: null,
      isAuthenticated: false,
      setUser: user => set({ user, isAuthenticated: !!user }),
      setToken: token => set({ token }),
      logout: () => set({ user: null, token: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
)

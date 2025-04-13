import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { STORAGE_KEY } from '../constants/storage'
import { api } from '../services/api.service'

interface UserInfo {
  id: number
  username: string
}

interface AuthState {
  user: UserInfo | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  setUser: (user: any) => void
  setToken: (token: string) => void
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    set => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setUser: user => set({ user, isAuthenticated: !!user }),
      setToken: token => set({ token }),

      login: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null })
          const response = await api.post('/auth/login', { email, password })
          const { access_token } = response.data
          set({ token: access_token, isAuthenticated: true })
        } catch (error) {
          console.log(error)
          set({ error: '로그인에 실패했습니다.' })
        } finally {
          set({ isLoading: false })
        }
      },

      signup: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null })
          await api.post('/users', { email, password })
        } catch (error) {
          set({ error: '회원가입에 실패했습니다.' })
        } finally {
          set({ isLoading: false })
        }
      },

      logout: () => {
        set({ user: null, token: null, isAuthenticated: false })
      },
    }),
    {
      name: STORAGE_KEY.AUTH,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        token: state.token,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)

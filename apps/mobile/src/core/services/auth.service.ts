import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { api } from './api.service'

interface AuthState {
  token: string | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

export const useAuthStore = create<AuthState>(set => ({
  token: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true, error: null })
      const response = await api.post('/auth/login', { email, password })
      const { access_token } = response.data
      await AsyncStorage.setItem('token', access_token)
      set({ token: access_token })
    } catch (error) {
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

  logout: async () => {
    await AsyncStorage.removeItem('token')
    set({ token: null })
  },
}))

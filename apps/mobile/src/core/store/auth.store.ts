import type { UserInfo, UserStore } from '@/types/user.types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AxiosError } from 'axios'
import { uuid } from 'expo-modules-core'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { STORAGE_KEY } from '../constants/storage'
import { api } from '../services/api.service'
import { useApp } from './app.store'

const initialUserInfo: UserInfo = {
  id: '',
  userName: '',
  email: '',
  provider: null,
  age: null,
  avatarUrl: null,
}

interface AuthState extends UserStore {
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: AxiosError | null
  signin: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuth = create<AuthState>()(
  persist(
    (set, get) => ({
      userInfo: initialUserInfo,
      draftUserName: '',
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      signin: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null })
          const response = await api.post('/auth/login', { email, password })
          const { access_token, user } = response.data

          set({
            token: access_token,
            isAuthenticated: true,
            userInfo: {
              ...get().userInfo,
              id: user.id,
              email: user.email,
              userName: user.userName || '',
            },
          })
        } catch (error) {
          console.error(error)
          if (error instanceof AxiosError) {
            set({
              error,
              isAuthenticated: false,
              token: null,
            })
          } else {
            set({
              error,
              isAuthenticated: false,
              token: null,
            })
          }
        } finally {
          set({ isLoading: false })
        }
      },

      signup: async (email: string, password: string) => {
        try {
          set({ isLoading: true, error: null })
          const response = await api.post('/auth/register', { email, password })
          const { access_token, user } = response.data

          set({
            token: access_token,
            isAuthenticated: true,
            userInfo: {
              ...get().userInfo,
              id: user.id,
              email: user.email,
              userName: user.userName || '',
            },
          })
        } catch (error) {
          console.error(error)
          if (error instanceof AxiosError) {
            set({
              error,
              isAuthenticated: false,
              token: null,
            })
          } else {
            set({
              error,
              isAuthenticated: false,
              token: null,
            })
          }
        } finally {
          set({ isLoading: false })
        }
      },

      logout: () => {
        set({
          userInfo: initialUserInfo,
          token: null,
          isAuthenticated: false,
          error: null,
        })
      },

      registerUser: async userName => {
        try {
          set({ isLoading: true, error: null })
          const newUserInfo = {
            ...get().userInfo,
            userName,
            id: uuid.v4(),
          }
          set({ userInfo: newUserInfo })
          useApp.getState().initFirstLaunchStatus()
        } catch (error) {
          console.error(error)
          if (error instanceof AxiosError) {
            set({
              error,
              isAuthenticated: false,
              token: null,
            })
          } else {
            set({
              error,
              isAuthenticated: false,
              token: null,
            })
          }
        } finally {
          set({ isLoading: false })
        }
      },

      onDraftUserNameChange: userName => set({ draftUserName: userName }),

      onUserInfoChange: async updatedUserInfo => {
        try {
          set({ isLoading: true, error: null })
          set(state => ({
            userInfo: { ...state.userInfo, ...updatedUserInfo },
          }))
        } catch (error) {
          console.log(error)
          if (error instanceof AxiosError) {
            set({
              error,
              isAuthenticated: false,
              token: null,
            })
          } else {
            set({
              error,
              isAuthenticated: false,
              token: null,
            })
          }
        } finally {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: STORAGE_KEY.AUTH,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        token: state.token,
        userInfo: state.userInfo,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
)

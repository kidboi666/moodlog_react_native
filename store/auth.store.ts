// store/auth.store.ts
import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { ERROR_KEY, STORAGE_KEY } from '@/constants'
import { AuthService } from '@/services'
import type { UserInfo, UserStore } from '@/types'
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
  draftUserName: string
  userInfo: UserInfo
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: Error | null
  signin: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, userName: string) => Promise<void>
  logout: () => Promise<void>
  registerUser: (userName: string) => Promise<void>
  onDraftUserNameChange: (userName: string) => void
  onUserInfoChange: (updatedUserInfo: Partial<UserInfo>) => Promise<void>
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

          const { token, user } = await AuthService.signin(email, password)

          set({
            token,
            isAuthenticated: true,
            userInfo: {
              ...get().userInfo,
              ...user,
            },
            error: null,
          })
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error
                : new Error(ERROR_KEY.AUTH_LOGIN_FAILED),
            isAuthenticated: false,
            token: null,
          })
        } finally {
          set({ isLoading: false })
        }
      },

      signup: async (email: string, password: string, userName: string) => {
        try {
          set({ isLoading: true, error: null })

          const { token, user } = await AuthService.signup(
            email,
            password,
            userName,
          )

          set({
            token,
            isAuthenticated: true,
            userInfo: {
              ...get().userInfo,
              ...user,
            },
            error: null,
          })
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error
                : new Error(ERROR_KEY.AUTH_SIGNUP_FAILED),
            isAuthenticated: false,
            token: null,
          })
        } finally {
          set({ isLoading: false })
        }
      },

      logout: async () => {
        try {
          await AuthService.logout()

          set({
            userInfo: initialUserInfo,
            token: null,
            isAuthenticated: false,
            error: null,
          })
        } catch (error) {
          console.error('로그아웃 오류:', error)
        }
      },

      registerUser: async userName => {
        try {
          set({ isLoading: true, error: null })

          const newUserInfo = await AuthService.registerUser(
            userName,
            get().userInfo,
          )
          set({ userInfo: newUserInfo })

          useApp.getState().initFirstLaunchStatus()
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error
                : new Error(ERROR_KEY.USER_REGISTRATION_FAILED),
            isAuthenticated: false,
            token: null,
          })
        } finally {
          set({ isLoading: false })
        }
      },

      onDraftUserNameChange: userName => set({ draftUserName: userName }),

      onUserInfoChange: async updatedUserInfo => {
        try {
          set({ isLoading: true, error: null })

          const newUserInfo = await AuthService.updateUserInfo(
            get().userInfo,
            updatedUserInfo,
          )

          set({ userInfo: newUserInfo })
        } catch (error) {
          set({
            error:
              error instanceof Error
                ? error
                : new Error(ERROR_KEY.USER_INFO_UPDATE_FAILED),
            isAuthenticated: false,
            token: null,
          })
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

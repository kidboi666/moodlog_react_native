import AsyncStorage from '@react-native-async-storage/async-storage'
import { AxiosError } from 'axios'
import { uuid } from 'expo-modules-core'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { UserInfo, UserStore } from '@/types/user.types'
import { ERROR_KEY } from '../constants/error-keys'
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
  draftUserName: string
  userInfo: UserInfo
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  error: AxiosError | null
  signin: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, userName: string) => Promise<void>
  logout: () => Promise<void>
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

          if (access_token && user) {
            await AsyncStorage.setItem(STORAGE_KEY.TOKEN, access_token)

            set({
              token: access_token,
              isAuthenticated: true,
              userInfo: {
                ...get().userInfo,
                id: user.id,
                email: user.email,
                userName: user.userName || '',
              },
              error: null,
            })
          } else {
            throw new Error(ERROR_KEY.AUTH_LOGIN_INVALID_DATA)
          }
        } catch (error) {
          console.error('로그인 오류:', error)
          set({
            error:
              error instanceof AxiosError
                ? error
                : new AxiosError(ERROR_KEY.AUTH_LOGIN_FAILED),
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
          const response = await api.post('/auth/register', {
            email,
            password,
            userName,
          })

          const { access_token, user } = response.data

          if (access_token && user) {
            await AsyncStorage.setItem(STORAGE_KEY.TOKEN, access_token)

            set({
              token: access_token,
              isAuthenticated: true,
              userInfo: {
                ...get().userInfo,
                id: user.id,
                email: user.email,
                userName: user.userName || userName,
              },
              error: null,
            })
          } else {
            throw new Error(ERROR_KEY.AUTH_SIGNUP_INVALID_DATA)
          }
        } catch (error) {
          console.error('회원가입 오류:', error)
          set({
            error:
              error instanceof AxiosError
                ? error
                : new AxiosError(ERROR_KEY.AUTH_SIGNUP_FAILED),
            isAuthenticated: false,
            token: null,
          })
        } finally {
          set({ isLoading: false })
        }
      },

      logout: async () => {
        try {
          await AsyncStorage.removeItem(STORAGE_KEY.TOKEN)

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
          const newUserInfo = {
            ...get().userInfo,
            userName,
            id: uuid.v4(),
          }
          set({ userInfo: newUserInfo })
          useApp.getState().initFirstLaunchStatus()
        } catch (error) {
          console.error('사용자 등록 오류:', error)
          set({
            error:
              error instanceof AxiosError
                ? error
                : new AxiosError(ERROR_KEY.USER_REGISTRATION_FAILED),
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
          set(state => ({
            userInfo: { ...state.userInfo, ...updatedUserInfo },
          }))
        } catch (error) {
          console.error('사용자 정보 업데이트 오류:', error)
          set({
            error:
              error instanceof AxiosError
                ? error
                : new AxiosError(ERROR_KEY.USER_INFO_UPDATE_FAILED),
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

import { uuid } from 'expo-modules-core'
import { create } from 'zustand'

import { STORAGE_KEY } from '@/core/constants/storage'
import type { UserStore } from '@/types/user.types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createJSONStorage, persist } from 'zustand/middleware'
import { useApp } from './app.store'

const initialUserInfo = {
  id: '',
  userName: '',
  email: null,
  provider: null,
  age: null,
  avatarUrl: null,
}

export const useUser = create<UserStore>()(
  persist(
    (set, get) => ({
      userInfo: initialUserInfo,
      draftUserName: '',
      isLoading: false,
      error: null,

      registerUser: async userName => {
        try {
          set({ isLoading: true, error: null })
          const newUserInfo = {
            ...get().userInfo,
            userName,
            id: uuid.v4(),
          }
          set({ userInfo: newUserInfo })

          await useApp.getState().initFirstLaunchStatus()
        } catch (err) {
          console.error('failed to save user data : ', err)
          set({ error: err })
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
        } catch (err) {
          console.error('failed to save user data : ', err)
          set({ error: err })
        } finally {
          set({ isLoading: false })
        }
      },
    }),
    {
      name: STORAGE_KEY.USER_INFO,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        userInfo: state.userInfo,
      }),
    },
  ),
)

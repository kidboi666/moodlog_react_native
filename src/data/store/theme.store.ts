import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { STORAGE_KEY } from '@/src/shared/constants'

export type Theme = 'dark' | 'light' | 'system'
export type ResolvedTheme = 'dark' | 'light'

interface StoreState {
  currentTheme: Theme
  resolvedTheme: ResolvedTheme
  systemTheme: ResolvedTheme
  isInitialized: boolean

  changeTheme: (theme: Theme) => void
  updateSystemTheme: (newTheme: ResolvedTheme) => void
  initialize: (systemTheme: ResolvedTheme) => void
}

const resolveTheme = (
  currentTheme: Theme,
  systemTheme: ResolvedTheme,
): ResolvedTheme => {
  return currentTheme === 'system' ? systemTheme : currentTheme
}

export const useAppTheme = create<StoreState>()(
  persist(
    (set, get) => ({
      currentTheme: 'system',
      resolvedTheme: 'light',
      systemTheme: 'light',
      isInitialized: false,

      initialize: (systemTheme: ResolvedTheme) => {
        const { currentTheme } = get()
        const resolvedTheme = resolveTheme(currentTheme, systemTheme)

        set({
          systemTheme,
          resolvedTheme,
          isInitialized: true,
        })
      },

      changeTheme: (theme: Theme) => {
        const { systemTheme } = get()
        const resolvedTheme = resolveTheme(theme, systemTheme)

        set({
          currentTheme: theme,
          resolvedTheme,
        })
      },

      updateSystemTheme: (newSystemTheme: ResolvedTheme) => {
        const { currentTheme } = get()
        const resolvedTheme = resolveTheme(currentTheme, newSystemTheme)

        set({
          systemTheme: newSystemTheme,
          resolvedTheme,
        })
      },
    }),
    {
      name: STORAGE_KEY.THEME,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        currentTheme: state.currentTheme,
      }),
    },
  ),
)

import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { STORAGE_KEY } from '@/constants'

export type Theme = 'dark' | 'light' | 'system'
export type ResolvedTheme = 'dark' | 'light'

interface StoreState {
  currentTheme: Theme
  resolvedTheme: ResolvedTheme
  systemTheme: ResolvedTheme

  changeTheme: (theme: Theme) => void
  updateSystemTheme: (newTheme: ResolvedTheme) => void
}

export const useAppTheme = create<StoreState>()(
  persist(
    (set, get) => ({
      currentTheme: 'system',
      resolvedTheme: 'light',
      systemTheme: 'light',

      changeTheme: theme => {
        set({ currentTheme: theme })
        const resolvedTheme = theme === 'system' ? get().systemTheme : theme
        set({ resolvedTheme })
      },
      updateSystemTheme: newSystemTheme => {
        set({ systemTheme: newSystemTheme })
        if (get().currentTheme === 'system') {
          set({ resolvedTheme: newSystemTheme })
        }
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

import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { STORAGE_KEY } from '@/constants'
import type { ThemeStoreState } from '@/types'

export const useAppTheme = create<ThemeStoreState>()(
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

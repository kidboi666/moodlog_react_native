import AsyncStorage from '@react-native-async-storage/async-storage'
import i18n from 'i18next'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { APP_VERSION, STORAGE_KEY } from '@/src/constants'
import {
  AIPersonalityType,
  FontTheme,
  Languages,
  Settings,
  TimeFormat,
} from '@/src/types'

interface StoreState {
  appVersion: string
  settings: Settings
  userName: string
  isOnboardingCompleted: boolean

  setUserName: (userName: string) => void
  setOnboardingCompleted: () => void
  onSettingChange: <K extends keyof Settings>(
    key: K,
    value: Settings[K],
  ) => Promise<void>
}

const initialSettings: Settings = {
  language: Languages.KO,
  timeFormat: TimeFormat.HOUR_12,
  fontTheme: FontTheme.LEE_SEOYUN,
  aiPersonalityType: AIPersonalityType.BALANCED,
}

export const useApp = create<StoreState>()(
  persist(
    set => ({
      appVersion: APP_VERSION,
      isOnboardingCompleted: false,
      settings: initialSettings,
      userName: '',

      setOnboardingCompleted: () => {
        set({ isOnboardingCompleted: true })
      },

      setUserName: (userName: string) => {
        set({ userName })
      },

      onSettingChange: async <K extends keyof Settings>(
        key: K,
        value: Settings[K],
      ) => {
        set(state => ({
          ...state,
          settings: { ...state.settings, [key]: value },
        }))
        if (key === 'language') {
          await i18n.changeLanguage(value as Languages)
        }
      },
    }),
    {
      name: STORAGE_KEY.SETTINGS,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        appVersion: state.appVersion,
        isOnboardingCompleted: state.isOnboardingCompleted,
        settings: state.settings,
        userName: state.userName,
      }),
      onRehydrateStorage: () => state => {
        if (state?.settings.language) {
          i18n.changeLanguage(state.settings.language)
        }
      },
    },
  ),
)

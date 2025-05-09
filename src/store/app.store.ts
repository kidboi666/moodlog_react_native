import AsyncStorage from '@react-native-async-storage/async-storage'
import i18n from 'i18next'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { APP_VERSION, STORAGE_KEY } from '@/constants'
import {
  FontTheme,
  Languages,
  Settings,
  SubscriptionTier,
  TimeFormat,
  ViewFontSize,
} from '@/types'

interface StoreState {
  appVersion: string
  subscriptionTier: SubscriptionTier
  settings: Settings

  onSettingChange: <K extends keyof Settings>(
    key: K,
    value: Settings[K],
  ) => Promise<void>
}

const initialSettings: Settings = {
  language: Languages.KO,
  timeFormat: TimeFormat.HOUR_12,
  fontTheme: FontTheme.LEE_SEOYUN,
  fontSize: ViewFontSize.MD,
}

export const useApp = create<StoreState>()(
  persist(
    (set, get) => ({
      appVersion: APP_VERSION,
      subscriptionTier: SubscriptionTier.FREE,
      settings: initialSettings,

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
        settings: state.settings,
        subscriptionTier: state.subscriptionTier,
      }),
      onRehydrateStorage: () => state => {
        if (state?.settings.language) {
          i18n.changeLanguage(state.settings.language)
        }
      },
    },
  ),
)

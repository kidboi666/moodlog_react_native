import AsyncStorage from '@react-native-async-storage/async-storage'
import i18n from 'i18next'
import { CalendarUtils } from 'react-native-calendars'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { APP_VERSION, STORAGE_KEY } from 'shared/constants'
import {
  FontTheme,
  ISODateString,
  Languages,
  type Nullable,
  Settings,
  SubscriptionTier,
  TimeFormat,
  ViewFontSize,
} from 'shared/types'

interface StoreState {
  appVersion: string
  subscriptionTier: SubscriptionTier
  firstLaunchDate: Nullable<ISODateString>
  settings: Settings
  isAuthenticated: boolean

  initFirstLaunchStatus: () => void
  onSettingChange: <K extends keyof Settings>(
    key: K,
    value: Settings[K],
  ) => Promise<void>
  onIsAuthenticatedChange: (isAuthenticated: boolean) => void
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
      firstLaunchDate: null,
      settings: initialSettings,
      isAuthenticated: false,

      initFirstLaunchStatus: () => {
        const firstLaunchDate = CalendarUtils.getCalendarDateString(new Date())
        if (!get().firstLaunchDate) {
          set({
            firstLaunchDate: firstLaunchDate as ISODateString,
          })
        }
      },
      onIsAuthenticatedChange: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),
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
        firstLaunchDate: state.firstLaunchDate,
        isAuthenticated: state.isAuthenticated,
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

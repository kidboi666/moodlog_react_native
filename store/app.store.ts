import AsyncStorage from '@react-native-async-storage/async-storage'
import i18n from 'i18next'
import { CalendarUtils } from 'react-native-calendars'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { APP_VERSION, STORAGE_KEY } from '@/constants'
import {
  AppStore,
  FontTheme,
  ISODateString,
  Languages,
  Settings,
  SubscriptionTier,
  TimeFormat,
  ViewFontSize,
} from '@/types'

const initialSettings: Settings = {
  language: Languages.KO,
  timeFormat: TimeFormat.HOUR_12,
  fontTheme: FontTheme.LEE_SEOYUN,
  fontSize: ViewFontSize.MD,
}

export const useApp = create<AppStore>()(
  persist(
    (set, get) => ({
      appVersion: APP_VERSION,
      subscriptionTier: SubscriptionTier.FREE,
      firstLaunchDate: null,
      settings: initialSettings,
      lastJournalCountDate: null,
      dailyJournalLimit: 3,
      dailyJournalCount: 0,
      isAuthenticated: false,

      initFirstLaunchStatus: () => {
        const firstLaunchDate = CalendarUtils.getCalendarDateString(new Date())
        if (!get().firstLaunchDate) {
          set({
            firstLaunchDate: firstLaunchDate as ISODateString,
          })
        }
      },

      updateDailyJournalCount: () => {
        const today = CalendarUtils.getCalendarDateString(new Date())

        if (today !== get().lastJournalCountDate) {
          set({
            lastJournalCountDate: today as ISODateString,
            dailyJournalCount: 0,
          })
        }

        if (get().dailyJournalCount >= get().dailyJournalLimit) {
          return 'daily_journal_limit_reached'
        }

        set({ dailyJournalCount: get().dailyJournalCount + 1 })
      },

      countJournal: () => {
        if (get().dailyJournalCount < get().dailyJournalLimit) {
          set({ dailyJournalCount: get().dailyJournalCount + 1 })
        }
      },

      onIsAuthenticatedChange: (isAuthenticated: boolean) => {
        set({ isAuthenticated })
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
        settings: state.settings,
        firstLaunchDate: state.firstLaunchDate,
        dailyJournalLimit: state.dailyJournalLimit,
        dailyJournalCount: state.dailyJournalCount,
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

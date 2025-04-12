import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Localization from 'expo-localization'
import { CalendarUtils } from 'react-native-calendars'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { APP_VERSION } from '@/core/constants/common'
import { STORAGE_KEY } from '@/core/constants/storage'
import {
  type AppStore,
  FontTheme,
  type Languages,
  type Settings,
  TimeFormat,
  ViewFontSize,
} from '@/types/app.types'
import type { ISODateString } from '@/types/date.types'
import i18n from 'i18next'

const DEFAULT_LANGUAGE = Localization.getLocales()[0].languageCode as Languages

const initialSettings: Settings = {
  fontSize: ViewFontSize.SMALL,
  fontTheme: FontTheme.PRETENDARD,
  language: DEFAULT_LANGUAGE,
  timeFormat: TimeFormat.HOUR_24,
}

export const useApp = create<AppStore>()(
  persist(
    (set, get) => ({
      appVersion: APP_VERSION,
      firstLaunchDate: null,
      settings: initialSettings,
      isLoading: false,
      error: null,

      initFirstLaunchStatus: () => {
        const firstLaunchDate = CalendarUtils.getCalendarDateString(new Date())
        if (!get().firstLaunchDate) {
          set({
            firstLaunchDate: firstLaunchDate as ISODateString,
          })
        }
      },

      onSettingChange: async <K extends keyof Settings>(
        key: K,
        value: Settings[K],
      ) => {
        set({ error: null })
        set(state => ({
          ...state,
          settings: { ...state.settings, [key]: value },
        }))
        if (key === 'language') {
          await i18n.changeLanguage(value)
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
      }),
      onRehydrateStorage: () => state => {
        if (state?.settings.language) {
          i18n.changeLanguage(state.settings.language)
        }
      },
    },
  ),
)

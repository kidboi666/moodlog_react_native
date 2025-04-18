import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Localization from 'expo-localization'
import i18n from 'i18next'
import { CalendarUtils } from 'react-native-calendars'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { APP_VERSION, STORAGE_KEY } from '@/constants'
import {
  type AppStore,
  EmotionDisplayType,
  FontTheme,
  type ISODateString,
  Languages,
  type Settings,
  TimeFormat,
  ViewFontSize,
} from '@/types'

const DEFAULT_LANGUAGE = Localization.getLocales()[0].languageCode as Languages

export enum Language {
  ENGLISH = 'en',
  KOREAN = 'ko',
}

export enum FontSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

const initialSettings: Settings = {
  language: Languages.KO,
  timeFormat: TimeFormat.HOUR_12,
  fontTheme: FontTheme.LEE_SEOYUN,
  fontSize: ViewFontSize.MD,
  emotionDisplayType: undefined,
}

export const useApp = create<AppStore>()(
  persist(
    (set, get) => ({
      appVersion: APP_VERSION,
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

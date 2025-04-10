import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Localization from 'expo-localization'
import { CalendarUtils } from 'react-native-calendars'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { APP_VERSION } from '@/core/constants/common'
import { STORAGE_KEY } from '@/core/constants/storage'
import {
  type AppSettings,
  type AppStore,
  type Languages,
  TimeFormat,
  ViewFontSize,
} from '@/types/app.types'
import type { ISODateString } from '@/types/date.types'

const DEFAULT_LANGUAGE = Localization.getLocales()[0].languageCode as Languages

const initialSettings: AppSettings = {
  fontSize: ViewFontSize.SMALL,
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

      onSettingChange: async <K extends keyof AppSettings>(
        key: K,
        value: AppSettings[K],
      ) => {
        try {
          set({ error: null })
          set(state => ({
            ...state,
            settings: { ...state.settings, [key]: value },
          }))
        } catch (err) {
          console.error(`Failed to save ${key} settings failed : `, err)
          set({ error: err })
        }
      },
    }),
    {
      name: STORAGE_KEY.SETTINGS,
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({
        settings: state.settings,
        firstLaunchDate: state.firstLaunchDate,
      }),
      version: 1,
    },
  ),
)

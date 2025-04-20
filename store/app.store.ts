import AsyncStorage from '@react-native-async-storage/async-storage'
import i18n from 'i18next'
import { CalendarUtils } from 'react-native-calendars'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import { APP_VERSION, STORAGE_KEY } from '@/constants'
import {
  type AppStore,
  FontTheme,
  type ISODateString,
  Languages,
  MyMood,
  type Settings,
  SubscriptionTier,
  TimeFormat,
  ViewFontSize,
} from '@/types'

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
}

export const useApp = create<AppStore>()(
  persist(
    (set, get) => ({
      appVersion: APP_VERSION,
      subscriptionTier: SubscriptionTier.FREE,
      firstLaunchDate: null,
      settings: initialSettings,
      myMoods: {},
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
          await i18n.changeLanguage(value as Languages)
        }
      },

      addMyMood: (myMood: MyMood) => {
        const { myMoods, subscriptionTier } = get()

        if (
          subscriptionTier === SubscriptionTier.FREE &&
          Object.keys(myMoods).length >= 4 &&
          !myMoods[myMood.id]
        ) {
          return { error: 'free_user_custom_mood_limit' }
        }

        const newMyMoods = {
          ...myMoods,
          [myMood.id]: myMood,
        }

        set({ myMoods: newMyMoods })
        return { success: true }
      },

      removeMyMood: (myMoodId: string) => {
        const { myMoods = {} } = get()

        if (!myMoods[myMoodId]) {
          return { error: 'my_mood_not_found' }
        }

        const newMyMoods = { ...myMoods }
        delete newMyMoods[myMoodId]

        set({ myMoods: newMyMoods })
        return { success: true }
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

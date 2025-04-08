import * as Localization from 'expo-localization';

import { CalendarUtils } from 'react-native-calendars';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { APP_VERSION } from '@/core/constants/common';
import { AppService } from '@/core/services/app.service';

import {
  AppSettings,
  AppStore,
  Languages,
  TimeFormat,
  ViewFontSize,
} from '@/types/app.types';
import { ISODateString } from '@/types/date.types';

const DEFAULT_LANGUAGE = Localization.getLocales()[0].languageCode as Languages;

const initialSettings: AppSettings = {
  fontSize: ViewFontSize.SMALL,
  language: DEFAULT_LANGUAGE,
  timeFormat: TimeFormat.HOUR_24,
};

export const useApp = create<AppStore>()(
  persist(
    (set, get) => ({
      appVersion: APP_VERSION,
      isInitialApp: false,
      firstLaunchDate: null,
      settings: initialSettings,
      isLoading: false,
      error: null,

      initFirstLaunchStatus: async () => {
        try {
          set({ isLoading: true, error: null });
          const firstLaunchDate = CalendarUtils.getCalendarDateString(
            new Date(),
          );

          await Promise.all([
            AppService.saveFirstLaunchStatus(firstLaunchDate),
            AppService.initSettings(get().settings),
          ]);

          set({
            isInitialApp: true,
            firstLaunchDate: firstLaunchDate as ISODateString,
          });
        } catch (err) {
          console.error('load firstLaunchStatus failed : ', err);
          set({ error: err });
        } finally {
          set({ isLoading: false });
        }
      },

      initAppData: async () => {
        try {
          set({ isLoading: true, error: null });

          const [firstLaunchDate, settings] = await Promise.all([
            AppService.loadFirstLaunchStatus(),
            AppService.loadSettings(),
          ]);

          set({
            isInitialApp: true,
            firstLaunchDate: firstLaunchDate as ISODateString,
          });

          if (settings) {
            set({ settings });
          }
        } catch (err) {
          console.error('load settings failed : ', err);
          set({ error: err });
        } finally {
          set({ isLoading: false });
        }
      },

      onSettingChange: async <K extends keyof AppSettings>(
        key: K,
        value: AppSettings[K],
      ) => {
        try {
          const currentSettings = get().settings;
          const newSettings = { ...currentSettings, [key]: value };

          set({ settings: newSettings });
          await AppService.saveSetting(currentSettings, key, value);
        } catch (err) {
          console.error(`Failed to save ${key} settings failed : `, err);
          set({ error: err });
        }
      },
    }),
    {
      name: 'app-storage',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: state => ({ settings: state.settings }),
    },
  ),
);

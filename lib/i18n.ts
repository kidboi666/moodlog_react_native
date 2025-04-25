import { en } from '@/shared/locales/en'
import { ko } from '@/shared/locales/ko'
import * as Localization from 'expo-localization'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { LocaleConfig } from 'react-native-calendars'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ko: {
      translation: ko,
    },
  },
  lng: Localization.getLocales()[0].languageCode ?? 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', lng => {
  LocaleConfig.defaultLocale = lng
})

export default i18n

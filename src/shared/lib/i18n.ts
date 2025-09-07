import { en } from '@/src/shared/locales/en'
import { ko } from '@/src/shared/locales/ko'
import { getLocales } from 'expo-localization'
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { LocaleConfig } from 'react-native-calendars'

const deviceLanguage = getLocales()?.[0]?.languageCode ?? 'en'

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: en,
    },
    ko: {
      translation: ko,
    },
  },
  lng: deviceLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', lng => {
  LocaleConfig.defaultLocale = lng
})

export default i18n

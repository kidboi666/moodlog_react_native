import type { ISODateString } from './date.types'
import type { Nullable } from './util.types'

export enum ViewFontSize {
  XS = '$4',
  SM = '$6',
  MD = '$8',
  LG = '$10',
  XL = '$12',
}

export enum Languages {
  EN = 'en',
  KO = 'ko',
}

export enum TimeFormat {
  HOUR_24 = 'hour-24',
  HOUR_12 = 'hour-12',
}

export enum FontTheme {
  INTER = 'inter',
  PRETENDARD = 'pretendard',
  NANUM_PEN = 'nanumPenScript',
  ROBOTO_MONO = 'robotoMono',
  ESAMANRU = 'esamanru',
  LEE_SEOYUN = 'leeSeoyun',
}

export enum SubscriptionTier {
  FREE = 'free',
  PREMIUM = 'premium',
}

export enum Position {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

export enum MoodLimits {
  FREE = 10,
  PREMIUM = 100,
}

export type Settings = {
  fontSize: ViewFontSize
  fontTheme: FontTheme
  language: Languages
  timeFormat: TimeFormat
}

export interface AppStore {
  appVersion: string
  subscriptionTier: SubscriptionTier
  firstLaunchDate: Nullable<ISODateString>
  lastJournalCountDate: Nullable<ISODateString>
  settings: Settings
  dailyJournalLimit: number
  dailyJournalCount: number
  isAuthenticated: boolean

  initFirstLaunchStatus: () => void
  updateDailyJournalCount: () => void
  countJournal: () => void
  onSettingChange: <K extends keyof Settings>(
    key: K,
    value: Settings[K],
  ) => Promise<void>
  onIsAuthenticatedChange: (isAuthenticated: boolean) => void
}

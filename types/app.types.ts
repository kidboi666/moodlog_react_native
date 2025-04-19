import type { ISODateString } from './date.types'
import type { MyMood, MyMoods } from './mood.types'
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

export enum EmotionDisplayType {
  FIVE_LEVELS_GOOD_BAD = 'five_levels_good_bad',
  MY_EMOTIONS = 'my_emotions',
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

export type Settings = {
  fontSize: ViewFontSize
  fontTheme: FontTheme
  language: Languages
  timeFormat: TimeFormat
  emotionDisplayType?: EmotionDisplayType
  emotionDisplaySettings?: Record<string, EmotionDisplayType>
}

export interface AppStore {
  appVersion: string
  subscriptionTier: SubscriptionTier
  firstLaunchDate: Nullable<ISODateString>
  settings: Settings
  myMoods: MyMoods
  isAuthenticated: boolean

  initFirstLaunchStatus: () => void
  onSettingChange: <K extends keyof Settings>(
    key: K,
    value: Settings[K],
  ) => Promise<void>
  onIsAuthenticatedChange: (isAuthenticated: boolean) => void

  // 나만의 감정 관리 메서드
  addMyMood: (myMood: MyMood) => {
    error?: string
    success?: boolean
  }
  removeMyMood: (myMoodId: string) => {
    error?: string
    success?: boolean
  }
}

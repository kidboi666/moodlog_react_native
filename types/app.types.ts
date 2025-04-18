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

export enum EmotionDisplayType {
  FOUR_EMOTIONS_THREE_LEVELS = 'four_emotions_three_levels',
  FIVE_LEVELS_GOOD_BAD = 'five_levels_good_bad',
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
}
export type AppState = {
  appVersion: string
  isInitialApp: boolean
  firstLaunchDate: Nullable<ISODateString>
  settings: Settings
}

export interface AppStore {
  appVersion: string
  firstLaunchDate: Nullable<ISODateString>
  settings: Settings
  isAuthenticated: boolean

  initFirstLaunchStatus: () => void
  onSettingChange: <K extends keyof Settings>(
    key: K,
    value: Settings[K],
  ) => Promise<void>
}

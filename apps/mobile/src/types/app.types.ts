import type { ISODateString } from '@/types/date.types'
import type { Nullable } from '@/types/util.types'

export enum ViewFontSize {
  SMALL = '$6',
  MEDIUM = '$8',
  LARGE = '$9',
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
  isLoading: boolean
  error: any | null

  initFirstLaunchStatus: () => void
  onSettingChange: <K extends keyof Settings>(
    key: K,
    value: Settings[K],
  ) => Promise<void>
}

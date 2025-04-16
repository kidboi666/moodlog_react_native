import type { ISODateString } from '@/types/date.types'
import type { Nullable } from '@/types/util.types'

export const viewFontSize = {
  1: '$1',
  2: '$2',
  3: '$3',
  4: '$4',
  5: '$5',
  6: '$6',
  7: '$7',
  8: '$8',
  9: '$9',
  10: '$10',
  11: '$11',
  12: '$12',
} as const

export type ViewFontSizeKey = keyof typeof viewFontSize
export type ViewFontSizeValue = (typeof viewFontSize)[ViewFontSizeKey]

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
  fontSize: ViewFontSizeValue
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

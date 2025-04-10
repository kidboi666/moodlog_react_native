import { ISODateString } from '@/types/date.types'
import { Nullable } from '@/types/utill.types'

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

export enum Position {
  TOP = 'top',
  BOTTOM = 'bottom',
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

export type Settings = {
  fontSize: ViewFontSize
  language: Languages
  timeFormat: TimeFormat
}
export type AppState = {
  appVersion: string
  isInitialApp: boolean
  firstLaunchDate: Nullable<ISODateString>
  settings: Settings
}

export interface AppSettings {
  fontSize: ViewFontSize
  language: Languages
  timeFormat: TimeFormat
}

export interface AppStore {
  appVersion: string
  firstLaunchDate: ISODateString | null

  settings: AppSettings

  isLoading: boolean
  error: any | null

  initFirstLaunchStatus: () => Promise<void>
  initAppData: () => Promise<void>
  onSettingChange: <K extends keyof AppSettings>(
    key: K,
    value: AppSettings[K],
  ) => Promise<void>
}

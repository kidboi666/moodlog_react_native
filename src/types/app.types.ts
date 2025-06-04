import { FONT_SIZE } from '@/constants'

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

export enum Theme {
  LIGHT = 'light',
  DARK = 'dark',
  SYSTEM = 'system',
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
  fontTheme: FontTheme
  language: Languages
  timeFormat: TimeFormat
}

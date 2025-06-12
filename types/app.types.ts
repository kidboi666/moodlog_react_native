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

export type Settings = {
  fontTheme: FontTheme
  language: Languages
  timeFormat: TimeFormat
  aiPersonalityType: AIPersonalityType
}

export enum AIPersonalityType {
  RATIONAL = 'rational',
  BALANCED = 'balanced',
  COMPASSIONATE = 'compassionate',
}

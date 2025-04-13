import { createFont, createTamagui } from 'tamagui'

import { defaultConfig } from '@tamagui/config/v4'
import {
  themes as tamaguiThemes,
  tokens as tamaguiTokens,
} from '@tamagui/themes'

const pretendardFont = createFont({
  family: 'Pretendard',
  size: {
    1: 11,
    2: 12,
    3: 13,
    4: 14,
    true: 14,
    5: 16,
    6: 18,
    7: 20,
    8: 23,
    9: 30,
    10: 46,
    11: 55,
    12: 62,
    13: 72,
    14: 92,
    15: 114,
    16: 134,
  },
  weight: {
    4: '400',
    5: '500',
    7: '700',
    8: '800',
  },
  face: {
    400: { normal: 'Pretendard-Regular' },
    500: { normal: 'Pretendard-Medium' },
    700: { normal: 'Pretendard-SemiBold' },
    800: { normal: 'Pretendard-Bold' },
  },
})

export const interFont = createFont({
  family: 'Inter',
  size: {
    1: 11,
    2: 12,
    3: 13,
    4: 14,
    true: 14,
    5: 16,
    6: 18,
    7: 20,
    8: 23,
    9: 30,
    10: 46,
    11: 55,
    12: 62,
    13: 72,
    14: 92,
    15: 114,
    16: 134,
  },
  weight: {
    4: '400',
    5: '500',
    7: '700',
    8: '800',
  },
  face: {
    400: { normal: 'Inter-Regular' },
    500: { normal: 'Inter-Medium' },
    700: { normal: 'Inter-SemiBold' },
    800: { normal: 'Inter-Bold' },
  },
})

export const robotoMonoFont = createFont({
  family: 'RobotoMono',
  size: {
    1: 11,
    2: 12,
    3: 13,
    4: 14,
    true: 14,
    5: 16,
    6: 18,
    7: 20,
    8: 23,
    9: 30,
    10: 46,
    11: 55,
    12: 62,
    13: 72,
    14: 92,
    15: 114,
    16: 134,
  },
  weight: {
    4: '400',
    5: '500',
    7: '700',
    8: '800',
  },
  face: {
    400: { normal: 'RobotoMono-Regular' },
    500: { normal: 'RobotoMono-Medium' },
    700: { normal: 'RobotoMono-SemiBold' },
    800: { normal: 'RobotoMono-Bold' },
  },
})

export const nanumPenScriptFont = createFont({
  family: 'NanumPenScript',
  size: {
    1: 11,
    2: 12,
    3: 13,
    4: 14,
    true: 14,
    5: 16,
    6: 18,
    7: 20,
    8: 23,
    9: 30,
    10: 46,
    11: 55,
    12: 62,
    13: 72,
    14: 92,
    15: 114,
    16: 134,
  },
  weight: {
    4: '400',
  },
  face: {
    400: { normal: 'NanumPenScript-Regular' },
  },
})

export const config = createTamagui({
  ...defaultConfig,
  tokens: tamaguiTokens,
  fonts: {
    body: pretendardFont,
    heading: pretendardFont,
    inter: interFont,
    pretendard: pretendardFont,
    nanumPenScript: nanumPenScriptFont,
    robotoMono: robotoMonoFont,
  },
  themes: {
    ...tamaguiThemes,
    light_inter: {
      ...tamaguiThemes.light,
      fontFamily: 'Inter',
    },
    dark_inter: {
      ...tamaguiThemes.dark,
      fontFamily: 'Inter',
    },
    light_pretendard: {
      ...tamaguiThemes.light,
      fontFamily: 'Pretendard',
    },
    dark_pretendard: {
      ...tamaguiThemes.dark,
      fontFamily: 'Pretendard',
    },
    light_nanumPenScript: {
      ...tamaguiThemes.light,
      fontFamily: 'NanumPenScript',
    },
    dark_nanumPenScript: {
      ...tamaguiThemes.dark,
      fontFamily: 'NanumPenScript',
    },
    light_robotoMono: {
      ...tamaguiThemes.light,
      fontFamily: 'RobotoMono',
    },
    dark_robotoMono: {
      ...tamaguiThemes.dark,
      fontFamily: 'RobotoMono',
    },
  },
})

declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

declare module '@tamagui/toast' {
  interface CustomData {
    preset: 'error' | 'notice' | 'success'
    isUrgent?: boolean
  }
}

export default config

export type Conf = typeof config

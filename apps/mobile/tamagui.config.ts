import { defaultConfig } from '@tamagui/config/v4'
import {
  themes as tamaguiThemes,
  tokens as tamaguiTokens,
} from '@tamagui/themes'
import { createFont, createTamagui } from 'tamagui'

// 공통 폰트 사이즈 설정
const fontSizes = {
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
}

const createAppFont = (family: string, faces: Record<string, string>) => {
  const fontWeights: Record<number, string> = {}
  const fontFaces: Record<string, { normal: string }> = {}

  Object.entries(faces).forEach(([weight, faceName]) => {
    const weightNum = Number(weight)
    fontWeights[weightNum === 8 ? 8 : weightNum] = weight
    fontFaces[weight] = { normal: faceName }
  })

  return createFont({
    family,
    size: fontSizes,
    weight: fontWeights,
    face: fontFaces,
  })
}

const pretendardFont = createAppFont('Pretendard', {
  '400': 'Pretendard-Regular',
  '500': 'Pretendard-Medium',
  '700': 'Pretendard-SemiBold',
  '800': 'Pretendard-Bold',
})

const interFont = createAppFont('Inter', {
  '400': 'Inter-Regular',
  '500': 'Inter-Medium',
  '700': 'Inter-SemiBold',
  '800': 'Inter-Bold',
})

const robotoMonoFont = createAppFont('RobotoMono', {
  '400': 'RobotoMono-Regular',
  '500': 'RobotoMono-Medium',
  '700': 'RobotoMono-SemiBold',
  '800': 'RobotoMono-Bold',
})

const nanumPenScriptFont = createAppFont('NanumPenScript', {
  '400': 'NanumPenScript-Regular',
})

const esamanruFont = createAppFont('Esamanru', {
  '400': 'Esamanru-Light',
  '500': 'Esamanru-Medium',
  '800': 'Esamanru-Bold',
})

const leeSeoyunFont = createAppFont('LeeSeoyun', {
  '400': 'LeeSeoyun-Regular',
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
    esamanru: esamanruFont,
    leeSeoyun: leeSeoyunFont,
  },
  themes: tamaguiThemes,
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

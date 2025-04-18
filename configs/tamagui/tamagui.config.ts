import { defaultConfig } from '@tamagui/config/v4'
import {
  themes as tamaguiThemes,
  tokens as tamaguiTokens,
} from '@tamagui/themes'
import { createTamagui } from 'tamagui'
import {
  esamanruFont,
  interFont,
  leeSeoyunFont,
  nanumPenScriptFont,
  pretendardFont,
  robotoMonoFont,
} from './font'

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

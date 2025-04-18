import { defaultConfig } from '@tamagui/config/v4'
import {
  themes as tamaguiThemes,
  tokens as tamaguiTokens,
} from '@tamagui/themes'
import { animations } from './animations'
import {
  esamanruFont,
  interFont,
  leeSeoyunFont,
  nanumPenScriptFont,
  pretendardFont,
  robotoMonoFont,
} from './font'

export const config = {
  ...defaultConfig,
  animations,
  tokens: tamaguiTokens,
  fonts: {
    body: leeSeoyunFont,
    heading: leeSeoyunFont,
    inter: interFont,
    pretendard: pretendardFont,
    nanumPenScript: nanumPenScriptFont,
    robotoMono: robotoMonoFont,
    esamanru: esamanruFont,
    leeSeoyun: leeSeoyunFont,
  },
  themes: tamaguiThemes,
}

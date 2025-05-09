import { Skia, TextAlign, useFonts } from '@shopify/react-native-skia'
import { useMemo } from 'react'

import { useCustomFont } from './useCustomFont'

export const useSkiaParagraph = (text: string) => {
  const { fontName } = useCustomFont()
  const customFontMgr = useFonts(fontList)
  const paragraph = useMemo(() => {
    if (!customFontMgr) {
      return null
    }
    const paragraphStyle = {
      textAlign: TextAlign.Center,
    }
    const textStyle = {
      color: Skia.Color('white'),
      fontSize: 24,
      fontFamilies: [fontName],
      fontWeight: '600',
    }
    return Skia.ParagraphBuilder.Make(paragraphStyle, customFontMgr)
      .pushStyle(textStyle)
      .addText(text)
      .pop()
      .build()
  }, [text, customFontMgr])

  return {
    paragraph,
  }
}

const fontList = {
  pretendard: [require('../assets/fonts/Pretendard-Bold.ttf')],
  esamanru: [require('../assets/fonts/Esamanru-Bold.otf')],
  leeSeoyun: [require('../assets/fonts/LeeSeoyun-Regular.ttf')],
  nanumPenScript: [require('../assets/fonts/NanumPenScript-Regular.ttf')],
  robotoMono: [require('../assets/fonts/RobotoMono-Bold.ttf')],
}

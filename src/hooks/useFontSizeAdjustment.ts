import { GetThemeValueForKey } from 'tamagui'

import { useApp } from '@/store'
import { ViewFontSize } from '@/types'

type FontSizeMapping = Record<ViewFontSize, Record<string, string>>

const fontSizeMapping: FontSizeMapping = {
  [ViewFontSize.XS]: {
    $5: '$3',
    $6: '$4',
    $7: '$5',
    $8: '$6',
    $9: '$7',
    $10: '$8',
  },
  [ViewFontSize.SM]: {
    $5: '$4',
    $6: '$5',
    $7: '$6',
    $8: '$7',
    $9: '$8',
    $10: '$9',
  },
  [ViewFontSize.MD]: {
    $5: '$5',
    $6: '$6',
    $7: '$7',
    $8: '$8',
    $9: '$9',
    $10: '$10',
  },
  [ViewFontSize.LG]: {
    $5: '$6',
    $6: '$7',
    $7: '$8',
    $8: '$9',
    $9: '$10',
    $10: '$11',
  },
  [ViewFontSize.XL]: {
    $5: '$7',
    $6: '$8',
    $7: '$9',
    $8: '$10',
    $9: '$11',
    $10: '$12',
  },
} as const

/**
 * 설정된 폰트 크기에 따라 기본 폰트 크기를 조정하는 훅
 * @param defaultSize 기본 폰트 크기 (예: '$5', '$6' 등)
 * @returns 설정에 맞게 조정된 폰트 크기
 */
export const useFontSizeAdjustment = (defaultSize: string) => {
  const fontSize = useApp(state => state.settings.fontSize)

  // 맵핑에서 해당 크기 조정값 가져오기
  const adjustedSize = fontSizeMapping[fontSize][defaultSize] || defaultSize

  return adjustedSize as unknown as GetThemeValueForKey<'fontSize'>
}

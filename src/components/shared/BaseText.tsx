import type { ReactNode } from 'react'
import { Text, type TextProps } from 'tamagui'

import { useCustomFont, useFontSizeAdjustment } from '@/hooks'

type DefaultFonSize =
  | '$2'
  | '$3'
  | '$4'
  | '$5'
  | '$6'
  | '$7'
  | '$8'
  | '$9'
  | '$10'

interface Props extends TextProps {
  children: ReactNode
  defaultFontSize?: DefaultFonSize
}

export const BaseText = Text.styleable<Props>(
  (
    {
      children,
      themeInverse,
      color,
      fontSize,
      fontWeight,
      defaultFontSize = '$5',
      ...props
    },
    ref,
  ) => {
    const { fontNameWithTokenPrefix } = useCustomFont()
    const adjustedFontSize = useFontSizeAdjustment(defaultFontSize)

    return (
      <Text
        themeInverse={themeInverse}
        color={color}
        fontSize={fontSize || adjustedFontSize}
        fontFamily={fontNameWithTokenPrefix}
        fontWeight={fontWeight ? fontWeight : '400'}
        ref={ref}
        {...props}
      >
        {children}
      </Text>
    )
  },
)

BaseText.displayName = 'BaseText'

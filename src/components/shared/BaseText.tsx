import type { ReactNode } from 'react'
import { Text, type TextProps } from 'tamagui'

import { useCustomFont, useFontSizeAdjustment } from '@/hooks'

interface Props extends TextProps {
  children: ReactNode
}

export const BaseText = Text.styleable<Props>(
  ({ children, themeInverse, color, fontSize, ...props }, ref) => {
    const { fontNameWithTokenPrefix } = useCustomFont()
    const defaultFontSize = useFontSizeAdjustment('$5')

    return (
      <Text
        themeInverse={themeInverse}
        color={color}
        fontSize={fontSize || defaultFontSize}
        fontFamily={fontNameWithTokenPrefix}
        fontWeight={props.fontWeight ? props.fontWeight : '400'}
        ref={ref}
        {...props}
      >
        {children}
      </Text>
    )
  },
)

BaseText.displayName = 'BaseText'

import { memo } from 'react'
import type { ReactNode } from 'react'
import { GetThemeValueForKey, Text, type TextProps } from 'tamagui'

import { useCustomFont, useFontSizeAdjustment } from '@/hooks'

interface Props extends TextProps {
  children: ReactNode
}

export const StyledBaseText = Text.styleable<Props>(
  ({ children, themeInverse, color, fontSize, ...props }, ref) => {
    const font = useCustomFont()
    const defaultFontSize = useFontSizeAdjustment('$5')

    return (
      <Text
        themeInverse={themeInverse}
        color={color}
        fontSize={fontSize || defaultFontSize}
        fontFamily={font as unknown as GetThemeValueForKey<'$fontFamily'>}
        fontWeight={props.fontWeight ? props.fontWeight : '400'}
        ref={ref}
        {...props}
      >
        {children}
      </Text>
    )
  },
)

export const BaseText = memo(StyledBaseText)

BaseText.displayName = 'BaseText'

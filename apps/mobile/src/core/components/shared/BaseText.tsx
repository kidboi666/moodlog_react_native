import { useCustomFont } from '@/core/hooks/useCustomFont'
import type { ReactNode } from 'react'
import { memo } from 'react'
import { GetThemeValueForKey, Text, type TextProps } from 'tamagui'

interface Props extends TextProps {
  children: ReactNode
}

export const BaseText = Text.styleable<Props>(
  ({ children, themeInverse, color, fontSize, ...props }, ref) => {
    const font = useCustomFont()

    return (
      <Text
        themeInverse={themeInverse}
        color={color}
        fontSize={fontSize}
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

BaseText.displayName = 'BaseText'

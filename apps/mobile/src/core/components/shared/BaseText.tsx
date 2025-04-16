import { useCustomFont } from '@/core/hooks/useCustomFont'
import type { ReactNode } from 'react'
import { memo } from 'react'
import { GetThemeValueForKey, Text, type TextProps } from 'tamagui'

interface Props extends TextProps {
  children: ReactNode
}

export const BaseText = memo(
  Text.styleable<Props>(({ children, themeInverse, color, ...props }, ref) => {
    const font = useCustomFont()

    return (
      <Text
        themeInverse={themeInverse}
        color={color}
        fontFamily={font as unknown as GetThemeValueForKey<'$fontFamily'>}
        fontWeight={props.fontWeight ? props.fontWeight : '400'}
        ref={ref}
        {...props}
      >
        {children}
      </Text>
    )
  }),
)

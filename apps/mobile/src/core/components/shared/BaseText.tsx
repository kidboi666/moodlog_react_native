import { useCustomFont } from '@/core/hooks/useCustomFont'
import type { ReactNode } from 'react'
import { GetThemeValueForKey, Text, type TextProps } from 'tamagui'
interface Props extends TextProps {
  children: ReactNode
}

export const BaseText = Text.styleable<Props>(({ children, ...props }, ref) => {
  const font = useCustomFont()

  return (
    <Text
      fontFamily={font as unknown as GetThemeValueForKey<'$fontFamily'>}
      fontWeight={props.fontWeight ? props.fontWeight : '400'}
      {...props}
      ref={ref}
    >
      {children}
    </Text>
  )
})

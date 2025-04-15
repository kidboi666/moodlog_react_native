import { GetThemeValueForKey, Text } from 'tamagui'

import { useCustomFont } from '@/core/hooks/useCustomFont'

export const H1 = Text.styleable(({ ...props }, ref) => {
  const font = useCustomFont()

  return (
    <Text
      fontFamily={font as unknown as GetThemeValueForKey<'$fontFamily'>}
      fontSize={props.fontSize ? props.fontSize : '$10'}
      fontWeight={props.fontWeight ? props.fontWeight : '800'}
      {...props}
      ref={ref}
    />
  )
})

export const H2 = Text.styleable(({ ...props }, ref) => {
  const font = useCustomFont()

  return (
    <Text
      fontFamily={font as unknown as GetThemeValueForKey<'$fontFamily'>}
      fontSize={props.fontSize ? props.fontSize : '$9'}
      fontWeight={props.fontWeight ? props.fontWeight : '800'}
      {...props}
      ref={ref}
    />
  )
})

export const H3 = Text.styleable(({ ...props }, ref) => {
  const font = useCustomFont()

  return (
    <Text
      fontFamily={font as unknown as GetThemeValueForKey<'$fontFamily'>}
      fontSize={props.fontSize ? props.fontSize : '$8'}
      fontWeight={props.fontWeight ? props.fontWeight : '800'}
      {...props}
      ref={ref}
    />
  )
})

export const H4 = Text.styleable(({ ...props }, ref) => {
  const font = useCustomFont()

  return (
    <Text
      fontFamily={font as unknown as GetThemeValueForKey<'$fontFamily'>}
      fontSize={props.fontSize ? props.fontSize : '$7'}
      fontWeight={props.fontWeight ? props.fontWeight : '800'}
      {...props}
      ref={ref}
    />
  )
})

export const H5 = Text.styleable(({ ...props }, ref) => {
  const font = useCustomFont()

  return (
    <Text
      fontFamily={font as unknown as GetThemeValueForKey<'$fontFamily'>}
      fontSize={props.fontSize ? props.fontSize : '$6'}
      fontWeight={props.fontWeight ? props.fontWeight : '800'}
      {...props}
      ref={ref}
    />
  )
})

export const H6 = Text.styleable(({ ...props }, ref) => {
  const font = useCustomFont()

  return (
    <Text
      fontFamily={font as unknown as GetThemeValueForKey<'$fontFamily'>}
      fontSize={props.fontSize ? props.fontSize : '$5'}
      fontWeight={props.fontWeight ? props.fontWeight : '800'}
      {...props}
      ref={ref}
    />
  )
})

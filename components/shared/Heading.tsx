import { GetThemeValueForKey, Text } from 'tamagui'

import { useCustomFont } from '@/hooks/useCustomFont'
import { useFontSizeAdjustment } from '@/hooks/useFontSizeAdjustment'

export const H1 = Text.styleable(({ ...props }, ref) => {
  const font = useCustomFont()
  const fontSize = useFontSizeAdjustment('$10')

  return (
    <Text
      fontFamily={font as unknown as GetThemeValueForKey<'$fontFamily'>}
      fontSize={props.fontSize ? props.fontSize : fontSize}
      fontWeight={props.fontWeight ? props.fontWeight : '800'}
      {...props}
      ref={ref}
    />
  )
})

export const H2 = Text.styleable(({ ...props }, ref) => {
  const font = useCustomFont()
  const fontSize = useFontSizeAdjustment('$9')

  return (
    <Text
      fontFamily={font as unknown as GetThemeValueForKey<'$fontFamily'>}
      fontSize={props.fontSize ? props.fontSize : fontSize}
      fontWeight={props.fontWeight ? props.fontWeight : '800'}
      {...props}
      ref={ref}
    />
  )
})

export const H3 = Text.styleable(({ ...props }, ref) => {
  const font = useCustomFont()
  const fontSize = useFontSizeAdjustment('$8')

  return (
    <Text
      fontFamily={font as unknown as GetThemeValueForKey<'$fontFamily'>}
      fontSize={props.fontSize ? props.fontSize : fontSize}
      fontWeight={props.fontWeight ? props.fontWeight : '800'}
      {...props}
      ref={ref}
    />
  )
})

export const H4 = Text.styleable(({ ...props }, ref) => {
  const font = useCustomFont()
  const fontSize = useFontSizeAdjustment('$7')

  return (
    <Text
      fontFamily={font as unknown as GetThemeValueForKey<'$fontFamily'>}
      fontSize={props.fontSize ? props.fontSize : fontSize}
      fontWeight={props.fontWeight ? props.fontWeight : '800'}
      {...props}
      ref={ref}
    />
  )
})

export const H5 = Text.styleable(({ ...props }, ref) => {
  const font = useCustomFont()
  const fontSize = useFontSizeAdjustment('$6')

  return (
    <Text
      fontFamily={font as unknown as GetThemeValueForKey<'$fontFamily'>}
      fontSize={props.fontSize ? props.fontSize : fontSize}
      fontWeight={props.fontWeight ? props.fontWeight : '800'}
      {...props}
      ref={ref}
    />
  )
})

export const H6 = Text.styleable(({ ...props }, ref) => {
  const font = useCustomFont()
  const fontSize = useFontSizeAdjustment('$5')

  return (
    <Text
      fontFamily={font as unknown as GetThemeValueForKey<'$fontFamily'>}
      fontSize={props.fontSize ? props.fontSize : fontSize}
      fontWeight={props.fontWeight ? props.fontWeight : '800'}
      {...props}
      ref={ref}
    />
  )
})

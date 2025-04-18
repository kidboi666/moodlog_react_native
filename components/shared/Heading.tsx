import { GetThemeValueForKey, Text, TextProps } from 'tamagui'

import { useCustomFont } from '@/hooks/useCustomFont'
import { useFontSizeAdjustment } from '@/hooks/useFontSizeAdjustment'
import { memo } from 'react'

type HeadingFontSize = '$10' | '$9' | '$8' | '$7' | '$6' | '$5'

interface Props extends TextProps {}

const createHeading = (initSize: HeadingFontSize) =>
  Text.styleable<Props>(({ children, fontSize, ...props }, ref) => {
    const font = useCustomFont()
    const size = useFontSizeAdjustment(initSize)
    return (
      <Text
        fontFamily={font as unknown as GetThemeValueForKey<'$fontFamily'>}
        fontSize={fontSize ? fontSize : size}
        fontWeight={props.fontWeight ? props.fontWeight : '800'}
        {...props}
        ref={ref}
      >
        {children}
      </Text>
    )
  })

export const H1 = memo(createHeading('$10'))
export const H2 = memo(createHeading('$9'))
export const H3 = memo(createHeading('$8'))
export const H4 = memo(createHeading('$7'))
export const H5 = memo(createHeading('$6'))
export const H6 = memo(createHeading('$5'))

H1.displayName = 'Heading1'
H2.displayName = 'Heading2'
H3.displayName = 'Heading3'
H4.displayName = 'Heading4'
H5.displayName = 'Heading5'
H6.displayName = 'Heading6'

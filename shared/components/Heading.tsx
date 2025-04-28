import { memo } from 'react'
import { SizableText, SizableTextProps } from 'tamagui'

import { useCustomFont, useFontSizeAdjustment } from '@/shared/hooks'

type HeadingFontSize = '$10' | '$9' | '$8' | '$7' | '$6' | '$5'
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6

interface HeadingProps extends SizableTextProps {
  level?: HeadingLevel
}

const createHeading = (initSize: HeadingFontSize) =>
  SizableText.styleable<HeadingProps>(
    ({ children, fontSize, fontWeight, text, ...props }, ref) => {
      const { fontNameWithTokenPrefix } = useCustomFont()
      const size = useFontSizeAdjustment(initSize)

      return (
        <SizableText
          fontFamily={fontNameWithTokenPrefix}
          fontSize={fontSize ?? size}
          fontWeight={fontWeight ?? '800'}
          text={text}
          {...props}
          ref={ref}
        >
          {children}
        </SizableText>
      )
    },
  )

const HEADING_SIZES: Record<HeadingLevel, HeadingFontSize> = {
  1: '$10',
  2: '$9',
  3: '$8',
  4: '$7',
  5: '$6',
  6: '$5',
}

export const H1 = memo(createHeading(HEADING_SIZES[1]))
export const H2 = memo(createHeading(HEADING_SIZES[2]))
export const H3 = memo(createHeading(HEADING_SIZES[3]))
export const H4 = memo(createHeading(HEADING_SIZES[4]))
export const H5 = memo(createHeading(HEADING_SIZES[5]))
export const H6 = memo(createHeading(HEADING_SIZES[6]))
;[H1, H2, H3, H4, H5, H6].forEach((Component, index) => {
  Component.displayName = `Heading${index + 1}`
})

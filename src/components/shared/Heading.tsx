import React from 'react'
import { TextProps } from 'react-native'
import { customText } from 'react-native-paper'

const Text = customText<'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'>()

interface HeadingProps extends TextProps {
  children: React.ReactNode
}

const createHeading = (variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6') => {
  const HeadingComponent = ({ children, style, ...props }: HeadingProps) => {
    return (
      <Text variant={variant} style={style} {...props}>
        {children}
      </Text>
    )
  }

  HeadingComponent.displayName = `Heading${variant}`
  return HeadingComponent
}

export const H1 = createHeading('h1')
export const H2 = createHeading('h2')
export const H3 = createHeading('h3')
export const H4 = createHeading('h4')
export const H5 = createHeading('h5')
export const H6 = createHeading('h6')

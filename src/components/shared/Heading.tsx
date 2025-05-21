import React from 'react'
import { StyleSheet, Text, TextProps } from 'react-native'

const HEADING_SIZES = {
  1: 36,
  2: 30,
  3: 24,
  4: 20,
  5: 16,
  6: 14,
}

interface HeadingProps extends TextProps {
  children: React.ReactNode
}

const createHeading = (level: 1 | 2 | 3 | 4 | 5 | 6) => {
  const HeadingComponent = ({ children, style, ...props }: HeadingProps) => {
    return (
      <Text
        style={[styles.baseHeading, { fontSize: HEADING_SIZES[level] }, style]}
        {...props}
      >
        {children}
      </Text>
    )
  }

  HeadingComponent.displayName = `Heading${level}`
  return HeadingComponent
}

const styles = StyleSheet.create({
  baseHeading: {
    fontWeight: 'bold',
  },
})

export const H1 = createHeading(1)
export const H2 = createHeading(2)
export const H3 = createHeading(3)
export const H4 = createHeading(4)
export const H5 = createHeading(5)
export const H6 = createHeading(6)

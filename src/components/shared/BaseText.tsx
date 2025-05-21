import React from 'react'
import { StyleSheet, Text, TextProps } from 'react-native'

const FONT_SIZES = {
  $2: 11,
  $3: 13,
  $4: 14,
  $5: 16, // 기본값
  $6: 18,
  $7: 20,
  $8: 24,
  $9: 30,
  $10: 36,
}

interface BaseTextProps extends TextProps {
  children: React.ReactNode
  defaultFontSize?: keyof typeof FONT_SIZES
  color?: string
}

export const BaseText = ({
  children,
  style,
  defaultFontSize = '$5',
  ...props
}: BaseTextProps) => {
  const fontSize = FONT_SIZES[defaultFontSize]

  return (
    <Text style={[styles.text, { fontSize }, style]} {...props}>
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    flexShrink: 1,
    flexWrap: 'wrap',
  },
})

BaseText.displayName = 'BaseText'

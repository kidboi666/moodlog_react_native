import { FontSize } from '@/types'
import React from 'react'
import { StyleSheet, Text, TextProps } from 'react-native'

interface BaseTextProps extends TextProps {
  children: React.ReactNode
  defaultFontSize?: keyof typeof FontSize
  color?: string
}

export const BaseText = ({
  children,
  style,
  defaultFontSize = '$5',
  ...props
}: BaseTextProps) => {
  const fontSize = FontSize[defaultFontSize]

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

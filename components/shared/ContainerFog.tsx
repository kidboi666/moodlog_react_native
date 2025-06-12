import { LinearGradient } from 'expo-linear-gradient'
import { memo } from 'react'
import { StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'

export const ContainerFog = memo(() => {
  const theme = useTheme()
  const bgRgb = hexToRgb(theme.colors.background)
  const transparentBg = `rgba(${bgRgb}, 0)`

  return (
    <LinearGradient
      colors={[
        theme.colors.background,
        `rgba(${bgRgb}, 0.9)`,
        `rgba(${bgRgb}, 0.7)`,
        `rgba(${bgRgb}, 0.3)`,
        transparentBg,
      ]}
      style={styles.background}
    />
  )
})

function hexToRgb(hex: string) {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  const formattedHex = hex.replace(
    shorthandRegex,
    (_, r, g, b) => r + r + g + g + b + b,
  )
  const result =
    /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(formattedHex) || []
  return `${Number.parseInt(result?.[1], 16)}, ${Number.parseInt(result[2], 16)}, ${Number.parseInt(result[3], 16)}`
}

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
    height: 40,
    pointerEvents: 'none',
  },
})
ContainerFog.displayName = 'ContainerFog'

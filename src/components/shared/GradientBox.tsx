import { LinearGradient } from 'expo-linear-gradient'
import { PropsWithChildren } from 'react'
import { StyleSheet } from 'react-native'
import { useTheme } from 'react-native-paper'

export function GradientBox({ children }: PropsWithChildren) {
  const theme = useTheme()
  return (
    <LinearGradient
      colors={[theme.colors.onSurface, theme.colors.onSurfaceVariant]}
      style={styles.outer}
      start={{ x: 0, y: -0.8 }}
      end={{ x: 0.8, y: 1 }}
      locations={[0, 1]}
    >
      <LinearGradient
        colors={[theme.colors.onSurfaceVariant, theme.colors.onSurface]}
        style={styles.inner}
        start={{ x: 0, y: -0.8 }}
        end={{ x: 0.8, y: 1 }}
        locations={[0, 1]}
      >
        {children}
      </LinearGradient>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  outer: {
    padding: 6,
    borderRadius: 20,
    elevation: 2,
  },
  inner: {
    padding: 12,
    borderRadius: 16,
  },
})

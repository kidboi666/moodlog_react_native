import { useColors } from '@/hooks'
import { LinearGradient } from 'expo-linear-gradient'
import { PropsWithChildren } from 'react'
import { StyleSheet } from 'react-native'

export function GradientBox({ children }: PropsWithChildren) {
  const { tokens } = useColors()
  return (
    <LinearGradient
      colors={[tokens.neutral['1000'], tokens.neutral['900']]}
      style={styles.outer}
      start={{ x: 0, y: -0.8 }}
      end={{ x: 0.8, y: 1 }}
      locations={[0, 1]}
    >
      <LinearGradient
        colors={[tokens.neutral['900'], tokens.neutral['1000']]}
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
  },
  inner: {
    padding: 12,
    borderRadius: 16,
  },
})

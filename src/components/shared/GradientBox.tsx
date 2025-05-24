import { LinearGradient } from 'expo-linear-gradient'
import { PropsWithChildren } from 'react'
import { StyleSheet } from 'react-native'
import { MD3Colors, Surface } from 'react-native-paper'

export function GradientBox({ children }: PropsWithChildren) {
  return (
    <LinearGradient
      colors={[MD3Colors.neutral100, MD3Colors.neutral90]}
      style={styles.outer}
      start={{ x: 0, y: -0.8 }}
      end={{ x: 0.8, y: 1 }}
      locations={[0, 1]}
    >
      <LinearGradient
        colors={[MD3Colors.neutral90, MD3Colors.neutral100]}
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

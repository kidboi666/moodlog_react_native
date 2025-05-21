import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

interface Props {
  duration?: number
  emoji: string
}

export function ShakeEmoji({ duration = 6000, emoji }: Props) {
  const [isShaking, setIsShaking] = useState(true)
  const rotate = useSharedValue('0deg')

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: rotate.value }],
  }))

  useEffect(() => {
    let shakeInterval: NodeJS.Timeout
    let stopTimer: NodeJS.Timeout

    if (isShaking) {
      shakeInterval = setInterval(() => {
        rotate.value = withTiming(rotate.value === '0deg' ? '60deg' : '0deg')
      }, 300)
    }

    if (duration) {
      stopTimer = setTimeout(() => {
        setIsShaking(false)
      }, duration)
    }

    return () => {
      clearInterval(shakeInterval)
      clearTimeout(stopTimer)
    }
  }, [duration, isShaking])

  return (
    <View style={styles.container}>
      <Animated.Text style={[animatedStyle, styles.font]}>
        {emoji}
      </Animated.Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  font: {
    fontSize: 32,
  },
})

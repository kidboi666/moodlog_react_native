import { useEffect, useState } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Button, H1 } from 'tamagui'

interface Props {
  duration?: number
  emoji: string
}

export function ShakeEmoji({ duration = 6000, emoji }: Props) {
  const [isShaking, setIsShaking] = useState(true)
  const rotate = useSharedValue('0deg')

  const styles = useAnimatedStyle(() => ({
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
    <AnimatedEmoji
      unstyled
      style={styles}
      onPress={() => setIsShaking(prev => !prev)}
    >
      <H1>{emoji}</H1>
    </AnimatedEmoji>
  )
}

const AnimatedEmoji = Animated.createAnimatedComponent(Button)

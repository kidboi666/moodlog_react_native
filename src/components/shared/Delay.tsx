import { PropsWithChildren, useMemo } from 'react'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated'

import { DelayMS } from '@/constants'
import { useAnimatedEntry } from '@/hooks'

interface Props {
  delay?: number
  duration?: number
  variant?: 'falldown' | 'float' | 'fade'
}

export const Delay = ({
  delay = DelayMS.ANIMATION.MEDIUM[0],
  variant = 'fade',
  duration = 800,
  children,
}: PropsWithChildren<Props>) => {
  const { isVisible, item } = useAnimatedEntry(delay, children)

  const variantStyle = useMemo(
    () => ({
      fade: FadeIn.duration(duration).delay(delay),
      float: FadeInDown.duration(duration).delay(delay),
      falldown: FadeInUp.duration(duration).delay(delay),
    }),
    [duration, delay],
  )

  return (
    <Animated.View entering={variantStyle[variant]}>
      {isVisible ? item : null}
    </Animated.View>
  )
}

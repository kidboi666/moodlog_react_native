import { PropsWithChildren, useMemo } from 'react'
import { ViewProps } from 'react-native'
import Animated, { FadeIn, FadeInDown, FadeInUp } from 'react-native-reanimated'

import { DelayMS } from '@/src/constants'
import { useAnimatedEntry } from '@/src/hooks'

interface Props extends ViewProps {
  delay?: number
  duration?: number
  variant?: 'falldown' | 'float' | 'fade'
}

export const Delay = ({
  delay = DelayMS.ANIMATION.MEDIUM,
  variant = 'fade',
  duration = 800,
  style,
  children,
  ...props
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
    <Animated.View style={style} entering={variantStyle[variant]} {...props}>
      {isVisible ? item : null}
    </Animated.View>
  )
}

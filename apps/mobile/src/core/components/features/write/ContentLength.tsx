import { memo, useEffect } from 'react'
import { View } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'

import * as S from './ContentLength.styled'

interface Props {
  length: number
}

export const ContentLength = memo(({ length }: Props) => {
  const isGreen = length > 0
  const isYellow = length >= 250
  const isRed = length >= 300
  const scale = useSharedValue(1)

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: withSpring(scale.value) }],
      alignSelf: 'flex-end',
    }
  })

  useEffect(() => {
    if (length === 300) {
      scale.value = 1.2
      setTimeout(() => {
        scale.value = 1
      }, 300)
    }
  }, [length])

  return (
    <Animated.View style={animatedStyle}>
      <S.CharNum isGreen={isGreen} isYellow={isYellow} isRed={isRed}>
        {length} / 300
      </S.CharNum>
    </Animated.View>
  )
})

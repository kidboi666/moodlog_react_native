import { memo, useEffect } from 'react'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated'
import { Text, styled } from 'tamagui'

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
      <CharNum isGreen={isGreen} isYellow={isYellow} isRed={isRed}>
        {length} / 300
      </CharNum>
    </Animated.View>
  )
})

const CharNum = styled(Text, {
  color: '$color10',
  fontWeight: '800',

  variants: {
    isGreen: {
      true: {
        color: '$green10',
      },
    },

    isYellow: {
      true: {
        color: '$yellow10',
      },
    },
    isRed: {
      true: {
        color: '$red10',
      },
    },
  } as const,
})

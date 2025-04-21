import { PressableButton } from '@/components/shared/PressableButton'
import {
  BackdropBlur,
  BlurMask,
  Canvas,
  Circle,
  LinearGradient,
  Rect,
  RoundedRect,
  vec,
} from '@shopify/react-native-skia'
import { BlurView } from 'expo-blur'
import React, { useEffect, useState } from 'react'
import { useWindowDimensions } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Portal, YStack } from 'tamagui'

export const WaveEffect = () => {
  const { width, height } = useWindowDimensions()
  const [isExpanded, setIsExpanded] = useState(false)
  const expandedScale = 30
  const collapsedScale = 0
  const cardWidth = (width * 0.8) / 2
  const cardHeight = (cardWidth * 0.6) / 2
  const scale = useSharedValue(collapsedScale)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))

  const onPress = () => {
    setIsExpanded(prev => !prev)
  }

  useEffect(() => {
    scale.value = withTiming(isExpanded ? expandedScale : collapsedScale, {
      duration: 600,
    })
  }, [isExpanded])

  return (
    <YStack flex={1} bg='$red8'>
      <PressableButton onPress={onPress}>파도타기</PressableButton>
      <Portal>
        <Canvas>
          <Circle c={vec(128)} r={128} color='red' />
          <BackdropBlur
            blur={10}
            clip={{
              x: 0,
              y: cardHeight * 0.4,
              width: cardWidth,
              height: cardHeight * 0.6,
            }}
          >
            {/* 그라데이션 오버레이로 부드러운 전환 생성 */}
            <Rect
              x={0}
              y={cardHeight * 0.4}
              width={cardWidth}
              height={cardHeight * 0.6}
            >
              <LinearGradient
                start={vec(0, cardHeight * 0.4)}
                end={vec(0, cardHeight * 0.6)}
                colors={[
                  'rgba(0, 0, 0, 0)', // 상단은 완전 투명
                  'rgba(0, 0, 0, 0.3)', // 하단은 반투명
                ]}
              />
            </Rect>
          </BackdropBlur>
        </Canvas>
      </Portal>
    </YStack>
  )
}

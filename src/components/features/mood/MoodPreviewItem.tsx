import {
  Blur,
  Canvas,
  Circle,
  Color,
  Paragraph,
  Skia,
} from '@shopify/react-native-skia'
import { useEffect } from 'react'
import { ViewProps, useWindowDimensions } from 'react-native'
import Animated, {
  Easing,
  SharedValue,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSequence,
  withTiming,
} from 'react-native-reanimated'

import { useSkiaParagraph } from '@/hooks'

interface Props extends ViewProps {
  name: string
  color: SharedValue<string> | string
  x: number
  y: number
  size: number
  duration: number
}

export function MoodPreviewItem({ name, color, x, y, size, duration }: Props) {
  const { width, height } = useWindowDimensions()
  const { paragraph } = useSkiaParagraph(name)
  const skiaColor = Skia.Color(color as unknown as Color)

  const centerX = width / 2
  const startX = x + size / 2
  const targetY = height / 6
  const r = size / 2

  const progress = useSharedValue(0)
  const canvasHeight = useSharedValue(height)
  const cy = useSharedValue(y)
  const cx = useSharedValue(startX)

  const animatedStyle = useAnimatedStyle(() => ({
    width,
    height: canvasHeight.value,
    opacity: progress.value,
  }))

  const leftX = useDerivedValue(() => {
    if (progress.value <= 1) return cx.value
    return cx.value - r
  })
  const rightX = useDerivedValue(() => {
    if (progress.value <= 1) return cx.value
    return cx.value + r
  })

  const textX = useDerivedValue(() => rightX.value - r, [])
  const textY = useDerivedValue(() => cy.value - 14, [])
  const textWidth = useDerivedValue(() => r * 2, [])

  useEffect(() => {
    progress.value = withTiming(1, { duration })
    cx.value = withTiming(centerX, { duration })
    cy.value = withTiming(targetY, { duration })
    canvasHeight.value = withSequence(
      withTiming(height / 2, { duration: duration / 1.4 }),
    )
  }, [])

  return (
    <Animated.View style={animatedStyle}>
      <Canvas style={{ width, height }}>
        <Circle cx={leftX} cy={cy} r={r} color={skiaColor} opacity={0.4} />
        <Circle cx={cx} cy={cy} r={r} color={skiaColor} opacity={0.4}>
          <Blur blur={20} />
        </Circle>
        <Circle cx={cx} cy={cy} r={r} color={skiaColor} opacity={0.4} />
        <Circle cx={rightX} cy={cy} r={r} color={skiaColor} />
        <Paragraph
          paragraph={paragraph}
          x={textX}
          y={textY}
          width={textWidth}
        />
      </Canvas>
    </Animated.View>
  )
}

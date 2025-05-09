import {
  BlendColor,
  Blur,
  Canvas,
  Circle,
  Group,
  SRGBToLinearGamma,
} from '@shopify/react-native-skia'
import React, { PropsWithChildren, useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Portal } from 'tamagui'

interface Props {
  active: boolean
  color: string
  duration?: number
}

export const WaveEffect = ({
  children,
  active,
  color,
  duration = 800,
}: PropsWithChildren<Props>) => {
  const { width, height } = useWindowDimensions()
  const r = useSharedValue(0)
  const topY = useSharedValue(height)
  const leftY = useSharedValue(height)
  const rightY = useSharedValue(height)
  const blur = useDerivedValue(() => r.value / 4 + 30)

  useEffect(() => {
    if (active) {
      r.value = withTiming(400, { duration: duration / 2 })
      topY.value = withTiming(height / 4, { duration })
      leftY.value = withTiming(height / 1.4, { duration })
      rightY.value = withTiming(height / 2.2, { duration })
    } else {
      r.value = withTiming(0, { duration })
      topY.value = withTiming(height, { duration: duration / 2 })
      leftY.value = withTiming(height, { duration: duration / 2 })
      rightY.value = withTiming(height, { duration: duration / 2 })
    }
  }, [active])

  return (
    <Portal>
      <Canvas style={{ flex: 1 }}>
        <Circle cx={width / 4} cy={leftY} r={r} color={color} opacity={0.9}>
          <Blur blur={blur} />
        </Circle>
        <Circle cx={width / 1.2} cy={rightY} r={r} color={color}>
          <Blur blur={blur} />
        </Circle>
        <Group>
          <SRGBToLinearGamma>
            <BlendColor color={color} mode='srcIn' />
          </SRGBToLinearGamma>
          <Circle cx={width / 3.2} cy={topY} r={r} color={color} opacity={0.6}>
            <Blur blur={blur} />
          </Circle>
        </Group>
        {children}
      </Canvas>
    </Portal>
  )
}

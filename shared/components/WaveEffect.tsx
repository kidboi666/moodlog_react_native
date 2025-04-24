import { Blur, Canvas, Circle } from '@shopify/react-native-skia'
import React, { PropsWithChildren, useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import { useSharedValue, withTiming } from 'react-native-reanimated'
import { AnimatePresence, Portal, useTheme } from 'tamagui'

interface Props {
  active: boolean
}

export const WaveEffect = ({ children, active }: PropsWithChildren<Props>) => {
  const { width, height } = useWindowDimensions()
  const theme = useTheme()
  const duration = 800
  const blur = 200
  const r = useSharedValue(0)
  const topY = useSharedValue(height)
  const leftY = useSharedValue(height)
  const rightY = useSharedValue(height)

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
      <Canvas style={{ flex: 1, pointerEvents: 'none' }}>
        <Circle
          cx={width / 4}
          cy={leftY}
          r={r}
          color={theme.red9.val}
          opacity={0.9}
        >
          <Blur blur={blur} />
        </Circle>
        <Circle
          cx={width / 1.2}
          cy={rightY}
          r={r}
          color={theme.blue9.val}
          opacity={0.9}
        >
          <Blur blur={blur} />
        </Circle>
        <Circle
          cx={width / 3.2}
          cy={topY}
          r={r}
          color={theme.purple9.val}
          opacity={0.8}
        >
          <Blur blur={blur} />
        </Circle>
      </Canvas>
      <AnimatePresence>{children}</AnimatePresence>
    </Portal>
  )
}

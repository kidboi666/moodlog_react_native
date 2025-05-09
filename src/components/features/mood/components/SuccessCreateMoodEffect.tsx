import { Path, Skia } from '@shopify/react-native-skia'
import { useEffect } from 'react'
import { useWindowDimensions } from 'react-native'
import {
  Easing,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { WaveEffect } from '@/components/shared'
import { DelayMS } from '@/constants'

interface Props {
  active: boolean
  color: string
}

export const SuccessCreateMoodEffect = ({ active, color }: Props) => {
  const { width, height } = useWindowDimensions()
  const center = { x: width / 2, y: height / 2 }
  const startPoints = { x: center.x - 100, y: center.y - 100 }
  const duration = 800
  const size = 200
  const strokeWidth = 8
  const progress = useSharedValue(0)
  const checkPoints = {
    start: { x: startPoints.x + size * 0.3, y: startPoints.y + size * 0.5 },
    middle: { x: startPoints.x + size * 0.45, y: startPoints.y + size * 0.7 },
    end: { x: startPoints.x + size * 0.7, y: startPoints.y + size * 0.3 },
  }

  const animatedPath = useDerivedValue(() => {
    const path = Skia.Path.Make()

    if (progress.value === 0) {
      return path
    }

    path.moveTo(checkPoints.start.x, checkPoints.start.y)

    if (progress.value < 0.5) {
      const currentProgress = progress.value * 2
      const midX =
        checkPoints.start.x +
        (checkPoints.middle.x - checkPoints.start.x) * currentProgress
      const midY =
        checkPoints.start.y +
        (checkPoints.middle.y - checkPoints.start.y) * currentProgress
      path.lineTo(midX, midY)
    } else {
      path.lineTo(checkPoints.middle.x, checkPoints.middle.y)

      const currentProgress = (progress.value - 0.5) * 2 // 0~1 범위로 정규화
      const endX =
        checkPoints.middle.x +
        (checkPoints.end.x - checkPoints.middle.x) * currentProgress
      const endY =
        checkPoints.middle.y +
        (checkPoints.end.y - checkPoints.middle.y) * currentProgress
      path.lineTo(endX, endY)
    }

    return path
  }, [progress])

  useEffect(() => {
    let timeout: NodeJS.Timeout
    if (active) {
      timeout = setTimeout(() => {
        progress.value = withTiming(1, {
          duration,
          easing: Easing.bezier(0.25, 0.1, 0.25, 1),
        })
      }, DelayMS.ANIMATION.LONG[0])
    } else {
      progress.value = withTiming(0, {
        duration: duration / 3,
      })
    }

    return () => clearTimeout(timeout)
  }, [active])

  if (!active) return null

  return (
    <WaveEffect active={active} color={color} duration={duration}>
      <Path
        path={animatedPath}
        color='white'
        style='stroke'
        strokeWidth={strokeWidth}
        strokeJoin='round'
        strokeCap='round'
      />
    </WaveEffect>
  )
}

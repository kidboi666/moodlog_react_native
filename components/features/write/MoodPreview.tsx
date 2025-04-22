import {
  Canvas,
  Circle,
  Paragraph,
  Skia,
  TextAlign,
  useFonts,
} from '@shopify/react-native-skia'
import { useEffect, useMemo } from 'react'
import {
  Easing,
  SharedValue,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated'
import { View } from 'tamagui'

interface Props {
  name: string
  color: SharedValue<string>
}

export const MoodPreview = ({ name, color }: Props) => {
  const fontMgr = useFonts({
    LeeSeoyun: [require('../../../assets/fonts/LeeSeoyun-Regular.ttf')],
  })
  const paragraph = useMemo(() => {
    if (!fontMgr) {
      return null
    }
    const paragraphStyle = {
      textAlign: TextAlign.Center,
    }
    const textStyle = {
      color: Skia.Color('white'),
      fontFamily: 'LeeSeoyun',
      fontSize: 24,
    }
    return Skia.ParagraphBuilder.Make(paragraphStyle, fontMgr)
      .pushStyle(textStyle)
      .addText(name)
      .pop()
      .build()
  }, [name])
  const skiaColor = Skia.Color(color)
  const r = 100
  const p = 80
  const canvasSize = r * 2 + p
  const center = r + p / 2
  const fullMoodPath = useSharedValue(center)
  const halfMoodPath = useSharedValue(center)
  const zeroMoodPath = useSharedValue(center)
  const textX = useDerivedValue(() => fullMoodPath.value / 8)
  const textY = useDerivedValue(() => fullMoodPath.value / 1.2)

  useEffect(() => {
    fullMoodPath.value = withSequence(
      withTiming(r, {
        duration: 1200,
        easing: Easing.inOut(Easing.quad),
      }),
      withRepeat(
        withTiming(r + 8, {
          duration: 5000,
        }),
        -1,
        true,
      ),
    )
    zeroMoodPath.value = withSequence(
      withTiming(r + p, {
        duration: 1200,
        easing: Easing.inOut(Easing.quad),
      }),
      withRepeat(
        withTiming(r + p - 8, {
          duration: 5000,
        }),
        -1,
        true,
      ),
    )
  }, [color])

  return (
    <View items='center' justify='center' flex={1}>
      <Canvas
        style={{
          width: canvasSize,
          height: canvasSize,
        }}
      >
        <Circle cx={fullMoodPath} cy={fullMoodPath} r={r} color={skiaColor} />
        <Circle
          cx={halfMoodPath}
          cy={halfMoodPath}
          r={r}
          color={skiaColor}
          opacity={0.8}
        />
        <Circle
          cx={zeroMoodPath}
          cy={zeroMoodPath}
          r={100}
          color={skiaColor}
          opacity={0.4}
        />
        <Paragraph
          paragraph={paragraph}
          x={textX}
          y={textY}
          color='white'
          width={r * 2}
        />
      </Canvas>
    </View>
  )
}

import {
  Blur,
  Canvas,
  Circle,
  Color,
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
import { View, ViewProps, styled } from 'tamagui'

import { useCustomFont } from '@/shared/hooks'
import { useStepProgress } from '@/shared/store'

interface Props extends ViewProps {
  name: string
  color: SharedValue<string> | string
}

export const MoodPreviewItem = ({ name, color, ...props }: Props) => {
  const {
    state: { currentStep },
  } = useStepProgress()
  const { fontName } = useCustomFont()
  const customFontMgr = useFonts(fontList)
  const paragraph = useMemo(() => {
    if (!customFontMgr) {
      return null
    }
    const paragraphStyle = {
      textAlign: TextAlign.Center,
    }
    const textStyle = {
      color: Skia.Color('white'),
      fontSize: 24,
      fontFamilies: [fontName],
      fontWeight: '600',
    }
    return Skia.ParagraphBuilder.Make(paragraphStyle, customFontMgr)
      .pushStyle(textStyle)
      .addText(name)
      .pop()
      .build()
  }, [name, customFontMgr])
  const skiaColor = Skia.Color(color as unknown as Color)
  const r = 100
  const p = 80
  const canvasSize = r * 2 + p
  const center = r + p / 2
  const fullMoodPath = useSharedValue(center)
  const halfMoodPath = useSharedValue(center)
  const zeroMoodPath = useSharedValue(center)
  const textX = useDerivedValue(() => fullMoodPath.value - r)
  const textY = useDerivedValue(() => fullMoodPath.value - 12)

  useEffect(() => {
    fullMoodPath.value = withSequence(
      withTiming(currentStep === 1 ? r : center, {
        duration: 1200,
        easing: Easing.inOut(Easing.quad),
      }),
      withRepeat(
        withTiming(currentStep === 1 ? r + 8 : center + 8, {
          duration: 3000,
        }),
        -1,
        true,
      ),
    )
    zeroMoodPath.value = withSequence(
      withTiming(currentStep === 1 ? r + p : center, {
        duration: 1200,
        easing: Easing.inOut(Easing.quad),
      }),
      withRepeat(
        withTiming(currentStep === 1 ? r + p - 8 : center + 8, {
          duration: 3000,
        }),
        -1,
        true,
      ),
    )
  }, [color, currentStep])

  return (
    <Container {...props}>
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
          opacity={0.4}
        >
          <Blur blur={20} />
        </Circle>
        <Circle
          cx={halfMoodPath}
          cy={halfMoodPath}
          r={r}
          color={skiaColor}
          opacity={0.4}
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
    </Container>
  )
}

const Container = styled(View, {
  items: 'center',
  justify: 'center',
  flex: 1,
})

const fontList = {
  pretendard: [require('../../../assets/fonts/Pretendard-Bold.ttf')],
  esamanru: [require('../../../assets/fonts/Esamanru-Bold.otf')],
  leeSeoyun: [require('../../../assets/fonts/LeeSeoyun-Regular.ttf')],
  nanumPenScript: [require('../../../assets/fonts/NanumPenScript-Regular.ttf')],
  robotoMono: [require('../../../assets/fonts/RobotoMono-Bold.ttf')],
}

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { View, XStack, styled } from 'tamagui'

import { BaseText } from '@/components/shared'
import { MoodLevel } from '@/types'

interface Props {
  name?: string
  level?: MoodLevel
  color?: string
  percentage: number
}

export const ChartItem = ({ name, level, color, percentage }: Props) => {
  const { t } = useTranslation()
  const widthValue = useSharedValue(0)
  const animatedStyles = useAnimatedStyle(() => ({
    width: widthValue.value,
  }))

  useEffect(() => {
    if (percentage > 0) {
      setTimeout(() => {
        widthValue.value = withTiming(percentage, {
          duration: 2000,
        })
      }, 1000)
    }
  }, [percentage])

  if (!name || !level || !color) return null

  return (
    <ChartItemContainer>
      <AnimatedChartItem style={animatedStyles} moodColor={color} />
      <PercentageText>{t(`moods.levels.${level}`)}</PercentageText>
      <PercentageText>{name}</PercentageText>
    </ChartItemContainer>
  )
}

const ChartItemContainer = styled(XStack, {
  flex: 1,
  gap: '$2',
})

const Item = styled(View, {
  height: '$1',
  rounded: '$4',
  width: '100%',

  variants: {
    moodColor: {
      ':string': bg => ({ bg }),
    },
  } as const,
})

const PercentageText = styled(BaseText, {
  fontSize: '$1',
  color: '$color10',
  mt: '$1',
})

const AnimatedChartItem = Animated.createAnimatedComponent(Item)

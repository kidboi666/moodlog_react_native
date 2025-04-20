import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { MoodLevel } from '@/types'

import * as S from './ChartItem.styled'

const AnimatedChartItem = Animated.createAnimatedComponent(S.ChartItem)

interface Props {
  name?: string
  level?: MoodLevel
  color?: string
  percentage: number
}

export const ChartItem = ({ name, level, color, percentage }: Props) => {
  const widthValue = useSharedValue(0)
  const { t } = useTranslation()
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
    <S.ChartItemContainer>
      <AnimatedChartItem style={animatedStyles} moodColor={color} />
      <S.PercentageText>{t(`moods.levels.${level}`)}</S.PercentageText>
      <S.PercentageText>{name}</S.PercentageText>
    </S.ChartItemContainer>
  )
}

import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { XStack, YStack } from 'tamagui'

import { BaseText, H3 } from '@/shared/components'
import { WEEK_DAY } from '@/shared/constants'
import { useWeeklyMoodStats } from '@/shared/hooks'
import { useMood } from '@/shared/store'
import { type ISOMonthString, MoodLevel } from '@/shared/types'
import { DateUtils } from '@/shared/utils'
import { ChartItem } from './ChartItem'

const AnimatedBox = Animated.createAnimatedComponent(XStack)
const AnimatedText = Animated.createAnimatedComponent(BaseText)

interface Props {
  selectedMonth: ISOMonthString
}

export const WeeklyMoodChart = ({ selectedMonth }: Props) => {
  const now = new Date()
  const date = now.getDate()
  const dateString = DateUtils.getISODateFromMonthString(selectedMonth, date)
  const { t } = useTranslation()
  const { stats } = useWeeklyMoodStats(dateString)
  const moods = useMood(state => state.moods)

  const days = Array(7)
    .fill(0)
    .map(() => useSharedValue(0))

  const animatedStyles = days.map(day =>
    useAnimatedStyle(() => ({
      opacity: day.value,
      transform: [{ translateY: (1 - day.value) * 20 }],
    })),
  )

  useEffect(() => {
    setTimeout(() => {
      days.forEach((day, index) => {
        day.value = withDelay(
          index * 100,
          withTiming(1, {
            duration: 800,
            easing: Easing.inOut(Easing.quad),
          }),
        )
      })
    }, 1000)
  }, [])

  return (
    <YStack flex={1} rounded='$8' bg='$color4' p='$4' gap='$3'>
      <H3>{t('statistics.weeklyMood.title')}</H3>
      <BaseText>{t('statistics.weeklyMood.description')}</BaseText>

      <YStack>
        {Object.keys(WEEK_DAY).map((day, index) => {
          const MOOD_LEVEL_PERCENTAGES: Record<MoodLevel, number> = {
            [MoodLevel.ZERO]: 25,
            [MoodLevel.HALF]: 110,
            [MoodLevel.FULL]: 220,
          }
          const id = stats[day]?.id ?? ''
          const percentages = stats[day]?.level
            ? MOOD_LEVEL_PERCENTAGES[stats[day].level]
            : 0
          return (
            <AnimatedBox
              gap='$4'
              height='$2'
              key={`${index}-${day}`}
              style={animatedStyles[index]}
            >
              <AnimatedText fontWeight='700' color='$color10'>
                {t(`calendar.daysShort.${day}`)}
              </AnimatedText>
              <XStack flex={1}>
                <ChartItem
                  name={moods[id]?.name}
                  level={stats[day]?.level}
                  color={moods[id]?.color}
                  percentage={percentages}
                />
              </XStack>
            </AnimatedBox>
          )
        })}
      </YStack>
    </YStack>
  )
}

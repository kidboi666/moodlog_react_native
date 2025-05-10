import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { XStack, YStack, styled } from 'tamagui'

import { BaseText, H3 } from '@/components/shared'
import { WEEK_DAY } from '@/constants'
import { useWeeklyMoodStats } from '@/hooks'
import { useMood } from '@/store'
import { type ISOMonthString, MoodLevel } from '@/types'
import { DateUtils } from '@/utils'
import { ChartItem } from './ChartItem'

interface Props {
  selectedMonth: ISOMonthString
}

export function WeeklyMoodChart({ selectedMonth }: Props) {
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
    <Container>
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
            <AnimatedBox key={`${index}-${day}`} style={animatedStyles[index]}>
              <AnimatedText>{t(`calendar.daysShort.${day}`)}</AnimatedText>
              <ChartItemXStack>
                <ChartItem
                  name={moods[id]?.name}
                  level={stats[day]?.level}
                  color={moods[id]?.color}
                  percentage={percentages}
                />
              </ChartItemXStack>
            </AnimatedBox>
          )
        })}
      </YStack>
    </Container>
  )
}

const Container = styled(YStack, {
  flex: 1,
  rounded: '$8',
  bg: '$color4',
  p: '$4',
  gap: '$3',
})

const StyledAnimationBox = styled(XStack, {
  gap: '$4',
  height: '$2',
})

const StyledAnimationText = styled(BaseText, {
  fontWeight: 700,
  color: '$color10',
})

const ChartItemXStack = styled(XStack, {
  flex: 1,
})

const AnimatedBox = Animated.createAnimatedComponent(StyledAnimationBox)
const AnimatedText = Animated.createAnimatedComponent(StyledAnimationText)

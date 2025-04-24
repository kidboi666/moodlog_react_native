import { useTranslation } from 'react-i18next'
import { ScrollView, XStack, YStack } from 'tamagui'

import { ANIMATION_DELAY_MS } from 'shared/constants'
import { useCalendar } from 'shared/hooks'
import type { ISOMonthString } from 'shared/types'

import {
  MoodAverage,
  TotalCount,
  WeeklyMoodChart,
} from '@/features/statistic/components'
import { AnimatedEntry, H1, ViewContainer } from '@/shared/components'

export default function StatisticScreen() {
  const { selectedYear, selectedMonth, todayString } = useCalendar()
  const { t } = useTranslation()

  const monthString = selectedMonth
    ? selectedMonth
    : (todayString.substring(0, 7) as ISOMonthString)

  return (
    <ScrollView>
      <ViewContainer edges={['top', 'bottom']} padded gap='$4'>
        <XStack justify='space-between' items='flex-end'>
          <H1>{t('statistics.title')}</H1>
        </XStack>
        <AnimatedEntry delay={ANIMATION_DELAY_MS[0]}>
          <YStack gap='$4'>
            <XStack gap='$4'>
              <TotalCount
                selectedYear={selectedYear}
                selectedMonth={selectedMonth || monthString}
              />
              <MoodAverage
                selectedYear={selectedYear}
                selectedMonth={selectedMonth || monthString}
              />
            </XStack>
            <WeeklyMoodChart selectedMonth={selectedMonth || monthString} />
          </YStack>
        </AnimatedEntry>
      </ViewContainer>
    </ScrollView>
  )
}

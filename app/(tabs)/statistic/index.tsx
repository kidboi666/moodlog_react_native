import { useTranslation } from 'react-i18next'
import { ScrollView, XStack, YStack } from 'tamagui'

import {
  MoodAverage,
  TotalCount,
  WeeklyMoodChart,
} from '@/features/statistic/components'
import { H1, ViewContainer } from '@/shared/components'
import { useCalendar } from '@/shared/hooks'
import type { ISOMonthString } from '@/shared/types'

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
        <YStack gap='$4'>
          <TotalCount
            selectedYear={selectedYear}
            selectedMonth={selectedMonth || monthString}
          />
          <MoodAverage
            selectedYear={selectedYear}
            selectedMonth={selectedMonth || monthString}
          />
          <WeeklyMoodChart selectedMonth={selectedMonth || monthString} />
        </YStack>
      </ViewContainer>
    </ScrollView>
  )
}

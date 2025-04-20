import { useTranslation } from 'react-i18next'
import { ScrollView, XStack, YStack } from 'tamagui'

import { ANIMATION_DELAY_MS } from '@/constants'
import { useCalendar } from '@/hooks'
import type { ISOMonthString } from '@/types'

import {
  MoodAverage,
  TotalCount,
  WeeklyMoodChart,
} from '@/components/features/statistics'
import { FadeIn, H1, ViewContainer } from '@/components/shared'

export default function Screen() {
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
        <FadeIn delay={ANIMATION_DELAY_MS[0]}>
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
        </FadeIn>
      </ViewContainer>
    </ScrollView>
  )
}

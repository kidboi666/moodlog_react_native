import { useTranslation } from 'react-i18next'
import { ScrollView, XStack, YStack, styled } from 'tamagui'

import {
  Garden,
  LogStreak,
  StartDay,
  TotalCount,
} from '@/components/features/statistic'
import { H1, ViewContainer } from '@/components/shared'
import { useCalendar } from '@/hooks'
import { JournalQueries } from '@/queries'
import { ISOMonthString, TimeRange } from '@/types'
import { useQuery } from '@tanstack/react-query'

export default function StatisticScreen() {
  const {
    selectedYear,
    selectedMonth,
    todayString,
    isSelectedMonth,
    onSelectedMonthChange,
  } = useCalendar()
  const { t } = useTranslation()
  const { data: journals } = useQuery(
    JournalQueries.getJournals(TimeRange.YEARLY, selectedYear),
  )

  const monthString = selectedMonth
    ? selectedMonth
    : (todayString.substring(0, 7) as ISOMonthString)

  if (!journals) return null

  return (
    <ScrollView>
      <Container>
        <TitleXStack>
          <H1>{t('statistics.title')}</H1>
        </TitleXStack>
        <ContentYStack>
          <StatisticsRow>
            <TotalCount />
            <StartDay />
          </StatisticsRow>
          <LogStreak />
          <Garden
            journals={journals}
            selectedYear={selectedYear}
            isSelectedMonth={isSelectedMonth}
            onSelectedMonthChange={onSelectedMonthChange}
          />
          {/*<MoodAverage*/}
          {/*  selectedYear={selectedYear}*/}
          {/*  selectedMonth={selectedMonth || monthString}*/}
          {/*/> */}
          {/*<WeeklyMoodChart selectedMonth={selectedMonth || monthString} />*/}
        </ContentYStack>
      </Container>
    </ScrollView>
  )
}

const Container = styled(ViewContainer, {
  edges: ['top', 'bottom'],
  gap: '$4',
  padded: true,
})

const TitleXStack = styled(XStack, {
  justify: 'space-between',
  items: 'flex-end',
})

const ContentYStack = styled(YStack, {
  gap: '$4',
})

const StatisticsRow = styled(XStack, {
  gap: '$4',
})

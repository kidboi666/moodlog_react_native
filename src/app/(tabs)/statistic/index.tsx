import { useTranslation } from 'react-i18next'
import { ScrollView, XStack, YStack, styled } from 'tamagui'

import {
  LogStreak,
  StartDay,
  TotalCount,
} from '@/components/features/statistic'
import { H1, ViewContainer } from '@/components/shared'
import { useCalendar } from '@/hooks'
import type { ISOMonthString } from '@/types'

export default function StatisticScreen() {
  const { selectedYear, selectedMonth, todayString } = useCalendar()
  const { t } = useTranslation()

  const monthString = selectedMonth
    ? selectedMonth
    : (todayString.substring(0, 7) as ISOMonthString)

  return (
    <ScrollView>
      <Container>
        <TitleXStack>
          <H1>{t('statistics.title')}</H1>
        </TitleXStack>
        <ContentYStack>
          <XStack gap='$4'>
            <TotalCount
              selectedYear={selectedYear}
              selectedMonth={selectedMonth || monthString}
            />
            <StartDay />
          </XStack>
          {/*<MoodAverage*/}
          {/*  selectedYear={selectedYear}*/}
          {/*  selectedMonth={selectedMonth || monthString}*/}
          {/*/> */}
          {/*<WeeklyMoodChart selectedMonth={selectedMonth || monthString} />*/}
          <LogStreak />
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

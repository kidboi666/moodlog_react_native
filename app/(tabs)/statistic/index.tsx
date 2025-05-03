import { useTranslation } from 'react-i18next'
import { ScrollView, XStack, YStack, styled } from 'tamagui'

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
      <Container>
        <TitleXStack>
          <H1>{t('statistics.title')}</H1>
        </TitleXStack>
        <ContentYStack>
          <TotalCount
            selectedYear={selectedYear}
            selectedMonth={selectedMonth || monthString}
          />
          <MoodAverage
            selectedYear={selectedYear}
            selectedMonth={selectedMonth || monthString}
          />
          <WeeklyMoodChart selectedMonth={selectedMonth || monthString} />
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

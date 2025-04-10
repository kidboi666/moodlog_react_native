import { useTranslation } from 'react-i18next'
import { H1, ScrollView } from 'tamagui'

import { WeeklyMoodChart } from '@/core/components/features/statistics/WeeklyMoodChart'
import { MoodAverage } from '@/core/components/features/statistics/mood-average/MoodAverage'
import { TotalCount } from '@/core/components/features/statistics/total-count/TotalCount'
import { FadeIn } from '@/core/components/shared/FadeIn.styleable'
import { ANIMATION_DELAY_MS } from '@/core/constants/time'
import { useCalendar } from '@/core/hooks/useCalendar'
import * as S from '@/styles/screens/statistics/Statistics.styled'
import type { ISOMonthString } from '@/types/date.types'

export default function Screen() {
  const { selectedYear, selectedMonth, todayString } = useCalendar()
  const { t } = useTranslation()

  const monthString = selectedMonth
    ? selectedMonth
    : (todayString.substring(0, 7) as ISOMonthString)

  return (
    <ScrollView>
      <S.ViewContainer edges={['top', 'bottom']} padded>
        <S.OrderBox>
          <H1>{t('statistics.title')}</H1>
        </S.OrderBox>
        <FadeIn delay={ANIMATION_DELAY_MS[0]}>
          <S.YStackContainer>
            <S.XStackContainer>
              <TotalCount
                selectedYear={selectedYear}
                selectedMonth={selectedMonth || monthString}
              />
              <MoodAverage
                selectedYear={selectedYear}
                selectedMonth={selectedMonth || monthString}
              />
            </S.XStackContainer>
            <WeeklyMoodChart selectedMonth={selectedMonth || monthString} />
          </S.YStackContainer>
        </FadeIn>
      </S.ViewContainer>
    </ScrollView>
  )
}

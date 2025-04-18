import { Minimize2 } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import type { ExpressiveMonthStats } from '@/types'
import { getMonthKey } from '@/utils'

import { EmptyContent } from '@/components/features/statistics/EmptyContent'
import * as S from './ExpandedContent.styled'

interface Props {
  frequency: number
  activeDay: string
  totalCount: number
  daysSinceSignup: number
  expressiveMonth: ExpressiveMonthStats
}

export const ExpandedContent = memo(
  ({
    frequency,
    activeDay,
    totalCount,
    daysSinceSignup,
    expressiveMonth,
  }: Props) => {
    const { t } = useTranslation()
    if (!totalCount) {
      return <EmptyContent />
    }

    return (
      <S.ViewContainer>
        <S.DaysSinceSignupBox>
          <S.DaysSinceSignupTitle>
            {t('statistics.totalCount.daysSinceSignup.title')}
          </S.DaysSinceSignupTitle>
          <S.DaysSinceSignupDescription>
            {t('statistics.totalCount.daysSinceSignup.description', {
              date: daysSinceSignup,
            })}
          </S.DaysSinceSignupDescription>
        </S.DaysSinceSignupBox>
        <S.FrequencyBox>
          <S.FrequencyTitle>
            {t('statistics.totalCount.frequency.title')}
          </S.FrequencyTitle>
          <S.FrequencyDescription>
            {frequency === 0
              ? t('statistics.totalCount.frequency.everyDay')
              : t('statistics.totalCount.frequency.description', {
                  date: frequency,
                })}
          </S.FrequencyDescription>
        </S.FrequencyBox>
        <S.MostDayBox>
          <S.MostDayTitle>
            {t('statistics.totalCount.mostDay.title')}
          </S.MostDayTitle>
          <S.MostDayDescription>
            {t('statistics.totalCount.mostDay.description', {
              day: t(`calendar.days.${activeDay}`),
            })}
          </S.MostDayDescription>
        </S.MostDayBox>
        <S.ExpressiveMonthBox>
          <S.ExpressiveMonthTitle>
            {t('statistics.totalCount.expressiveMonth.title')}
          </S.ExpressiveMonthTitle>
          <S.ExpressiveMonthDescription>
            {t('statistics.totalCount.expressiveMonth.description', {
              month: t(`calendar.months.${getMonthKey(expressiveMonth.month)}`),
              count: expressiveMonth.count,
            })}
          </S.ExpressiveMonthDescription>
        </S.ExpressiveMonthBox>
        <S.MinimizeButton icon={Minimize2} />
      </S.ViewContainer>
    )
  },
)

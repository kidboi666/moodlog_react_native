import { Minimize2 } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import type { ExpressiveMonthStats } from '@/types'
import { getMonthKey } from '@/utils'

import { EmptyContent } from '@/components/features/statistics/EmptyContent'
import { BaseText, H5 } from '@/components/shared'
import { Button, View, YStack, styled } from 'tamagui'

export const ViewContainer = styled(View, {
  animation: 'quick',
  animateOnly: ['opacity'],
  flex: 1,
  justify: 'space-between',
  enterStyle: { opacity: 0 },
  exitStyle: { opacity: 0 },
})

const GapBox = styled(YStack, {
  gap: '$2',
})

const TitleText = styled(H5)

const DescriptionText = styled(BaseText, {
  color: '$gray11',
})

export const DaysSinceSignupBox = styled(GapBox)
export const DaysSinceSignupTitle = styled(TitleText)
export const DaysSinceSignupDescription = styled(DescriptionText)
export const FrequencyBox = styled(GapBox)
export const FrequencyTitle = styled(TitleText)
export const FrequencyDescription = styled(DescriptionText)
export const MostDayBox = styled(GapBox)
export const MostDayTitle = styled(TitleText)
export const MostDayDescription = styled(DescriptionText)
export const ExpressiveMonthBox = styled(GapBox)
export const ExpressiveMonthTitle = styled(TitleText)
export const ExpressiveMonthDescription = styled(DescriptionText)

export const MinimizeButton = styled(Button, {
  unstyled: true,
  self: 'flex-end',
  opacity: 0.2,
  scaleIcon: 1.5,
})

interface Props {
  frequency: number
  activeDay: string
  totalCount: number
  daysSinceSignup: number
  expressiveMonth: ExpressiveMonthStats
}

export const TotalCountExpandedContent = memo(
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
      <ViewContainer>
        <DaysSinceSignupBox>
          <DaysSinceSignupTitle>
            {t('statistics.totalCount.daysSinceSignup.title')}
          </DaysSinceSignupTitle>
          <DaysSinceSignupDescription>
            {t('statistics.totalCount.daysSinceSignup.description', {
              date: daysSinceSignup,
            })}
          </DaysSinceSignupDescription>
        </DaysSinceSignupBox>
        <FrequencyBox>
          <FrequencyTitle>
            {t('statistics.totalCount.frequency.title')}
          </FrequencyTitle>
          <FrequencyDescription>
            {frequency === 0
              ? t('statistics.totalCount.frequency.everyDay')
              : t('statistics.totalCount.frequency.description', {
                  date: frequency,
                })}
          </FrequencyDescription>
        </FrequencyBox>
        <MostDayBox>
          <MostDayTitle>
            {t('statistics.totalCount.mostDay.title')}
          </MostDayTitle>
          <MostDayDescription>
            {t('statistics.totalCount.mostDay.description', {
              day: t(`calendar.days.${activeDay}`),
            })}
          </MostDayDescription>
        </MostDayBox>
        <ExpressiveMonthBox>
          <ExpressiveMonthTitle>
            {t('statistics.totalCount.expressiveMonth.title')}
          </ExpressiveMonthTitle>
          <ExpressiveMonthDescription>
            {t('statistics.totalCount.expressiveMonth.description', {
              month: t(`calendar.months.${getMonthKey(expressiveMonth.month)}`),
              count: expressiveMonth.count,
            })}
          </ExpressiveMonthDescription>
        </ExpressiveMonthBox>
        <MinimizeButton icon={Minimize2} />
      </ViewContainer>
    )
  },
)

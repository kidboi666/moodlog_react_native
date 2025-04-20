import { Minimize2 } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'

import type { ExpressiveMonthStats } from '@/types'
import { getMonthKey } from '@/utils'

import { EmptyContent } from '@/components/features/statistics'
import { BaseText, H5 } from '@/components/shared'
import { View, YStack, styled } from 'tamagui'

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

const DescriptionText = styled(BaseText, {
  color: '$color11',
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
        <GapBox>
          <H5>{t('statistics.totalCount.daysSinceSignup.title')}</H5>
          <DescriptionText>
            {t('statistics.totalCount.daysSinceSignup.description', {
              date: daysSinceSignup,
            })}
          </DescriptionText>
        </GapBox>
        <GapBox>
          <H5>{t('statistics.totalCount.frequency.title')}</H5>
          <DescriptionText>
            {frequency === 0
              ? t('statistics.totalCount.frequency.everyDay')
              : t('statistics.totalCount.frequency.description', {
                  date: frequency,
                })}
          </DescriptionText>
        </GapBox>
        <GapBox>
          <H5>{t('statistics.totalCount.mostDay.title')}</H5>
          <DescriptionText>
            {t('statistics.totalCount.mostDay.description', {
              day: t(`calendar.days.${activeDay}`),
            })}
          </DescriptionText>
        </GapBox>
        <GapBox>
          <H5>{t('statistics.totalCount.expressiveMonth.title')}</H5>
          <DescriptionText>
            {t('statistics.totalCount.expressiveMonth.description', {
              month: t(`calendar.months.${getMonthKey(expressiveMonth.month)}`),
              count: expressiveMonth.count,
            })}
          </DescriptionText>
        </GapBox>
        <Minimize2 self='flex-end' color='$color8' />
      </ViewContainer>
    )
  },
)

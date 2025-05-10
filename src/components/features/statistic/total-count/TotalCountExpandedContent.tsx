import { Minimize2 } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { View, YStack, styled } from 'tamagui'

import { BaseText, H5 } from '@/components/shared'
import { useAuth } from '@/store'
import type { ExpressiveMonthStats } from '@/types'
import { DateUtils } from '@/utils'
import { EmptyContent } from '../EmptyContent'

interface Props {
  frequency: number
  activeDay: string
  totalCount: number
  expressiveMonth: ExpressiveMonthStats
}

function _TotalCountExpandedContent({
  frequency,
  activeDay,
  totalCount,
  expressiveMonth,
}: Props) {
  const session = useAuth(state => state.session)
  const { t } = useTranslation()

  if (!totalCount) {
    return <EmptyContent />
  }

  if (!session) {
    return null
  }

  return (
    <ViewContainer>
      <GapBox>
        <H5>{t('statistics.totalCount.daysSinceSignup.title')}</H5>
        <DescriptionText>
          {t('statistics.totalCount.daysSinceSignup.description', {
            date: DateUtils.getDaysSinceSignup(session.user.created_at),
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
            month: t(
              `calendar.months.${DateUtils.getMonthKey(expressiveMonth.month)}`,
            ),
            count: expressiveMonth.count,
          })}
        </DescriptionText>
      </GapBox>
      <Minimize2 self='flex-end' color='$color8' />
    </ViewContainer>
  )
}

const ViewContainer = styled(View, {
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

export const TotalCountExpandedContent = memo(_TotalCountExpandedContent)

TotalCountExpandedContent.displayName = 'TotalCountExpandedContent'

import { useQuery } from '@tanstack/react-query'
import { View, XStack, YStack, styled } from 'tamagui'

import { BaseText, H2, H3 } from '@/components/shared'
import { Layout } from '@/constants'
import { StatisticQueries } from '@/queries'
import { useTranslation } from 'react-i18next'

export function TotalCount() {
  const { t } = useTranslation()
  const { data: totalCount } = useQuery(StatisticQueries.getTotalCount())

  return (
    <ViewContainer>
      <YStackContainer>
        <H3>{t('statistics.totalCount.title')}</H3>
        <BaseText>{t('statistics.totalCount.description')}</BaseText>
      </YStackContainer>
      <StackContainer>
        <H2>{totalCount}</H2>
        <Unit>{t('common.units.count')}</Unit>
      </StackContainer>
    </ViewContainer>
  )
}

const ViewContainer = styled(View, {
  flex: 1,
  bg: '$color4',
  rounded: '$8',
  p: '$4',
  height: Layout.HEIGHT.RECORD_CARD_HEIGHT,
  animation: 'bouncy',
  pressStyle: { scale: 0.92 },
})

const YStackContainer = styled(YStack, {
  gap: '$2',
})

const StackContainer = styled(XStack, {
  items: 'flex-end',
  gap: '$2',
  flex: 1,
})

const Unit = styled(BaseText, {
  lineHeight: Layout.HEIGHT.RECORD_UNIT_LINE_HEIGHT,
  color: '$gray11',
})

import { Maximize2 } from '@tamagui/lucide-icons'
import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { View, XStack, YStack, styled } from 'tamagui'

import { BaseText, H2, H3 } from '@/components/shared'
import { Layout } from '@/constants'

interface Props {
  totalCount: number
}

export const TotalCountCollapsedContent = memo(({ totalCount }: Props) => {
  const { t } = useTranslation()
  return (
    <ViewContainer>
      <YStackContainer>
        <H3>{t('statistics.totalCount.title')}</H3>
        <BaseText>{t('statistics.totalCount.description')}</BaseText>
      </YStackContainer>
      <XStack>
        <StackContainer>
          <H2>{totalCount}</H2>
          <CountText>{t('common.units.count')}</CountText>
        </StackContainer>
        <Maximize2 self='flex-end' color='$color8' />
      </XStack>
    </ViewContainer>
  )
})

const ViewContainer = styled(View, {
  flex: 1,
  animation: 'quick',
  animateOnly: ['opacity'],
  justify: 'space-between',
  enterStyle: { opacity: 0 },
  exitStyle: { opacity: 0 },
})

const YStackContainer = styled(YStack, {
  gap: '$2',
})

const StackContainer = styled(XStack, {
  items: 'flex-end',
  gap: '$2',
  flex: 1,
})

const CountText = styled(BaseText, {
  lineHeight: Layout.HEIGHT.RECORD_UNIT_LINE_HEIGHT,
  color: '$gray11',
})

TotalCountCollapsedContent.displayName = 'TotalCountCollapsedContent'

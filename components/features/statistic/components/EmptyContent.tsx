import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { View, styled } from 'tamagui'

import { BaseText, H5 } from '@/components/shared'

export const EmptyContent = memo(() => {
  const { t } = useTranslation()

  return (
    <Container>
      <H5>{t('statistics.empty.title')}</H5>
      <BaseText>{t('statistics.empty.description')}</BaseText>
    </Container>
  )
})

const Container = styled(View, {
  flex: 1,
  justify: 'space-between',
  flexDirection: 'column',
  gap: '$2',
  animation: 'quick',
  animateOnly: ['opacity'],
  enterStyle: { opacity: 0 },
  exitStyle: { opacity: 0 },
})

EmptyContent.displayName = 'EmptyContent'

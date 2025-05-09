import { memo } from 'react'
import { useTranslation } from 'react-i18next'
import { YStack, styled } from 'tamagui'

import { BaseText, H3 } from '@/components/shared'

export const GardenTitleHeader = memo(() => {
  const { t } = useTranslation()
  return (
    <GardenTitleHeaderContainer>
      <GardenTitle>{t('entries.garden.title')}</GardenTitle>
      <GardenDescription>{t('entries.garden.description')}</GardenDescription>
    </GardenTitleHeaderContainer>
  )
})

const GardenTitleHeaderContainer = styled(YStack, {
  gap: '$2',
})

const GardenTitle = styled(H3, {
  color: '$color12',
})

const GardenDescription = styled(BaseText, {
  color: '$color12',
})

import { YStack, styled } from 'tamagui'

import { BaseText } from '@/core/components/shared/BaseText'
import { H3 } from '@/core/components/shared/Heading'
export const GardenTitleHeaderContainer = styled(YStack, {
  gap: '$2',
})

export const GardenTitle = styled(H3, {
  color: '$color12',
})

export const GardenDescription = styled(BaseText, {
  color: '$color12',
})

import { YStack, styled } from 'tamagui'

import { ViewContainer as HOSViewContainer } from '@/components/shared/ViewContainer.styleable'
import { ItemContainer as HOSItemContainer } from '@/styles/screens/settings/Settings.styled'

export const ViewContainer = styled(HOSViewContainer, {
  edges: ['top'],
  padded: true,
  gap: '$4',
})

export const ItemContainer = styled(HOSItemContainer, {})

export const StyledYStack = styled(YStack, {
  space: '$2',
})

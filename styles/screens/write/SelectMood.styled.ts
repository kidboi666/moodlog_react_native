import { ViewContainer as HOSViewContainer } from '@/components/shared/ViewContainer.styleable'
import { YStack, styled } from 'tamagui'

import { HeaderContainer as HOSHeaderContainer } from '@/components/shared/HeaderContainer.styleable'
import { PressableButton } from '@/components/shared/PressableButton.styled'
import { CONTAINER_VERTICAL_PADDING } from '@/constants'

export const HeaderContainer = styled(HOSHeaderContainer, {
  py: CONTAINER_VERTICAL_PADDING,
})

export const BackButton = styled(PressableButton, {})

export const ViewContainer = styled(HOSViewContainer, {})

export const YStackContainer = styled(YStack, {
  flex: 1,
  gap: '$6',
})

export const ButtonContainer = styled(YStack, {
  height: 80,
  justify: 'flex-end',
})
